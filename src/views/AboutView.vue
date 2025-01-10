<template>
  <MainLayout>
    <template #main>
      <div class="flex flex-col items-center justify-center p-4 min-h-dvh font-poppins">
  <h1 class="text-xl font-bold">Acceso con Código de Invitación</h1>
  <input
    v-model="invitationCode"
    type="text"
    placeholder="Ingresa tu código de invitación"
    class="p-2 mt-4 border rounded"
  />
  <button
    @click="checkInvitationCode"
    class="px-4 py-2 mt-4 text-white bg-blue-500 rounded"
  >
    Verificar Código
  </button>

  <p v-if="accessGranted" class="mt-4 text-green-500">
    ¡Acceso concedido! 🎉
  </p>
  <p v-if="errorMessage" class="mt-4 text-red-500">
    {{ errorMessage }}
  </p>

  <!-- Estructura de anuncios y comentarios -->
  <div
    v-if="accessGranted"
    class="grid w-full max-w-4xl grid-cols-1 gap-6 mt-8 md:grid-cols-2"
  >
    <!-- Anuncios -->
    <div>
      <h2 class="mb-4 text-lg font-semibold">Anuncios</h2>
      <div
        v-for="(anuncio, index) in anunciosData"
        :key="'anuncio-' + index"
        class="p-4 mb-4 bg-white border rounded shadow"
      >
        <h3 class="text-lg font-bold text-sky-800">{{ anuncio.titulo }}</h3>
        <p class="text-sm text-gray-500">
          Autor: {{ anuncio.autor }}
        </p>
        <p class="text-sm text-gray-500">
          Fecha: {{ new Date(anuncio.fecha.seconds * 1000).toLocaleDateString() }}
        </p>
        <p class="mt-2">{{ anuncio.contenido }}</p>
      </div>
    </div>

    <!-- Comentarios -->
    <div>
      <h2 class="mb-4 text-lg font-semibold">Comentarios</h2>
      <div
        v-for="(comentario, index) in comentariosData"
        :key="'comentario-' + index"
        class="p-4 mb-4 bg-white border rounded shadow"
      >
        <p class="text-lg font-bold text-sky-800">{{ comentario.anuncio }}</p>
        <p class="text-sm text-gray-500">
          Autor: {{ comentario.autor }}
        </p>
        <p class="text-sm text-gray-500">
          Categoría: {{ comentario.categoría }}
        </p>
        <p class="text-sm text-gray-500">
          Fecha: {{ new Date(comentario.fecha.seconds * 1000).toLocaleDateString() }}
        </p>
      </div>
    </div>
  </div>
</div>

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
import { collection, query, where, onSnapshot, getDocs } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { ref, onUnmounted } from 'vue';

const invitationCode = ref('');
const accessGranted = ref(false);
const errorMessage = ref('');
const anunciosData = ref([]); // Datos de la subcolección "anuncios"
const comentariosData = ref([]); // Datos de la subcolección "comentarios"

const db = getFirestore();

let unsubscribeAnuncios: () => void; // Variable para guardar la función de cancelación de la suscripción de "anuncios"
let unsubscribeComentarios: () => void; // Variable para guardar la función de cancelación de la suscripción de "comentarios"

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

      // Limpia las suscripciones anteriores si existen
      if (unsubscribeAnuncios) unsubscribeAnuncios();
      if (unsubscribeComentarios) unsubscribeComentarios();

      // Obtén el primer documento encontrado
      const docRef = querySnapshot.docs[0].ref;

      // Suscripción en tiempo real a la subcolección "anuncios"
      const anunciosRef = collection(docRef, 'anuncios');
      unsubscribeAnuncios = onSnapshot(anunciosRef, (snapshot) => {
        anunciosData.value = [];
        snapshot.forEach((doc) => {
          anunciosData.value.push(doc.data());
        });
      });

      // Suscripción en tiempo real a la subcolección "comentarios"
      const comentariosRef = collection(docRef, 'comentarios');
      unsubscribeComentarios = onSnapshot(comentariosRef, (snapshot) => {
        comentariosData.value = [];
        snapshot.forEach((doc) => {
          comentariosData.value.push(doc.data());
        });
      });
    } else {
      errorMessage.value = 'Código de invitación no encontrado.';
    }
  } catch (error) {
    console.error('Error al verificar el código:', error);
    errorMessage.value = 'Hubo un error al verificar el código.';
  }
};

// Limpia las suscripciones cuando se desmonta el componente
onUnmounted(() => {
  if (unsubscribeAnuncios) unsubscribeAnuncios();
  if (unsubscribeComentarios) unsubscribeComentarios();
});
</script>

<style scoped>
.flex {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
