<template>
  <div v-if="surveys" class="flex flex-wrap p-4 bg-white rounded-lg shadow-lg">
    <SurveyCard v-for="(e, index) in surveys.sort((a, b) => b.creationDate - a.creationDate)" :key="index"
      :survey-description="e.description" :survey-title="e.title" :survey-doc-id="e.surveyDocId"
      :survey-options="e.options" :voters="e.voters" />
  </div>
</template>

<script lang="ts" setup>
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import SurveyCard from '../cards/SurveyCard.vue';
import { onMounted, ref } from 'vue';
import { sysVals } from '@/stores/sysVals';
import { sys } from 'typescript';

const db = getFirestore();

const surveys = ref([]);

const surveysRef = collection(db, `condominios/${sysVals().getAdminDocId}/surveys`);

const getSurveys = async () => {
  sysVals().setIsLoadedOwner(false);
  sysVals().setIsLoadingOwner(true);
  try {
    const querySnapshot = await getDocs(surveysRef);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());

      surveys.value.push(doc.data());
    });
    sysVals().setIsLoadingOwner(false);
    // sysVals().setIsLoadedOwner(true);
  }
  catch (error) {
    sysVals().setIsLoadingOwner(false);
    console.log(error);
  }
}

onMounted(() => {
  console.log('se ejecuta el onMounted');
  getSurveys();
})
</script>

<style scoped></style>
