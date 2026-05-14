<script setup>
import AnnouncementBar from './components/sections/AnnouncementBar.vue'
import ShopifyConfigBanner from './components/sections/ShopifyConfigBanner.vue'
import SiteNav from './components/sections/SiteNav.vue'
import SiteFooter from './components/sections/SiteFooter.vue'
import CartDrawer from './components/cart/CartDrawer.vue'
import { useReveal } from './composables/useReveal.js'

useReveal()
</script>

<template>
  <a
    href="#main"
    class="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-purple focus:text-cream focus:px-4 focus:py-2 focus:rounded"
  >
    Skip to main content
  </a>

  <ShopifyConfigBanner />
  <AnnouncementBar />
  <SiteNav />

  <main id="main">
    <router-view />
  </main>

  <SiteFooter />

  <CartDrawer />
</template>
