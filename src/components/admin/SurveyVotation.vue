<template>
    <section class="flex flex-col max-w-sm p-6 mx-auto mt-10 overflow-auto bg-white rounded-lg shadow-md font-poppins max-h-96 ">
        <h2 class="flex items-center mb-4 text-xl font-medium text-blue-600 break-words break-all"><i class="mr-2 fas fa-poll-h"></i> {{ surveyTitle }}</h2>
        <p class="mb-6 text-gray-700">{{ surveyDescription }}</p>

        <form @submit.prevent="">
            <div v-for="(option, index) in surveyOptions" :key="index" class="mb-4">
                <label class="inline-flex items-center cursor-pointer">
                    <input type="radio" name="survey" class="w-5 h-5 text-blue-600 form-radio">
                    <span class="ml-2 text-sm text-gray-700">{{ option }}</span>
                </label>
            </div>
            <button  type="submit" class="px-6 py-3 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
              <i class="mr-2 fas fa-vote-yea"></i> Votar
            </button>
            <div class="mt-2">
              <i class="mr-1 italic text-slate-400 fas fa-info"></i>
              <small class="italic text-slate-600">Así es como lo verán sus propietarios</small>
            </div>
          </form>
    </section>
</template>

<script lang="ts" setup>
const props = defineProps({
  surveyTitle: {
    type: String,
    required: true
  },
  surveyDescription: {
    type: String,
    required: true
  },
  surveyOptions: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>

</style>
