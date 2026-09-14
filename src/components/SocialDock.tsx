'use client'

import { useRef, useState } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import type { SocialLink } from '../types'

const PEAK_SCALE = 1.72
const MAG_DISTANCE = 118
const ease = [0.22, 1, 0.36, 1] as const
const dockSpring = { mass: 0.16, stiffness: 320, damping: 20 }

function DockIcon({
  social,
  mouseX,
  reduced,
  delay,
  isHot,
  onHot,
}: {
  social: SocialLink
  mouseX: MotionValue<number>
  reduced: boolean
  delay: number
  isHot: boolean
  onHot: (url: string | null) => void
}) {
  const ref = useRef<HTMLAnchorElement>(null)

  const distance = useTransform(mouseX, (x) => {
    const bounds = ref.current?.getBoundingClientRect()
    if (!bounds) return MAG_DISTANCE
    return x - (bounds.left + bounds.width / 2)
  })
  const scaleTarget = useTransform(
    distance,
    [-MAG_DISTANCE, 0, MAG_DISTANCE],
    [1, PEAK_SCALE, 1],
  )
  const scale = useSpring(scaleTarget, dockSpring)

  const label = social.url.split('/').pop() || social.url

  const focusMagnify = () => {
    const bounds = ref.current?.getBoundingClientRect()
    if (bounds) mouseX.set(bounds.left + bounds.width / 2)
    onHot(social.url)
  }

  return (
    <motion.a
      ref={ref}
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${label} profile`}
      className="relative flex h-8 min-w-0 flex-1 items-end justify-center outline-none will-change-transform sm:h-11 sm:w-11 sm:flex-none"
      style={{
        scale: reduced ? 1 : scale,
        transformOrigin: 'bottom center',
      }}
      initial={reduced ? { opacity: 1 } : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={reduced ? { duration: 0 } : { duration: 0.55, delay, ease }}
      onMouseEnter={() => onHot(social.url)}
      onFocus={focusMagnify}
      onBlur={() => {
        mouseX.set(Number.POSITIVE_INFINITY)
        onHot(null)
      }}
    >
      <social.icon
        className={`h-5 w-5 transition-colors duration-200 sm:h-7 sm:w-7 ${
          isHot ? social.accentClass ?? 'text-[#D4C07A]' : 'text-[#A39E94]'
        }`}
      />
    </motion.a>
  )
}

export function SocialDock({
  links,
  reduced,
}: {
  links: SocialLink[]
  reduced: boolean
}) {
  const mouseX = useMotionValue(Number.POSITIVE_INFINITY)
  const [hotUrl, setHotUrl] = useState<string | null>(null)

  return (
    <div
      className="mb-10 flex h-14 w-full max-w-lg items-end overflow-visible sm:h-[4.75rem] sm:max-w-none"
      onMouseMove={(event) => mouseX.set(event.clientX)}
      onMouseLeave={() => {
        mouseX.set(Number.POSITIVE_INFINITY)
        setHotUrl(null)
      }}
    >
      <div className="flex w-full items-end justify-between sm:w-auto sm:justify-start">
        {links.map((social, index) => (
          <DockIcon
            key={social.url}
            social={social}
            mouseX={mouseX}
            reduced={reduced}
            delay={0.86 + index * 0.045}
            isHot={hotUrl === social.url}
            onHot={setHotUrl}
          />
        ))}
      </div>
    </div>
  )
}
