<template>
  <div class="overflow-hidden bg-white rounded-lg shadow-lg news-card">
    <img :src="imgUrl" alt="news image" class="object-cover w-full h-48" />
    <div class="p-4">
      <h3 class="text-xl font-semibold">{{ title }}</h3>
      <p class="text-sm text-gray-500">{{ summary }}</p>
      <a :href="href" class="inline-flex items-center mt-2 text-blue-600 hover:underline">
        Leer más
        <i class="ml-2 fas fa-arrow-right"></i>
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    title: {
      type: String,
      default: "Título de la noticia",
    },
    href: {
      type: String,
      default: "#",
    },
    imgUrl: {
      type: String,
      default: "https://via.placeholder.com/400x200",
    },
    summary: {
      type: String,
      default: "Este es el resumen de la noticia. Aquí irá un breve detalle de la noticia.",
    },
});
</script>

<style scoped>
.news-card {
  max-width: 400px;
  margin: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}
.news-card:hover {
  transform: translateY(-5px);
}
</style>
