<template>
  <section
    class="flex flex-col max-w-sm p-6 mx-auto mt-10 overflow-auto rounded-lg shadow-md bg-slate-50 font-poppins max-h-96">
    <h2 class="flex items-center mb-4 text-xl font-medium text-blue-600 break-words break-all">
      <i class="mr-2 fas fa-poll-h"></i> {{ surveyTitle }}
    </h2>
    <p class="mb-6 text-gray-700">{{ surveyDescription }}</p>

    <form @submit.prevent="updateVotation">
      <section class="flex justify-center">
        <BarChart :labels="props.surveyOptions.map(option => option.option)"
          :data="props.surveyOptions.map(option => option.numberVotes)" :label="surveyTitle" />
      </section>
      <section v-if="!hasVoted">
        <div v-for="(option, index) in surveyOptions" :key="index" class="mb-4">
          <label class="inline-flex items-center cursor-pointer">
            <input v-model="optionSelected" :value="option.option" type="radio" name="survey"
              class="w-5 h-5 text-blue-600 form-radio">
            <span class="ml-2 text-sm text-gray-700">{{ option.option }}</span>
          </label>
        </div>
        <div class="flex items-center justify-between">
          <button @click.prevent="updateVotation" type="submit"
            class="px-6 py-3 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
            <i class="mr-2 fas fa-vote-yea"></i> Votar
          </button>
        </div>

        <div class="mt-2">
          <i class="mr-1 italic text-slate-400 fas fa-info"></i>
          <small class="italic text-slate-600">Una vez votado no podra cambiar la votación</small>
        </div>
      </section>

    </form>
  </section>
</template>

<script lang="ts" setup>
import { sysVals } from '@/stores/sysVals';
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';
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
