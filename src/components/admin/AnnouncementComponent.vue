<template>
  <AnnouncementCard v-if="titulo.length > 0" class="fixed overflow-auto shadow-2xl bottom-3 left-3 max-h-56" :title="titulo" :description="descripcion"
    :date="new Date().toDateString()" :category="category" :is-urgent="urgente" :is-edition="true"  :img="currentImage" >
  </AnnouncementCard>
  <section class="max-w-4xl p-6 mx-auto mt-10 bg-white rounded-lg shadow-md font-poppins">
    <h2 class="mb-4 text-2xl font-bold text-sky-800"><i class="fas fa-bullhorn"></i> Nuevo Anuncio</h2>
    <form @submit.prevent="handleSubmit">
      <div class="mb-4">
        <label for="titulo" class="block mb-2 font-bold text-sky-800"><i class="fas fa-heading"></i> Título del
          Anuncio</label>
        <input v-model="titulo" type="text" id="titulo" name="titulo"
          class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ingrese el título del anuncio" />
      </div>
      <div class="mb-4">
        <label for="category" class="block mb-2 font-bold text-sky-800"><i class="fas fa-tag"></i> Categoría del
          Anuncio</label>
        <input v-model="category" type="text" id="category" name="category"
          class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ingrese la categoría del anuncio e.g. Pago de mantenimiento, etc." />
      </div>

      <div class="mb-4">
        <label for="descripcion" class="block mb-2 font-bold text-sky-800"><i class="fas fa-align-left"></i>
          Descripción</label>
        <textarea v-model="descripcion" id="descripcion" name="descripcion"
          class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ingrese la descripción del anuncio"></textarea>
      </div>

      <div class="grid w-full max-w-xs items-center gap-1.5">
        <label
          class="text-sm font-medium leading-none text-gray-400 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"><i
            class="mr-2 fas fa-image text-sky-600"></i> Imagen</label>
        <input
          class="flex w-full text-sm text-gray-400 bg-white border border-blue-300 rounded-md border-input file:border-0 file:bg-blue-600 file:text-white file:text-sm file:font-medium"
          type="file" id="picture" @change="handleFileChange"
          accept="image/*"
          />
          <div>
        <button type="button" v-if="currentImage" @click="cancelImage" class="px-4 py-2 rounded-md cursor-pointer text-sky-800 hover:text-sky-600 bg-slate-100 hover:bg-slate-200"><i class="mr-2 fas fa-times"></i> Cancelar Imagen</button>
      </div>
      </div>
      <!-- button to cancel the image -->


      <div class="flex items-center mt-3 mb-4">
        <input v-model="urgente" type="checkbox" id="urgente" name="urgente" class="mr-2" />
        <label for="urgente" class="font-bold cursor-pointer text-sky-800"><i class="fas fa-exclamation-circle"></i> ¿Es
          Urgente?</label>
      </div>

      <div class="flex justify-end">
        <button type="submit"
          class="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <i class="fas fa-plus"></i> Crear Anuncio
        </button>
      </div>
    </form>
  </section>
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
import { addDoc, collection, getFirestore, Timestamp, updateDoc } from 'firebase/firestore';
import { ref } from 'vue';
import AnnouncementCard from './AnnouncementCard.vue';


// Estado del formulario
const titulo = ref("");
const descripcion = ref("");
const urgente = ref(false);
const category = ref("");
const selectedFile = ref<File | null>(null);
const currentImage = ref<string | null>("");
const showAnnouncement = ref(false);
// Capturar el archivo seleccionado
const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    selectedFile.value = target.files[0];
  }
  if (selectedFile.value) {
    currentImage.value = URL.createObjectURL(selectedFile.value);
  }
};

// Función para subir la imagen a ImgBB
// const uploadImageToImgBB = async (file: File) => {
//   const apiKey = "604279d0c28a117c1c79e497b58a66ea"; // Tu API Key de ImgBB
//   const url = `https://api.imgbb.com/1/upload?key=${apiKey}`;

//   try {
//     const formData = new FormData();
//     formData.append("image", file); // Archivo binario directo

//     const response = await fetch(url, {
//       method: "POST",
//       body: formData,
//     });

//     if (!response.ok) {
//       throw new Error(`Error en la solicitud: ${response.statusText}`);
//     }

//     const result = await response.json();

//     if (!result.success) {
//       throw new Error(`Error en la respuesta de ImgBB: ${result.error.message}`);
//     }

//     return result.data.url; // URL de la imagen subida
//   } catch (error) {
//     console.error("Error subiendo la imagen:", error);
//     return null;
//   }
// };
// const  = async (file: File) => {
//   sysVals().setIsLoadingComponent(true); // Show loading state

//   try {
//     // Define the API endpoint and form data
//     const apiUrl = 'https://freeimage.host/api/1/upload';
//     const formData = new FormData();

//     formData.append('key', '6d207e02198a847aa98d0a2a901485a5'); // Your API key
//     formData.append('action', 'upload'); // Action is "upload"
//     formData.append('source', file); // Add the image file
//     formData.append('format', 'json'); // Return format set to JSON

//     // Make the POST request to the API
//     const response = await fetch(apiUrl, {
//       method: 'POST',
//       body: formData,
//     });

//     // Parse the response
//     const result = await response.json();

//     if (result.success) {
//       console.log('Image uploaded successfully:', result.image.url);
//       notyf.success('Image uploaded successfully');
//       // Optionally, handle further logic here (e.g., store image URL, update UI)
//     } else {
//       console.error('Error uploading image:', result.error.message);
//       notyf.error('Error while uploading the image');
//     }

//   } catch (error) {
//     console.error("Error during upload:", error);
//     notyf.error('Error al subir la imagen');
//   } finally {
//     sysVals().setIsLoadingComponent(false); // Hide loading state regardless of success or failure
//   }
// };

const uploadImageToFreeImageHost = async (imageFile) => {
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

const cancelImage = () => {
  selectedFile.value = null;
  currentImage.value = null;
}

// uploadImageToFreeImageHost
// Manejar el envío del formulario

const db = getFirestore();
const announcementsCollectionRef = collection(db, `condominios/${sysVals().getCondominiumId}/announcements`);
// const handleSubmit = async () => {
//   // sysVals().setIsLoadingComponent(true)
//   if (!selectedFile.value) {
//   sysVals().setIsLoadingComponent(false)
//   notyf.error('Por favor selecciona una imagen');

//     return;
//   }

//   // const imageUrl = await uploadImageToImgBB(selectedFile.value);
//   const imageUrl = await uploadImageToFreeImageHost(selectedFile.value);

//   if (!imageUrl) {
//     alert("Error al subir la imagen.");
//   sysVals().setIsLoadingComponent(false)

//     return;
//   }

//   const newAd = {
//     title: titulo.value,
//     description: descripcion.value,
//     category: category.value,
//     urgent: urgente.value,
//     imageUrl,
//     creationDate: Timestamp.now()
//   };

//   const announcementToFbase = await addDoc(announcementsCollectionRef, newAd);
//   await updateDoc(announcementToFbase, {
//     announcementId: announcementToFbase.id
//   })

//   titulo.value = "";
//   descripcion.value = "";
//   category.value = "";
//   selectedFile.value = null;
//   urgente.value = false;

//   notyf.success('Posteado exitosamente');
//   sysVals().setIsLoadingComponent(false)
// };
const handleSubmit = async () => {
  sysVals().setIsLoadingComponent(true);

  // Si no hay archivo seleccionado, usa una URL por defecto
  let imageUrl = '';
  if (selectedFile.value) {
    imageUrl = await uploadImageToFreeImageHost(selectedFile.value);

    if (!imageUrl) {
      sysVals().setIsLoadingComponent(false);
      notyf.error('Error al subir la imagen.');
      return;
    }
  }

  const newAd = {
    title: titulo.value,
    description: descripcion.value,
    category: category.value,
    urgent: urgente.value,
    imageUrl, // Aquí se usa la URL por defecto si no hay imagen
    creationDate: Timestamp.now(),
  };

  try {
    const announcementToFbase = await addDoc(announcementsCollectionRef, newAd);

    await updateDoc(announcementToFbase, {
      announcementId: announcementToFbase.id,
    });

    // Reiniciar valores
    titulo.value = '';
    descripcion.value = '';
    category.value = '';
    selectedFile.value = null;
    urgente.value = false;

    notyf.success('Posteado exitosamente');
  } catch (error) {
    notyf.error('Error al postear el anuncio');
  } finally {
    sysVals().setIsLoadingComponent(false);
  }
};

</script>

<style scoped>
/* Opcional: agrega tus estilos personalizados aquí */
</style>
