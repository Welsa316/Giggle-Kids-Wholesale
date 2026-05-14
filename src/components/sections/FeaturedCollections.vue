<script setup>
import SectionHeader from '../ui/SectionHeader.vue'
import { collections } from '../../data/collections.js'
</script>

<template>
  <section id="collections" class="bg-cream-deep relative overflow-hidden">
    <div class="container-page py-section-lg md:py-section-xl">
      <div class="grid lg:grid-cols-12 gap-10 mb-16 md:mb-20">
        <div class="lg:col-span-7">
          <SectionHeader
            eyebrow="The collections"
            title=""
            description=""
          >
            <template #title>
              Six rooms in <span class="accent-italic">the house</span>.
            </template>
          </SectionHeader>
        </div>
        <div class="lg:col-span-4 lg:col-start-9 flex items-end" data-reveal style="--reveal-delay: 150ms">
          <p class="text-base md:text-lg text-ink-muted leading-relaxed font-light max-w-prose">
            Six core collections refreshed throughout the year. Order what your buyers actually ask for.
          </p>
        </div>
      </div>

      <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 md:gap-y-16">
        <li
          v-for="(collection, i) in collections"
          :key="collection.name"
          class="group flex flex-col gap-4"
          data-reveal
          :style="`--reveal-delay: ${(i % 3) * 120}ms`"
        >
          <a href="#" class="block relative overflow-hidden bg-cream aspect-[4/5]">
            <!-- TODO: replace placeholder with real category photography -->
            <img
              :src="collection.image"
              :alt="`${collection.name} collection`"
              class="absolute inset-0 w-full h-full object-cover img-zoom"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-editorial" aria-hidden="true" />
          </a>
          <div class="flex items-baseline justify-between gap-4 px-1">
            <div>
              <p class="text-[10px] uppercase tracking-[0.28em] text-ink-soft font-semibold mb-1.5">
                No. {{ String(i + 1).padStart(2, '0') }}
              </p>
              <h3 class="font-serif text-2xl text-ink">{{ collection.name }}</h3>
              <p class="font-serif italic text-sm text-ink-muted mt-1.5">{{ collection.blurb }}</p>
            </div>
            <span aria-hidden="true" class="text-purple text-xl translate-y-0 transition-transform duration-500 ease-editorial group-hover:translate-x-1">→</span>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>
