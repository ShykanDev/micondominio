<template>
   <section class="max-w-4xl p-6 mx-auto mt-10 bg-white rounded-lg shadow-md font-poppins">
        <h2 class="mb-4 text-2xl font-bold text-sky-800"><i class="fas fa-bullhorn"></i> Nuevo Anuncio</h2>
        <form>
            <div class="mb-4">
                <label for="titulo" class="block mb-2 font-bold text-sky-800"><i class="fas fa-heading"></i> Título del Anuncio</label>
                <input type="text" id="titulo" name="titulo" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Ingrese el título del anuncio">
            </div>
            <div class="mb-4">
                <label for="descripcion" class="block mb-2 font-bold text-sky-800"><i class="fas fa-align-left"></i> Descripción</label>
                <textarea id="descripcion" name="descripcion" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Ingrese la descripción del anuncio"></textarea>
            </div>
            <div class="flex items-center mb-4">
                <input type="checkbox" id="urgente" name="urgente" class="mr-2">
                <label for="urgente" class="font-bold text-sky-800"><i class="fas fa-exclamation-circle"></i> ¿Es Urgente?</label>
            </div>
            <div class="flex justify-end">
                <button type="submit" class="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"><i class="fas fa-plus"></i> Crear Anuncio</button>
            </div>
        </form>
    </section>
</template>

<script lang="ts" setup>

</script>

<style scoped>

</style>
