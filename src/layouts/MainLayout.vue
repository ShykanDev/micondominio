<template>
  <header class="relative sticky top-0 z-50">
    <div
      class="flex justify-between px-4 py-4 mx-auto w-full text-white bg-white rounded-br-md rounded-bl-md shadow-lg">
      <div class="flex items-center text-xl font-bold text-gray-800">
        <img class="w-10 h-10"
          src="data:image/png;base64,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"
          alt="">
        <RouterLink :to="{ name: 'home' }" class="animate-fade-down" :key="currentDomain">
          <span class="text-base lg:text-xl" v-html="currentDomain"></span>
        </RouterLink>
      </div>
      <nav class="hidden space-x-6 md:flex">
        <RouterLink :to="{ name: 'home' }"
          class="p-1 font-medium text-sky-800 rounded-md transition-colors duration-100 ease-out hover:bg-sky-900 hover:text-white">
          Inicio</RouterLink>
        <RouterLink :to="{ name: 'comments' }"
          class="p-1 font-medium text-sky-800 rounded-md transition-colors duration-100 ease-out hover:bg-sky-900 hover:text-white">
          Comentarios</RouterLink>
        <RouterLink :to="{ name: 'help' }"
          class="p-1 font-medium text-sky-800 rounded-md transition-colors duration-100 ease-out hover:bg-sky-900 hover:text-white">
          ¿Cómo Usar?</RouterLink>
        <RouterLink :to="{ name: 'contact' }"
          class="p-1 font-medium text-sky-800 rounded-md transition-colors duration-100 ease-out hover:bg-sky-900 hover:text-white">
          {{ sysVals().getIsUserAuth ? 'Contacto Con La Empresa' : 'Contacto' }}</RouterLink>
        <RouterLink v-if="!sysVals().getIsAdmin && sysVals().isUserAuth" :to="{ name: 'about' }"
          class="p-1 font-medium text-sky-800 rounded-md transition-colors duration-100 ease-out hover:bg-sky-900 hover:text-white">
          Mi Condominio</RouterLink>
          <p
          v-if="!sysVals().getIsAdmin && sysVals().isUserAuth"
          @click="handleLogout"
          class="p-1 font-medium text-sky-800 rounded-md transition-colors duration-100 ease-out hover:bg-sky-900 hover:text-white">
          <i class="mr-1 text-sm fas fa-sign-out-alt"></i>
        Cerrar Sesion
          </p>
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
          class="p-1 font-medium text-white bg-sky-900 rounded-md transition-colors duration-100 ease-out hover:text-white">
          Registrarse</RouterLink>
        <RouterLink v-if="sysVals().getIsAdmin" :to="{ name: 'dashboard' }"
          class="p-1 font-medium text-white bg-sky-900 rounded-md transition-colors duration-100 ease-out hover:bg-sky-700 hover:text-white">
          Panel de Administración</RouterLink>
          <article class="relative p-1" >
            <div class="absolute w-full h-full cursor-pointer" @click.stop="toggleNotification">

            </div>
            <v-icon v-if="!notyfValues().getNewNotification && ownerVals().getOwnerName" ref="notificationElement" id="notificationBell" name="io-notifications-outline" class="mr-3 text-black cursor-pointer" scale="1.6" ></v-icon>
            <v-icon v-if="notyfValues().getNewNotification && ownerVals().getOwnerName" ref="notificationElement" id="notificationBellActive" name="md-notificationsactive" animation="ring" class="mr-3 text-rose-700 cursor-pointer" scale="1.6" ></v-icon>
“          </article>
      </nav>
      <button @click="toggleMobileMenu" id="menu-btn" class="text-gray-600 md:hidden focus:outline-none">
        <i class="fas fa-bars"></i>
      </button>
    </div>
    <div id="mobile-menu" class="bg-white md:hidden" :class="{ hidden: !isMobileMenuOpen, block: isMobileMenuOpen }">
      <nav class="flex flex-col px-4 py-4 space-y-2 animate-fade">
        <RouterLink :to="{ name: 'home' }"
          class="p-1 font-medium text-sky-800 rounded-md transition-colors duration-100 ease-out animate-fade-left animate-delay-0 hover:bg-sky-900 hover:text-white">
          Inicio</RouterLink>
        <RouterLink :to="{ name: 'comments' }"
          class="p-1 font-medium text-sky-800 rounded-md transition-colors duration-100 ease-out animate-fade-left animate-delay-100 hover:bg-sky-900 hover:text-white">
          Comentarios</RouterLink>
        <RouterLink :to="{ name: 'contact' }"
          class="p-1 font-medium text-sky-800 rounded-md transition-colors duration-100 ease-out animate-fade-left animate-delay-150 hover:bg-sky-900 hover:text-white">
          {{ sysVals().getIsUserAuth ? 'Contacto Con La Empresa' : 'Contacto' }}</RouterLink>
        <RouterLink :to="{ name: 'about' }"
          class="p-1 font-medium text-sky-800 rounded-md transition-colors duration-100 ease-out animate-fade-left animate-delay-200 hover:bg-sky-900 hover:text-white">
          Mi Condominio</RouterLink>
          <p
          v-if="!sysVals().getIsAdmin && sysVals().isUserAuth"
          @click="handleLogout"
          class="p-1 font-medium text-sky-800 rounded-md transition-colors duration-100 ease-out hover:bg-sky-900 hover:text-white">
          <i class="mr-1 text-sm fas fa-sign-out-alt"></i>
        Cerrar Sesion
          </p>
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
  <!-- Notification view -->
  <article id="notificationView" class="absolute right-4 top-20 animate-jump-out animate-reverse animate-duration-300  shadow-md text-center py-2 bg-white rounded-3xl border font-poppins p-2 border-sky-800 min-w-[450px] overflow-auto max-w-[450px] min-h-60" v-if="isNotificationOpen">
    <h2 v-if="notyfValues().getNewNotification" class="select-none">No hay notificaciones nuevas</h2>
    <!-- Notification content -->
     <article class="p-2 m-1 rounded-3xl border border-slate-200">
      <h2 class="select-none">{{ notyfValues().getLatestNotification }}</h2>
     </article>
  </article>
  </header>
  <main class="overflow-hidden">
    <section v-if="sysVals().getIsLoadingLogin"
      class="flex fixed top-0 right-0 bottom-0 left-0 z-40 justify-center items-center w-full bg-white bg-opacity-100">
      <LineLoading />
    </section>
    <slot name="main"></slot>
    <div v-if="!preferencesVals().getAcceptedTems"
      class="flex fixed right-0 bottom-0 left-0 flex-wrap justify-between items-center px-8 py-4 w-full text-white bg-black min-h-20">
      <!-- Texto informativo -->
      <p class="mb-2 text-sm sm:mb-0 sm:text-base">
        Al continuar usando este sitio, aceptas nuestros
        <RouterLink to="/terms" class="underline hover:text-sky-500">Términos y Condiciones</RouterLink> y nuestra
        <RouterLink to="/policy" class="underline hover:text-sky-500">Política de Privacidad</RouterLink>.
      </p>
      <!-- Botón de aceptar -->
      <button @click="preferencesVals().setAcceptedTems()"
        class="px-4 py-2 text-lg font-medium text-white bg-sky-500 rounded-md hover:bg-sky-700">
        Aceptar
      </button>
    </div>
  </main>
  <footer class="py-8 text-white bg-gray-800">
    <div class="container px-4 mx-auto">
      <div class="mb-6 text-center">
        <h2 class="text-sm font-semibold break-all lg:text-3xl">mantenimientocondominio.com</h2>
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

    <section class="p-6 rounded-lg shadow-xl bg-slate-800">
  <h3 class="mb-6 text-2xl font-bold text-slate-100">Leyes de Condominio</h3>

  <div class="space-y-3">
    <!-- CDMX -->
    <a
      href="https://www.congresocdmx.gob.mx/archivos/transparencia/LEY_DE_PROPIEDAD_EN_CONDOMINIO_DE_INMUEBLES_PARA_EL_DISTRITO_FEDERAL.pdf"
      target="_blank"
      rel="noopener noreferrer"
      class="flex justify-between items-center p-4 rounded-lg border transition-all group bg-slate-700 hover:bg-slate-600 border-slate-600"
    >
      <div class="flex items-center space-x-4">
        <i class="text-2xl text-blue-400 fas fa-file-pdf group-hover:text-blue-300"></i>
        <span class="text-lg font-medium text-slate-100 group-hover:text-white">Ley de Condominio CDMX</span>
      </div>
      <i class="fas fa-chevron-right text-slate-400 group-hover:text-blue-300"></i>
    </a>

    <!-- Guadalajara -->
    <a
      href="https://admosfera.mx/LeydeCondominios.pdf"
      target="_blank"
      rel="noopener noreferrer"
      class="flex justify-between items-center p-4 rounded-lg border transition-all group bg-slate-700 hover:bg-slate-600 border-slate-600"
    >
      <div class="flex items-center space-x-4">
        <i class="text-2xl text-blue-400 fas fa-file-contract group-hover:text-blue-300"></i>
        <span class="text-lg font-medium text-slate-100 group-hover:text-white">Ley de Condominio Guadalajara</span>
      </div>
      <i class="fas fa-chevron-right text-slate-400 group-hover:text-blue-300"></i>
    </a>

    <!-- Monterrey -->
    <a
      href="http://hcnl.gob.mx/trabajo_legislativo/leyes/pdf/91.pdf"
      target="_blank"
      rel="noopener noreferrer"
      class="flex justify-between items-center p-4 rounded-lg border transition-all group bg-slate-700 hover:bg-slate-600 border-slate-600"
    >
      <div class="flex items-center space-x-4">
        <i class="text-2xl text-blue-400 fas fa-file-signature group-hover:text-blue-300"></i>
        <span class="text-lg font-medium text-slate-100 group-hover:text-white">Ley de Condominio Monterrey</span>
      </div>
      <i class="fas fa-chevron-right text-slate-400 group-hover:text-blue-300"></i>
    </a>
  </div>
</section>
<section class="p-5 mt-6 rounded-lg border bg-slate-700 border-slate-600">
  <div class="flex items-start space-x-4">
    <!-- Icono de advertencia -->
    <i class="mt-1 text-xl text-yellow-400 fas fa-exclamation-triangle"></i>

    <div class="flex-1">
      <p class="text-sm leading-relaxed text-slate-200">
        <strong class="font-medium">Aviso Legal:</strong> La información proporcionada en este sitio
        <span class="inline-block">
          <i class="mx-1 text-xs fas fa-external-link-alt text-slate-400"></i>
        </span>
        es de carácter meramente informativo y recopilada de fuentes públicas disponibles en internet.
        No nos responsabilizamos por la exactitud, actualidad o integridad de los contenidos en sitios
        externos. Los enlaces a terceros están sujetos a sus propias políticas de privacidad y términos
        de uso. Recomendamos verificar siempre la información directamente con las fuentes oficiales
        correspondientes.
      </p>

      <!-- Enlace a políticas -->
      <div class="flex items-center mt-3 space-x-2">
        <i class="text-sm fas fa-balance-scale text-slate-400"></i>
        <a
          href="/terms"
          class="text-sm text-blue-300 transition-colors hover:text-blue-200"
          target="_blank"
          rel="noopener noreferrer"
        >
          Consulta nuestros términos completos de uso
        </a>
      </div>
    </div>
  </div>
</section>
  </footer>
</template>

<script lang="ts" setup>
import LineLoading from '@/components/animations/LineLoading.vue';
import { preferencesVals } from '@/stores/preferences';
import { sysVals } from '@/stores/sysVals';
import { getAuth, signOut } from 'firebase/auth';
import { onMounted, onUnmounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { notyfValues } from '@/stores/notyfAlert';
import { ownerVals } from '@/stores/ownerVals';

const constDomains = [
  "<span class=\"text-sky-500\">gastos</span><span class=\"text-sky-800\">comunes</span><span class=\"text-sky-700\">condominio</span><span class=\"text-emerald-500\">.com</span>",
  "<span class=\"text-sky-500\">gastos</span><span class=\"text-sky-800\">comunes</span><span class=\"text-sky-700\">edificio</span><span class=\"text-emerald-500\">.com</span>",
  "<span class=\"text-sky-500\">edificio</span><span class=\"text-emerald-800\">y</span><span class=\"text-sky-700\">condominio</span><span class=\"text-emerald-500\">.com</span>",
  "<span class=\"text-sky-500\">mantenimiento</span><span class=\"text-sky-800\">condominio</span><span class=\"text-emerald-700\">.com</span>",
  "<span class=\"text-sky-500\">mantenimiento</span><span class=\"text-sky-800\">edificio</span><span class=\"text-emerald-700\">.com</span>",
  "<span class=\"text-sky-500\">mantenimiento</span><span class=\"text-emerald-600\">y</span><span class=\"text-sky-700\">gastos</span><span class=\"text-sky-500\">comunes</span><span class=\"text-emerald-700\">.com</span>"
];

const currentDomain = ref(constDomains[0]);
const notificationElement = ref<HTMLElement | null>(null);
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

const auth = getAuth();
const handleLogout = async() => {
  // reload window
  await signOut(auth)
  window.location.reload()
}


// Value for the notification view element
const notificationView = ref<HTMLElement | null>(null);

//function to toggle the notification view
const isNotificationOpen = ref(false);

const toggleNotification = () => {
  isNotificationOpen.value = !isNotificationOpen.value;
  console.log('Clicked, notification open: ', isNotificationOpen.value);
  notyfValues().setNewNotification(false)
  notyfValues().setComponentNotification('');
  notyfValues().setNotificationContent('No hay notificaciones nuevas');
}
const closeNotification = (event: MouseEvent) => {
  if ((event.target as HTMLElement).id !== 'notificationBell' && (event.target as HTMLElement).id !== 'notificationView') {
    isNotificationOpen.value = false;
  }
};

document.addEventListener('click', closeNotification);

onUnmounted(() => {
  document.removeEventListener('click', closeNotification);
});


</script>

<style scoped>
/* Asegúrate de que los estilos de Tailwind CSS estén correctamente aplicados */
</style>
