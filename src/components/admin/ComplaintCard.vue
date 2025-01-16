<template>
    <div class="w-full max-w-sm p-2 px-5 bg-white shadow-lg rounded-2xl">
        <div class="flex items-center justify-between mb-3">
            <h2 class="flex items-center text-2xl font-semibold text-gray-800">
                <i class="mr-2 fas fa-exclamation-triangle"></i> Tipo de Queja
            </h2>
        </div>
        <div class="mb-3">
            <h3 class="flex items-center text-xl font-medium text-gray-700">
                <i class="mr-2 fas fa-user-circle"></i> Nombre del Usuario
            </h3>
        </div>
        <div class="mb-3">
            <p class="flex items-center text-gray-600">
                <i class="mr-2 fas fa-align-justify"></i> Este es un resumen de la queja del usuario. Aquí se pueden incluir detalles importantes y relevantes sobre la queja.
            </p>
        </div>
        <div class="mb-3">
            <p class="flex items-center text-gray-600">
                <i class="mr-2 fas fa-calendar-day"></i> Fecha de la Queja: 2023-10-01
            </p>
        </div>
        <div class="flex justify-end">
            <button class="px-5 py-2 text-white bg-red-600 rounded-full hover:bg-red-800">
                Borrar
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>

</style>
