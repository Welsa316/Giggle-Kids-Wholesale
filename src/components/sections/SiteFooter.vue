<script setup>
const year = new Date().getFullYear()
</script>

<template>
  <footer class="bg-ink text-cream relative overflow-hidden">
    <div class="container-page pt-section md:pt-section-lg pb-12">
      <div class="grid lg:grid-cols-12 gap-12 lg:gap-16 pb-16 md:pb-20 border-b border-cream/10">
        <div class="lg:col-span-7 flex flex-col gap-7" data-reveal>
          <p class="text-[10px] uppercase tracking-[0.32em] text-cream/50 mb-3">Est. 2026 &middot; New Orleans</p>
          <router-link to="/" class="inline-block" aria-label="Giggle Kids — Home">
            <span class="logo-mask block h-20 md:h-24 lg:h-28 text-cream" role="img" aria-label="Giggle Kids" />
          </router-link>
          <p class="font-serif italic text-cream/70 text-lg mt-4 max-w-md leading-relaxed">
            Heirloom keepsakes for the little ones &mdash; designed and made in New Orleans.
          </p>
        </div>

        <div class="lg:col-span-5 flex flex-col gap-3 lg:items-end" data-reveal style="--reveal-delay: 150ms">
          <p class="text-[10px] uppercase tracking-[0.28em] text-cream/55 font-semibold">
            Get in touch
          </p>
          <a
            href="mailto:gigglekids786@gmail.com"
            class="font-serif text-xl md:text-2xl text-cream hover:text-cream/80 transition-colors lg:text-right"
          >
            gigglekids786@gmail.com
          </a>
          <a
            href="tel:+15042593663"
            class="font-serif text-base text-cream/70 hover:text-cream transition-colors lg:text-right"
          >
            (504) 259-3663
          </a>
        </div>
      </div>

      <div class="grid grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16 py-12 md:py-16 border-b border-cream/10">
        <div>
          <h4 class="text-[10px] uppercase tracking-[0.28em] text-cream/55 font-semibold mb-5">Shop</h4>
          <ul class="flex flex-col gap-3 text-sm">
            <li><router-link to="/collections/all" class="text-cream/85 hover:text-cream transition-colors">All products</router-link></li>
            <li><router-link to="/collections/new-arrivals" class="text-cream/85 hover:text-cream transition-colors">New arrivals</router-link></li>
          </ul>
        </div>

        <div>
          <h4 class="text-[10px] uppercase tracking-[0.28em] text-cream/55 font-semibold mb-5">About</h4>
          <ul class="flex flex-col gap-3 text-sm">
            <li><router-link to="/about" class="text-cream/85 hover:text-cream transition-colors">Our story</router-link></li>
            <li><a href="mailto:gigglekids786@gmail.com" class="text-cream/85 hover:text-cream transition-colors">Contact us</a></li>
          </ul>
        </div>
      </div>

      <div class="pt-8 text-[10px] uppercase tracking-[0.22em] text-cream/45">
        <p>© {{ year }} Giggle Kids LLC · Made in New Orleans</p>
      </div>
    </div>
  </footer>
</template>
