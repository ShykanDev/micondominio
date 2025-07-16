<template>

  <section class="">
    <article class="flex justify-center items-center">

      <h2 class="ml-4 text-3xl text-sky-800 font-poppins">Publicaciones</h2>
    </article>

      <article class="overflow-y-auto text-center max-h-[950px] py-3">
        <div v-if="!gettingData && availableSpaces.length > 0" class="flex flex-wrap gap-4 justify-around items-center">
          <AvailableSpaceCard @delete-space="emmitFunc1" v-for="space in availableSpaces" :key="space.id" :title="space.title" :description="space.description" :type="space.type" :date="space.date" :documentId="space.documentId" :image="space.image" />
        </div>


      </article>
  </section>

</template>

<script lang="ts" setup>
import { sysVals } from '@/stores/sysVals';
import { addDoc, collection, getFirestore, query, Timestamp, where, getDocs } from 'firebase/firestore';

import { Notyf } from 'notyf';
import { onMounted, ref } from 'vue';
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



onMounted(() => {
  getData();
})




//Variable to show/hide the view of the available spaces animation

const gettingData = ref(false);

const availableSpaces = ref([]);



const emmitFunc1 = async(data: string) => {
  console.log('emmitFunc1');
  showAvailableSpaces.value = false;
  console.log(data);

}

</script>

<style scoped></style>