import { ref, computed } from 'vue'
import {
  shopifyRequest,
  isShopifyConfigured,
  MUTATION_CART_CREATE,
  MUTATION_CART_LINES_ADD,
  MUTATION_CART_LINES_UPDATE,
  MUTATION_CART_LINES_REMOVE,
  QUERY_CART,
} from '../lib/shopify.js'

// Module-level state — single shared cart across the app.
const STORAGE_KEY = 'gk_cart_id'

const cart = ref(null)
const loading = ref(false)
const error = ref(null)
const drawerOpen = ref(false)

const totalQuantity = computed(() => cart.value?.totalQuantity || 0)
const lines = computed(() =>
  (cart.value?.lines?.edges || []).map((e) => e.node)
)
const checkoutUrl = computed(() => cart.value?.checkoutUrl || null)
const subtotal = computed(() => cart.value?.cost?.subtotalAmount || null)
const total = computed(() => cart.value?.cost?.totalAmount || null)

async function loadCart() {
  if (!isShopifyConfigured) return
  const id = localStorage.getItem(STORAGE_KEY)
  if (!id) return
  try {
    loading.value = true
    const data = await shopifyRequest(QUERY_CART, { id })
    if (data?.cart) {
      cart.value = data.cart
    } else {
      // cart expired or invalid — clear
      localStorage.removeItem(STORAGE_KEY)
      cart.value = null
    }
  } catch (e) {
    error.value = e.message
    localStorage.removeItem(STORAGE_KEY)
  } finally {
    loading.value = false
  }
}

async function ensureCart() {
  if (cart.value?.id) return cart.value
  if (!isShopifyConfigured) {
    throw new Error('Shopify not configured.')
  }
  loading.value = true
  try {
    const data = await shopifyRequest(MUTATION_CART_CREATE, { input: {} })
    const errs = data?.cartCreate?.userErrors
    if (errs?.length) throw new Error(errs.map((e) => e.message).join('; '))
    cart.value = data.cartCreate.cart
    localStorage.setItem(STORAGE_KEY, cart.value.id)
    return cart.value
  } finally {
    loading.value = false
  }
}

async function addLine(merchandiseId, quantity = 1, attributes = []) {
  await ensureCart()
  loading.value = true
  error.value = null
  try {
    const data = await shopifyRequest(MUTATION_CART_LINES_ADD, {
      cartId: cart.value.id,
      lines: [{ merchandiseId, quantity, attributes }],
    })
    const errs = data?.cartLinesAdd?.userErrors
    if (errs?.length) throw new Error(errs.map((e) => e.message).join('; '))
    cart.value = data.cartLinesAdd.cart
    drawerOpen.value = true
  } catch (e) {
    error.value = e.message
    throw e
  } finally {
    loading.value = false
  }
}

async function updateLine(lineId, quantity) {
  if (!cart.value?.id) return
  loading.value = true
  try {
    const data = await shopifyRequest(MUTATION_CART_LINES_UPDATE, {
      cartId: cart.value.id,
      lines: [{ id: lineId, quantity }],
    })
    const errs = data?.cartLinesUpdate?.userErrors
    if (errs?.length) throw new Error(errs.map((e) => e.message).join('; '))
    cart.value = data.cartLinesUpdate.cart
  } catch (e) {
    error.value = e.message
    throw e
  } finally {
    loading.value = false
  }
}

async function removeLine(lineId) {
  if (!cart.value?.id) return
  loading.value = true
  try {
    const data = await shopifyRequest(MUTATION_CART_LINES_REMOVE, {
      cartId: cart.value.id,
      lineIds: [lineId],
    })
    const errs = data?.cartLinesRemove?.userErrors
    if (errs?.length) throw new Error(errs.map((e) => e.message).join('; '))
    cart.value = data.cartLinesRemove.cart
  } catch (e) {
    error.value = e.message
    throw e
  } finally {
    loading.value = false
  }
}

function openCart() {
  drawerOpen.value = true
}

function closeCart() {
  drawerOpen.value = false
}

// Auto-load cart on first import
if (typeof window !== 'undefined' && isShopifyConfigured) {
  loadCart()
}

export function useCart() {
  return {
    cart,
    lines,
    loading,
    error,
    drawerOpen,
    totalQuantity,
    subtotal,
    total,
    checkoutUrl,
    loadCart,
    addLine,
    updateLine,
    removeLine,
    openCart,
    closeCart,
  }
}
