<template>
  <section>
    <SurveyVotation v-show="surveyTitle" class="fixed bottom-3 left-2" :survey-description="surveyDescription" :survey-title="surveyTitle" :survey-options="survey.options"/>
  </section>
   <section class="max-w-4xl p-6 mx-auto mt-10 bg-white rounded-lg shadow-md font-poppins">
        <h2 class="mb-4 text-2xl font-bold text-sky-800"><i class="fas fa-poll text-sky-900"></i> Crear Encuesta</h2>
        <form @submit.prevent="">
            <div class="mb-4">
                <label for="titulo" class="block mb-2 font-bold text-sky-700"><i class="fas fa-heading"></i> Título de la Encuesta</label>
                <input v-model="surveyTitle" type="text" id="titulo" name="titulo" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Ingrese el título de la encuesta">
            </div>
            <div class="mb-4 text-sky-800">
                <label for="descripcion" class="block mb-2 font-bold text-sky-700"><i class="fas fa-align-left"></i> Descripción</label>
                <textarea v-model="surveyDescription" id="descripcion" name="descripcion" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Ingrese la descripción de la encuesta"></textarea>
            </div>
            <div class="flex flex-wrap my-3 space-x-2 font-poppins">
              <article v-for="(option,index) in survey.options" :key="index"  class="bg-sky-900 px-2 my-1 rounded-md text-white border-[1px] border-sky-600">
                {{ option }}
                <i @click="deleteOption(index)" class="text-red-400 cursor-pointer fas fa-times"></i>
              </article>
            </div>
            <div class="mb-4 font-poppins">
                <label for="opciones" class="block mb-2 font-bold text-sky-700"><i class="fas fa-list"></i> Opciones</label>
                <div id="opciones-container">
                    <div class="flex items-center mb-2">
                        <input @keypress.prevent.enter="addOption" v-model="surveyOption" type="text" name="opciones[]" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Ingrese una opción">
                    </div>
                </div>
                <button  @click.prevent="addOption" type="button" id="agregar-opcion" class="px-4 py-2 mt-2 text-white bg-green-500 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"><i class="fas fa-plus"></i> Agregar Opción</button>
            </div>
            <div class="flex justify-end">
                <button @click.prevent="submitSurvey" type="submit" class="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"><i class="fas fa-paper-plane"></i> Enviar Encuesta</button>
            </div>
        </form>
    </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import SurveyVotation from './SurveyVotation.vue';
import { addDoc, collection, getFirestore, Timestamp, updateDoc } from 'firebase/firestore';
import { sysVals } from '@/stores/sysVals';

const surveyTitle = ref('');
const surveyDescription = ref('');
const surveyOption = ref('');


const survey = ref({
    title: surveyTitle.value,
    description: surveyDescription.value,
    options: [],
    surveyDocId:''
});

const addOption = () => {
    survey.value.options.push(surveyOption.value);
    surveyOption.value = '';
}

const deleteOption = (index:number) => {
  survey.value.options.splice(index,1)
}


// firebase stuff

const db = getFirestore();

const surveysCollectionRef = collection(db, `condominios/${sysVals().getCondominiumId}/surveys`);

// const
// sending survey to firebase
const submitSurvey = async () => {
  try {
    const surveyToFbase = await addDoc(surveysCollectionRef,{
      title: surveyTitle.value,
      description: surveyDescription.value,
      options: survey.value.options,
      createdBy: sysVals().getUserUid,
      creationDate:Timestamp.now()
    })
    await updateDoc(surveyToFbase,{
      surveyDocId:surveyToFbase.id
    })
    surveyTitle.value = '';
    surveyDescription.value = '';
    surveyOption.value = '';
    survey.value.options = [];
  } catch (error) {
    const e = error as Error;
    console.log(`Error enviando la survey a firebase:`, e);
  }
}
</script>

<style scoped>

</style>
