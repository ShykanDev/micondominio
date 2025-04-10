<template>
  <div
    :class="[
      props.message.sender !== sysVals().getUserUid
        ? 'bg-slate-200 text-slate-800 animate-fade-right rounded-bl-3xl'
        : 'bg-slate-800 text-white animate-fade-left rounded-br-3xl'
    ]"
    class="p-4 rounded-xl shadow-md max-w-[80%] w-fit relative flex flex-col gap-2"
  >
    <!-- Imagen (si existe) -->
    <div v-if="props.message.imgUrl" class="relative group">
      <img
        :src="props.message.imgUrl"
        class="max-w-[350px] h-auto rounded-2xl shadow-sm border border-slate-300"
        @load="imageLoaded = true"
      />
      <button
        @click="downloadImage"
        class="absolute right-2 bottom-2 p-1.5 text-white bg-white rounded-full shadow-md transition duration-200 hover:bg-sky-200"
      >
        ⬇️
      </button>
    </div>

    <!-- Texto del mensaje -->
    <p class="text-base leading-relaxed whitespace-pre-wrap break-words">
      {{ props.message.message }}
    </p>

    <!-- Fecha -->
    <p class="text-xs text-right opacity-70">
      {{ formattedDate(props.message.creationDate) }}
    </p>
  </div>
</template>


<script lang="ts" setup>

import IMessage from '@/interfaces/IMessage';
import { sysVals } from '@/stores/sysVals';
import { computed, ref } from 'vue';

//Value for image that will be displayed if true (this will toggle the animation loading when an image its not fully loaded)
const imageLoaded = ref(false);
const messageHasImage = computed(() => !!props.message.imgUrl);

const props = defineProps({
    message: {
        type: Object as () => IMessage,
        required: true
    }
});

const formattedDate =  (creationDate:string) => {
  if (typeof creationDate === 'object' && creationDate.toDate) {
    // Si es un timestamp de Firebase
    const date = creationDate.toDate();
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString(); // Formatear fecha y hora
  }
  return creationDate; // Si es un string, devolver tal cual
}

// function to open the image when user clicks on it

import { api as viewerApi } from 'v-viewer';


const images = [props.message.imgUrl || ''];

const show = () => {
    viewerApi({ images });
};

const downloadImage = async () => {
    if (!props.message.imgUrl) return;

    try {
        const response = await fetch(props.message.imgUrl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `image-${Date.now()}.jpg`; // Nombre único para la imagen
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    } catch (error) {
        console.error('Error al descargar la imagen:', error);
    }
};
</script>

<style scoped>
</style>