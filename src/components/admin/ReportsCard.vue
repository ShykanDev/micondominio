<template>
      <div class="w-full max-w-sm p-6 rounded-lg shadow-md bg-slate-50">
        <div class="flex items-center justify-between mb-4">
            <h2 class="flex items-center text-xl font-semibold text-gray-800">
                <i class="mr-2 fas fa-exclamation-circle"></i> {{ complaintCategory }}
            </h2>

        </div>
        <div class="mb-4">
            <h3 class="flex items-center text-lg font-medium text-gray-700">
                <i class="mr-2 fas fa-user"></i> {{userName}}
            </h3>
        </div>
        <div class="mb-4">
            <p class="flex items-center text-gray-600">
                <i class="mr-2 fas fa-align-left"></i> {{ complaint }}
            </p>
        </div>
        <div class="mb-4">
            <p class="flex items-center text-gray-600">
                <i class="mr-2 fas fa-calendar-alt"></i> {{ formattedDate }}
            </p>
        </div>
        <div class="flex justify-end">
            <button @click="handleDelete" class="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-700">
                Borrar
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { sysVals } from '@/stores/sysVals';
import { deleteDoc, doc, getFirestore } from 'firebase/firestore';
import { computed } from 'vue';

const props = defineProps({
  complaint: {
    type: String,
    required: true,
  },
  complaintCategory: {
    type: String,
    required: true,
  },
  date: {
    type: Object,
    required: true,
  },
  documentId: {
    type: String,
    required: true,
  },
  resolved: {
    type: Boolean,
    required: true,
  },
  resolvedBy: {
    type: String,
    required: true,
  },
  resolvedDate: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  userUid: {
    type: String,
    required: true,
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


const db = getFirestore();
const handleDelete = async () => {
  sysVals().setIsLoadingComponent(true);
  try {
    const docRef = doc(db, `condominios/${sysVals().getAdminDocId}/complaints`, props.documentId);
    await deleteDoc(docRef);
    sysVals().setIsLoadingComponent(false);
  } catch (error) {
    sysVals().setIsLoadingComponent(false);
    console.log(error);
  }
}
</script>

<style scoped>

/* <!-- announcement
"Primer comentario generado automáticamente"
(string)


author
"administrador Alejandro Carbajal"
(string)


category
"Inquilinos"
(string)


date
January 14, 2025 at 7:46:25 PM UTC-6
(timestamp)


documentId
"vJ58H6wViZxnfRVKohyY"
(string)


fromAdmin
false
(boolean)


isUrgent
false --> */
</style>
