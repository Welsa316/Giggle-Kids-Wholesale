<script setup>
// Brand-voice section. Speaks as the studio, not as a founder.
// Intentionally evergreen — the catalog will broaden over time
// (clothing, plushies, books, souvenirs), so the framing here
// avoids naming specific product types.

const facts = [
  { label: 'Studio', value: 'New Orleans, LA' },
  { label: 'Made', value: 'By hand' },
  { label: 'Founded', value: '2026' },
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
          A small studio<br />
          in New Orleans.
        </h2>

        <div class="flex flex-col gap-5 text-base md:text-lg text-ink-muted leading-relaxed font-light">
          <p>
            Giggle Kids is a small New Orleans label making heirloom keepsakes for the little ones &mdash; designed locally, finished by hand, and built to be passed down.
          </p>
          <p>
            Every piece is checked before it ships. Most are sewn or assembled in-studio; some are sourced from makers we trust. We grow the catalog slowly and keep the standards tight.
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
