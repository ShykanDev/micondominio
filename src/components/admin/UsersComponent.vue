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
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { onMounted, ref, type Ref } from 'vue';

// generating interface for users
interface User {
  allowComments: boolean;
  name: string;
  associatedTo: string;
  blockedReason: string;
  creationDate: any;
  deptNumber: string;
  isBlocked: boolean;
  userUid: string;
  docId: string;
}
const usersFbse:Ref<Array<User>> = ref([]);

const db = getFirestore();

const usersRef = collection(db, `condominios/${sysVals().getCondominiumId}/usuarios`);
// const qUsers = query(usersRef, where('asociatedTo', '==', sysVals().getUserUid));
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
