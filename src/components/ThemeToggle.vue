<template>
  <button class="theme-toggle" @click="toggle" @touchend.prevent="toggle" aria-label="Toggle theme">
    <span class="icon icon-moon">&#9790;</span>
    <span class="icon icon-sun">&#9728;</span>
  </button>
</template>

<script setup>
import { useTheme } from '../composables/useTheme'
const { toggle } = useTheme()
</script>
