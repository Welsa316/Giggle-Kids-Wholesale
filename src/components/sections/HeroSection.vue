<script setup>
import BaseButton from '../ui/BaseButton.vue'
</script>

<template>
  <section id="top" class="relative bg-cream overflow-hidden">
    <div class="container-page py-16 md:py-24 lg:py-28 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
      <div class="flex flex-col gap-7 max-w-xl order-2 lg:order-1">
        <p class="eyebrow">Wholesale · Faire stockists welcome</p>

        <h1 class="font-serif text-display text-ink">
          Smocked classics,
          <span class="italic text-purple">hand-stitched</span>
          in Louisiana.
        </h1>

        <p class="text-lg md:text-xl text-ink-muted leading-relaxed">
          Heirloom-quality smocked clothing for babies and toddlers — Mardi Gras, crawfish, seersucker — built for southern boutiques that care that things are made well.
        </p>

        <div class="flex flex-wrap items-center gap-x-6 gap-y-3 mt-2">
          <BaseButton href="#" variant="primary">Shop on Faire</BaseButton>
          <a
            href="#inquiry"
            class="text-sm font-semibold text-purple underline underline-offset-4 decoration-purple/40 hover:decoration-purple decoration-1 inline-flex items-center gap-1"
          >
            or request a catalog
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      <div class="order-1 lg:order-2 relative">
        <div class="relative aspect-[4/5] lg:aspect-[5/6] rounded-lg overflow-hidden shadow-soft">
          <!-- TODO: replace placeholder with real Giggle Kids lifestyle hero photograph (toddler in smocked dress, soft natural light) -->
          <img
            src="https://placehold.co/1000x1250/F5D6D9/5D4A6E?text=Hero+Photo"
            alt="Toddler in a hand-smocked dress"
            class="w-full h-full object-cover"
            loading="eager"
            fetchpriority="high"
          />
        </div>
        <div class="hidden lg:block absolute -bottom-6 -left-6 bg-cream border border-border rounded p-5 shadow-soft max-w-[220px]">
          <p class="text-xs uppercase tracking-[0.18em] text-purple font-semibold mb-1">Made in</p>
          <p class="font-serif text-xl text-ink">Baton Rouge, LA</p>
        </div>
      </div>
    </div>
  </section>
</template>
