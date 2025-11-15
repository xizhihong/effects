<script setup>
import { RouterLink } from 'vue-router';

defineProps({
  section: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <section class="section stacked">
    <p class="eyebrow">{{ section.eyebrow }}</p>
    <div class="stacked-headline">
      <h2 class="headline">{{ section.title }}</h2>
      <p class="subcopy">{{ section.subheading }}</p>
      <div class="cta-row">
        <RouterLink v-if="section.ctaText" :to="section.ctaLink" class="btn">
          {{ section.ctaText }}
        </RouterLink>
        <RouterLink v-if="section.secondaryText" :to="section.secondaryLink" class="btn secondary">
          {{ section.secondaryText }}
        </RouterLink>
      </div>
    </div>

    <div class="stacked-body">
      <div class="grid cols-3">
        <article v-for="card in section.cards" :key="card.title" class="card">
          <h3>{{ card.title }}</h3>
          <p>{{ card.copy }}</p>
        </article>
      </div>
      <div class="media-panel surface-panel">
        <div class="chip">{{ section.media?.label }}</div>
        <img :src="section.media?.url" :alt="section.title" loading="lazy" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.stacked-headline {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.cta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.stacked-body {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1.1fr 0.9fr;
}

.media-panel img {
  margin-top: 1rem;
  border-radius: 18px;
}

@media (max-width: 960px) {
  .stacked-body {
    grid-template-columns: 1fr;
  }
}
</style>
