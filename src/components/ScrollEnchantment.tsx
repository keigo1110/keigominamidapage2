'use client'

import { useEffect } from 'react'

export function ScrollEnchantment() {
  useEffect(() => {
    const root = document.documentElement
    let fade: number | undefined

    const light = () => {
      root.classList.add('is-scrolling')
      window.clearTimeout(fade)
      fade = window.setTimeout(() => {
        root.classList.remove('is-scrolling')
      }, 420)
    }

    window.addEventListener('scroll', light, { passive: true })
    document.addEventListener('scroll', light, { passive: true, capture: true })

    return () => {
      window.removeEventListener('scroll', light)
      document.removeEventListener('scroll', light, { capture: true })
      window.clearTimeout(fade)
      root.classList.remove('is-scrolling')
    }
  }, [])

  return null
}
