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
  <div class="flex flex-col gap-2">
    <label :for="inputId" class="text-[10px] uppercase tracking-[0.22em] font-semibold text-ink-muted">
      {{ label }}
      <span v-if="required" class="text-purple/70 ml-1" aria-hidden="true">*</span>
    </label>
    <textarea
      :id="inputId"
      :value="modelValue"
      :placeholder="placeholder"
      :required="required"
      :rows="rows"
      :aria-invalid="!!error"
      :aria-describedby="error ? errorId : undefined"
      class="w-full bg-transparent border-0 border-b border-border-ink text-ink placeholder:text-ink-soft/60 font-serif text-lg pb-3 pt-1 transition-colors focus:outline-none focus:border-purple resize-none min-h-[100px]"
      :class="error && 'border-red-500/70 focus:border-red-600'"
      @input="$emit('update:modelValue', $event.target.value)"
      @blur="$emit('blur')"
    />
    <p v-if="error" :id="errorId" class="text-xs text-red-700 mt-1 italic font-serif">{{ error }}</p>
  </div>
</template>
