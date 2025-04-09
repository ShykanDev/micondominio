<template>
  <div v-if="!showAvailableSpaces" class="text-center">
    <article>
      <div class="flex justify-center items-center">
        <v-icon name="fa-house-user" class="mr-3 text-sky-800" scale="1.9" />
        <h2 class="text-3xl text-sky-800 font-poppins">Espacios Disponibles</h2>
      </div>
      <h4 class="text-lg text-gray-600 font-poppins">Gestione sus espacios disponibles para venta y arrendamiento</h4>
    <!-- Button to see the available spaces the user has uploaded -->

    <article class="flex justify-center items-center mt-4">
      <button @click="handleShowAvailableSpaces" class="py-2 w-full text-white bg-sky-800 rounded-lg hover:bg-sky-900 focus:outline-none focus:ring-2 focus:ring-sky-800 focus:ring-opacity-50">
        <i class="mr-2 fas fa-eye"></i>
        Ver mis publicaciones
      </button>
    </article>
    </article>
    <div class="flex flex-wrap gap-4 justify-center mt-4 w-full sm:flex-nowrap">
      <!-- For sale spaces -->
      <div class="p-4 w-full bg-white rounded-3xl border sm:w-1/2 border-slate-300 hover:border-slate-500">
        <div class="flex justify-center items-center">
          <v-icon name="gi-money-stack" class="mr-3 text-sky-800" scale="1.9" />

          <h3 class="text-2xl text-sky-800 font-poppins">Espacios para venta</h3>
        </div>
        <h6 class="text-lg text-gray-600 font-poppins">Título del espacio a vender</h6>
        <input
          type="text"
          class="px-3 py-2 my-2 w-10/12 text-xl text-center rounded-lg border placeholder:text-center font-poppins focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="title"
          placeholder="Depto 2 hab, 1 baño, amueblado - Colonia del Valle"
          v-model="saleTitle">

        <h6 class="text-lg text-gray-600 font-poppins">Descripción del espacio a vender</h6>
        <textarea
          name="description"
          id=""
          class="px-3 py-2 my-2 w-10/12 text-xl rounded-lg border min-h-60 placeholder:text-center font-poppins focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-9 text-slate-700"
          placeholder="Moderno departamento en condominio privado ofrece 2 habitaciones amplias, 1 baño completo, cocina equipada, área de lavandería y 1 espacio de garaje. Cuenta con seguridad 24/7, áreas verdes y piscina comunal. Ideal para profesionales o parejas."
          v-model="saleDescription">
        </textarea>
        <button @click="sendData('sale')" class="py-2 w-full text-white bg-sky-800 rounded-lg hover:bg-sky-900 focus:outline-none focus:ring-2 focus:ring-sky-800 focus:ring-opacity-50">

          <i class="mr-2 fas fa-plus"></i>
          Agregar
        </button>
        <!-- Input to add image -->
        <div class="relative p-4 bg-white rounded-xl shadow-sm transition-all duration-200 group hover:shadow-md">
                <div class="flex gap-2 items-center mb-3">
                    <v-icon name="ri-image-add-line" class="text-sky-700" scale="1.4"/>
                    <label class="text-lg font-semibold text-sky-800">Adjuntar Imagen</label>
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
      </div>
      <!-- For rent spaces -->
      <div class="p-4 w-full bg-white rounded-3xl border border-slate-300 hover:border-slate-500 sm:w-1/2">
        <div class="flex justify-center items-center">
          <v-icon name="gi-take-my-money" class="mr-3 text-sky-800" scale="1.9" />

          <h3 class="text-2xl text-sky-800 font-poppins">Espacios para arrendamiento</h3>
        </div>
        <h6 class="text-lg text-gray-600 font-poppins">Título del espacio a arrendar</h6>
        <input type="text"
          class="px-3 py-2 my-2 w-10/12 text-xl text-center rounded-lg border placeholder:text-center font-poppins focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="title" placeholder="Depto 1 hab, 1 baño, amueblado - Colonia del Valle"
          v-model="rentTitle">
        <h6 class="text-lg text-gray-600 font-poppins">Descripción del espacio a arrendar</h6>
        <textarea
          name="description"
          id=""
          class="px-3 py-2 my-2 w-10/12 text-xl rounded-lg border min-h-60 placeholder:text-center font-poppins focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-600"
          placeholder="Amplio y luminoso departamento en renta, completamente amueblado, con dos recámaras, sala-comedor, cocina integral y baño completo. Incluye servicios de agua y mantenimiento. Excelente ubicación en zona tranquila, ideal para familias pequeñas o profesionistas. Se solicita un mes de depósito y contrato mínimo de un año."
          v-model="rentDescription">
        </textarea>
        <button @click="sendData('rent')" class="py-2 w-full text-white bg-sky-800 rounded-lg hover:bg-sky-900 focus:outline-none focus:ring-2 focus:ring-sky-800 focus:ring-opacity-50">
          <i class="mr-2 fas fa-plus"></i>
          Agregar
        </button>
         <!-- Input to add image -->
         <div class="relative p-4 bg-white rounded-xl shadow-sm transition-all duration-200 group hover:shadow-md">
                <div class="flex gap-2 items-center mb-3">
                    <v-icon name="ri-image-add-line" class="text-sky-700" scale="1.4"/>
                    <label class="text-lg font-semibold text-sky-800">Adjuntar Imagen</label>
                </div>

                <div class="relative">
                    <input type="file" id="file-rent" class="hidden" @change="handleFileChange2" accept="image/*">
                    <label for="file-rent"
                           class="flex gap-2 justify-center items-center px-4 py-3 w-full text-lg text-sky-700 bg-sky-50 rounded-lg border-2 border-sky-200 border-dashed transition-all cursor-pointer hover:bg-sky-100 hover:border-sky-300">
                        <v-icon name="hi-solid-cloud-upload" class="text-sky-500" scale="1.2"/>
                        <span>Seleccionar archivo</span>
                    </label>

                    <div v-if="previewImage2" class="relative mt-4 group">
                        <img :src="previewImage2" class="object-cover max-w-full h-48 rounded-lg border-2 border-sky-100 shadow-sm">
                        <button @click="previewImage2 = null"
                                class="absolute -top-3 -right-3 p-2 text-white bg-red-500 rounded-full shadow-lg transition-transform hover:scale-110">
                            <v-icon name="md-close-round" class="text-white" scale="0.9"/>
                            Eliminar
                        </button>
                    </div>
                </div>
            </div>
      </div>
    </div>
  </div>

  <section v-if="showAvailableSpaces" class="">
    <article class="flex justify-center items-center">
      <button @click="handleShowAvailableSpaces" class="py-1 w-44 text-white bg-sky-800 rounded-lg hover:bg-sky-900 focus:outline-none focus:ring-2 focus:ring-sky-800 focus:ring-opacity-50"><i class="mr-2 fas fa-arrow-left"></i> Ir atrás</button>
      <h2 class="ml-4 text-3xl text-sky-800 font-poppins">Publicaciones</h2>
    </article>
      <h4 class="text-lg text-center text-gray-600 font-poppins">Aquí aparecerán todas sus  publicaciones que usted ha hecho</h4>
      <article class="overflow-y-auto text-center max-h-[950px] py-3">
        <div v-if="!gettingData && availableSpaces.length > 0" class="flex flex-wrap gap-4 justify-around items-center">
          <AvailableSpaceCard @delete-space="emmitFunc1" v-for="space in availableSpaces" :key="space.id" :title="space.title" :description="space.description" :type="space.type" :date="space.date" :documentId="space.documentId" :image="space.image" />
        </div>
        <div v-if="gettingData" class="flex flex-wrap gap-4 justify-around items-center">
          <CardAnimation :class="(i % 2 === 0 ? 'animate-fade' : 'animate-fade')" class="cursor-wait" v-for="i in 12" :key="i" />
        </div>

      </article>
  </section>

</template>

<script lang="ts" setup>
import { sysVals } from '@/stores/sysVals';
import { addDoc, collection, getFirestore, query, Timestamp, where, getDocs } from 'firebase/firestore';

import { Notyf } from 'notyf';
import { ref } from 'vue';
import CardAnimation from '../animations/CardAnimation.vue';
import AvailableSpaceCard from './AvailableSpaceCard.vue';



const notyf = new Notyf({
  duration: 3000,
  position: {
    x: 'right',
    y: 'top'
  },
  types:[
    {
      type: 'warning',
      background: 'orangered',
      duration: 3000,
      dismissible: true
    }
  ]
});

const rentTitle = ref('');
const saleTitle = ref('');
const rentDescription = ref('');
const saleDescription = ref('');

//Variable to show/hide the view of the available spaces
const showAvailableSpaces = ref(false);

const handleShowAvailableSpaces = () => {
  showAvailableSpaces.value = !showAvailableSpaces.value;
 if (showAvailableSpaces.value) {
  getData();
 }
}

//Function to push the firebase data to the database
//It's not needed to add two collections, it will use the same collection but with different types of data (sale or rent)


//Firebase utils
const db = getFirestore();
const collectionRef = collection(db, `condominios/${sysVals().getAdminDocId}/availableSpaces`);
const q = query(collectionRef, where('type', '!=', 'saled'));



//Get data from firebase (both sale and rent)
const getData = async () => {
  try {
    availableSpaces.value = [];
    gettingData.value = true;
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      documentId: doc.id
    }));
    console.log(data);
    availableSpaces.value.push(...data);
    gettingData.value = false;
    sysVals().setIsLoadingComponent(false);
  } catch (error) {
    gettingData.value = false;
    sysVals().setIsLoadingComponent(false);
    console.log(error);
  }
}

//Call getData when the component is mounted



//Validation to check if the fields are empty
const validateFields = (type: 'sale' | 'rent') => {
  if (type === 'rent' && (!rentTitle.value || !rentDescription.value)) {
    notyf.error('Por favor, complete todos los campos.');
    return false;
  }
  if (type === 'sale' && (!saleTitle.value || !saleDescription.value)) {
    notyf.error('Por favor, complete todos los campos.');
    return false;
  }
  return true;
}

const selectedFile = ref<File | null>(null)
const selectedFile2 = ref<File | null>(null)
const previewImage = ref<string | null>(null)
const previewImage2 = ref<string | null>(null)

const collectionNotif = collection(db, `condominios/${sysVals().getCondominiumId}/notifAlerts`);
const  setFirebaseNewNotif = async (component: string, date: object, message: string) =>{
  console.log("🔥 setFirebaseNewNotif fue llamado");
  try {
    await addDoc(collectionNotif, { component, date, message });
    notyf.success('Notificación enviada');
  } catch (error) {
    console.log(error);
    notyf.error('Error al enviar la notificación'+ error);
  }
}

const sendData = async (type: 'sale' | 'rent') => {
  if (!validateFields(type)) return;
  let imageUrl = '';
  if (type === 'sale' && selectedFile.value) {
    imageUrl = await uploadImageToFreeImageHost(selectedFile.value);
    if (!imageUrl) {
      sysVals().setIsLoadingComponent(false);
      notyf.error('Error al subir la imagen.');
      return;
    }
  }
  let imageUrl2 = '';
  if (type === 'rent' && selectedFile2.value) {
     imageUrl2 = await uploadImageToFreeImageHost(selectedFile2.value);
    if (!imageUrl2) {
      sysVals().setIsLoadingComponent(false);
      notyf.error('Error al subir la imagen.');
      return;
    }
  }
  try {
    sysVals().setIsLoadingComponent(true);
    await addDoc(collectionRef, {
      title: type === 'sale' ? saleTitle.value : rentTitle.value,
      description: type === 'sale' ? saleDescription.value : rentDescription.value,
      type: type,
      date: Timestamp.now(),
      image: type === 'sale' ? imageUrl : imageUrl2
    });
    setFirebaseNewNotif('AvailableSpacesComponent', Timestamp.now(), 'Nuevo Espacio de Mantenimiento Disponible');
//Once the data is sent, reset the fields
    saleTitle.value = '';
    saleDescription.value = '';
    rentTitle.value = '';
    rentDescription.value = '';
    notyf.success('Datos enviados correctamente');
    sysVals().setIsLoadingComponent(false);
  } catch (error) {
      console.log(error);
      notyf.error('Error al enviar los datos: ' + error);
      sysVals().setIsLoadingComponent(false);
  }
}

//Variable to show/hide the view of the available spaces animation

const gettingData = ref(false);

const availableSpaces = ref([]);



const emmitFunc1 = async(data: string) => {
  console.log('emmitFunc1');
  showAvailableSpaces.value = false;
  console.log(data);

}




const handleFileChange = (event: Event) => {
  previewImage.value = null
  selectedFile.value = null

  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    selectedFile.value = target.files[0]
    previewImage.value = URL.createObjectURL(target.files[0])
  }
}

const handleFileChange2 = (event: Event) => {
  previewImage2.value = null
  selectedFile2.value = null

  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    selectedFile2.value = target.files[0]
    previewImage2.value = URL.createObjectURL(target.files[0])
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


</script>

<style scoped></style>