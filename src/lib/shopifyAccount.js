// =============================================================================
// SHOPIFY CUSTOMER ACCOUNT API — OAuth (PKCE) + GraphQL helper
// =============================================================================
//
// Spec: https://shopify.dev/docs/api/customer
// OAuth: https://shopify.dev/docs/storefronts/headless/building-with-the-customer-account-api/getting-started
//
// Required env vars (see SHOPIFY_SETUP.md for setup):
//   VITE_SHOPIFY_SHOP_ID                   numeric shop id (NOT the .myshopify.com domain)
//   VITE_SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID  public client id from Customer Account API
//   VITE_SHOPIFY_CUSTOMER_ACCOUNT_REDIRECT_URI  e.g. https://yourdomain.com/account/callback
//
// This is a public-client OAuth flow (PKCE). No client_secret required.
// =============================================================================

const SHOP_ID = import.meta.env.VITE_SHOPIFY_SHOP_ID
const CLIENT_ID = import.meta.env.VITE_SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID
const REDIRECT_URI = import.meta.env.VITE_SHOPIFY_CUSTOMER_ACCOUNT_REDIRECT_URI
const API_VERSION = import.meta.env.VITE_SHOPIFY_API_VERSION || '2024-10'

export const isCustomerAccountConfigured = Boolean(SHOP_ID && CLIENT_ID && REDIRECT_URI)

const STORAGE_KEY_TOKEN = 'gk_customer_token'
const STORAGE_KEY_REFRESH = 'gk_customer_refresh'
const STORAGE_KEY_EXPIRY = 'gk_customer_expiry'
const STORAGE_KEY_VERIFIER = 'gk_pkce_verifier'
const STORAGE_KEY_STATE = 'gk_oauth_state'

const AUTHORIZE_URL = SHOP_ID && `https://shopify.com/authentication/${SHOP_ID}/oauth/authorize`
const TOKEN_URL = SHOP_ID && `https://shopify.com/authentication/${SHOP_ID}/oauth/token`
const GRAPHQL_URL = SHOP_ID && `https://shopify.com/${SHOP_ID}/account/customer/api/${API_VERSION}/graphql`

// =============================================================================
// PKCE HELPERS
// =============================================================================

function base64UrlEncode(buf) {
  return btoa(String.fromCharCode(...new Uint8Array(buf)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

async function sha256(input) {
  const data = new TextEncoder().encode(input)
  return crypto.subtle.digest('SHA-256', data)
}

function randomString(length = 64) {
  const bytes = new Uint8Array(length)
  crypto.getRandomValues(bytes)
  return base64UrlEncode(bytes.buffer).slice(0, length)
}

async function generatePkceChallenge() {
  const verifier = randomString(64)
  const challenge = base64UrlEncode(await sha256(verifier))
  return { verifier, challenge }
}

// =============================================================================
// AUTH FLOW
// =============================================================================

export async function startLogin() {
  if (!isCustomerAccountConfigured) {
    throw new Error('Customer Account API not configured. See SHOPIFY_SETUP.md.')
  }

  const { verifier, challenge } = await generatePkceChallenge()
  const state = randomString(32)

  sessionStorage.setItem(STORAGE_KEY_VERIFIER, verifier)
  sessionStorage.setItem(STORAGE_KEY_STATE, state)

  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: 'code',
    redirect_uri: REDIRECT_URI,
    scope: 'openid email customer-account-api:full',
    state,
    code_challenge: challenge,
    code_challenge_method: 'S256',
  })

  window.location.href = `${AUTHORIZE_URL}?${params.toString()}`
}

export async function handleCallback(code, state) {
  const expectedState = sessionStorage.getItem(STORAGE_KEY_STATE)
  if (!expectedState || expectedState !== state) {
    throw new Error('OAuth state mismatch — possible CSRF attempt.')
  }
  const verifier = sessionStorage.getItem(STORAGE_KEY_VERIFIER)
  if (!verifier) {
    throw new Error('Missing PKCE verifier — restart login.')
  }
  sessionStorage.removeItem(STORAGE_KEY_VERIFIER)
  sessionStorage.removeItem(STORAGE_KEY_STATE)

  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    code,
    code_verifier: verifier,
  })

  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  })
  if (!res.ok) {
    throw new Error(`Token exchange failed: ${res.status}`)
  }
  const data = await res.json()
  persistTokens(data)
  return data
}

function persistTokens({ access_token, refresh_token, expires_in }) {
  if (access_token) localStorage.setItem(STORAGE_KEY_TOKEN, access_token)
  if (refresh_token) localStorage.setItem(STORAGE_KEY_REFRESH, refresh_token)
  if (expires_in) {
    localStorage.setItem(STORAGE_KEY_EXPIRY, String(Date.now() + expires_in * 1000))
  }
}

export function getAccessToken() {
  const token = localStorage.getItem(STORAGE_KEY_TOKEN)
  const expiry = parseInt(localStorage.getItem(STORAGE_KEY_EXPIRY) || '0', 10)
  if (!token) return null
  if (expiry && Date.now() > expiry) return null
  return token
}

export function logout() {
  localStorage.removeItem(STORAGE_KEY_TOKEN)
  localStorage.removeItem(STORAGE_KEY_REFRESH)
  localStorage.removeItem(STORAGE_KEY_EXPIRY)
}

// =============================================================================
// CUSTOMER GRAPHQL HELPER
// =============================================================================

export async function customerRequest(query, variables = {}) {
  const token = getAccessToken()
  if (!token) throw new Error('Not authenticated')
  if (!GRAPHQL_URL) throw new Error('Customer Account API not configured.')

  const res = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({ query, variables }),
  })
  if (!res.ok) {
    if (res.status === 401) logout()
    throw new Error(`Customer API error: ${res.status}`)
  }
  const json = await res.json()
  if (json.errors) {
    throw new Error(json.errors.map((e) => e.message).join('; '))
  }
  return json.data
}

// =============================================================================
// QUERIES
// =============================================================================

export const QUERY_CUSTOMER = `
  query Customer {
    customer {
      id
      firstName
      lastName
      emailAddress { emailAddress }
      defaultAddress { formatted }
    }
  }
`

export const QUERY_CUSTOMER_ORDERS = `
  query CustomerOrders($first: Int!) {
    customer {
      orders(first: $first, sortKey: PROCESSED_AT, reverse: true) {
        edges {
          node {
            id
            number
            name
            processedAt
            financialStatus
            fulfillmentStatus
            totalPrice { amount currencyCode }
            lineItems(first: 10) {
              edges {
                node {
                  title
                  quantity
                  image { url altText }
                }
              }
            }
          }
        }
      }
    }
  }
`
