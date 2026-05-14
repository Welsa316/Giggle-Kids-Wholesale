<script setup>
defineProps({
  variant: {
    type: String,
    default: 'asterism',
    validator: (v) => ['asterism', 'sprig', 'rule'].includes(v),
  },
})
</script>

<template>
  <div class="flex items-center justify-center gap-4 text-purple-soft" aria-hidden="true">
    <span class="hairline w-12 md:w-16 bg-border-ink/60" />

    <svg v-if="variant === 'asterism'" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
      <circle cx="10" cy="4" r="1.4" />
      <circle cx="4.5" cy="13" r="1.4" />
      <circle cx="15.5" cy="13" r="1.4" />
    </svg>

    <svg v-else-if="variant === 'sprig'" width="32" height="14" viewBox="0 0 32 14" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round">
      <path d="M2 7 L30 7" />
      <path d="M11 7 L8 3 M11 7 L8 11" />
      <path d="M21 7 L24 3 M21 7 L24 11" />
      <circle cx="16" cy="7" r="1.6" fill="currentColor" stroke="none" />
    </svg>

    <span v-else class="block w-1.5 h-1.5 rounded-full bg-current" />

    <span class="hairline w-12 md:w-16 bg-border-ink/60" />
  </div>
</template>
