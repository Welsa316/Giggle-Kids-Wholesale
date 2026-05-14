<script setup>
import { onMounted } from 'vue'
import SectionHeader from '../ui/SectionHeader.vue'
import ProductCard from '../ui/ProductCard.vue'
import { useProducts } from '../../composables/useProducts.js'

const { products, fetchProducts } = useProducts()

onMounted(() => {
  fetchProducts({ first: 4, sortKey: 'BEST_SELLING' })
})
</script>

<template>
  <section class="container-page py-section-lg md:py-section-xl" aria-label="Best sellers">
    <div class="grid lg:grid-cols-12 gap-10 mb-16 md:mb-20">
      <div class="lg:col-span-7">
        <SectionHeader
          eyebrow="Best sellers"
          title="What our customers reorder."
        />
      </div>
      <div class="lg:col-span-4 lg:col-start-9 flex items-end" data-reveal style="--reveal-delay: 120ms">
        <p class="text-base md:text-lg text-ink-muted leading-relaxed font-light max-w-prose">
          Our most-loved pieces — handed down, gifted, kept. Sized Newborn through 6T.
        </p>
      </div>
    </div>

    <div class="-mx-6 md:mx-0 overflow-x-auto md:overflow-visible scrollbar-hide">
      <ul class="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 px-6 md:px-0 snap-x snap-mandatory md:snap-none">
        <li
          v-for="(product, i) in products"
          :key="product.id"
          class="flex-none w-[72%] sm:w-[48%] md:w-auto snap-start"
          data-reveal
          :style="`--reveal-delay: ${i * 120}ms`"
        >
          <ProductCard :product="product" />
        </li>
      </ul>
    </div>

    <div class="text-center mt-16 md:mt-20" data-reveal>
      <router-link
        to="/collections/all"
        class="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] font-semibold text-purple border-b border-purple/40 hover:border-purple pb-1 transition-colors"
      >
        Shop all
        <span aria-hidden="true">→</span>
      </router-link>
    </div>
  </section>
</template>
