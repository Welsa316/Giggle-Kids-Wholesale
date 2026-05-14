<script setup>
import SectionHeader from '../ui/SectionHeader.vue'
import { collections } from '../../data/collections.js'
</script>

<template>
  <section id="collections" class="bg-white border-y border-border">
    <div class="container-page py-section md:py-section-lg">
      <SectionHeader
        eyebrow="Collections"
        title="Stock the season."
        description="Six core collections refreshed throughout the year. Order what your buyers actually ask for."
      />

      <ul class="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        <li
          v-for="collection in collections"
          :key="collection.name"
          class="group relative overflow-hidden rounded aspect-square bg-cream"
        >
          <a href="#" class="block w-full h-full">
            <!-- TODO: replace placeholder Unsplash with real category photography -->
            <img
              :src="collection.image"
              :alt="`${collection.name} collection`"
              class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-[1.04]"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/15 to-transparent transition-opacity duration-500 group-hover:from-ink/80" aria-hidden="true" />
            <div class="absolute inset-x-0 bottom-0 p-5 md:p-6 text-cream">
              <h3 class="font-serif text-xl md:text-2xl">{{ collection.name }}</h3>
              <p class="text-sm text-cream/85 mt-1">{{ collection.blurb }}</p>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>
