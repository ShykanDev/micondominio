<template>
  <div class="w-full max-w-sm p-6 bg-white rounded-lg shadow-md font-poppins">
        <h2 class="mb-4 text-xl font-semibold text-gray-800">¿Desea regenerar el código?</h2>
        <div class="flex items-center mb-4">
            <i class="text-4xl text-yellow-500 fas fa-exclamation-triangle"></i>
            <p class="ml-4 text-gray-600">
                Esto hará que el código anterior deje de funcionar, sus propietarios no podrán acceder con el anterior código, esto es irreversible.
            </p>
        </div>
        <div class="flex justify-between">
            <button class="px-4 py-2 text-white rounded bg-sky-800 hover:bg-sky-900 focus:outline-none focus:ring-2 focus:ring-sky-800 focus:ring-opacity-50">
                Cancelar
            </button>
            <button class="px-4 py-2 text-white rounded bg-rose-500 hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-opacity-50">
                <i class="mr-2 fas fa-trash-alt"></i>Eliminar
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>

</style>
