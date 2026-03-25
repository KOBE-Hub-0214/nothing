<template>
  <div class="card">
    <div class="card-title">{{ title }}</div>
    <div ref="chartRef" class="chart-box" :class="{ tall }"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as echarts from 'echarts'
import { useTheme } from '../composables/useTheme'

const props = defineProps({
  title: String,
  tall: Boolean,
  option: { type: Function, required: true },
})

const { isDark } = useTheme()
const chartRef = ref(null)
let chart = null

function render() {
  if (!chartRef.value) return
  if (chart) chart.dispose()
  chart = echarts.init(chartRef.value)
  chart.setOption(props.option())
}

onMounted(() => {
  render()
  window.addEventListener('resize', handleResize)
})
onUnmounted(() => {
  chart?.dispose()
  window.removeEventListener('resize', handleResize)
})

function handleResize() { chart?.resize() }

watch(isDark, render)
watch(() => props.option, render)
</script>
