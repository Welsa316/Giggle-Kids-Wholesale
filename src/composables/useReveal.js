import { onMounted, onBeforeUnmount, nextTick } from 'vue'

/**
 * Reveals elements with [data-reveal] attribute as they enter the viewport.
 *
 * - Single shared IntersectionObserver per page
 * - MutationObserver picks up [data-reveal] elements added later
 *   (e.g. when a new route loads), so reveals work across navigation
 * - Honors prefers-reduced-motion via CSS in main.css
 */
export function useReveal(options = {}) {
  const { root = null, rootMargin = '0px 0px -10% 0px', threshold = 0.12 } = options

  let intersectionObserver
  let mutationObserver

  function observe(el) {
    if (!el || el.dataset?.revealObserved) return
    el.dataset.revealObserved = '1'
    intersectionObserver?.observe(el)
  }

  function scanAll() {
    document.querySelectorAll('[data-reveal]').forEach(observe)
  }

  onMounted(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return

    intersectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-reveal', 'in')
            intersectionObserver.unobserve(entry.target)
          }
        }
      },
      { root, rootMargin, threshold }
    )

    scanAll()

    // Re-scan whenever the DOM changes (route changes, async-loaded content)
    mutationObserver = new MutationObserver(() => {
      // Defer to next tick so child fragments are settled
      nextTick(scanAll)
    })
    mutationObserver.observe(document.body, { childList: true, subtree: true })
  })

  onBeforeUnmount(() => {
    intersectionObserver?.disconnect()
    mutationObserver?.disconnect()
  })
}
