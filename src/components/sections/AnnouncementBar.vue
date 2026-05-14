<script setup>
import { ref } from 'vue'

const visible = ref(true)
</script>

<template>
  <div
    v-if="visible"
    class="bg-ink text-cream text-center text-[11px] tracking-[0.22em] uppercase py-2.5 px-6 relative"
    role="region"
    aria-label="Site announcement"
  >
    <p class="pr-8">
      Mardi Gras + Crawfish &middot; <span class="font-serif italic normal-case tracking-normal text-[13px]">Made in New Orleans</span>
    </p>
    <button
      type="button"
      class="absolute right-3 top-1/2 -translate-y-1/2 text-cream/55 hover:text-cream transition-colors p-1.5"
      aria-label="Dismiss announcement"
      @click="visible = false"
    >
      <svg width="11" height="11" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.4">
        <path d="M2 2 L12 12 M12 2 L2 12" stroke-linecap="round" />
      </svg>
    </button>
  </div>
</template>
