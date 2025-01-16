<template>
    <header class="sticky top-0 z-50">
      <div class="flex justify-between w-full px-4 py-4 mx-auto text-white bg-white shadow-lg rounded-bl-md rounded-br-md">
            <div class="text-xl font-bold text-gray-800">
              <p :to="{name:'home'}"  class="animate-fade-down" v-html="currentDomain" :key="currentDomain"></p>
                <!-- <a href="#" class="text-sky-600"><span>administracion</span><span class="text-sky-800">condominio</span><span>.com</span></a> -->
            </div>
            <nav class="hidden space-x-6 md:flex">
                <RouterLink :to="{name:'home'}" href="#" class="p-1 font-medium transition-colors duration-100 ease-out rounded-md text-sky-800 hover:bg-sky-500 hover:text-white ">Inicio</RouterLink>
                <RouterLink :to="{name:'comments'}" href="#" class="p-1 font-medium transition-colors duration-100 ease-out rounded-md text-sky-800 hover:bg-sky-500 hover:text-white ">Comentarios</RouterLink>
                <RouterLink :to="{name:'contact'}" href="#" class="p-1 font-medium transition-colors duration-100 ease-out rounded-md text-sky-800 hover:bg-sky-500 hover:text-white ">Contacto</RouterLink>
                <RouterLink :to="{name:'about'}" href="#" class="p-1 font-medium transition-colors duration-100 ease-out rounded-md text-sky-800 hover:bg-sky-500 hover:text-white ">Mi Condominio</RouterLink>
                <RouterLink v-if="!sysVals().getIsUserAuth" :to="{name:'login'}" href="#" class="p-1 font-medium transition-colors duration-100 ease-out border-[2px] rounded-md border-sky-600 text-sky-800 hover:text-sky-700"><i class="mr-1 text-sm fas fa-user"></i>Propietario</RouterLink>
                <RouterLink v-if="!sysVals().getIsUserAuth" :to="{name:'login'}" href="#" class="p-1 font-medium transition-colors duration-100 ease-out border-[2px] rounded-md border-sky-900 text-sky-900 hover:text-sky-700"><i class="mr-1 text-sm fas fa-user-tie"></i>Administrador</RouterLink>
                <RouterLink v-if="!sysVals().getIsUserAuth" :to="{name:'login'}" href="#" class="p-1 font-medium transition-colors duration-100 ease-out border-[2px] rounded-md border-slate-300 bg-sky-700 text-white hover:text-slate-200">Iniciar Sesión</RouterLink>
                <RouterLink v-if="!sysVals().getIsUserAuth" :to="{name:'register'}" href="#" class="p-1 font-medium text-white transition-colors duration-100 ease-out rounded-md bg-sky-900 hover:text-white">Registrarse</RouterLink>
                <RouterLink v-if="sysVals().getIsAdmin" :to="{name:'dashboard'}" href="#" class="p-1 font-medium text-white transition-colors duration-100 ease-out rounded-md bg-sky-900 hover:bg-sky-700 hover:text-white ">Panel de Administración</RouterLink>
            </nav>
            <button id="menu-btn" class="text-gray-600 md:hidden focus:outline-none">
                <i class="fas fa-bars"></i>
            </button>
        </div>
        <div id="mobile-menu" class="hidden md:hidden">
            <nav class="px-4 py-4 space-y-2">
                <RouterLink :to="{name:'home'}" href="#" class="block p-1 font-medium text-white transition-colors duration-100 ease-out rounded-md bg-sky-700 hover:text-white ">Inicio</RouterLink>
                <RouterLink :to="{name:'home'}" href="#" class="block p-1 font-medium text-white transition-colors duration-100 ease-out rounded-md bg-sky-700 hover:text-white ">Sobre</RouterLink>
                <RouterLink :to="{name:'home'}" href="#" class="block p-1 font-medium text-white transition-colors duration-100 ease-out rounded-md bg-sky-700 hover:text-white ">Servicios</RouterLink>
                <RouterLink :to="{name:'home'}" href="#" class="block p-1 font-medium text-white transition-colors duration-100 ease-out rounded-md bg-sky-700 hover:text-white ">Contacto</RouterLink>
            </nav>
        </div>
    </header>
    <main class="overflow-hidden">
      <section v-if="sysVals().getIsLoadingLogin" class="fixed top-0 bottom-0 left-0 right-0 z-40 flex items-center justify-center w-full bg-white bg-opacity-100">
        <LineLoading/>
      </section>

      <slot name="main">

      </slot>
    </main>
    <footer class="py-8 text-white bg-gray-800">
  <div class="container px-4 mx-auto">
    <!-- Título del footer -->
    <div class="mb-6 text-center">
      <h2 class="text-3xl font-semibold">condominio.com</h2>
    </div>

    <!-- Certificados SSL -->
    <div class="mb-6 text-center">
      <p class="text-sm">Este sitio cuenta con certificados SSL para garantizar la seguridad de tus datos.</p>
    </div>

    <!-- Enlaces principales -->
    <div class="grid grid-cols-2 gap-4 mb-6 text-center sm:grid-cols-4">
      <RouterLink :to="{name:'home'}" class="hover:text-blue-500">Inicio</RouterLink>
      <RouterLink :to="{name:'policy'}" class="hover:text-blue-500">Servicios</RouterLink>
      <RouterLink :to="{name:'contact'}" class="hover:text-blue-500">Contacto</RouterLink>
      <RouterLink :to="{name:'about'}" class="hover:text-blue-500">Mi Condominio</RouterLink>
    </div>

    <div class="grid grid-cols-2 gap-4 mb-6 text-center sm:grid-cols-4">
      <RouterLink :to="{name:'login'}" class="hover:text-blue-500">Iniciar Sesión</RouterLink>
      <RouterLink :to="{name:'register'}" class="hover:text-blue-500">Registrarse</RouterLink>
      <RouterLink :to="{name:'dashboard'}" class="hover:text-blue-500">Panel de Administración</RouterLink>
      <RouterLink :to="{name:'home'}" class="hover:text-blue-500">Descargar App Android</RouterLink>
    </div>

    <div class="grid grid-cols-2 gap-4 mb-6 text-center sm:grid-cols-4">
      <RouterLink :to="{name:'home'}" class="hover:text-blue-500">Descargar App iOS</RouterLink>
    </div>

    <!-- Designed by PACA -->
    <div class="text-sm text-center">
      <p class="text-gray-400">Designed by <span class="text-white">PACA</span></p>
    </div>
  </div>
</footer>

</template>

<script lang="ts" setup>
import LineLoading from '@/components/animations/LineLoading.vue';
import LoadingBarCrazy from '@/components/animations/LoadingBarCrazy.vue';
import { sysVals } from '@/stores/sysVals';
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';

const constDomains = [
  "<span>gastos</span><span class=\"text-sky-800\">comunescondominio</span><span>.com</span>",
  "<span>gastos</span><span class=\"text-sky-800\">comunesedificio</span><span>.com</span>",
  "<span>edificio</span><span class=\"text-sky-800\">ycondominio</span><span>.com</span>",
  "<span>mantenimiento</span><span class=\"text-sky-800\">condominio</span><span>.com</span>",
  "<span>mantenimiento</span><span class=\"text-sky-800\">edificio</span><span>.com</span>",
  "<span>mantenimiento</span><span class=\"text-sky-800\">ygastoscomunes</span><span>.com</span>"
];
const currentDomain = ref(constDomains[0]);

const aleatDomain = () => {
  setInterval(() => {
    currentDomain.value = constDomains[Math.floor(Math.random() * constDomains.length)];
  }, 4000)
}

onMounted(() => {
  aleatDomain();
})




</script>

<style scoped>

</style>
