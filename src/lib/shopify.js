import { createStorefrontApiClient } from '@shopify/storefront-api-client'

// =============================================================================
// CONFIGURATION
// =============================================================================
//
// Storefront API credentials come from environment variables. See SHOPIFY_SETUP.md
// for how to obtain a Storefront access token.
//
// VITE_SHOPIFY_STORE_DOMAIN     e.g. giggle-kids.myshopify.com (no protocol)
// VITE_SHOPIFY_STOREFRONT_TOKEN public Storefront API token
// VITE_SHOPIFY_API_VERSION      defaults to 2024-10
//
// The Storefront token is PUBLIC — it's safe to ship in client-side code.
// Do NOT use the Admin API token here.
// =============================================================================

const STORE_DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN
const STOREFRONT_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN
const API_VERSION = import.meta.env.VITE_SHOPIFY_API_VERSION || '2024-10'

export const isShopifyConfigured = Boolean(STORE_DOMAIN && STOREFRONT_TOKEN)

export const shopifyClient = isShopifyConfigured
  ? createStorefrontApiClient({
      storeDomain: STORE_DOMAIN,
      apiVersion: API_VERSION,
      publicAccessToken: STOREFRONT_TOKEN,
    })
  : null

if (!isShopifyConfigured && import.meta.env.DEV) {
  console.warn(
    '[Shopify] Not configured. Add VITE_SHOPIFY_STORE_DOMAIN and ' +
      'VITE_SHOPIFY_STOREFRONT_TOKEN to .env.local. See SHOPIFY_SETUP.md.'
  )
}

// =============================================================================
// HELPER — run a query, throw on error
// =============================================================================

export async function shopifyRequest(query, variables = {}) {
  if (!shopifyClient) {
    throw new Error('Shopify client not configured. See SHOPIFY_SETUP.md.')
  }
  const { data, errors } = await shopifyClient.request(query, { variables })
  if (errors) {
    const msg = Array.isArray(errors.graphQLErrors)
      ? errors.graphQLErrors.map((e) => e.message).join('; ')
      : errors.message || 'Shopify request failed'
    throw new Error(msg)
  }
  return data
}

// =============================================================================
// GRAPHQL FRAGMENTS
// =============================================================================

const MONEY_FIELDS = `
  amount
  currencyCode
`

const IMAGE_FIELDS = `
  url
  altText
  width
  height
`

const VARIANT_FIELDS = `
  id
  title
  availableForSale
  quantityAvailable
  price { ${MONEY_FIELDS} }
  compareAtPrice { ${MONEY_FIELDS} }
  selectedOptions { name value }
  image { ${IMAGE_FIELDS} }
`

export const PRODUCT_CARD_FIELDS = `
  id
  title
  handle
  vendor
  availableForSale
  priceRange {
    minVariantPrice { ${MONEY_FIELDS} }
    maxVariantPrice { ${MONEY_FIELDS} }
  }
  compareAtPriceRange {
    minVariantPrice { ${MONEY_FIELDS} }
  }
  images(first: 2) {
    edges { node { ${IMAGE_FIELDS} } }
  }
  featuredImage { ${IMAGE_FIELDS} }
`

const PRODUCT_FULL_FIELDS = `
  ${PRODUCT_CARD_FIELDS}
  description
  descriptionHtml
  options { name values }
  images(first: 8) {
    edges { node { ${IMAGE_FIELDS} } }
  }
  variants(first: 100) {
    edges { node { ${VARIANT_FIELDS} } }
  }
`

const CART_FIELDS = `
  id
  checkoutUrl
  totalQuantity
  cost {
    subtotalAmount { ${MONEY_FIELDS} }
    totalAmount { ${MONEY_FIELDS} }
    totalTaxAmount { ${MONEY_FIELDS} }
  }
  lines(first: 50) {
    edges {
      node {
        id
        quantity
        cost { totalAmount { ${MONEY_FIELDS} } }
        merchandise {
          ... on ProductVariant {
            id
            title
            availableForSale
            image { ${IMAGE_FIELDS} }
            price { ${MONEY_FIELDS} }
            product { id title handle }
          }
        }
      }
    }
  }
`

// =============================================================================
// PRODUCTS
// =============================================================================

export const QUERY_PRODUCTS = `
  query Products($first: Int!, $sortKey: ProductSortKeys, $reverse: Boolean) {
    products(first: $first, sortKey: $sortKey, reverse: $reverse) {
      edges { node { ${PRODUCT_CARD_FIELDS} } }
    }
  }
`

export const QUERY_PRODUCT_BY_HANDLE = `
  query ProductByHandle($handle: String!) {
    product(handle: $handle) {
      ${PRODUCT_FULL_FIELDS}
    }
  }
`

export const QUERY_COLLECTION_BY_HANDLE = `
  query CollectionByHandle($handle: String!, $first: Int!) {
    collection(handle: $handle) {
      id
      title
      description
      image { ${IMAGE_FIELDS} }
      products(first: $first) {
        edges { node { ${PRODUCT_CARD_FIELDS} } }
      }
    }
  }
`

export const QUERY_COLLECTIONS = `
  query Collections($first: Int!) {
    collections(first: $first, sortKey: TITLE) {
      edges {
        node {
          id
          title
          handle
          description
          image { ${IMAGE_FIELDS} }
          products(first: 1) {
            edges { node { featuredImage { ${IMAGE_FIELDS} } } }
          }
        }
      }
    }
  }
`

// =============================================================================
// CART
// =============================================================================

export const MUTATION_CART_CREATE = `
  mutation CartCreate($input: CartInput) {
    cartCreate(input: $input) {
      cart { ${CART_FIELDS} }
      userErrors { field message }
    }
  }
`

export const MUTATION_CART_LINES_ADD = `
  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart { ${CART_FIELDS} }
      userErrors { field message }
    }
  }
`

export const MUTATION_CART_LINES_UPDATE = `
  mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart { ${CART_FIELDS} }
      userErrors { field message }
    }
  }
`

export const MUTATION_CART_LINES_REMOVE = `
  mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart { ${CART_FIELDS} }
      userErrors { field message }
    }
  }
`

export const QUERY_CART = `
  query Cart($id: ID!) {
    cart(id: $id) { ${CART_FIELDS} }
  }
`

// =============================================================================
// MONEY FORMATTING
// =============================================================================

export function formatMoney(money) {
  if (!money) return ''
  const amount = parseFloat(money.amount)
  if (Number.isNaN(amount)) return ''
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: money.currencyCode || 'USD',
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount)
}
