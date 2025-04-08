<template>
  <div class="cards-container">
    <div v-for="(item, index) in users" :key="item.id" class="card">
      <h3><i class="fas fa-user"></i> {{ item.name }}</h3>
      <p><i class="fas fa-building"></i> Dept: {{ item.deptNumber }}</p>
      <p>
        <i class="fas fa-calendar-plus"></i>
        Creado: {{ formatDate(item.creationDate.seconds) }}
      </p>
      <p>
        <i class="fas fa-comment-dots"></i>
        Comentarios: <strong>{{ item.allowComments ? 'Permitidos' : 'No permitidos' }}</strong>
      </p>
      <p>
        <i class="fas fa-ban"></i>
        Bloqueado: <strong>{{ item.isBlocked ? 'Sí' : 'No' }}</strong>
      </p>
      <button class="px-4 py-2 mt-5 text-white bg-sky-800 rounded-2xl"><v-icon name="fa-comment-dots" class="text-white"></v-icon> Iniciar chat</button>
    </div>
  </div>
</template>


<script lang="ts" setup>
import { sysVals } from '@/stores/sysVals';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { ref } from 'vue';


//Firebase utils
const db = getFirestore();
const collectionUsers = collection(db, `condominios/${sysVals().getAdminDocId}/usuarios`);
const qGetUsers = query(collectionUsers, where('userUid', '!=', 'owner'));



const getUsers = async () => {
  const querySnapshot = await getDocs(qGetUsers);
  users.value = [];
  users.value.push(...querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
};

getUsers();


const users = ref([
  {
    id: 'O2Zxr3WhfoVAPQLdAJnYi4tX0vK2',
    firstCreation: true,
    deptNumber: '87',
    docId: '',
    blockedReason: '',
    creationDate: { seconds: 1741284759, nanoseconds: 748000000 },
    isBlocked: false,
    allowComments: true,
    userUid: 'O2Zxr3WhfoVAPQLdAJnYi4tX0vK2',
    associatedTo: 'G5wuoTUz1wZiwRCTits2Gf1loGK2',
    name: 'Mariana Rodriguex',
  },
  {
    id: 'm4KXc5D43nPOYgUe5jzZRsHSG3F3',
    blockedReason: '',
    firstCreation: true,
    userUid: 'm4KXc5D43nPOYgUe5jzZRsHSG3F3',
    associatedTo: 'G5wuoTUz1wZiwRCTits2Gf1loGK2',
    deptNumber: '123C',
    allowComments: true,
    isBlocked: false,
    name: 'Pablo Alejandro Carbajal Aburto',
    docId: '',
    creationDate: { seconds: 1741118459, nanoseconds: 563000000 },
  },
])

const formatDate = (seconds) => {
  const date = new Date(seconds * 1000)
  return date.toLocaleDateString()
}
</script>

<style scoped>
.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  padding: 1rem;
}
.card {
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  background-color: white;
}
.card i {
  margin-right: 0.5rem;
  color: #666;
}
</style>