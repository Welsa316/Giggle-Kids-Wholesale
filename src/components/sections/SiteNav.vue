<script setup>
import { ref, watch, onUnmounted, onMounted, computed } from 'vue'
import { useCart } from '../../composables/useCart.js'
import { useCustomer } from '../../composables/useCustomer.js'

const open = ref(false)
const scrolled = ref(false)

const { totalQuantity, openCart } = useCart()
const { isAuthenticated } = useCustomer()

const links = [
  { label: 'Shop', to: '/collections/all' },
  { label: 'Christening', to: '/collections/christening' },
  { label: 'Mardi Gras', to: '/collections/mardi-gras' },
  { label: 'Boys', to: '/collections/boys' },
  { label: 'Girls', to: '/collections/girls' },
  { label: 'Story', to: '/about' },
]

watch(open, (v) => {
  document.body.style.overflow = v ? 'hidden' : ''
})

function onScroll() {
  scrolled.value = window.scrollY > 8
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onUnmounted(() => {
  document.body.style.overflow = ''
  window.removeEventListener('scroll', onScroll)
})

function close() {
  open.value = false
}

function onKeydown(e) {
  if (e.key === 'Escape' && open.value) close()
}

function onCartClick() {
  openCart()
}
</script>

<template>
  <header
    class="sticky top-0 z-40 transition-all duration-500 ease-editorial"
    :class="scrolled ? 'bg-cream/92 backdrop-blur-lg border-b border-border' : 'bg-cream/0 backdrop-blur-0 border-b border-transparent'"
    @keydown="onKeydown"
  >
    <div class="container-page flex items-center justify-between h-20 md:h-24">
      <router-link to="/" class="flex flex-col leading-none">
        <span class="font-serif text-2xl md:text-[28px] text-ink font-medium tracking-tight">
          Giggle Kids
        </span>
        <span class="text-[9px] md:text-[10px] uppercase tracking-[0.32em] text-ink-soft mt-1.5">
          Est. 2012 · New Orleans
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
        <router-link
          :to="isAuthenticated ? '/account' : '/account/login'"
          class="hidden md:inline-flex items-center justify-center w-10 h-10 text-ink hover:text-purple transition-colors"
          :aria-label="isAuthenticated ? 'Your account' : 'Sign in'"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" />
          </svg>
        </router-link>

        <button
          type="button"
          class="relative inline-flex items-center justify-center w-10 h-10 text-ink hover:text-purple transition-colors"
          aria-label="Open cart"
          @click="onCartClick"
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
          <router-link
            :to="isAuthenticated ? '/account' : '/account/login'"
            class="py-4 font-serif text-2xl text-ink border-b border-border hover:text-purple transition-colors"
            @click="close"
          >
            {{ isAuthenticated ? 'Account' : 'Sign in' }}
          </router-link>
        </nav>
      </div>
    </Transition>
  </header>
</template>
