<template>
  <img src="https://images.unsplash.com/photo-1523789265170-a9376a327aed?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" class="fixed top-0 bottom-0 left-0 right-0 object-cover w-full h-full animate-fade -z-10" alt="">
<section class="flex items-center justify-center min-h-screen p-4">
  <!-- <article class="flex items-center justify-center h-screen bg-gray-100"> -->
    <!-- Overlay -->
    <!-- Overlay -->
    <div v-if="showPopup" class="fixed inset-0 top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center w-full bg-black bg-opacity-50">
        <!-- Popup Card -->
        <div class="relative w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
            <button class="absolute text-gray-400 top-4 right-4 hover:text-gray-600 focus:outline-none">
                <i @click="showPopup = false" class="fas fa-times"></i>
            </button>
            <h2 class="mb-4 text-2xl font-bold">Recuperación de Contraseña</h2>
            <p class="mb-4">Introduzca su correo electrónico para restablecer la contraseña.</p>
            <div class="mb-4">
                <label for="email" class="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                <div class="relative mt-1 rounded-md shadow-sm">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <i @click="showPopup = false" class="text-gray-400 fas fa-envelope"></i>
                    </div>
                    <input type="email" id="email" class="block w-full py-2 pl-10 pr-3 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="you@example.com">
                </div>
            </div>
            <button class="w-full py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Restablecer Contraseña
            </button>
        </div>
    </div>
<!-- </article> -->
  <div class="flex flex-col w-full max-w-5xl p-8 space-y-4 bg-white rounded-lg shadow-lg md:flex-row md:space-y-0 md:space-x-8">
    <!-- Left side (Login Form) -->
    <div class="w-full md:w-1/2">
      <h2 class="mb-4 text-2xl text-blue-600 font-poppins">Iniciar sesión</h2>
      <form class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Correo electrónico</label>
          <input v-model="email" type="email" id="email" placeholder="correo@ejemplo.com" class="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Contraseña</label>
          <input v-model="password" type="password" id="password" placeholder="********" class="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div class="flex items-center justify-between mt-2">
          <a  @click="showPopup = !showPopup" class="text-sm text-blue-500 cursor-pointer">¿Olvidó su contraseña?</a>
        </div>
        <button type="submit" @click.prevent="signIn" class="w-full py-2 mt-4 font-semibold text-white transition-all bg-blue-600 rounded-md hover:bg-blue-700">Iniciar sesión</button>
      </form>
      <div class="mt-4 text-center">
        <p class="text-sm text-gray-600">¿No tienes una cuenta?</p>
        <a href="#" class="font-semibold text-blue-600">Crear cuenta</a>
      </div>
    </div>

    <!-- Right side (Title & Image) -->
    <div class="w-full text-center md:w-1/2 md:text-left">
      <h3 class="mb-4 text-xl text-center text-gray-800 font-poppins">Inicie sesión nuevamente para hablar con su equipo</h3>
      <img src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Imagen" class="mx-auto rounded-md w-4/4 md:mx-0" />
    </div>
  </div>
</section>


</template>

<script lang="ts" setup>
import { sysVals } from "@/stores/sysVals";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import { ref } from "vue";
import { useRouter } from "vue-router";

const showPopup = ref(false);

const auth = getAuth();
const db = getFirestore();  // Inicializa Firestore

const email = ref('');
const password = ref('');
const router = useRouter();

const signIn  = async () => {
  try {
    const credentials = await signInWithEmailAndPassword(auth, email.value, password.value);
    if (credentials.user) {
      console.log(credentials.user);

      // Verifica si el usuario es administrador según el displayName
      if (credentials.user.displayName && credentials.user.displayName.toLowerCase().includes('administrador')) {
        sysVals().setIsAdmin(true);
        sysVals().setIsUserAuth(true);
        router.push({ name: 'dashboard' });
      } else {
        sysVals().setIsAdmin(false);
        sysVals().setIsUserAuth(true);
        router.push({ name: 'comments' });

      }

      // Consulta la colección 'condominios' para encontrar un documento donde 'creadoPor' coincida con el UID del usuario
      const condominiosRef = collection(db, "condominios");  // Referencia a la colección de condominios
      const q = query(condominiosRef, where("creadoPor", "==", credentials.user.uid));  // Filtro por 'creadoPor' que debe coincidir con el UID

      const querySnapshot = await getDocs(q);  // Obtén los documentos que coincidan con la consulta

      if (!querySnapshot.empty) {
        // Si se encuentra al menos un documento, significa que el UID existe en la lista
        console.log("Usuario encontrado en la lista de condominios");
        // console.log(querySnapshot.docs[0].data().invitationId);
        sysVals().setInvitationCode(querySnapshot.docs[0].data().invitationId)

      } else {
        // Si no se encuentra ningún documento, el UID no está en la lista
        console.log("El usuario no está en la lista de condominios");
      }
    }
  } catch (error) {
    console.log(error);
  }
}
</script>



<style scoped>

</style>
