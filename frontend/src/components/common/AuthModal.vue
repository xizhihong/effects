<script setup lang="ts">
import { computed, ref, watch } from 'vue'

const props = defineProps<{
  mode: 'login' | 'register'
  open: boolean
}>()

const emit = defineEmits<{
  close: []
  email: [payload: { email: string }]
  google: []
}>()

const email = ref('')
const error = ref('')

const title = computed(() => (props.mode === 'login' ? 'Login to XXX.ai' : 'Create your XXX.ai account'))
const ctaLabel = computed(() => (props.mode === 'login' ? 'Continue with Email' : 'Start for Free'))

watch(
  () => props.open,
  (open) => {
    if (open) {
      email.value = ''
      error.value = ''
    }
  },
)

const validateEmail = () => /\S+@\S+\.\S+/.test(email.value)

const submit = () => {
  if (!validateEmail()) {
    error.value = '请输入有效邮箱地址'
    return
  }
  emit('email', { email: email.value })
}
</script>

<template>
  <teleport to="body">
    <div v-if="open" class="modal-overlay" @click.self="emit('close')">
      <div class="modal-card">
        <header>
          <p class="eyebrow">{{ mode === 'login' ? '欢迎回来' : '快速创建账号' }}</p>
          <h3>{{ title }}</h3>
        </header>

        <form class="form" @submit.prevent="submit">
          <label>
            <span>Email</span>
            <input
              v-model="email"
              type="email"
              placeholder="studio@yourdomain.com"
              autocomplete="email"
              required
            />
          </label>
          <p v-if="error" class="error">{{ error }}</p>
          <button type="submit" class="primary">{{ ctaLabel }}</button>
        </form>

        <div class="divider">
          <span />
          <p>or</p>
          <span />
        </div>

        <button class="google" type="button" @click="emit('google')">
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" />
          Continue with Google
        </button>

        <footer>
          <p>
            By continuing you agree to the
            <a href="https://XXX.ai/terms" target="_blank" rel="noreferrer">Terms</a>
            and
            <a href="https://XXX.ai/privacy" target="_blank" rel="noreferrer">Privacy Policy</a>.
          </p>
        </footer>
      </div>
    </div>
  </teleport>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(5, 7, 12, 0.72);
  display: grid;
  place-items: center;
  z-index: 60;
  backdrop-filter: blur(8px);
}

.modal-card {
  width: min(420px, 92vw);
  background: #0f1117;
  border-radius: 24px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 25px 70px rgba(0, 0, 0, 0.45);
}

header h3 {
  margin: 0.1rem 0 0;
  font-size: 1.75rem;
  font-weight: 600;
}

.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 0.75rem;
  color: #a5b4fc;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  margin: 1.5rem 0 1.2rem;
}

label {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  font-size: 0.9rem;
  color: #cbd5f5;
}

input {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 14px;
  padding: 0.75rem 1rem;
  color: #f8fafc;
  font-size: 1rem;
}

.primary {
  background: linear-gradient(120deg, #6d6afe, #a855f7);
  border: none;
  border-radius: 999px;
  padding: 0.85rem 1rem;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 25px rgba(109, 106, 254, 0.35);
}

.divider {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 1.1rem 0;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.85rem;
}

.divider span {
  flex: 1;
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
}

.google {
  width: 100%;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: transparent;
  padding: 0.8rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: #fff;
  cursor: pointer;
}

.google img {
  width: 18px;
  height: 18px;
}

.error {
  color: #f87171;
  font-size: 0.85rem;
}

footer {
  margin-top: 1rem;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
}

footer a {
  color: #a5b4fc;
}
</style>
