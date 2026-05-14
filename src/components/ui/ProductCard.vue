<script setup>
import { computed } from 'vue'
import { formatMoney } from '../../lib/shopify.js'

const props = defineProps({
  product: { type: Object, required: true },
})

const image = computed(() => {
  if (props.product.featuredImage) return props.product.featuredImage
  const first = props.product.images?.edges?.[0]?.node
  return first || null
})

const secondImage = computed(() => {
  const second = props.product.images?.edges?.[1]?.node
  return second || null
})

const price = computed(() => formatMoney(props.product.priceRange?.minVariantPrice))
const compareAtPrice = computed(() => {
  const cmp = props.product.compareAtPriceRange?.minVariantPrice
  if (!cmp || parseFloat(cmp.amount) <= 0) return null
  if (cmp.amount === props.product.priceRange?.minVariantPrice?.amount) return null
  return formatMoney(cmp)
})
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
        class="absolute inset-0 w-full h-full object-cover img-zoom transition-opacity duration-700 ease-editorial"
        :class="secondImage && 'group-hover:opacity-0'"
        loading="lazy"
      />
      <img
        v-if="secondImage"
        :src="secondImage.url"
        :alt="secondImage.altText || product.title"
        class="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-editorial"
        loading="lazy"
      />
      <div
        v-if="!product.availableForSale"
        class="absolute inset-x-0 bottom-0 bg-ink/80 text-cream text-center py-2 text-[10px] uppercase tracking-[0.22em] font-semibold"
      >
        Sold out
      </div>
    </div>
    <h3 class="font-serif text-lg text-ink leading-tight mb-2 group-hover:text-purple transition-colors">
      {{ product.title }}
    </h3>
    <div class="flex items-baseline gap-3">
      <p class="price-serif text-lg">{{ price }}</p>
      <p v-if="compareAtPrice" class="text-sm text-ink-soft line-through">{{ compareAtPrice }}</p>
    </div>
  </router-link>
</template>
