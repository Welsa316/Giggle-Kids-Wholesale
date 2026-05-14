import { ref } from 'vue'
import {
  shopifyRequest,
  isShopifyConfigured,
  QUERY_PRODUCTS,
  QUERY_PRODUCT_BY_HANDLE,
  QUERY_COLLECTION_BY_HANDLE,
  QUERY_COLLECTIONS,
} from '../lib/shopify.js'

// Placeholder data shown when Shopify isn't configured yet (dev preview mode).
function placeholderProduct(id, title, handle, color, price) {
  const url = `https://placehold.co/600x750/${color}/5D4A6E?text=${encodeURIComponent(title)}`
  const variantId = `gid://shopify/PlaceholderVariant/${id}`
  return {
    id,
    title,
    handle,
    availableForSale: true,
    vendor: 'Giggle Kids',
    description: 'Hand-smocked in our New Orleans studio. Made from soft cotton broadcloth, finished by hand, and built to be passed down.',
    descriptionHtml: '<p>Hand-smocked in our New Orleans studio. Made from soft cotton broadcloth, finished by hand, and built to be passed down.</p>',
    options: [{ name: 'Size', values: ['3M', '6M', '12M', '2T', '3T', '4T'] }],
    priceRange: { minVariantPrice: { amount: String(price), currencyCode: 'USD' } },
    compareAtPriceRange: { minVariantPrice: { amount: '0', currencyCode: 'USD' } },
    featuredImage: { url, altText: title, width: 600, height: 750 },
    images: { edges: [
      { node: { url, altText: title, width: 600, height: 750 } },
    ] },
    variants: { edges: [
      { node: { id: variantId, title: 'Default Title', availableForSale: true, quantityAvailable: 5, price: { amount: String(price), currencyCode: 'USD' }, compareAtPrice: null, selectedOptions: [], image: null } },
    ] },
  }
}

const PLACEHOLDER_PRODUCTS = [
  placeholderProduct('p1', 'Crawfish Smocked Bubble', 'crawfish-bubble', 'F5D6D9', 48),
  placeholderProduct('p2', 'Mardi Gras Bishop Dress', 'mardi-gras-bishop', 'EDE3D6', 58),
  placeholderProduct('p3', 'Classic White Day Gown', 'classic-white-day-gown', 'FAF6F1', 46),
  placeholderProduct('p4', "Seersucker Boy's Jon Jon", 'seersucker-jon-jon', 'B8C4B1', 50),
]

// Minimal placeholder set — used ONLY when Shopify isn't configured (dev preview).
// Once Shopify is connected, real collections replace these entirely.
const PLACEHOLDER_COLLECTIONS = [
  { id: 'c1', title: 'New Arrivals', handle: 'new-arrivals', description: 'Latest pieces from the studio',
    image: { url: 'https://placehold.co/800x800/F5D6D9/5D4A6E?text=Sample+Collection', altText: '' } },
  { id: 'c2', title: 'Mardi Gras', handle: 'mardi-gras', description: 'Purple, green, and gold for parade season',
    image: { url: 'https://placehold.co/800x800/5D4A6E/FAF6F1?text=Sample+Collection', altText: '' } },
  { id: 'c3', title: 'Everyday', handle: 'everyday', description: 'Smocked classics for every day',
    image: { url: 'https://placehold.co/800x800/EDE3D6/5D4A6E?text=Sample+Collection', altText: '' } },
]

export function useProducts() {
  const products = ref([])
  const loading = ref(false)
  const error = ref(null)

  async function fetchProducts({ first = 8, sortKey = 'BEST_SELLING', reverse = false } = {}) {
    if (!isShopifyConfigured) {
      products.value = PLACEHOLDER_PRODUCTS
      return PLACEHOLDER_PRODUCTS
    }
    loading.value = true
    try {
      const data = await shopifyRequest(QUERY_PRODUCTS, { first, sortKey, reverse })
      products.value = (data?.products?.edges || []).map((e) => e.node)
      return products.value
    } catch (e) {
      error.value = e.message
      products.value = PLACEHOLDER_PRODUCTS
      return PLACEHOLDER_PRODUCTS
    } finally {
      loading.value = false
    }
  }

  async function fetchProductByHandle(handle) {
    if (!isShopifyConfigured) {
      return PLACEHOLDER_PRODUCTS.find((p) => p.handle === handle) || null
    }
    loading.value = true
    try {
      const data = await shopifyRequest(QUERY_PRODUCT_BY_HANDLE, { handle })
      return data?.product || null
    } catch (e) {
      error.value = e.message
      return null
    } finally {
      loading.value = false
    }
  }

  async function fetchCollectionByHandle(handle, first = 24) {
    if (!isShopifyConfigured) {
      const col = PLACEHOLDER_COLLECTIONS.find((c) => c.handle === handle)
      return col ? { ...col, products: { edges: PLACEHOLDER_PRODUCTS.map((node) => ({ node })) } } : null
    }
    loading.value = true
    try {
      const data = await shopifyRequest(QUERY_COLLECTION_BY_HANDLE, { handle, first })
      return data?.collection || null
    } catch (e) {
      error.value = e.message
      return null
    } finally {
      loading.value = false
    }
  }

  return { products, loading, error, fetchProducts, fetchProductByHandle, fetchCollectionByHandle }
}

export function useCollections() {
  const collections = ref([])
  const loading = ref(false)
  const error = ref(null)

  async function fetchCollections({ first = 6 } = {}) {
    if (!isShopifyConfigured) {
      collections.value = PLACEHOLDER_COLLECTIONS
      return PLACEHOLDER_COLLECTIONS
    }
    loading.value = true
    try {
      const data = await shopifyRequest(QUERY_COLLECTIONS, { first })
      collections.value = (data?.collections?.edges || []).map((e) => e.node)
      return collections.value
    } catch (e) {
      error.value = e.message
      collections.value = PLACEHOLDER_COLLECTIONS
      return PLACEHOLDER_COLLECTIONS
    } finally {
      loading.value = false
    }
  }

  return { collections, loading, error, fetchCollections }
}
