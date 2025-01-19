<template>
  <MainLayout>
    <template #main>
      <img class="fixed top-0 bottom-0 left-0 right-0 w-full -z-20"
        src="https://images.pexels.com/photos/789822/pexels-photo-789822.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="">
      <section class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 -z-10 "></section>
      <section class="px-4 py-8 bg-gray-100 sm:px-6 lg:px-8 font-poppins">
        <h2 class="mb-4 text-2xl font-semibold text-center">Contáctenos</h2>
        <p class="mb-6 text-lg text-center">
          Si desea más información o asesoría sobre nuestras aplicaciones, o tiene alguna sugerencia, estamos para
          servirle.
          Complete el formulario a continuación y envíenos sus datos, o contactenos directamente por correo electrónico
          a <a href="mailto:informes@grupochimex.com" class="text-blue-600 underline font-signika"
            target="_blank">informes@grupochimex.com</a>
        </p>

        <div class="max-w-3xl p-6 mx-auto mt-10 bg-white rounded-lg shadow-md">
          <form action="#" method="POST" class="max-w-xl mx-auto mt-16 sm:mt-20">
            <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div>
                <label for="first-name" class="block font-semibold text-gray-900 text-sm/6">
                  <i class="mr-2 text-indigo-600 fas fa-user"></i>Nombre
                </label>
                <div class="mt-2.5">
                  <input type="text" v-model="name" name="first-name" id="first-name" autocomplete="given-name"
                    class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600">
                </div>
              </div>

              <div class="sm:col-span-2">
                <label for="email" class="block font-semibold text-gray-900 text-sm/6">
                  <i class="mr-2 text-indigo-600 fas fa-envelope"></i>Correo electrónico
                </label>
                <div class="mt-2.5">
                  <input type="email" v-model="email" name="email" id="email" autocomplete="email"
                    class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600">
                </div>
              </div>
              <div class="sm:col-span-2">

                <label for="phone-number" class="block font-semibold text-gray-900 text-sm/6">
                  <i class="mr-2 text-indigo-600 fas fa-phone"></i>Número de teléfono
                  <span class="text-xs text-slate-600">(opcional)</span>
                </label>
                <div class="mt-2.5">
                  <div
                    class="flex rounded-md bg-white outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                    <div class="grid grid-cols-1 shrink-0 focus-within:relative">
                      <select id="country" name="country" autocomplete="country" aria-label="País"
                        class="col-start-1 row-start-1 w-full appearance-none rounded-md py-2 pl-3.5 pr-7 text-base text-gray-500 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                        <option>MX</option>
                        <option>US</option>
                      </select>
                      <svg
                        class="self-center col-start-1 row-start-1 mr-2 text-gray-500 pointer-events-none size-5 justify-self-end sm:size-4"
                        viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                        <path fill-rule="evenodd"
                          d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                          clip-rule="evenodd" />
                      </svg>
                    </div>
                    <input type="text" v-model="phone" name="phone-number" id="phone-number"
                      class="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                      placeholder="+52 123456789">
                  </div>
                </div>
              </div>
              <div class="sm:col-span-2">
                <label for="message" class="block font-semibold text-gray-900 text-sm/6">
                  <i class="mr-2 text-indigo-600 fas fa-comment"></i>Mensaje
                </label>
                <div class="mt-2.5">
                  <textarea name="message" v-model="message" id="message" rows="4"
                    class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"></textarea>
                </div>
              </div>
            </div>
            <div class="mt-10">
              <button @click="sendEmail" type="button"
                class="block w-full rounded-md bg-sky-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600">
                <i class="mr-2 fas fa-paper-plane"></i>Contacto
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
import emailjs from '@emailjs/browser';
import { ref } from 'vue';
const name = ref("");
const subject = ref("");
const email = ref("");
const phone = ref("");
const message = ref("");
const page = ref("mantenimientoedificio.com");
const sendEmail = async () => {
  if (!name.value || !email.value || !message.value) {
    alert('Por favor, complete todos los campos.');
    return;
  }
  if (!phone.value) {
    phone.value = 'No se proporciono un número de teléfono';
  }
  if (!subject.value) {
    subject.value = 'Sin asunto proporcionado';
  }
  const templateParams = {
    name: name.value,
    subject: subject.value,
    email: email.value,
    phone: phone.value,
    message: message.value,
    url: page.value,
    reply_to: email.value
  };

  try {
    await emailjs.send(
      'service_3nl9wkf.', // Reemplaza con tu Service ID
      'template_2q2mc52', // Reemplaza con tu Template ID
      templateParams,
      'fXlbInB-wrOGPiUbH' // Reemplaza con la clave pública que obtuviste
    );
    name.value = '';
    subject.value = '';
    email.value = '';
    message.value = '';

  } catch (error) {
    console.error('Error al enviar el correo:', error);

  }
};
</script>

<style scoped></style>
