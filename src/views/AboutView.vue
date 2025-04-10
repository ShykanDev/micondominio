<template>
  <MainLayout>
    <template #main>
      <div
        class="box-border flex sticky top-0 flex-wrap gap-3 p-3 w-full rounded-xl border shadow-lg backdrop-blur-sm transition-all duration-300 ease-out bg-slate-100 md:gap-2 md:flex-nowrap font-poppins animate-fade-down border-gray-100/50">
        <!-- <small>{{ sysVals().getAsyncComponentText }}</small> -->
        <p @click="sysVals().setAsyncComponent(CreateCommentComponent)"
          :class="sysVals().getAsyncComponentText === 'CreateCommentComponent' ? 'bg-gradient-to-r from-sky-600 to-blue-500 text-white shadow-md' : 'bg-white/90 hover:bg-gray-50/80 text-slate-600'"
          class="flex-1 min-w-[120px] px-4 py-2.5 text-sm font-medium text-center rounded-lg cursor-pointer transition-all duration-200 hover:shadow-sm hover:-translate-y-0.5 border border-gray-200/30">
          <i class="mr-2 fas fa-comment"></i>Comentar
        </p>
        <p @click="sysVals().setAsyncComponent(HistoryPayment)"
          :class="sysVals().getAsyncComponentText === 'HistoryPayment' ? 'bg-gradient-to-r from-sky-600 to-blue-500 text-white shadow-md' : 'bg-white/90 hover:bg-gray-50/80 text-slate-600'"
          class="flex-1 min-w-[120px] px-4 py-2.5 text-sm font-medium text-center rounded-lg cursor-pointer transition-all duration-200 hover:shadow-sm hover:-translate-y-0.5 border border-gray-200/30">
          <i class="mr-2 fas fa-home"></i>Pago de mantenimiento
        </p>
        <p @click="sysVals().setAsyncComponent(ChatComponent)"
          :class="sysVals().getAsyncComponentText == 'ChatComponent' ? 'bg-gradient-to-r from-sky-600 to-blue-500 text-white shadow-md' : 'bg-white/90 hover:bg-gray-50/80 text-slate-600'"
          class="flex-1 min-w-[120px] px-4 py-2.5 text-sm font-medium text-center rounded-lg cursor-pointer transition-all duration-200 hover:shadow-sm hover:-translate-y-0.5 border border-gray-200/30">
          <i class="mr-2 fas fa-user"></i> Hablar con el administrador
        </p>

        <p @click="sysVals().setAsyncComponent(CommentComponent)"
          :class="sysVals().getAsyncComponentText === 'CommentComponent' ? 'bg-gradient-to-r from-sky-600 to-blue-500 text-white shadow-md' : 'bg-white/90 hover:bg-gray-50/80 text-slate-600'"
          class="flex-1 min-w-[120px] px-4 py-2.5 text-sm font-medium text-center rounded-lg cursor-pointer transition-all duration-200 hover:shadow-sm hover:-translate-y-0.5 border border-gray-200/30">
          <i class="mr-2 fas fa-comments"></i>Comentarios
        </p>

        <p @click="sysVals().setAsyncComponent(AnnouncementComponent)"
          :class="sysVals().getAsyncComponentText === 'AnnouncementComponent' ? 'bg-gradient-to-r from-sky-600 to-blue-500 text-white shadow-md' : 'bg-white/90 hover:bg-gray-50/80 text-slate-600'"
          class="flex-1 min-w-[120px] px-4 py-2.5 text-sm font-medium text-center rounded-lg cursor-pointer transition-all duration-200 hover:shadow-sm hover:-translate-y-0.5 border border-gray-200/30">
          <i class="mr-2 fas fa-bullhorn"></i>Anuncios
        </p>

        <p @click="sysVals().setAsyncComponent(SurveyComponent)"
          :class="sysVals().getAsyncComponentText === 'SurveyComponent' ? 'bg-gradient-to-r from-sky-600 to-blue-500 text-white shadow-md' : 'bg-white/90 hover:bg-gray-50/80 text-slate-600'"
          class="flex-1 min-w-[120px] px-4 py-2.5 text-sm font-medium text-center rounded-lg cursor-pointer transition-all duration-200 hover:shadow-sm hover:-translate-y-0.5 border border-gray-200/30">
          <i class="mr-2 fas fa-poll"></i>Encuestas
        </p>

        <p @click="sysVals().setAsyncComponent(ComplaintsComponent)"
          :class="sysVals().getAsyncComponentText === 'ComplaintsComponent' ? 'bg-gradient-to-r from-sky-600 to-blue-500 text-white shadow-md' : 'bg-white/90 hover:bg-gray-50/80 text-slate-600'"
          class="flex-1 min-w-[120px] px-4 py-2.5 text-sm font-medium text-center rounded-lg cursor-pointer transition-all duration-200 hover:shadow-sm hover:-translate-y-0.5 border border-gray-200/30">
          <i class="mr-2 fas fa-exclamation-triangle"></i>Quejas Generales
        </p>
        <p @click="sysVals().setAsyncComponent(MyComplaintsComponent)"
          :class="sysVals().getAsyncComponentText === 'MyComplaintsComponent' ? 'bg-gradient-to-r from-sky-600 to-blue-500 text-white shadow-md' : 'bg-white/90 hover:bg-gray-50/80 text-slate-600'"
          class="flex-1 min-w-[120px] px-4 py-2.5 text-sm font-medium text-center rounded-lg cursor-pointer transition-all duration-200 hover:shadow-sm hover:-translate-y-0.5 border border-gray-200/30">
          <i class="mr-2 fas fa-exclamation-triangle"></i> Mis Quejas Privadas
        </p>
      </div>
      <!-- <article class="w-full bg-white min-h-dvh"> -->
      <section v-if="sysVals().getIsLoadingOwner"
        class="flex fixed top-0 right-0 bottom-0 left-0 z-40 justify-center items-center w-full bg-white bg-opacity-100">
        <LoadingBarCrazy />
      </section>
      <!-- </article> -->
      <article class="relative w-full bg-white min-h-dvh">
        <component :is="sysVals().getAsyncComponent"/>
        <!-- Notification view -->
        <article
          class="absolute right-4 top-20 animate-jump-out animate-reverse animate-duration-300  shadow-md text-center py-2 bg-white rounded-3xl border font-poppins border-sky-800 min-w-[450px] overflow-auto max-w-[450px] min-h-60"
          v-if="isNotificationOpen">

        </article>
      </article>
    </template>
  </MainLayout>
</template>

<script lang="ts" setup>

import LoadingBarCrazy from '@/components/animations/LoadingBarCrazy.vue';
import { notyfValues } from '@/stores/notyfAlert';
import MainLayout from '@/layouts/MainLayout.vue';
import { sysVals } from '@/stores/sysVals';
import { collection, getFirestore, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { defineAsyncComponent, onMounted, onUnmounted, ref, shallowRef } from 'vue';
import type { INotyf } from '@/interfaces/INotyf';
import ChatComponent from '@/components/owner/ChatComponent.vue';


const CommentComponent = defineAsyncComponent(() => import('../components/owner/CommentComponent.vue'));//comments list from firebase, and the first component that is loaded on mount
const AnnouncementComponent = defineAsyncComponent(() => import('../components/owner/components/AnnouncementComponent.vue'));//announcements list from firebase
const CreateCommentComponent = defineAsyncComponent(() => import('../components/owner/components/CreateCommentComponent.vue'));//create comment
const SurveyComponent = defineAsyncComponent(() => import('../components/owner/components/SurveysComponent.vue'));//survey list from firebase
const ComplaintsComponent = defineAsyncComponent(() => import('../components/owner/components/ComplaintsComponent.vue'));//complaint list from firebase
const MyComplaintsComponent = defineAsyncComponent(() => import('../components/owner/components/MyComplaintsComponent.vue'));//complaint list from firebase
const HistoryPayment = defineAsyncComponent(() => import('../components/owner/components/HistoryPayment.vue'));//complaint list from firebase


const currentComponent = shallowRef(CreateCommentComponent);
const styleCurrentComponent = ref('');

const handleComponentChange = (componentName: any) => {
  currentComponent.value = componentName;
  styleCurrentComponent.value = componentName;
}

//if route is about and async component is loaded, fetch notifications
const isFetchAvailable = ref(false);

const db = getFirestore();
const unsub = onSnapshot(
  query(
    collection(db, `condominios/${sysVals().getAdminDocId}/notifAlerts`),
    orderBy('date', 'asc')
  ),
  (querySnapshot) => {
    console.log('Getting data');
    notyfValues().setLatestNotification(querySnapshot.docs[0].data() as INotyf);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      notyfValues().setLatestNotification(doc.data() as INotyf);
      notyfValues().setNewNotification(true);
    });
  },
  (error: any) => {
    console.log(error);
  }
);
onMounted(() => {
  isFetchAvailable.value = true;
})
//on Unmounted disable the fetch
onUnmounted(() => {
  unsub();
})

const isNotificationOpen = ref(false);

const toggleNotification = () => {
  isNotificationOpen.value = !isNotificationOpen.value;
}
</script>

<style scoped></style>
