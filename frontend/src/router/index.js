import { createRouter, createWebHistory } from 'vue-router';

const HomeView = () => import('../views/HomeView.vue');
const EffectsHubView = () => import('../views/EffectsHubView.vue');
const GeneratorView = () => import('../views/GeneratorView.vue');
const CreationCenterView = () => import('../views/CreationCenterView.vue');
const AdminTemplatesView = () => import('../views/AdminTemplatesView.vue');
const EffectDetailView = () => import('../views/EffectDetailView.vue');
const NotFoundView = () => import('../views/NotFoundView.vue');

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' };
  },
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/video-effects', name: 'effects-hub', component: EffectsHubView },
    {
      path: '/video-effects/:slug',
      name: 'effect-detail',
      component: EffectDetailView,
      props: true,
    },
    { path: '/generator', name: 'generator', component: GeneratorView },
    { path: '/my-creation', name: 'creation-center', component: CreationCenterView },
    { path: '/admin/templates', name: 'admin-templates', component: AdminTemplatesView },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView },
  ],
});

export default router;
