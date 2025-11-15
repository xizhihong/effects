import axios from 'axios';
import { effectLibrary, creationShowcase, templatePresets } from '../data/effects';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:9501',
  timeout: 6000,
});

const wrapFallback = (data) => ({ data, source: 'fallback' });

const api = {
  async fetchEffects() {
    try {
      const response = await apiClient.get('/api/effects');
      return response.data;
    } catch (error) {
      console.warn('Falling back to static effects', error?.message);
      return wrapFallback(effectLibrary);
    }
  },
  async fetchEffect(slug) {
    try {
      const response = await apiClient.get(`/api/effects/${slug}`);
      return response.data;
    } catch (error) {
      console.warn(`Fallback for ${slug}`, error?.message);
      const effect = effectLibrary.find((item) => item.slug === slug);
      return wrapFallback(effect);
    }
  },
  async fetchCreations() {
    try {
      const response = await apiClient.get('/api/creations');
      return response.data;
    } catch (error) {
      console.warn('Falling back to static creations', error?.message);
      return wrapFallback(creationShowcase);
    }
  },
  async fetchTemplates() {
    try {
      const response = await apiClient.get('/api/templates');
      return response.data;
    } catch (error) {
      console.warn('Falling back to static templates', error?.message);
      return wrapFallback(templatePresets);
    }
  },
  async generateEffect(payload) {
    try {
      const formData = new FormData();
      Object.entries(payload).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((item) => formData.append(`${key}[]`, item));
        } else {
          formData.append(key, value);
        }
      });
      const response = await apiClient.post('/api/generate', formData);
      return response.data;
    } catch (error) {
      console.warn('Using mocked generation response', error?.message);
      return wrapFallback({
        videoUrl: 'https://cdn.coverr.co/videos/coverr-two-people-dancing-8816/1080p.mp4',
        thumbnail:
          'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80',
        creditsUsed: 8,
        status: 'completed',
      });
    }
  },
};

export default api;
