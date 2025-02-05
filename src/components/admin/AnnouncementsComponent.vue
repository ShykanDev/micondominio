<template>
    <div class="bg-white rounded-lg shadow-lg">
      <section v-if="announcementsFirebase" class="flex flex-wrap items-center justify-evenly ">
        <AnnouncementCard v-for="(e, index) in announcementsFirebase.sort((a, b) => b.creationDate - a.creationDate)" :key="index" :category="e.category" :title="e.title" :description="e.description" :date="e.creationDate"
        :isUrgent="e.urgent" :img="e.imageUrl" :announcementId="e.announcementId" :responses="e.responses" />
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
// const announcementsAnswersFirebase = ref([]);
const isLoading = ref(false);

const announcementsRef = collection(db, `condominios/${sysVals().getCondominiumId}/announcements`);
const announcementsAnswersRef = collection(db, `condominios/${sysVals().getCondominiumId}/announcementsAnswers`);
const q = query(announcementsRef, where('category', '!=', ''));
const q2 = query(announcementsAnswersRef, where('associatedTo', '!=', ''));

const getAnnouncements = async () => {
  announcementsFirebase.value = [];
  try {
    isLoading.value = true;
    const snapshot = await getDocs(q);
    const snapshot2 = await getDocs(q2);

    if (snapshot.empty) {
      console.log('No se encontraron anuncios');
    }
    if (snapshot2.empty) {
      console.log('No se encontraron respuestas');
    } else {
      snapshot.forEach(announcementDoc => {
        const announcementData = announcementDoc.data();
        const responses = [];

        // Recorremos las respuestas y las agregamos al array si están asociadas al anuncio
        snapshot2.forEach(answerDoc => {
          const answerData = answerDoc.data();
          if (answerData.associatedTo === announcementDoc.id) {
            responses.push(answerData);
          }
        });

        // Agregamos el anuncio con sus respuestas asociadas
        announcementsFirebase.value.push({
          ...announcementData,
          responses
        });
      });
    }

    console.log(announcementsFirebase.value);
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};


onMounted(() => {
  getAnnouncements()
})
</script>

<style scoped>

</style>
