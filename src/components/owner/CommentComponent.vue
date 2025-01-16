<template>
  <div class="max-w-md mx-auto mt-10 overflow-hidden bg-white rounded-lg shadow-lg">
    <!-- popup to report comment -->
    <section v-if="ownerVals().getShowReportComment"
      class="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center w-full bg-black bg-opacity-65 font-poppins animate-fade animate-duration-300">
      <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-lg animate-fade-up">
        <h2 class="mb-4 text-xl font-bold">¿Deseas enviar el reporte de este comentario al administrador?</h2>
        <p class="mb-4 text-sm">Si crees que este comentario infringe los términos y condiciones o contiene lenguaje
          ofensivo, puedes reportarlo al administrador para su revisión.</p>
        <div class="flex justify-end space-x-4 font-signika">
          <button @click="ownerVals().setShowReportComment(false)"
            class="px-4 py-2 text-gray-700 bg-gray-300 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50">Cancelar</button>
          <button @click="ownerVals().setShowReportComment(false)"
            class="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">Reportar</button>
        </div>
      </div>
    </section>
    <!-- popup to answer comment -->

      <div v-if="ownerVals().getShowPopUpAnswerComment" class="fixed left-0 w-full max-w-md p-6 bg-white border-t-2 border-b-2 border-r-2 rounded-lg shadow-lg bottom-1">
        <i @click="ownerVals().setClosePopUpAnswerComment()" class="absolute top-0 text-2xl cursor-pointer right-2 hover:text-sky-300 text-sky-500 fas fa-times" title="cerrar"></i>
        <div class="flex items-center mb-4 ">
          <i class="mr-3 text-3xl text-sky-500 fas fa-comment"></i>
          <div>
            <h2 class="text-lg font-bold font-poppins">
              Responder a <span class="text-blue-500 underline font-poppins">{{ownerVals().getAnswerCommentTo }}</span>
            </h2>

          </div>
        </div>
        <textarea class="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 "
          placeholder="Escribe tu respuesta aquí..." rows="4"></textarea>
        <button
          class="w-full py-2 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 font-signika">
          <i class="mr-2 fas fa-paper-plane">
          </i>
          Enviar
        </button>
      </div>

    <section>
      <CommentCard v-for="(comment, index) in commentsFbase" :key="index" :comment="comment.announcement"
        :date="comment.date" :from-admin="comment.fromAdmin" :is-urgent="isUrgent" :user-name="comment.author"
        :user-type="comment.category" />
    </section>
  </div>
</template>

<script lang="ts" setup>
import { addDoc, collection, getDocs, getFirestore, Timestamp } from 'firebase/firestore';
import CommentCard from './CommentCard.vue';
import { sysVals } from '@/stores/sysVals';
import { onMounted, ref } from 'vue';
import { ownerVals } from '@/stores/ownerVals';

const commentsFbase = ref<Array<object>>([])
const db = getFirestore();

const getComments = async () => {
  const collectionCommentsRef = collection(db, `condominios/${sysVals().getAdminDocId}/comments`);

  try {
    const snapshot = await getDocs(collectionCommentsRef);
    snapshot.forEach(e => {
      commentsFbase.value.push(e.data())
    })
  } catch (error) {
    console.log(error);
  }
}


onMounted(() => {
  getComments();
})

// Add response comment to firebase
const commentRef = collection(db, `condominios/${sysVals().getAdminDocId}/comments`);

const answerComment = async () => {
  try {
    await addDoc(commentRef, {
      announcement: ownerVals().getAnswerCommentTo,
      author: ownerVals().getOwnerName,
      category: 'Respuesta a comentario',
      date: Timestamp.now(),
    })
  } catch (error) {
    console.log(error);

  }
}
</script>

<style scoped></style>
