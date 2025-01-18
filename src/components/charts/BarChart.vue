<template>
  <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<script lang="ts" setup>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { ref } from 'vue'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)



const props = defineProps({
  labels: {
    type: Array,
    default: () => ['January', 'February', 'March']
  },
  data: {
    type: Array,
    default: () => [40, 2500, 12]
  },
  label: {
    type: String,
    default: 'Encuesta del administrador'
  }
})
const chartData = ref({
  labels: props.labels,
  datasets: [{
    label: props.label,
    data: props.data,
  }]
})

const chartOptions = ref({
  responsive: true
})
</script>
