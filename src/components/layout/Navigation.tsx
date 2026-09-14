'use client'

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBars, FaTimes } from 'react-icons/fa'
import { useTranslation } from '../../contexts/TranslationContext'
import { LanguageSwitch } from '../LanguageSwitch'
import { usePrefersReducedMotion } from '../portfolio-agent/usePrefersReducedMotion'
import { NAV_ITEMS, type NavItem } from '../../types'
import type { TranslationKey } from '../../translations'

const glassSpring = {
  type: 'spring' as const,
  stiffness: 360,
  damping: 32,
  mass: 0.85,
}

function isItemActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

interface GlassBox {
  x: number
  y: number
  width: number
  height: number
}

function measureGlass(
  list: HTMLElement | null,
  item: HTMLElement | null,
): GlassBox | null {
  if (!list || !item) return null

  return {
    x: item.offsetLeft,
    y: item.offsetTop,
    width: item.offsetWidth,
    height: item.offsetHeight,
  }
}

function DesktopNavGlass({
  pathname,
  reduced,
}: {
  pathname: string
  reduced: boolean
}) {
  const { t } = useTranslation()
  const listRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<Map<string, HTMLAnchorElement>>(new Map())
  const [pill, setPill] = useState<GlassBox | null>(null)
  const glassMotion = reduced ? { duration: 0 } : glassSpring
  const activeItem = NAV_ITEMS.find((item) => isItemActive(pathname, item.href))

  const updatePill = useCallback(() => {
    const next = measureGlass(
      listRef.current,
      activeItem ? itemRefs.current.get(activeItem.key) ?? null : null,
    )
    setPill(next)
  }, [activeItem])

  useLayoutEffect(() => {
    updatePill()
  }, [updatePill, t])

  useEffect(() => {
    const list = listRef.current
    if (!list || typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', updatePill)
      return () => window.removeEventListener('resize', updatePill)
    }

    const observer = new ResizeObserver(() => updatePill())
    observer.observe(list)
    for (const node of itemRefs.current.values()) {
      observer.observe(node)
    }

    return () => observer.disconnect()
  }, [updatePill, t])

  return (
    <div ref={listRef} className="relative hidden items-center md:flex">
      {pill && (
        <motion.span
          aria-hidden="true"
          className="nav-liquid-glass pointer-events-none absolute z-0"
          initial={false}
          animate={{ x: pill.x, width: pill.width, height: pill.height }}
          transition={glassMotion}
          style={{ top: pill.y, left: 0, borderRadius: 9999 }}
        />
      )}
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.key}
          href={item.href}
          ref={(node) => {
            if (node) itemRefs.current.set(item.key, node)
            else itemRefs.current.delete(item.key)
          }}
          className={`relative z-10 rounded-full px-3.5 py-1.5 text-sm font-medium outline-none ${
            isItemActive(pathname, item.href)
              ? 'text-[#F2EFE9]'
              : 'text-[#9A958C] hover:text-[#F2EFE9]'
          }`}
          aria-current={isItemActive(pathname, item.href) ? 'page' : undefined}
        >
          {t(item.labelKey as TranslationKey)}
        </Link>
      ))}
    </div>
  )
}

function MobileNavGlass({
  pathname,
  reduced,
  onNavigate,
}: {
  pathname: string
  reduced: boolean
  onNavigate: () => void
}) {
  const { t } = useTranslation()
  const listRef = useRef<HTMLElement>(null)
  const itemRefs = useRef<Map<string, HTMLAnchorElement>>(new Map())
  const [pill, setPill] = useState<GlassBox | null>(null)
  const glassMotion = reduced ? { duration: 0 } : glassSpring
  const activeItem = NAV_ITEMS.find((item) => isItemActive(pathname, item.href))

  const updatePill = useCallback(() => {
    const next = measureGlass(
      listRef.current,
      activeItem ? itemRefs.current.get(activeItem.key) ?? null : null,
    )
    setPill(next)
  }, [activeItem])

  useLayoutEffect(() => {
    updatePill()
  }, [updatePill, t])

  return (
    <nav
      ref={listRef}
      className="relative space-y-1"
      role="navigation"
      aria-label="Mobile navigation"
    >
      {pill && (
        <motion.span
          aria-hidden="true"
          className="nav-liquid-glass pointer-events-none absolute z-0"
          initial={false}
          animate={{ x: pill.x, y: pill.y, width: pill.width, height: pill.height }}
          transition={glassMotion}
          style={{ top: 0, left: 0, borderRadius: 9999 }}
        />
      )}
      {NAV_ITEMS.map((item: NavItem) => (
        <Link
          key={item.key}
          href={item.href}
          ref={(node) => {
            if (node) itemRefs.current.set(item.key, node)
            else itemRefs.current.delete(item.key)
          }}
          className={`relative z-10 block rounded-full px-4 py-3 text-lg outline-none ${
            isItemActive(pathname, item.href)
              ? 'text-[#F2EFE9]'
              : 'text-[#9A958C] hover:text-[#F2EFE9]'
          }`}
          onClick={onNavigate}
          aria-current={isItemActive(pathname, item.href) ? 'page' : undefined}
        >
          {t(item.labelKey as TranslationKey)}
        </Link>
      ))}
    </nav>
  )
}

export function Navigation() {
  const { t } = useTranslation()
  const pathname = usePathname()
  const reduced = usePrefersReducedMotion()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isMenuOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-[max(0.7rem,env(safe-area-inset-top))] sm:px-5">
        <nav
          className="nav-liquid-shell pointer-events-auto mx-auto flex w-full max-w-5xl items-center justify-between gap-3 rounded-full px-3 py-2 sm:px-4 sm:py-2.5 md:w-fit md:gap-6"
          role="navigation"
          aria-label="Main navigation"
        >
          <Link
            href="/"
            className="rounded-full px-2.5 py-1 text-lg font-semibold tracking-tight text-[#F2EFE9] outline-none sm:text-xl"
            aria-label="Go to home page"
          >
            {t('name')}
          </Link>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <DesktopNavGlass pathname={pathname} reduced={reduced} />
            <LanguageSwitch />

            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="rounded-full p-2.5 text-[#F2EFE9] outline-none transition-colors duration-200 hover:bg-white/[0.06]"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
              >
                {isMenuOpen ? <FaTimes size={16} /> : <FaBars size={16} />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
              onClick={() => setIsMenuOpen(false)}
              aria-hidden="true"
            />

            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="nav-liquid-shell fixed left-3 right-3 top-[4.75rem] z-50 rounded-[1.5rem] md:hidden"
              role="dialog"
              aria-modal="true"
              aria-labelledby="mobile-menu-title"
            >
              <div className="p-5">
                <h2 id="mobile-menu-title" className="sr-only">Navigation Menu</h2>
                <MobileNavGlass
                  pathname={pathname}
                  reduced={reduced}
                  onNavigate={() => setIsMenuOpen(false)}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
