<template>
  <!-- <div class=""> -->
    <div class="grid grid-cols-2 gap-4">
      <PrivateReportsCard v-for="(e, index) in complaintsAdmin.sort((a, b) => b.date - a.date)" :key="index" :complaint="e.complaint"
        :complaint-category="e.complaintCategory" :date="e.date" :document-id="e.documentId" :resolved="e.resolved"
        :resolved-by="e.resolvedBy" :resolved-date="e.resolvedDate" :user-name="e.userName" :user-uid="e.userUid" />
      </div>

  <!-- </div> -->
</template>

<script lang="ts" setup>
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import PrivateReportsCard from './PrivateReportsCard.vue';
import { sysVals } from '@/stores/sysVals';
import { onMounted, ref } from 'vue';

const db = getFirestore();
const complaintsAdmin = ref([]);
const surveysCollectionRef = collection(db, `condominios/${sysVals().getAdminDocId}/complaintsAdmin`);

const getComplaints = async () => {
  complaintsAdmin.value = [];
  try {
    console.log('Getting complaints');

    const snapshot = await getDocs(surveysCollectionRef);
    snapshot.forEach(e => {
      console.log(e);
      console.log(e.data());
      complaintsAdmin.value.push({
        ...e.data(),
        documentId: e.id
      });
    })
  } catch (error) {
    console.log(error);
  }
}

onMounted(() => {
  getComplaints();
})
</script>

<style scoped></style>
