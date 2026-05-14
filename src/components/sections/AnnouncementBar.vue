<script setup>
import { ref } from 'vue'

const visible = ref(true)
</script>

<template>
  <div
    v-if="visible"
    class="bg-purple text-cream text-center text-xs md:text-sm tracking-wide py-2 px-6 relative"
    role="region"
    aria-label="Site announcement"
  >
    <p class="pr-8">
      Now booking <span class="font-semibold">Fall 2026</span> wholesale collections — line sheets available.
    </p>
    <button
      type="button"
      class="absolute right-3 top-1/2 -translate-y-1/2 text-cream/70 hover:text-cream transition-colors p-1"
      aria-label="Dismiss announcement"
      @click="visible = false"
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.6">
        <path d="M2 2 L12 12 M12 2 L2 12" stroke-linecap="round" />
      </svg>
    </button>
  </div>
</template>
