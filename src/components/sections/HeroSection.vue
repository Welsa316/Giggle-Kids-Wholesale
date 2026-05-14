<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useProducts } from '../../composables/useProducts.js'

// Subtle scroll-driven parallax — photos drift opposite to scroll so the
// cluster feels alive without being gimmicky. Respect prefers-reduced-motion.
const offsetMain = ref(0)
const offsetSecondary = ref(0)
const offsetDetail = ref(0)
let raf = 0
let reducedMotion = false

function onScroll() {
  if (reducedMotion) return
  if (raf) return
  raf = requestAnimationFrame(() => {
    raf = 0
    const y = window.scrollY
    if (y > 900) return
    offsetMain.value = y * 0.08
    offsetSecondary.value = y * -0.05
    offsetDetail.value = y * 0.12
  })
}

// Hero photos pulled from real Shopify products. We fetch the 3 newest
// products with their featured images and use them as the hero cluster.
// Falls back to soft placeholders if Shopify isn't configured or returns nothing.
const PLACEHOLDERS = {
  main:      'https://placehold.co/900x1300/F5D6D9/5D4A6E?text=%E2%80%83',
  secondary: 'https://placehold.co/700x900/EDE3D6/5D4A6E?text=%E2%80%83',
  tertiary:  'https://placehold.co/520x520/D6BDE8/5D4A6E?text=%E2%80%83',
}

const { products: heroProducts, fetchProducts } = useProducts()

const photos = computed(() => {
  const list = heroProducts.value || []
  return {
    main:      list[0]?.featuredImage?.url || PLACEHOLDERS.main,
    secondary: list[1]?.featuredImage?.url || PLACEHOLDERS.secondary,
    tertiary:  list[2]?.featuredImage?.url || PLACEHOLDERS.tertiary,
  }
})

const heroLinks = computed(() => {
  const list = heroProducts.value || []
  return {
    main:      list[0]?.handle ? `/products/${list[0].handle}` : '/collections/all',
    secondary: list[1]?.handle ? `/products/${list[1].handle}` : '/collections/all',
    tertiary:  list[2]?.handle ? `/products/${list[2].handle}` : '/collections/all',
  }
})

onMounted(() => {
  const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)')
  reducedMotion = !!mq?.matches
  mq?.addEventListener?.('change', (e) => { reducedMotion = e.matches })
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
  fetchProducts({ first: 3, sortKey: 'CREATED_AT', reverse: true })
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  if (raf) cancelAnimationFrame(raf)
})

function onImgError(e) {
  e.target.style.visibility = 'hidden'
}
</script>

<template>
  <!-- =====================================================================
       MOBILE HERO — stacks photo above text, full-width, magazine-cover feel
       ===================================================================== -->
  <section
    id="top"
    class="md:hidden relative bg-cream overflow-hidden"
    aria-label="Hero"
  >
    <router-link
      :to="heroLinks.main"
      class="block relative h-[60vh] min-h-[420px] overflow-hidden bg-cream-deep hero-anim hero-anim-reveal"
      style="animation-delay: 100ms;"
      aria-label="Shop the newest arrival"
    >
      <img
        :src="photos.main"
        alt=""
        class="w-full h-full object-cover ken-burns"
        loading="eager"
        fetchpriority="high"
        @error="onImgError"
      />
      <div class="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-cream to-transparent" aria-hidden="true" />
    </router-link>

    <div class="container-page py-12 -mt-8 relative z-10">
      <h1 class="font-serif text-ink leading-[1.0] tracking-[-0.02em] font-medium mb-7" style="font-size: clamp(2.5rem, 12vw, 3.75rem);">
        <span class="block hero-anim hero-anim-fade-up" style="animation-delay: 280ms;">Made in</span>
        <span class="block hero-anim hero-anim-fade-up pl-[6%]" style="animation-delay: 420ms;">New Orleans,</span>
        <span class="block hero-anim hero-anim-fade-up pl-[12%] italic text-purple" style="animation-delay: 560ms;">for keeping.</span>
      </h1>

      <p class="text-base text-ink-muted leading-relaxed font-light mb-8 hero-anim hero-anim-fade-up max-w-md" style="animation-delay: 760ms;">
        Heirloom keepsakes for the little ones &mdash; designed and made in our New Orleans studio.
      </p>

      <div class="flex flex-wrap items-center gap-x-7 gap-y-4 hero-anim hero-anim-fade-up" style="animation-delay: 920ms;">
        <router-link
          to="/collections/new-arrivals"
          class="inline-flex items-center justify-center gap-3 bg-ink text-cream uppercase tracking-[0.18em] text-xs font-semibold px-9 py-4 rounded-full hover:bg-purple transition-all duration-500 ease-editorial active:translate-y-[1px]"
        >
          Shop new arrivals
        </router-link>
        <router-link
          to="/collections/all"
          class="group inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] font-semibold text-ink hover:text-purple transition-colors duration-300 py-2"
        >
          <span class="border-b border-ink/40 group-hover:border-purple pb-1 transition-colors">Shop all</span>
          <span aria-hidden="true" class="transition-transform duration-500 group-hover:translate-x-1">&rarr;</span>
        </router-link>
      </div>
    </div>
  </section>

  <!-- =====================================================================
       DESKTOP HERO — magazine spread, asymmetric photo cluster
       ===================================================================== -->
  <section
    class="hidden md:block relative bg-cream overflow-hidden"
    style="height: clamp(700px, 100vh, 1000px);"
    aria-label="Hero"
  >
    <!-- Main photo: tall right block, anchored to right edge. Clicks through
         to the newest product. -->
    <router-link
      :to="heroLinks.main"
      class="absolute top-0 right-0 h-full w-[55%] lg:w-[50%] overflow-hidden bg-cream-deep hero-anim hero-anim-reveal block group"
      style="animation-delay: 200ms;"
      aria-label="Shop the newest arrival"
    >
      <img
        :src="photos.main"
        alt=""
        class="w-full h-full object-cover ken-burns will-change-transform"
        :style="{ transform: `translate3d(0, ${offsetMain}px, 0) scale(1.04)` }"
        loading="eager"
        fetchpriority="high"
        @error="onImgError"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-cream/30 via-transparent to-transparent" aria-hidden="true" />
    </router-link>

    <!-- Secondary photo: smaller, offset, overlaps the seam -->
    <router-link
      :to="heroLinks.secondary"
      class="absolute z-20 left-[42%] lg:left-[44%] bottom-[6%] w-[22%] lg:w-[18%] aspect-[4/5] overflow-hidden bg-cream-deep shadow-soft hero-anim hero-anim-reveal block"
      style="animation-delay: 700ms;"
      aria-label="Shop product"
    >
      <img
        :src="photos.secondary"
        alt=""
        class="w-full h-full object-cover img-zoom"
        :style="{ transform: `translate3d(0, ${offsetSecondary}px, 0) scale(1.05)` }"
        loading="eager"
        @error="onImgError"
      />
    </router-link>

    <!-- Tertiary tiny detail photo: bottom-right corner accent -->
    <router-link
      :to="heroLinks.tertiary"
      class="hidden lg:block absolute z-20 right-[6%] bottom-[10%] w-[12%] aspect-square overflow-hidden bg-cream-deep shadow-soft hero-anim hero-anim-reveal"
      style="animation-delay: 1000ms;"
      aria-label="Shop product"
    >
      <img
        :src="photos.tertiary"
        alt=""
        class="w-full h-full object-cover img-zoom"
        :style="{ transform: `translate3d(0, ${offsetDetail}px, 0) scale(1.06)` }"
        loading="eager"
        @error="onImgError"
      />
    </router-link>

    <!-- Typography column -->
    <div class="relative z-10 h-full flex items-center">
      <div class="container-page w-full">
        <div class="max-w-[640px] flex flex-col gap-8 md:gap-10">
          <h1 class="font-serif text-ink leading-[0.98] tracking-[-0.025em] font-medium" style="font-size: clamp(2.75rem, 7vw, 5.75rem);">
            <span class="block hero-anim hero-anim-fade-up" style="animation-delay: 280ms;">Made in</span>
            <span class="block hero-anim hero-anim-fade-up pl-[6%]" style="animation-delay: 420ms;">New Orleans,</span>
            <span class="block hero-anim hero-anim-fade-up pl-[12%] italic text-purple" style="animation-delay: 560ms;">for keeping.</span>
          </h1>

          <div class="hero-anim hero-anim-fade-up max-w-md" style="animation-delay: 760ms;">
            <p class="text-base md:text-lg text-ink-muted leading-relaxed font-light">
              Heirloom keepsakes for the little ones &mdash; designed and made in our New Orleans studio.
            </p>
          </div>

          <div class="hero-anim hero-anim-fade-up flex flex-wrap items-center gap-x-8 gap-y-4 mt-2" style="animation-delay: 920ms;">
            <router-link
              to="/collections/new-arrivals"
              class="inline-flex items-center justify-center gap-3 bg-ink text-cream uppercase tracking-[0.18em] text-xs font-semibold px-9 py-4 rounded-full hover:bg-purple transition-all duration-500 ease-editorial active:translate-y-[1px]"
            >
              Shop new arrivals
            </router-link>
            <router-link
              to="/collections/all"
              class="group inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] font-semibold text-ink hover:text-purple transition-colors duration-300 py-2"
            >
              <span class="border-b border-ink/40 group-hover:border-purple pb-1 transition-colors">Shop all</span>
              <span aria-hidden="true" class="transition-transform duration-500 group-hover:translate-x-1">&rarr;</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hero-anim hero-anim-fade-in" style="animation-delay: 1500ms;">
      <a href="#scroll-target" aria-label="Scroll to next section" class="flex flex-col items-center gap-3 text-ink-soft hover:text-purple transition-colors group">
        <span class="text-[9px] uppercase tracking-[0.32em] font-semibold">Scroll</span>
        <span class="block w-px h-10 bg-current opacity-40 group-hover:opacity-100 transition-opacity">
          <span class="block w-px h-3 bg-purple animate-pulse"></span>
        </span>
      </a>
    </div>
    <span id="scroll-target" class="absolute bottom-0" aria-hidden="true" />
  </section>
</template>
