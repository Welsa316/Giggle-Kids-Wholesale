<script setup>
import { ref, watch, onUnmounted } from 'vue'
import BaseButton from '../ui/BaseButton.vue'

const open = ref(false)

const links = [
  { label: 'About', href: '#about' },
  { label: 'Collections', href: '#collections' },
  { label: 'How to Order', href: '#how-to-order' },
  { label: 'Contact', href: '#inquiry' },
]

watch(open, (v) => {
  document.body.style.overflow = v ? 'hidden' : ''
})

onUnmounted(() => {
  document.body.style.overflow = ''
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
    class="sticky top-0 z-40 bg-cream/85 backdrop-blur-md border-b border-border"
    @keydown="onKeydown"
  >
    <div class="container-page flex items-center justify-between h-16 md:h-20">
      <a href="#top" class="font-serif text-xl md:text-2xl text-purple font-bold tracking-tight">
        Giggle Kids
      </a>

      <nav class="hidden md:flex items-center gap-8" aria-label="Primary">
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          class="text-sm font-semibold text-ink hover:text-purple transition-colors"
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
        <svg v-if="!open" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
          <path d="M4 7h16 M4 12h16 M4 17h16" />
        </svg>
        <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
          <path d="M5 5l14 14 M19 5L5 19" />
        </svg>
      </button>
    </div>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open"
        id="mobile-nav"
        class="md:hidden bg-cream border-t border-border"
      >
        <nav class="container-page flex flex-col py-6 gap-1" aria-label="Mobile">
          <a
            v-for="link in links"
            :key="link.href"
            :href="link.href"
            class="py-3 text-base font-semibold text-ink border-b border-border last:border-b-0 hover:text-purple transition-colors"
            @click="close"
          >
            {{ link.label }}
          </a>
          <div class="pt-5">
            <BaseButton href="#" variant="primary" class="w-full" @click="close">
              Shop on Faire
            </BaseButton>
          </div>
        </nav>
      </div>
    </Transition>
  </header>
</template>
