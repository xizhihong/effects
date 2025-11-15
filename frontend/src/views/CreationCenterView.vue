<script setup>
import { computed } from 'vue';
import LayoutRenderer from '../components/layouts/LayoutRenderer.vue';
import { sectionsRegistry } from '../data/sections';
import { useEffectsStore } from '../stores/effects';

const effectsStore = useEffectsStore();
const sortedCreations = computed(() =>
  [...effectsStore.creations].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  ),
);

const effectSlugMap = computed(() => {
  const map = {};
  effectsStore.effects.forEach((effect) => {
    map[effect.name] = effect.slug;
  });
  return map;
});
</script>

<template>
  <div class="creation">
    <section class="hero surface-panel">
      <div>
        <p class="eyebrow">营销站 · 创作中心页</p>
        <h1 class="headline">生成成功的视频倒序展示，点击即可预览。</h1>
        <p class="subcopy">
          卡片内展示预览视频、效果名称、创建时间、积分消耗以及 CTA（预览 / 下载 / 跳转特效页）。符合“功能展示区域 + 介绍文案 + 一行展示 4-5 个特效”的要求。
        </p>
      </div>
      <RouterLink class="btn" to="/video-effects">继续创作</RouterLink>
    </section>

    <div class="creation-grid">
      <article v-for="item in sortedCreations" :key="item.id" class="creation-card card">
        <video controls muted loop :poster="item.preview">
          <source :src="item.preview" type="video/mp4" />
        </video>
        <div class="card-body">
          <div>
            <div class="chip">{{ item.effect }}</div>
            <h3>{{ item.title }}</h3>
            <p>Credits：{{ item.credits }} · {{ new Date(item.createdAt).toLocaleString() }}</p>
          </div>
            <div class="cta-row">
              <RouterLink class="btn secondary" :to="`/video-effects/${effectSlugMap[item.effect] || ''}`">
                查看特效
              </RouterLink>
              <button class="btn">下载</button>
            </div>
        </div>
      </article>
    </div>

    <LayoutRenderer :sections="sectionsRegistry.creation" />
  </div>
</template>

<style scoped>
.creation-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
}

.creation-card video {
  width: 100%;
  border-radius: 18px;
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.cta-row {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
</style>
