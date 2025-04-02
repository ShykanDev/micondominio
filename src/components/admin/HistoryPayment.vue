<template>
  <div class="overflow-y-auto max-h-dvh">
    <h1 class="mb-4 text-3xl font-bold text-center text-sky-800 font-poppins">Historial de pagos</h1>

    </div>
    <section class="px-20">
      <article v-if="maintenanceHistoryArr.length > 0">
        <div v-for="(data, index) in maintenanceHistoryArr as IHistoryPayment[]" :key="index" class="my-4" >
         <HistoryPaymentCard :data="data"  />
        </div>
      </article>
    </section>

</template>

<script lang="ts" setup>
import type { IHistoryPayment } from '@/interfaces/Interfaces';
import { sysVals } from '@/stores/sysVals';
import { collection, getDocs, getFirestore, query, where, deleteDoc, doc } from 'firebase/firestore';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import { onMounted, onUnmounted, ref } from 'vue';
import HistoryPaymentCard from './HistoryPaymentCard.vue';

const notyf = new Notyf({
  duration: 4000,
  position: {
    x: 'left',
    y: 'top'
  },
  ripple: true
});

const viewMode = ref<'list' | 'grid'>('grid')

const toggleViewMode = () => {
  viewMode.value = viewMode.value === 'grid' ? 'list' : 'grid'
}
const maintenanceHistoryArr = ref<IHistoryPayment[]>([]);
const db = getFirestore();
const collectionHistoryPayments = collection(db, `condominios/${sysVals().getCondominiumId}/maintenanceHistory/`);
const qGetHistoryPayments = query(collectionHistoryPayments, where('date', '!=', 'asd'));

const getHistoryPayments = async () => {
  try {
    maintenanceHistoryArr.value = [];
    const querrySnapshot = await getDocs(qGetHistoryPayments);
    querrySnapshot.forEach(e => {
      maintenanceHistoryArr.value.push({ ...e.data(), id: e.id } as IHistoryPayment)
      console.log(e.data());
    })
  } catch (error) {
    notyf.error(`Error al recibir los datos, ${error}`)
    console.log(error);
  }
}



onMounted(() => {
  getHistoryPayments();
})

onUnmounted(()=> {
  maintenanceHistoryArr.value = []
})
</script>

<style scoped>
article {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 1rem;
}
</style>