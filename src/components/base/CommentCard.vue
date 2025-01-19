<template>
  <div class="max-w-sm mx-auto overflow-hidden bg-white shadow-md rounded-xl md:max-w-2xl">
    <div class="md:flex">
      <div class="p-8">
        <div class="flex items-center">
          <i class="text-4xl text-gray-500 fas fa-user-circle"></i>
          <div class="ml-4">
            <div class="text-xl font-medium text-black">
              {{ name }}
            </div>
            <div class="text-gray-500">
              <!-- {{ date }} -->
            </div>
          </div>
        </div>
        <div class="mt-4">
          <h3 class="text-lg font-medium leading-6 text-gray-900">
            {{ titleComment }}
          </h3>
          <p class="mt-2 text-gray-600">
            {{ comment }}
          </p>
        </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>


const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Object,
    required: true
  },
  titleComment: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true
  }
})
</script>

<style scoped></style>
