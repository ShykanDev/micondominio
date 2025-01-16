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
</script>

<style scoped>

</style>
