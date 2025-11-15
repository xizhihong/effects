<script setup lang="ts">
const invoices = [
  { id: 'INV-2088', date: '2025-11-01', amount: '$129', status: 'Paid' },
  { id: 'INV-2059', date: '2025-10-01', amount: '$129', status: 'Paid' },
]

const openContact = () => {
  window.open('mailto:finance@xxx.ai?subject=Billing%20Support', '_blank')
}
</script>

<template>
  <div class="page">
    <section class="hero">
      <div>
        <p class="eyebrow">Billing</p>
        <h1>已购买用户查看账单与积分</h1>
        <p>此页面对应 https://XXX.ai/billing。联系支持：点击 Contact Us 调起 Outlook 邮箱。</p>
      </div>
        <button @click="openContact">Contact Us</button>
    </section>

    <section class="summary">
      <div>
        <p>当前积分</p>
        <strong>420 credits</strong>
      </div>
      <div>
        <p>下次扣费</p>
        <strong>2025-12-01</strong>
      </div>
      <div>
        <p>计划</p>
        <strong>Studio</strong>
      </div>
    </section>

    <section class="table">
      <header>
        <p>账单记录</p>
      </header>
      <table>
        <thead>
          <tr>
            <th>编号</th>
            <th>日期</th>
            <th>金额</th>
            <th>状态</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="invoice in invoices" :key="invoice.id">
            <td>{{ invoice.id }}</td>
            <td>{{ invoice.date }}</td>
            <td>{{ invoice.amount }}</td>
            <td>{{ invoice.status }}</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
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
  background: #6366f1;
  color: #05070c;
  font-weight: 600;
  cursor: pointer;
}

.summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
}

.summary div {
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.02);
  padding: 1rem;
}

.table {
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.02);
  overflow: hidden;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 0.9rem 1rem;
  text-align: left;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
}

th {
  font-weight: 600;
}
</style>
