<template>
  <img
    src="https://images.unsplash.com/photo-1576961453646-b4c376c7021b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    class="fixed top-0 bottom-0 left-0 right-0 object-cover w-full h-full animate-fade -z-10"
    alt="A scenic view of a modern building with a clear sky in the background">
  <section class="font-roboto font-poppins ">
    <section v-if="loadingAnimation"
      class="fixed top-0 bottom-0 left-0 right-0 z-40 flex flex-col items-center justify-center transition-opacity duration-500 ease-in-out bg-white bg-opacity-100 animate-fade">
      <p class="text-2xl font-semibold text-sky-800 font-poppins ">Creando Cuenta <span
          class="animate-pulse animate-delay-0">.</span> <span class="animate-pulse animate-delay-300">.</span> <span
          class="animate-pulse animate-delay-400">.</span></p>
      <!-- /* From Uiverse.io by TamaniPhiri */  -->
      <div class="flex flex-col items-center justify-center w-full gap-4">
        <div
          class="flex items-center justify-center text-4xl text-blue-400 border-8 border-gray-300 rounded-full w-28 h-28 animate-spin border-t-blue-400">
          <!-- <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em" class="animate-ping">
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"></path>
    </svg> -->
        </div>
      </div>
    </section>

    <div class="flex items-center justify-center px-3 py-2 bg-white bg-opacity-50 ">
      <div class="w-full max-w-4xl p-8 bg-white rounded-lg shadow-lg">
        <h2 class="mb-6 text-4xl font-bold text-center text-sky-900">Crear una Cuenta</h2>
        <form>
          <div class="mb-4">
            <label for="nombre" class="block font-medium text-sky-900">Nombre</label>
            <div class="relative">
              <input v-model="name" type="text" id="nombre" name="nombre" placeholder="Ingresa tu nombre"
                class="w-full px-3 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required>
              <i class="absolute text-sky-800 fas fa-user left-3 top-3"></i>
            </div>
          </div>
          <div class="mb-4">
            <label for="tipo-cuenta" class="block font-medium text-sky-900">Tipo de Cuenta</label>
            <div class="relative">
              <select v-model="type" id="tipo-cuenta" name="tipo-cuenta"
                class="w-full px-3 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required>
                <option value="" disabled selected>Selecciona el tipo de cuenta</option>
                <option value="propietario">Propietario/Inquilino</option>
                <option value="administrador">Administrador</option>
              </select>
              <i class="absolute text-sky-800 fas fa-user-tag left-3 top-3"></i>
            </div>
            <div class="mt-2 text-sm text-gray-600">
              <i class="mr-1 fas fa-info-circle"></i>
              La cuenta por defecto es de <strong>Propietario/Inquilino</strong>. Seleccione
              <strong>Administrador</strong> si usted es responsable de la administración de un edificio o condominio.
            </div>
          </div>
          <div v-if="type.toLowerCase() == 'propietario'" class="mb-4 animate-fade-up">
            <label for="owner" class="block font-medium text-sky-900">Número de departamento</label>
            <div class="relative">
              <input v-model="departmentNumber" type="email" id="owner" name="owner"
                placeholder="Ingresa el número de departamento"
                class="w-full px-3 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required>
              <i class="absolute text-sky-800 fas fa-hashtag left-3 top-3"></i>
            </div>
          </div>
          <div v-if="type.toLowerCase() == 'propietario'" class="mb-4 animate-fade-up">
            <label for="invId" class="block font-medium text-sky-900">Código de invitación</label>
            <div class="relative">
              <input v-model="invId" type="email" id="invId" name="invId" placeholder="Ingresa el código de invitación"
                class="w-full px-3 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required>
              <i class="absolute text-sky-800 fas fa-address-card left-3 top-3"></i>
            </div>
            <div>
              <small class="text-xs italic text-slate-500"><i class="mr-1 fas fa-info-circle"></i>Ingresa el código de
                invitación de tu departamento, pregunta al administrador, por el código.</small>
            </div>
          </div>

          <div v-if="type.toLowerCase() == 'administrador'" class="mb-4 animate-fade-up">
            <label for="condominium" class="block font-medium text-sky-900">Nombre del Condominio</label>
            <div class="relative">
              <input v-model="condominium" type="email" id="condominium" name="condominium"
                placeholder="Ingresa el nombre del condominio "
                class="w-full px-3 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required>
              <i class="absolute text-sky-800 fas fa-building left-3 top-3"></i>
            </div>
          </div>
          <div class="mb-4">
            <label for="correo" class="block font-medium text-sky-900">Correo Electrónico</label>
            <div class="relative">
              <input v-model="email" type="email" id="correo" name="correo" placeholder="Ingresa tu correo electrónico"
                class="w-full px-3 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required>
              <i class="absolute text-sky-800 fas fa-envelope left-3 top-3"></i>
            </div>
          </div>
          <div class="mb-4">
            <label for="contrasena" class="block font-medium text-sky-900">Contraseña</label>
            <div class="relative">
              <input v-model="password" type="password" id="contrasena" name="contrasena"
                placeholder="Ingresa tu contraseña"
                class="w-full px-3 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required>
              <i class="absolute text-sky-800 fas fa-lock left-3 top-3"></i>
            </div>
          </div>
          <div class="mb-4">
            <label for="confirmar-contrasena" class="block font-medium text-sky-900">Confirmar Contraseña</label>
            <div class="relative">
              <input v-model="cPassword" type="password" id="confirmar-contrasena" name="confirmar-contrasena"
                placeholder="Confirma tu contraseña"
                class="w-full px-3 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required>
              <i class="absolute text-sky-800 fas fa-lock left-3 top-3"></i>
            </div>
          </div>
          <div class="mb-6">
            <button @click.prevent="logUser(type)" type="submit"
              class="w-full px-3 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Crear
              Cuenta</button>
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
import { getFirestore, collection, addDoc, getDocs, Timestamp, query, where, doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
// animations for toast
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; // for React, Vue and Svelte
import { sysVals } from "@/stores/sysVals";
import { useRouter } from "vue-router";

const loadingAnimation = ref(false);


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
const generateRandomString = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';
  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }
  return randomString;
}


const condominiosRef = collection(db, "condominios");

const validateFields = () => {
  if (!name.value || !email.value || !password.value || !cPassword.value || !type.value) {
    notyf.error("Por favor, completa todos los campos.");
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
    invitationId.value = generateRandomString();
    const condominioSnapshot = await getDocs(condominiosRef);
    const condominios = condominioSnapshot.docs.map((doc) => doc.data());

    if (condominios.some(condominio => condominio.invitationId === invitationId.value)) {
      notyf.error("Error al generar el ID de invitación. Inténtelo de nuevo.");
      loadingAnimation.value = false;
      return;
    }

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
        title: "Bienvenidos",
        content: "Este es el primer anuncio de tu condominio.",
        author: user.displayName,
        date: new Date(),
        isUrgent: false,
        fromAdmin: false
      });

      await updateDoc(announcementDoc, { announcementId: announcementDoc.id });

      const commentDoc = await addDoc(comentariosRef, {
        announcement: "Primer comentario generado automáticamente",
        category: "Inquilinos",
        date: Timestamp.now(),
        author: user.displayName,
        isUrgent: false,
        fromAdmin: false
      });

      await updateDoc(commentDoc, { documentId: commentDoc.id });

      const surveyToFbase = await addDoc(surveysCollectionRef, {
        title: 'Encuesta de prueba',
        description: 'Esta es una encuesta de prueba, sus inquilinos podrán votar en ella.',
        options: ['Opción 1', 'Opción 2', 'Opción 3'],
        createdBy: user.uid,
        creationDate: Timestamp.now()
      });

      await updateDoc(surveyToFbase, { surveyDocId: surveyToFbase.id });

      notyf.success({
        message: "Registro exitoso. Por favor, verifica tu correo electrónico.",
        duration: 7000
      });
    }
  } catch (error) {
    console.error(error);
    notyf.error((error as Error).message);
  } finally {
    loadingAnimation.value = false;
  }
};

const handleCreationOwner = async () => {
  try {
    if (!validateFields()) return;

    loadingAnimation.value = true;

    // Verificar que el código de invitación existe
    const queryAdminCollectionId = query(condominiosRef, where('invitationId', '==', invId.value.trim()));
    const snapshot = await getDocs(queryAdminCollectionId);

    if (snapshot.empty) {
      notyf.error("Código de invitación no encontrado.");
      loadingAnimation.value = false;
      return;
    }

    // Código de invitación válido, procedemos a crear el usuario
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
    const user = userCredential.user;

    if (user) {
      await updateProfile(user, { displayName: `${type.value} ${name.value}` });
      await sendEmailVerification(user);
      // Agregar al usuario a la subcolección de usuarios
      const usersGeneralCollectionRef = collection(db, 'usersGeneral');
      const usersGeneralDocRef = await addDoc(usersGeneralCollectionRef, {
        deptNumber: departmentNumber.value,
        creationDate: Timestamp.now(),
        userUid: user.uid,
        asociatedTo: snapshot.docs[0].data().createdBy,
        invitationCode: snapshot.docs[0].data().invitationId,
        asociatedToCondominiumId: snapshot.docs[0].data().condominiumId,
      })
      // Agregar al usuario a la subcolección correspondiente
      for (const doc of snapshot.docs) {
        const usersSubcollectionRef = collection(db, `condominios/${doc.id}/usuarios`);
        const userDocRef = await addDoc(usersSubcollectionRef, {
          name: name.value,
          deptNumber: departmentNumber.value,
          creationDate: Timestamp.now(),
          isBlocked: false,
          blockedReason: '',
          allowComments: true,
          userUid: user.uid,
          associatedTo: doc.data().createdBy
        });
        await updateDoc(userDocRef, { docId: userDocRef.id });
        await updateDoc(usersGeneralDocRef, {
          userDataId: userDocRef.id
        })
      }
      notyf.success({
        message: "Registro exitoso. Por favor, verifica tu correo electrónico.",
        duration: 7000
      });
    }
  } catch (error) {
    console.error(error);
    notyf.error((error as Error).message);
  } finally {
    loadingAnimation.value = false;
  }
};


const logUser = (type: string) => {
  switch (type.toLowerCase()) {
    case 'administrador':
      handleCreationAdmin();
      break;
    case 'propietario':
      handleCreationOwner();
      break;
    default:
      break;
  }
}

</script>

<style scoped></style>
