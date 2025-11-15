<script setup lang="ts">
import { onMounted, ref } from 'vue'
import EffectCard from '../components/common/EffectCard.vue'
import MarketingSection from '../components/home/MarketingSection.vue'
import { fetchEffects, fetchMarketingSections } from '../services/api'
import type { Effect, MarketingSection as MarketingSectionType } from '../types/content'

const heroEffects = ref<Effect[]>([])
const sections = ref<MarketingSectionType[]>([])

onMounted(async () => {
  const [effectData, marketingData] = await Promise.all([fetchEffects(), fetchMarketingSections()])
  heroEffects.value = effectData.slice(0, 4)
  sections.value = marketingData
})
</script>

<template>
  <div class="page">
    <section class="hero hero-stack">
      <div>
        <p class="eyebrow">Video Effects Marketing Suite</p>
        <h1>Ship pollo.ai style video特效 campaigns in minutes</h1>
        <p>
          Blend AI Hug、AI Kissing、Focus Change、Clone Multiplier等热门模版，打造高转化的营销落地页和创作体验。上传图片、切换特效、立即生成。
        </p>
        <div class="hero-actions">
          <button @click="$router.push('/video-effects')">浏览全部特效</button>
          <button class="secondary" @click="$router.push('/video-effects/studio')">进入生成器</button>
        </div>
        <div class="metrics">
          <div>
            <strong>35+</strong>
            <span>即时特效</span>
          </div>
          <div>
            <strong>58s</strong>
            <span>平均生成时长</span>
          </div>
          <div>
            <strong>98%</strong>
            <span>营销素材转化率</span>
          </div>
        </div>
      </div>
      <div class="media">
        <video autoplay loop muted playsinline src="https://cdn.coverr.co/videos/coverr-light-streaks-9144/1080p.mp4"></video>
        <div class="callout">
          <p>AI Hug + Dream Lens</p>
          <small>Uploaded by pollo.ai creative pod</small>
        </div>
      </div>
    </section>

    <section class="hero hero-split">
      <div class="media-grid">
        <article v-for="effect in heroEffects" :key="effect.slug">
          <img :src="effect.thumbnail" :alt="effect.name" />
          <div>
            <h3>{{ effect.name }}</h3>
            <p>{{ effect.tagline }}</p>
          </div>
        </article>
      </div>
      <div class="copy">
        <p class="eyebrow">多样布局呈现</p>
        <h2>上下分层、左右分层、特效卡片网格、步骤引导一次展示</h2>
        <p>
          根据pollo.ai的特效页面结构，已预置多种内容模块：宣传语+图片+视频组合、按钮跳转到 https://XXX.ai/video-effects，实现营销落地页快速搭建。
        </p>
        <button class="primary" @click="$router.push('/video-effects')">去特效聚合页</button>
      </div>
    </section>

    <section class="grid">
      <EffectCard v-for="effect in heroEffects" :key="effect.slug" :effect="effect" />
    </section>

    <MarketingSection v-for="section in sections" :key="section.id" :section="section" />
  </div>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.hero {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.8rem;
  padding: 2.5rem;
  border-radius: 32px;
  background: linear-gradient(145deg, rgba(15, 23, 42, 0.8), rgba(30, 41, 59, 0.4));
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.hero-stack h1 {
  font-size: clamp(2.4rem, 4vw, 3.6rem);
  margin: 0.4rem 0 1rem;
}

.hero p {
  color: rgba(255, 255, 255, 0.78);
}

.hero-actions {
  display: flex;
  gap: 0.8rem;
  margin: 1.2rem 0 1.6rem;
}

.hero-actions button {
  border-radius: 999px;
  padding: 0.8rem 1.5rem;
  border: none;
  font-weight: 600;
  cursor: pointer;
}

.hero-actions .secondary {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: #fff;
}

.hero-actions button:first-child {
  background: linear-gradient(120deg, #22d3ee, #6366f1);
  color: #05070c;
}

.metrics {
  display: flex;
  gap: 1.2rem;
}

.metrics strong {
  font-size: 2rem;
  display: block;
}

.media {
  position: relative;
}

video {
  width: 100%;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.callout {
  position: absolute;
  bottom: 15px;
  left: 15px;
  background: rgba(5, 7, 12, 0.72);
  border-radius: 18px;
  padding: 0.8rem 1rem;
}

.hero-split {
  align-items: center;
}

.media-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
}

.media-grid article {
  border-radius: 18px;
  padding: 0.9rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.media-grid img {
  width: 100%;
  height: 140px;
  object-fit: cover;
  border-radius: 12px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.3rem;
}

@media (max-width: 900px) {
  .hero {
    padding: 1.6rem;
  }
}
</style>
