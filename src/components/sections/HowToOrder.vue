<script setup>
import SectionHeader from '../ui/SectionHeader.vue'
import { steps } from '../../data/steps.js'
</script>

<template>
  <section id="how-to-order" class="container-page py-section md:py-section-lg">
    <SectionHeader
      eyebrow="How to order"
      title="Three steps to a stocked shelf."
      align="center"
    />

    <ol class="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-10 max-w-5xl mx-auto relative">
      <span
        class="hidden md:block absolute top-6 left-[16.66%] right-[16.66%] h-px bg-border"
        aria-hidden="true"
      />
      <li
        v-for="step in steps"
        :key="step.number"
        class="flex flex-col items-center text-center gap-3 relative"
      >
        <div
          class="w-12 h-12 rounded-full bg-cream border border-border flex items-center justify-center font-serif text-purple text-lg relative z-10"
        >
          {{ step.number }}
        </div>
        <h3 class="font-serif text-h3 text-ink mt-2">{{ step.title }}</h3>
        <p class="text-base text-ink-muted leading-relaxed max-w-xs">{{ step.body }}</p>
      </li>
    </ol>
  </section>
</template>
