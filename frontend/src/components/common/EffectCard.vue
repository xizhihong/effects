<script setup lang="ts">
import type { Effect } from '../../types/content'

const props = defineProps<{
  effect: Effect
}>()
</script>

<template>
  <article class="card" @click="$router.push(`/video-effects/${props.effect.slug}`)">
    <figure>
      <img :src="props.effect.cover" :alt="props.effect.name" loading="lazy" />
      <span class="badge">{{ props.effect.difficulty }}</span>
    </figure>
    <div class="content">
      <header>
        <h3>{{ props.effect.name }}</h3>
        <p>{{ props.effect.tagline }}</p>
      </header>
      <ul>
        <li v-for="tag in props.effect.categories" :key="tag">{{ tag }}</li>
      </ul>
      <footer>
        <p>{{ props.effect.processingTime }}</p>
        <strong>{{ props.effect.creditsCost }} credits</strong>
      </footer>
    </div>
  </article>
</template>

<style scoped>
.card {
  background: rgba(15, 17, 23, 0.8);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  cursor: pointer;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.25s ease, border-color 0.25s ease;
}

.card:hover {
  transform: translateY(-6px);
  border-color: rgba(99, 102, 241, 0.4);
}

figure {
  position: relative;
  height: 220px;
  overflow: hidden;
}

figure img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.badge {
  position: absolute;
  top: 14px;
  left: 14px;
  padding: 0.3rem 0.8rem;
  border-radius: 999px;
  background: rgba(5, 7, 12, 0.65);
  font-size: 0.75rem;
}

.content {
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

header h3 {
  margin: 0;
  font-size: 1.25rem;
}

header p {
  margin: 0.2rem 0 0;
  color: rgba(255, 255, 255, 0.7);
}

ul {
  display: flex;
  gap: 0.4rem;
  list-style: none;
  margin: 0;
  padding: 0;
  flex-wrap: wrap;
}

li {
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  font-size: 0.8rem;
}

footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: rgba(255, 255, 255, 0.7);
}
</style>
