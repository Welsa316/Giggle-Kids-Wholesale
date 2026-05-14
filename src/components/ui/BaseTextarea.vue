<script setup>
import { computed, useId } from 'vue'

const props = defineProps({
  modelValue: { type: String, default: '' },
  label: { type: String, required: true },
  placeholder: { type: String, default: '' },
  required: { type: Boolean, default: false },
  rows: { type: Number, default: 4 },
  error: { type: String, default: '' },
})

defineEmits(['update:modelValue', 'blur'])

const uid = useId()
const inputId = computed(() => `field-${uid}`)
const errorId = computed(() => `error-${uid}`)
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <label :for="inputId" class="text-sm font-semibold text-ink">
      {{ label }}
      <span v-if="required" class="text-purple/70" aria-hidden="true">*</span>
    </label>
    <textarea
      :id="inputId"
      :value="modelValue"
      :placeholder="placeholder"
      :required="required"
      :rows="rows"
      :aria-invalid="!!error"
      :aria-describedby="error ? errorId : undefined"
      class="w-full bg-white border border-border rounded px-4 py-3 text-ink placeholder:text-ink-muted/60 transition-colors focus:outline-none focus:border-purple focus:ring-2 focus:ring-purple/15 resize-y min-h-[120px]"
      :class="error && 'border-red-400 focus:border-red-500 focus:ring-red-200'"
      @input="$emit('update:modelValue', $event.target.value)"
      @blur="$emit('blur')"
    />
    <p v-if="error" :id="errorId" class="text-xs text-red-600 mt-0.5">{{ error }}</p>
  </div>
</template>
