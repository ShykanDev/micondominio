<template>
    <div class="">
      <div class="flex min-h-28 w-[450px] space-x-2 border border-b-[1px] border-t-[1px] p-1 font-poppins rounded-lg bg-white shadow-md">
   <div>
    <!-- <img alt="User profile image placeholder" class="rounded-full w-44" src="https://placehold.co/44x44"/> -->
   </div>
   <div>
    <p class="text-lg font-semibold">
     <!-- <i class="fas fa-user">
     </i> -->
     {{ name }}
    </p>
    <h2 class="text-sm text-sky-800">
     <i class="fas fa-info-circle">
     </i>
     {{ description }}
    </h2>
    <h3 class="text-xs text-gray-500">
     <i class="fas fa-calendar-alt">
     </i>
     {{ date }}
    </h3>
    <p class="text-sm">
     <i class="fas fa-comment">
     </i>
     {{ comment }}
    </p>
   </div>
  </div>
    </div>
</template>

<script lang="ts" setup>

const props = defineProps({
    img: {
        type: String,
        default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy_WE4hUxUFNJ_WC_5NwTBjUxSr1xMF7batA&s'
    },
    name:{
        type: String,
        default: 'Jonty Andrews'
    },
    description:{
        type: String,
        default: '"Me ha ayudado bastante"'
    },
    date: {
        type: String,
        default: 'March 13, 2020'
    },
    rating: {
        type: String,
        default: '⭐⭐⭐⭐⭐'
    },
    comment: {
        type: String,
        default: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt, perspiciatis impedit officia quaerat'
    }
})
</script>

<style scoped></style>
