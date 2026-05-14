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

  await new Promise((r) => setTimeout(r, 500))

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
  <section id="inquiry" class="bg-cream relative overflow-hidden">
    <div class="container-page py-section-lg md:py-section-xl">
      <div class="max-w-2xl mx-auto">
        <div class="text-center flex flex-col items-center gap-6 mb-14 md:mb-20" data-reveal>
          <p class="eyebrow">Become a stockist</p>
          <h2 class="font-serif text-h2 text-ink">
            Request a line sheet.
          </h2>
          <p class="text-base md:text-lg text-ink-muted leading-relaxed font-light max-w-xl">
            Tell us about your boutique and we'll send our current line sheet, pricing, and lead times within one business day.
          </p>
        </div>

        <Transition
          mode="out-in"
          enter-active-class="transition duration-500 ease-editorial"
          enter-from-class="opacity-0 translate-y-3"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition duration-300 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <form
            v-if="!submitted"
            key="form"
            novalidate
            class="flex flex-col gap-9"
            data-reveal
            style="--reveal-delay: 150ms"
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
            <div class="grid sm:grid-cols-3 gap-9">
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
              :rows="3"
            />

            <div class="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8 mt-6">
              <BaseButton type="button" variant="primary" size="lg" @click="onSubmit">
                <span v-if="submitting">Sending&hellip;</span>
                <span v-else>Submit inquiry</span>
              </BaseButton>

              <p class="text-sm text-ink-soft">
                Or
                <!-- TODO: replace placeholder PDF with real Giggle Kids line sheet -->
                <a
                  href="/line-sheet-placeholder.pdf"
                  class="font-serif italic text-purple border-b border-purple/40 hover:border-purple pb-px transition-colors"
                  download
                >
                  download the line sheet
                </a>
                directly &middot; PDF
              </p>
            </div>
          </form>

          <div
            v-else
            key="thanks"
            class="text-center py-12 flex flex-col items-center gap-6"
            role="status"
          >
            <h3 class="font-serif text-h2 text-ink">
              Thank you, {{ form.name.split(' ')[0] || 'friend' }}.
            </h3>
            <p class="text-base md:text-lg text-ink-muted max-w-md leading-relaxed font-light">
              We'll get back to you within one business day with our line sheet, pricing, and lead times.
            </p>
            <button
              type="button"
              class="mt-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] font-semibold text-purple border-b border-purple/40 hover:border-purple pb-1 transition-colors"
              @click="reset"
            >
              Submit another inquiry
            </button>
          </div>
        </Transition>
      </div>
    </div>
  </section>
</template>
