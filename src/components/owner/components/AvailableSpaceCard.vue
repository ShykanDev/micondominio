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
      <img v-if="image" :src="image" class="object-cover rounded-lg w-fullaad">
    </article>
    <div class="flex justify-end w-full">



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
  image: String
})

const formattedDate = computed(() => {
  if (!props.date?.toDate) return ''
  return props.date.toDate().toLocaleDateString()
})


</script>
