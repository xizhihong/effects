<script setup>
import { computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useEffectsStore } from '../stores/effects';

const props = defineProps({
  slug: {
    type: String,
    required: false,
  },
});

const route = useRoute();
const router = useRouter();
const effectsStore = useEffectsStore();

const effect = computed(() => effectsStore.getEffectBySlug(props.slug || route.params.slug));

watch(
  () => route.params.slug,
  (newSlug) => {
    if (!effectsStore.getEffectBySlug(newSlug)) {
      router.replace('/video-effects');
    }
  },
);
</script>

<template>
  <div v-if="effect" class="detail">
    <section class="hero surface-panel">
      <div>
        <p class="eyebrow">{{ effect.category }}</p>
        <h1 class="headline">{{ effect.name }}</h1>
        <p class="subcopy">{{ effect.description }}</p>
        <div class="stats">
          <div>
            <span>平均时长</span>
            <strong>{{ effect.stats?.runtime }}</strong>
          </div>
          <div>
            <span>转化增长</span>
            <strong>{{ effect.stats?.conversions }}</strong>
          </div>
          <div>
            <span>积分</span>
            <strong>{{ effect.stats?.credits }}</strong>
          </div>
        </div>
        <div class="cta-row">
          <RouterLink class="btn" to="/generator">立即生成</RouterLink>
          <RouterLink class="btn secondary" to="/video-effects">返回特效聚合页</RouterLink>
        </div>
      </div>
      <img :src="effect.heroImage" :alt="effect.name" loading="lazy" />
    </section>

    <section class="steps surface-panel">
      <p class="eyebrow">功能使用步骤样式</p>
      <h2>参考 pollo.ai 步骤说明</h2>
      <div class="step-grid">
        <article v-for="(step, index) in effect.steps" :key="step" class="card">
          <div class="step-number">{{ index + 1 }}</div>
          <p>{{ step }}</p>
        </article>
      </div>
    </section>

    <section class="media-grid">
      <video controls loop muted :poster="effect.heroImage">
        <source :src="effect.sampleVideo" type="video/mp4" />
      </video>
      <img :src="effect.cover" :alt="effect.name" loading="lazy" />
    </section>
  </div>
  <div v-else class="surface-panel">
    <p>未找到该特效，返回特效列表。</p>
    <RouterLink class="btn" to="/video-effects">返回列表</RouterLink>
  </div>
</template>

<style scoped>
.hero {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.hero img {
  width: 100%;
  border-radius: 24px;
}

.stats {
  display: flex;
  gap: 1.5rem;
  margin: 1.5rem 0;
  flex-wrap: wrap;
}

.stats span {
  display: block;
  color: var(--text-dim);
  font-size: 0.8rem;
}

.steps {
  margin-bottom: 2rem;
}

.step-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.step-number {
  width: 36px;
  height: 36px;
  border-radius: 999px;
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  display: grid;
  place-items: center;
  margin-bottom: 0.5rem;
}

.media-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1rem;
}

.media-grid video,
.media-grid img {
  width: 100%;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}
</style>
