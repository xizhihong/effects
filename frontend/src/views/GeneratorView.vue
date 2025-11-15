<script setup>
import { computed, ref } from 'vue';
import LayoutRenderer from '../components/layouts/LayoutRenderer.vue';
import EffectSwitchModal from '../components/modals/EffectSwitchModal.vue';
import { sectionsRegistry } from '../data/sections';
import { useEffectsStore } from '../stores/effects';
import api from '../services/api';

const effectsStore = useEffectsStore();
const selectedEffect = ref(effectsStore.effects[0]?.slug ?? 'ai-hug-generator');
const uploads = ref([]);
const error = ref('');
const loading = ref(false);
const showModal = ref(false);
const preview = ref(null);

const demoVideos = [
  'https://cdn.coverr.co/videos/coverr-couple-dancing-on-the-rooftop-4251/1080p.mp4',
  'https://cdn.coverr.co/videos/coverr-dancers-on-a-bridge-6558/1080p.mp4',
  'https://cdn.coverr.co/videos/coverr-dancers-during-sunset-7535/1080p.mp4',
];

const currentEffect = computed(() => effectsStore.getEffectBySlug(selectedEffect.value));
const canGenerate = computed(() => uploads.value.length > 0 && !loading.value);

const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
const maxSize = 5 * 1024 * 1024;

const handleFiles = (event) => {
  const files = Array.from(event.target.files || []);
  const merged = [...uploads.value, ...files];

  if (merged.length > 3) {
    error.value = '最多上传 3 张照片';
    return;
  }

  for (const file of files) {
    if (!allowedTypes.includes(file.type)) {
      error.value = '仅支持 JPG、PNG、JPEG、WebP 格式';
      return;
    }
    if (file.size > maxSize) {
      error.value = '单张最大 5MB';
      return;
    }
  }

  error.value = '';
  uploads.value = merged;
};

const removeFile = (name) => {
  uploads.value = uploads.value.filter((file) => file.name !== name);
};

const triggerUpload = () => {
  document.getElementById('generator-upload').click();
};

const generate = async () => {
  if (!canGenerate.value) return;
  loading.value = true;
  const formImages = uploads.value;
  try {
    const { data } = await api.generateEffect({
      effect: selectedEffect.value,
      images: formImages,
    });
    preview.value = data;
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="generator">
    <section class="hero surface-panel">
      <div>
        <p class="eyebrow">营销站 · 功能生成页</p>
        <h1 class="headline">左侧上传图片+特效切换，右侧动态展示生成结果。</h1>
        <p class="subcopy">
          支持 JPG、PNG、JPEG、WebP，最大 5MB，最多上传 3 张。参考 pollo.ai 的交互：上传前右侧展示案例视频，上传后按钮才会亮起。
        </p>
        <div class="cta-row">
          <RouterLink class="btn" to="/video-effects">前往特效聚合页</RouterLink>
          <button class="btn secondary" @click="showModal = true">特效切换</button>
        </div>
      </div>
    </section>

    <section class="workspace">
      <div class="left-panel surface-panel">
        <header>
          <div>
            <p class="eyebrow">生成区域</p>
            <h2>{{ currentEffect?.name }}</h2>
            <p>{{ currentEffect?.tagline }}</p>
          </div>
          <button class="ghost" @click="showModal = true">切换特效</button>
        </header>

        <div class="upload-zone" @click="triggerUpload">
          <input id="generator-upload" type="file" accept=".jpg,.jpeg,.png,.webp" multiple hidden @change="handleFiles" />
          <p>拖拽或点击上传，最多 3 张</p>
          <small>支持 JPG / PNG / JPEG / WebP，单张 ≤ 5MB</small>
        </div>

        <ul class="upload-list">
          <li v-for="file in uploads" :key="file.name">
            <span>{{ file.name }}</span>
            <button @click.stop="removeFile(file.name)">移除</button>
          </li>
        </ul>
        <p v-if="error" class="error">{{ error }}</p>

        <button class="btn" :disabled="!canGenerate" @click="generate">
          {{ loading ? '生成中...' : '生成按钮（上传后点亮）' }}
        </button>
      </div>

      <div class="right-panel surface-panel">
        <p class="eyebrow">预览区</p>
        <template v-if="preview">
          <video controls autoplay loop :poster="preview.thumbnail">
            <source :src="preview.videoUrl" type="video/mp4" />
          </video>
          <div class="preview-meta">
            <p>生成成功，消耗 {{ preview.creditsUsed ?? 8 }} 积分。</p>
            <div class="cta-row">
              <RouterLink class="btn" to="/video-effects">发布到特效聚合页</RouterLink>
              <RouterLink class="btn secondary" to="/my-creation">查看 My Creation</RouterLink>
            </div>
          </div>
        </template>
        <template v-else>
          <video
            controls
            loop
            muted
            :poster="currentEffect?.heroImage"
            :key="selectedEffect"
          >
            <source :src="currentEffect?.sampleVideo || demoVideos[0]" type="video/mp4" />
          </video>
          <p class="subcopy">尚未生成，展示案例视频（参考 pollo.ai）。</p>
        </template>
      </div>
    </section>

    <LayoutRenderer :sections="sectionsRegistry.generator" />

    <EffectSwitchModal
      :open="showModal"
      :selected="selectedEffect"
      @close="showModal = false"
      @select="(slug) => (selectedEffect = slug)"
    />
  </div>
</template>

<style scoped>
.workspace {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.upload-zone {
  border: 1px dashed rgba(255, 255, 255, 0.25);
  border-radius: 18px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
}

.upload-list {
  list-style: none;
  margin: 1rem 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.upload-list li {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.04);
}

.upload-list button {
  background: none;
  border: none;
  color: var(--accent-hot);
  cursor: pointer;
}

.error {
  color: #f87171;
}

video {
  width: 100%;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}
</style>
