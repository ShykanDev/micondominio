<template>
    <div class="flex flex-wrap gap-3 p-4 bg-white shadow-lg justify-evenly">
        <AnnouncementCard v-for="(e, index) in announcementsFirebase" :key="index" :category="e.category" :announcement-id="e.announcementId" :date="e.creationDate" :description="e.description" :img="e.imageUrl"  :is-urgent="e.urgent" :title="e.title" />
    </div>
</template>

<script lang="ts" setup>
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import AnnouncementCard from '../cards/AnnouncementCard.vue';
import { sysVals } from '@/stores/sysVals';
import { onMounted, ref } from 'vue';

const db = getFirestore();
const announcementsFirebase = ref([]);
const announcementsRef = collection(db, `condominios/${sysVals().getAdminDocId}/announcements`);

const getAnnouncements = async () => {
  sysVals().setIsLoadingOwner(true);
  try {
    const snapshot = await getDocs(announcementsRef);
    snapshot.forEach(e => {
      console.log(e.data());
      announcementsFirebase.value.push(e.data())
    })
    sysVals().setIsLoadingOwner(false);

  } catch (error) {
    console.log(error);
    sysVals().setIsLoadingOwner(false);

  }
}

onMounted(() => {
  getAnnouncements();
})
</script>

<style scoped>

</style>
