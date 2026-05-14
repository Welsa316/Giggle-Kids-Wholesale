<script setup>
// Brand-voice section. Speaks as the studio, not as a founder.
// No founder name, no portrait, no fake studio photography.
// TODO: when real photography is available, restore a two-column layout
// with a process/craft detail photo on the right.

const facts = [
  { label: 'Studio', value: 'New Orleans, LA' },
  { label: 'Smocking', value: 'By hand' },
  { label: 'Themes', value: 'Mardi Gras + Crawfish' },
]
</script>

<template>
  <section id="about" class="bg-cream-deep relative overflow-hidden">
    <div class="container-page py-section-lg md:py-section-xl">
      <div class="max-w-3xl mx-auto flex flex-col gap-8" data-reveal>
        <div class="flex items-center gap-4">
          <span aria-hidden="true" class="block w-10 h-px bg-purple/60" />
          <p class="eyebrow">Our story</p>
        </div>

        <h2 class="font-serif text-h1 text-ink">
          Mardi Gras + crawfish,<br />
          made in New Orleans.
        </h2>

        <div class="flex flex-col gap-5 text-base md:text-lg text-ink-muted leading-relaxed font-light">
          <p>
            Giggle Kids is a small New Orleans label making seasonal keepsakes for the little ones — Mardi Gras and crawfish prints in soft bamboo, plus hand-smocked dresses, bubbles, and shorts sets that read as heirlooms the moment they're stitched.
          </p>
          <p>
            Everything is made in New Orleans. The smocking is done by hand. Every piece is checked before it ships.
          </p>
        </div>

        <dl class="grid grid-cols-3 gap-x-8 gap-y-6 pt-8 mt-2 border-t border-border-ink/60">
          <div v-for="fact in facts" :key="fact.label" class="flex flex-col gap-1.5">
            <dt class="text-[10px] uppercase tracking-[0.22em] text-ink-soft font-semibold">{{ fact.label }}</dt>
            <dd class="font-serif text-xl text-ink leading-tight">{{ fact.value }}</dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>
