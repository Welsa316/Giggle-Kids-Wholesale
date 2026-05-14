<script setup>
import { computed } from 'vue'
import { formatMoney } from '../../lib/shopify.js'

const props = defineProps({
  product: { type: Object, required: true },
})

const image = computed(() => props.product.featuredImage || null)

const price = computed(() => formatMoney(props.product.priceRange?.minVariantPrice))
const compareAtPrice = computed(() => {
  const cmp = props.product.compareAtPriceRange?.minVariantPrice
  if (!cmp || parseFloat(cmp.amount) <= 0) return null
  if (cmp.amount === props.product.priceRange?.minVariantPrice?.amount) return null
  return formatMoney(cmp)
})

function onImgError(e) {
  e.target.style.visibility = 'hidden'
}
</script>

<template>
  <router-link
    :to="`/products/${product.handle}`"
    class="group flex flex-col"
  >
    <div class="aspect-[4/5] overflow-hidden bg-cream-deep mb-5 relative">
      <img
        v-if="image"
        :src="image.url"
        :alt="image.altText || product.title"
        class="absolute inset-0 w-full h-full object-cover img-zoom"
        loading="lazy"
        @error="onImgError"
      />
      <div
        v-if="!product.availableForSale"
        class="absolute inset-x-0 bottom-0 bg-ink text-cream text-center py-2 text-[10px] uppercase tracking-[0.22em] font-semibold"
      >
        Sold out
      </div>
    </div>
    <h3 class="font-serif text-lg text-ink leading-tight mb-2 group-hover:text-purple transition-colors duration-200">
      {{ product.title }}
    </h3>
    <div class="flex items-baseline gap-3">
      <p class="price-serif text-lg tabular-nums">{{ price }}</p>
      <p v-if="compareAtPrice" class="text-sm text-ink-soft line-through tabular-nums">{{ compareAtPrice }}</p>
    </div>
  </router-link>
</template>
