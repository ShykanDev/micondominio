<template>
  <div class="w-full max-w-xs p-6 bg-white rounded-lg shadow-md font-poppins">
    <div class="flex items-center mb-4">
      <i class="text-4xl text-gray-500 fas fa-user-circle"></i>
      <div class="ml-4">
        <h2 class="font-medium text-gray-600 text-md">
          Nombre del Usuario: <span class="text-sky-700">{{ name }}</span>
        </h2>
        <p class="text-gray-800">
          Departamento: <span class="text-sky-700">{{ deptNumber }}</span>
        </p>
        <p class="text-gray-800">
          Fecha de Creación: <span class="text-sky-700">{{ formattedDate }}</span>
        </p>
      </div>
    </div>

    <div class="flex flex-col items-start justify-between">
      <!-- Comentarios -->
      <div class="flex space-x-2">
        <p>Comentarios:</p>
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
        <p>Estado: </p>
        <p class="px-1 text-white rounded animate-pulse animate-duration-[5s]"
          :class="!isBlocked ? 'bg-green-600' : 'bg-red-600'">
          {{ !isBlocked ? 'Desbloaueado' : 'Bloqueado' }}
        </p>
      </div>
    </div>

    <!-- Botón de bloquear/desbloquear -->
    <button @click="handleBlock('blockUnblock')" class="px-4 py-2 mt-2 text-white rounded-lg focus:outline-none focus:ring-2"
      :class="!isBlocked ? 'bg-red-500 hover:bg-red-700 focus:ring-red-500' : 'bg-green-500 hover:bg-green-700 focus:ring-green-500'">
      {{ !isBlocked ? 'Bloquear' : 'Desbloquear' }}
    </button>

    <!-- Botón de habilitar/deshabilitar comentarios -->
    <button @click="handleBlock('commentUncomment')" class="px-4 py-2 mt-2 text-sm text-white rounded-lg focus:outline-none focus:ring-2"
      :class="!allowComments ? 'bg-yellow-600 hover:bg-red-700 focus:ring-red-500' : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'">
      {{ allowComments ? 'Deshabilitar Comentarios' : 'Habilitar Comentarios' }}
    </button>
    <!-- Descripción adicional -->
    <div  v-if="isBlocked" class="flex items-center mt-2 space-x-2">
      <p class="text-xs">
        <i class="text-lg text-gray-500 fas fa-info-circle"></i>
        {{ isBlocked ? 'Este usuario está bloqueado y no puede participar, su cuenta ha sido bloqueada en el sistema para su condominio, el usuario aún puede comentar en la pagina administracioncondominio.com, pero no podrá hacerlo en su condominio.' : '' }}
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
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';
import { computed } from 'vue';

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
    switch (type) {
      case 'blockUnblock':
        await updateDoc(userDoc, {
          isBlocked: !props.isBlocked
        })
        notyf.success('Operación realizada')
        sysVals().setIsLoadingComponent(false)
        break;
      case 'commentUncomment':
        await updateDoc(userDoc, {
          allowComments: !props.allowComments
        })
        sysVals().setIsLoadingComponent(false)
        notyf.success('Operación realizada')
        break;
      default:
        sysVals().setIsLoadingComponent(false)
        break;
    }
  } catch (error) {
    console.log(error);
  sysVals().setIsLoadingComponent(false)
    notyf.error('Error en la operacion, intentelo de nuevo')
  }
}
</script>

<style scoped>
/* Puedes añadir estilos adicionales si es necesario */
</style>
