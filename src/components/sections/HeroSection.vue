<script setup>
import BaseButton from '../ui/BaseButton.vue'
</script>

<template>
  <section id="top" class="relative bg-cream overflow-hidden">
    <div class="container-page pt-12 md:pt-20 lg:pt-24 pb-20 md:pb-section lg:pb-section-lg grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
      <div class="flex flex-col gap-8 lg:col-span-6 xl:col-span-5 order-2 lg:order-1" data-reveal>
        <div class="flex items-center gap-4">
          <span aria-hidden="true" class="block w-10 h-px bg-purple/60" />
          <p class="eyebrow">Wholesale &middot; Est. 2012</p>
        </div>

        <h1 class="font-serif text-display-xl text-ink">
          Smocked
          <span class="accent-italic">heirlooms</span>,
          <br />
          stitched in
          <br />
          Louisiana.
        </h1>

        <p class="text-lg md:text-xl text-ink-muted leading-relaxed max-w-prose font-light">
          Hand-finished christening gowns, bishop dresses, and bayou-weight bubbles for boutiques that care that things are made well — by hand, by people who know what they're doing.
        </p>

        <div class="flex flex-wrap items-center gap-x-8 gap-y-4 mt-3">
          <BaseButton href="#" variant="primary" size="lg">Shop on Faire</BaseButton>
          <a
            href="#inquiry"
            class="group inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] font-semibold text-ink hover:text-purple transition-colors duration-300 py-2"
          >
            <span class="border-b border-ink/40 group-hover:border-purple pb-1 transition-colors">Request a catalog</span>
            <span aria-hidden="true" class="transition-transform duration-500 group-hover:translate-x-1">→</span>
          </a>
        </div>

        <div class="flex items-center gap-6 pt-6 mt-4 border-t border-border-ink/40 text-[11px] uppercase tracking-[0.22em] text-ink-soft">
          <span class="flex items-center gap-2">
            <span class="block w-1 h-1 rounded-full bg-purple-soft" />
            200+ stockists
          </span>
          <span class="flex items-center gap-2">
            <span class="block w-1 h-1 rounded-full bg-purple-soft" />
            Faire-approved
          </span>
        </div>
      </div>

      <div class="lg:col-span-6 xl:col-span-7 order-1 lg:order-2 relative" data-reveal style="--reveal-delay: 200ms">
        <div class="relative aspect-[4/5] lg:aspect-[5/6] overflow-hidden bg-cream-deep">
          <!-- TODO: replace placeholder with real Giggle Kids hero photograph -->
          <img
            src="https://placehold.co/1000x1250/F5D6D9/5D4A6E?text=Hero+Photograph"
            alt="Toddler wearing a hand-smocked Giggle Kids dress in soft natural light"
            class="w-full h-full object-cover img-zoom"
            loading="eager"
            fetchpriority="high"
          />
        </div>

        <p class="mt-3 text-[10px] uppercase tracking-[0.28em] text-ink-soft text-right">
          <span class="italic font-serif normal-case tracking-normal text-xs text-ink-muted mr-2">Spring 2026 Lookbook,</span> No. 01
        </p>

        <div class="hidden lg:flex absolute -bottom-10 -left-10 bg-cream border border-border-ink/40 px-7 py-5 shadow-soft items-center gap-5 max-w-[280px]">
          <span aria-hidden="true" class="block w-px h-12 bg-purple/60" />
          <div>
            <p class="text-[10px] uppercase tracking-[0.32em] text-ink-soft mb-1.5">Made in</p>
            <p class="font-serif text-lg text-ink leading-tight">Baton Rouge</p>
            <p class="font-serif italic text-sm text-purple">Louisiana</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
