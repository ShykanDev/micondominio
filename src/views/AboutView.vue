<template>
  <MainLayout>
    <template #main>
      <div class="flex w-full py-2 rounded-bl-md rounded-br-mdrounded-bl-md justify-evenly bg-slate-200 font-poppins">
        <p class="p-1 font-semibold bg-white rounded-md cursor-pointer text-sky-900">Comentar</p>
        <p class="p-1 font-semibold bg-white rounded-md cursor-pointer text-sky-900">Anuncios</p>
        <p class="p-1 font-semibold bg-white rounded-md cursor-pointer text-sky-900">Comentarios</p>
        <p class="p-1 font-semibold bg-white rounded-md cursor-pointer text-sky-900">Encuestas</p>
      </div>
      <article class="w-full bg-white min-h-dvh">
        <component :is="currentComponent" />
      </article>
    </template>
  </MainLayout>
</template>

<!-- <script lang="ts" setup>
import MainLayout from '@/layouts/MainLayout.vue';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';

import { ref } from 'vue';

const invitationCode = ref('');
const accessGranted = ref(false);
const errorMessage = ref('');
const anunciosData = ref([]); // Datos de la subcolección "anuncios"
const comentariosData = ref([]); // Datos de la subcolección "comentarios"

const db = getFirestore();

const checkInvitationCode = async () => {
  errorMessage.value = ''; // Resetea el mensaje de error
  accessGranted.value = false; // Resetea el acceso
  anunciosData.value = []; // Limpia los datos previos de anuncios
  comentariosData.value = []; // Limpia los datos previos de comentarios

  if (!invitationCode.value) {
    errorMessage.value = 'Por favor, ingresa un código válido.';
    return;
  }

  try {
    // Crear una referencia a la colección de condominios
    const condominiosRef = collection(db, 'condominios');

    // Hacer una consulta para buscar el código de invitación
    const q = query(condominiosRef, where('invitationId', '==', invitationCode.value));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      accessGranted.value = true; // Acceso concedido si se encuentra el código

      // Obtén el primer documento encontrado
      const docRef = querySnapshot.docs[0].ref;

      // Obtener datos de la subcolección "anuncios"
      const anunciosRef = collection(docRef, 'anuncios');
      const anunciosSnapshot = await getDocs(anunciosRef);
      anunciosSnapshot.forEach((doc) => {
        anunciosData.value.push(doc.data());
      });

      // Obtener datos de la subcolección "comentarios"
      const comentariosRef = collection(docRef, 'comentarios');
      const comentariosSnapshot = await getDocs(comentariosRef);
      comentariosSnapshot.forEach((doc) => {
        comentariosData.value.push(doc.data());
      });

      if (anunciosData.value.length === 0 && comentariosData.value.length === 0) {
        errorMessage.value = 'No se encontraron datos en las subcolecciones.';
      }
    } else {
      errorMessage.value = 'Código de invitación no encontrado.';
    }
  } catch (error) {
    console.error('Error al verificar el código:', error);
    errorMessage.value = 'Hubo un error al verificar el código.';
  }
};
</script> -->
<script lang="ts" setup>

import MainLayout from '@/layouts/MainLayout.vue';
import { defineAsyncComponent, shallowRef } from 'vue';

const CommentComponent = defineAsyncComponent(() => import('../components/owner/CommentComponent.vue'));
const currentComponent = shallowRef(CommentComponent);



</script>

<style scoped>

</style>
