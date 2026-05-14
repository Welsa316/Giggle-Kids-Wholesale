<script setup>
defineProps({
  eyebrow: { type: String, default: '' },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  align: { type: String, default: 'left' },
})
</script>

<template>
  <header
    :class="[
      'flex flex-col gap-3 max-w-2xl',
      align === 'center' && 'mx-auto text-center items-center',
    ]"
  >
    <p v-if="eyebrow" class="eyebrow">{{ eyebrow }}</p>
    <h2 class="font-serif text-h2 text-ink">{{ title }}</h2>
    <p v-if="description" class="text-base md:text-lg text-ink-muted leading-relaxed">{{ description }}</p>
  </header>
</template>
