<template>
  <div v-if="!showChat" class="cards-container">
    <div @click="setName(item.name,item.userUid)" v-for="(item, index) in users" :key="item.id" class="card">
      <h3><i class="fas fa-user"></i> {{ item.name }}</h3>
      <p><i class="fas fa-building"></i> Dept: {{ item.deptNumber }}</p>
      <p>
        <i class="fas fa-calendar-plus"></i>
        Se unió el: {{ formatDate(item.creationDate.seconds) }}
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
  <section>
    <ChatComponent @emmit-call="toggleChat" v-if="showChat" :name="name" :receiver="receiver" />
  </section>
</template>


<script lang="ts" setup>
import { sysVals } from '@/stores/sysVals';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { onMounted, ref } from 'vue';
import ChatComponent from './ChatComponent.vue';


//Firebase utils
const db = getFirestore();
const collectionUsers = collection(db, `condominios/${sysVals().getAdminDocId}/usuarios`);
const qGetUsers = query(collectionUsers, where('userUid', '!=', 'owner'));



const getUsers = async () => {
  const querySnapshot = await getDocs(qGetUsers);
  users.value = [];
  users.value.push(...querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
};


onMounted(() => {
  getUsers();
})

const users = ref([])

const formatDate = (seconds) => {
  const date = new Date(seconds * 1000)
  return date.toLocaleDateString()
}

const emmitCall = ()=> {
  toggleChat()
}
const name = ref('')
const receiver = ref('')

const showChat = ref(false)

const toggleChat = () => {
  showChat.value = !showChat.value
}

const setName = (nameId: string , receiverId: string) => {
  name.value = nameId;
  receiver.value = receiverId;

  console.log(nameId);

  toggleChat();
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