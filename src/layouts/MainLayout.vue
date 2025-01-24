<template>
  <header class="sticky top-0 z-50">
    <div
      class="flex justify-between w-full px-4 py-4 mx-auto text-white bg-white shadow-lg rounded-bl-md rounded-br-md">
      <div class="flex items-center text-xl font-bold text-gray-800">
        <img class="w-10 h-10"
          src="data:image/png;base64,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"
          alt="">
        <RouterLink :to="{ name: 'home' }" class="animate-fade-down" :key="currentDomain">
          <span v-html="currentDomain"></span>
        </RouterLink>
      </div>
      <nav class="hidden space-x-6 md:flex">
        <RouterLink :to="{ name: 'home' }"
          class="p-1 font-medium transition-colors duration-100 ease-out rounded-md text-sky-800 hover:bg-sky-900 hover:text-white">
          Inicio</RouterLink>
        <RouterLink :to="{ name: 'comments' }"
          class="p-1 font-medium transition-colors duration-100 ease-out rounded-md text-sky-800 hover:bg-sky-900 hover:text-white">
          Comentarios</RouterLink>
        <RouterLink :to="{ name: 'help' }"
          class="p-1 font-medium transition-colors duration-100 ease-out rounded-md text-sky-800 hover:bg-sky-900 hover:text-white">
          ¿Cómo Usar?</RouterLink>
        <RouterLink :to="{ name: 'contact' }"
          class="p-1 font-medium transition-colors duration-100 ease-out rounded-md text-sky-800 hover:bg-sky-900 hover:text-white">
          {{ sysVals().getIsUserAuth ? 'Contacto Con La Empresa' : 'Contacto' }}</RouterLink>
        <RouterLink v-if="!sysVals().getIsAdmin && sysVals().isUserAuth" :to="{ name: 'about' }"
          class="p-1 font-medium transition-colors duration-100 ease-out rounded-md text-sky-800 hover:bg-sky-900 hover:text-white">
          Mi Condominio</RouterLink>
        <RouterLink v-if="!sysVals().getIsUserAuth" :to="{ name: 'login' }"
          class="p-1 font-medium transition-colors duration-100 ease-out border-[2px] rounded-md border-sky-600 text-sky-800 hover:text-sky-700">
          <i class="mr-1 text-sm fas fa-user"></i>Propietario
        </RouterLink>
        <RouterLink v-if="!sysVals().getIsUserAuth" :to="{ name: 'login' }"
          class="p-1 font-medium transition-colors duration-100 ease-out border-[2px] rounded-md border-sky-900 text-sky-900 hover:text-sky-700">
          <i class="mr-1 text-sm fas fa-user-tie"></i>Administrador
        </RouterLink>
        <RouterLink v-if="!sysVals().getIsUserAuth" :to="{ name: 'login' }"
          class="p-1 font-medium transition-colors duration-100 ease-out border-[2px] rounded-md border-slate-300 bg-sky-700 text-white hover:text-slate-200">
          Iniciar Sesión</RouterLink>
        <RouterLink v-if="!sysVals().getIsUserAuth" :to="{ name: 'register' }"
          class="p-1 font-medium text-white transition-colors duration-100 ease-out rounded-md bg-sky-900 hover:text-white">
          Registrarse</RouterLink>
        <RouterLink v-if="sysVals().getIsAdmin" :to="{ name: 'dashboard' }"
          class="p-1 font-medium text-white transition-colors duration-100 ease-out rounded-md bg-sky-900 hover:bg-sky-700 hover:text-white">
          Panel de Administración</RouterLink>
      </nav>
      <button @click="toggleMobileMenu" id="menu-btn" class="text-gray-600 md:hidden focus:outline-none">
        <i class="fas fa-bars"></i>
      </button>
    </div>
    <div id="mobile-menu" class="bg-white md:hidden" :class="{ hidden: !isMobileMenuOpen, block: isMobileMenuOpen }">
      <nav class="flex flex-col px-4 py-4 space-y-2 animate-fade">
        <RouterLink :to="{ name: 'home' }"
          class="p-1 font-medium transition-colors duration-100 ease-out rounded-md animate-fade-left animate-delay-0 text-sky-800 hover:bg-sky-900 hover:text-white">
          Inicio</RouterLink>
        <RouterLink :to="{ name: 'comments' }"
          class="p-1 font-medium transition-colors duration-100 ease-out rounded-md animate-fade-left animate-delay-100 text-sky-800 hover:bg-sky-900 hover:text-white">
          Comentarios</RouterLink>
        <RouterLink :to="{ name: 'contact' }"
          class="p-1 font-medium transition-colors duration-100 ease-out rounded-md animate-fade-left animate-delay-150 text-sky-800 hover:bg-sky-900 hover:text-white">
          {{ sysVals().getIsUserAuth ? 'Contacto Con La Empresa' : 'Contacto' }}</RouterLink>
        <RouterLink :to="{ name: 'about' }"
          class="p-1 font-medium transition-colors duration-100 ease-out rounded-md animate-fade-left animate-delay-200 text-sky-800 hover:bg-sky-900 hover:text-white">
          Mi Condominio</RouterLink>
        <RouterLink v-if="!sysVals().getIsUserAuth" :to="{ name: 'login' }"
          class="p-1 font-medium transition-colors animate-fade-left animate-delay-300 duration-100 ease-out border-[2px] rounded-md border-sky-600 text-sky-800 hover:text-sky-700">
          <i class="mr-1 text-sm fas fa-user"></i>Propietario
        </RouterLink>
        <RouterLink v-if="!sysVals().getIsUserAuth" :to="{ name: 'login' }"
          class="p-1 font-medium transition-colors animate-fade-left animate-delay-500 duration-100 ease-out border-[2px] rounded-md border-sky-900 text-sky-900 hover:text-sky-700">
          <i class="mr-1 text-sm fas fa-user-tie"></i>Administrador
        </RouterLink>
        <RouterLink v-if="!sysVals().getIsUserAuth" :to="{ name: 'login' }"
          class="p-1 font-medium transition-colors animate-fade-left animate-delay-[600ms] duration-100 ease-out border-[2px] rounded-md border-slate-300 bg-sky-700 text-white hover:text-slate-200">
          Iniciar Sesión</RouterLink>
        <RouterLink v-if="!sysVals().getIsUserAuth" :to="{ name: 'register' }"
          class="p-1 font-medium text-white transition-colors duration-100 ease-out rounded-md animate-fade-left animate-delay-[700ms] bg-sky-900 hover:text-white">
          Registrarse</RouterLink>
        <RouterLink v-if="sysVals().getIsAdmin" :to="{ name: 'dashboard' }"
          class="p-1 font-medium text-white transition-colors duration-100 ease-out rounded-md animate-fade-left animate-delay-[800ms] bg-sky-900 hover:bg-sky-700 hover:text-white">
          Panel de Administración</RouterLink>
      </nav>
    </div>
  </header>
  <main class="overflow-hidden">
    <section v-if="sysVals().getIsLoadingLogin"
      class="fixed top-0 bottom-0 left-0 right-0 z-40 flex items-center justify-center w-full bg-white bg-opacity-100">
      <LineLoading />
    </section>
    <slot name="main"></slot>
    <div v-if="!preferencesVals().getAcceptedTems"
      class="fixed bottom-0 left-0 right-0 flex flex-wrap items-center justify-between w-full px-8 py-4 text-white bg-black min-h-20">
      <!-- Texto informativo -->
      <p class="mb-2 text-sm sm:mb-0 sm:text-base">
        Al continuar usando este sitio, aceptas nuestros
        <RouterLink to="/terms" class="underline hover:text-sky-500">Términos y Condiciones</RouterLink> y nuestra
        <RouterLink to="/policy" class="underline hover:text-sky-500">Política de Privacidad</RouterLink>.
      </p>
      <!-- Botón de aceptar -->
      <button @click="preferencesVals().setAcceptedTems()"
        class="px-4 py-2 text-lg font-medium text-white rounded-md bg-sky-500 hover:bg-sky-700">
        Aceptar
      </button>
    </div>
  </main>
  <footer class="py-8 text-white bg-gray-800">
    <div class="container px-4 mx-auto">
      <div class="mb-6 text-center">
        <h2 class="text-3xl font-semibold">condominio.com</h2>
      </div>
      <div class="mb-6 text-center">
        <p class="text-sm">Este sitio cuenta con certificados SSL para garantizar la seguridad de tus datos.</p>
      </div>
      <div class="grid grid-cols-2 gap-4 mb-6 text-center sm:grid-cols-4">
        <RouterLink :to="{ name: 'home' }" class="hover:text-blue-500">Inicio</RouterLink>
        <RouterLink :to="{ name: 'policy' }" class="hover:text-blue-500">Política de Privacidad</RouterLink>
        <RouterLink :to="{ name: 'terms' }" class="hover:text-blue-500">Términos y Condiciones</RouterLink>
        <RouterLink :to="{ name: 'contact' }" class="hover:text-blue-500">Contacto</RouterLink>
        <RouterLink :to="{ name: 'about' }" class="hover:text-blue-500">Mi Condominio</RouterLink>
      </div>
      <div class="grid grid-cols-2 gap-4 mb-6 text-center sm:grid-cols-4">
        <RouterLink :to="{ name: 'login' }" class="hover:text-blue-500">Iniciar Sesión</RouterLink>
        <RouterLink :to="{ name: 'register' }" class="hover:text-blue-500">Registrarse</RouterLink>
        <RouterLink :to="{ name: 'dashboard' }" class="hover:text-blue-500">Panel de Administración</RouterLink>
        <RouterLink :to="{ name: 'home' }" class="hover:text-blue-500">Descargar App Android</RouterLink>
      </div>
      <div class="grid grid-cols-2 gap-4 mb-6 text-center sm:grid-cols-4">
        <RouterLink :to="{ name: 'home' }" class="hover:text-blue-500">Descargar App iOS</RouterLink>
      </div>
      <div class="text-sm text-center">
        <p class="text-gray-400">Designed by <span class="text-white">PACA</span></p>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import LineLoading from '@/components/animations/LineLoading.vue';
import { preferencesVals } from '@/stores/preferences';
import { sysVals } from '@/stores/sysVals';
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';

const constDomains = [
  "<span class=\"text-sky-500\">gastos</span><span class=\"text-sky-800\">comunes</span><span class=\"text-sky-700\">condominio</span><span class=\"text-emerald-500\">.com</span>",
  "<span class=\"text-sky-500\">gastos</span><span class=\"text-sky-800\">comunes</span><span class=\"text-sky-700\">edificio</span><span class=\"text-emerald-500\">.com</span>",
  "<span class=\"text-sky-500\">edificio</span><span class=\"text-emerald-800\">y</span><span class=\"text-sky-700\">condominio</span><span class=\"text-emerald-500\">.com</span>",
  "<span class=\"text-sky-500\">mantenimiento</span><span class=\"text-sky-800\">condominio</span><span class=\"text-emerald-700\">.com</span>",
  "<span class=\"text-sky-500\">mantenimiento</span><span class=\"text-sky-800\">edificio</span><span class=\"text-emerald-700\">.com</span>",
  "<span class=\"text-sky-500\">mantenimiento</span><span class=\"text-emerald-600\">y</span><span class=\"text-sky-700\">gastos</span><span class=\"text-sky-500\">comunes</span><span class=\"text-emerald-700\">.com</span>"
];

const currentDomain = ref(constDomains[0]);

const aleatDomain = () => {
  setInterval(() => {
    currentDomain.value = constDomains[Math.floor(Math.random() * constDomains.length)];
  }, 4000);
};

onMounted(() => {
  aleatDomain();
});

const isMobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};
</script>

<style scoped>
/* Asegúrate de que los estilos de Tailwind CSS estén correctamente aplicados */
</style>
