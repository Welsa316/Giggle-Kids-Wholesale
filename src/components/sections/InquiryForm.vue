<script setup>
import { reactive, ref, nextTick } from 'vue'
import BaseInput from '../ui/BaseInput.vue'
import BaseTextarea from '../ui/BaseTextarea.vue'
import BaseButton from '../ui/BaseButton.vue'

const initial = () => ({
  name: '',
  storeName: '',
  city: '',
  state: '',
  email: '',
  phone: '',
  message: '',
})

const form = reactive(initial())
const errors = reactive({})
const submitted = ref(false)
const submitting = ref(false)

const required = ['name', 'storeName', 'city', 'state', 'email']
const labels = {
  name: 'Your name',
  storeName: 'Store name',
  city: 'City',
  state: 'State',
  email: 'Email',
}

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateField(key) {
  if (required.includes(key) && !form[key].trim()) {
    errors[key] = `${labels[key]} is required`
    return false
  }
  if (key === 'email' && form.email && !emailRe.test(form.email.trim())) {
    errors.email = 'Please enter a valid email address'
    return false
  }
  delete errors[key]
  return true
}

function validateAll() {
  const checks = ['name', 'storeName', 'city', 'state', 'email'].map(validateField)
  return checks.every(Boolean)
}

async function onSubmit() {
  if (!validateAll()) {
    await nextTick()
    const firstError = document.querySelector('[aria-invalid="true"]')
    firstError?.focus()
    return
  }

  submitting.value = true

  // TODO: POST to /api/inquiries — wire to Express + PostgreSQL backend on Railway
  console.log('[InquiryForm] submission:', { ...form })

  // simulate network delay so the success state feels real
  await new Promise((r) => setTimeout(r, 400))

  submitting.value = false
  submitted.value = true
}

function reset() {
  Object.assign(form, initial())
  Object.keys(errors).forEach((k) => delete errors[k])
  submitted.value = false
}
</script>

<template>
  <section id="inquiry" class="bg-cream">
    <div class="container-page py-section md:py-section-lg">
      <div class="max-w-2xl mx-auto">
        <div class="text-center flex flex-col gap-3 mb-10 md:mb-14">
          <p class="eyebrow">Become a stockist</p>
          <h2 class="font-serif text-h2 text-ink">Request a line sheet.</h2>
          <p class="text-base md:text-lg text-ink-muted leading-relaxed max-w-xl mx-auto">
            Tell us about your boutique and we'll send our current line sheet, pricing, and lead times within one business day.
          </p>
        </div>

        <div class="bg-white rounded-lg border border-border p-6 md:p-10">
          <Transition
            mode="out-in"
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="opacity-0 translate-y-2"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <form
              v-if="!submitted"
              key="form"
              novalidate
              class="flex flex-col gap-5"
              @submit.prevent="onSubmit"
            >
              <BaseInput
                v-model="form.name"
                label="Your name"
                placeholder="Jane Doe"
                autocomplete="name"
                required
                :error="errors.name"
                @blur="validateField('name')"
              />
              <BaseInput
                v-model="form.storeName"
                label="Store name"
                placeholder="Magnolia &amp; Co."
                autocomplete="organization"
                required
                :error="errors.storeName"
                @blur="validateField('storeName')"
              />
              <div class="grid sm:grid-cols-3 gap-5">
                <div class="sm:col-span-2">
                  <BaseInput
                    v-model="form.city"
                    label="City"
                    placeholder="Baton Rouge"
                    autocomplete="address-level2"
                    required
                    :error="errors.city"
                    @blur="validateField('city')"
                  />
                </div>
                <BaseInput
                  v-model="form.state"
                  label="State"
                  placeholder="LA"
                  autocomplete="address-level1"
                  required
                  :error="errors.state"
                  @blur="validateField('state')"
                />
              </div>
              <BaseInput
                v-model="form.email"
                label="Email"
                type="email"
                placeholder="jane@magnolia.co"
                autocomplete="email"
                required
                :error="errors.email"
                @blur="validateField('email')"
              />
              <BaseInput
                v-model="form.phone"
                label="Phone (optional)"
                type="tel"
                placeholder="(225) 555-0100"
                autocomplete="tel"
              />
              <BaseTextarea
                v-model="form.message"
                label="Message (optional)"
                placeholder="Tell us about your boutique — what your customers love, what categories you're looking to stock."
                :rows="4"
              />

              <BaseButton type="button" variant="primary" class="mt-2 self-stretch sm:self-start" @click="onSubmit">
                <span v-if="submitting">Sending…</span>
                <span v-else>Submit inquiry</span>
              </BaseButton>

              <p class="text-sm text-ink-muted mt-2 text-center">
                Or
                <!-- TODO: replace placeholder PDF with real Giggle Kids line sheet -->
                <a
                  href="/line-sheet-placeholder.pdf"
                  class="text-purple font-semibold underline underline-offset-4 decoration-purple/40 hover:decoration-purple decoration-1"
                  download
                >
                  download the line sheet (PDF)
                </a>
                directly.
              </p>
            </form>

            <div
              v-else
              key="thanks"
              class="text-center py-4 flex flex-col items-center gap-4"
              role="status"
            >
              <div class="w-12 h-12 rounded-full bg-purple/10 text-purple flex items-center justify-center">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 11l5 5 9-11" />
                </svg>
              </div>
              <h3 class="font-serif text-h3 text-ink">Thanks, {{ form.name.split(' ')[0] || 'friend' }}.</h3>
              <p class="text-base text-ink-muted max-w-md">
                We'll get back to you within one business day with our line sheet and pricing.
              </p>
              <button
                type="button"
                class="text-sm font-semibold text-purple underline underline-offset-4 decoration-purple/40 hover:decoration-purple decoration-1 mt-2"
                @click="reset"
              >
                Submit another inquiry
              </button>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </section>
</template>
