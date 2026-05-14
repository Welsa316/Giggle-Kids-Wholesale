<script setup>
import { ref, onMounted, watch } from 'vue'
import { useProducts } from '../composables/useProducts.js'
import ProductCard from '../components/ui/ProductCard.vue'

const props = defineProps({
  handle: { type: String, required: true },
})

const { fetchCollectionByHandle, loading } = useProducts()
const collection = ref(null)
const products = ref([])

async function load() {
  collection.value = await fetchCollectionByHandle(props.handle, 48)
  products.value = (collection.value?.products?.edges || []).map((e) => e.node)
}

onMounted(load)
watch(() => props.handle, load)
</script>

<template>
  <div class="container-page py-12 md:py-section">
    <nav class="text-[10px] uppercase tracking-[0.22em] text-ink-soft mb-8" aria-label="Breadcrumb">
      <router-link to="/" class="hover:text-purple transition-colors">Home</router-link>
      <span class="mx-2">·</span>
      <span class="text-ink">{{ collection?.title || handle }}</span>
    </nav>

    <header class="max-w-3xl mb-12 md:mb-16">
      <p class="eyebrow mb-3">Collection</p>
      <h1 class="font-serif text-display text-ink">
        {{ collection?.title || 'Loading…' }}
      </h1>
      <p v-if="collection?.description" class="text-base md:text-lg text-ink-muted leading-relaxed font-light mt-5">
        {{ collection.description }}
      </p>
    </header>

    <div v-if="loading && !products.length" class="text-center py-16">
      <p class="font-serif italic text-ink-muted">Loading…</p>
    </div>

    <div v-else-if="products.length === 0" class="text-center py-16">
      <p class="font-serif text-2xl text-ink mb-3">Nothing here yet.</p>
      <p class="text-sm text-ink-muted">Check back soon, or
        <router-link to="/collections/all" class="text-purple border-b border-purple/40 hover:border-purple">browse everything</router-link>.
      </p>
    </div>

    <ul v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12 md:gap-y-16">
      <li v-for="(product, i) in products" :key="product.id" data-reveal :style="`--reveal-delay: ${(i % 4) * 80}ms`">
        <ProductCard :product="product" />
      </li>
    </ul>
  </div>
</template>
