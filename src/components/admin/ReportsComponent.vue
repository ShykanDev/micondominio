<template>
  <div class="flex flex-wrap gap-5 p-6 bg-white rounded-lg shadow justify-evenly">
    <ReportsCard v-for="(e, index) in complaints.sort((a, b) => b.date - a.date)" :key="index" :complaint="e.complaint"
      :complaint-category="e.complaintCategory" :date="e.date" :document-id="e.documentId" :resolved="e.resolved"
      :resolved-by="e.resolvedBy" :resolved-date="e.resolvedDate" :user-name="e.userName" :user-uid="e.userUid" />
  </div>
</template>

<script lang="ts" setup>
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import ReportsCard from './ReportsCard.vue';
import { sysVals } from '@/stores/sysVals';
import { onMounted, ref } from 'vue';

const db = getFirestore();
const complaints = ref([]);
const surveysCollectionRef = collection(db, `condominios/${sysVals().getAdminDocId}/complaints`);

const getComplaints = async () => {
  try {
    const snapshot = await getDocs(surveysCollectionRef);
    snapshot.forEach(e => {
      complaints.value.push(e.data())
    })
  } catch (error) {
    console.log(error);
  }
}
// PFiuZF33
onMounted(() => {
  getComplaints();
})
</script>

<style scoped></style>
