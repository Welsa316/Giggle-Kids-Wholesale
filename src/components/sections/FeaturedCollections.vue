<script setup>
import { onMounted } from 'vue'
import SectionHeader from '../ui/SectionHeader.vue'
import { useCollections } from '../../composables/useProducts.js'

const { collections, fetchCollections } = useCollections()

onMounted(() => {
  fetchCollections({ first: 6 })
})
</script>

<template>
  <section id="collections" class="bg-cream-deep relative overflow-hidden">
    <div class="container-page py-section-lg md:py-section-xl">
      <div class="grid lg:grid-cols-12 gap-10 mb-16 md:mb-20">
        <div class="lg:col-span-7">
          <SectionHeader
            eyebrow="The collections"
            title="Stock the season."
          />
        </div>
        <div class="lg:col-span-4 lg:col-start-9 flex items-end" data-reveal style="--reveal-delay: 150ms">
          <p class="text-base md:text-lg text-ink-muted leading-relaxed font-light max-w-prose">
            Six collections refreshed throughout the year — from christening gowns to crawfish boil bubbles.
          </p>
        </div>
      </div>

      <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 md:gap-y-16">
        <li
          v-for="(collection, i) in collections"
          :key="collection.id"
          class="group flex flex-col gap-4"
          data-reveal
          :style="`--reveal-delay: ${(i % 3) * 120}ms`"
        >
          <router-link :to="`/collections/${collection.handle}`" class="block relative overflow-hidden bg-cream aspect-[4/5]">
            <img
              v-if="collection.image"
              :src="collection.image.url"
              :alt="collection.image.altText || `${collection.title} collection`"
              class="absolute inset-0 w-full h-full object-cover img-zoom"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-editorial" aria-hidden="true" />
          </router-link>
          <div class="flex items-baseline justify-between gap-4 px-1">
            <div>
              <h3 class="font-serif text-2xl text-ink">{{ collection.title }}</h3>
              <p v-if="collection.description" class="font-serif italic text-sm text-ink-muted mt-1.5">
                {{ collection.description }}
              </p>
            </div>
            <router-link
              :to="`/collections/${collection.handle}`"
              :aria-label="`Shop ${collection.title}`"
              class="text-purple text-xl translate-y-0 transition-transform duration-500 ease-editorial group-hover:translate-x-1"
            >→</router-link>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>
