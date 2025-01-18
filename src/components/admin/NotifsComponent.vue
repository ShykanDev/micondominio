<template>
  <section>
    <SurveyVotation v-show="surveyTitle" class="fixed z-40 bottom-3 left-2" :survey-description="surveyDescription"
      :survey-title="surveyTitle" :survey-options="survey.options" />
  </section>
  <section class="max-w-4xl p-6 mx-auto mt-10 bg-white rounded-lg shadow-md font-poppins">
    <h2 class="mb-4 text-2xl font-bold text-sky-800"><i class="fas fa-poll text-sky-900"></i> Crear Encuesta</h2>
    <form @submit.prevent="">
      <div class="mb-4">
        <label for="titulo" class="block mb-2 font-bold text-sky-700"><i class="fas fa-heading"></i> Título de la
          Encuesta</label>
        <input v-model="surveyTitle" type="text" id="titulo" name="titulo"
          class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ingrese el título de la encuesta">
      </div>
      <div class="mb-4 text-sky-800">
        <label for="descripcion" class="block mb-2 font-bold text-sky-700"><i class="fas fa-align-left"></i>
          Descripción</label>
        <textarea v-model="surveyDescription" id="descripcion" name="descripcion"
          class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ingrese la descripción de la encuesta"></textarea>
      </div>
      <div class="flex flex-wrap my-3 space-x-2 font-poppins">
        <article v-for="(option, index) in survey.options" :key="index"
          class="bg-white px-2 my-1 rounded-md text-sky-800 border-[2px] border-sky-600 flex items-center gap-2 animate-fade-up animate-duration-150">
          {{ option.option }}
          <i @click="deleteOption(index)" class="text-red-400 cursor-pointer fas fa-times"></i>
        </article>
      </div>
      <div class="mb-4 font-poppins">
        <label for="opciones" class="block mb-2 font-bold text-sky-700"><i class="fas fa-list"></i> Opciones</label>
        <div id="opciones-container">
          <div class="flex items-center mb-2">
            <input @keypress.prevent.enter="addOption" v-model="surveyOption" type="text" name="opciones[]"
              class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingrese una opción">
          </div>
        </div>
        <button @click.prevent="addOption" type="button" id="agregar-opcion"
          class="px-4 py-2 mt-2 text-white bg-green-500 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"><i
            class="fas fa-plus"></i> Agregar Opción</button>
      </div>
      <div class="flex justify-end">
        <button @click.prevent="submitSurvey" type="submit"
          class="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"><i
            class="fas fa-paper-plane"></i> Enviar Encuesta</button>
      </div>
    </form>
  </section>
</template>

<script lang="ts" setup>
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; // for React, Vue and Svelte

// Create an instance of Notyf
const notyf = new Notyf({
  duration: 4000,
  position: {
    x: 'left',
    y: 'top',
  },
  dismissible: true,
});

// Display an error notification
import { ref } from 'vue';
import SurveyVotation from './SurveyVotation.vue';
import { addDoc, collection, doc, getFirestore, Timestamp, updateDoc } from 'firebase/firestore';
import { sysVals } from '@/stores/sysVals';


const surveyTitle = ref('');
const surveyDescription = ref('');
const surveyOption = ref('');


const survey = ref({
  title: surveyTitle.value,
  description: surveyDescription.value,
  options: [] as { option: string, numberVotes: number }[],
  surveyDocId: ''
});

const addOption = () => {
  survey.value.options.push({ option: surveyOption.value, numberVotes: 0 });
  surveyOption.value = '';
}

const deleteOption = (index: number) => {
  survey.value.options.splice(index, 1)
}

// firebase stuff
const db = getFirestore();

// Referencia a la colección de encuestas
const surveysCollectionRef = collection(db, `condominios/${sysVals().getCondominiumId}/surveys`);

// Enviando la encuesta a Firebase
const submitSurvey = async () => {
  sysVals().setIsLoadingComponent(true)

  try {
    // Agregar la encuesta a la colección
    const surveyToFbase = await addDoc(surveysCollectionRef, {
      title: surveyTitle.value,
      description: surveyDescription.value,
      options: survey.value.options,
      createdBy: sysVals().getUserUid,
      creationDate: Timestamp.now(),
      voters: []
    });

    // Actualizar el documento con el ID
    await updateDoc(surveyToFbase, {
      surveyDocId: surveyToFbase.id
    });


    // Limpiar los campos del formulario
    surveyTitle.value = '';
    surveyDescription.value = '';
    surveyOption.value = '';
    survey.value.options = [];

    notyf.success('Encuesta enviada exitosamente');
    sysVals().setIsLoadingComponent(false)

  } catch (error) {
    const e = error as Error;
    console.log(`Error enviando la survey a firebase:`, e);
    notyf.error(`Error enviando la survey, intentalo más tarde`);
    sysVals().setIsLoadingComponent(false)
  }
}

</script>

<style scoped></style>
