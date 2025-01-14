<template>
   <MainLayout>
    <template #main>
     <section>
       <input v-model="invitationId" class="p-2 border rounded " type="text" placeholder="Ingresa el codigo de invitación">
       <button class="p-2 text-white bg-blue-500 rounded" @click="handleCreation">Crear cuenta propietario</button>
     </section>
    </template>
   </MainLayout>
</template>

<script lang="ts" setup>
import MainLayout from '@/layouts/MainLayout.vue';
import { collection, getDocs, getFirestore, query,  where } from 'firebase/firestore';
import { ref  } from 'vue';


const db = getFirestore();
const usuariosRef = collection(db,'usuarios');
const condiminiosRef = collection(db,'condominios');
const invitationId = ref('');

const handleCreation = async () => {
  try {

    // search if the invitation id exists on firebase and then extract the document id,
    const queryAdminCollectionId = query(condiminiosRef, where('invitationId', '==', invitationId.value));
    const snapshot = await getDocs(queryAdminCollectionId);
    if(snapshot.empty){
      console.log('No se enocontró ese código de invitación')
      return;
    } else{
      snapshot.forEach(e => {
        console.log('Encontrado:')
        console.log(e.data());
        console.log('Id:')
        console.log(e.id);

      })
    }



  //  await addDoc(usuariosRef,{
  //     name:"Alejandro Carbajal",
  //     deptNumber:'98a',
  //     creationDate:Timestamp.now(),
  //     role:'Propietario',
  //     idBlocked:false,
  //     idBlockedDate:'',
  //     blockedReason:'',
  //   })
  //   alert('Cuenta creada')

  } catch (error) {
    console.log(error)
  }
}

</script>

<style scoped>

</style>
