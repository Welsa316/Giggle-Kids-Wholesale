<script setup>
import SectionHeader from '../ui/SectionHeader.vue'

const valueProps = [
  {
    number: '01',
    title: 'Made in New Orleans',
    body: 'Designed, sewn, and finished in our small New Orleans studio — never outsourced.',
  },
  {
    number: '02',
    title: 'Two ways to make',
    body: 'Soft bamboo prints for everyday and parade season; hand-smocked dresses, bubbles, and shorts sets for the keepsake pieces.',
  },
  {
    number: '03',
    title: 'Louisiana motifs',
    body: 'Mardi Gras and crawfish prints you won\'t find on the rack — designed for the families who actually live them.',
  },
  {
    number: '04',
    title: 'Built to be passed down',
    body: 'Reinforced seams, finished hems, and fabrics that survive a younger sibling.',
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
          Four reasons families come back season after season — Mardi Gras, crawfish boil weekends, and the in-between days when a soft bamboo print just feels right.
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
