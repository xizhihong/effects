<script setup lang="ts">
import AppFooter from './AppFooter.vue'
import AppHeader from './AppHeader.vue'
</script>

<template>
  <div class="app-shell">
    <AppHeader />
    <main class="app-main">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: radial-gradient(circle at top, rgba(67, 56, 202, 0.08), transparent), #05070c;
  color: #f8fafc;
}

.app-main {
  flex: 1;
  width: min(1200px, 92vw);
  margin: 0 auto;
  padding: 2.5rem 0 3rem;
}

@media (max-width: 768px) {
  .app-main {
    width: 94vw;
    padding: 1.5rem 0 2rem;
  }
}
</style>
