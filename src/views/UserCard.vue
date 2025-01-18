<template>
  <div class="w-full max-w-xs p-6 rounded-lg shadow-md font-poppins bg-slate-50 animate-fade">
    <div class="flex items-center mb-4">
      <i class="text-4xl text-gray-500 fas fa-user-circle"></i>
      <div class="ml-4">
        <h2 class="font-medium text-gray-600 text-md">
          <i class="fas fa-user"></i> Nombre del Usuario: <span class="text-sky-700">{{ name }}</span>
        </h2>
        <p class="text-gray-800">
          <i class="fas fa-building"></i> Departamento: <span class="text-sky-700">{{ deptNumber }}</span>
        </p>
        <p class="text-gray-800">
          <i class="fas fa-calendar-alt"></i> Fecha que se unió el usuario: <span class="text-sky-700">{{ formattedDate
            }}</span>
        </p>
      </div>
    </div>

    <div class="flex flex-col items-start justify-between">
      <!-- Comentarios -->
      <div class="flex space-x-2">
        <p><i class="fas fa-comments"></i> Comentarios:</p>
        <p class="px-1 text-white rounded" :class="allowComments ? 'bg-green-600' : 'bg-red-600'">
          {{ allowComments ? 'Habilitados' : 'Deshabilitados' }}
        </p>
      </div>

      <!-- Descripción adicional -->
      <div class="flex items-center mt-2 space-x-2">
        <i class="text-lg text-gray-500 fas fa-info-circle"></i>
        <p>
          {{ allowComments ? 'Este usuario puede comentar libremente' : 'Este usuario no puede comentar.' }}
        </p>
      </div>

      <!-- Estado del usuario -->
      <div class="flex my-3 space-x-2">
        <p><i class="fas fa-user-shield"></i> Estado: </p>
        <p class="px-1 text-white rounded " :class="!isBlocked ? 'bg-green-600' : 'bg-red-600'">
          {{ !isBlocked ? 'Desbloqueado' : 'Bloqueado' }} <span
            class="w-5 h-5  animate-duration-[5s] animate-ping rounded-full font-signika">•</span>
        </p>
      </div>
    </div>

    <!-- Botón de bloquear/desbloquear -->
    <button @click="handleBlockUser" class="px-4 py-2 mt-2 text-white rounded-lg focus:outline-none focus:ring-2"
      :class="!isBlocked ? 'bg-red-800 hover:bg-red-700 focus:ring-red-500' : 'bg-green-500 hover:bg-green-700 focus:ring-green-500'">
      {{ !isBlocked ? 'Bloquear' : 'Desbloquear' }}
    </button>

    <!-- Botón de habilitar/deshabilitar comentarios -->
    <button @click="handleBlock('commentUncomment')"
      class="px-4 py-2 mt-2 text-sm text-white rounded-lg focus:outline-none focus:ring-2"
      :class="!allowComments ? 'bg-yellow-600 hover:bg-red-700 focus:ring-red-500' : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'">
      {{ allowComments ? 'Deshabilitar Comentarios' : 'Habilitar Comentarios' }}
    </button>
    <button @click="handleRegenCode"
      class="px-4 py-2 mt-2 text-sm text-white rounded-lg bg-slate-600 hover:bg-blue-700 focus:ring-blue-500 focus:outline-none focus:ring-2">
      <i class="mr-2 fas fa-redo"></i>
      Renovar Acceso
    </button>

    <small class="flex items-start mt-2 text-gray-500">
      <i class="mr-2 mt-[2px] fas fa-info-circle"></i>
      Este botón actualiza el código de invitación para el usuario. Úselo solo si el usuario no puede acceder con su
      código anterior,
      ya que este código reemplazará el existente.
    </small>


    <!-- Descripción adicional -->
    <div v-if="isBlocked" class="flex items-center mt-2 space-x-2">
      <p class="text-xs">
        <i class="text-lg text-gray-500 fas fa-info-circle"></i>
        {{ isBlocked ? `${comment}` : '' }}
      </p>
    </div>
  </div>
</template>


<script lang="ts" setup>
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; // for React, Vue and Svelte
// Create an instance of Notyf
const notyf = new Notyf({
  duration: 4000,
  dismissible: true,
  position: {
    x: 'left',
    y: 'top'
  },
  ripple: true,
});

import { sysVals } from '@/stores/sysVals';
import { collection, doc, getDoc, getDocs, getFirestore, query, updateDoc, where } from 'firebase/firestore';
import { computed, ref } from 'vue';

const props = defineProps({
  name: {
    type: String,
    default: "Daniel Martinez",
  },
  deptNumber: {
    type: String,
    default: "22a",
  },
  creationDate: {
    type: Object,
  },
  allowComments: {
    type: Boolean,
    default: true,
  },
  associatedTo: {
    type: String,
    default: "",
  },
  blockedReason: {
    type: String,
    default: "",
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  userUid: {
    type: String,
    required: true,
  },
  docId: {
    type: String,
    required: true
  }
});

const comment = ref('Este usuario está bloqueado y no puede participar, su cuenta ha sido bloqueada en el sistema para su condominio, el usuario aún puede comentar en la pagina administracioncondominio.com, pero no podrá hacerlo en su condominio.')

const formattedDate = computed(() => {
  if (props.creationDate) {
    const date = props.creationDate.toDate();
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  }
  return props.creationDate;
});

// function to block or unblock the user and

const db = getFirestore();
const handleBlock = async (type: string) => {
  sysVals().setIsLoadingComponent(true)

  const condominiumId = sysVals().getCondominiumId;
  if (!condominiumId) {
    notyf.error('ID del condominio no encontrado');
    sysVals().setIsLoadingComponent(false);
    return;
  }
  const userDoc = doc(db, 'condominios', condominiumId, 'usuarios', props.docId) // reference to the user docId
  try {
    await updateDoc(userDoc, {
      allowComments: !props.allowComments
    })
    sysVals().setIsLoadingComponent(false)
    notyf.success('Operación realizada')
  }
  catch (error) {
    console.log(error);
    sysVals().setIsLoadingComponent(false)
    notyf.error('Error en la operacion, intentelo de nuevo')
  } finally {
    sysVals().setIsLoadingComponent(false)
  }
}

const handleBlockUser = async () => {
  sysVals().setIsLoadingComponent(true)
  try {
    const userInUsersRef = collection(db, 'usersGeneral')
    const qEqualsOwner = query(userInUsersRef, where('userUid', '==', props.userUid));
    const querySnapshot = await getDocs(qEqualsOwner);
    if (querySnapshot.empty) {
      notyf.error('Usuario no encontrado');
      sysVals().setIsLoadingComponent(false);
      return
    } else {
      console.log('Valores:');
      console.log(querySnapshot.docs[0].data());
      const userDoc = doc(db, 'usersGeneral', querySnapshot.docs[0].id) // reference to the user docId
      await updateDoc(userDoc, {
        isBlocked: !querySnapshot.docs[0].data().isBlocked,
      })
      const userDoc2 = doc(db, 'condominios', sysVals().getCondominiumId, 'usuarios', props.docId) // reference to the user docId
      await updateDoc(userDoc2, {
        isBlocked: !querySnapshot.docs[0].data().isBlocked,
      })

      sysVals().setIsLoadingComponent(false)
      notyf.success('Operación realizada')
    }
  } catch (error) {
    console.log(error);

  }
}

// function to regenerate the code of the user
const handleRegenCode = async () => {
  sysVals().setIsLoadingComponent(true);
  try {
    const userDoc = collection(db, 'usersGeneral') // reference to the user docId
    const qGetUser = query(userDoc, where('userUid', '==', props.userUid));
    const querySnapshot = await getDocs(qGetUser);
    if (querySnapshot.empty) {
      notyf.error('Usuario no encontrado');
      sysVals().setIsLoadingComponent(false);
      return
    } else {
      const userDoc = doc(db, 'usersGeneral', querySnapshot.docs[0].id) // reference to the user docId
      await updateDoc(userDoc, {
        invitationCode: sysVals().getInvitationCode,
      })
      notyf.success('Operación realizada')
      sysVals().setIsLoadingComponent(false);
    }

  } catch (error) {
    console.log(error);
    sysVals().setIsLoadingComponent(false);
    notyf.error('Error en la operacion, intentelo de nuevo')
  }
}

</script>

<style scoped>
/* Puedes añadir estilos adicionales si es necesario */
</style>
