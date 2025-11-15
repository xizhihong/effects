<script setup lang="ts">
const plans = [
  {
    name: 'Starter',
    price: 'Free',
    description: '体验 AI Hug / Focus Change 等基础特效，适合试用阶段。',
    features: ['10 credits / 月', '水印预览', '邮箱 & 谷歌登录'],
  },
  {
    name: 'Creator',
    price: '$39',
    description: '升级解锁更多 pollo.ai 灵感模版 + 批量生成权限。',
    features: ['120 credits / 月', '批量上传 3 张图片', '优先渲染队列'],
  },
  {
    name: 'Studio',
    price: '$129',
    description: '为创意团队提供专属管理后台、积分定价和创作中心同步。',
    features: ['500 credits / 月', '共享创作中心', '管理后台模版配置'],
  },
]
</script>

<template>
  <div class="page">
    <section class="hero">
      <div>
        <p class="eyebrow">Upgrade</p>
        <h1>升级以访问 https://XXX.ai/pricing 中的全部特效</h1>
        <p>用户购买前停留在此页面；付款后跳转 Billing（https://XXX.ai/billing）。</p>
      </div>
      <button @click="$router.push('/billing')">我已购买，查看 Billing</button>
    </section>

    <section class="grid">
      <article v-for="plan in plans" :key="plan.name">
        <header>
          <h3>{{ plan.name }}</h3>
          <strong>{{ plan.price }}</strong>
        </header>
        <p>{{ plan.description }}</p>
        <ul>
          <li v-for="feature in plan.features" :key="feature">{{ feature }}</li>
        </ul>
        <button>Start plan</button>
      </article>
    </section>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.hero {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(15, 17, 23, 0.8);
  gap: 1rem;
  flex-wrap: wrap;
}

.hero button {
  border-radius: 999px;
  border: none;
  padding: 0.75rem 1.5rem;
  background: #22d3ee;
  color: #05070c;
  font-weight: 600;
  cursor: pointer;
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
  padding: 1.4rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

ul {
  padding-left: 1.2rem;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

button {
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  background: transparent;
  color: #fff;
  padding: 0.6rem;
  cursor: pointer;
}
</style>
