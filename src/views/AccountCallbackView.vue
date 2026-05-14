<script setup>
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCustomer } from '../composables/useCustomer.js'

const router = useRouter()
const route = useRoute()
const { handleCallback, loadCustomer } = useCustomer()
const error = ref(null)

onMounted(async () => {
  const code = route.query.code
  const state = route.query.state
  const oauthError = route.query.error

  if (oauthError) {
    error.value = String(oauthError)
    return
  }
  if (!code || !state) {
    error.value = 'Missing OAuth response.'
    return
  }

  try {
    await handleCallback(String(code), String(state))
    await loadCustomer()
    router.replace({ name: 'account' })
  } catch (e) {
    error.value = e.message
  }
})
</script>

<template>
  <div class="container-page py-section text-center">
    <p v-if="!error" class="font-serif italic text-ink-muted">Signing you in…</p>
    <div v-else class="max-w-md mx-auto">
      <p class="eyebrow mb-4">Sign in failed</p>
      <p class="font-serif text-2xl text-ink mb-4">Something went wrong.</p>
      <p class="text-sm text-red-700 italic font-serif mb-6">{{ error }}</p>
      <router-link
        to="/account/login"
        class="text-[11px] uppercase tracking-[0.22em] font-semibold text-purple border-b border-purple/40 hover:border-purple pb-1 transition-colors"
      >
        Try again
      </router-link>
    </div>
  </div>
</template>
