<template>
  <div :class="{ 'border-[2px] border-red-700': isUrgent, 'border-none': !isUrgent }"
    class="max-w-sm p-6 mx-auto mt-10 bg-white rounded-lg shadow-md font-poppins">
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
      <span class="break-all">Categoría: {{ category }}</span>
    </div>
    <div>
      <img v-if="img != ''" @load="imageLoaded = true" :src="img" alt="Imagen del anuncio del administrador">
    </div>
    <div v-if="!imageLoaded">
      <LoadingImage />
    </div>
    <!-- nota para el administrador diciendo que si agrega la imagen solo se visualizará una vez que se cree el anuncio -->
    <small v-if="isEdition" class="text-sm text-gray-600"><i class="mr-2 fas fa-info-circle"></i>Nota: La imagen solo se
      visualizará una vez que se publique el anuncio</small>
    <button @click="deleteAnnouncement" class="p-1 my-2 text-white rounded-lg bg-rose-800">
      <i class="mr-2 fas fa-trash"></i>
      Eliminar
    </button>
  </div>
</template>

<script lang="ts" setup>
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; // for React, Vue and Svelte

// Create an instance of Notyf
const notyf = new Notyf({
  duration: 4000,
  position: {
    x: 'left',
    y: 'top'
  },
  ripple: true,
  dismissible: true
});

const imageLoaded = ref(false);

import { sysVals } from '@/stores/sysVals';
import { deleteDoc, doc, getFirestore } from 'firebase/firestore';
import { computed, ref } from 'vue';
import LoadingImage from '../animations/LoadingImage.vue';

const props = defineProps({
  title: String,
  description: String,
  date: Object,
  category: String,
  isUrgent: Boolean,
  img: String,
  isEdition: Boolean,
  announcementId: {
    type: String,
    required: true
  }
})
const formattedDate = computed(() => {
  if (typeof props.date === 'object' && props.date.toDate) {
    // Si es un timestamp de Firebase
    const date = props.date.toDate();
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString(); // Formatear fecha y hora
  }
  return props.date; // Si es un string, devolver tal cual
});

const db = getFirestore();

// const refAnnouncement = doc(db, "condomonios", sysVals().getCondominiumId,"announcements", props.announcementId);

const deleteAnnouncement = async () => {
  sysVals().setIsLoadingComponent(true)

  if (!props.announcementId) {
    console.error("announcementId no está definido.");
    sysVals().setIsLoadingComponent(false)
    notyf.error("Error al borrar el elemento: announcementId no está definido.");
    return;
  }

  const refAnnouncement = doc(db, "condominios", sysVals().getCondominiumId, "announcements", props.announcementId);

  try {
    await deleteDoc(refAnnouncement);
    sysVals().setIsLoadingComponent(false)
    notyf.success(`Se ha eliminado el Anuncio '${props.title}' `);

  } catch (error) {
    console.error("Error al borrar el elemento:", error);
    sysVals().setIsLoadingComponent(false)

  }
};

</script>

<style scoped></style>
