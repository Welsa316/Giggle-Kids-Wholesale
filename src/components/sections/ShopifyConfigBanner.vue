<script setup>
import { isShopifyConfigured } from '../../lib/shopify.js'

// Only render in dev mode, and only when Shopify isn't configured.
// Hidden in production builds entirely.
const show = import.meta.env.DEV && !isShopifyConfigured
</script>

<template>
  <div
    v-if="show"
    role="alert"
    class="bg-amber-50 border-b border-amber-300 text-amber-900 text-sm py-3 px-6 text-center"
  >
    <strong class="font-semibold">Shopify not connected.</strong>
    <span class="ml-2">Showing placeholder products and prices. Add your token to
      <code class="font-mono text-xs bg-amber-100 px-1.5 py-0.5 rounded">.env.local</code>
      and restart the dev server.</span>
    <a
      href="/SHOPIFY_SETUP.md"
      class="ml-2 underline hover:no-underline font-semibold"
    >Setup guide →</a>
  </div>
</template>
