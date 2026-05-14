<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import DOMPurify from 'dompurify'
import { useProducts } from '../composables/useProducts.js'
import { useCart } from '../composables/useCart.js'
import { formatMoney } from '../lib/shopify.js'

const props = defineProps({
  handle: { type: String, required: true },
})

const route = useRoute()
const router = useRouter()
const { fetchProductByHandle, loading } = useProducts()
const { addLine, loading: cartLoading } = useCart()

const product = ref(null)
const selectedVariantId = ref(null)
const selectedImageIndex = ref(0)
const adding = ref(false)
const justAdded = ref(false)

const variants = computed(() => (product.value?.variants?.edges || []).map((e) => e.node))
const images = computed(() => (product.value?.images?.edges || []).map((e) => e.node))
const selectedVariant = computed(() => variants.value.find((v) => v.id === selectedVariantId.value))
const price = computed(() => formatMoney(selectedVariant.value?.price || product.value?.priceRange?.minVariantPrice))
const compareAtPrice = computed(() => {
  const cmp = selectedVariant.value?.compareAtPrice
  if (!cmp || parseFloat(cmp.amount) <= 0) return null
  return formatMoney(cmp)
})
const inStock = computed(() => selectedVariant.value?.availableForSale)

// Sanitize Shopify product description HTML before rendering. Shopify-authored
// HTML is generally trusted, but a compromised store account or supply-chain
// attack on Shopify could inject script tags. Sanitize defensively.
const safeDescription = computed(() => {
  if (!product.value?.descriptionHtml) return ''
  return DOMPurify.sanitize(product.value.descriptionHtml, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'b', 'i', 'u', 'ul', 'ol', 'li', 'a', 'h2', 'h3', 'h4', 'blockquote'],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
  })
})

const notFound = ref(false)

async function load() {
  notFound.value = false
  product.value = null
  const fetched = await fetchProductByHandle(props.handle)
  if (!fetched) {
    notFound.value = true
    return
  }
  product.value = fetched
  // pick first available variant by default
  const firstAvailable = variants.value.find((v) => v.availableForSale) || variants.value[0]
  selectedVariantId.value = firstAvailable?.id
  selectedImageIndex.value = 0
}

function onImgError(e) {
  e.target.style.visibility = 'hidden'
}

async function onAddToCart() {
  if (!selectedVariantId.value || !inStock.value) return
  adding.value = true
  try {
    await addLine(selectedVariantId.value, 1)
    justAdded.value = true
    setTimeout(() => (justAdded.value = false), 2000)
  } catch (e) {
    console.error(e)
  } finally {
    adding.value = false
  }
}

onMounted(load)
watch(() => props.handle, load)
</script>

<template>
  <div v-if="notFound" class="container-page py-section text-center">
    <p class="eyebrow mb-4">404</p>
    <h1 class="font-serif text-h1 text-ink mb-4">Product not found.</h1>
    <p class="text-base text-ink-muted leading-relaxed font-light mb-8 max-w-md mx-auto">
      We couldn't find that product. It may have been removed or the link may be wrong.
    </p>
    <router-link
      to="/collections/all"
      class="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] font-semibold text-purple border-b border-purple/40 hover:border-purple pb-1 transition-colors"
    >
      Browse all products
      <span aria-hidden="true">→</span>
    </router-link>
  </div>

  <div v-else-if="loading && !product" class="container-page py-section text-center">
    <p class="font-serif italic text-ink-muted">Loading…</p>
  </div>

  <article v-else-if="product" class="container-page py-12 md:py-section">
    <nav class="text-[10px] uppercase tracking-[0.22em] text-ink-soft mb-8 md:mb-12" aria-label="Breadcrumb">
      <router-link to="/" class="hover:text-purple transition-colors">Home</router-link>
      <span class="mx-2">·</span>
      <router-link to="/collections/all" class="hover:text-purple transition-colors">Shop</router-link>
      <span class="mx-2">·</span>
      <span class="text-ink">{{ product.title }}</span>
    </nav>

    <div class="grid lg:grid-cols-12 gap-10 lg:gap-16">
      <!-- IMAGES -->
      <div class="lg:col-span-7 flex flex-col gap-4">
        <div class="aspect-[4/5] bg-cream-deep overflow-hidden">
          <img
            v-if="images[selectedImageIndex]"
            :src="images[selectedImageIndex].url"
            :alt="images[selectedImageIndex].altText || product.title"
            class="w-full h-full object-cover"
            @error="onImgError"
          />
        </div>
        <ul v-if="images.length > 1" class="grid grid-cols-5 gap-3">
          <li v-for="(img, i) in images" :key="img.url">
            <button
              type="button"
              :aria-label="`View image ${i + 1}`"
              :class="[
                'block aspect-square overflow-hidden bg-cream-deep transition-all',
                i === selectedImageIndex ? 'ring-2 ring-purple ring-offset-2 ring-offset-cream' : 'opacity-70 hover:opacity-100',
              ]"
              @click="selectedImageIndex = i"
            >
              <img :src="img.url" :alt="img.altText || ''" class="w-full h-full object-cover" @error="onImgError" />
            </button>
          </li>
        </ul>
      </div>

      <!-- DETAILS -->
      <div class="lg:col-span-5 lg:sticky lg:top-28 lg:self-start flex flex-col gap-6">
        <div>
          <p v-if="product.vendor" class="text-[10px] uppercase tracking-[0.28em] text-ink-soft font-semibold mb-3">
            {{ product.vendor }}
          </p>
          <h1 class="font-serif text-h1 text-ink">{{ product.title }}</h1>
          <div class="flex items-baseline gap-4 mt-4">
            <p class="price-serif text-3xl">{{ price }}</p>
            <p v-if="compareAtPrice" class="text-base text-ink-soft line-through">{{ compareAtPrice }}</p>
          </div>
        </div>

        <div v-if="variants.length > 1" class="flex flex-col gap-3 mt-4 pt-6 border-t border-border-ink/40">
          <p class="text-[10px] uppercase tracking-[0.22em] text-ink-muted font-semibold">Size</p>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="variant in variants"
              :key="variant.id"
              type="button"
              :disabled="!variant.availableForSale"
              :class="[
                'px-4 py-2 text-sm border transition-colors',
                selectedVariantId === variant.id
                  ? 'border-purple bg-purple text-cream'
                  : 'border-border-ink/60 text-ink hover:border-purple',
                !variant.availableForSale && 'opacity-40 line-through cursor-not-allowed',
              ]"
              @click="selectedVariantId = variant.id"
            >
              {{ variant.title }}
            </button>
          </div>
        </div>

        <button
          type="button"
          :disabled="!inStock || adding || cartLoading"
          class="w-full bg-purple text-cream py-4 text-[11px] uppercase tracking-[0.18em] font-semibold rounded-full hover:bg-purple-deep transition-colors disabled:bg-ink-soft disabled:cursor-not-allowed mt-4"
          @click="onAddToCart"
        >
          <span v-if="!inStock">Sold out</span>
          <span v-else-if="justAdded">Added to bag ✓</span>
          <span v-else-if="adding">Adding…</span>
          <span v-else>Add to bag &middot; {{ price }}</span>
        </button>

        <div
          v-if="safeDescription"
          class="prose prose-sm max-w-none text-ink-muted font-light leading-relaxed mt-6 pt-6 border-t border-border-ink/40"
          v-html="safeDescription"
        />

        <ul class="flex flex-col gap-2 text-sm text-ink-muted mt-6 pt-6 border-t border-border-ink/40">
          <li class="flex items-center gap-3">
            <span class="block w-1 h-1 rounded-full bg-purple-soft" />
            Hand-smocked in our New Orleans studio
          </li>
          <li class="flex items-center gap-3">
            <span class="block w-1 h-1 rounded-full bg-purple-soft" />
            Ships within 48 hours
          </li>
          <li class="flex items-center gap-3">
            <span class="block w-1 h-1 rounded-full bg-purple-soft" />
            Complimentary shipping over $75
          </li>
        </ul>
      </div>
    </div>
  </article>
</template>
