<script setup lang="ts">
import { useRouter } from 'vue-router'
import { effectsCatalog } from '../../data/effects'

const router = useRouter()

const goEffect = (slug: string) => {
  router.push(`/video-effects/${slug}`)
}
</script>

<template>
  <footer class="footer">
    <div class="effects">
      <button v-for="effect in effectsCatalog" :key="effect.slug" @click="goEffect(effect.slug)">
        {{ effect.name }}
      </button>
    </div>
    <div class="brand">
      <div class="glyph">FX</div>
      <p>XXX.ai</p>
    </div>
    <p class="copyright">© 2025 XXX.ai. All rights reserved.</p>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding: 2.5rem 0 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  align-items: center;
  text-align: center;
}

.effects {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  justify-content: center;
}

.effects button {
  background: rgba(255, 255, 255, 0.04);
  border: none;
  border-radius: 999px;
  padding: 0.4rem 0.9rem;
  color: rgba(255, 255, 255, 0.85);
  cursor: pointer;
  transition: background 0.2s ease;
}

.effects button:hover {
  background: rgba(255, 255, 255, 0.12);
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
}

.glyph {
  width: 36px;
  height: 36px;
  border-radius: 12px;
  background: linear-gradient(120deg, #6d6afe, #b572f6);
  display: grid;
  place-items: center;
}

.copyright {
  color: rgba(255, 255, 255, 0.55);
  font-size: 0.85rem;
}
</style>
