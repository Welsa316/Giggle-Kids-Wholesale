import { onMounted, onBeforeUnmount } from 'vue'

/**
 * Reveals elements with [data-reveal] attribute as they enter the viewport.
 * Uses IntersectionObserver — single shared instance per page.
 * Add [data-reveal] to any element you want to animate in.
 * Add inline `style="--reveal-delay: 120ms"` to stagger.
 */
export function useReveal(options = {}) {
  const { root = null, rootMargin = '0px 0px -10% 0px', threshold = 0.12 } = options
  let observer

  onMounted(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-reveal', 'in')
            observer.unobserve(entry.target)
          }
        }
      },
      { root, rootMargin, threshold }
    )

    document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el))
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
  })
}
