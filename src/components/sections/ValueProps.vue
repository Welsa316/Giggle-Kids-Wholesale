<script setup>
import SectionHeader from '../ui/SectionHeader.vue'

const valueProps = [
  {
    number: '01',
    title: 'Hand-smocked, every piece',
    body: 'Sewn by a small team of New Orleans smockers — never machine-finished, never outsourced.',
  },
  {
    number: '02',
    title: 'Heirloom-grade construction',
    body: 'Reinforced seams, finished hems, and fabrics that survive being passed down to a younger sibling.',
  },
  {
    number: '03',
    title: 'Made-here detail',
    body: 'Mardi Gras, crawfish, fleur de lis, seersucker — Louisiana motifs you won\'t find on the rack.',
  },
  {
    number: '04',
    title: 'Ships within 48 hours',
    body: 'Stocked and shipped from our New Orleans studio. Complimentary shipping over $75.',
  },
]
</script>

<template>
  <section class="container-page py-section-lg md:py-section-xl relative" aria-label="What we make">
    <div class="grid lg:grid-cols-12 gap-10 lg:gap-16 mb-16 md:mb-24">
      <div class="lg:col-span-5">
        <SectionHeader
          eyebrow="What we make"
          title="Boutique-grade. Built to keep."
        />
      </div>
      <div class="lg:col-span-6 lg:col-start-7 flex items-end" data-reveal style="--reveal-delay: 150ms">
        <p class="text-base md:text-lg text-ink-muted leading-relaxed font-light max-w-prose">
          Four reasons our customers come back season after season — christening, Mardi Gras, Easter, and the seasonal staples in between.
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
