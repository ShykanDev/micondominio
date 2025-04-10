<template>
  <section class="flex flex-col w-full animate-fade-left max-h-[93dvh]">
      <!-- Header -->
      <div class="w-full shadow-lg header">
    <div class="w-full bg-gradient-to-r to-white shadow-xl from-slate-50 via-slate-500">
      <div class="flex justify-center items-center p-1 w-full rounded-t-2xl bg-slate-100">


        <!-- Perfil -->
        <div class="flex gap-4 justify-center items-center">
          <span class="text-3xl text-sky-400">👤</span>
          <article class="flex flex-col items-center">
            <h2 class="text-sm font-semibold leading-tight text-gray-600 md:text-lg">{{ name }}</h2>
          </article>
        </div>
      </div>
    </div>
  </div>

      <!-- Message Area -->
      <div ref="messagesElement" class="overflow-y-auto flex-1 gap-3 p-0 pt-4 pb-28 min-h-[80dvh] space-y-5 w-full bg-slate-100 max-h-dvh message-area">
          <div v-for="(message, index) in messages.sort((a: IMessage, b: IMessage) => a.creationDate - b.creationDate)"
               :key="index"
               class="flex"
               :class="{'justify-end' : message.sender == sysVals().getUserUid, 'justify-start' : message.sender != sysVals().getUserUid}">

              <ChatCard :message="message" />
          </div>

      </div>

      <!-- Message Input -->
      <div class="fixed bottom-0 w-full border-t border-gray-200">
          <div v-if="currentImage" class="relative p-4 backdrop-blur-sm min-w-80 min-h-40">
              <button @click="cancelImage" class="flex absolute top-2 right-2 gap-2 items-center p-2 font-semibold text-white bg-blue-800 rounded-xl border-2 border-blue-900 ring-1 ring-rose-50 cancel-image-btn font-poppins hover:text-slate-100">
                  Cancelar <span class="w-6 h-6">×</span>
              </button>
              <img v-if="currentImage" :src="currentImage" alt="Selected Image"
                   class="object-cover rounded-md border-2 border-sky-700 border-dashed max-w-52" />
          </div>

          <div class="px-4 py-3 bg-white">
              <div class="flex gap-3 items-center">
                  <div class="flex gap-3 items-center">
                      <article class="flex items-center">
                          <span class="w-6 h-6 cursor-pointer image-icon" @click="triggerFileInput">📷</span>
                          <input ref="fileInputRef"
                              type="file"
                              accept="image/*"
                              @change="handleFileChange"
                              class="hidden"
                              id="fileInput"
                          />
                      </article>
                  </div>

                  <input v-model="message" @keypress.enter="sendMessage" placeholder="Escribe un mensaje..."
                      class="flex-1 px-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-sky-300" />

                  <button class="p-2 text-sky-500 transition-colors hover:text-sky-600" @click="sendMessage">
                      <span class="w-6 h-6 send-icon" :class="{ 'text-gray-600': !message && !currentImage }">✉️</span>
                  </button>
              </div>
          </div>
      </div>
  </section>
</template>

<script lang="ts" setup>
import { sysVals } from '@/stores/sysVals';
import { addDoc, collection, getDocs, getFirestore, onSnapshot, orderBy, Timestamp, where } from 'firebase/firestore';
import { nextTick, onMounted, onUnmounted, ref } from 'vue';
import IMessage from '@/interfaces/IMessage';

import { Notyf } from 'notyf';
import { query } from 'firebase/database';
import ChatCard from './chat/chatCard.vue';

const notyf = new Notyf({
  duration: 4000,
  position: {
    x: 'left',
    y: 'top'
  },
  ripple: true
});

const messagesElement = ref<HTMLElement | null>(null);

const scrollToBottom = async () => {
await nextTick();
if (messagesElement.value) {
  messagesElement.value.scrollTo({
    top: messagesElement.value.scrollHeight,
    behavior: 'smooth'
  });
}
};

const props = defineProps({
  name: {
    default: 'Administrador'
  },
  receiver: {
    default: sysVals().getUserUid
  }
})

const currentImage = ref<string | null>(null);

const message = ref('');


const cancelImage = () => {
  currentImage.value = null;
};

const triggerFileInput = () => {
  const fileInput = document.getElementById('fileInput') as HTMLInputElement;
  if (fileInput) {
    fileInput.click();
  }
};
const selectedFile = ref();
const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
   selectedFile.value = target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target && e.target.result) {
        currentImage.value = e.target.result as string;
      }
    };
    reader.readAsDataURL(selectedFile.value);
  }
};

const imageUrl = ref<string | null>(null);

//Firebase utils
const db = getFirestore();
const userChatCollection = collection(db, `condominios/${sysVals().getAdminDocId}/chats/${props.receiver}/messages/`);


const uploadImageToFreeImageHost = async (imageFile) => {
   sysVals().setIsLoadingComponent(false);

   const formData = new FormData();
   formData.append('image', imageFile); // The image you want to upload
   formData.append('key', 'c1c5eb1a375c6b1069d7f5c0622751be');

   try {
     const response = await fetch('https://api.imgbb.com/1/upload', {
       method: 'POST',
       body: formData,
     });

     const data = await response.json();
     if (data.success) {
       console.log('Image uploaded successfully:', data.data.url); // Image URL
       // You can save the image URL or do something with it here
       return data.data.url;
     } else {
       console.error('Error uploading image:', data.error.message);
       notyf.error('Error al subir la imagen');
     }
   } catch (error) {
     console.error('Error during upload:', error);
     notyf.error('Error al subir la imagen');
   } finally {
     sysVals().setIsLoadingComponent(false); // Stop the loading spinner
   }
 };

const sendMessage = async () => {
  try {
    // Validar que haya al menos un mensaje o una imagen
  if(!message.value && !currentImage.value) return;

  let imageUrl = '';
  if (selectedFile.value) {
    imageUrl = await uploadImageToFreeImageHost(selectedFile.value);

    if (!imageUrl) {
      sysVals().setIsLoadingComponent(false);
      notyf.error('Error al subir la imagen.');
      return;
    }
  }
    await addDoc(userChatCollection, {
      message: message.value || '',  // Si no hay mensaje, guardar string vacío
      sender: sysVals().getUserUid,
      toCondominiumId: sysVals().getCondominiumId,
      creationDate: Timestamp.now(),
      imgUrl: imageUrl
    })
  } catch (error) {
    notyf.error('Error al enviar el mensaje' + error);
  }
}

const chatHistoryCollection = collection(db,  `condominios/${sysVals().getAdminDocId}/chats/${props.receiver}/messages/`);


  const unsub = onSnapshot(chatHistoryCollection, (doc) => {
    console.log('Getting messages');
    messages.value = [];
    doc.forEach(e => {
        console.log(e.data());
        messages.value.unshift(e.data() as IMessage);
    })
    scrollToBottom();
    console.log(messages.value);

})


onMounted(()=> {
  console.log(sysVals().getAdminDocId);
  console.log(sysVals().getCondominiumId);


})
onUnmounted(()=> {
    unsub();
    scrollToBottom();
})

const messages = ref<IMessage[]>([]);

</script>

<style scoped>
.header {

position: sticky;
top: 0;
z-index: 100;
}

.message-area {
overflow-y: auto;
height: calc(100vh - 200px);
}

.emoji-picker-overlay {
z-index: 1000;
}

.cancel-image-btn {
z-index: 1001;
}

/* Iconos básicos usando texto */
.back-icon, .profile-icon, .image-icon, .send-icon {
font-family: Arial, sans-serif;
font-weight: bold;
}
</style>