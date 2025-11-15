<script setup>
import { useEffectsStore } from '../../stores/effects';

const effectsStore = useEffectsStore();
</script>

<template>
  <footer class="footer-shell">
    <div class="footer-inner">
      <div class="footer-brand">
        <div class="logo-icon">◆</div>
        <div>
          <strong>Pulse Effects</strong>
          <p>LOGO + 产品名</p>
        </div>
      </div>

      <div class="effects-wrap">
        <button
          v-for="effect in effectsStore.effects"
          :key="effect.slug"
          class="effect-link"
          @click="$router.push(`/video-effects/${effect.slug}`)"
        >
          {{ effect.name }}
        </button>
      </div>

      <p class="copyright">© 2025 XXXXX. All rights reserved.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer-shell {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding: 3rem 1.5rem;
  background: rgba(5, 6, 10, 0.9);
}

.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  text-align: center;
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #fff;
}

.logo-icon {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  display: grid;
  place-items: center;
}

.effects-wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
}

.effect-link {
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 999px;
  padding: 0.4rem 0.9rem;
  background: transparent;
  color: #fff;
  cursor: pointer;
  font-size: 0.85rem;
}

.effect-link:hover {
  border-color: var(--accent-secondary);
}

.copyright {
  color: var(--text-dim);
  margin: 0;
  font-size: 0.85rem;
}
</style>
