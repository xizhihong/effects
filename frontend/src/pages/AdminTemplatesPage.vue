<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { fetchTemplates } from '../services/api'
import type { Template } from '../types/content'

const templates = ref<Template[]>([])
const modelFilter = ref('all')

onMounted(async () => {
  templates.value = await fetchTemplates()
})

const models = computed(() => ['all', ...new Set(templates.value.map((tpl) => tpl.model))])

const filtered = computed(() => {
  if (modelFilter.value === 'all') return templates.value
  return templates.value.filter((tpl) => tpl.model === modelFilter.value)
})
</script>

<template>
  <div class="page">
    <section class="hero">
      <div>
        <p class="eyebrow">管理后台</p>
        <h1>快速配置特效模版（共 {{ templates.length }} 个）</h1>
        <p>
          模版名称、使用模型、案例图片、案例视频、prompt、积分定价一应俱全。对齐 https://modao.cc/proto/yLKuJP8It5fy83cLSL693c/sharing?view_mode=read_only&screen=rbpV21Tbrx6Rn8kf9
          的交互。
        </p>
      </div>
      <div class="filters">
        <label>
          模型筛选
          <select v-model="modelFilter">
            <option v-for="model in models" :key="model" :value="model">{{ model }}</option>
          </select>
        </label>
      </div>
    </section>

    <section class="grid">
      <article v-for="tpl in filtered" :key="tpl.id">
        <header>
          <h3>{{ tpl.name }}</h3>
          <span>{{ tpl.model }}</span>
        </header>
        <img :src="tpl.previewImage" :alt="tpl.name" />
        <video autoplay loop muted playsinline :src="tpl.previewVideo"></video>
        <p class="prompt">{{ tpl.prompt }}</p>
        <footer>
          <strong>{{ tpl.creditsCost }} credits</strong>
          <button @click="$router.push(`/video-effects/${tpl.name}`)">查看特效</button>
        </footer>
      </article>
    </section>
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
  gap: 1.5rem;
  flex-wrap: wrap;
  padding: 1.8rem;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(15, 17, 23, 0.8);
}

.filters select {
  margin-left: 0.6rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: transparent;
  color: #fff;
  padding: 0.4rem 0.8rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.2rem;
}

article {
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.02);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

img,
video {
  width: 100%;
  border-radius: 16px;
}

.prompt {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.75);
}

footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

footer button {
  border-radius: 999px;
  border: none;
  padding: 0.5rem 1.3rem;
  cursor: pointer;
  background: linear-gradient(120deg, #a855f7, #6366f1);
  color: #05070c;
  font-weight: 600;
}
</style>
