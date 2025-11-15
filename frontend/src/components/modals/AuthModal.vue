<script setup>
import { reactive, ref } from 'vue';
import { useAuthStore } from '../../stores/auth';

const props = defineProps({
  mode: {
    type: String,
    default: 'login',
  },
});

const emit = defineEmits(['close']);
const authStore = useAuthStore();
const loading = ref(false);
const form = reactive({
  email: '',
  name: '',
  password: '',
});

const submit = () => {
  if (!form.email) return;
  loading.value = true;
  setTimeout(() => {
    if (props.mode === 'register') {
      authStore.loginWithEmail({ email: form.email, name: form.name });
    } else {
      authStore.loginWithEmail({ email: form.email, name: form.name });
    }
    loading.value = false;
    emit('close');
  }, 800);
};

const handleGoogle = () => {
  loading.value = true;
  setTimeout(() => {
    authStore.loginWithGoogle({
      email: form.email || 'creator@xxx.ai',
      name: form.name || 'Pulse Creator',
      avatarUrl: 'https://unavatar.io/google/ai',
    });
    loading.value = false;
    emit('close');
  }, 600);
};
</script>

<template>
  <div class="overlay" @click.self="emit('close')">
    <div class="modal">
      <header>
        <p class="eyebrow">{{ mode === 'register' ? 'Start for Free' : 'Login' }}</p>
        <h2>{{ mode === 'register' ? 'Create your Pulse studio' : 'Welcome back' }}</h2>
        <p>
          支持邮箱登录和谷歌登录，登录后可访问 My Creation、Billing、视频特效生成页。
        </p>
      </header>

      <form @submit.prevent="submit" class="form">
        <label>
          <span>邮箱</span>
          <input v-model="form.email" type="email" placeholder="creator@studio.com" required />
        </label>

        <label>
          <span>昵称 / 品牌名</span>
          <input v-model="form.name" type="text" placeholder="Your studio name" />
        </label>

        <label v-if="mode === 'register'">
          <span>密码</span>
          <input v-model="form.password" type="password" placeholder="••••••••" minlength="6" />
        </label>

        <button class="btn" type="submit" :disabled="loading">
          {{ mode === 'register' ? 'Create account' : 'Login' }}
        </button>
      </form>

      <div class="divider">
        <span>or continue with</span>
      </div>

      <button class="google-btn" @click="handleGoogle" :disabled="loading">
        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" />
        Google
      </button>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: grid;
  place-items: center;
  z-index: 100;
  padding: 1rem;
}

.modal {
  width: min(420px, 100%);
  background: rgba(9, 11, 18, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  padding: 2rem;
  color: #fff;
  box-shadow: 0 40px 80px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(18px);
}

header p {
  color: var(--text-dim);
}

header h2 {
  margin: 0.4rem 0;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}

label {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  font-size: 0.9rem;
  color: var(--text-dim);
}

input {
  padding: 0.65rem 0.9rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.02);
  color: #fff;
  font-size: 1rem;
}

.divider {
  margin: 1.5rem 0 1rem;
  text-align: center;
  color: var(--text-dim);
  font-size: 0.85rem;
}

.google-btn {
  width: 100%;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: transparent;
  color: #fff;
  padding: 0.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.google-btn img {
  width: 20px;
  height: 20px;
}
</style>
