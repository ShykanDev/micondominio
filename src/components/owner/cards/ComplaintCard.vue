<template>
    <div class="w-full max-w-sm p-2 px-5 shadow-lg bg-slate-50 rounded-2xl">
        <div class="flex items-center justify-between mb-3">
            <h2 class="flex items-center text-2xl font-semibold text-rose-800">
                <i class="mr-2 fas fa-exclamation-triangle"></i> {{ complaintCategory }}
            </h2>
        </div>
        <div class="mb-3">
            <h3 class="flex items-center text-xl font-medium text-gray-700">
                <i class="mr-2 fas fa-user-circle"></i> Nombre del usuario que reporta: <span>{{ userName }}</span>
            </h3>
        </div>
        <div class="mb-3">
            <p class="flex items-center text-gray-600">
                <i class="mr-2 fas fa-align-justify"></i>{{ complaint }}
            </p>
        </div>
        <div class="mb-3">
            <p class="flex items-center text-gray-600">
                <i class="mr-2 fas fa-calendar-day"></i> Fecha de la Queja: {{ formattedDate}}
            </p>
        </div>
        <div class="flex justify-end">
            <!-- <button class="px-5 py-2 text-white bg-red-600 rounded-full hover:bg-red-800">
                Borrar
            </button> -->
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
  complaint:{
    type: String,
    required: true
  },
  complaintCategory:{
    type: String,
    required: true
  },
  date:{
    type: String,
    required: true
  },
  documentId:{
    type: String,
    required: true
  },
  resolved:{
    type: Boolean,
    required: true
  },
  resolvedBy:{
    type: String,
    required: true
  },
  resolvedDate:{
    type: String,
    required: true
  },
  userUid:{
    type: String,
    required: true
  },
  userName:{
    type: String,
    required: true
  },

})


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
