<script setup>
// TODO: confirm real numbers with Giggle Kids before launch
const terms = [
  { label: 'Opening order', value: '$150' },
  { label: 'Reorder minimum', value: '$75' },
  { label: 'Fulfillment', value: '2–3 days' },
  { label: 'Payment terms', value: 'NET 60 via Faire' },
]
</script>

<template>
  <section
    class="bg-purple text-cream"
    aria-label="Wholesale terms at a glance"
  >
    <div class="container-page py-8 md:py-10">
      <ul class="grid grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-8 lg:divide-x lg:divide-cream/20">
        <li
          v-for="term in terms"
          :key="term.label"
          class="text-center lg:px-4 first:lg:pl-0 last:lg:pr-0"
        >
          <p class="text-[11px] md:text-xs uppercase tracking-[0.18em] text-cream/65 font-semibold mb-1.5">
            {{ term.label }}
          </p>
          <p class="font-serif text-xl md:text-2xl">{{ term.value }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>
