<template>
  <div class="p-6 mx-auto space-y-4 max-w-md bg-white rounded-2xl shadow-lg">
    <h2 class="flex gap-2 items-center text-xl font-bold">

      {{ title }}
    </h2>
    <p class="flex gap-2 items-start text-gray-600">
      <v-icon name="ri-information-line" class="mt-1 text-gray-400" />
      {{ description }}
    </p>
    <div class="flex gap-2 items-center text-sm text-gray-500">
      <v-icon name="ri-calendar-2-line" />
      {{ formattedDate }}
    </div>
    <span
      class="inline-block px-3 py-1 text-sm rounded-full"
      :class="type === 'sale' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'"
    >
      <v-icon name="ri-home-2-line" :class="{ 'text-green-500': type === 'sale', 'text-blue-500': type === 'rent' }" />
      {{ type === 'sale' ? 'Venta' : 'Renta' }}

    </span>
    <article class="flex justify-center w-full">
      <img v-if="image" :src="image" class="object-cover w-fullaad rounded-lg">
    </article>
    <div class="flex justify-end w-full">

      <article @click="deleteSpace" class="flex gap-1 items-center p-1 px-2 bg-white rounded-2xl border border-red-700 cursor-pointer">
        <v-icon name="bi-trash-fill" class="text-red-500" scale="1.2" />
        <p class="text-red-500">Eliminar</p>
      </article>

    </div>
  </div>
</template>

<script setup lang="ts">
import { doc, deleteDoc, getFirestore } from 'firebase/firestore'
import { computed } from 'vue'
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; // for React, Vue and Svelte
import { sysVals } from '@/stores/sysVals';

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
const props = defineProps({
  title: String,
  description: String,
  type: String,
  date: Object, // Firebase Timestamp
  documentId: String,
  image: String
})

const formattedDate = computed(() => {
  if (!props.date?.toDate) return ''
  return props.date.toDate().toLocaleDateString()
})

const emit = defineEmits(['delete-space']);


const db = getFirestore();
//Delete the space available
const deleteSpace = async() => {
  try {
    let timeout;
    if (timeout) return;
    console.log('Attempting to delete document:', props.documentId);
    console.log('Admin doc ID:', sysVals().getAdminDocId);

    const docRef = doc(db, `condominios/${sysVals().getAdminDocId}/availableSpaces/${props.documentId}`);
    console.log('Document reference:', docRef.path);
    await deleteDoc(docRef);
    console.log('Document deleted successfully');
    notyf.success('Espacio eliminado correctamente');
    timeout = setTimeout(() => {
      emit('delete-space', props.documentId);
      clearTimeout(timeout);
    }, 500);
  } catch (error) {
    console.error('Error details:', error);
    notyf.error('Error al eliminar el espacio: ' + error.message);
  }
}
</script>
