<script setup>
import SectionHeader from '../ui/SectionHeader.vue'
import { valueProps } from '../../data/valueProps.js'
</script>

<template>
  <section class="container-page py-section-lg md:py-section-xl relative" aria-label="Why stock Giggle Kids">
    <div class="grid lg:grid-cols-12 gap-10 lg:gap-16 mb-16 md:mb-24">
      <div class="lg:col-span-5">
        <SectionHeader
          eyebrow="Why stock us"
          title=""
          description=""
        >
          <template #title>
            Boutique-built.<br />
            Faire-friendly.
          </template>
        </SectionHeader>
      </div>
      <div class="lg:col-span-6 lg:col-start-7 flex items-end" data-reveal style="--reveal-delay: 150ms">
        <p class="text-base md:text-lg text-ink-muted leading-relaxed font-light max-w-prose">
          Four reasons buyers come back season after season — and why the same boutiques have been with us since the beginning.
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
