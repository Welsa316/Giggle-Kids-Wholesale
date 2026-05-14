<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

// Subtle scroll-driven parallax — photos drift opposite to scroll so the
// cluster feels alive without being gimmicky.
const offsetMain = ref(0)
const offsetSecondary = ref(0)
const offsetDetail = ref(0)
let raf = 0

function onScroll() {
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

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  if (raf) cancelAnimationFrame(raf)
})

// TODO: replace placeholder URLs with real Giggle Kids editorial photography.
const photos = {
  main:      'https://placehold.co/900x1300/F5D6D9/5D4A6E?text=Hero+%28Main%29',
  secondary: 'https://placehold.co/700x900/EDE3D6/5D4A6E?text=Detail',
  tertiary:  'https://placehold.co/520x520/D6BDE8/5D4A6E?text=Close-up',
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
    <div class="relative h-[60vh] min-h-[420px] overflow-hidden bg-cream-deep hero-anim hero-anim-reveal" style="animation-delay: 100ms;">
      <img
        :src="photos.main"
        alt="Child wearing a hand-smocked Giggle Kids dress"
        class="w-full h-full object-cover ken-burns"
        loading="eager"
        fetchpriority="high"
      />
      <div class="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-cream to-transparent" aria-hidden="true" />

      <!-- Mobile corner marks -->
      <div class="absolute top-5 left-5 hero-anim hero-anim-fade-in" style="animation-delay: 300ms;">
        <p class="text-[10px] uppercase tracking-[0.32em] text-ink font-semibold bg-cream/85 backdrop-blur-sm px-3 py-1.5">
          Est. 2012
        </p>
      </div>
      <div class="absolute top-5 right-5 hero-anim hero-anim-fade-in" style="animation-delay: 300ms;">
        <p class="text-[10px] uppercase tracking-[0.28em] text-ink font-semibold bg-cream/85 backdrop-blur-sm px-3 py-1.5 font-serif italic normal-case tracking-normal">
          Spring 2026
        </p>
      </div>
    </div>

    <div class="container-page py-12 -mt-8 relative z-10">
      <h1 class="font-serif text-ink leading-[1.0] tracking-[-0.02em] font-medium mb-7" style="font-size: clamp(2.5rem, 12vw, 3.75rem);">
        <span class="block hero-anim hero-anim-fade-up" style="animation-delay: 280ms;">Hand-smocked</span>
        <span class="block hero-anim hero-anim-fade-up pl-[6%]" style="animation-delay: 420ms;">heirlooms,</span>
        <span class="block hero-anim hero-anim-fade-up pl-[12%] italic text-purple" style="animation-delay: 560ms;">for keeping.</span>
      </h1>

      <p class="text-base text-ink-muted leading-relaxed font-light mb-8 hero-anim hero-anim-fade-up max-w-md" style="animation-delay: 760ms;">
        Christening gowns, bishop dresses, and Mardi Gras keepsakes &mdash; sewn by hand in our New Orleans studio.
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
    <!-- Top-edge corner labels -->
    <div class="absolute top-8 left-12 z-30 hero-anim hero-anim-slide-l" style="animation-delay: 80ms;">
      <p class="text-[10px] uppercase tracking-[0.32em] text-ink-soft font-semibold">
        Est. 2012 &middot; New Orleans
      </p>
    </div>
    <div class="absolute top-8 right-12 z-30 hero-anim hero-anim-slide-r" style="animation-delay: 80ms;">
      <p class="text-[10px] uppercase tracking-[0.32em] text-ink-soft font-semibold flex items-center gap-3 justify-end">
        <span class="font-serif italic normal-case tracking-normal text-xs text-ink-muted">Spring 2026</span>
        <span class="block w-6 h-px bg-ink-soft/60" />
        <span>No. 01</span>
      </p>
    </div>

    <!-- Main photo: tall right block, anchored to right edge -->
    <div
      class="absolute top-0 right-0 h-full w-[55%] lg:w-[50%] overflow-hidden bg-cream-deep hero-anim hero-anim-reveal"
      style="animation-delay: 200ms;"
    >
      <img
        :src="photos.main"
        alt="Child wearing a hand-smocked Giggle Kids dress in soft natural light"
        class="w-full h-full object-cover ken-burns will-change-transform"
        :style="{ transform: `translate3d(0, ${offsetMain}px, 0) scale(1.04)` }"
        loading="eager"
        fetchpriority="high"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-cream/30 via-transparent to-transparent" aria-hidden="true" />
    </div>

    <!-- Secondary photo: smaller, offset, overlaps the seam -->
    <figure
      class="absolute z-20 left-[42%] lg:left-[44%] bottom-[6%] w-[22%] lg:w-[18%] aspect-[4/5] overflow-hidden bg-cream-deep shadow-soft hero-anim hero-anim-reveal"
      style="animation-delay: 700ms;"
    >
      <img
        :src="photos.secondary"
        alt="Detail of hand-smocking on a Mardi Gras bishop dress"
        class="w-full h-full object-cover"
        :style="{ transform: `translate3d(0, ${offsetSecondary}px, 0) scale(1.05)` }"
        loading="eager"
      />
      <figcaption class="absolute bottom-3 left-3 right-3 text-[9px] uppercase tracking-[0.28em] text-cream font-semibold drop-shadow">
        <span class="font-serif italic normal-case tracking-normal text-xs">Bishop dress,</span> No. 02
      </figcaption>
    </figure>

    <!-- Tertiary tiny detail photo: bottom-right corner accent -->
    <figure
      class="hidden lg:block absolute z-20 right-[6%] bottom-[10%] w-[12%] aspect-square overflow-hidden bg-cream-deep shadow-soft hero-anim hero-anim-reveal"
      style="animation-delay: 1000ms;"
    >
      <img
        :src="photos.tertiary"
        alt="Close-up of smocking stitches"
        class="w-full h-full object-cover"
        :style="{ transform: `translate3d(0, ${offsetDetail}px, 0) scale(1.06)` }"
        loading="eager"
      />
    </figure>

    <!-- Typography column -->
    <div class="relative z-10 h-full flex items-center">
      <div class="container-page w-full">
        <div class="max-w-[640px] flex flex-col gap-8 md:gap-10">
          <h1 class="font-serif text-ink leading-[0.98] tracking-[-0.025em] font-medium" style="font-size: clamp(2.75rem, 7vw, 5.75rem);">
            <span class="block hero-anim hero-anim-fade-up" style="animation-delay: 280ms;">Hand-smocked</span>
            <span class="block hero-anim hero-anim-fade-up pl-[6%]" style="animation-delay: 420ms;">heirlooms,</span>
            <span class="block hero-anim hero-anim-fade-up pl-[12%] italic text-purple" style="animation-delay: 560ms;">for keeping.</span>
          </h1>

          <div class="hero-anim hero-anim-fade-up max-w-md" style="animation-delay: 760ms;">
            <p class="text-base md:text-lg text-ink-muted leading-relaxed font-light">
              Christening gowns, bishop dresses, and Mardi Gras keepsakes &mdash; sewn by hand in our New Orleans studio.
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
