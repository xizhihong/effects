<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { fetchEffects, fetchGenerations } from '../services/api'
import type { Effect, Generation } from '../types/content'

const generations = ref<Generation[]>([])
const effects = ref<Record<string, Effect>>({})
const preview = ref<Generation | null>(null)

onMounted(async () => {
  const [genData, effectData] = await Promise.all([fetchGenerations(), fetchEffects()])
  generations.value = genData.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
  effects.value = effectData.reduce<Record<string, Effect>>((map, effect) => {
    map[effect.slug] = effect
    return map
  }, {})
})
</script>

<template>
  <div class="page">
    <section class="hero">
      <div>
        <p class="eyebrow">创作中心</p>
        <h1>生成成功的视频倒序展示</h1>
        <p>一行展示 4-5 个特效，点击视频可预览。介绍文案说明当前已有 {{ generations.length }} 个创作。</p>
      </div>
      <button @click="$router.push('/video-effects')">跳转特效聚合页</button>
    </section>

    <section class="grid">
      <article v-for="item in generations" :key="item.id" @click="preview = item">
        <img :src="item.preview" :alt="item.title" />
        <div>
          <h3>{{ item.title }}</h3>
          <p>{{ effects[item.effectSlug]?.name ?? item.effectSlug }}</p>
          <small>{{ new Date(item.createdAt).toLocaleString() }} • {{ item.status }}</small>
        </div>
      </article>
    </section>

    <teleport to="body">
      <div v-if="preview" class="modal" @click.self="preview = null">
        <div class="panel">
          <h3>{{ preview.title }}</h3>
          <p>{{ effects[preview.effectSlug]?.name }}</p>
          <video autoplay controls loop :src="effects[preview.effectSlug]?.videoDemo"></video>
          <button @click="preview = null">关闭</button>
        </div>
      </div>
    </teleport>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
}

.hero {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.8rem;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(15, 17, 23, 0.8);
  flex-wrap: wrap;
  gap: 1rem;
}

.hero button {
  border-radius: 999px;
  border: none;
  padding: 0.7rem 1.6rem;
  font-weight: 600;
  cursor: pointer;
  background: linear-gradient(120deg, #fcd34d, #f472b6);
  color: #05070c;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}

article {
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.02);
  cursor: pointer;
  overflow: hidden;
}

article img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

article div {
  padding: 0.8rem 1rem 1rem;
}

.modal {
  position: fixed;
  inset: 0;
  background: rgba(5, 7, 12, 0.75);
  display: grid;
  place-items: center;
  z-index: 90;
}

.panel {
  width: min(720px, 92vw);
  background: #0f1117;
  border-radius: 24px;
  padding: 1.6rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.panel video {
  width: 100%;
  border-radius: 18px;
  margin: 1rem 0;
}

.panel button {
  border-radius: 999px;
  border: none;
  padding: 0.6rem 1.4rem;
  background: #22d3ee;
  color: #05070c;
  font-weight: 600;
  cursor: pointer;
}
</style>
