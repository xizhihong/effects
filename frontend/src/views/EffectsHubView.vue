<script setup>
import LayoutRenderer from '../components/layouts/LayoutRenderer.vue';
import EffectCard from '../components/effects/EffectCard.vue';
import { sectionsRegistry } from '../data/sections';
import { useEffectsStore } from '../stores/effects';

const effectsStore = useEffectsStore();
</script>

<template>
  <div class="hub">
    <section class="hero surface-panel">
      <div>
        <p class="eyebrow">营销站 · 特效聚合页</p>
        <h1 class="headline">42 种视频特效，一行展示 4-5 个卡片，点击即跳转。</h1>
        <p class="subcopy">
          本页聚合所有特效，支持 SEO 友好的 URL（如 https://XXX.ai/video-effects/ai-hug-generator），并在顶部说明当前可用特效数量与布局说明。
        </p>
      </div>
      <RouterLink class="btn" to="/generator">前往生成按钮（https://XXX.ai/video-effects）</RouterLink>
    </section>

    <div class="effects-grid">
      <EffectCard v-for="effect in effectsStore.effects" :key="effect.slug" :effect="effect" />
    </div>

    <LayoutRenderer :sections="sectionsRegistry.hub" />
  </div>
</template>

<style scoped>
.effects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
}
</style>
