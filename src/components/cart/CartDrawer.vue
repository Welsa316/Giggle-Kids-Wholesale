<script setup>
import { useCart } from '../../composables/useCart.js'
import { formatMoney, isShopifyConfigured } from '../../lib/shopify.js'

const { lines, drawerOpen, closeCart, updateLine, removeLine, subtotal, checkoutUrl, totalQuantity, loading } = useCart()

function lineSubtotal(line) {
  const amt = parseFloat(line.merchandise.price.amount) * line.quantity
  return formatMoney({ amount: String(amt), currencyCode: line.merchandise.price.currencyCode })
}
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      leave-active-class="transition-opacity duration-200"
      leave-to-class="opacity-0"
    >
      <div
        v-if="drawerOpen"
        class="fixed inset-0 z-50 bg-ink/40"
        aria-hidden="true"
        @click="closeCart"
      />
    </Transition>

    <Transition
      enter-active-class="transition duration-400 ease-editorial"
      enter-from-class="translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition duration-300 ease-editorial"
      leave-from-class="translate-x-0"
      leave-to-class="translate-x-full"
    >
      <aside
        v-if="drawerOpen"
        class="fixed top-0 right-0 z-50 h-full w-full sm:w-[440px] bg-cream flex flex-col shadow-lift"
        role="dialog"
        aria-label="Shopping cart"
      >
        <header class="flex items-center justify-between px-6 md:px-8 py-6 border-b border-border">
          <div>
            <p class="text-[10px] uppercase tracking-[0.28em] text-ink-soft font-semibold mb-1">Your bag</p>
            <p class="font-serif text-xl text-ink">{{ totalQuantity }} {{ totalQuantity === 1 ? 'item' : 'items' }}</p>
          </div>
          <button
            type="button"
            class="p-2 -mr-2 text-ink hover:text-purple transition-colors"
            aria-label="Close cart"
            @click="closeCart"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round">
              <path d="M5 5l14 14 M19 5L5 19" />
            </svg>
          </button>
        </header>

        <div class="flex-1 overflow-y-auto px-6 md:px-8 py-6">
          <div v-if="!isShopifyConfigured" class="text-center py-16">
            <p class="font-serif text-lg text-ink mb-3">Cart unavailable</p>
            <p class="text-sm text-ink-muted">Shopify isn't configured yet — see SHOPIFY_SETUP.md.</p>
          </div>
          <div v-else-if="lines.length === 0 && !loading" class="text-center py-16">
            <p class="font-serif text-2xl text-ink mb-3">Your bag is empty.</p>
            <p class="text-sm text-ink-muted mb-8">Start with our new arrivals or seasonal collections.</p>
            <router-link
              to="/collections/all"
              class="text-[11px] uppercase tracking-[0.22em] font-semibold text-purple border-b border-purple/40 hover:border-purple pb-1 transition-colors"
              @click="closeCart"
            >
              Shop all
            </router-link>
          </div>
          <ul v-else class="flex flex-col divide-y divide-border">
            <li v-for="line in lines" :key="line.id" class="py-5 flex gap-4">
              <router-link
                :to="`/products/${line.merchandise.product.handle}`"
                class="block w-20 h-24 flex-none overflow-hidden bg-cream-deep"
                @click="closeCart"
              >
                <img
                  v-if="line.merchandise.image"
                  :src="line.merchandise.image.url"
                  :alt="line.merchandise.image.altText || line.merchandise.product.title"
                  class="w-full h-full object-cover"
                  loading="lazy"
                />
              </router-link>
              <div class="flex-1 flex flex-col gap-1.5 min-w-0">
                <router-link
                  :to="`/products/${line.merchandise.product.handle}`"
                  class="font-serif text-base text-ink leading-tight hover:text-purple transition-colors"
                  @click="closeCart"
                >
                  {{ line.merchandise.product.title }}
                </router-link>
                <p v-if="line.merchandise.title !== 'Default Title'" class="text-xs text-ink-soft">
                  {{ line.merchandise.title }}
                </p>
                <div class="flex items-center justify-between mt-2">
                  <div class="inline-flex items-center border border-border-ink/60">
                    <button
                      type="button"
                      class="w-7 h-7 flex items-center justify-center text-ink hover:text-purple transition-colors"
                      :aria-label="`Decrease ${line.merchandise.product.title} quantity`"
                      @click="updateLine(line.id, Math.max(0, line.quantity - 1))"
                    >−</button>
                    <span class="w-7 text-center text-sm text-ink">{{ line.quantity }}</span>
                    <button
                      type="button"
                      class="w-7 h-7 flex items-center justify-center text-ink hover:text-purple transition-colors"
                      :aria-label="`Increase ${line.merchandise.product.title} quantity`"
                      @click="updateLine(line.id, line.quantity + 1)"
                    >+</button>
                  </div>
                  <p class="font-serif text-base text-ink">{{ lineSubtotal(line) }}</p>
                </div>
                <button
                  type="button"
                  class="self-start text-[10px] uppercase tracking-[0.22em] text-ink-soft hover:text-purple transition-colors mt-1"
                  @click="removeLine(line.id)"
                >
                  Remove
                </button>
              </div>
            </li>
          </ul>
        </div>

        <footer v-if="lines.length > 0" class="px-6 md:px-8 py-6 border-t border-border bg-cream-deep">
          <div class="flex items-baseline justify-between mb-1">
            <p class="text-[11px] uppercase tracking-[0.22em] text-ink-muted font-semibold">Subtotal</p>
            <p class="font-serif text-2xl text-ink">{{ formatMoney(subtotal) }}</p>
          </div>
          <p class="text-[11px] text-ink-soft mb-5">Shipping &amp; taxes calculated at checkout.</p>
          <a
            v-if="checkoutUrl"
            :href="checkoutUrl"
            class="block w-full bg-purple text-cream text-center py-4 text-[11px] uppercase tracking-[0.18em] font-semibold rounded-full hover:bg-purple-deep transition-colors"
          >
            Checkout
          </a>
        </footer>
      </aside>
    </Transition>
  </Teleport>
</template>
