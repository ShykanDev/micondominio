<template>
   <div class="w-full max-w-md p-6 rounded-lg shadow-lg hover:border-[1px] hover:border-sky-700 bg-slate-50">
        <div class="flex items-center mb-4">
            <i class="mr-3 text-3xl text-gray-500 fas fa-user-circle"></i>
            <div>
                <h2 class="text-lg font-semibold">
                    {{ filteredUserName }}
                </h2>
                <p class="text-sm text-gray-500">
                  <small>Categoría: {{ userType }}</small>
                </p>
                <p class="text-sm text-gray-500">
                  <small>Usuario: {{ userName.includes("propietario") ? "Propietario" : "Administrador" }}</small>
                </p>
            </div>
        </div>
        <p class="mb-4 text-gray-700">
            {{ comment }}
        </p>
        <div class="flex items-center justify-between min-w-60">
            <div class="flex items-center w-full text-gray-500 ">
                <i class="mr-1 fas fa-calendar-alt"></i>
                <span class="text-xs">{{ date }}</span>
            </div>
            <div v-if="sysVals().getIsAdmin" class="flex justify-end w-full">
                <button @click="deleteComment" class="flex items-center text-red-500 hover:text-red-700">
                    <i class="mr-1 fas fa-trash"></i>
                    Eliminar
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { sysVals } from '@/stores/sysVals';
import { deleteDoc, doc, getFirestore } from 'firebase/firestore';
import { computed } from 'vue';


const props = defineProps({
  userName: {
    type: String,
    required: true
  },
  userType: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  userImage: {
    type: String,
    required: false
  },
  date: {
    type: String,
    default: () => new Date().toLocaleDateString()
  },
  commentId: {
    type: String,
    required: true
  }
})
const filteredUserName = computed(() =>
    (props.userName.includes('propietario')) ? props.userName.replace(/propietario/gi,'').trim() : props.userName.replace(/administrador/gi,'').trim()
);


const deleteComment = async () => {
  sysVals().setIsLoadingComponent(true)
  try {
    const db = getFirestore();
    const commentRef = doc(db, `condominios/${sysVals().getCondominiumId}/comments/${props.commentId}`);
    console.log('Comentario a eliminar:', commentRef);

    await deleteDoc(commentRef);
    console.log('Comentario eliminado con éxito');
    sysVals().setIsLoadingComponent(false)

  } catch (error) {
    console.error('Error al eliminar el comentario:', error);
    sysVals().setIsLoadingComponent(false)
  }
}
</script>
