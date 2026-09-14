'use client'

import { useState, useCallback, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from '../../contexts/TranslationContext'
import { useTheme } from '../../contexts/ThemeContext'
import { X, ExternalLink, ChevronLeft, ChevronRight, Grid3X3, LayoutGrid, Maximize2, Play, Pause, ZoomIn } from 'lucide-react'
import Image from 'next/image'

interface Artwork {
  id: string
  title: string
  description: string
  image: string
  link?: string
  year: string
  team: string
  keywords?: string[]
  awards?: string[]
}

type ViewMode = 'minimal' | 'grid' | 'masonry'

export function ArtworkSection() {
  const { t } = useTranslation()
  const { isDark } = useTheme()
  const [selectedArtwork, setSelectedArtwork] = useState<number | null>(null)
  const [viewMode, setViewMode] = useState<ViewMode>('minimal')
  const [isAutoPlay, setIsAutoPlay] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const artworks: Artwork[] = useMemo(() => [
    {
      id: 'geocussion',
      title: t('artwork1Title'),
      description: t('artwork1Description'),
      image: "/images/geo.jpeg",
      link: "https://geohp.vercel.app/",
      year: '2024',
      team: '4ZIGEN',
      keywords: ['Interactive', 'Sound', 'Sensor', 'Physical Computing']
    },
    {
      id: 'protophysica',
      title: t('artwork2Title'),
      description: t('artwork2Description'),
      image: "/images/proto.jpeg",
      link: "https://protophysicahp.vercel.app/",
      year: '2024',
      team: '4ZIGEN',
      keywords: ['Energy', 'Electronics', 'Sustainable Design']
    },
    {
      id: 'cotton-sketch-pen',
      title: t('artwork3Title'),
      description: t('artwork3Description'),
      image: "/images/cotton.jpeg",
      link: "https://cotton-sketch-pen-hp.vercel.app/",
      year: '2024',
      team: '4ZIGEN',
      keywords: ['3D Printing', 'Portable', 'Creative Tools']
    },
    {
      id: 'metransfer',
      title: t('artwork4Title'),
      description: t('artwork4Description'),
      image: "/images/met.jpeg",
      link: "https://metransfer.vercel.app/",
      year: '2024',
      team: '4ZIGEN',
      keywords: ['Transformation', 'Liquid', 'Dynamic Form']
    },
    {
      id: 'puflica',
      title: t('artwork5Title'),
      description: t('artwork5Description'),
      image: "/images/puf.jpeg",
      link: "https://puflica.vercel.app/",
      year: '2024',
      team: '4ZIGEN',
      keywords: ['Interactive', 'Sound', 'Playful Design']
    },
    {
      id: 'nozoko',
      title: t('artwork6Title'),
      description: t('artwork6Description'),
      image: "/images/nozo.jpeg",
      link: "https://nozoko.vercel.app/",
      year: '2024',
      team: '4ZIGEN',
      keywords: ['Aroma', 'Heat Control', 'Sensory Experience']
    },
    {
      id: 'protozoa',
      title: t('artwork7Title'),
      description: t('artwork7Description'),
      image: "/images/Protozoa.png",
      link: "https://protozoahp.vercel.app/",
      year: '2025',
      team: '4ZIGEN',
      keywords: ['Biomimetic', 'Touch', 'Responsive Technology']
    },
    {
      id: 'edge-of-bubbles',
      title: t('artwork8Title'),
      description: t('artwork8Description'),
      image: "/images/eob.png",
      link: "https://keigo1110.github.io/edgeofbubbles/",
      year: '2024',
      team: '4ZIGEN',
      keywords: ['Transformation', 'Liquid', 'Dynamic Form']
    },
    {
      id: 'rkmt-archive',
      title: t('artwork9Title'),
      description: t('artwork9Description'),
      image: "/images/rkmt-archive.png",
      link: "https://lab.rekimoto.org/2026/02/28/rekimoto-lab-research-archive-2007-2026/",
      year: '2026',
      team: t('artwork9Team'),
      keywords: ['Research', 'Book']
    }
  ], [t])

  const filteredArtworks = artworks

  const navigateArtwork = useCallback((direction: 'prev' | 'next') => {
    if (selectedArtwork === null) return
    const currentIndex = selectedArtwork
    let newIndex: number
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredArtworks.length - 1
    } else {
      newIndex = currentIndex < filteredArtworks.length - 1 ? currentIndex + 1 : 0
    }
    setSelectedArtwork(newIndex)
  }, [selectedArtwork, filteredArtworks.length])

  useEffect(() => {
    if (!isAutoPlay || selectedArtwork === null) return
    const interval = setInterval(() => {
      navigateArtwork('next')
    }, 4000)
    return () => clearInterval(interval)
  }, [isAutoPlay, selectedArtwork, navigateArtwork])

  useEffect(() => {
    if (selectedArtwork === null) return
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); navigateArtwork('prev') }
      else if (e.key === 'ArrowRight') { e.preventDefault(); navigateArtwork('next') }
      else if (e.key === 'Escape') { e.preventDefault(); setSelectedArtwork(null) }
      else if (e.key === ' ') { e.preventDefault(); setIsAutoPlay(!isAutoPlay) }
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [selectedArtwork, navigateArtwork, isAutoPlay])

  useEffect(() => {
    if (selectedArtwork === null) return
    const preloadImages = () => {
      const totalLength = filteredArtworks.length
      const prevIndex = selectedArtwork > 0 ? selectedArtwork - 1 : totalLength - 1
      const nextIndex = selectedArtwork < totalLength - 1 ? selectedArtwork + 1 : 0 as number
      ;[prevIndex, nextIndex].forEach((index: number) => {
        const artwork = filteredArtworks[index]
        if (artwork?.image) {
          const img = new window.Image()
          img.src = artwork.image
        }
      })
    }
    preloadImages()
  }, [selectedArtwork, filteredArtworks])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  return (
    <section id="artwork" className="world-play relative py-24 md:py-32 lg:py-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 md:mb-16"
        >
          <p className={`mb-2 text-xs font-medium tracking-[0.18em] uppercase ${
            isDark ? 'text-[#9A958C]' : 'text-[#7A756C]'
          }`}>
            Making
          </p>
          <h2 className={`text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl ${
            isDark ? 'text-[#F2EFE9]' : 'text-[#1C1916]'
          }`}>
            {t('artwork')}
          </h2>
        </motion.div>

        {/* View Mode Toggle */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12 flex justify-start"
        >
          <div className={`flex rounded-lg p-1 ${
            isDark ? 'bg-[#161412]' : 'bg-[#EFE9E0]'
          }`}>
            {[
              { mode: 'minimal' as ViewMode, icon: Maximize2, label: 'Minimal view' },
              { mode: 'grid' as ViewMode, icon: Grid3X3, label: 'Grid view' },
              { mode: 'masonry' as ViewMode, icon: LayoutGrid, label: 'Masonry view' },
            ].map(({ mode, icon: Icon, label }) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`rounded-md p-2.5 transition-all duration-300 ${
                  viewMode === mode
                    ? isDark
                      ? 'bg-[#B8A04A]/20 text-[#D4C07A]'
                      : 'bg-[#8A7428]/12 text-[#8A7428]'
                    : isDark
                      ? 'text-[#9A958C] hover:text-[#F2EFE9]'
                      : 'text-[#7A756C] hover:text-[#1C1916]'
                }`}
                aria-label={label}
              >
                <Icon className="w-4 h-4" />
              </button>
            ))}
          </div>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={`${
            viewMode === 'minimal'
              ? 'space-y-24'
              : viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
              : 'columns-1 md:columns-2 lg:columns-3 gap-8'
          }`}
        >
          {filteredArtworks.map((artwork, index) => (
            <motion.div
              key={artwork.id}
              variants={itemVariants}
              className={`${viewMode === 'masonry' ? 'break-inside-avoid mb-8' : ''}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {viewMode === 'minimal' ? (
                <div className="group">
                  <motion.div
                    className="grid md:grid-cols-2 gap-8 items-center"
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                  >
                    <div className={`${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                      <div
                        className="relative aspect-[4/3] cursor-pointer overflow-hidden rounded-sm"
                        onClick={() => setSelectedArtwork(index)}
                      >
                        <Image
                          src={artwork.image}
                          alt={artwork.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          loading="lazy"
                        />
                        <motion.div
                          className="absolute bottom-5 right-5 flex h-11 w-11 items-center justify-center rounded-full bg-[#F7F4EF]/92 shadow-lg"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: hoveredIndex === index ? 1 : 0, scale: hoveredIndex === index ? 1 : 0.9 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ZoomIn className="h-5 w-5 text-[#1C1916]" />
                        </motion.div>
                      </div>
                    </div>

                    <div className={`${index % 2 === 0 ? 'md:order-2' : 'md:order-1'} space-y-6`}>
                      <div>
                        <p className={`mb-3 text-xs tracking-wide ${
                          isDark ? 'text-[#9A958C]' : 'text-[#7A756C]'
                        }`}>
                          {artwork.year}
                          <span aria-hidden="true" className="mx-2">·</span>
                          {artwork.team}
                        </p>
                        <h3 className={`mb-4 text-3xl font-light ${
                          isDark ? 'text-[#F2EFE9]' : 'text-[#1C1916]'
                        }`}>
                          {artwork.title}
                        </h3>
                        <p className={`text-base leading-relaxed ${
                          isDark ? 'text-[#9A958C]' : 'text-[#7A756C]'
                        }`}>
                          {artwork.description}
                        </p>
                      </div>

                      {artwork.keywords && (
                        <div>
                          <h4 className={`mb-2 text-sm font-medium ${
                            isDark ? 'text-[#F2EFE9]' : 'text-[#1C1916]'
                          }`}>
                            {t('keywords')}
                          </h4>
                          <p className={`text-sm ${isDark ? 'text-[#9A958C]' : 'text-[#7A756C]'}`}>
                            {artwork.keywords.join(' · ')}
                          </p>
                        </div>
                      )}

                      <motion.button
                        onClick={() => setSelectedArtwork(index)}
                        whileHover={{ x: 4 }}
                        className={`inline-flex items-center gap-2 text-sm font-light transition-colors ${
                          isDark ? 'text-[#D4C07A] hover:text-[#B8A04A]' : 'text-[#8A7428] hover:text-[#6F5C1F]'
                        }`}
                      >
                        {t('viewFullDetails')}
                        <ChevronRight className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </motion.div>
                </div>
              ) : (
                <motion.div
                  className="group cursor-pointer"
                  onClick={() => setSelectedArtwork(index)}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`relative overflow-hidden rounded-sm transition-all duration-500 ${
                    isDark ? 'bg-[#161412]' : 'bg-[#EFE9E0]'
                  }`}>
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={artwork.image}
                        alt={artwork.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      <motion.div
                        className="absolute inset-0 flex flex-col justify-end p-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h3 className="mb-2 text-xl font-light text-white">{artwork.title}</h3>
                        <p className="line-clamp-2 text-sm font-light text-white/80">{artwork.description}</p>
                      </motion.div>
                      <div className={`absolute left-4 top-4 text-xs tracking-wide ${
                        isDark ? 'text-[#F2EFE9]/90' : 'text-white/90'
                      }`}>
                        {artwork.year}
                        <span aria-hidden="true" className="mx-1.5">·</span>
                        {artwork.team}
                      </div>
                    </div>
                    {viewMode === 'grid' && (
                      <div className="p-5">
                        <h3 className={`mb-1 text-lg font-light ${
                          isDark ? 'text-[#F2EFE9]' : 'text-[#1C1916]'
                        }`}>
                          {artwork.title}
                        </h3>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedArtwork !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
              onClick={() => setSelectedArtwork(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-sm"
                onClick={(e) => e.stopPropagation()}
              >
                <div className={`max-h-[90vh] overflow-y-auto ${isDark ? 'bg-[#0C0B0A]' : 'bg-[#F7F4EF]'}`}>
                  <div className={`sticky top-0 z-10 flex items-center justify-between border-b p-6 backdrop-blur-md ${
                    isDark ? 'border-[#2A2724] bg-[#0C0B0A]/90' : 'border-[#E4DFD6] bg-[#F7F4EF]/90'
                  }`}>
                    <div className="flex items-center gap-4">
                      <h3 className={`text-2xl font-light ${isDark ? 'text-[#F2EFE9]' : 'text-[#1C1916]'}`}>
                        {filteredArtworks[selectedArtwork]?.title}
                      </h3>
                      <span className={`text-sm ${isDark ? 'text-[#9A958C]' : 'text-[#7A756C]'}`}>
                        {selectedArtwork + 1} / {filteredArtworks.length}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsAutoPlay(!isAutoPlay)}
                        className={`rounded-full p-2.5 transition-colors ${
                          isAutoPlay
                            ? isDark ? 'bg-[#B8A04A]/25 text-[#D4C07A]' : 'bg-[#8A7428]/15 text-[#8A7428]'
                            : isDark ? 'bg-[#161412] text-[#9A958C] hover:text-[#F2EFE9]' : 'bg-[#EFE9E0] text-[#7A756C] hover:text-[#1C1916]'
                        }`}
                      >
                        {isAutoPlay ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                      </button>
                      <button
                        onClick={() => setSelectedArtwork(null)}
                        className={`rounded-full p-2.5 transition-colors ${
                          isDark ? 'text-[#9A958C] hover:bg-[#161412] hover:text-[#F2EFE9]' : 'text-[#7A756C] hover:bg-[#EFE9E0] hover:text-[#1C1916]'
                        }`}
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>
                  </div>

                  <div className="grid gap-8 p-6 lg:grid-cols-2">
                    <div className="relative">
                      <div className={`relative aspect-[4/3] overflow-hidden rounded-sm ${
                        isDark ? 'bg-[#161412]' : 'bg-[#EFE9E0]'
                      }`}>
                        <Image
                          src={filteredArtworks[selectedArtwork]?.image || ''}
                          alt={filteredArtworks[selectedArtwork]?.title || ''}
                          fill
                          className="object-contain"
                          priority
                        />
                      </div>
                      <button
                        onClick={() => navigateArtwork('prev')}
                        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white transition-colors hover:bg-black/70"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <button
                        onClick={() => navigateArtwork('next')}
                        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white transition-colors hover:bg-black/70"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                    </div>

                    <div className="space-y-8">
                      <div>
                        <h4 className={`mb-4 text-lg font-light ${isDark ? 'text-[#F2EFE9]' : 'text-[#1C1916]'}`}>
                          {t('aboutThisWork')}
                        </h4>
                        <p className={`text-lg font-light leading-relaxed ${isDark ? 'text-[#9A958C]' : 'text-[#7A756C]'}`}>
                          {filteredArtworks[selectedArtwork]?.description}
                        </p>
                      </div>
                      <div>
                        <h5 className={`mb-2 text-sm font-medium ${isDark ? 'text-[#9A958C]' : 'text-[#7A756C]'}`}>{t('year')}</h5>
                        <p className={isDark ? 'text-[#F2EFE9]' : 'text-[#1C1916]'}>
                          {filteredArtworks[selectedArtwork]?.year}
                        </p>
                      </div>
                      <div>
                        <h5 className={`mb-2 text-sm font-medium ${isDark ? 'text-[#9A958C]' : 'text-[#7A756C]'}`}>{t('createdBy')}</h5>
                        <p className={isDark ? 'text-[#F2EFE9]' : 'text-[#1C1916]'}>
                          {filteredArtworks[selectedArtwork]?.team}
                        </p>
                      </div>
                      {filteredArtworks[selectedArtwork]?.keywords && (
                        <div>
                          <h5 className={`mb-3 text-sm font-medium ${isDark ? 'text-[#9A958C]' : 'text-[#7A756C]'}`}>{t('keywords')}</h5>
                          <p className={`text-sm font-light ${isDark ? 'text-[#F2EFE9]' : 'text-[#1C1916]'}`}>
                            {filteredArtworks[selectedArtwork]?.keywords?.join(' · ')}
                          </p>
                        </div>
                      )}
                      {filteredArtworks[selectedArtwork]?.link && (
                        <motion.a
                          href={filteredArtworks[selectedArtwork]?.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          className={`inline-flex items-center gap-3 rounded-lg px-5 py-3 font-light transition-colors ${
                            isDark
                              ? 'bg-[#B8A04A]/18 text-[#D4C07A] hover:bg-[#B8A04A]/28'
                              : 'bg-[#8A7428]/12 text-[#8A7428] hover:bg-[#8A7428]/18'
                          }`}
                        >
                          <ExternalLink className="w-5 h-5" />
                          {t('visitProjectWebsite')}
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
