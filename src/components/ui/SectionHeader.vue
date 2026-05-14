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
      'flex flex-col gap-4 max-w-2xl',
      align === 'center' && 'mx-auto text-center items-center',
    ]"
    data-reveal
  >
    <div v-if="eyebrow" class="flex items-center gap-3" :class="align === 'center' && 'justify-center'">
      <span aria-hidden="true" class="block w-6 h-px bg-purple/60" />
      <p class="eyebrow">{{ eyebrow }}</p>
    </div>
    <h2 class="font-serif text-h2 text-ink">
      <slot name="title">{{ title }}</slot>
    </h2>
    <p v-if="description" class="text-base md:text-lg text-ink-muted leading-relaxed max-w-prose">
      {{ description }}
    </p>
  </header>
</template>
