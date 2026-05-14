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
  <footer class="bg-ink text-cream">
    <div class="container-page py-section">
      <div class="grid lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-cream/15">
        <div class="lg:col-span-5 flex flex-col gap-3">
          <a href="#top" class="font-serif text-2xl text-cream font-bold tracking-tight inline-block">
            Giggle Kids
          </a>
          <p class="text-sm text-cream/70 max-w-sm leading-relaxed">
            Hand-smocked children's clothing, made in Baton Rouge, Louisiana since 2012.
          </p>

          <form class="mt-4 max-w-sm" @submit.prevent="onSubscribe">
            <label for="newsletter" class="text-xs uppercase tracking-[0.18em] text-cream/65 font-semibold mb-2 block">
              New collection notices
            </label>
            <div v-if="!subscribed" class="flex gap-2">
              <input
                id="newsletter"
                v-model="email"
                type="email"
                placeholder="you@boutique.com"
                autocomplete="email"
                class="flex-1 bg-transparent border border-cream/20 rounded px-3 py-2.5 text-sm text-cream placeholder:text-cream/40 focus:outline-none focus:border-cream/60"
              />
              <button
                type="submit"
                class="bg-cream text-ink rounded px-4 py-2.5 text-sm font-semibold hover:bg-cream/90 transition-colors"
              >
                Notify me
              </button>
            </div>
            <p v-else class="text-sm text-cream/85" role="status">
              Thanks — we'll email you at the next drop.
            </p>
          </form>
        </div>

        <div class="lg:col-span-3">
          <h4 class="text-xs uppercase tracking-[0.18em] text-cream/65 font-semibold mb-4">Wholesale</h4>
          <ul class="flex flex-col gap-3 text-sm">
            <li><a href="#" class="text-cream/85 hover:text-cream transition-colors">Shop on Faire</a></li>
            <li><a href="#inquiry" class="text-cream/85 hover:text-cream transition-colors">Request line sheet</a></li>
            <li><a href="#how-to-order" class="text-cream/85 hover:text-cream transition-colors">How to order</a></li>
            <li><a href="#" class="text-cream/85 hover:text-cream transition-colors">Wholesale terms</a></li>
          </ul>
        </div>

        <div class="lg:col-span-4">
          <h4 class="text-xs uppercase tracking-[0.18em] text-cream/65 font-semibold mb-4">Get in touch</h4>
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
            <li class="text-cream/70">Mon – Fri, 9 AM – 5 PM CT</li>
          </ul>

          <div class="flex items-center gap-3 mt-5">
            <a
              href="#"
              aria-label="Giggle Kids on Instagram"
              class="w-9 h-9 rounded-full border border-cream/20 flex items-center justify-center text-cream/85 hover:border-cream hover:text-cream transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
              </svg>
            </a>
            <a
              href="mailto:hello@gigglekidsla.com"
              aria-label="Email Giggle Kids"
              class="w-9 h-9 rounded-full border border-cream/20 flex items-center justify-center text-cream/85 hover:border-cream hover:text-cream transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 7 9-7" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div class="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-cream/60">
        <p>© {{ year }} Giggle Kids · Proudly made in Louisiana.</p>
        <ul class="flex gap-6">
          <li><a href="#" class="hover:text-cream transition-colors">Privacy</a></li>
          <li><a href="#" class="hover:text-cream transition-colors">Terms</a></li>
          <li><a href="#" class="hover:text-cream transition-colors">Shipping</a></li>
        </ul>
      </div>
    </div>
  </footer>
</template>
