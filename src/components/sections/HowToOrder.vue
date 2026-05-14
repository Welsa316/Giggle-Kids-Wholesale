<script setup>
import SectionHeader from '../ui/SectionHeader.vue'
import { steps } from '../../data/steps.js'
</script>

<template>
  <section id="how-to-order" class="container-page py-section-lg md:py-section-xl">
    <SectionHeader
      eyebrow="How to order"
      title="Three steps to a stocked shelf."
      align="center"
    />

    <ol class="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-x-12 lg:gap-x-20 gap-y-14 max-w-5xl mx-auto relative">
      <span
        class="hidden md:block absolute top-9 left-[16.66%] right-[16.66%] h-px bg-border-ink/60"
        aria-hidden="true"
      />
      <li
        v-for="(step, i) in steps"
        :key="step.number"
        class="flex flex-col items-center text-center gap-5 relative"
        data-reveal
        :style="`--reveal-delay: ${i * 150}ms`"
      >
        <div
          class="w-[72px] h-[72px] rounded-full bg-cream border border-border-ink flex items-center justify-center font-serif italic text-purple text-2xl relative z-10"
        >
          {{ step.number }}
        </div>
        <h3 class="font-serif text-2xl text-ink mt-1 leading-tight">{{ step.title }}</h3>
        <p class="text-base text-ink-muted leading-relaxed font-light max-w-[26ch]">{{ step.body }}</p>
      </li>
    </ol>
  </section>
</template>
