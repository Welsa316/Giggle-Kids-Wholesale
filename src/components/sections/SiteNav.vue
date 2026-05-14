<script setup>
import { ref, watch, onUnmounted, onMounted, computed } from 'vue'
import { useCart } from '../../composables/useCart.js'
import { useCollections } from '../../composables/useProducts.js'

const open = ref(false)
const scrolled = ref(false)
const hamburgerBtn = ref(null)
const mobilePanelRef = ref(null)

const { totalQuantity, openCart } = useCart()
const { collections, fetchCollections } = useCollections()

// Nav builds dynamically from Shopify collections so it always reflects
// the real catalog. Falls back to just "Shop / Story" if no collections
// exist yet (small shops with only products and no curated collections).
const links = computed(() => {
  const shop = { label: 'Shop', to: '/collections/all' }
  const story = { label: 'Story', to: '/about' }
  const fromShopify = collections.value
    .filter((c) => c.handle !== 'frontpage' && c.handle !== 'all')
    .slice(0, 4)
    .map((c) => ({ label: c.title, to: `/collections/${c.handle}` }))
  return [shop, ...fromShopify, story]
})

watch(open, (v) => {
  document.body.style.overflow = v ? 'hidden' : ''
})

function onScroll() {
  scrolled.value = window.scrollY > 8
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  document.addEventListener('keydown', onKeydown)
  onScroll()
  fetchCollections({ first: 8 })
})

onUnmounted(() => {
  document.body.style.overflow = ''
  window.removeEventListener('scroll', onScroll)
  document.removeEventListener('keydown', onKeydown)
})

function close() {
  open.value = false
  // Restore focus to the hamburger so keyboard users land back where they started.
  hamburgerBtn.value?.focus?.()
}

function onKeydown(e) {
  if (!open.value) return
  if (e.key === 'Escape') {
    close()
    return
  }
  if (e.key !== 'Tab') return
  // Trap focus inside the open mobile nav
  const focusable = mobilePanelRef.value?.querySelectorAll(
    'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
  )
  if (!focusable || focusable.length === 0) return
  const first = focusable[0]
  const last = focusable[focusable.length - 1]
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault()
    last.focus()
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault()
    first.focus()
  }
}
</script>

<template>
  <header
    class="sticky top-0 z-40 transition-all duration-500 ease-editorial"
    :class="scrolled ? 'bg-cream/92 backdrop-blur-lg border-b border-border' : 'bg-cream/0 backdrop-blur-0 border-b border-transparent'"
  >
    <div class="container-page flex items-center justify-between h-24 md:h-28">
      <router-link to="/" class="flex flex-col items-start leading-none gap-2" aria-label="Giggle Kids — Home">
        <span class="logo-mask block h-12 md:h-14 text-ink" role="img" aria-label="Giggle Kids" />
        <span class="text-[9px] md:text-[10px] uppercase tracking-[0.32em] text-ink-soft">
          Est. 2026 · New Orleans
        </span>
      </router-link>

      <nav class="hidden lg:flex items-center gap-8 xl:gap-10" aria-label="Primary">
        <router-link
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="text-[11px] uppercase tracking-[0.22em] font-semibold text-ink hover:text-purple transition-colors duration-300"
        >
          {{ link.label }}
        </router-link>
      </nav>

      <div class="flex items-center gap-4 md:gap-6">
        <button
          type="button"
          class="relative inline-flex items-center justify-center w-10 h-10 text-ink hover:text-purple transition-colors"
          aria-label="Open cart"
          @click="openCart"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 7h14l-1.4 11.2A2 2 0 0 1 15.6 20H8.4a2 2 0 0 1-2-1.8L5 7z" />
            <path d="M9 7V5a3 3 0 0 1 6 0v2" />
          </svg>
          <span
            v-if="totalQuantity > 0"
            class="absolute top-1 right-1 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-purple text-cream text-[10px] font-semibold px-1"
            aria-hidden="true"
          >
            {{ totalQuantity }}
          </span>
        </button>

        <button
          ref="hamburgerBtn"
          type="button"
          class="lg:hidden p-2 -mr-2 text-ink"
          :aria-expanded="open"
          aria-controls="mobile-nav"
          aria-label="Toggle menu"
          @click="open = !open"
        >
          <svg v-if="!open" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round">
            <path d="M4 8h16 M4 16h16" />
          </svg>
          <svg v-else width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round">
            <path d="M5 5l14 14 M19 5L5 19" />
          </svg>
        </button>
      </div>
    </div>

    <Transition
      enter-active-class="transition duration-300 ease-editorial"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open"
        ref="mobilePanelRef"
        id="mobile-nav"
        class="lg:hidden bg-cream border-t border-border"
      >
        <nav class="container-page flex flex-col py-8 gap-1" aria-label="Mobile">
          <router-link
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="py-4 font-serif text-2xl text-ink border-b border-border last:border-b-0 hover:text-purple transition-colors"
            @click="close"
          >
            {{ link.label }}
          </router-link>
        </nav>
      </div>
    </Transition>
  </header>
</template>
