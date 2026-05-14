import { ref, computed } from 'vue'
import {
  isCustomerAccountConfigured,
  getAccessToken,
  customerRequest,
  startLogin,
  handleCallback,
  logout as oauthLogout,
  QUERY_CUSTOMER,
  QUERY_CUSTOMER_ORDERS,
} from '../lib/shopifyAccount.js'

const customer = ref(null)
const loading = ref(false)
const error = ref(null)

const isAuthenticated = computed(() => Boolean(getAccessToken()))

async function loadCustomer() {
  if (!getAccessToken()) {
    customer.value = null
    return null
  }
  loading.value = true
  try {
    const data = await customerRequest(QUERY_CUSTOMER)
    customer.value = data?.customer || null
    return customer.value
  } catch (e) {
    error.value = e.message
    customer.value = null
    return null
  } finally {
    loading.value = false
  }
}

async function fetchOrders(first = 20) {
  if (!getAccessToken()) return []
  try {
    const data = await customerRequest(QUERY_CUSTOMER_ORDERS, { first })
    return (data?.customer?.orders?.edges || []).map((e) => e.node)
  } catch (e) {
    error.value = e.message
    return []
  }
}

function logout() {
  oauthLogout()
  customer.value = null
}

if (typeof window !== 'undefined' && getAccessToken()) {
  loadCustomer()
}

export function useCustomer() {
  return {
    customer,
    loading,
    error,
    isAuthenticated,
    isCustomerAccountConfigured,
    loadCustomer,
    fetchOrders,
    startLogin,
    handleCallback,
    logout,
  }
}
