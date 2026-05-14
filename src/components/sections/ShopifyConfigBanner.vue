<script setup>
import { isShopifyConfigured, shopifyDomainLooksValid } from '../../lib/shopify.js'

// Shows in dev when not configured at all, OR in any environment when the
// domain is misconfigured (custom domain instead of *.myshopify.com).
// The misconfig case is critical to surface — products will silently fail.
const notConfigured = !isShopifyConfigured && import.meta.env.DEV
const wrongDomain = isShopifyConfigured && !shopifyDomainLooksValid

const show = notConfigured || wrongDomain
</script>

<template>
  <div
    v-if="show"
    role="alert"
    class="bg-amber-50 border-b border-amber-300 text-amber-900 text-sm py-3 px-6 text-center"
  >
    <template v-if="wrongDomain">
      <strong class="font-semibold">Shopify domain misconfigured.</strong>
      <span class="ml-2">
        <code class="font-mono text-xs bg-amber-100 px-1.5 py-0.5 rounded">VITE_SHOPIFY_STORE_DOMAIN</code>
        must be your <code class="font-mono text-xs bg-amber-100 px-1.5 py-0.5 rounded">*.myshopify.com</code> subdomain,
        not your custom domain. Update on Railway and redeploy.
      </span>
    </template>
    <template v-else>
      <strong class="font-semibold">Shopify not connected.</strong>
      <span class="ml-2">Showing placeholder products and prices. Add your token to
        <code class="font-mono text-xs bg-amber-100 px-1.5 py-0.5 rounded">.env.local</code>
        and restart the dev server.</span>
      <a
        href="/SHOPIFY_SETUP.md"
        class="ml-2 underline hover:no-underline font-semibold"
      >Setup guide →</a>
    </template>
  </div>
</template>
