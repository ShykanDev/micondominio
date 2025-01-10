<template>
  <div class="flex min-h-screen bg-gray-100 font-roboto">
    <!-- Sidebar -->
    <div
      id="sidebar"
      :class="['w-64 bg-gray-800 text-white', isSidebarHidden ? 'hidden' : '']"
    >
      <div class="p-4 text-2xl font-bold text-center border-b border-gray-700">
        Admin Dashboard
      </div>
      <nav class="mt-4">
        <ul>
          <li class="p-4 hover:bg-gray-700" @click="changeComponent(NotifsComponent)">
            <a href="#" class="flex items-center">
              <i class="mr-3 fas fa-plus"></i>
              Nueva Encuesta
            </a>
          </li>
          <li class="p-4 hover:bg-gray-700" @click="changeComponent(AnnouncementComponent)">
            <a href="#" class="flex items-center">
              <i class="mr-3 fas fa-bell"></i>
              Nuevo Anuncio
            </a>
          </li>
          <!-- <li class="p-4 hover:bg-gray-700">
            <a href="#" class="flex items-center">
              <i class="mr-3 fas fa-exclamation-circle"></i>
              Avisos
            </a>
          </li> -->
          <li class="p-4 hover:bg-gray-700">
            <a href="#" class="flex items-center">
              <i class="mr-3 fas fa-users"></i>
              Comentarios
            </a>
          </li>
          <li class="p-4 hover:bg-gray-700">
            <a href="#" class="flex items-center">
              <i class="mr-3 fas fa-poll"></i>
              Encuestas
            </a>
          </li>
          <li class="p-4 hover:bg-gray-700">
            <a href="#" class="flex items-center">
              <i class="mr-3 fas fa-bullhorn"></i>
              Anuncios
            </a>
          </li>
          <RouterLink :to="{name:'home'}"  class="flex items-center p-4 hover:bg-gray-700">
            <i class="mr-3 fas fa-sign-out-alt"></i>
            Salir
          </RouterLink>
          <li class="p-4 hover:bg-gray-700">
            <span class="flex items-center selection:bg-red-500">
              <i class="mr-3 fas fa-code"></i>
              Código de Invitación:
            </span>
            <span class="p-1 my-1 text-center text-black bg-white rounded-lg">{{ sysVals().getInvitationCode }}</span>
            <br>
            <small class="text-xs italic text-slate-300"><i class="mr-3 fas fa-share"></i>Comparta este código con sus propietarios para que puedan acceder a su organización.</small>
          </li>
        </ul>
      </nav>
    </div>

    <!-- Main Content -->
    <div class="flex-1 p-6">
      <!-- Mobile Menu Button -->
      <div class="mb-4 md:hidden">
        <button @click="toggleMenu" class="p-2 text-white bg-gray-800 rounded">
          <i class="fas fa-bars"></i>
        </button>
      </div>
      <h1 class="mb-6 text-3xl font-bold">Panel de Administración</h1>
      <div class="">
        <!-- Example Cards -->
       <!-- place the dynamic component here -->
        <component :is="currentComponent" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { sysVals } from '@/stores/sysVals';
import { defineAsyncComponent, ref } from 'vue';
import { RouterLink } from 'vue-router';

const isSidebarHidden = ref(false);
const NotifsComponent = defineAsyncComponent(() => import('../components/admin/NotifsComponent.vue'));
const AnnouncementComponent = defineAsyncComponent(() => import('../components/admin/AnnouncementComponent.vue'));

const currentComponent = ref(AnnouncementComponent);

const changeComponent = (componentName:any) => {
  currentComponent.value = componentName;
}

function toggleMenu() {
  isSidebarHidden.value = !isSidebarHidden.value;
}

const cards = [
  { title: 'Configuración', description: 'Administra las configuraciones de tu aplicación.' },
  { title: 'Notificaciones', description: 'Gestiona las notificaciones para los usuarios.' },
  { title: 'Avisos', description: 'Publica y administra avisos importantes.' },
  { title: 'Comunidad', description: 'Interactúa con la comunidad de usuarios.' },
  { title: 'Encuestas', description: 'Crea y gestiona encuestas para los usuarios.' },
];
</script>

<style scoped>
.font-roboto {
  font-family: 'Roboto', sans-serif;
}
</style>
