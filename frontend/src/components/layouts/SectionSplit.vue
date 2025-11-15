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
  <section class="section split">
    <div class="text surface-panel">
      <p class="eyebrow">{{ section.eyebrow }}</p>
      <h2 class="headline">{{ section.title }}</h2>
      <p class="subcopy">{{ section.copy }}</p>

      <ul>
        <li v-for="bullet in section.bullets" :key="bullet">{{ bullet }}</li>
      </ul>

      <RouterLink v-if="section.ctaText" :to="section.ctaLink" class="btn">
        {{ section.ctaText }}
      </RouterLink>
    </div>
    <div class="media">
      <img :src="section.media" :alt="section.title" loading="lazy" />
    </div>
  </section>
</template>

<style scoped>
.split {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(1rem, 4vw, 3rem);
  align-items: center;
}

ul {
  list-style: none;
  padding: 0;
  margin: 1rem 0 1.5rem;
  color: var(--text-dim);
}

li {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

li::before {
  content: '•';
  color: var(--accent-secondary);
}

.media img {
  width: 100%;
  border-radius: 28px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

@media (max-width: 1024px) {
  .split {
    grid-template-columns: 1fr;
  }
}
</style>
