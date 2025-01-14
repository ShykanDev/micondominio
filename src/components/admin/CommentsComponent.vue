<template>
   <section class="w-full p-6 mx-auto mt-10 overflow-auto bg-white rounded-lg shadow-md min-h-dvh font-poppins">
    <section v-if="isLoading" class="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-white bg-opacity-0">
      <LoadingBar/>
    </section>
        <h2 class="text-2xl font-bold text-center text-sky-800 ">Comentarios de sus propietarios<i class="ml-2 fas fa-comment"></i><i class="ml-2 fas fa-users"></i></h2>
      <article>
         <CommentCard v-for="(comment,index) in commentsFirebase" :key="index" :comment="comment.announcement" :user-name="comment.author" :user-type="comment.category" :date="new Date().toDateString(comment.date)"  :comment-id="comment.documentId" />
      </article>
    </section>
</template>

<script lang="ts" setup>
import { sysVals } from '@/stores/sysVals';
import CommentCard from './CommentCard.vue';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { onMounted, ref, type Ref } from 'vue';
import LoadingBar from '../animations/LoadingBar.vue';

const isLoading = ref(false);

interface iComment {
  announcement: string,
  author:string,
  category:string,
  date:object,
  documentId:string
}

const db = getFirestore();

const commentsRef = collection(db, `condominios/${sysVals().getAdminDocId}/comments`);
const qComments = query(commentsRef, where('announcement','!=', ''));

const commentsFirebase: Ref <Array<iComment>> = ref([]);
const getComments = async () => {
  isLoading.value = true;
  try {
    const snapshot = await getDocs(qComments)
    snapshot.forEach(e => {
      commentsFirebase.value.push(e.data() as iComment)
    })
    isLoading.value =false;

  } catch (error) {
    isLoading.value =false;
    console.log(error);
  }
}

onMounted(()=> {
  getComments();
})

</script>

<style scoped>

</style>
