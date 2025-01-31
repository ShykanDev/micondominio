<template>
<div :class="['w-full relative max-w-md p-6 rounded-xl transition-all duration-300 ease-out shadow-lg hover:shadow-xl transform hover:-translate-y-1',
    userName.includes('administrador') ? 'bg-gradient-to-br from-slate-800 to-slate-900 text-white border border-slate-700/50' : 'bg-white border border-gray-100']">

    <div class="flex items-start mb-4">
        <i :class="['mr-3 text-3xl transition-colors duration-200',
            userName.includes('administrador') ? 'text-sky-400' : 'text-gray-400/80',
            'fas fa-user-circle']"></i>

        <div class="font-poppins flex-1">
            <div class="flex justify-between items-start">
                <div>
                    <h2 class="text-lg font-semibold tracking-tight">
                        {{ filteredUserName }}
                    </h2>
                    <div class="flex gap-2 mt-1">
                        <span :class="['text-xs px-2 py-1 rounded-full font-medium',
                            userName.includes('administrador') ? 'bg-sky-900/50 text-sky-300' : 'bg-gray-100 text-gray-600']">
                            {{ userType }}
                        </span>
                    </div>
                </div>
                <i v-if="userName.includes('administrador')"
                   class="text-sky-400 top-2 right-3 fas fa-user-shield animate-pulse"></i>
            </div>
        </div>
    </div>

    <div :class="['mb-5 text-sm leading-relaxed font-poppins',
        userName.includes('administrador') ? 'text-gray-200' : 'text-gray-600']"
        v-html="responseToFormatted">
    </div>

    <div class="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-dashed"
        :class="userName.includes('administrador') ? 'border-slate-700' : 'border-gray-100'">

        <div class="flex items-center text-xs space-x-2"
            :class="userName.includes('administrador') ? 'text-slate-400' : 'text-gray-400'">
            <i class="fas fa-calendar-alt text-sm"></i>
            <span>{{ formattedDate }}</span>
        </div>

        <div class="flex items-center space-x-3">
            <button @click="ownerVals().setShowPopUpAnswerComment(true, filteredUserName)"
                    class="px-3 py-1.5 flex items-center rounded-lg font-medium transition-all duration-200
                           hover:bg-sky-500 bg-sky-400/90 text-white shadow-sm hover:shadow-sky-200/50">
                <i class="fas fa-reply mr-2 text-sm"></i>
                Responder
            </button>

            <button @click="ownerVals().setShowReportComment(true)"
                    :class="['p-2 rounded-lg hover:bg-rose-50/50 transition-colors',
                             userName.includes('administrador') ? 'hover:text-rose-300' : 'hover:text-rose-500']">
                <i class="fas fa-flag text-sm"></i>
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
    required: true
  },
  fromAdmin: {
    type: Boolean,
    default: false
  },
  isUrgent: {
    type: Boolean,
    default: false
  }
})
const filteredUserName = computed(() =>
  (props.userName.includes('administrado')) ? props.userName.replace(/administrador/gi, '').trim() : props.userName.replace(/propietario/gi, '').trim()
);
const formattedDate = computed(() => {
  const date = props.date.toDate();
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString(); // Formatear fecha y hora
}
);

const responseToFormatted = computed(() => {
  return props.comment.replace(/^(Respuesta a [^:]+:)/, (match) => {
    console.log("Match:", match); // "Respuesta a Juan:"
    return `<span class='text-sm italic font-semibold text-sky-800 font-poppins '>${match}</span>`;
  })
})
</script>

<style scoped></style>
