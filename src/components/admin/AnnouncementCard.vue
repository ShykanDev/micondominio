<template>
  <div :class="{'border-[2px] border-red-700': isUrgent, 'border-none' : !isUrgent}" class="max-w-sm p-6 mx-auto mt-10 bg-white rounded-lg shadow-md font-poppins">
        <div v-if="!isUrgent" class="flex items-center mb-4">
            <i class="mr-3 text-xl text-blue-600 fas fa-bullhorn"></i>
            <h2 class="text-lg font-bold text-gray-800">Anuncio del administrador</h2>
        </div>
        <div v-if="isUrgent" class="flex items-center mb-4">
            <i class="mr-3 text-xl text-red-600 fas fa-bullhorn animate-pulse"></i>
            <h2 class="text-lg font-bold text-gray-800">Anuncio urgente del administrador</h2>
        </div>
        <div>
            <h3 class="text-lg font-semibold text-gray-800 break-all">{{ title }}</h3>
        </div>
        <p class="mb-4 text-gray-700 break-all">{{ description }}</p>
        <div class="flex items-center mb-4 text-gray-600">
            <i class="mr-2 fas fa-calendar-alt"></i>
            <span>{{ date }}</span>
        </div>
        <div class="flex items-center mb-4 text-gray-600">
            <i class="mr-2 fas fa-tags"></i>
            <span class="break-all">Categoría: {{ category }}</span>
        </div>
        <div>
          <img :src="img" alt="Imagen del anuncio del administrador">
        </div>
        <!-- nota para el administrador diciendo que si agrega la imagen solo se visualizará una vez que se cree el anuncio -->
         <small class="text-sm text-gray-600"><i class="mr-2 fas fa-info-circle"></i>Nota: La imagen solo se visualizará una vez que se publique el anuncio</small>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  title: String,
  description: String,
  date: String,
  category: String,
  isUrgent:Boolean,
  img:String
})
</script>

<style scoped>

</style>
