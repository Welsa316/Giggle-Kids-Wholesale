import { ref, computed } from 'vue'
import {
  shopifyRequest,
  isShopifyConfigured,
  formatMoney,
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
const mutating = ref(false)
const error = ref(null)
const expiredNotice = ref(false)
const drawerOpen = ref(false)

const totalQuantity = computed(() => cart.value?.totalQuantity || 0)
const lines = computed(() =>
  (cart.value?.lines?.edges || []).map((e) => e.node)
)
const checkoutUrl = computed(() => cart.value?.checkoutUrl || null)
const subtotal = computed(() => cart.value?.cost?.subtotalAmount || null)
const total = computed(() => cart.value?.cost?.totalAmount || null)

function clearError() {
  error.value = null
}

function dismissExpiredNotice() {
  expiredNotice.value = false
}

export function cartLineSubtotal(line) {
  if (!line?.merchandise?.price) return ''
  const amt = parseFloat(line.merchandise.price.amount) * line.quantity
  if (Number.isNaN(amt)) return ''
  return formatMoney({ amount: String(amt), currencyCode: line.merchandise.price.currencyCode })
}

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
      // Cart expired or invalid — surface this to the user so they
      // understand why their bag is empty.
      localStorage.removeItem(STORAGE_KEY)
      cart.value = null
      expiredNotice.value = true
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
  const data = await shopifyRequest(MUTATION_CART_CREATE, { input: {} })
  const errs = data?.cartCreate?.userErrors
  if (errs?.length) throw new Error(errs.map((e) => e.message).join('; '))
  cart.value = data.cartCreate.cart
  localStorage.setItem(STORAGE_KEY, cart.value.id)
  return cart.value
}

async function addLine(merchandiseId, quantity = 1, attributes = []) {
  // Race-condition guard: if another mutation is in flight, refuse the
  // call so we don't end up with duplicate lines on Shopify.
  if (mutating.value) return
  mutating.value = true
  loading.value = true
  error.value = null
  try {
    await ensureCart()
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
    mutating.value = false
    loading.value = false
  }
}

async function updateLine(lineId, quantity) {
  if (!cart.value?.id) return
  if (mutating.value) return
  // Quantity 0 = remove. Shopify accepts it but the intent is clearer
  // (and the empty-cart path is exercised) if we delegate explicitly.
  if (quantity <= 0) return removeLine(lineId)
  mutating.value = true
  loading.value = true
  error.value = null
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
    mutating.value = false
    loading.value = false
  }
}

async function removeLine(lineId) {
  if (!cart.value?.id) return
  if (mutating.value) return
  mutating.value = true
  loading.value = true
  error.value = null
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
    mutating.value = false
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
    mutating,
    error,
    expiredNotice,
    drawerOpen,
    totalQuantity,
    subtotal,
    total,
    checkoutUrl,
    cartLineSubtotal,
    clearError,
    dismissExpiredNotice,
    loadCart,
    addLine,
    updateLine,
    removeLine,
    openCart,
    closeCart,
  }
}
