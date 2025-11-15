<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import UploadZone from '../components/common/UploadZone.vue'
import MarketingSection from '../components/home/MarketingSection.vue'
import { fetchEffects, fetchMarketingSections } from '../services/api'
import type { Effect, MarketingSection as MarketingSectionType } from '../types/content'

const effects = ref<Effect[]>([])
const sections = ref<MarketingSectionType[]>([])
const selectedEffect = ref<Effect | null>(null)
const files = ref<File[]>([])
const showSwitcher = ref(false)
const isGenerating = ref(false)
const generatedVideo = ref('')

onMounted(async () => {
  const [effectData, marketingData] = await Promise.all([fetchEffects(), fetchMarketingSections()])
  effects.value = effectData
  const firstEffect = effectData[0]
  if (firstEffect) {
    selectedEffect.value = firstEffect
  }
  sections.value = marketingData
})

const canGenerate = computed(() => files.value.length > 0 && !isGenerating.value)

const startGeneration = () => {
  if (!canGenerate.value || !selectedEffect.value) return
  isGenerating.value = true
  setTimeout(() => {
    generatedVideo.value = selectedEffect.value?.videoDemo ?? ''
    isGenerating.value = false
  }, 2000)
}

const switchEffect = (effect: Effect) => {
  selectedEffect.value = effect
  showSwitcher.value = false
}
</script>

<template>
  <div class="page">
    <section class="generator">
      <div class="left">
        <p class="eyebrow">功能生成区域</p>
        <h1>{{ selectedEffect?.name ?? '加载中' }}</h1>
        <p>{{ selectedEffect?.description }}</p>

        <button class="switcher" @click="showSwitcher = true">特效切换</button>

        <UploadZone :files="files" @update="files = $event" />

        <button class="generate" :disabled="!canGenerate" @click="startGeneration">
          {{ canGenerate ? (isGenerating ? '生成中...' : '生成视频') : '上传图片后生成' }}
        </button>

        <div class="tips">
          <p>支持 JPG、PNG、JPEG、WebP，最大 5MB，最多 3 张，可参考 pollo.ai 工作台。</p>
          <button class="link" @click="$router.push('/video-effects')">跳转至特效聚合页</button>
        </div>
      </div>

      <div class="right">
        <div v-if="generatedVideo" class="player">
          <video :src="generatedVideo" autoplay controls loop></video>
          <p>生成完成：{{ selectedEffect?.name }}</p>
        </div>
        <div v-else class="placeholder">
          <video autoplay muted loop playsinline src="https://cdn.coverr.co/videos/coverr-colorful-paint-9702/1080p.mp4"></video>
          <p>未生成时展示案例视频</p>
        </div>
      </div>
    </section>

    <section class="core">
      <div>
        <p class="eyebrow">中间核心内容区</p>
        <h2>文案 + 图片 + 视频 + 按钮</h2>
        <p>
          左右分层布局，宣传语和按钮居右，图片居左。按钮跳转 https://XXX.ai/video-effects，顺畅承接营销流量。
        </p>
        <button @click="$router.push('/video-effects')">查看全部特效</button>
      </div>
      <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80" alt="Workflow" />
    </section>

    <MarketingSection v-for="section in sections" :key="section.id" :section="section" />

    <teleport to="body">
      <div v-if="showSwitcher" class="modal" @click.self="showSwitcher = false">
        <div class="panel">
          <header>
            <h3>选择特效</h3>
            <p>点击即切换到对应的生成模版</p>
          </header>
          <div class="grid">
            <button v-for="effect in effects" :key="effect.slug" @click="switchEffect(effect)">
              <img :src="effect.thumbnail" :alt="effect.name" />
              <div>
                <h4>{{ effect.name }}</h4>
                <small>{{ effect.tagline }}</small>
              </div>
            </button>
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.generator {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 2rem;
  border-radius: 28px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(15, 17, 23, 0.85);
}

.switcher {
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: transparent;
  color: #fff;
  padding: 0.5rem 1.2rem;
  cursor: pointer;
  margin-bottom: 1rem;
}

.generate {
  margin-top: 1.2rem;
  width: 100%;
  border-radius: 999px;
  padding: 0.9rem;
  border: none;
  font-weight: 600;
  cursor: pointer;
  background: linear-gradient(120deg, #22d3ee, #6366f1);
  color: #05070c;
}

.generate:disabled {
  background: rgba(255, 255, 255, 0.2);
  color: rgba(5, 7, 12, 0.4);
  cursor: not-allowed;
}

.tips {
  margin-top: 1rem;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 16px;
  padding: 1rem;
}

.link {
  border: none;
  background: transparent;
  color: #22d3ee;
  cursor: pointer;
  margin-top: 0.4rem;
}

.right {
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(0, 0, 0, 0.3);
  min-height: 360px;
  display: grid;
  place-items: center;
  padding: 1rem;
}

.player video,
.placeholder video {
  width: 100%;
  border-radius: 18px;
}

.core {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
  padding: 2rem;
  border-radius: 28px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(15, 23, 42, 0.8);
  align-items: center;
}

.core img {
  width: 100%;
  border-radius: 20px;
}

button {
  cursor: pointer;
}

.modal {
  position: fixed;
  inset: 0;
  background: rgba(5, 7, 12, 0.7);
  display: grid;
  place-items: center;
  z-index: 80;
}

.panel {
  width: min(720px, 92vw);
  max-height: 86vh;
  overflow: auto;
  background: #0f1117;
  border-radius: 24px;
  padding: 1.8rem;
}

.panel .grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.panel button {
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.02);
  padding: 0.9rem;
  display: flex;
  gap: 0.75rem;
  text-align: left;
  color: #fff;
}

.panel img {
  width: 72px;
  height: 72px;
  border-radius: 16px;
  object-fit: cover;
}
</style>
