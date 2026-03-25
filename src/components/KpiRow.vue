<template>
  <div class="kpi-row">
    <div class="kpi" v-for="k in items" :key="k.label">
      <div class="label">{{ k.label }}</div>
      <div class="value">{{ k.value }}</div>
      <div class="change" :class="k.up ? 'up' : 'down'">{{ k.change }}</div>
    </div>
  </div>
</template>

<script setup>
defineProps({ items: Array })
</script>
