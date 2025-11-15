import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../pages/HomePage.vue'),
    },
    {
      path: '/video-effects',
      name: 'effects-hub',
      component: () => import('../pages/EffectsHubPage.vue'),
    },
    {
      path: '/video-effects/:slug',
      name: 'effect-detail',
      component: () => import('../pages/EffectDetailPage.vue'),
      props: true,
    },
    {
      path: '/video-effects/studio',
      name: 'generator',
      component: () => import('../pages/GeneratorPage.vue'),
    },
    {
      path: '/my-creation',
      name: 'my-creation',
      component: () => import('../pages/CreationCenterPage.vue'),
    },
    {
      path: '/pricing',
      name: 'pricing',
      component: () => import('../pages/PricingPage.vue'),
    },
    {
      path: '/billing',
      name: 'billing',
      component: () => import('../pages/BillingPage.vue'),
    },
    {
      path: '/admin/templates',
      name: 'admin-templates',
      component: () => import('../pages/AdminTemplatesPage.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

export default router
