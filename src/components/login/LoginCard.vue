<template>
  <img
    src="https://images.unsplash.com/photo-1523789265170-a9376a327aed?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    class="fixed top-0 bottom-0 left-0 right-0 object-cover w-full h-full animate-fade -z-10" alt="">
  <section class="flex items-center justify-center min-h-screen p-4">
    <!-- <article class="flex items-center justify-center h-screen bg-gray-100"> -->
    <!-- Overlay -->
    <!-- Overlay -->
    <div v-if="showPopup"
      class="fixed inset-0 top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center w-full bg-black bg-opacity-50">
      <!-- Popup Card -->
      <div class="relative w-full max-w-md p-6 bg-white rounded-lg shadow-lg font-poppins">
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
            <input v-model="verificationEmail" type="email" id="email"
              class="block w-full py-2 pl-10 pr-3 border border-gray-300 rounded-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              placeholder="correo@ejemplo.com">
          </div>
        </div>
        <button @click="sendVerificationEmail"
          class="w-full py-2 text-white rounded-md bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2">
          Restablecer Contraseña
        </button>
      </div>
    </div>
    <!-- </article> -->
    <div
      class="flex flex-col w-full max-w-5xl p-8 space-y-4 bg-white rounded-lg shadow-lg md:flex-row md:space-y-0 md:space-x-8">
      <!-- Left side (Login Form) -->
      <div class="w-full md:w-1/2">
        <h2 class="mb-4 text-2xl text-blue-600 font-poppins">Iniciar sesión</h2>
        <form class="space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Correo electrónico</label>
            <input v-model="email" type="email" id="email" placeholder="correo@ejemplo.com"
              class="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Contraseña</label>
            <input v-model="password" type="password" id="password" placeholder="********"
              class="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div class="flex items-center justify-between mt-2">
            <a @click="showPopup = !showPopup" class="text-sm text-blue-500 cursor-pointer">¿Olvidó su contraseña?</a>
          </div>
          <button type="submit" @click.prevent="signIn"
            class="w-full py-2 mt-4 font-semibold text-white transition-all bg-blue-600 rounded-md hover:bg-blue-700">Iniciar
            sesión</button>
        </form>
        <div class="mt-4 text-center">
          <p class="text-sm text-gray-600">¿No tienes una cuenta?</p>
          <RouterLink :to="{ name: 'register' }" class="font-semibold text-blue-600">Crear cuenta</RouterLink>
        </div>
        <div>
          <p class="mt-5 text-sm text-center font-poppins text-slate-800">¿Necesitas Ayuda? <RouterLink
              class="text-sky-600" :to="{ name: 'help' }">
              Como Usar</RouterLink>
          </p>
        </div>
      </div>

      <!-- Right side (Title & Image) -->
      <div class="w-full text-center md:w-1/2 md:text-left">
        <h3 class="mb-4 text-xl text-center text-gray-800 font-poppins">Inicie sesión para interactuar con su
          condominio/edificio</h3>
        <img
          src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Imagen" class="mx-auto rounded-md w-4/4 md:mx-0" />
      </div>
    </div>
  </section>


</template>

<script lang="ts" setup>
import { ownerVals } from "@/stores/ownerVals";
import { qrVals } from "@/stores/qrVals";
import { sysVals } from "@/stores/sysVals";
import { getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, getDocs, query, where, doc, getDoc } from "firebase/firestore";
import { Notyf } from "notyf";
import 'notyf/notyf.min.css'; // for React, Vue and Svelte
import { ref } from "vue";
import { useRouter } from "vue-router";

const notyf = new Notyf({
  position: {
    x: 'center',
    y: 'top'
  },
  dismissible: true,
  duration: 5000
})

const showPopup = ref(false);

const auth = getAuth();
const db = getFirestore();  // Inicializa Firestore

const email = ref('');
const password = ref('');
const router = useRouter();


/**
 * This function is used to sign in a user to the app.
 * It will check if the user is an admin or an owner and set the corresponding values in pinia.
 * If the user is an admin, it will fetch the values for the admin mode (pinia state based) such as 'setAdminDocId', 'setCondominiumId', 'setInvitationId' and finally it will push to dashboard.
 * If the user is an owner, it will check if the user is asociated to a condominium and if the condominium exists on fb, then it will set the corresponding values in pinia and push to about page.
 * If the user is not asociated to a condominium, it will show an error message.
 * @function
 * @param {string} email the email of the user
 * @param {string} password the password of the user
 */

const signIn = async () => {
  sysVals().setIsLoadingLogin(true);
  try {
    const credentials = await signInWithEmailAndPassword(auth, email.value, password.value);
    const user = credentials.user
    const userName = credentials.user.displayName
    if (userName) {
      if (userName.includes('propietario')) {
        const newUserName = userName.replace(/propietario/gi, '').trim();
        sysVals().setActualUserName(newUserName)
      } else {
        const newUserName = userName.replace(/administrador/gi, '').trim();
        sysVals().setActualUserName(newUserName)
      }
    }
    console.log(user.emailVerified);
    console.log(sysVals().getActualUserName);


    if (!user.emailVerified) {
      notyf.error('Su correo no ha sido verificado, revise su correo y de click en el enlace de verificación')
      sysVals().setIsLoadingLogin(false);
      return;
    }


    if (user && user.displayName?.includes('administrador')) { //If user is admin set pinia values to admin mode and set user auth
      sysVals().setIsAdmin(true);
      sysVals().setIsUserAuth(true);
      sysVals().setUserUid(credentials.user.uid);

      // now fetching the values for the admin mode (pinia state based) such as 'setAdminDocId' 'setCondominiumId', 'setInvitationId' an finally we push to dashboard
      const condominiosRef = collection(db, 'condominios');
      const qIsAdminInCondominios = query(condominiosRef, where('createdBy', '==', user.uid));
      const snapshotAdminCondominios = await getDocs(qIsAdminInCondominios);
      if (!snapshotAdminCondominios.empty) {
        console.log(snapshotAdminCondominios.docs[0].data());
        sysVals().setAdimnDocId(snapshotAdminCondominios.docs[0].id)
        sysVals().setCondominiumId(snapshotAdminCondominios.docs[0].data().condominiumId)
        sysVals().setInvitationCode(snapshotAdminCondominios.docs[0].data().invitationId)
        qrVals().setLink(`https://mantenimientocondominio.com/register?tipoCuenta=propietario&codigoInvitacion=${snapshotAdminCondominios.docs[0].data().invitationId}`)

        router.push({ name: 'dashboard' })
      }
      sysVals().setIsLoadingLogin(false);

    }
    else if (user && user.displayName && user.displayName.includes('propietario')) {//if user is owner set pinia values to owner mode ans set user auth
      sysVals().setIsAdmin(false);
      sysVals().setUserUid(credentials.user.uid);
      ownerVals().setOwnerName(user.displayName)


      // checking if invitationId exists on fb



      // now checking if user uid is on usersGeneral and who is asociated to
      const usersGenneralCollectionRef = collection(db, 'usersGeneral');
      const qIsUserInUsersGeneral = query(usersGenneralCollectionRef, where('userUid', '==', user.uid));
      const snapshot = await getDocs(qIsUserInUsersGeneral);
      if (!snapshot.empty) {
        console.log(snapshot.docs[0].data());
        if (snapshot.docs[0].data().isBlocked) {
          notyf.error('No se puede iniciar sesión, usuario bloqueado por el administrador del condominio');
          sysVals().setIsLoadingLogin(false);
          return;
        }
        // now verifying that the condominium exists on fb
        const condominiosInvitationIdRef = doc(db, 'condominios', snapshot.docs[0].data().asociatedToCondominiumId);
        const snapshotCondominios = await getDoc(condominiosInvitationIdRef);

        if (snapshotCondominios.exists()) {
          if (snapshot.docs[0].data().invitationCode !== snapshotCondominios.data().invitationId) {
            notyf.error('No se puede iniciar sesión, el código asociado a esta cuenta no se encontró en el sistema, por favor contacte al administrador de su condominio');
            sysVals().setIsLoadingLogin(false);
            return;
          }
        }

        sysVals().setOwnerInvitationCode(snapshot.docs[0].data().invitationCode)
        sysVals().setAdimnDocId(snapshot.docs[0].data().asociatedToCondominiumId)
        ownerVals().setUserDataId(snapshot.docs[0].data().userDataId)


        sysVals().setIsUserAuth(true);
        qrVals().setLink(`http://localhost:5173/micondominio/register?tipoCuenta=propietario&codigoInvitacion=${snapshot.docs[0].data().invitationCode}`)
        // qrVals().setLink(`http://localhost:5173/micondominio/register?tipoCuenta=propietario&codigoInvitacion=546487`)
        sysVals().setIsLoadingLogin(false);

        router.push({ name: 'about' })
      } else {
        console.log('No existe ese usuario');
        sysVals().setIsLoadingLogin(false);

      }
    }

  } catch (error) {
    sysVals().setIsLoadingLogin(false);
    notyf.error('Error al iniciar sesión, verifique su contraseña o correo');
    console.log('Error al iniciar sesión', error);

  }
}

const verificationEmail = ref('');
const sendVerificationEmail = async () => {
  try {
    const authUser = getAuth();
    if (authUser.currentUser) {
      await sendPasswordResetEmail(authUser, verificationEmail.value);
      notyf.success('Se envió un correo para reestablecer su contraseña');
      verificationEmail.value = '';
      showPopup.value = false;
    }
  } catch (error) {
    console.log(error);

  }
}
</script>


<style scoped></style>
