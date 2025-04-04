<template>
<div :class="{ 'border-l-4 border-red-500': isUrgent, 'border-l-4 border-blue-500': !isUrgent }"
     class="relative p-8 mx-auto mt-10 max-w-sm bg-gradient-to-br rounded-xl shadow-lg transition-shadow duration-300 from-slate-50 to-slate-100 font-poppins hover:shadow-xl"
     >

  <!-- Header -->
  <div class="flex items-center p-4 mb-6 rounded-lg" :class="{ 'bg-red-50': isUrgent, 'bg-blue-50': !isUrgent }">
    <div class="flex flex-1 items-center">
      <i class="mr-4 text-2xl" :class="{
        'text-red-500 animate-pulse': isUrgent,
        'text-blue-600': !isUrgent,
        'fas fa-exclamation-circle': isUrgent,
        'fas fa-info-circle': !isUrgent
      }"></i>
      <h2 class="text-base font-bold tracking-wide" :class="{ 'text-red-700': isUrgent, 'text-blue-800': !isUrgent }">
        {{ isUrgent ? '⚠️ Urgencia Administrativa' : 'Comunicado Oficial' }}
      </h2>
    </div>
    <span class="px-3 py-1 text-xs font-semibold rounded-full" :class="{
      'bg-red-100 text-red-700': isUrgent,
      'bg-blue-100 text-blue-700': !isUrgent
    }">
      {{ formattedDate }}
    </span>
  </div>

  <!-- Contenido Principal (Oculto por defecto) -->
  <div  class="space-y-6">
    <!-- Titulo y Descripción -->
    <div class="mb-6">
      <h3 class="mb-3 text-2xl font-bold tracking-tight text-gray-900">{{ title }}</h3>
      <p class="p-4 leading-relaxed text-gray-700 bg-white rounded-lg border border-slate-200">
        {{ description }}
      </p>
    </div>

    <!-- Metadatos -->
    <div class="grid grid-cols-2 gap-4 mb-6">
      <div class="flex items-center p-3 bg-white rounded-lg border border-slate-200">
        <i class="mr-3 text-blue-500 fas fa-tag"></i>
        <div>
          <p class="mb-1 text-xs text-gray-500">Categoría</p>
          <p class="font-medium text-gray-800">{{ category }}</p>
        </div>
      </div>
      <div class="flex items-center p-1 bg-white rounded-lg border border-slate-200">
        <i class="mr-3 text-purple-500 fas fa-user-shield"></i>
        <div>
          <p class="mb-1 text-xs text-gray-500">Publicado por</p>
          <p class="text-sm text-gray-800 font-base">Administración</p>
        </div>
      </div>
    </div>

    <!-- Imagen -->
    <div class="overflow-hidden relative rounded-xl border-2 transition-all duration-300 group border-slate-200 hover:border-blue-300">
      <img v-if="img != ''" :src="img"
           class="object-cover w-full h-64 transition-transform duration-300 transform group-hover:scale-105">
      <div @click="show"
           class="flex absolute inset-0 justify-center items-end p-6 bg-gradient-to-t to-transparent opacity-0 transition-opacity duration-300 cursor-pointer from-black/60 group-hover:opacity-100">
        <button class="flex items-center px-5 py-2 space-x-2 text-gray-800 rounded-full transition-colors bg-white/90 hover:bg-white">
          <i class="text-blue-600 fas fa-expand-arrows-alt"></i>
          <span class="font-medium">Ampliar Imagen</span>
        </button>
      </div>
    </div>

    <!-- Formulario de Respuesta -->
    <div class="p-6 mt-8 bg-white rounded-xl border shadow-inner border-slate-100">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-xl font-bold text-gray-900">Responder al Comunicado</h3>

      </div>

      <form class="space-y-5">
        <!-- Campo Título -->
        <div>
          <label class="block mb-2 text-sm font-semibold text-gray-700">Título de tu respuesta</label>
          <div class="relative">
            <input type="text"
                   v-model="titleAnswer"
                   class="px-4 py-3 w-full placeholder-gray-400 rounded-lg border transition-all border-slate-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none"
                   placeholder="Ej: Solicitud de información adicional">
            <i class="absolute top-4 right-4 text-gray-400 fas fa-heading"></i>
          </div>
        </div>

        <!-- Campo Comentario -->
        <div>
          <label class="block mb-2 text-sm font-semibold text-gray-700">Tu mensaje</label>
          <div class="relative">
            <textarea
              class="px-4 py-3 w-full h-32 placeholder-gray-400 rounded-lg border transition-all resize-none border-slate-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none"
              v-model="commentAnswer"
              placeholder="Escribe aquí tu consulta o comentario..."></textarea>
            <i class="absolute top-4 right-4 text-gray-400 fas fa-comment-dots"></i>
          </div>
        </div>

        <!-- Botón de Envío -->
        <button @click.prevent="sendAnswer()"
                type="button"
                class="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center space-x-3 shadow-lg hover:shadow-blue-200">
          <i class="transition-transform duration-300 fas fa-paper-plane group-hover:translate-x-1"></i>
          <span>Enviar Respuesta</span>
        </button>
      </form>
    </div>
  </div>
</div>
</template>

<script lang="ts" setup>
import { sysVals } from '@/stores/sysVals';
import { addDoc, collection, getFirestore, Timestamp } from 'firebase/firestore';
import { computed, ref } from 'vue';
import 'notyf/notyf.min.css';

const props = defineProps({
  title: {
    type: String,
    default: 'lorem', // Valor por defecto para que no sea undefined
  },
  description: {
    type: String,
    default: 'lorem', // Cadena vacía como valor por defecto
  },
  date: {
    type: Object,
    default: () => ({}), // Objeto vacío por defecto
  },
  category: {
    type: String,
    default: 'General', // Categoría genérica por defecto
  },
  isUrgent: {
    type: Boolean,
    default: false, // Valor booleano falso por defecto
  },
  img: {
    type: String,
    default: '', // Imagen vacía como valor por defecto
  },
  announcementId: {
    type: String,
    default: '',
  }
});


const formattedDate = computed(() => {
  if (typeof props.date === 'object' && props.date.toDate) {
    // Si es un timestamp de Firebase
    const date = props.date.toDate();
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString(); // Formatear fecha y hora
  }
  return props.date; // Si es un string, devolver tal cual
});

const notyf = new Notyf({
  duration: 4000,
  position: {
    x: 'left',
    y: 'top'
  },
  ripple: true,
  dismissible: true
})


// values for the answer form
const db = getFirestore();
const titleAnswer = ref('');
const commentAnswer = ref('');
const sendAnswer = async () => {
  console.log('user Uid,', sysVals().getUserUid);


  const userAnswersCollection = collection(db, `condominios/${sysVals().getAdminDocId}/announcementsAnswers/`);
  try {
    await addDoc(userAnswersCollection, {
      title: titleAnswer.value,
      answer: commentAnswer.value,
      creationDate:Timestamp.now(),
      imgUrl:'',
      associatedTo:props.announcementId,
      senderId:sysVals().getUserUid,
      senderName:ownerVals().getOwnerName
    });
    notyf.success('Respuesta enviada exitosamente');

    titleAnswer.value = '';
    commentAnswer.value = '';


  } catch (error) {
    notyf.error('Error al enviar la respuesta');
    console.log(error);
  }
}
import { api as viewerApi } from 'v-viewer'
import { Notyf } from 'notyf';
import { ownerVals } from '@/stores/ownerVals';
  const images = [
    props.img
  ]
  const show = () => {
    viewerApi({
      images
    })
  }
</script>

<style scoped></style>
