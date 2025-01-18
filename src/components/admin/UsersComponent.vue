<template>
  <div v-if="usersFbse" class="flex flex-wrap items-center py-2 space-y-3 bg-white rounded-lg shadow-md justify-evenly">
    <UserCard v-for="(user, index) in usersFbse" :key="index" :allow-comments="user.allowComments" :name="user.name"
      :associated-to="user.associatedTo" :blocked-reason="user.blockedReason" :creation-date="user.creationDate"
      :dept-number="user.deptNumber" :is-blocked="user.isBlocked" :user-uid="user.userUid" :doc-id="user.docId" />
  </div>
</template>

<script lang="ts" setup>
import { sysVals } from '@/stores/sysVals';
import UserCard from '@/views/UserCard.vue';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { onMounted, ref } from 'vue';
const usersFbse = ref([]);


const db = getFirestore();

const usersRef = collection(db, `condominios/${sysVals().getCondominiumId}/usuarios`);
const getUsers = async () => {
  try {
    const querySnapshot = await getDocs(usersRef);
    if (querySnapshot.empty) {
      console.log('No se encontraron usuarios');
      return
    }
    else {
      querySnapshot.forEach((doc) => {
        // console.log(doc.data());
        usersFbse.value.push(doc.data())
      });
    }
  } catch (error) {
    console.log(error);
  }
}


onMounted(() => {
  getUsers()
})
</script>

<style scoped></style>
