<template>
  <MainLayout>
    <template #main>
      <div v-if="showPopUpRenCode"
        class="fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center bg-black bg-opacity-50 animate-fade animate-duration-500">
        <div class="w-full max-w-sm p-6 bg-white rounded-lg shadow-md font-poppins animate-jump">
          <h2 class="mb-4 text-xl font-semibold text-gray-800">¿Desea regenerar el código?</h2>
          <div class="flex items-center mb-4">
            <i class="text-4xl text-yellow-500 fas fa-exclamation-triangle"></i>
            <p class="ml-4 text-gray-600">
              Esto hará que el código anterior deje de funcionar, sus propietarios no podrán acceder con el anterior
              código, esto es irreversible.
            </p>
          </div>
          <div class="flex justify-between">
            <button @click="handleShowPopupRenCode"
              class="px-4 py-2 text-white rounded bg-sky-800 hover:bg-sky-900 focus:outline-none focus:ring-2 focus:ring-sky-800 focus:ring-opacity-50">
              Cancelar
            </button>
            <button @click="handleRegenCodeV2"
              class="px-4 py-2 text-white rounded bg-rose-500 hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-opacity-50">
              <i class="mr-2 fas fa-sync"></i>Regenerar
            </button>
          </div>
        </div>
      </div>
      <div class="flex min-h-screen bg-gray-100 font-roboto">
        <!-- Sidebar -->
        <div id="sidebar" :class="['w-64 bg-slate-900 text-white', isSidebarHidden ? 'hidden' : '']"
          class="animate-fade-right">
          <div class="p-4 text-2xl font-bold text-center border-b border-gray-700">
            Admin Dashboard
          </div>
          <nav class="mt-4 text-base font-poppins">
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
              <li @click="changeComponent(CommentsComponent)" class="p-4 hover:bg-gray-700">
                <a href="#" class="flex items-center">
                  <i class="mr-3 fas fa-comment"></i>
                  Comentarios
                </a>
              </li>
              <li @click="changeComponent(SurveysComponent)" class="p-4 hover:bg-gray-700">
                <a href="#" class="flex items-center">
                  <i class="mr-3 fas fa-poll"></i>
                  Encuestas
                </a>
              </li>
              <li @click="changeComponent(AnnouncementsComponent)" class="p-4 hover:bg-gray-700">
                <a href="#" class="flex items-center">
                  <i class="mr-3 fas fa-bullhorn"></i>
                  Anuncios
                </a>
              </li>
              <li @click="changeComponent(UsersComponent)" class="p-4 hover:bg-gray-700">
                <a href="#" class="flex items-center">
                  <i class="mr-3 fas fa-users"></i>
                  Usuarios
                </a>
              </li>
              <li @click="changeComponent(ReportsComponent)" class="p-4 hover:bg-gray-700">
                <a href="#" class="flex items-center">
                  <i class="mr-3 fas fa-exclamation"></i>
                  Reportes/Quejas
                </a>
              </li>
              <!-- <li @click="changeComponent(ComplaintComponent)" class="p-4 hover:bg-gray-700">
            <a href="#" class="flex items-center">
              <i class="mr-3 fas fa-angry "></i>
              Quejas
            </a>
          </li> -->
              <RouterLink :to="{ name: 'home' }" class="flex items-center p-4 hover:bg-gray-700">
                <i class="mr-3 fas fa-home"></i>
                Volver al Inicio
              </RouterLink>
              <p @click="handleLogout" class="flex items-center p-4 hover:bg-gray-700">
                <i class="mr-3 fas fa-sign-out-alt"></i>
                Cerrar Sesión
              </p>
              <li class="p-4 hover:bg-gray-700">
                <span class="flex items-center selection:bg-red-500">
                  <i class="mr-3 fas fa-code"></i>
                  Código de Invitación:
                </span>
                <div>
                  <!-- saying in spanish that the user can scan the qr code and the page will be loaded automatically with the information -->
                  <small class="text-xs italic text-slate-300"><i class="mr-3 fas fa-info"></i>Comparta este QR con sus propietarios para que puedan escanear el QR para
                    acceder a su organización.</small>
                </div>
                <div class="flex items-center justify-center p-1 bg-white">
                  <QrCode :value="qrVals().getLink" class="w-64 h-64"></QrCode>
                </div>
                <div class="flex flex-wrap justify-center my-2 font-poppins">
                  <span class="p-1 my-1 text-center text-black bg-white rounded-lg">{{ sysVals().getInvitationCode
                    }}</span>
                  <button @click="handleCopy" class="p-1 ml-2 text-white bg-blue-600 rounded-lg">Copiar Código</button>
                </div>
                <small class="text-xs italic text-slate-300"><i class="mr-3 fas fa-share"></i>Comparta este código con
                  sus propietarios para que puedan acceder a su organización.</small>
              </li>
              <li class="p-4 hover:bg-gray-700">
                <span class="flex items-center font-poppins selection:bg-red-500">
                  Regenerar Código de Invitación:
                </span>
                <div class="flex flex-wrap justify-center my-2">
                  <button @click="handleShowPopupRenCode"
                    class="flex items-center p-1 ml-2 space-x-1 bg-white rounded-lg text-sky-700 font-poppins">

                    Regenerar
                    <i class="ml-1 fas fa-sync"></i>

                  </button>
                </div>

                <small class="text-xs italic text-slate-300"><i class="mr-3 fas fa-info"></i>Regenerar el código
                  necesitará que usted comparta nuevamente su código de invitación con todos sus propietarios, el código
                  anterior dejará de funcionar y sus propietarios no podrán acceder usando el anterior código. </small>
              </li>

            </ul>
          </nav>
        </div>

        <!-- Main Content -->
        <div class="flex-1 p-2 animate-fade">
          <!-- Mobile Menu Button -->
          <div class="mb-4 md:hidden">
            <button @click="toggleMenu" class="p-2 text-white bg-gray-800 rounded">
              <i class="fas fa-bars"></i>
            </button>
          </div>
          <h1 class="mb-6 text-3xl font-semibold text-center font-poppins text-sky-700">Panel de Administración</h1>
          <div v-if="sysVals().getIsLoadingComponent"
            class="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-white/30">
            <LoadingDatabase></LoadingDatabase>
          </div>
          <div v-if="!sysVals().getIsLoadingComponent" class="">
            <!-- Example Cards -->
            <!-- place the dynamic component here -->
            <component :is="currentComponent" />
          </div>
        </div>
      </div>
    </template>
  </MainLayout>

</template>

<script setup lang="ts">
import copy from 'copy-text-to-clipboard';
import { sysVals } from '@/stores/sysVals';
import { defineAsyncComponent, ref, shallowRef } from 'vue';
import { RouterLink } from 'vue-router';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; // for React, Vue and Svelte
import MainLayout from '@/layouts/MainLayout.vue';
import LoadingDatabase from '@/components/animations/LoadingDatabase.vue';
import { collection, doc, getDocs, getFirestore, query, updateDoc, where } from 'firebase/firestore';
import { sys } from 'typescript';
import QrCode from '@/components/Qr/QrCode.vue';
import { qrVals } from '@/stores/qrVals';
import { getAuth, signOut } from 'firebase/auth';
import { getDoc } from 'firebase/firestore/lite';
import { v4 as uuidv4 } from 'uuid';



const isSidebarHidden = ref(false);
const showPopUpRenCode = ref(false);
const NotifsComponent = defineAsyncComponent(() => import('../components/admin/NotifsComponent.vue'));
const AnnouncementComponent = defineAsyncComponent(() => import('../components/admin/AnnouncementComponent.vue'));
const CommentsComponent = defineAsyncComponent(() => import('../components/admin/CommentsComponent.vue'));
const SurveysComponent = defineAsyncComponent(() => import('../components/admin/SurveysComponent.vue'));
const AnnouncementsComponent = defineAsyncComponent(() => import('../components/admin/AnnouncementsComponent.vue'));
const UsersComponent = defineAsyncComponent(() => import('../components/admin/UsersComponent.vue'));
const ReportsComponent = defineAsyncComponent(() => import('../components/admin/ReportsComponent.vue'));
const ComplaintComponent = defineAsyncComponent(() => import('../components/admin/ComplaintComponent.vue'));


const currentComponent = shallowRef(AnnouncementComponent);

const changeComponent = (componentName: any) => {
  currentComponent.value = componentName;
}

function toggleMenu() {
  isSidebarHidden.value = !isSidebarHidden.value;
}

const notyf = new Notyf({
  duration: 3000,
  position: {
    x: 'center',
    y: 'top',
  },
  dismissible: true
})


const handleCopy = () => {
  notyf.success({
    message: 'Código copiado',
    // setting color to blue
    background: '#0431d1',
  });
  copy(sysVals().getInvitationCode);
}


const handleShowPopupRenCode = () => showPopUpRenCode.value = !showPopUpRenCode.value;

const db = getFirestore();

// const generateRandomString = () => {
//   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//   let randomString = '';
//   for (let i = 0; i < 8; i++) {
//     const randomIndex = Math.floor(Math.random() * characters.length);
//     randomString += characters.charAt(randomIndex);
//   }
//   return randomString;
// }

// function to regenerate the code
// const handleRegenCode = async () => {
//   showPopUpRenCode.value = false;
//   sysVals().setIsLoadingComponent(true)
//   const codeRef = collection(db, 'condominios')
//   const newInvitationCode = generateRandomString();
//   try {
//     //  verify that new code does not exist on firebase
//     // const invitationRef = doc(db,`'condominios', ${sysVals().getCondominiumId}`)
//     // we fetch the querry
//     const q = query(codeRef, where('invitationId', '==', newInvitationCode))
//     const querySnapshot = await getDocs(q)
//     if (querySnapshot.empty) {
//       const invitationRef = doc(db, 'condominios', sysVals().getCondominiumId)
//       await updateDoc(invitationRef, { invitationId: newInvitationCode })
//       // update local variable
//       qrVals().setLink(`https://mantenimientocondominio.com/register?tipoCuenta=propietario&codigoInvitacion=${newInvitationCode}`)
//       sysVals().setInvitationCode(newInvitationCode)
//       const usersGeneral = collection(db, 'usersGeneral')
//       const qUsersWithoutNewCode = query(usersGeneral, where('asociatedTo', '==', sysVals().getUserUid));
//       const querySnapshotUsers = await getDocs(qUsersWithoutNewCode)
//       if (!querySnapshotUsers.empty) {
//         querySnapshotUsers.forEach((doc) => {
//           console.log(doc.id, " => ", doc.data());
//           if (!doc.data().isBlocked) {
//             updateDoc(doc.ref, { invitationCode: newInvitationCode })
//             console.log(doc.id, " => ", doc.data());

//           }
//         })
//       }
//       // const qUsersWithoutNewCode = q
//       notyf.success('Código regenerado con exito')
//       sysVals().setIsLoadingComponent(false)
//       return
//     } else {
//       notyf.error('Error, intentelo de nuevo')
//       sysVals().setIsLoadingComponent(false)
//       return
//     }
//   } catch (error) {
//     notyf.error('Hubo un error regenerando el código')
//     sysVals().setIsLoadingComponent(false)
//     console.log(error);

//   }
// }


const handleRegenCodeV2 = async () => {
  showPopUpRenCode.value = false;
  sysVals().setIsLoadingComponent(true)
  try {
      const condominiumRef = collection(db, 'condominios');
      const qAdminCondominium = query(condominiumRef, where('createdBy', '==', sysVals().getUserUid))
      const querySnapshot = await getDocs(qAdminCondominium);
      const newInvitationCode = uuidv4();
      if(!querySnapshot.empty){
        querySnapshot.forEach(async doc => {
          console.log('Document before update:', doc.id, " => ", doc.data());
          const docToUpdate = doc.ref;
         await updateDoc(docToUpdate, {invitationId: newInvitationCode})
         sysVals().setInvitationCode(newInvitationCode)
          console.log('Document after update:', doc.id, " => ", doc.data());

          // updating now the users collection invitationId if is not blocked the user
          const usersGeneral = collection(db, 'usersGeneral');
          const qUsersWithoutNewCode = query(usersGeneral, where('asociatedTo', '==', sysVals().getUserUid), where('isBlocked', '==', false));
          const querySnapshotUsers = await getDocs(qUsersWithoutNewCode);
          if (!querySnapshotUsers.empty) {
            querySnapshotUsers.forEach((doc) => {
              console.log(doc.id, " Users info => ", doc.data());
              updateDoc(doc.ref, { invitationCode: newInvitationCode })
            })
          }
        })
      }
  sysVals().setIsLoadingComponent(false)
      notyf.success('Código regenerado con exito');
  } catch (error) {
    console.log(error);
  sysVals().setIsLoadingComponent(false)
    notyf.error('Hubo un error regenerando el código')
  }
}

const auth = getAuth();
const handleLogout = async() => {
  // reload window
  await signOut(auth)
  window.location.reload()
}
</script>

<style scoped>
.font-roboto {
  font-family: 'Roboto', sans-serif;
}
</style>
