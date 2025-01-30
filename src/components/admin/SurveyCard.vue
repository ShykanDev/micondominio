<template>
<section class="flex flex-col max-w-md p-8 mx-auto mt-10 transition-all duration-300 border shadow-xl rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 backdrop-blur-sm border-white/30 font-poppins hover:shadow-2xl">
  <header class="mb-6">
    <h2 class="flex items-center text-2xl font-semibold tracking-tight text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
      <i class="mr-3 text-2xl fas fa-chart-line"></i>
      {{ surveyTitle }}
    </h2>
    <p class="mt-2 text-sm leading-snug text-gray-600">{{ surveyDescription }}</p>
  </header>

  <form @submit.prevent="updateVotation">

    <div class="p-1 mb-6 bg-white border shadow-sm border-gray-200/50 rounded-xl">
      <BarChart
        :labels="props.surveyOptions.map(option => option.option)"
        :data="props.surveyOptions.map(option => option.numberVotes)"
        :label="surveyTitle"
      />
    </div>

    <section v-if="!sysVals().getIsAdmin && !hasVoted">
      <div class="mb-6 space-y-3">
        <div
          v-for="(option, index) in surveyOptions"
          :key="index"
          class="relative transition-all duration-200"
        >
          <label class="flex items-center p-3 border border-transparent cursor-pointer group rounded-xl hover:bg-white/50 hover:border-gray-200/30">
            <input
              v-model="optionSelected"
              :value="option.option"
              type="radio"
              name="survey"
              class="absolute opacity-0 peer"
            >
            <div class="w-5 h-5 mr-3 transition-all border-2 border-gray-300 rounded-full shrink-0 group-hover:border-blue-400 peer-checked:border-blue-600 peer-checked:ring-4 peer-checked:ring-blue-100"></div>
            <span class="text-sm font-medium text-gray-700 grow">{{ option.option }}</span>
            <div class="w-2 h-2 ml-2 transition-opacity bg-blue-500 rounded-full opacity-0 peer-checked:opacity-100"></div>
          </label>
        </div>
      </div>

      <div class="flex flex-col space-y-4">
        <button
          type="submit"
          class="w-full py-3.5 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-blue-200/50 active:scale-95 flex items-center justify-center"
        >
          <i class="mr-2 text-sm fas fa-paper-plane"></i>
          Enviar Voto
        </button>


        <div class="flex items-center justify-center p-3 mt-4 rounded-lg bg-blue-50/50">
          <i class="mr-2 text-sm text-blue-500 fas fa-info-circle"></i>
          <small class="text-xs font-medium text-blue-700/80">Tu voto es irreversible una vez enviado</small>
        </div>
      </div>
    </section>
        <!-- button to eliminate the card (only for admin) -->
        <button
          type="button"
          class="w-full py-3.5 px-6 bg-white text-blue-600 font-semibold rounded-xl border border-blue-600 hover:bg-rose-50 active:scale-95 hover:border-rose-600 flex items-center justify-center hover:text-red-600"
          @click="deleteSurvey"
        >
          <i class="mr-2 text-sm fas fa-trash hover:text-red-600"></i>
          Eliminar Encuesta
        </button>
  </form>
</section>
</template>

<script lang="ts" setup>
import { sysVals } from '@/stores/sysVals';
import { doc, getDoc, getFirestore, updateDoc, deleteDoc } from 'firebase/firestore';
import { defineAsyncComponent, onMounted, ref } from 'vue';
import { sha256 } from 'crypto-hash';
import { ownerVals } from '@/stores/ownerVals';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; // for React, Vue and Svelte
import { sys } from 'typescript';
import BarChart from '@/components/charts/BarChart.vue';
const SurveyComponent = defineAsyncComponent(() => import('@/components/owner/components/SurveysComponent.vue'));//survey list from firebase
const LoaderComponent = defineAsyncComponent(() => import('@/components/owner/components/LoaderComponent.vue'));//loader
const hasVoted = ref(false);

const notyf = new Notyf({
  duration: 4000,
  position: {
    x: 'left',
    y: 'top'
  },
  ripple: true,
  dismissible: true,
});

const optionSelected = ref<string | null>(null); // Added proper type annotation for the selected option

const props = defineProps({
  surveyTitle: {
    type: String,
    required: true,
    default: "Encuesta"
  },
  surveyDescription: {
    type: String,
    required: true,
    default: "Descripción de la encuesta"
  },
  surveyOptions: {
    type: Array,
    required: true,
    default: () => [{ option: "Opción 1" }, { option: "Opción 2" }, { option: "Opción 3" }] // Ensure each option has a key for better structure
  },
  surveyDocId: {
    type: String,
    required: true
  },
  voters: {
    type: Array,
    required: true
  }
})

const db = getFirestore();

const deleteSurvey = async () => {
  sysVals().setIsLoadingComponent(true)
  try {
    const docRef = doc(db, 'condominios', sysVals().getAdminDocId, 'surveys', props.surveyDocId);
    await deleteDoc(docRef);
    notyf.success('Encuesta eliminada');
  } catch (error) {
    console.error('Error deleting survey:', error);
    notyf.error('Error al eliminar la encuesta');
  }
  sysVals().setIsLoadingComponent(false)
}

const verifyAlreadyVoted = async () => {
  const idEncoded = await sha256(sysVals().getUserUid);
  const votersRef = doc(db, 'condominios', sysVals().getAdminDocId, 'surveys', props.surveyDocId);
  const votersSnap = await getDoc(votersRef);

  if (!votersSnap.exists()) {
    console.log('No such document!');
    sysVals().setIsLoadingOwner(false);
    return false;
  } else {
    console.log('Document data:', votersSnap.data());
    if (votersSnap.data().voters.some((voter: string) => voter === idEncoded)) {
      notyf.error('Ya votaste en esta encuesta');
      hasVoted.value = true;
      sysVals().setIsLoadingOwner(false);
      return false;
    } else {
      return true;
    }
  }
}

onMounted(async () => {
  const idEncoded = await sha256(sysVals().getUserUid);
  if (props.voters.some(e => e === idEncoded)) {
    hasVoted.value = true;
  }
})

const updateVotation = async () => {
  sysVals().setIsLoadingOwner(true);
  sysVals().setAsyncComponent(LoaderComponent)
  const allowVotation = await verifyAlreadyVoted();
  if (!allowVotation) {
    sysVals().setIsLoadingOwner(false);
    sysVals().setAsyncComponent(SurveyComponent)
    return;
  }
  try {
    console.log('Updating votation...');
    const docRef = doc(db, 'condominios', sysVals().getAdminDocId, 'surveys', props.surveyDocId);
    const docSnap = await getDoc(docRef);
    const hash = await sha256(sysVals().getUserUid);
    if (!docSnap.exists()) {
      console.log('No such document!');
      sysVals().setIsLoadingOwner(false);
      sysVals().setAsyncComponent(SurveyComponent)
      return;
    } else {
      const surveyData = docSnap.data();
      const selectedOption = optionSelected.value;

      console.log('Current selection: ', selectedOption);
      console.log('Document data:', surveyData);

      // Find the selected option in the options array
      const optionToUpdate = surveyData.options.find(option => option.option === selectedOption);

      if (optionToUpdate) {
        // Increase the numberVotes by 1
        optionToUpdate.numberVotes += 1;

        // Update the Firestore document with the updated options array
        await updateDoc(docRef, {
          options: surveyData.options, // Update the options array,
          voters: [...surveyData.voters, hash]
        });

        notyf.success('Votación actualizada correctamente');
        console.log('Updated options:', surveyData.options);
        sysVals().setAsyncComponent(SurveyComponent)
        sysVals().setIsLoadingOwner(false);
      } else {
        sysVals().setIsLoadingOwner(false);
        console.log('Selected option not found.');
        sysVals().setAsyncComponent(SurveyComponent)
        return;
      }
    }
  } catch (error) {
    console.error('Error during update:', error);
    sysVals().setIsLoadingOwner(false);
    sysVals().setAsyncComponent(SurveyComponent)

  } finally {
    sysVals().setIsLoadingOwner(false);
    sysVals().setAsyncComponent(SurveyComponent)

  }
}

</script>

<style scoped></style>
