<template>
  <div v-if="showAddComplaint"
    class="fixed w-full max-w-md p-6 bg-white border-2 rounded-lg shadow-lg font-poppins bottom-2 left-2 border-rose-800">
    <h2 class="mb-4 text-2xl font-bold text-gray-800">Levantar una Queja</h2>
    <button @click="toggleShowAddComplaint"
      class="absolute px-4 py-2 text-white rounded-lg bg-slate-500 top-1 right-1 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
      <i class="mr-2 fas fa-times"></i>
      Cerrar
    </button>
    <form>
      <div class="mb-4">
        <label for="tipo-queja" class="block mb-2 font-bold text-gray-700">
          <i class="fas fa-exclamation-circle"></i> Tipo de Queja
        </label>
        <input v-model="complaintCategory" type="text" id="tipo-queja"
          class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ingrese el tipo de queja e.g. Corte de luz">
      </div>
      <div class="mb-4">
        <label for="resumen" class="block mb-2 font-bold text-gray-700">
          <i class="fas fa-align-left"></i> Resumen
        </label>
        <textarea v-model="complaint" id="resumen" rows="4"
          class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Describa su queja"></textarea>
      </div>
      <div class="flex justify-end">
        <button @click.prevent="addComplaint" type="submit"
          class="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <i class="fas fa-paper-plane"></i> Enviar
        </button>
      </div>
    </form>
  </div>
  <button @click="toggleShowAddComplaint"
    class="fixed px-4 py-2 text-white border-2 rounded-lg border-slate-600 bg-rose-500 font-poppins bottom-2 right-2 hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-500">
    <i class="mr-2 fas fa-plus"></i>
    Nueva Queja
  </button>
  <div class="flex flex-wrap p-4 space-y-4 bg-white rounded-lg shadow-lg justify-evenly">
    <ComplaintCard v-for="(e, index) in complaintsList.sort((a, b) => b.date - a.date)" :key="index"
      :complaint="e.complaint" :complaint-category="e.complaintCategory" :date="e.date" :document-id="e.documentId"
      :resolved="e.resolved" :resolved-by="e.resolvedBy" :resolved-date="e.resolvedDate" :user-name="e.userName"
      :user-uid="e.userUid" />

  </div>
</template>

<script lang="ts" setup>
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; // for React, Vue and Svelte
// Create an instance of Notyf
const notyf = new Notyf({
  duration: 6000,
  dismissible: true,
  position: {
    x: 'left',
    y: 'top'
  },
  ripple: true,

});
import { onMounted, ref } from 'vue';
import ComplaintCard from '../cards/ComplaintCard.vue';
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, Timestamp, updateDoc } from 'firebase/firestore';
import { sysVals } from '@/stores/sysVals';
import { ownerVals } from '@/stores/ownerVals';

const showAddComplaint = ref(false);

const complaintsList = ref([]);


const toggleShowAddComplaint = () => {
  showAddComplaint.value = !showAddComplaint.value;
}

const complaint = ref('');
const complaintCategory = ref('');


const db = getFirestore();
const complaintsCollectionRef = collection(db, `condominios/${sysVals().getAdminDocId}/complaints`);

const getComplaints = async () => {
  console.log('admin doc id ', sysVals().getAdminDocId);

  sysVals().setIsLoadingOwner(true);
  try {
    const snapshot = await getDocs(complaintsCollectionRef);
    snapshot.forEach(e => {
      complaintsList.value.push({
        ...e.data(),        // todos los datos del documento
        documentId: e.id    // agregamos el id del documento
      });
      console.log(e.id);
    });
    sysVals().setIsLoadingOwner(false);

  } catch (error) {
    sysVals().setIsLoadingOwner(false);

    console.log(error);
  }
}

const verifyAllowComments = async () => {
  const userCanComment = doc(db, 'condominios', sysVals().getAdminDocId, 'usuarios', ownerVals().getUserDataId);
  const docSnap = await getDoc(userCanComment);
  if (!docSnap.exists()) {
    console.log('No such document!');
    return false;
  } else {
    if (!docSnap.data().allowComments) {
      notyf.error('Error al agregar el comentario, no tienes permiso para comentar en este dominio');
      return false;
    }
  }
  return true;
}

const addComplaint = async () => {
  sysVals().setIsLoadingOwner(true);
   // const allowComments = await verifyAllowComments();
  // if (!allowComments) {
  //   sysVals().setIsLoadingOwner(false);
  //   return;
  // };
  try {
    const docRef = await addDoc(complaintsCollectionRef, {
      date: Timestamp.now(),
      complaint: complaint.value,
      complaintCategory: complaintCategory.value,
      resolved: false,
      resolvedDate: '',
      resolvedBy: '',
      documentId: '',
      userName: ownerVals().getOwnerName,
      userUid: sysVals().getUserUid
    })
    sysVals().setIsLoadingOwner(false);

    notyf.success('Se ha agregado la queja')
    showAddComplaint.value = false
    complaint.value = ''
    complaintCategory.value = ''
  } catch (error) {
    sysVals().setIsLoadingOwner(false);

    console.log(error);

  }
}


onMounted(() => {
  getComplaints();
})
</script>

<style scoped></style>
