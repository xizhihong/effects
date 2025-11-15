<script setup>
import { computed } from 'vue';
import LayoutRenderer from '../components/layouts/LayoutRenderer.vue';
import EffectCard from '../components/effects/EffectCard.vue';
import { sectionsRegistry } from '../data/sections';
import { useEffectsStore } from '../stores/effects';

const effectsStore = useEffectsStore();
const heroEffects = computed(() => effectsStore.romanceHeroes.slice(0, 3));
</script>

<template>
  <div class="home">
    <section class="hero surface-panel">
      <div class="hero-copy">
        <p class="eyebrow">营销站首页 · 未登录态</p>
        <h1 class="headline">Midjourney-level video hugs, kisses, and portals—ready for ads.</h1>
        <p class="subcopy">
          点击下方按钮跳转至特效聚合页（https://XXX.ai/video-effects），或快速体验功能生成页。布局采用 pollo.ai 的宣传语 + 特效卡片 + 按钮组合。
        </p>
        <div class="cta-row">
          <RouterLink class="btn" to="/video-effects">特效聚合页</RouterLink>
          <RouterLink class="btn secondary" to="/generator">功能生成页</RouterLink>
        </div>
      </div>

      <div class="hero-media">
        <video
          controls
          loop
          muted
          poster="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1400&q=80"
        >
          <source src="https://cdn.coverr.co/videos/coverr-two-people-dancing-8816/1080p.mp4" type="video/mp4" />
        </video>
      </div>
    </section>

    <div class="hero-effects">
      <EffectCard v-for="effect in heroEffects" :key="effect.slug" :effect="effect" />
    </div>

    <LayoutRenderer :sections="sectionsRegistry.home" />
  </div>
</template>

<style scoped>
.hero {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: clamp(1.5rem, 3vw, 3rem);
  margin-bottom: 2rem;
}

.hero-copy .cta-row {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-top: 1rem;
}

video {
  width: 100%;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.hero-effects {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}
</style>
