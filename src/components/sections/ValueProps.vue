<script setup>
import SectionHeader from '../ui/SectionHeader.vue'
import { valueProps } from '../../data/valueProps.js'
</script>

<template>
  <section class="container-page py-section md:py-section-lg" aria-label="Why stock Giggle Kids">
    <SectionHeader
      eyebrow="Why stock us"
      title="Boutique-built. Faire-friendly."
      description="Four reasons buyers come back season after season."
    />

    <ul class="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
      <li
        v-for="prop in valueProps"
        :key="prop.number"
        class="flex flex-col gap-3 pt-6 border-t border-border"
      >
        <span class="font-serif text-2xl text-purple-soft">{{ prop.number }}</span>
        <h3 class="font-serif text-h3 text-ink">{{ prop.title }}</h3>
        <p class="text-base text-ink-muted leading-relaxed">{{ prop.body }}</p>
      </li>
    </ul>
  </section>
</template>
