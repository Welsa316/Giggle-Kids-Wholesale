<template>
  <div class="container-page py-section text-center">
    <p class="eyebrow mb-4">404</p>
    <h1 class="font-serif text-display text-ink mb-6">Not found.</h1>
    <p class="text-base text-ink-muted leading-relaxed font-light mb-10 max-w-md mx-auto">
      We couldn't find that page. It may have moved, or the link may be broken.
    </p>
    <router-link
      to="/"
      class="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] font-semibold text-purple border-b border-purple/40 hover:border-purple pb-1 transition-colors"
    >
      Back home
      <span aria-hidden="true">→</span>
    </router-link>
  </div>
</template>
