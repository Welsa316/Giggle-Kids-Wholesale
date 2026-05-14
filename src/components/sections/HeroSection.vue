<script setup>
// Single editorial hero photo — Misha & Puff / Magnolia Baby pattern.
// Per brand research, small heritage boutique sites use one quiet
// photograph instead of a busy cluster. No parallax. No scroll math.
// Just a slow ken-burns zoom on the photo (CSS only, gated by
// prefers-reduced-motion in main.css).
//
// Photo: Galina Kondratenko on Unsplash — child in white at sunlit window.
// Editorial heritage feel; verified 200. Two sizes for mobile vs desktop.
const HERO_PHOTO_DESKTOP = 'https://images.unsplash.com/photo-1675098023496-10749984fac6?auto=format&fit=crop&w=1400&q=80'
const HERO_PHOTO_MOBILE  = 'https://images.unsplash.com/photo-1675098023496-10749984fac6?auto=format&fit=crop&w=800&q=80'

function onImgError(e) {
  e.target.style.visibility = 'hidden'
}
</script>

<template>
  <!-- =====================================================================
       MOBILE HERO — full-width photo on top, text below
       ===================================================================== -->
  <section
    id="top"
    class="md:hidden relative bg-cream overflow-hidden"
    aria-label="Hero"
  >
    <router-link
      to="/collections/all"
      class="block relative h-[65vh] min-h-[460px] overflow-hidden bg-cream-deep hero-anim hero-anim-reveal"
      style="animation-delay: 100ms;"
      aria-label="Shop all products"
    >
      <img
        :src="HERO_PHOTO_MOBILE"
        alt=""
        class="w-full h-full object-cover object-center ken-burns"
        loading="eager"
        fetchpriority="high"
        @error="onImgError"
      />
      <div class="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-cream/80 to-transparent" aria-hidden="true" />
    </router-link>

    <div class="container-page py-12 -mt-6 relative z-10">
      <h1 class="font-serif text-ink leading-[1.04] tracking-[-0.02em] font-medium mb-7" style="font-size: clamp(2.5rem, 12vw, 3.75rem);">
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
       DESKTOP HERO — single photo right, text left, generous whitespace
       ===================================================================== -->
  <section
    class="hidden md:block relative bg-cream overflow-hidden"
    style="height: clamp(700px, 92vh, 940px);"
    aria-label="Hero"
  >
    <!-- Main photo: right 55% of viewport, full height, single editorial frame -->
    <router-link
      to="/collections/all"
      class="absolute top-0 right-0 h-full w-[55%] lg:w-[52%] overflow-hidden bg-cream-deep hero-anim hero-anim-reveal block"
      style="animation-delay: 200ms;"
      aria-label="Shop all products"
    >
      <img
        :src="HERO_PHOTO_DESKTOP"
        alt=""
        class="w-full h-full object-cover object-center ken-burns"
        loading="eager"
        fetchpriority="high"
        @error="onImgError"
      />
      <!-- Soft cream gradient on the left edge of the photo so it transitions
           gently into the text column — no harsh seam. -->
      <div class="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-cream/40 to-transparent" aria-hidden="true" />
    </router-link>

    <!-- Typography column -->
    <div class="relative z-10 h-full flex items-center">
      <div class="container-page w-full">
        <div class="max-w-[560px] flex flex-col gap-8 md:gap-10">
          <h1 class="font-serif text-ink leading-[1.04] tracking-[-0.025em] font-medium" style="font-size: clamp(2.75rem, 6.5vw, 5.25rem);">
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
  </section>
</template>
