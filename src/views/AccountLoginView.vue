<script setup>
import { ref } from 'vue'
import { useCustomer } from '../composables/useCustomer.js'

const { startLogin, isCustomerAccountConfigured } = useCustomer()
const error = ref(null)
const loading = ref(false)

async function onSignIn() {
  if (!isCustomerAccountConfigured) {
    error.value = 'Customer Account API isn\'t configured yet. See SHOPIFY_SETUP.md.'
    return
  }
  loading.value = true
  try {
    await startLogin()
  } catch (e) {
    error.value = e.message
    loading.value = false
  }
}
</script>

<template>
  <div class="container-page py-section md:py-section-lg">
    <div class="max-w-md mx-auto text-center">
      <p class="eyebrow mb-4">Account</p>
      <h1 class="font-serif text-h1 text-ink mb-6">Sign in.</h1>
      <p class="text-base text-ink-muted leading-relaxed font-light mb-10">
        Sign in to view your orders, track shipments, and check out faster next time.
      </p>

      <button
        type="button"
        :disabled="loading"
        class="w-full bg-purple text-cream py-4 text-[11px] uppercase tracking-[0.18em] font-semibold rounded-full hover:bg-purple-deep transition-colors disabled:bg-ink-soft"
        @click="onSignIn"
      >
        {{ loading ? 'Redirecting…' : 'Continue with Shopify' }}
      </button>

      <p v-if="error" class="text-sm text-red-700 italic font-serif mt-4">{{ error }}</p>

      <p class="text-xs text-ink-soft mt-8">
        New here?
        <a v-if="isCustomerAccountConfigured" href="#" class="text-purple border-b border-purple/40">Create an account</a>
        — you'll be prompted to make one if you don't have one yet.
      </p>
    </div>
  </div>
</template>
