<template>
  <section class="surface-panel not-found">
    <p class="eyebrow">404</p>
    <h1 class="headline">页面走丢了</h1>
    <p class="subcopy">返回特效聚合页或继续生成内容。</p>
    <div class="cta-row">
      <RouterLink class="btn" to="/">返回首页</RouterLink>
      <RouterLink class="btn secondary" to="/video-effects">特效列表</RouterLink>
    </div>
  </section>
</template>

<style scoped>
.not-found {
  min-height: 40vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  text-align: center;
}

.cta-row {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}
</style>
