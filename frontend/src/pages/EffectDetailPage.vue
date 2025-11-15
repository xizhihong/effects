<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import EffectCard from '../components/common/EffectCard.vue'
import { fetchEffectBySlug, fetchEffects } from '../services/api'
import type { Effect } from '../types/content'

const route = useRoute()
const effect = ref<Effect | undefined>()
const related = ref<Effect[]>([])

onMounted(async () => {
  const slug = route.params.slug as string
  effect.value = await fetchEffectBySlug(slug)
  const all = await fetchEffects()
  related.value = all.filter((item) => item.slug !== slug).slice(0, 3)
})
</script>

<template>
  <div v-if="effect" class="page">
    <section class="hero">
      <div>
        <p class="eyebrow">{{ effect.difficulty }} • {{ effect.processingTime }}</p>
        <h1>{{ effect.name }}</h1>
        <p>{{ effect.description }}</p>
        <div class="meta">
          <span>Categories: {{ effect.categories.join(', ') }}</span>
          <span>Credits: {{ effect.creditsCost }}</span>
        </div>
        <button @click="$router.push('/video-effects/studio')">进入功能生成页</button>
      </div>
      <figure>
        <video :src="effect.videoDemo" autoplay muted loop playsinline></video>
      </figure>
    </section>

    <section class="content">
      <div>
        <h2>使用步骤</h2>
        <ol>
          <li>上传 1-3 张 JPG/PNG/WebP 图片（最大 5MB）。</li>
          <li>点击「特效切换」选择 {{ effect.name }}，可在弹窗中自由切换其他模版。</li>
          <li>配置镜头运动、光效、色彩以及抱团距离等参数。</li>
          <li>上传图片后生成按钮亮起，一键生成视频，下载 mp4 和 GIF。</li>
        </ol>
      </div>
      <div class="cta">
        <p>按钮统一跳转至 https://XXX.ai/video-effects，方便立即浏览更多模版。</p>
        <button @click="$router.push('/video-effects')">查看更多特效</button>
      </div>
    </section>

    <section class="related">
      <h3>相关特效</h3>
      <div class="grid">
        <EffectCard v-for="item in related" :key="item.slug" :effect="item" />
      </div>
    </section>
  </div>
  <p v-else>Loading effect...</p>
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
  padding: 2rem;
  border-radius: 28px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(15, 17, 23, 0.85);
}

button {
  border-radius: 999px;
  border: none;
  padding: 0.75rem 1.4rem;
  font-weight: 600;
  background: linear-gradient(120deg, #22d3ee, #6366f1);
  color: #05070c;
  cursor: pointer;
}

.hero figure {
  border-radius: 20px;
  overflow: hidden;
}

video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
}

ol {
  margin: 0;
  padding-left: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.cta {
  border-radius: 20px;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.04);
}

.related .grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
}
</style>
