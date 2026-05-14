<script setup>
import SectionHeader from '../ui/SectionHeader.vue'
import { bestSellers } from '../../data/bestSellers.js'
</script>

<template>
  <section class="container-page py-section md:py-section-lg" aria-label="Best sellers">
    <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
      <SectionHeader
        eyebrow="Best sellers"
        title="What boutiques reorder."
        description="Wholesale at roughly 50% of MSRP. Sizes Newborn through 6T."
      />
    </div>

    <div class="mt-10 md:mt-14 -mx-6 md:mx-0 overflow-x-auto md:overflow-visible scrollbar-hide">
      <ul class="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 px-6 md:px-0 snap-x snap-mandatory md:snap-none">
        <li
          v-for="product in bestSellers"
          :key="product.name"
          class="flex-none w-[72%] sm:w-[48%] md:w-auto snap-start flex flex-col"
        >
          <div class="aspect-[4/5] overflow-hidden rounded bg-cream">
            <!-- TODO: replace placeholder image with real product photography -->
            <img
              :src="product.image"
              :alt="product.name"
              class="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div class="mt-4 flex flex-col gap-1">
            <h3 class="font-sans font-semibold text-ink text-base">{{ product.name }}</h3>
            <p class="text-xs text-ink-muted">{{ product.sizes }}</p>
            <p class="font-serif text-lg text-purple mt-1">
              ${{ product.wholesalePrice }}
              <span class="text-xs font-sans text-ink-muted font-normal ml-1">wholesale · ${{ product.retailPrice }} MSRP</span>
            </p>
            <a
              :href="product.faireUrl"
              class="mt-2 text-sm font-semibold text-purple underline underline-offset-4 decoration-purple/40 hover:decoration-purple decoration-1 inline-flex items-center gap-1 self-start"
            >
              View on Faire
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>
