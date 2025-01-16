<template>
     <div class="w-full max-w-md p-6 rounded-lg shadow-lg hover:border-[1px] hover:border-slate-700 bg-slate-50">
        <div class="flex items-center mb-4">
            <i class="mr-3 text-3xl text-gray-500 fas fa-user-circle"></i>
            <div class="font-poppins">
                <h2 class="text-lg font-semibold">
                    {{ filteredUserName }}
                </h2>
                <p class="text-sm text-gray-500">
                  <small>Categoría: {{ userType }}</small>
                </p>
                <p class="text-sm text-gray-500">
                  <small>Usuario: {{ userType.includes("propietario") ? "Propietario" : "Administrador" }}</small>
                </p>
            </div>
        </div>
        <p class="mb-4 text-gray-700">
            {{ comment }}
        </p>
        <div class="flex items-center justify-between min-w-60">
            <div class="flex items-center w-full text-gray-500 ">
                <i class="mr-1 fas fa-calendar-alt"></i>
                <span class="text-xs">Fecha: {{ formattedDate }}</span>
            </div>
            <div class="flex items-center justify-end mt-4 space-x-4 ">
              <button @click="ownerVals().setShowPopUpAnswerComment(true, filteredUserName)" class="px-1 py-[3px] font-signika text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                Responder
              </button>
              <button @click="ownerVals().setShowReportComment(true)" class="text-gray-500 hover:text-rose-700">
               <i class="fas fa-flag">
               </i>
              </button>
        </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ownerVals } from '@/stores/ownerVals';
import { computed } from 'vue';

const props = defineProps({
  userName: {
    type: String,
    required: false,
    default: "Daniel Martinez"
  },
  userType: {
    type: String,
    required: false,
    default: "propietario"
  },
  comment: {
    type: String,
    required: false,
    default: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  date: {
    type: Object,
    required:true
  },
  fromAdmin:{
    type:Boolean,
    default:false
  },
  isUrgent:{
    type:Boolean,
    default:false
  }
})
const filteredUserName = computed(() =>
    (props.userName == 'administrador') ? props.userName.replace(/propietario/gi, '').trim() : props.userName.replace(/administrador/gi, '')
);
const formattedDate = computed(() => {
    const date = props.date.toDate();
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString(); // Formatear fecha y hora
  }
);
</script>

<style scoped>

</style>
