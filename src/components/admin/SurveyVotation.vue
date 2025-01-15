<template>
  <section
    class="flex flex-col max-w-sm p-6 mx-auto mt-10 overflow-auto bg-white rounded-lg shadow-md font-poppins max-h-96">
    <h2 class="flex items-center mb-4 text-xl font-medium text-blue-600 break-words break-all">
      <i class="mr-2 fas fa-poll-h"></i> {{ surveyTitle }}
    </h2>
    <p class="mb-6 text-gray-700">{{ surveyDescription }}</p>

    <form @submit.prevent="">
      <div v-for="(option, index) in surveyOptions" :key="index" class="mb-4">
        <label class="inline-flex items-center cursor-pointer">
          <input type="radio" name="survey" class="w-5 h-5 text-blue-600 form-radio">
          <span class="ml-2 text-sm text-gray-700">{{ option }}</span>
        </label>
      </div>
      <div class="flex items-center justify-between">
        <button type="submit"
          class="px-6 py-3 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
          <i class="mr-2 fas fa-vote-yea"></i> Votar
        </button>
        <button @click="deleteSurvey" type="submit"
          class="px-6 py-3 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50">
          <i class="mr-2 fas fa-trash"></i> Eliminar
        </button>
      </div>

      <div class="mt-2">
        <i class="mr-1 italic text-slate-400 fas fa-info"></i>
        <small class="italic text-slate-600">Así es como lo verán sus propietarios</small>
      </div>

    </form>
  </section>
</template>

<script lang="ts" setup>
import { sysVals } from '@/stores/sysVals';
import { collection, deleteDoc, doc, getDocs, getFirestore, query, where } from 'firebase/firestore';

const props = defineProps({
  surveyTitle: {
    type: String,
    required: true
  },
  surveyDescription: {
    type: String,
    required: true
  },
  surveyOptions: {
    type: Array,
    required: true
  },
  surveyDocId: {
    type: String,
    required: true
  }
})


const db = getFirestore();
const surveyDocIdRef = doc(db, `condominios/${sysVals().getCondominiumId}/surveys/${props.surveyDocId}`);
// const q = query(surveyDocIdRef, where('surveyDocId', '==', props.surveyDocId))
const deleteSurvey = async () => {
  try {
      await deleteDoc(surveyDocIdRef)
  } catch (error) {
    console.log(error);

  }
}
// try {
//   const snapshot = await getDocs(q);
//   if (snapshot.empty) {
//     console.log('No se encontro una survey con ese id');
//   } else {
//     snapshot.forEach(async e => {
//       await deleteDoc(e)
//     });
//   }
// } catch (error) {
//   console.log(error);

// }
</script>

<style scoped></style>
