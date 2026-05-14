<script setup>
defineProps({
  name: { type: String, default: 'Claire Boudreaux' },
})
</script>

<template>
  <!-- Hand-drawn-feel signature SVG. Can be swapped with a real scanned signature. -->
  <svg
    viewBox="0 0 280 60"
    xmlns="http://www.w3.org/2000/svg"
    class="text-purple"
    role="img"
    :aria-label="`${name} signature`"
  >
    <path
      d="M8 38 C 18 18, 32 12, 42 28 C 48 40, 36 48, 30 38 C 26 30, 38 22, 50 26 C 62 30, 72 38, 86 32 C 100 26, 108 38, 96 44 M104 32 C 116 22, 128 28, 132 36 M138 32 C 142 26, 150 26, 154 32 C 158 38, 152 44, 146 40 M162 28 C 168 18, 178 18, 182 26 L 186 36 M192 32 C 200 24, 212 26, 214 36 M222 30 C 226 22, 234 22, 238 30 L 242 38 M250 32 C 256 24, 268 26, 270 34"
      fill="none"
      stroke="currentColor"
      stroke-width="1.4"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
