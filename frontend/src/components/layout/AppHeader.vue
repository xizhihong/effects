<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AuthModal from '../common/AuthModal.vue'
import { effectsCatalog } from '../../data/effects'
import { useAuthStore } from '../../stores/auth'

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()

const loginOpen = ref(false)
const registerOpen = ref(false)
const effectMenu = ref(false)
const avatarMenu = ref(false)

const limitedNavEffects = computed(() => effectsCatalog.slice(0, 5))

watch(
  () => route.fullPath,
  () => {
    effectMenu.value = false
    avatarMenu.value = false
  },
)

const goTo = (path: string) => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  router.push(path)
}

const openExternal = (url: string) => {
  window.open(url, '_blank')
}

const openMailClient = (email: string, subject: string) => {
  const encodedSubject = encodeURIComponent(subject)
  window.open(`mailto:${email}?subject=${encodedSubject}`, '_blank')
}

const openEffect = (slug: string) => {
  goTo(`/video-effects/${slug}`)
}

const handleLoginEmail = async ({ email }: { email: string }) => {
  await auth.login(email, 'email')
  loginOpen.value = false
}

const handleRegisterEmail = async ({ email }: { email: string }) => {
  await auth.register(email)
  registerOpen.value = false
}

const handleGoogleLogin = async () => {
  await auth.login('google-user@xxx.ai', 'google')
  loginOpen.value = false
  registerOpen.value = false
}

const avatarOptions = [
  { label: 'My Creation', action: () => goTo('/my-creation') },
  { label: 'Billing', action: () => goTo('/billing') },
  { label: 'Contact Us', action: () => openMailClient('hello@xxx.ai', 'Effects Inquiry') },
  { label: 'Logout', action: () => auth.logout() },
]
</script>

<template>
    <header class="header">
      <div class="logo" @click="openExternal('https://XXX.ai/')">
      <div class="glyph">FX</div>
      <div>
        <p>XXX.ai</p>
        <small>Video Effects OS</small>
      </div>
    </div>

    <nav class="nav">
      <button class="nav-link" @click="openEffect('ai-hug-generator')">AI Hug Generator</button>
      <button class="nav-link" @click="openEffect('ai-kissing-video-generator')">AI Kissing Video Generator</button>
      <div class="nav-link dropdown" @mouseenter="effectMenu = true" @mouseleave="effectMenu = false">
        <span>Effects</span>
        <svg width="12" height="12" viewBox="0 0 20 20" fill="none">
          <path d="M5 7l5 5 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
        </svg>
        <div v-if="effectMenu" class="dropdown-menu">
          <button v-for="effect in limitedNavEffects" :key="effect.slug" @click="openEffect(effect.slug)">
            <img :src="effect.thumbnail" :alt="effect.name" />
            <div>
              <p>{{ effect.name }}</p>
              <small>{{ effect.tagline }}</small>
            </div>
          </button>
          <button class="view-all" @click="goTo('/video-effects')">View all {{ effectsCatalog.length }} effects</button>
        </div>
      </div>
        <button class="nav-link" @click="openExternal('https://XXX.ai/pricing')">Upgrade</button>
    </nav>

    <div class="actions">
      <template v-if="!auth.isAuthenticated">
        <button class="ghost" @click="loginOpen = true">Login</button>
        <button class="primary" @click="registerOpen = true">Start for Free</button>
      </template>
      <div v-else class="avatar-wrapper" @click="avatarMenu = !avatarMenu">
        <img :src="auth.avatarFallback" alt="User" />
        <div v-if="avatarMenu" class="dropdown-menu avatar-menu">
          <button v-for="item in avatarOptions" :key="item.label" @click.stop="item.action">
            {{ item.label }}
          </button>
        </div>
      </div>
    </div>
  </header>

  <AuthModal mode="login" :open="loginOpen" @close="loginOpen = false" @email="handleLoginEmail" @google="handleGoogleLogin" />
  <AuthModal
    mode="register"
    :open="registerOpen"
    @close="registerOpen = false"
    @email="handleRegisterEmail"
    @google="handleGoogleLogin"
  />
</template>

<style scoped>
.header {
  width: min(1200px, 92vw);
  margin: 1.2rem auto 0;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 1rem;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
}

.glyph {
  width: 44px;
  height: 44px;
  border-radius: 14px;
  background: linear-gradient(120deg, #6366f1, #a855f7);
  display: grid;
  place-items: center;
  font-weight: 700;
}

.logo small {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.75rem;
}

.nav {
  display: flex;
  justify-content: center;
  gap: 0.8rem;
  position: relative;
}

.nav-link {
  background: transparent;
  border: none;
  color: rgba(248, 250, 252, 0.8);
  font-weight: 500;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.4rem 0.65rem;
  border-radius: 999px;
  transition: background 0.2s ease, color 0.2s ease;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
}

.dropdown {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 120%;
  left: 0;
  min-width: 320px;
  padding: 0.75rem;
  background: #0f1117;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 25px 60px rgba(5, 7, 12, 0.45);
  z-index: 50;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.dropdown-menu button {
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  text-align: left;
  color: inherit;
  padding: 0.65rem;
  border-radius: 14px;
  transition: background 0.2s ease;
  cursor: pointer;
}

.dropdown-menu button:hover {
  background: rgba(255, 255, 255, 0.05);
}

.dropdown-menu img {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  object-fit: cover;
}

.dropdown-menu small {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.8rem;
}

.dropdown-menu .view-all {
  justify-content: center;
  border: 1px dashed rgba(255, 255, 255, 0.2);
  margin-top: 0.3rem;
}

.actions {
  display: flex;
  gap: 0.6rem;
  justify-content: flex-end;
}

.ghost,
.primary {
  border-radius: 999px;
  padding: 0.55rem 1.4rem;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid transparent;
}

.ghost {
  background: transparent;
  border-color: rgba(255, 255, 255, 0.25);
  color: #fff;
}

.primary {
  border: none;
  background: linear-gradient(120deg, #22d3ee, #6366f1);
  color: #05070c;
}

.avatar-wrapper {
  position: relative;
}

.avatar-wrapper img {
  width: 44px;
  height: 44px;
  border-radius: 999px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
}

.avatar-menu {
  right: 0;
  left: auto;
  min-width: 220px;
}

@media (max-width: 960px) {
  .nav {
    display: none;
  }

  .header {
    grid-template-columns: auto auto;
  }
}
</style>
