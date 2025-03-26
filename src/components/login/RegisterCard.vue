<template>
  <section class="font-roboto font-poppins">
    <section v-if="loadingAnimation"
      class="flex fixed top-0 right-0 bottom-0 left-0 z-40 flex-col justify-center items-center bg-white bg-opacity-100 transition-opacity duration-500 ease-in-out animate-fade">
      <p class="text-2xl font-semibold text-sky-800 font-poppins">Creando Cuenta <span
          class="animate-pulse animate-delay-0">.</span> <span class="animate-pulse animate-delay-300">.</span> <span
          class="animate-pulse animate-delay-400">.</span></p>
      <!-- /* From Uiverse.io by TamaniPhiri */  -->
      <div class="flex flex-col gap-4 justify-center items-center w-full">
        <div
          class="flex justify-center items-center w-28 h-28 text-4xl text-blue-400 rounded-full border-8 border-gray-300 animate-spin border-t-blue-400">
          <!-- <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em" class="animate-ping">
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"></path>
    </svg> -->
        </div>
      </div>
    </section>

    <div class="flex justify-center items-center px-3 py-2 bg-white bg-opacity-50">
      <div class="p-8 w-full max-w-4xl bg-white rounded-lg shadow-lg">
        <h2 class="mb-6 text-4xl font-bold text-center text-sky-900">Crear una Cuenta</h2>
        <form>
          <div class="mb-4">
            <label for="nombre" class="block font-medium text-sky-900">Nombre</label>
            <div class="relative">
              <input v-model="name" type="text" id="nombre" name="nombre" placeholder="Ingresa tu nombre"
                class="px-3 py-2 pl-10 w-full rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                required>
              <i class="absolute top-3 left-3 text-sky-800 fas fa-user"></i>
            </div>
          </div>
          <div class="mb-4">
            <label for="tipo-cuenta" class="block font-medium text-sky-900">Tipo de Cuenta</label>
            <div class="relative">
              <select :disabled="hasInvId" v-model="type" id="tipo-cuenta" name="tipo-cuenta"
                class="px-3 py-2 pl-10 w-full rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                :class="{'bg-green-600 text-white placeholder:text-white' : hasInvId}"
                required>
                <option value="" disabled selected>Selecciona el tipo de cuenta</option>
                <option value="propietario">Propietario/Inquilino</option>
                <option value="administrador">Administrador</option>
              </select>
              <i class="absolute top-3 left-3 text-sky-800 fas fa-user-tag"></i>
            </div>
            <div v-if="!hasInvId" class="mt-2 text-sm text-gray-600">
              <i class="mr-1 fas fa-info-circle"></i>
              La cuenta por defecto es de <strong>Propietario/Inquilino</strong>. Seleccione
              <strong>Administrador</strong> si usted es responsable de la administración de un edificio o condominio.
            </div>
            <p v-if="hasInvId" class="text-green-600"><i class="mr-1 fas fa-check"></i>Se ha ingresado el <strong>Tipo de cuenta</strong> via QR, puede omitir este campo.</p>
          </div>
          <div v-if="type.toLowerCase() == 'propietario'" class="mb-4 animate-fade-up">
            <label for="owner" class="block font-medium text-sky-900">Número de departamento</label>
            <div class="relative">
              <input v-model="departmentNumber" type="text" id="owner" name="owner"
                placeholder="Ingresa el número de departamento"
                class="px-3 py-2 pl-10 w-full rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                required>
              <i class="absolute top-3 left-3 text-sky-800 fas fa-hashtag"></i>
            </div>
          </div>
          <div v-if="type.toLowerCase() == 'propietario'" class="mb-4 animate-fade-up">
            <label for="invId" class="block font-medium text-sky-900">Código de invitación</label>
            <div class="relative">
              <input v-model="invId" :disabled="hasInvId" :class="{'bg-green-500 text-white placeholder:text-white' : hasInvId}" type="text " id="invId" name="invId" placeholder="Ingresa el código de invitación"
                class="px-3 py-2 pl-10 w-full rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                required>
              <i class="absolute top-3 left-3 text-sky-800 fas fa-address-card"></i>
              <p v-if="hasInvId" class="text-green-600"><i class="mr-1 fas fa-check"></i>Se ha ingresado el <strong>Código de invitación</strong> via QR, puede omitir este campo.</p>
            </div>
            <div v-if="!hasInvId">
              <small class="text-xs italic text-slate-500"><i class="mr-1 fas fa-info-circle"></i>Ingresa el código de
                invitación de tu departamento, pregunta al administrador, por el código.</small>
            </div>
          </div>

          <div v-if="type.toLowerCase() == 'administrador'" class="mb-4 animate-fade-up">
            <label for="condominium" class="block font-medium text-sky-900">Nombre del Condominio</label>
            <div class="relative">
              <input v-model="condominium" type="email" id="condominium" name="condominium"
                placeholder="Ingresa el nombre del condominio "
                class="px-3 py-2 pl-10 w-full rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                required>
              <i class="absolute top-3 left-3 text-sky-800 fas fa-building"></i>
            </div>
          </div>
          <div class="mb-4">
            <label for="correo" class="block font-medium text-sky-900">Correo Electrónico</label>
            <div class="relative">
              <input v-model="email" type="email" id="correo" name="correo" placeholder="Ingresa tu correo electrónico"
                class="px-3 py-2 pl-10 w-full rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                required>
              <i class="absolute top-3 left-3 text-sky-800 fas fa-envelope"></i>
            </div>
          </div>
          <div class="mb-4">
            <label for="contrasena" class="block font-medium text-sky-900">Contraseña</label>
            <div class="relative">
              <input v-model="password" type="password" id="contrasena" name="contrasena"
                placeholder="Ingresa tu contraseña"
                class="px-3 py-2 pl-10 w-full rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                required>
              <i class="absolute top-3 left-3 text-sky-800 fas fa-lock"></i>
            </div>
          </div>
          <div class="mb-4">
            <label for="confirmar-contrasena" class="block font-medium text-sky-900">Confirmar Contraseña</label>
            <div class="relative">
              <input v-model="cPassword" type="password" id="confirmar-contrasena" name="confirmar-contrasena"
                placeholder="Confirma tu contraseña"
                class="px-3 py-2 pl-10 w-full rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                required>
              <i class="absolute top-3 left-3 text-sky-800 fas fa-lock"></i>
            </div>
          </div>
          <div class="mb-6">
            <button @click.prevent="logUser(type)" type="submit"
              class="px-3 py-2 w-full text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Crear
              Cuenta</button>
          </div>
          <div>
            <p class="text-center">¿Necesitas Ayuda? <RouterLink class="text-sky-600" :to="{ name: 'help' }">
                Como Crear Cuenta</RouterLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<!-- <script lang="ts" setup>
import { ref } from 'vue';

const name = ref('');
const email = ref('');
const type = ref('');
const password = ref('');
const cPassword = ref('');

import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from 'firebase/auth';
import { getFirestore, doc, setDoc, addDoc, collection } from 'firebase/firestore';

const auth = getAuth();
const db = getFirestore();

const handleCreation = async () => {
  try {
    await createUserWithEmailAndPassword(auth, email.value, password.value);
    const user = auth.currentUser;
    if (user) {
      await updateProfile(user, { displayName: name.value });
      await sendEmailVerification(user);
      const userId = user.uid;

      // Crear un nuevo condominio
      const condominioRef = await addDoc(collection(db, "condominios"), {
        datosCondominio: {
          nombre: "Nombre del condominio",
          direccion: "Dirección",
          creadoPor: userId
        }
      });

      // Guardar el usuario como admin
      await setDoc(doc(db, "condominios", userId), {
        tipo: "admin",
        perteneceA: userId // Relación al condominio
      });

      console.log("Admin registrado y condominio creado:", userId);
      console.log(user);
    }
  } catch (error) {
    const e = error as Error;
    console.log(e);

  }
}
</script> -->
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, Timestamp, query, where, doc as fBaseDoc, setDoc, updateDoc, getDoc } from "firebase/firestore";
// animations for toast
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; // for React, Vue and Svelte
import { sysVals } from "@/stores/sysVals";
import { useRouter, useRoute } from "vue-router";
import { v4 as uuidv4 } from 'uuid';

const loadingAnimation = ref(false);
const route = useRoute();

// Create an instance of Notyf
const notyf = new Notyf({
  position: {
    x: 'center',
    y: 'top'
  },
  dismissible: true,
  duration: 5000
});

const name = ref("");
const email = ref("");
const type = ref("");
const condominium = ref("");
const password = ref("");
const cPassword = ref("");
const invitationId = ref("");
const departmentNumber = ref("");
const auth = getAuth();
const db = getFirestore();
const invId = ref("");
const router = useRouter();
// funciton that generates a random string of characters with uppercase and lowercase letters, numbers with a length of 8 characters
// const generateRandomString = () => {
//   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//   let randomString = '';
//   for (let i = 0; i < 8; i++) {
//     const randomIndex = Math.floor(Math.random() * characters.length);
//     randomString += characters.charAt(randomIndex);
//   }
//   return randomString;
// }


const condominiosRef = collection(db, "condominios");

const validateFields = () => {
  if (type.value.toLowerCase() == 'propietario' && !departmentNumber.value) {
    notyf.error("Por favor, completa el número de departamento.");
    return false;
  }
  if (type.value.toLowerCase() == 'propietario' && !invId.value) {
    notyf.error("Por favor, completa el código de invitación.");
    return false;
  }
  if (!name.value || !password.value || !cPassword.value || !type.value) {
    notyf.error("Por favor, completa todos los campos.");
    return false;
  }
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexEmail.test(email.value)) {
    notyf.error("Por favor, ingresa un correo electrónico válido.");
    return false;
  }
  if (password.value !== cPassword.value) {
    notyf.error("Las contraseñas no coinciden.");
    return false;
  }

  return true;
};

const handleCreationAdmin = async () => {
  try {
    if (!validateFields()) return;

    loadingAnimation.value = true;

    // Generar ID de invitación único
    invitationId.value = uuidv4();
    // const condominioSnapshot = await getDocs(condominiosRef);
    // const condominios = condominioSnapshot.docs.map((doc) => doc.data());

    // if (condominios.some(condominio => condominio.invitationId === invitationId.value)) {
    //   notyf.error("Error al generar el ID de invitación. Inténtelo de nuevo.");
    //   loadingAnimation.value = false;
    //   return;
    // }

    // Crear usuario en Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
    const user = userCredential.user;

    if (user) {
      await updateProfile(user, { displayName: `${type.value} ${name.value}` });
      await sendEmailVerification(user);

      const condominioRef = await addDoc(collection(db, "condominios"), {
        name: condominium.value,
        createdBy: user.uid,
        type: type.value,
        invitationId: invitationId.value,
        dateCreated: Timestamp.now(),
        condominiumId: ''
      });

      await updateDoc(condominioRef, { condominiumId: condominioRef.id });

      // Configuración inicial: anuncios, comentarios y encuestas
      const anunciosRef = collection(db, `condominios/${condominioRef.id}/announcements`);
      const comentariosRef = collection(db, `condominios/${condominioRef.id}/comments`);
      const surveysCollectionRef = collection(db, `condominios/${condominioRef.id}/surveys`);

      const announcementDoc = await addDoc(anunciosRef, {
        announcementId: '',
        category: "Bienvenida",
        creationDate: Timestamp.now(),
        description: "Bienvenidos a nuestro condominio. Aquí puedes encontrar información sobre tus inquilinos, servicios, y mucho más",
        imageUrl:'https://images.unsplash.com/photo-1674746760908-461a3f97175d?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: `Bienvenidos al condominio ${condominium.value}`,
        urgent: false
      });

      await updateDoc(announcementDoc, { announcementId: announcementDoc.id });

      const commentDoc = await addDoc(comentariosRef, {
        announcement: "Bienvenido a la sección de comentarios, puedes dejar tus opiniones y sugerencias sobre el condominio, responder a otros comentarios o aportar nuevas ideas, recuerda que tus comentarios los podrán ver los demás propietarios, recuerda que siempre debe ser respetuoso con los demás al interactuar.",
        category: "Bienvenida",
        date: Timestamp.now(),
        imageUrl: 'https://images.unsplash.com/photo-1674746760908-461a3f97175d?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        author: user.displayName,
        isUrgent: false,
        fromAdmin: false
      });

      await updateDoc(commentDoc, { documentId: commentDoc.id });

      const surveyToFbase = await addDoc(surveysCollectionRef, {
        title: 'Sección de encuestas',
        description: 'Esta es una encuesta de prueba, puedes responderla y ver los resultados, tu votación es anónima, recuerda, una vez que hayas votado, no podrás votar de nuevo en la misma encuesta.',
        options: ['¡Excelente!', '¡Super!', '¡Genial!'],
        createdBy: user.uid,
        creationDate: Timestamp.now()
      });

      await updateDoc(surveyToFbase, { surveyDocId: surveyToFbase.id });

      notyf.success({
        message: "Registro exitoso. Por favor, verifica tu correo electrónico.",
        duration: 7000
      });
    }
    router.push('/login');
  } catch (error) {
    console.error(error);
    notyf.error((error as Error).message);
  } finally {
    loadingAnimation.value = false;
  }
};


const handleCreationOwnerV2 = async () => {
  if (!validateFields()) return;
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
    const user = userCredential.user;

    if (user) {
      await updateProfile(user, { displayName: `${type.value} ${name.value}` });
      await sendEmailVerification(user);

      //delete this once the test is over
      console.log('user.uid from handleCreationOwnerV2', user.uid);

      const preUsersRef = fBaseDoc(db, 'preUsers', user.uid);
      const newPreUserDocument = await setDoc(preUsersRef, {
        creationDate: Timestamp.now(),
        userUid: user.uid,
        invitationId: invId.value.trim(),
        userAllowed:true,
      })
      console.log(newPreUserDocument);

      // adding to the condominios users
      const condominiosRef = collection(db, 'condominios');
      const q = query(condominiosRef, where('invitationId', '==', invId.value.trim()));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docVal = querySnapshot.docs[0];
        const condominioRef = docVal.ref;
        console.log('Condominio found with this invitation id:', condominioRef.id);
        console.log('Condominio data:', docVal.data());

        // adding to the condominios users
        const usersSubcollectionRef = fBaseDoc(db, `condominios/${condominioRef.id}/usuarios/${user.uid}`);
        const userDocRef = await setDoc(usersSubcollectionRef, {
        allowComments : true,
        associatedTo : docVal.data().createdBy,
        blockedReason : '',
        creationDate : Timestamp.now(),
        deptNumber : departmentNumber.value ,
        docId : '',
        firstCreation: true,
        isBlocked : false,
        name : name.value,
        userUid : user.uid
        })



        console.log('Condominio updated:', userDocRef);


        //  adding to the usersGeneral
      const usersGeneralCollectionRef = collection(db, 'usersGeneral');
      const usersGeneralDocRef = await addDoc(usersGeneralCollectionRef, {
        asociatedTo: docVal.data().createdBy,
        asociatedToCondominiumId: docVal.data().condominiumId,
        creationDate: Timestamp.now(),
        deptNumber: departmentNumber.value,
        invitationCode: docVal.data().invitationId,
        // userDataId: userDocRef,
        isBlocked: false,
        allowComments: true,
        docId: user.uid,
        userUid: user.uid
      });
      console.log('usersGeneral docRefId', usersGeneralDocRef);
      console.log('user docRefId', userDocRef);

      } else {
        console.log('No condominio found with this invitation id');
      }

    }

    notyf.success('Registro exitoso. Por favor, verifica tu correo electrónico.');
    router.push('/login');
  } catch (error) {
    console.error(error);
    notyf.error((error as Error).message);
  }
}

const logUser = (type: string) => {
  switch (type.toLowerCase()) {
    case 'administrador':
      handleCreationAdmin();
      break;
    case 'propietario':
      handleCreationOwnerV2();
      break;
    default:
      break;
  }
}
// Obtener los parámetros
const tipoCuenta = route.query.tipoCuenta || ''; // Valor por defecto si no está presente
const codigoInvitacion = route.query.codigoInvitacion || '';
//variable that will contain the boolean to see if user entered the code via url
const hasInvId = ref(false);


console.log('Tipo de cuenta:', tipoCuenta);
console.log('Código de invitación:', codigoInvitacion);


onMounted(() => {
  invId.value = String(codigoInvitacion);
  type.value = String(tipoCuenta);
  hasInvId.value = Boolean(codigoInvitacion);
})
</script>

<style scoped></style>
