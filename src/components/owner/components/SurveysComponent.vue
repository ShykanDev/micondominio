<template>
    <div v-if="surveys" class="flex flex-wrap p-4 bg-white rounded-lg shadow-lg">
      <SurveyCard v-for="(e, index) in surveys" :key="index" :survey-description="e.description" :survey-title="e.title" :survey-doc-id="e.surveyDocId" :survey-options="e.options" />
    </div>
</template>

<script lang="ts" setup>
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import SurveyCard from '../cards/SurveyCard.vue';
import { onMounted, ref } from 'vue';
import { sysVals } from '@/stores/sysVals';

const db = getFirestore();

const surveys = ref([]);

const surveysRef = collection(db, `condominios/${sysVals().getAdminDocId}/surveys`);

const getSurveys = async () => {
  sysVals().setIsLoadingOwner(true);
  try {
    const querySnapshot = await getDocs(surveysRef);
    querySnapshot.forEach((doc) => {
      surveys.value.push(doc.data());
    });
    sysVals().setIsLoadingOwner(false);
  }
  catch (error) {
    sysVals().setIsLoadingOwner(false);
    console.log(error);
  }
}

onMounted(() => {
  getSurveys();
})
</script>

<style scoped>

</style>
