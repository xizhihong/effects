<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';
import { useEffectsStore } from '../../stores/effects';

const emit = defineEmits(['open-auth']);
const router = useRouter();
const authStore = useAuthStore();
const effectsStore = useEffectsStore();

const showEffectsMenu = ref(false);
const showProfileMenu = ref(false);

const featuredEffects = computed(() => effectsStore.effects.slice(0, 6));

const centerLinks = [
  { label: 'AI Hug Generator', slug: 'ai-hug-generator' },
  { label: 'AI Kissing Video Generator', slug: 'ai-kissing-video-generator' },
];

const handleLogoClick = () => {
  window.open('https://XXX.ai/', '_blank');
};

const navigateToEffect = (slug) => {
  router.push(`/video-effects/${slug}`);
};

const goToHub = () => {
  router.push('/video-effects');
};

const goToGenerator = () => {
  router.push('/generator');
};

const openPricing = () => {
  window.open('https://XXX.ai/pricing', '_blank');
};

const openModal = (mode) => {
  emit('open-auth', mode);
};

const handleMyCreation = () => {
  router.push('/my-creation');
};

const handleBilling = () => {
  window.open('https://XXX.ai/billing', '_blank');
};

const handleContact = () => {
  window.open('mailto:effects@xxx.ai?subject=Talk%20to%20Video%20Effects', '_blank');
};

const handleLogout = () => {
  authStore.logout();
  showProfileMenu.value = false;
};
</script>

<template>
  <header class="nav-shell">
    <div class="nav-inner">
      <button class="logo-mark" @click="handleLogoClick">
        <span class="logo-icon">◆</span>
        <div>
          <strong>Pulse Effects</strong>
          <p>video intelligence</p>
        </div>
      </button>

      <nav class="nav-links">
        <button
          v-for="link in centerLinks"
          :key="link.slug"
          class="nav-link"
          @click="navigateToEffect(link.slug)"
        >
          {{ link.label }}
        </button>

        <div class="nav-link dropdown" @mouseenter="showEffectsMenu = true" @mouseleave="showEffectsMenu = false">
          <button type="button">
            Effects
            <span class="chevron">⌄</span>
          </button>
          <div v-if="showEffectsMenu" class="dropdown-panel">
            <div class="dropdown-heading">
              <p>Switch between romance, cinematic, and creator presets.</p>
              <button class="pill-link" @click="goToHub">View all</button>
            </div>
            <div class="dropdown-grid">
              <button
                v-for="effect in featuredEffects"
                :key="effect.slug"
                class="dropdown-card"
                @click="navigateToEffect(effect.slug)"
              >
                <div class="chip">{{ effect.category }}</div>
                <strong>{{ effect.name }}</strong>
                <p>{{ effect.tagline }}</p>
              </button>
            </div>
          </div>
        </div>

        <button class="nav-link" @click="openPricing">Upgrade</button>
      </nav>

      <div class="nav-actions">
        <button class="ghost" @click="goToGenerator">
          Video Effects
        </button>

        <template v-if="!authStore.isAuthenticated">
          <button class="ghost" @click="openModal('login')">Login</button>
          <button class="btn" @click="openModal('register')">Start for Free</button>
        </template>

        <div v-else class="profile-wrap" @mouseenter="showProfileMenu = true" @mouseleave="showProfileMenu = false">
          <img :src="authStore.avatar" :alt="authStore.profileName" class="avatar" />
          <div class="profile-meta">
            <small>{{ authStore.profileName }}</small>
            <span>{{ authStore.authMethod === 'google' ? 'Google 登录' : '邮箱登录' }}</span>
          </div>
          <div v-if="showProfileMenu" class="profile-menu">
            <button @click="handleMyCreation">My Creation</button>
            <button @click="handleBilling">Billing</button>
            <button @click="handleContact">Contact Us</button>
            <button @click="handleLogout">Logout</button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.nav-shell {
  position: sticky;
  top: 0;
  z-index: 50;
  backdrop-filter: blur(18px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  background: rgba(5, 6, 10, 0.9);
}

.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem clamp(1.25rem, 4vw, 4rem);
  gap: 1rem;
}

.logo-mark {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border: none;
  background: transparent;
  color: #fff;
  cursor: pointer;
}

.logo-icon {
  width: 42px;
  height: 42px;
  border-radius: 14px;
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-hot));
  display: grid;
  place-items: center;
  font-size: 1.2rem;
}

.logo-mark strong {
  display: block;
  font-size: 1rem;
  letter-spacing: 0.04em;
}

.logo-mark p {
  margin: 0;
  font-size: 0.75rem;
  text-transform: uppercase;
  color: var(--text-dim);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 1.2rem;
}

.nav-link {
  background: transparent;
  border: none;
  color: #fff;
  font-size: 0.95rem;
  cursor: pointer;
  letter-spacing: 0.02em;
}

.nav-link:hover {
  color: var(--accent-secondary);
}

.dropdown {
  position: relative;
}

.dropdown-panel {
  position: absolute;
  top: 140%;
  left: 50%;
  transform: translateX(-50%);
  min-width: 420px;
  background: rgba(8, 10, 16, 0.97);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 18px;
  padding: 1rem;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.35);
}

.dropdown-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--text-dim);
  font-size: 0.85rem;
  gap: 0.5rem;
}

.pill-link {
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: transparent;
  color: #fff;
  padding: 0.35rem 0.9rem;
  cursor: pointer;
}

.dropdown-grid {
  margin-top: 0.75rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.6rem;
}

.dropdown-card {
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(20, 22, 30, 0.9);
  padding: 0.9rem;
  text-align: left;
  color: #fff;
  cursor: pointer;
}

.dropdown-card p {
  margin: 0.35rem 0 0;
  font-size: 0.8rem;
  color: var(--text-dim);
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.ghost {
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: transparent;
  color: #fff;
  padding: 0.55rem 1.2rem;
  font-weight: 500;
  cursor: pointer;
}

.profile-wrap {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.35rem 0.8rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  position: relative;
}

.avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.profile-meta {
  display: flex;
  flex-direction: column;
  line-height: 1.1;
}

.profile-meta small {
  font-weight: 600;
}

.profile-meta span {
  font-size: 0.75rem;
  color: var(--text-dim);
}

.profile-menu {
  position: absolute;
  top: 110%;
  right: 0;
  display: flex;
  flex-direction: column;
  background: rgba(12, 14, 22, 0.97);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 0.5rem;
  min-width: 180px;
  z-index: 20;
}

.profile-menu button {
  background: none;
  border: none;
  color: #fff;
  text-align: left;
  padding: 0.45rem 0.8rem;
  border-radius: 10px;
  cursor: pointer;
  font-size: 0.9rem;
}

.profile-menu button:hover {
  background: rgba(255, 255, 255, 0.08);
}

@media (max-width: 1024px) {
  .nav-links {
    display: none;
  }
}

@media (max-width: 640px) {
  .nav-actions {
    gap: 0.4rem;
  }

  .ghost {
    display: none;
  }

  .logo-mark strong {
    font-size: 0.9rem;
  }
}
</style>
