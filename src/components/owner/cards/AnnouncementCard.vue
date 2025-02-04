<template>
    <div :class="{'border-[2px] border-red-700': isUrgent, 'border-none' : !isUrgent}" class="max-w-sm p-6 mx-auto mt-10 rounded-lg shadow-md bg-slate-50 font-poppins">
        <div v-if="!isUrgent" class="flex items-center mb-4">
            <i class="mr-3 text-xl text-blue-600 fas fa-bullhorn"></i>
            <h2 class="text-lg font-bold text-gray-800">Anuncio del administrador</h2>
        </div>
        <div v-if="isUrgent" class="flex items-center mb-4">
            <i class="mr-3 text-xl text-red-600 fas fa-bullhorn animate-pulse"></i>
            <h2 class="text-lg font-bold text-rose-800">Anuncio urgente del administrador</h2>
        </div>
        <div>
            <h3 class="text-lg font-semibold text-gray-800 break-all">{{ title }}</h3>
        </div>
        <p class="mb-4 text-gray-700 break-all">{{ description }}</p>
        <div class="flex items-center mb-4 text-gray-600">
            <i class="mr-2 fas fa-calendar-alt"></i>
            <span>{{ formattedDate }}</span>
        </div>
        <div class="flex items-center mb-4 text-gray-600">
            <i class="mr-2 fas fa-tags"></i>
            <span  class="break-all">Categoría: {{ category }}</span>
        </div>
        <div>
          <img v-if="img != ''" :src="img" alt="Imagen del anuncio del administrador">
        </div>
        <div class="inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
  <!-- Card Container -->
  <div class="w-full max-w-sm p-6 transition-all duration-300 bg-white shadow-2xl md:max-w-md rounded-xl">
    <!-- Header -->
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-xl font-semibold text-gray-800">Nueva Respuesta</h3>
      <button class="text-gray-400 transition-colors hover:text-gray-600">
        <i class="fas fa-times"></i>
      </button>
    </div>

    <!-- Formulario -->
    <form class="space-y-4">
      <!-- Campo Título -->
      <div>
        <label class="block mb-1 text-sm font-medium text-gray-700">Título</label>
        <div class="relative">
          <input type="text"
                 class="w-full px-4 py-2 transition-all border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                 placeholder="Ingresa un título">
          <i class="absolute text-gray-400 fas fa-heading right-3 top-3"></i>
        </div>
      </div>

      <!-- Campo Contenido -->
      <div>
        <label class="block mb-1 text-sm font-medium text-gray-700">Comentario</label>
        <div class="relative">
          <textarea
            class="w-full h-32 px-4 py-2 transition-all border border-gray-300 rounded-lg outline-none resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Escribe tu comentario..."></textarea>
          <i class="absolute text-gray-400 fas fa-comment-dots right-3 top-3"></i>
        </div>
      </div>

      <!-- Botón Enviar -->
      <button @click="sendAnswer()" type="submit"
              class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center space-x-2">
        <i class="fas fa-paper-plane"></i>
        <span>Enviar Comentario</span>
      </button>
    </form>
  </div>
</div>

    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

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
});


const formattedDate = computed(() => {
  if (typeof props.date === 'object' && props.date.toDate) {
    // Si es un timestamp de Firebase
    const date = props.date.toDate();
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString(); // Formatear fecha y hora
  }
  return props.date; // Si es un string, devolver tal cual
});

const sendAnswer = async() => {

}
</script>

<style scoped>

</style>
