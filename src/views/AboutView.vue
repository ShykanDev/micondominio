<template>
  <MainLayout>
    <template #main>
      <div class="box-border sticky top-0 flex flex-wrap w-full gap-3 p-3 transition-all duration-300 ease-out border shadow-lg bg-slate-100 backdrop-blur-sm rounded-xl md:gap-2 md:flex-nowrap font-poppins animate-fade-down border-gray-100/50">
        <!-- <small>{{ sysVals().getAsyncComponentText }}</small> -->
    <p
        @click="sysVals().setAsyncComponent(CreateCommentComponent)"
        :class="sysVals().getAsyncComponentText === 'CreateCommentComponent' ? 'bg-gradient-to-r from-sky-600 to-blue-500 text-white shadow-md' : 'bg-white/90 hover:bg-gray-50/80 text-slate-600'"
        class="flex-1 min-w-[120px] px-4 py-2.5 text-sm font-medium text-center rounded-lg cursor-pointer transition-all duration-200 hover:shadow-sm hover:-translate-y-0.5 border border-gray-200/30">
        <i class="mr-2 fas fa-comment"></i>Comentar
    </p>

    <p
        @click="sysVals().setAsyncComponent(CommentComponent)"
        :class="sysVals().getAsyncComponentText === 'CommentComponent' ? 'bg-gradient-to-r from-sky-600 to-blue-500 text-white shadow-md' : 'bg-white/90 hover:bg-gray-50/80 text-slate-600'"
        class="flex-1 min-w-[120px] px-4 py-2.5 text-sm font-medium text-center rounded-lg cursor-pointer transition-all duration-200 hover:shadow-sm hover:-translate-y-0.5 border border-gray-200/30">
        <i class="mr-2 fas fa-comments"></i>Comentarios
    </p>

    <p
        @click="sysVals().setAsyncComponent(AnnouncementComponent)"
        :class="sysVals().getAsyncComponentText === 'AnnouncementComponent' ? 'bg-gradient-to-r from-sky-600 to-blue-500 text-white shadow-md' : 'bg-white/90 hover:bg-gray-50/80 text-slate-600'"
        class="flex-1 min-w-[120px] px-4 py-2.5 text-sm font-medium text-center rounded-lg cursor-pointer transition-all duration-200 hover:shadow-sm hover:-translate-y-0.5 border border-gray-200/30">
        <i class="mr-2 fas fa-bullhorn"></i>Anuncios
    </p>

    <p
        @click="sysVals().setAsyncComponent(SurveyComponent)"
        :class="sysVals().getAsyncComponentText === 'SurveyComponent' ? 'bg-gradient-to-r from-sky-600 to-blue-500 text-white shadow-md' : 'bg-white/90 hover:bg-gray-50/80 text-slate-600'"
        class="flex-1 min-w-[120px] px-4 py-2.5 text-sm font-medium text-center rounded-lg cursor-pointer transition-all duration-200 hover:shadow-sm hover:-translate-y-0.5 border border-gray-200/30">
        <i class="mr-2 fas fa-poll"></i>Encuestas
    </p>

    <p
        @click="sysVals().setAsyncComponent(ComplaintsComponent)"
        :class="sysVals().getAsyncComponentText === 'ComplaintsComponent' ? 'bg-gradient-to-r from-sky-600 to-blue-500 text-white shadow-md' : 'bg-white/90 hover:bg-gray-50/80 text-slate-600'"
        class="flex-1 min-w-[120px] px-4 py-2.5 text-sm font-medium text-center rounded-lg cursor-pointer transition-all duration-200 hover:shadow-sm hover:-translate-y-0.5 border border-gray-200/30">
        <i class="mr-2 fas fa-exclamation-triangle"></i>Quejas
    </p>
</div>
      <!-- <article class="w-full bg-white min-h-dvh"> -->
      <section v-if="sysVals().getIsLoadingOwner"
        class="fixed top-0 bottom-0 left-0 right-0 z-40 flex items-center justify-center w-full bg-white bg-opacity-100">
        <LoadingBarCrazy />
      </section>
      <!-- </article> -->


      <article class="w-full bg-white min-h-dvh">
        <component :is="sysVals().getAsyncComponent" />
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

import LoadingBarCrazy from '@/components/animations/LoadingBarCrazy.vue';
import MainLayout from '@/layouts/MainLayout.vue';
import { sysVals } from '@/stores/sysVals';
import { defineAsyncComponent, ref, shallowRef } from 'vue';

const CommentComponent = defineAsyncComponent(() => import('../components/owner/CommentComponent.vue'));//comments list from firebase, and the first component that is loaded on mount
const AnnouncementComponent = defineAsyncComponent(() => import('../components/owner/components/AnnouncementComponent.vue'));//announcements list from firebase
const CreateCommentComponent = defineAsyncComponent(() => import('../components/owner/components/CreateCommentComponent.vue'));//create comment
const SurveyComponent = defineAsyncComponent(() => import('../components/owner/components/SurveysComponent.vue'));//survey list from firebase
const ComplaintsComponent = defineAsyncComponent(() => import('../components/owner/components/ComplaintsComponent.vue'));//complaint list from firebase
const LoaderComponent = defineAsyncComponent(() => import('../components/owner/components/LoaderComponent.vue'));//loader
// const ReportComponent = defineAsyncComponent(() => import('../components/owner/components/ReportsComponent.vue'));//report list from firebase

const currentComponent = shallowRef(CreateCommentComponent);
const styleCurrentComponent = ref('')
const handleComponentChange = (componentName: any) => {
  currentComponent.value = componentName;
  styleCurrentComponent.value = componentName;
}

</script>

<style scoped></style>
