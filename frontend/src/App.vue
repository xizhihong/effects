<script setup>
import { ref } from 'vue';
import { RouterView } from 'vue-router';
import GlobalNav from './components/navigation/GlobalNav.vue';
import SiteFooter from './components/common/SiteFooter.vue';
import AuthModal from './components/modals/AuthModal.vue';

const showAuthModal = ref(false);
const authMode = ref('login');

const openAuth = (mode = 'login') => {
  authMode.value = mode;
  showAuthModal.value = true;
};

const closeAuth = () => {
  showAuthModal.value = false;
};
</script>

<template>
  <div class="app-shell">
    <GlobalNav @open-auth="openAuth" />
    <main class="page-container">
      <RouterView />
    </main>
    <SiteFooter />

    <AuthModal
      v-if="showAuthModal"
      :mode="authMode"
      @close="closeAuth"
    />
  </div>
</template>
