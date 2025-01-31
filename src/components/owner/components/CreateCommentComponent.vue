<!-- Create comment -->
<template>
    <div class="flex w-full p-4 bg-white shadow-lg ]">
      <section class="w-full p-6 mt-10 rounded-lg shadow-md bg-slate-50">
        <h2 class="mb-4 text-2xl font-bold font-signika text-sky-800">Crear Nuevo Comentario</h2>
        <form class="space-y-4 font-poppins">
            <div>
                <label for="categoria" class="block text-sm font-medium text-gray-700">Categoría</label>
                <div class="relative mt-1 rounded-md shadow-sm">
                    <input v-model="category" type="text" id="categoria" name="categoria" class="block w-full p-3 pr-10 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm outline-sky-900" placeholder="Escribe la categoría. Ejemplo: Servicios, Sugerencias, General, Información">
                    <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <i class="text-gray-400 fas fa-tags"></i>
                    </div>
                </div>
            </div>
            <div>
                <label for="mensaje" class="block text-sm font-medium text-gray-700">Mensaje</label>

                <div class="relative mt-1 rounded-md shadow-sm">
                    <textarea v-model="message" id="mensaje" name="mensaje" rows="4" class="block w-full pr-10 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Escriba su mensaje, este mensaje será visible para todos los propietarios de su edificio/condominio"></textarea>
                    <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <i class="text-gray-400 fas fa-comment"></i>
                    </div>
                </div>
            </div>
            <div>
                <button @click.prevent="handleSendComment" type="submit" class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
                    <i class="mr-2 fas fa-paper-plane"></i> Enviar
                </button>
            </div>
        </form>
    </section>
    </div>
</template>

<script lang="ts" setup>
import { addDoc, collection, doc, getDoc, getFirestore, setDoc, Timestamp, updateDoc } from 'firebase/firestore';
import { sysVals } from '../../../stores/sysVals';
import { ref } from 'vue';
import { ownerVals } from '@/stores/ownerVals';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; // for React, Vue and Svelte
import { getAuth } from 'firebase/auth';
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

const db = getFirestore();

const category= ref('');
const message = ref('');
const auth = getAuth();
const verifyAllowComments = async () => {
  // const userCanComment = doc(db, 'condominios', sysVals().getAdminDocId, 'usuarios', ownerVals().getUserDataId);
  // const docSnap = await getDoc(userCanComment);
//     if (!docSnap.exists()) {
//       console.log('No such document!');
//       return false;
//     } else {
//         if (!docSnap.data().allowComments){
//           notyf.error('Error al agregar el comentario, no tienes permiso para comentar en este dominio');
//           return false;
//         }
//     }
//     return true;
// }
}
const handleSendComment = async () => {
  const messagesCollectionRef = collection(db, `condominios/${sysVals().getAdminDocId}/comments`);
  sysVals().setIsLoadingOwner(true);
  try {

      const docRef = await addDoc(messagesCollectionRef, {
        announcement: message.value,
        author: ownerVals().getOwnerName,
        category: category.value,
        date: Timestamp.now(),
        documentId: '',
        condomainId: sysVals().getAdminDocId,
        createdBy: sysVals().getUserUid
      })
      await updateDoc(docRef, {
          documentId: docRef.id
      })
      // if (auth.currentUser) {
      //   const messageCreatorCollectionRef = doc(db, `condominios/${sysVals().getAdminDocId}/comments/${docRef.id}/createdBy/${auth.currentUser.uid}`);
      //   await setDoc(messageCreatorCollectionRef, {
      //     creationDate: Timestamp.now(),
      //     userUid: auth.currentUser.uid,
      //     userName: ownerVals().getOwnerName,
      //     announcement: message.value,
      //     category: category.value
      //   });
      // } else {
      //   console.log('No hay un usuario logueado');
      //   notyf.error('No hay un usuario logueado');
      //   sysVals().setIsLoadingOwner(false);
      //   return;
      // }




      sysVals().setIsLoadingOwner(false);
      notyf.success('Se ha agregado el comentario')
      category.value = '';
      message.value = '';


  } catch (error) {
    sysVals().setIsLoadingOwner(false);
    notyf.error('Error al agregar el comentario')
      console.log(error);

  }
}

</script>
<style scoped>

</style>
