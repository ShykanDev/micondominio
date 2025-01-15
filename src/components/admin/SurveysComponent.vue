<template>
    <div class="">
      <section v-if="isLoading" class="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-white bg-opacity-0">
      <LoadingBar/>
    </section>
      <section v-if="surveys" class="flex flex-wrap space-x-6 space-y-2 bg-white rounded-lg shadow-lg justify-evenly">
        <SurveyVotation v-for="(survey, index) in surveys" :key="index" :survey-title="survey.title" :survey-description="survey.description" :survey-options="survey.options" :survey-doc-id="survey.surveyDocId"/>
      </section>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import SurveyVotation from './SurveyVotation.vue';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { sysVals } from '@/stores/sysVals';
import { onMounted } from 'vue';
import LoadingBar from '../animations/LoadingBar.vue';

interface iSurvey {
  title:string,
  description:string,
  options:Array<string>,
  surveyDocId:string
}

const isLoading = ref(false)

const db = getFirestore();
const surveys = ref<iSurvey[]>([]);

const surveysCollectionRef = collection(db, `condominios/${sysVals().getCondominiumId}/surveys`);

const getSurveys = async () => {
  isLoading.value = true;
  try {
    const querySnapshot = await getDocs(surveysCollectionRef);
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    surveys.value.push({
      title: data.title,
      description: data.description,
      options: data.options,
      surveyDocId: doc.id
    });
  });
  isLoading.value = false;
  } catch (error) {
    isLoading.value = false;
    console.log(error);

  }
};

onMounted( ()=> {
  getSurveys();
})

</script>

<style scoped>

</style>
