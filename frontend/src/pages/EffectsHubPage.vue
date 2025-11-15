<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import EffectCard from '../components/common/EffectCard.vue'
import MarketingSection from '../components/home/MarketingSection.vue'
import { fetchEffects, fetchMarketingSections } from '../services/api'
import type { Effect, MarketingSection as MarketingSectionType } from '../types/content'

const effects = ref<Effect[]>([])
const sections = ref<MarketingSectionType[]>([])
const query = ref('')
const activeCategory = ref('all')

onMounted(async () => {
  const [effectData, marketingData] = await Promise.all([fetchEffects(), fetchMarketingSections()])
  effects.value = effectData
  sections.value = marketingData
})

const categories = computed(() => {
  const tags = new Set<string>()
  effects.value.forEach((effect) => effect.categories.forEach((tag) => tags.add(tag)))
  return ['all', ...Array.from(tags)]
})

const filteredEffects = computed(() => {
  return effects.value.filter((effect) => {
    const matchesQuery =
      effect.name.toLowerCase().includes(query.value.toLowerCase()) ||
      effect.tagline.toLowerCase().includes(query.value.toLowerCase())
    const matchesCategory = activeCategory.value === 'all' || effect.categories.includes(activeCategory.value)
    return matchesQuery && matchesCategory
  })
})
</script>

<template>
  <div class="page">
    <section class="hero">
      <div>
        <p class="eyebrow">Video Effects Library</p>
        <h1>特效聚合页：{{ effects.length }} 个即用模版</h1>
        <p>
          一行展示 4-5 个特效卡片，点击任意卡片即可跳转至专属特效页，例如 https://XXX.ai/video-effects/ai-hug-generator。介绍文案覆盖全部模版，帮你快速筛选所需风格。
        </p>
        <button class="cta" @click="$router.push('/video-effects/studio')">前往生成器</button>
      </div>
      <figure>
        <img src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1600&q=80" alt="Effects collage" />
      </figure>
    </section>

    <div class="filters">
      <input v-model="query" type="search" placeholder="搜索特效名称或亮点..." />
      <div class="tags">
        <button v-for="category in categories" :key="category" :class="{ active: activeCategory === category }" @click="activeCategory = category">
          {{ category === 'all' ? '全部' : category }}
        </button>
      </div>
    </div>

    <section class="grid">
      <EffectCard v-for="effect in filteredEffects" :key="effect.slug" :effect="effect" />
    </section>

    <section class="core">
      <div>
        <p class="eyebrow">核心内容区</p>
        <h2>宣传语 + 图片 + 视频 + 按钮</h2>
        <p>按钮统一跳转到 https://XXX.ai/video-effects，用来承接所有功能介绍 CTA。</p>
        <button class="cta" @click="$router.push('/video-effects')">合辑页 CTA</button>
      </div>
      <video autoplay loop muted playsinline src="https://cdn.coverr.co/videos/coverr-multicolor-ink-1097/1080p.mp4"></video>
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
  gap: 1.5rem;
  padding: 2.2rem;
  border-radius: 32px;
  background: rgba(15, 23, 42, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.hero figure {
  border-radius: 24px;
  overflow: hidden;
}

.hero img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cta {
  margin-top: 1rem;
  border-radius: 999px;
  border: none;
  padding: 0.75rem 1.4rem;
  background: linear-gradient(120deg, #f472b6, #c084fc);
  color: #05070c;
  font-weight: 600;
  cursor: pointer;
}

.filters {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

input[type='search'] {
  width: 100%;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.02);
  padding: 0.9rem 1.1rem;
  color: #fff;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.tags button {
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: transparent;
  color: #fff;
  padding: 0.4rem 1rem;
  cursor: pointer;
}

.tags button.active {
  background: #22d3ee;
  color: #05070c;
  border-color: transparent;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.3rem;
}

.core {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
  padding: 2rem;
  border-radius: 28px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(15, 17, 23, 0.8);
  align-items: center;
}

.core video {
  width: 100%;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

@media (max-width: 900px) {
  .hero,
  .core {
    padding: 1.6rem;
  }
}
</style>
