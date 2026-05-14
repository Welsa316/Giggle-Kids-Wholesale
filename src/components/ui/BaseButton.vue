<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'outline', 'quiet'].includes(v),
  },
  as: {
    type: String,
    default: 'button',
  },
  href: { type: String, default: null },
  type: { type: String, default: 'button' },
})
</script>

<template>
  <component
    :is="href ? 'a' : as"
    :href="href || undefined"
    :type="!href && as === 'button' ? type : undefined"
    :class="[
      'inline-flex items-center justify-center gap-2 font-sans font-semibold tracking-wide transition-all duration-200 ease-smooth select-none whitespace-nowrap',
      variant === 'primary' && 'bg-purple text-cream rounded-full px-7 py-3 text-sm uppercase tracking-[0.12em] hover:bg-purple-deep hover:shadow-soft active:translate-y-[1px]',
      variant === 'outline' && 'bg-transparent text-purple border border-purple/30 rounded-full px-7 py-3 text-sm uppercase tracking-[0.12em] hover:bg-purple hover:text-cream hover:border-purple active:translate-y-[1px]',
      variant === 'quiet' && 'text-purple text-sm font-semibold underline underline-offset-4 decoration-purple/40 hover:decoration-purple decoration-1 px-2 py-2',
    ]"
  >
    <slot />
  </component>
</template>
