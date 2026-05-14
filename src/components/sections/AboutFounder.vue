<script setup>
// Brand-voice section. Speaks as the studio, not as a founder.
// Photo treatment: process/craft detail (smocking close-up) — shows the work.

const facts = [
  { label: 'Founded', value: '2026' },
  { label: 'Studio', value: 'New Orleans, LA' },
  { label: 'Smocking', value: 'By hand' },
  { label: 'Sizes', value: 'Newborn – 6T' },
]
</script>

<template>
  <section id="about" class="bg-cream-deep relative overflow-hidden">
    <div class="container-page py-section-lg md:py-section-xl">
      <div class="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        <div class="lg:col-span-6 order-2 lg:order-1 flex flex-col gap-8" data-reveal>
          <div class="flex items-center gap-4">
            <span aria-hidden="true" class="block w-10 h-px bg-purple/60" />
            <p class="eyebrow">The studio</p>
          </div>

          <h2 class="font-serif text-h1 text-ink">
            A craft tradition,<br />
            hand-smocked in New Orleans.
          </h2>

          <div class="flex flex-col gap-5 text-base md:text-lg text-ink-muted leading-relaxed font-light">
            <p>
              Giggle Kids is a small New Orleans studio specializing in hand-smocked children's clothing — christening gowns, bishop dresses, Jon Jons, and the seasonal Mardi Gras and crawfish prints that have become Southern keepsakes since 2026.
            </p>
            <p>
              Every piece is sewn by a small team of Louisiana smockers, most of whom learned the craft from their mothers or grandmothers. The smocking is done by hand. The construction is done in our New Orleans studio. Every piece is checked before it ships.
            </p>
          </div>

          <dl class="grid grid-cols-2 gap-x-8 gap-y-6 pt-8 mt-2 border-t border-border-ink/60">
            <div v-for="fact in facts" :key="fact.label" class="flex flex-col gap-1.5">
              <dt class="text-[10px] uppercase tracking-[0.22em] text-ink-soft font-semibold">{{ fact.label }}</dt>
              <dd class="font-serif text-xl text-ink leading-tight">{{ fact.value }}</dd>
            </div>
          </dl>
        </div>

        <div class="lg:col-span-6 order-1 lg:order-2" data-reveal style="--reveal-delay: 200ms">
          <div class="aspect-[4/5] overflow-hidden bg-cream relative">
            <!-- TODO: replace with real process detail (close-up of hand-smocking, threaded needle, fabric on table) -->
            <img
              src="https://placehold.co/900x1125/EDE3D6/5D4A6E?text=Smocking+Detail"
              alt="Close-up of hand-smocking in progress on Giggle Kids fabric"
              class="w-full h-full object-cover img-zoom"
              loading="lazy"
            />
          </div>
          <p class="mt-4 text-[10px] uppercase tracking-[0.28em] text-ink-soft">
            <span class="italic font-serif normal-case tracking-normal text-xs text-ink-muted mr-2">
              Smocking detail,
            </span>
            in studio
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
