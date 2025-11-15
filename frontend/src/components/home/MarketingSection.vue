<script setup lang="ts">
import type { MarketingSection } from '../../types/content'

defineProps<{
  section: MarketingSection
}>()
</script>

<template>
  <section class="section" :class="section.layout">
    <div class="headline">
      <p class="eyebrow">{{ section.eyebrow }}</p>
      <h2>{{ section.title }}</h2>
      <p class="description">{{ section.description }}</p>
      <button v-if="section.cta" class="primary" @click="$router.push(section.cta.href)">
        {{ section.cta.label }}
      </button>
    </div>

    <div v-if="section.layout === 'stacked'" class="stacked">
      <figure>
        <img :src="section.media.src" :alt="section.media.alt" />
      </figure>
      <ul>
        <li v-for="item in section.highlights" :key="item.title">
          <h4>{{ item.title }}</h4>
          <p>{{ item.description }}</p>
        </li>
      </ul>
    </div>

    <div v-else-if="section.layout === 'split'" class="split">
      <figure>
        <component :is="section.media.type === 'video' ? 'video' : 'img'" :src="section.media.src" autoplay muted loop playsinline />
      </figure>
      <ul>
        <li v-for="item in section.highlights" :key="item.title">
          <h4>{{ item.title }}</h4>
          <p>{{ item.description }}</p>
        </li>
      </ul>
    </div>

    <div v-else-if="section.layout === 'gallery'" class="gallery">
      <figure>
        <img :src="section.media.src" :alt="section.media.alt" />
      </figure>
      <div class="grid">
        <article v-for="item in section.grid" :key="item.title">
          <img :src="item.image" :alt="item.title" />
          <div>
            <h4>{{ item.title }}</h4>
            <p>
              <span v-for="badge in item.badges" :key="badge">{{ badge }}</span>
            </p>
          </div>
        </article>
      </div>
    </div>

    <div v-else class="steps">
      <figure>
        <img :src="section.media.src" :alt="section.media.alt" />
      </figure>
      <ol>
        <li v-for="item in section.steps" :key="item.title">
          <span>{{ item.badge }}</span>
          <div>
            <h4>{{ item.title }}</h4>
            <p>{{ item.description }}</p>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.section {
  margin: 3.5rem 0;
  padding: 2.4rem;
  border-radius: 32px;
  background: rgba(15, 17, 23, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(12px);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.headline h2 {
  font-size: clamp(2rem, 4vw, 3rem);
  margin: 0.5rem 0;
}

.headline .description {
  color: rgba(255, 255, 255, 0.75);
  max-width: 640px;
}

.primary {
  margin-top: 1rem;
  align-self: flex-start;
  border: none;
  border-radius: 999px;
  padding: 0.75rem 1.4rem;
  background: linear-gradient(120deg, #fcd34d, #f472b6);
  color: #05070c;
  font-weight: 600;
  cursor: pointer;
}

.stacked,
.split,
.gallery,
.steps {
  display: grid;
  gap: 1.5rem;
}

.stacked {
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}

.stacked figure,
.split figure,
.gallery figure,
.steps figure {
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

figure img,
figure video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.stacked ul,
.split ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.stacked li,
.split li {
  padding: 1rem;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.03);
}

.gallery {
  grid-template-columns: 1fr 1fr;
}

.gallery .grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
}

.gallery article {
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.04);
  overflow: hidden;
}

.gallery article img {
  width: 100%;
  height: 140px;
  object-fit: cover;
}

.gallery article div {
  padding: 0.8rem;
}

.gallery span {
  background: rgba(255, 255, 255, 0.08);
  border-radius: 999px;
  padding: 0.2rem 0.7rem;
  margin-right: 0.3rem;
  font-size: 0.75rem;
}

.steps {
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}

.steps ol {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.steps li {
  display: flex;
  gap: 0.9rem;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 18px;
  padding: 0.9rem;
}

.steps span {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: rgba(99, 102, 241, 0.2);
  display: grid;
  place-items: center;
  font-weight: 600;
}

@media (max-width: 900px) {
  .section {
    padding: 1.6rem;
  }

  .gallery {
    grid-template-columns: 1fr;
  }
}
</style>
