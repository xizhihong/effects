import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { effectLibrary, creationShowcase, templatePresets } from '../data/effects';
import api from '../services/api';

export const useEffectsStore = defineStore('effects', () => {
  const effects = ref(effectLibrary);
  const templates = ref(templatePresets);
  const creations = ref(creationShowcase);
  const loading = ref(false);

  const effectMap = computed(() =>
    effects.value.reduce((acc, effect) => {
      acc[effect.slug] = effect;
      return acc;
    }, {}),
  );

  const featuredEffects = computed(() => effects.value.slice(0, 6));

  const romanceHeroes = computed(() => effects.value.filter((effect) => effect.category === 'Romance'));

  const getEffectBySlug = (slug) => effectMap.value[slug];

  const refresh = async () => {
    loading.value = true;
    try {
      const { data } = await api.fetchEffects();
      if (Array.isArray(data)) {
        effects.value = data;
      }
    } finally {
      loading.value = false;
    }
  };

  const refreshCreations = async () => {
    try {
      const { data } = await api.fetchCreations();
      if (Array.isArray(data)) {
        creations.value = data;
      }
    } catch (error) {
      console.warn('Using fallback creations list', error?.message);
    }
  };

  const refreshTemplates = async () => {
    try {
      const { data } = await api.fetchTemplates();
      if (Array.isArray(data)) {
        templates.value = data;
      }
    } catch (error) {
      console.warn('Using fallback template list', error?.message);
    }
  };

  return {
    effects,
    templates,
    creations,
    loading,
    featuredEffects,
    romanceHeroes,
    getEffectBySlug,
    refresh,
    refreshCreations,
    refreshTemplates,
  };
});
