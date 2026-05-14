<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCustomer } from '../composables/useCustomer.js'
import { formatMoney } from '../lib/shopify.js'

const router = useRouter()
const { customer, loadCustomer, fetchOrders, isAuthenticated, logout } = useCustomer()

const orders = ref([])
const loading = ref(false)

async function load() {
  if (!isAuthenticated.value) {
    router.replace({ name: 'account-login' })
    return
  }
  loading.value = true
  await loadCustomer()
  orders.value = await fetchOrders(20)
  loading.value = false
}

function onLogout() {
  logout()
  router.push({ name: 'home' })
}

function formatDate(s) {
  if (!s) return ''
  return new Date(s).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

onMounted(load)
</script>

<template>
  <div class="container-page py-12 md:py-section">
    <header class="flex items-end justify-between mb-12 md:mb-16 flex-wrap gap-4">
      <div>
        <p class="eyebrow mb-3">Your account</p>
        <h1 class="font-serif text-display text-ink">
          <span v-if="customer?.firstName">Hello, {{ customer.firstName }}.</span>
          <span v-else>Account</span>
        </h1>
      </div>
      <button
        type="button"
        class="text-[11px] uppercase tracking-[0.22em] font-semibold text-ink-muted border-b border-ink-muted/40 hover:border-purple hover:text-purple pb-1 transition-colors"
        @click="onLogout"
      >
        Sign out
      </button>
    </header>

    <div class="grid lg:grid-cols-12 gap-10 lg:gap-16">
      <aside class="lg:col-span-3">
        <h2 class="text-[10px] uppercase tracking-[0.22em] text-ink-muted font-semibold mb-4">Profile</h2>
        <dl class="flex flex-col gap-4 text-sm">
          <div v-if="customer?.emailAddress?.emailAddress">
            <dt class="text-[10px] uppercase tracking-[0.22em] text-ink-soft">Email</dt>
            <dd class="font-serif text-base text-ink mt-1">{{ customer.emailAddress.emailAddress }}</dd>
          </div>
          <div v-if="customer?.defaultAddress?.formatted">
            <dt class="text-[10px] uppercase tracking-[0.22em] text-ink-soft">Default address</dt>
            <dd class="font-serif text-base text-ink mt-1 whitespace-pre-line">{{ customer.defaultAddress.formatted }}</dd>
          </div>
        </dl>
      </aside>

      <div class="lg:col-span-9">
        <h2 class="font-serif text-h2 text-ink mb-6 md:mb-8">Order history</h2>

        <div v-if="loading" class="py-12 text-center">
          <p class="font-serif italic text-ink-muted">Loading…</p>
        </div>

        <div v-else-if="orders.length === 0" class="bg-cream-deep p-8 text-center">
          <p class="font-serif text-xl text-ink mb-2">No orders yet.</p>
          <router-link
            to="/collections/all"
            class="text-[10px] uppercase tracking-[0.22em] font-semibold text-purple border-b border-purple/40 hover:border-purple pb-1 transition-colors"
          >
            Start shopping
          </router-link>
        </div>

        <ul v-else class="flex flex-col divide-y divide-border">
          <li v-for="order in orders" :key="order.id" class="py-6 flex flex-wrap items-baseline gap-4 justify-between">
            <div>
              <p class="font-serif text-lg text-ink">{{ order.name }}</p>
              <p class="text-xs text-ink-soft mt-1">Placed {{ formatDate(order.processedAt) }}</p>
            </div>
            <div class="flex items-baseline gap-6">
              <p class="text-[11px] uppercase tracking-[0.22em] text-ink-muted">
                {{ order.fulfillmentStatus || 'Processing' }}
              </p>
              <p class="font-serif text-lg text-ink">{{ formatMoney(order.totalPrice) }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
