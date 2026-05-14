<script setup>
import { ref, watch, onUnmounted, onMounted } from 'vue'
import BaseButton from '../ui/BaseButton.vue'

const open = ref(false)
const scrolled = ref(false)

const links = [
  { label: 'About', href: '#about' },
  { label: 'Collections', href: '#collections' },
  { label: 'How to Order', href: '#how-to-order' },
  { label: 'Contact', href: '#inquiry' },
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
</script>

<template>
  <header
    class="sticky top-0 z-40 transition-all duration-500 ease-editorial"
    :class="scrolled ? 'bg-cream/92 backdrop-blur-lg border-b border-border' : 'bg-cream/0 backdrop-blur-0 border-b border-transparent'"
    @keydown="onKeydown"
  >
    <div class="container-page flex items-center justify-between h-20 md:h-24">
      <a href="#top" class="flex flex-col leading-none">
        <span class="font-serif text-2xl md:text-[28px] text-ink font-medium tracking-tight">
          Giggle <span class="italic text-purple">Kids</span>
        </span>
        <span class="text-[9px] md:text-[10px] uppercase tracking-[0.32em] text-ink-soft mt-1.5">
          Est. 2012 · Baton Rouge
        </span>
      </a>

      <nav class="hidden md:flex items-center gap-10" aria-label="Primary">
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          class="text-[11px] uppercase tracking-[0.22em] font-semibold text-ink hover:text-purple transition-colors duration-300"
        >
          {{ link.label }}
        </a>
      </nav>

      <div class="hidden md:block">
        <BaseButton href="#" variant="primary">Shop on Faire</BaseButton>
      </div>

      <button
        type="button"
        class="md:hidden p-2 -mr-2 text-ink"
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
        class="md:hidden bg-cream border-t border-border"
      >
        <nav class="container-page flex flex-col py-8 gap-1" aria-label="Mobile">
          <a
            v-for="link in links"
            :key="link.href"
            :href="link.href"
            class="py-4 font-serif text-2xl text-ink border-b border-border last:border-b-0 hover:text-purple transition-colors"
            @click="close"
          >
            {{ link.label }}
          </a>
          <div class="pt-7">
            <BaseButton href="#" variant="primary" class="w-full" @click="close">
              Shop on Faire
            </BaseButton>
          </div>
        </nav>
      </div>
    </Transition>
  </header>
</template>
