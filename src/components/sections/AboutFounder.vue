<script setup>
import Signature from '../ui/Signature.vue'
// TODO: replace founder name, photo, copy, and signature with real Giggle Kids founder details
</script>

<template>
  <section id="about" class="bg-cream-deep relative overflow-hidden">
    <div class="container-page py-section-lg md:py-section-xl">
      <div class="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        <div class="lg:col-span-5 order-1" data-reveal>
          <div class="aspect-[4/5] overflow-hidden bg-cream relative">
            <!-- TODO: replace placeholder with real founder portrait (Claire in her Baton Rouge studio, natural light) -->
            <img
              src="https://placehold.co/900x1125/EDE3D6/5D4A6E?text=Founder+Portrait"
              alt="Claire Boudreaux, founder of Giggle Kids, in her Baton Rouge studio"
              class="w-full h-full object-cover img-zoom"
              loading="lazy"
            />
          </div>
          <p class="mt-3 text-[10px] uppercase tracking-[0.28em] text-ink-soft">
            <span class="italic font-serif normal-case tracking-normal text-xs text-ink-muted mr-2">
              Claire in her Baton Rouge studio,
            </span>
            2024
          </p>
        </div>

        <div class="lg:col-span-6 lg:col-start-7 flex flex-col gap-8 order-2" data-reveal style="--reveal-delay: 200ms">
          <div class="flex items-center gap-4">
            <span aria-hidden="true" class="block w-10 h-px bg-purple/60" />
            <p class="eyebrow">A family tradition</p>
          </div>

          <h2 class="font-serif text-h1 text-ink">
            <span class="accent-italic">Giggle Kids</span> started in my kitchen.
          </h2>

          <div class="flex flex-col gap-5 text-base md:text-lg text-ink-muted leading-relaxed font-light">
            <p class="drop-cap">
              Twelve years ago I couldn't find smocked clothes for my daughter that felt like the ones my mother had made for me. So I dug out her sewing pattern and started stitching in our kitchen in Baton Rouge.
            </p>
            <p>
              Today every piece we ship is still hand-smocked by a small team of Louisiana sewers — most of whom learned the craft from their mothers or grandmothers. We design for boutique buyers who care that things are made well, by hand, by people who know what they're doing.
            </p>
          </div>

          <div class="mt-4 flex items-end gap-6">
            <Signature class="w-44 h-auto" />
            <div class="pb-1">
              <p class="font-serif text-base text-ink">Claire Boudreaux</p>
              <p class="text-[10px] uppercase tracking-[0.22em] text-ink-soft mt-1">Founder &amp; Head Smocker</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
