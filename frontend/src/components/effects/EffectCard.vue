<script setup>
defineProps({
  effect: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <article class="effect-card">
    <div class="thumb" :style="{ backgroundImage: `url(${effect.cover})` }"></div>
    <div class="card-body">
      <div class="chip">{{ effect.category }}</div>
      <div class="title-row">
        <h3>{{ effect.name }}</h3>
        <span>{{ effect.stats?.runtime }}</span>
      </div>
      <p>{{ effect.tagline }}</p>
      <div class="tags">
        <span v-for="tag in effect.tags" :key="tag">{{ tag }}</span>
      </div>
      <RouterLink :to="`/video-effects/${effect.slug}`" class="btn secondary">
        View Effect
      </RouterLink>
    </div>
  </article>
</template>

<style scoped>
.effect-card {
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  overflow: hidden;
  background: rgba(8, 10, 16, 0.9);
  display: flex;
  flex-direction: column;
  height: 100%;
}

.thumb {
  height: 180px;
  background-size: cover;
  background-position: center;
}

.card-body {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
}

.title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
}

.title-row span {
  font-size: 0.8rem;
  color: var(--text-dim);
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  font-size: 0.75rem;
  color: var(--text-dim);
}

.tags span {
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}
</style>
