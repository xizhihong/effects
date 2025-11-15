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
  <section class="section gallery">
    <div class="gallery-head">
      <div>
        <p class="eyebrow">{{ section.eyebrow }}</p>
        <h2 class="headline">{{ section.title }}</h2>
        <p class="subcopy">{{ section.copy }}</p>
      </div>
      <RouterLink v-if="section.ctaText" :to="section.ctaLink" class="btn">
        {{ section.ctaText }}
      </RouterLink>
    </div>

    <div class="gallery-grid">
      <article v-for="asset in section.assets" :key="asset.title" class="gallery-card">
        <img :src="asset.image" :alt="asset.title" loading="lazy" />
        <div class="card-body">
          <div class="chip">{{ asset.label }}</div>
          <h3>{{ asset.title }}</h3>
          <p>{{ asset.description }}</p>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.gallery-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
}

.gallery-card {
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  overflow: hidden;
  background: rgba(10, 12, 19, 0.9);
}

.gallery-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-body {
  padding: 1rem;
}

.card-body h3 {
  margin: 0.5rem 0 0.25rem;
}

.card-body p {
  margin: 0;
  color: var(--text-dim);
}
</style>
