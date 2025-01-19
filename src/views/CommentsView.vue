<template>
  <MainLayout>
    <template #main>
      <section class="animate-fade-up">

        <section class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 -z-10 ">
        </section>
        <img class="fixed top-0 bottom-0 left-0 right-0 w-full -z-20"
          src="https://images.pexels.com/photos/7195310/pexels-photo-7195310.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="">
        <section class="p-6 font-poppins">
          <h2 class="mb-4 text-2xl font-semibold text-center text-white">Comentarios</h2>
          <p class="mb-6 text-lg text-center text-white">
            ¡Bienvenido! Siéntase libre de dejar un comentario, ya sea como administrador o como inquilino.
            Comparta sus experiencias, ya sean positivas o negativas, sobre la administración de su condominio o
            edificio, o sobre su experiencia como administrador. Ya sea que quiera hablar sobre el servicio,
            las instalaciones o la comunicación, ¡todos los comentarios son bienvenidos!
          </p>
          <section class="flex flex-wrap gap-4 max-h-[600px] overflow-y-scroll py-6">
            <CommentCard v-for="(e, index) in comments" :key="index" :comment="e.comment" :date="e.date" :name="e.name"
              :title-comment="e.commentTitle" />

          </section>
          <div class="p-6 bg-white rounded-lg shadow-md">
            <h3 class="mb-4 text-xl font-semibold">Deja tu comentario</h3>

            <form action="#" method="POST">
              <!-- Title Input -->
              <div class="mb-4">
                <label for="commentTitle" class="block text-sm font-medium text-gray-700">Título del comentario</label>
                <input v-model="commentTitle" type="text" id="commentTitle" name="commentTitle" required
                  class="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
              </div>

              <!-- Comment Textarea -->
              <div class="mb-4">
                <label for="comment" class="block text-sm font-medium text-gray-700">Comentario</label>
                <textarea v-model="comment" id="comment" name="comment" rows="4" required
                  class="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"></textarea>
              </div>

              <!-- Submit Button -->
              <div class="flex justify-center">
                <button @click.prevent="handleSendComment" type="submit"
                  class="px-6 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  Enviar Comentario
                </button>
              </div>
            </form>
          </div>
        </section>
      </section>

    </template>
  </MainLayout>
</template>

<script lang="ts" setup>
import CommentCard from '@/components/base/CommentCard.vue';
import MainLayout from '@/layouts/MainLayout.vue';
import { sysVals } from '@/stores/sysVals';
import { addDoc, collection, getDocs, getFirestore, query, Timestamp, where } from 'firebase/firestore';
import { onMounted, ref } from 'vue';
const commentTitle = ref('')
const comment = ref('')

const db = getFirestore();
const commentsGeneralRef = collection(db, 'commentsGeneral');

const handleSendComment = async () => {
  try {
    await addDoc(commentsGeneralRef, {
      name: sysVals().getActualUserName,
      date: Timestamp.now(),
      comment: comment.value,
      commentTitle: commentTitle.value,
    })
  } catch (error) {

  }
}

const comments = ref([]);

const getComments = async () => {
  try {
    const qComments = query(commentsGeneralRef, where('date', '!=', ''));
    const snapshot = await getDocs(qComments);
    if (!snapshot.empty) {
      snapshot.forEach(e => {
        comments.value.push(e.data())
      })
    } else {
      return
    }
  } catch (error) {
    return
  }
}

onMounted(() => {
  getComments();
})

</script>

<style scoped></style>
