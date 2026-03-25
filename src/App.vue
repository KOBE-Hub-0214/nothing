<template>
  <div class="dashboard">
    <header class="header">
      <div class="header-left">
        <h1 class="logo">Nothing<span class="dot">.</span> Analytics</h1>
      </div>
      <ThemeToggle />
    </header>

    <nav class="tabs">
      <button
        v-for="tab in TABS"
        :key="tab.key"
        class="tab-btn"
        :class="{ active: activeTab === tab.key }"
        @click="activeTab = tab.key"
      >
        {{ tab.label }}
      </button>
    </nav>

    <main class="main">
      <KeepAlive>
        <SalesTab     v-if="activeTab === 'sales'" />
        <RegionTab    v-else-if="activeTab === 'region'" />
        <UserTab      v-else-if="activeTab === 'user'" />
        <MarketingTab v-else-if="activeTab === 'marketing'" />
        <SupplyTab    v-else-if="activeTab === 'supply'" />
        <ProductTab   v-else-if="activeTab === 'product'" />
      </KeepAlive>
    </main>

    <footer class="footer">
      Nothing Technology &copy; 2026 &mdash; Internal Analytics Dashboard
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { TABS } from './data/mockData'
import ThemeToggle from './components/ThemeToggle.vue'
import SalesTab from './components/tabs/SalesTab.vue'
import RegionTab from './components/tabs/RegionTab.vue'
import UserTab from './components/tabs/UserTab.vue'
import MarketingTab from './components/tabs/MarketingTab.vue'
import SupplyTab from './components/tabs/SupplyTab.vue'
import ProductTab from './components/tabs/ProductTab.vue'

const activeTab = ref('sales')
</script>
