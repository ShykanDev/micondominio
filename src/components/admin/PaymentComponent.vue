<template>
  <section class="hidden justify-center w-full">
    <div class="flex flex-col items-center w-10/12 min-h-[800px] rounded-xl p-2 bg-gradient-to-bl from-white via-slate-50 to-sky-200 shadow-md">
      <p class="text-3xl font-bold text-sky-800 font-poppins">Nuevo Pago de Mantenimiento</p>
      <div class="p-4 my-3 bg-gradient-to-br from-sky-600 to-sky-900 rounded-3xl">
      <v-icon name="la-file-invoice-dollar-solid" scale="2" class="text-white"></v-icon>
      </div>
      <section class="gap-3 px-4 w-full">
        <div class="flex flex-col justify-center mt-3 w-full">
          <article>
            <v-icon name="md-shorttext-round" class="text-sky-600" scale="1.6"/>
            <label for="title" class="mb-2 text-xl font-medium text-sky-700">Título</label>
          </article>
          <input type="text" id="title" class="px-3 py-2 my-2 w-full text-xl rounded-lg border font-poppins focus:outline-none focus:ring-2 focus:ring-blue-500" name="title" placeholder="Introduzca el título del pago" v-model="title">
        </div>

        <div class="flex flex-col justify-center mt-3 w-full">
          <article>
            <v-icon name="bi-text-paragraph" class="text-sky-600" scale="1.6"/>
            <label for="description" class="mb-2 text-xl font-medium text-sky-700">Descripción</label>
          </article>
          <input type="text" id="description" class="px-3 py-2 my-2 w-full text-xl rounded-lg border font-poppins focus:outline-none focus:ring-2 focus:ring-blue-500" name="description" placeholder="Introduzca la descripción del pago" v-model="description">
        </div>

        <div class="flex flex-col items-start mt-3">
          <article class="flex items-center">
            <v-icon name="ri-image-add-line" class="text-sky-600" scale="1.6"/>
            <label for="file" class="my-4 mb-2 text-xl font-medium text-sky-700">Imagen Adjunta</label>
          </article>
          <div class="relative">
            <input type="file" id="file" class="hidden" @change="handleFileChange" accept="image/*">
            <label for="file" class="px-4 py-2 mt-5 w-full text-xl text-sky-700 bg-sky-50 rounded-lg border border-sky-600 transition-colors duration-200 cursor-pointer hover:bg-sky-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Seleccionar archivo
            </label>
            <div v-if="previewImage" class="relative mt-2 w-auto text-sm text-gray-600">
              <img :src="previewImage" class="object-cover w-80 rounded-lg border border-sky-600">
              <p @click="previewImage = null" class="absolute top-1 right-1 px-2 py-1 text-white bg-red-500 rounded-full border border-white transition-colors duration-200 cursor-pointer select-none hover:bg-red-600 hover:text-white">Eliminar</p>
            </div>
          </div>
        </div>
      </section>
        <button @click="sendDocument" class="px-4 py-2 text-white bg-sky-600 rounded-lg ring-1 ring-white min-w-52 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-blue-500">Agregar pago</button>
    </div>
  </section>
  <section class="flex justify-center px-4 py-8 w-full">
    <div class="flex flex-col items-center w-full max-w-5xl min-h-[700px] rounded-xl p-6 bg-gradient-to-br from-white via-white to-sky-50 shadow-xl backdrop-blur-sm">
        <h1 class="mb-4 text-4xl font-bold text-sky-900 font-poppins">Nuevo Pago de Mantenimiento</h1>

        <div class="p-3 mb-6 bg-gradient-to-br from-sky-500 to-sky-800 rounded-full shadow-lg transition-transform hover:scale-105">
            <v-icon name="la-file-invoice-dollar-solid" scale="1.8" class="text-white"></v-icon>
        </div>

        <section class="space-y-6 w-full">
            <!-- Campo Título -->
            <div class="relative p-4 bg-white rounded-xl shadow-sm transition-all duration-200 group hover:shadow-md">
                <div class="flex gap-2 items-center mb-3">
                    <v-icon name="md-shorttext-round" class="text-sky-500" scale="1.4"/>
                    <label for="title" class="text-lg font-semibold text-sky-800">Título</label>
                </div>
                <input type="text" id="title"
                       class="px-4 py-3 w-full text-lg placeholder-sky-800 rounded-lg border border-sky-100 focus:border-sky-300 focus:ring-2 focus:ring-sky-200 focus:ring-opacity-50"
                       placeholder="Título del pago"
                       v-model="title">
            </div>

            <!-- Campo Descripción -->
            <div class="relative p-4 bg-white rounded-xl shadow-sm transition-all duration-200 group hover:shadow-md">
                <div class="flex gap-2 items-center mb-3">
                    <v-icon name="bi-text-paragraph" class="text-sky-500" scale="1.4"/>
                    <label for="description" class="text-lg font-semibold text-sky-800">Descripción</label>
                </div>
                <input type="text" id="description"
                       class="px-4 py-3 w-full text-lg placeholder-sky-800 rounded-lg border border-sky-100 focus:border-sky-300 focus:ring-2 focus:ring-sky-200 focus:ring-opacity-50"
                       placeholder="Descripción del pago"
                       v-model="description">
            </div>

            <!-- Campo Archivo -->
            <div class="relative p-4 bg-white rounded-xl shadow-sm transition-all duration-200 group hover:shadow-md">
                <div class="flex gap-2 items-center mb-3">
                    <v-icon name="ri-image-add-line" class="text-sky-500" scale="1.4"/>
                    <label class="text-lg font-semibold text-sky-800">Imagen Adjunta</label>
                </div>

                <div class="relative">
                    <input type="file" id="file" class="hidden" @change="handleFileChange" accept="image/*">
                    <label for="file"
                           class="flex gap-2 justify-center items-center px-4 py-3 w-full text-lg text-sky-700 bg-sky-50 rounded-lg border-2 border-sky-200 border-dashed transition-all cursor-pointer hover:bg-sky-100 hover:border-sky-300">
                        <v-icon name="hi-solid-cloud-upload" class="text-sky-500" scale="1.2"/>
                        <span>Seleccionar archivo</span>
                    </label>

                    <div v-if="previewImage" class="relative mt-4 group">
                        <img :src="previewImage" class="object-cover max-w-full h-48 rounded-lg border-2 border-sky-100 shadow-sm">
                        <button @click="previewImage = null"
                                class="absolute -top-3 -right-3 p-2 text-white bg-red-500 rounded-full shadow-lg transition-transform hover:scale-110">
                            <v-icon name="md-close-round" class="text-white" scale="0.9"/>
                            Eliminar
                        </button>
                    </div>
                </div>
            </div>
        </section>

        <button @click="sendDocument"
                class="px-8 py-3 mt-8 text-lg font-semibold text-white bg-gradient-to-r from-sky-500 to-sky-600 rounded-xl shadow-lg transition-all transform hover:scale-105 hover:shadow-xl active:scale-95">
            Agregar Pago
        </button>
    </div>
</section>
</template>

<script lang="ts" setup>
import { sysVals } from '@/stores/sysVals';
import { addDoc, collection, getFirestore, Timestamp } from 'firebase/firestore';
import { Notyf } from 'notyf'
//importing css for notyf
import 'notyf/notyf.min.css'; // for React, Vue and Svelte
const notyf = new Notyf({
  duration: 4000,
  dismissible: true,
  position: {
    x: 'left',
    y: 'top'
  },
  ripple: true,
});
import { ref, onUnmounted } from 'vue'

const title = ref('')
const description = ref('')

const selectedFile = ref<File | null>(null)
const previewImage = ref<string | null>(null)

const handleFileChange = (event: Event) => {
  previewImage.value = null
  selectedFile.value = null

  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    selectedFile.value = target.files[0]
    previewImage.value = URL.createObjectURL(target.files[0])
  }
}

const uploadImageToFreeImageHost = async (imageFile: File) => {
   sysVals().setIsLoadingComponent(true);

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



const  db  = getFirestore();

 const collectionFb = collection(db,`condominios/${sysVals().getCondominiumId}/maintenanceHistory`);

 const sendDocument = async () =>   {
  //Validation for empty fields
  if (!title.value || !description.value) {
    notyf.error('Por favor, complete todos los campos.');
    return;
  }
   let imageUrl = '';
   if (selectedFile.value) {
     imageUrl = await uploadImageToFreeImageHost(selectedFile.value);

     if (!imageUrl) {
       sysVals().setIsLoadingComponent(false);
       notyf.error('Error al subir la imagen.');
       return;
     }
   }
  try {
      await addDoc(collectionFb,{
        date: Timestamp.now(),
        description: description.value,
        imgUrl: imageUrl,
        title:title.value
      })
      notyf.success('Documento enviado correctamente')
      title.value = '';
      description.value = '';
      selectedFile.value = null;
      previewImage.value = null;
  } catch (error) {
    notyf.error('Error while trying to send the data')
      console.log(error);
  }
 }
// Clean up the URL when the component is unmounted
onUnmounted(() => {
  if (previewImage.value) {
    URL.revokeObjectURL(previewImage.value)
  }
})

</script>

<style scoped>
input[type="file"] {
  display: none;
}
</style>