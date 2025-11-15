<script setup>
defineProps({
  section: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <section class="section steps">
    <div class="steps-head">
      <p class="eyebrow">{{ section.eyebrow }}</p>
      <h2 class="headline">{{ section.title }}</h2>
      <p class="subcopy">
        {{ section.copy }}
      </p>
    </div>

    <div class="steps-grid">
      <article v-for="(step, index) in section.steps" :key="step.title" class="step-card card">
        <div class="step-number">{{ index + 1 }}</div>
        <div>
          <h3>{{ step.title }}</h3>
          <p>{{ step.description }}</p>
        </div>
      </article>
    </div>

    <img v-if="section.media" :src="section.media" class="steps-media" :alt="section.title" loading="lazy" />
  </section>
</template>

<style scoped>
.steps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}

.step-card {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.step-number {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: linear-gradient(135deg, var(--accent-secondary), var(--accent-primary));
  display: grid;
  place-items: center;
  font-weight: 600;
}

.steps-media {
  width: 100%;
  border-radius: 24px;
  margin-top: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
}
</style>
