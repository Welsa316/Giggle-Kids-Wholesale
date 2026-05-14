<script setup>
import Ornament from '../ui/Ornament.vue'
// TODO: confirm real stockist count + retailer quote with Giggle Kids before launch
</script>

<template>
  <section class="bg-cream relative overflow-hidden" aria-label="Retailer trust">
    <div class="container-page py-section-lg md:py-section-xl">
      <div class="max-w-4xl mx-auto text-center flex flex-col items-center gap-10 md:gap-14" data-reveal>
        <Ornament variant="sprig" />

        <p class="eyebrow">Stocked across the South</p>

        <figure class="flex flex-col gap-10 md:gap-14 items-center">
          <blockquote class="pull-quote text-3xl md:text-5xl leading-[1.15] max-w-3xl">
            <span class="font-serif text-purple-soft text-6xl md:text-7xl leading-none align-top">&ldquo;</span>
            Our customers ask for Giggle Kids by name. The Mardi Gras line sells out every February — it's our most reliable February reorder.
          </blockquote>

          <figcaption class="flex flex-col items-center gap-2">
            <span aria-hidden="true" class="block w-8 h-px bg-purple/60" />
            <p class="font-serif text-lg text-ink mt-2">Sarah Whitman</p>
            <p class="text-[11px] uppercase tracking-[0.22em] text-ink-soft">
              Magnolia &amp; Co. · Birmingham AL
            </p>
          </figcaption>
        </figure>

        <div class="grid grid-cols-3 gap-6 md:gap-12 pt-12 mt-4 border-t border-border-ink/40 w-full max-w-3xl">
          <div class="text-center">
            <p class="font-serif text-3xl md:text-4xl text-ink leading-none">200+</p>
            <p class="text-[10px] uppercase tracking-[0.22em] text-ink-soft mt-3">Stockists</p>
          </div>
          <div class="text-center border-x border-border-ink/40">
            <p class="font-serif text-3xl md:text-4xl text-ink leading-none">12 yrs</p>
            <p class="text-[10px] uppercase tracking-[0.22em] text-ink-soft mt-3">In business</p>
          </div>
          <div class="text-center">
            <p class="font-serif text-3xl md:text-4xl text-ink leading-none">100%</p>
            <p class="text-[10px] uppercase tracking-[0.22em] text-ink-soft mt-3">Hand-smocked</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
