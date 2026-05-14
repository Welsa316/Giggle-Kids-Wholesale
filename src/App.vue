<script setup>
import AnnouncementBar from './components/sections/AnnouncementBar.vue'
import SiteNav from './components/sections/SiteNav.vue'
import HeroSection from './components/sections/HeroSection.vue'
import WholesaleTerms from './components/sections/WholesaleTerms.vue'
import ValueProps from './components/sections/ValueProps.vue'
import FeaturedCollections from './components/sections/FeaturedCollections.vue'
import BestSellers from './components/sections/BestSellers.vue'
import TrustSignals from './components/sections/TrustSignals.vue'
import AboutFounder from './components/sections/AboutFounder.vue'
import HowToOrder from './components/sections/HowToOrder.vue'
import InquiryForm from './components/sections/InquiryForm.vue'
import SiteFooter from './components/sections/SiteFooter.vue'
</script>

<template>
  <a
    href="#main"
    class="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-purple focus:text-cream focus:px-4 focus:py-2 focus:rounded"
  >
    Skip to main content
  </a>

  <AnnouncementBar />
  <SiteNav />

  <main id="main">
    <HeroSection />
    <WholesaleTerms />
    <ValueProps />
    <FeaturedCollections />
    <BestSellers />
    <TrustSignals />
    <AboutFounder />
    <HowToOrder />
    <InquiryForm />
  </main>

  <SiteFooter />
</template>
