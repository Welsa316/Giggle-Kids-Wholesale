<script setup>
import { ref } from 'vue'

const email = ref('')
const subscribed = ref(false)

function onSubscribe() {
  if (!email.value.trim()) return
  // TODO: wire to ESP (Mailchimp, Klaviyo, etc.) via backend or direct API
  console.log('[Newsletter] subscribe:', email.value)
  subscribed.value = true
  email.value = ''
}

const year = new Date().getFullYear()
</script>

<template>
  <footer class="bg-ink text-cream relative overflow-hidden">
    <div class="container-page pt-section md:pt-section-lg pb-12">
      <!-- Top: oversized brand mark + newsletter -->
      <div class="grid lg:grid-cols-12 gap-12 lg:gap-16 pb-16 md:pb-20 border-b border-cream/10">
        <div class="lg:col-span-7 flex flex-col gap-7" data-reveal>
          <div>
            <p class="text-[10px] uppercase tracking-[0.32em] text-cream/50 mb-3">Est. 2012</p>
            <a href="#top" class="font-serif text-5xl md:text-6xl lg:text-7xl text-cream font-medium tracking-tight leading-none inline-block">
              Giggle <span class="italic text-cream/85">Kids</span>
            </a>
            <p class="font-serif italic text-cream/70 text-lg mt-4 max-w-md leading-relaxed">
              Hand-smocked children's clothing, made in Baton Rouge, Louisiana since 2012.
            </p>
          </div>
        </div>

        <div class="lg:col-span-5 flex flex-col gap-5 lg:items-end" data-reveal style="--reveal-delay: 150ms">
          <div class="lg:text-right">
            <p class="text-[10px] uppercase tracking-[0.28em] text-cream/55 font-semibold mb-2">
              New collection notices
            </p>
            <p class="font-serif italic text-cream/70 text-base">
              Quarterly drops · No filler.
            </p>
          </div>

          <form v-if="!subscribed" class="w-full max-w-sm flex items-end gap-4 mt-2" @submit.prevent="onSubscribe">
            <label for="newsletter" class="sr-only">Email address</label>
            <input
              id="newsletter"
              v-model="email"
              type="email"
              placeholder="you@boutique.com"
              autocomplete="email"
              class="flex-1 bg-transparent border-0 border-b border-cream/30 pb-2 text-base text-cream placeholder:text-cream/35 font-serif focus:outline-none focus:border-cream"
            />
            <button
              type="submit"
              class="text-[10px] uppercase tracking-[0.22em] font-semibold text-cream border-b border-cream pb-2 hover:border-cream/60 hover:text-cream/80 transition-colors"
            >
              Subscribe
            </button>
          </form>
          <p v-else class="font-serif italic text-cream/85 text-base" role="status">
            Thank you — we'll write at the next drop.
          </p>
        </div>
      </div>

      <!-- Middle: 4 columns of footer nav -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 py-16 md:py-20 border-b border-cream/10">
        <div>
          <h4 class="text-[10px] uppercase tracking-[0.28em] text-cream/55 font-semibold mb-5">Wholesale</h4>
          <ul class="flex flex-col gap-3 text-sm">
            <li><a href="#" class="text-cream/85 hover:text-cream transition-colors">Shop on Faire</a></li>
            <li><a href="#inquiry" class="text-cream/85 hover:text-cream transition-colors">Request line sheet</a></li>
            <li><a href="#how-to-order" class="text-cream/85 hover:text-cream transition-colors">How to order</a></li>
            <li><a href="#" class="text-cream/85 hover:text-cream transition-colors">Wholesale terms</a></li>
          </ul>
        </div>

        <div>
          <h4 class="text-[10px] uppercase tracking-[0.28em] text-cream/55 font-semibold mb-5">The brand</h4>
          <ul class="flex flex-col gap-3 text-sm">
            <li><a href="#about" class="text-cream/85 hover:text-cream transition-colors">Our story</a></li>
            <li><a href="#collections" class="text-cream/85 hover:text-cream transition-colors">Collections</a></li>
            <li><a href="#" class="text-cream/85 hover:text-cream transition-colors">Lookbook</a></li>
            <li><a href="#" class="text-cream/85 hover:text-cream transition-colors">Press</a></li>
          </ul>
        </div>

        <div>
          <h4 class="text-[10px] uppercase tracking-[0.28em] text-cream/55 font-semibold mb-5">Studio</h4>
          <ul class="flex flex-col gap-3 text-sm text-cream/85 font-serif">
            <li class="leading-relaxed">
              123 Magnolia Lane<br />
              Baton Rouge, LA 70802
            </li>
            <li class="text-cream/55 italic text-xs mt-1">By appointment only</li>
          </ul>
        </div>

        <div>
          <h4 class="text-[10px] uppercase tracking-[0.28em] text-cream/55 font-semibold mb-5">Get in touch</h4>
          <ul class="flex flex-col gap-3 text-sm text-cream/85">
            <!-- TODO: replace with real contact details -->
            <li>
              <a href="mailto:hello@gigglekidsla.com" class="hover:text-cream transition-colors">
                hello@gigglekidsla.com
              </a>
            </li>
            <li>
              <a href="tel:+12255550100" class="hover:text-cream transition-colors">
                (225) 555-0100
              </a>
            </li>
            <li class="text-cream/55 italic text-xs">Mon – Fri, 9 AM – 5 PM CT</li>
          </ul>

          <div class="flex items-center gap-3 mt-6">
            <a
              href="#"
              aria-label="Giggle Kids on Instagram"
              class="w-9 h-9 rounded-full border border-cream/25 flex items-center justify-center text-cream/85 hover:border-cream hover:text-cream transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="Giggle Kids on Pinterest"
              class="w-9 h-9 rounded-full border border-cream/25 flex items-center justify-center text-cream/85 hover:border-cream hover:text-cream transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12c0 4.06 2.42 7.55 5.9 9.11-.08-.77-.15-1.97.03-2.81.17-.76 1.1-4.83 1.1-4.83s-.28-.56-.28-1.39c0-1.3.75-2.27 1.69-2.27.8 0 1.18.6 1.18 1.32 0 .8-.51 2-.78 3.11-.22.93.47 1.69 1.39 1.69 1.67 0 2.95-1.76 2.95-4.3 0-2.25-1.62-3.82-3.93-3.82-2.68 0-4.25 2.01-4.25 4.09 0 .81.31 1.68.7 2.15.08.09.09.18.07.27-.07.31-.24.93-.27 1.06-.04.18-.14.22-.32.13-1.18-.55-1.92-2.27-1.92-3.65 0-2.97 2.16-5.7 6.22-5.7 3.27 0 5.81 2.33 5.81 5.44 0 3.25-2.05 5.86-4.89 5.86-.95 0-1.85-.5-2.16-1.08l-.59 2.24c-.21.82-.78 1.85-1.17 2.48.88.27 1.81.42 2.78.42 5.52 0 10-4.48 10-10S17.52 2 12 2z"/>
              </svg>
            </a>
            <a
              href="mailto:hello@gigglekidsla.com"
              aria-label="Email Giggle Kids"
              class="w-9 h-9 rounded-full border border-cream/25 flex items-center justify-center text-cream/85 hover:border-cream hover:text-cream transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 7 9-7" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Bottom row -->
      <div class="pt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[10px] uppercase tracking-[0.22em] text-cream/45">
        <p>© {{ year }} Giggle Kids · Hand-stitched in Louisiana</p>
        <ul class="flex gap-6">
          <li><a href="#" class="hover:text-cream transition-colors">Privacy</a></li>
          <li><a href="#" class="hover:text-cream transition-colors">Terms</a></li>
          <li><a href="#" class="hover:text-cream transition-colors">Shipping</a></li>
        </ul>
      </div>
    </div>
  </footer>
</template>
