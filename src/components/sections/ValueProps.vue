<script setup>
import SectionHeader from '../ui/SectionHeader.vue'

// Evergreen value props — not tied to specific product categories.
// As the catalog broadens (clothing → plushies → books → souvenirs)
// these still hold.
const valueProps = [
  {
    number: '01',
    title: 'Made in New Orleans',
    body: 'Designed locally and finished by hand in our New Orleans studio.',
  },
  {
    number: '02',
    title: 'Built to be kept',
    body: 'Reinforced seams, finished hems, and materials chosen to survive a younger sibling.',
  },
  {
    number: '03',
    title: 'A small catalog',
    body: 'We grow it slowly so every piece earns its place. Quality over quantity.',
  },
  {
    number: '04',
    title: 'Checked before it ships',
    body: 'Every order inspected by hand. If it isn\'t right, it doesn\'t go out.',
  },
]
</script>

<template>
  <section class="container-page py-section-lg md:py-section-xl relative" aria-label="What we make">
    <div class="grid lg:grid-cols-12 gap-10 lg:gap-16 mb-16 md:mb-24">
      <div class="lg:col-span-5">
        <SectionHeader
          eyebrow="What we stand for"
          title="Made well. Made to keep."
        />
      </div>
      <div class="lg:col-span-6 lg:col-start-7 flex items-end" data-reveal style="--reveal-delay: 150ms">
        <p class="text-base md:text-lg text-ink-muted leading-relaxed font-light max-w-prose">
          Four things that hold true for everything we make &mdash; and that won't change as the catalog grows.
        </p>
      </div>
    </div>

    <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-14">
      <li
        v-for="(prop, i) in valueProps"
        :key="prop.number"
        class="flex flex-col gap-4 pt-8 border-t border-border-ink/60"
        data-reveal
        :style="`--reveal-delay: ${i * 120}ms`"
      >
        <span class="font-serif italic text-3xl text-purple-soft leading-none">{{ prop.number }}</span>
        <h3 class="font-serif text-2xl text-ink leading-tight">{{ prop.title }}</h3>
        <p class="text-base text-ink-muted leading-relaxed font-light">{{ prop.body }}</p>
      </li>
    </ul>
  </section>
</template>
