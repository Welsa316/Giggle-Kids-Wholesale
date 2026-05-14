<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'outline', 'quiet'].includes(v),
  },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['md', 'lg'].includes(v),
  },
  as: { type: String, default: 'button' },
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
      'group inline-flex items-center justify-center gap-3 font-sans font-semibold tracking-[0.18em] transition-all duration-500 ease-editorial select-none whitespace-nowrap cursor-pointer relative',
      variant === 'primary' && [
        'bg-purple text-cream rounded-full uppercase',
        size === 'md' && 'px-7 py-3 text-[11px]',
        size === 'lg' && 'px-9 py-4 text-xs',
        'hover:bg-purple-deep hover:shadow-soft active:translate-y-[1px]',
      ],
      variant === 'outline' && [
        'bg-transparent text-purple border border-purple/30 rounded-full uppercase',
        size === 'md' && 'px-7 py-3 text-[11px]',
        size === 'lg' && 'px-9 py-4 text-xs',
        'hover:bg-purple hover:text-cream hover:border-purple active:translate-y-[1px]',
      ],
      variant === 'quiet' && [
        'text-purple uppercase tracking-[0.2em] text-[11px] font-semibold',
        'border-b border-purple/40 hover:border-purple px-1 pb-1 transition-colors',
      ],
    ]"
  >
    <slot />
  </component>
</template>
