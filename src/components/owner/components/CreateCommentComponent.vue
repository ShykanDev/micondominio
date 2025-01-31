<!-- Create comment -->
<template>
<div class="flex w-full p-4 border shadow-xl bg-slate-100 backdrop-blur-sm rounded-2xl border-gray-100/50">
    <section class="w-full p-8 border shadow-inner rounded-xl bg-gradient-to-br from-white/50 to-gray-50/30 border-gray-200/20">
        <h2 class="mb-6 text-3xl font-bold text-transparent font-signika bg-gradient-to-r from-sky-700 to-blue-600 bg-clip-text">
            Crear Nuevo Comentario
        </h2>

        <form class="space-y-6 font-poppins">
            <div>
                <label for="categoria" class="block mb-2 text-sm font-medium text-slate-600/90">Categoría</label>
                <div class="relative mt-1 transition-shadow duration-200 rounded-lg shadow-sm hover:shadow-md">
                    <input
                        v-model="category"
                        type="text"
                        id="categoria"
                        name="categoria"
                        class="block w-full px-4 py-3 transition-all border rounded-lg outline-none pr-11 text-slate-700 border-gray-300/50 focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500/80 placeholder:text-slate-400/80"
                        placeholder="Escribe la categoría. Ejemplo: Servicios, Sugerencias, General, Información">
                    <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <i class="text-sm text-slate-400/80 fas fa-tags"></i>
                    </div>
                </div>
            </div>

            <div>
                <label for="mensaje" class="block mb-2 text-sm font-medium text-slate-600/90">Mensaje</label>
                <div class="relative mt-1 transition-shadow duration-200 rounded-lg shadow-sm hover:shadow-md">
                    <textarea
                        v-model="message"
                        id="mensaje"
                        name="mensaje"
                        rows="4"
                        class="block w-full px-4 py-3 transition-all border rounded-lg outline-none resize-none pr-11 text-slate-700 border-gray-300/50 focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500/80 placeholder:text-slate-400/80"
                        placeholder="Escriba su mensaje, este mensaje será visible para todos los propietarios de su edificio/condominio">
                    </textarea>
                    <div class="absolute flex items-center pr-3 pointer-events-none top-4 right-3">
                        <i class="text-sm text-slate-400/80 fas fa-comment"></i>
                    </div>
                </div>
            </div>

            <div class="mt-8">
                <button
                    @click.prevent="handleSendComment"
                    type="submit"
                    class="inline-flex justify-center w-full px-6 py-3 text-sm font-semibold text-white transition-all duration-200 bg-gradient-to-r from-sky-600 to-blue-500 rounded-lg shadow-md hover:shadow-lg hover:from-sky-700 hover:to-blue-600 transform hover:-translate-y-0.5">
                    <i class="mr-2 text-sm fas fa-paper-plane"></i> Enviar Comentario
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
