<script setup>
import LayoutRenderer from '../components/layouts/LayoutRenderer.vue';
import { sectionsRegistry } from '../data/sections';
import { useEffectsStore } from '../stores/effects';

const effectsStore = useEffectsStore();
</script>

<template>
  <div class="admin">
    <section class="hero surface-panel">
      <div>
        <p class="eyebrow">管理后台</p>
        <h1 class="headline">快速配置特效模版：名称、模型、案例素材、Prompt、积分定价。</h1>
        <p class="subcopy">
          参考 modao 原型，清晰呈现模板卡片以及关键信息。点击可进入编辑状态（在此示例中用按钮代替）。
        </p>
      </div>
      <button class="btn">新增模板</button>
    </section>

    <div class="template-grid">
      <article v-for="tpl in effectsStore.templates" :key="tpl.id" class="template-card card">
        <img :src="tpl.sampleImage" :alt="tpl.name" loading="lazy" />
        <div class="template-body">
          <div class="chip">{{ tpl.model }}</div>
          <h3>{{ tpl.name }}</h3>
          <p>{{ tpl.prompt }}</p>
          <p class="credit">积分定价：{{ tpl.creditCost }}</p>
          <div class="cta-row">
            <button class="btn secondary">编辑 Prompt</button>
            <button class="btn">发布</button>
          </div>
        </div>
      </article>
    </div>

    <LayoutRenderer :sections="sectionsRegistry.admin" />
  </div>
</template>

<style scoped>
.template-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
}

.template-card img {
  width: 100%;
  border-radius: 16px;
}

.template-body {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
}

.credit {
  color: var(--accent-secondary);
}

.cta-row {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
</style>
