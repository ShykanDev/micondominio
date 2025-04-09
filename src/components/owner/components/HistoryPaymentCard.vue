<template>
     <div v-if="viewMode === 'list'" @click="toggleViewMode" class="flex flex-col items-center p-8 w-full bg-slate}
      rounded-2xl cursor-pointer">
            <div class="flex gap-4 items-center">
              <v-icon name="fa-file-invoice-dollar" class="text-3xl text-sky-600" />
              <h3 class="text-2xl text-center text-sky-900">{{ data.title }}</h3>
            </div>
            <img v-if="data.imgUrl" :src="data.imgUrl" alt="Imágen del pago de mantenimiento" class="rounded-2xl">
            <p class="text-xl font-medium text-sky-600">Descripción del pago: <span class="text-slate-800">{{ data.description }}</span></p>

          </div>
          <div v-else @click="toggleViewMode" class="flex flex-col items-center p-4 mx-4 w-64 rounded-2xl transition-transform duration-300 cursor-pointer hover:scale-105 bg-slate-50">
            <div class="flex gap-4 items-center">
              <v-icon name="fa-file-invoice-dollar" class="text-2xl text-sky-600" />
              <h3 class="text-xl text-center text-sky-900">{{ data.title }}</h3>
            </div>
            <img v-if="data.imgUrl" :src="data.imgUrl" alt="Imágen del pago de mantenimiento" class="w-48 rounded-2xl">
            <p class="text-base font-medium text-sky-600">Descripción del pago: <span class="text-slate-800">{{ data.description }}</span></p>

          </div>
</template>

<script lang="ts" setup>
import type { IHistoryPayment } from '@/interfaces/Interfaces';
import { deleteDoc, doc, getFirestore } from 'firebase/firestore';
import { Notyf } from 'notyf';
import { sysVals } from '@/stores/sysVals';
import { computed, ref } from 'vue';

const db = getFirestore();
const notyf = new Notyf({
  duration: 4000,
  position: {
    x: 'left',
    y: 'top'
  },
  ripple: true
});
const props = defineProps({
  data: {
    type: Object as () => IHistoryPayment,
    required: true
  }
})
const viewMode = ref<'list' | 'grid'>('grid')
const toggleViewMode = () => {
  viewMode.value = viewMode.value === 'grid' ? 'list' : 'grid'
}

const deletePayment = async (id: string) => {
  try {
    await deleteDoc(doc(db, `condominios/${sysVals().getCondominiumId}/maintenanceHistory/${id}`));
    notyf.success('Pago eliminado exitosamente');
  } catch (error) {
    notyf.error(`Error al eliminar el pago: ${error}`);
    console.log(error);
  }
}
</script>

<style scoped>

</style>