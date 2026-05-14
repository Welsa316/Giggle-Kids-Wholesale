<script setup>
import SectionHeader from '../ui/SectionHeader.vue'
import { bestSellers } from '../../data/bestSellers.js'
</script>

<template>
  <section class="container-page py-section-lg md:py-section-xl" aria-label="Best sellers">
    <div class="grid lg:grid-cols-12 gap-10 mb-16 md:mb-20">
      <div class="lg:col-span-7">
        <SectionHeader
          eyebrow="Best sellers"
          title="What boutiques reorder."
        />
      </div>
      <div class="lg:col-span-4 lg:col-start-9 flex items-end" data-reveal style="--reveal-delay: 120ms">
        <p class="text-base md:text-lg text-ink-muted leading-relaxed font-light max-w-prose">
          Wholesale at roughly half of MSRP. Sizes Newborn through 6T, restocked weekly.
        </p>
      </div>
    </div>

    <div class="-mx-6 md:mx-0 overflow-x-auto md:overflow-visible scrollbar-hide">
      <ul class="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 px-6 md:px-0 snap-x snap-mandatory md:snap-none">
        <li
          v-for="(product, i) in bestSellers"
          :key="product.name"
          class="flex-none w-[72%] sm:w-[48%] md:w-auto snap-start flex flex-col group"
          data-reveal
          :style="`--reveal-delay: ${i * 120}ms`"
        >
          <div class="aspect-[4/5] overflow-hidden bg-cream-deep mb-5 relative">
            <!-- TODO: replace placeholder with real product photography -->
            <img
              :src="product.image"
              :alt="product.name"
              class="w-full h-full object-cover img-zoom"
              loading="lazy"
            />
          </div>
          <p class="text-[10px] uppercase tracking-[0.22em] text-ink-soft font-semibold mb-2">
            {{ product.sizes }}
          </p>
          <h3 class="font-serif text-xl text-ink leading-tight mb-3">{{ product.name }}</h3>

          <div class="flex items-baseline gap-3 mb-4">
            <p class="price-serif text-3xl">${{ product.wholesalePrice }}</p>
            <p class="text-[11px] uppercase tracking-[0.18em] text-ink-soft">
              wholesale
              <span class="block normal-case tracking-normal text-[11px] mt-0.5 text-ink-soft/70">
                ${{ product.retailPrice }} MSRP
              </span>
            </p>
          </div>

          <a
            :href="product.faireUrl"
            class="mt-auto inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] font-semibold text-purple self-start border-b border-purple/30 hover:border-purple pb-1 transition-colors"
          >
            View on Faire
            <span aria-hidden="true" class="transition-transform duration-500 group-hover:translate-x-1">→</span>
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>
