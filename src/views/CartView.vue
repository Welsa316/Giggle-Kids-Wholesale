<script setup>
import { useCart } from '../composables/useCart.js'
import { formatMoney, isShopifyConfigured } from '../lib/shopify.js'

const { lines, totalQuantity, subtotal, checkoutUrl, updateLine, removeLine } = useCart()

function lineSubtotal(line) {
  const amt = parseFloat(line.merchandise.price.amount) * line.quantity
  return formatMoney({ amount: String(amt), currencyCode: line.merchandise.price.currencyCode })
}
</script>

<template>
  <div class="container-page py-12 md:py-section">
    <header class="mb-12 md:mb-16">
      <p class="eyebrow mb-3">Your bag</p>
      <h1 class="font-serif text-display text-ink">
        {{ totalQuantity }} {{ totalQuantity === 1 ? 'item' : 'items' }}
      </h1>
    </header>

    <div v-if="!isShopifyConfigured" class="bg-cream-deep p-8 md:p-12 text-center">
      <p class="font-serif text-2xl text-ink mb-3">Cart unavailable</p>
      <p class="text-sm text-ink-muted">Shopify isn't configured yet — see <code>SHOPIFY_SETUP.md</code>.</p>
    </div>

    <div v-else-if="lines.length === 0" class="text-center py-20">
      <p class="font-serif text-3xl text-ink mb-4">Your bag is empty.</p>
      <p class="text-base text-ink-muted mb-8">Start with our new arrivals or seasonal collections.</p>
      <router-link
        to="/collections/all"
        class="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] font-semibold text-purple border-b border-purple/40 hover:border-purple pb-1 transition-colors"
      >
        Shop all
        <span aria-hidden="true">→</span>
      </router-link>
    </div>

    <div v-else class="grid lg:grid-cols-12 gap-10 lg:gap-16">
      <ul class="lg:col-span-8 flex flex-col divide-y divide-border">
        <li v-for="line in lines" :key="line.id" class="py-8 flex gap-6">
          <router-link
            :to="`/products/${line.merchandise.product.handle}`"
            class="block w-24 md:w-32 aspect-[4/5] flex-none overflow-hidden bg-cream-deep"
          >
            <img
              v-if="line.merchandise.image"
              :src="line.merchandise.image.url"
              :alt="line.merchandise.image.altText || line.merchandise.product.title"
              class="w-full h-full object-cover"
              loading="lazy"
            />
          </router-link>
          <div class="flex-1 flex flex-col gap-2 min-w-0">
            <router-link
              :to="`/products/${line.merchandise.product.handle}`"
              class="font-serif text-xl text-ink leading-tight hover:text-purple transition-colors"
            >
              {{ line.merchandise.product.title }}
            </router-link>
            <p v-if="line.merchandise.title !== 'Default Title'" class="text-sm text-ink-soft">
              {{ line.merchandise.title }}
            </p>
            <div class="flex items-center justify-between mt-4">
              <div class="inline-flex items-center border border-border-ink/60">
                <button
                  type="button"
                  class="w-8 h-8 flex items-center justify-center text-ink hover:text-purple transition-colors"
                  @click="updateLine(line.id, Math.max(0, line.quantity - 1))"
                >−</button>
                <span class="w-8 text-center text-sm text-ink">{{ line.quantity }}</span>
                <button
                  type="button"
                  class="w-8 h-8 flex items-center justify-center text-ink hover:text-purple transition-colors"
                  @click="updateLine(line.id, line.quantity + 1)"
                >+</button>
              </div>
              <p class="font-serif text-xl text-ink">{{ lineSubtotal(line) }}</p>
            </div>
            <button
              type="button"
              class="self-start text-[10px] uppercase tracking-[0.22em] text-ink-soft hover:text-purple transition-colors mt-2"
              @click="removeLine(line.id)"
            >
              Remove
            </button>
          </div>
        </li>
      </ul>

      <aside class="lg:col-span-4 lg:sticky lg:top-28 lg:self-start bg-cream-deep p-6 md:p-8">
        <p class="text-[10px] uppercase tracking-[0.22em] text-ink-muted font-semibold mb-4">Summary</p>
        <dl class="flex justify-between mb-2">
          <dt class="text-sm text-ink-muted">Subtotal</dt>
          <dd class="font-serif text-2xl text-ink">{{ formatMoney(subtotal) }}</dd>
        </dl>
        <p class="text-xs text-ink-soft mb-6">Shipping &amp; taxes calculated at checkout.</p>
        <a
          v-if="checkoutUrl"
          :href="checkoutUrl"
          class="block w-full bg-purple text-cream text-center py-4 text-[11px] uppercase tracking-[0.18em] font-semibold rounded-full hover:bg-purple-deep transition-colors"
        >
          Checkout
        </a>
        <router-link
          to="/collections/all"
          class="block text-center mt-5 text-[10px] uppercase tracking-[0.22em] text-ink-muted hover:text-purple transition-colors"
        >
          Continue shopping
        </router-link>
      </aside>
    </div>
  </div>
</template>
