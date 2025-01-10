<template>
   <MainLayout>
    <template #main>
      <img class="fixed top-0 bottom-0 left-0 right-0 w-full -z-20" src="https://images.pexels.com/photos/789822/pexels-photo-789822.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="">
      <section class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 -z-10 "></section>
      <section class="px-4 py-8 bg-gray-100 sm:px-6 lg:px-8 font-poppins">
  <h2 class="mb-4 text-2xl font-semibold text-center">Contáctenos</h2>
  <p class="px-24 mb-6 text-lg text-center">
    Si desea más información o asesoría sobre nuestras aplicaciones, o tiene alguna sugerencia, estamos para servirle.
    Complete el formulario a continuación y envíenos sus datos.
  </p>

  <div class="max-w-3xl p-6 mx-auto bg-white rounded-lg shadow-md">
    <form action="#" method="POST" class="space-y-6">
      <!-- Name Input -->
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700">Nombre</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          class="block w-full px-4 py-2 mt-1 border border-blue-200 rounded-md shadow-sm focus:outline-none focus:ring-blue-400 focus:border-blue-400"
        />
      </div>

      <!-- Phone Number Input -->
      <div>
        <label for="phone" class="block text-sm font-medium text-gray-700">Número de Teléfono</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          class="block w-full px-4 py-2 mt-1 border border-blue-200 rounded-md shadow-sm focus:outline-none focus:ring-blue-400 focus:border-blue-400"
        />
      </div>

      <!-- Email Input -->
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Correo Electrónico</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          class="block w-full px-4 py-2 mt-1 border border-blue-200 rounded-md shadow-sm focus:outline-none focus:ring-blue-400 focus:border-blue-400"
        />
      </div>

      <!-- Message Textarea -->
      <div>
        <label for="message" class="block text-sm font-medium text-gray-700">Mensaje</label>
        <textarea
          id="message"
          name="message"
          rows="4"
          required
          class="block w-full px-4 py-2 mt-1 border border-blue-200 rounded-md shadow-sm focus:outline-none focus:ring-blue-400 focus:border-blue-400"
        ></textarea>
      </div>

      <!-- Submit Button -->
      <div class="flex justify-center">
        <button
          type="submit"
          class="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Enviar
        </button>
      </div>
    </form>
  </div>
</section>



    </template>
   </MainLayout>
</template>

<script lang="ts" setup>
import MainLayout from '@/layouts/MainLayout.vue';


</script>

<style scoped>

</style>
