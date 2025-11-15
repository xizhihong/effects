<script setup>
import { computed, ref } from 'vue';
import { useEffectsStore } from '../../stores/effects';

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  selected: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['close', 'select']);

const search = ref('');
const effectsStore = useEffectsStore();

const filtered = computed(() =>
  effectsStore.effects.filter((effect) =>
    effect.name.toLowerCase().includes(search.value.trim().toLowerCase()),
  ),
);

const handleSelect = (slug) => {
  emit('select', slug);
  emit('close');
};
</script>

<template>
  <teleport to="body">
    <div v-if="open" class="overlay" @click.self="emit('close')">
      <div class="modal">
        <header>
          <div>
            <p class="eyebrow">特效切换</p>
            <h3>选择不同特效体验</h3>
          </div>
          <button class="ghost" @click="emit('close')">Close</button>
        </header>

        <input v-model="search" class="search" type="search" placeholder="搜索 Hug / Focus / Neon..." />

        <div class="grid">
          <button
            v-for="effect in filtered"
            :key="effect.slug"
            class="effect-card"
            :class="{ active: selected === effect.slug }"
            @click="handleSelect(effect.slug)"
          >
            <div class="thumb" :style="{ backgroundImage: `url(${effect.cover})` }"></div>
            <div class="info">
              <div class="chip">{{ effect.category }}</div>
              <strong>{{ effect.name }}</strong>
              <p>{{ effect.tagline }}</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: grid;
  place-items: center;
  z-index: 90;
  padding: 1rem;
}

.modal {
  width: min(900px, 100%);
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: rgba(10, 12, 19, 0.98);
  border-radius: 28px;
  padding: 1.75rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.ghost {
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: transparent;
  color: #fff;
  padding: 0.4rem 1rem;
  cursor: pointer;
}

.search {
  width: 100%;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  padding: 0.65rem 1rem;
  background: rgba(255, 255, 255, 0.04);
  color: #fff;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
  overflow-y: auto;
  padding-right: 0.25rem;
}

.effect-card {
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(20, 22, 30, 0.9);
  padding: 0;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  text-align: left;
}

.effect-card.active {
  border-color: var(--accent-secondary);
}

.thumb {
  height: 140px;
  background-size: cover;
  background-position: center;
}

.info {
  padding: 1rem;
}

.info p {
  margin: 0.3rem 0 0;
  color: var(--text-dim);
  font-size: 0.85rem;
}
</style>
