<template>
    <div class="bg-white rounded-lg shadow-lg">
      <section v-if="announcementsFirebase" class="flex flex-wrap items-center justify-evenly ">
        <AnnouncementCard v-for="(e, index) in announcementsFirebase.sort((a, b) => b.creationDate - a.creationDate)" :key="index" :category="e.category" :title="e.title" :description="e.description" :date="e.creationDate"
        :isUrgent="e.urgent" :img="e.imageUrl" :announcementId="e.announcementId" />
      </section>
    </div>
</template>

<script lang="ts" setup>
import { collection, doc, getDocs, getFirestore, query, where } from 'firebase/firestore';
import AnnouncementCard from './AnnouncementCard.vue';
import { onMounted, ref } from 'vue';
import { sysVals } from '@/stores/sysVals';


const db = getFirestore();

const announcementsFirebase = ref([]);
const isLoading = ref(false);

const announcementsRef = collection(db, `condominios/${sysVals().getCondominiumId}/announcements`);
const q = query(announcementsRef, where('category', '!=', ''));
const getAnnouncements = async () => {
  announcementsFirebase.value = []
  try {
    isLoading.value = true;
    const snapshot = await getDocs(q);
    if(snapshot.empty){
      console.log('No se encontraron anuncios');
    } else {
      snapshot.forEach(e => {
        console.log(e.data());
        announcementsFirebase.value.push(e.data())
      })
    }
  } catch (error) {
    console.error(error);
  }
}

onMounted(() => {
  getAnnouncements()
})
</script>

<style scoped>

</style>
