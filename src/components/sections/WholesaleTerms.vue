<script setup>
// TODO: confirm real numbers with Giggle Kids before launch
const terms = [
  { label: 'Opening order', value: '$150' },
  { label: 'Reorders from', value: '$75' },
  { label: 'Fulfillment', value: '2–3 days' },
  { label: 'Terms', value: 'NET 60' },
]
</script>

<template>
  <section
    class="bg-ink text-cream relative overflow-hidden"
    aria-label="Wholesale terms at a glance"
  >
    <div class="container-page py-12 md:py-14">
      <div class="flex items-center gap-4 mb-8 md:mb-10" data-reveal>
        <span aria-hidden="true" class="block w-10 h-px bg-cream/40" />
        <p class="text-eyebrow uppercase tracking-[0.28em] text-cream/60 font-semibold">
          Trade terms
        </p>
      </div>

      <ul
        class="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-8 lg:divide-x lg:divide-cream/15"
        data-reveal
        style="--reveal-delay: 120ms"
      >
        <li
          v-for="(term, i) in terms"
          :key="term.label"
          class="lg:px-8 first:lg:pl-0 last:lg:pr-0 flex flex-col gap-3"
        >
          <p class="text-[10px] uppercase tracking-[0.28em] text-cream/55 font-semibold">
            {{ String(i + 1).padStart(2, '0') }} &nbsp; {{ term.label }}
          </p>
          <p class="font-serif text-3xl md:text-4xl text-cream leading-none">{{ term.value }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>
