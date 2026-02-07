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
    <section id="artwork" className="py-24 md:py-32 lg:py-40 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl md:text-5xl font-semibold mb-6 tracking-tight ${
            isDark ? 'text-[#F5F5F7]' : 'text-[#1D1D1F]'
          }`}>
            {t('artwork')}
          </h2>
          <div className={`w-24 h-0.5 mx-auto mb-6 ${isDark ? 'bg-[#333336]' : 'bg-[#D2D2D7]'}`} />
        </motion.div>

        {/* View Mode Toggle */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className={`flex rounded-full p-1 ${
            isDark ? 'bg-[#1D1D1F]' : 'bg-[#F5F5F7]'
          }`}>
            {[
              { mode: 'minimal' as ViewMode, icon: Maximize2, label: 'Minimal view' },
              { mode: 'grid' as ViewMode, icon: Grid3X3, label: 'Grid view' },
              { mode: 'masonry' as ViewMode, icon: LayoutGrid, label: 'Masonry view' },
            ].map(({ mode, icon: Icon, label }) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`p-2.5 rounded-full transition-all duration-300 ${
                  viewMode === mode
                    ? isDark
                      ? 'bg-[#2997FF] text-white shadow-lg'
                      : 'bg-[#0071E3] text-white shadow-lg'
                    : isDark
                      ? 'text-[#86868B] hover:text-[#F5F5F7]'
                      : 'text-[#86868B] hover:text-[#1D1D1F]'
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
                        className="relative aspect-[4/3] overflow-hidden rounded-2xl cursor-pointer"
                        onClick={() => setSelectedArtwork(index)}
                      >
                        <Image
                          src={artwork.image}
                          alt={artwork.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          loading="lazy"
                        />
                        <motion.div
                          className="absolute bottom-6 right-6 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: hoveredIndex === index ? 1 : 0, scale: hoveredIndex === index ? 1 : 0.8 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ZoomIn className="w-5 h-5 text-[#1D1D1F]" />
                        </motion.div>
                      </div>
                    </div>

                    <div className={`${index % 2 === 0 ? 'md:order-2' : 'md:order-1'} space-y-6`}>
                      <div>
                        <div className="flex gap-2 mb-4">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-light ${
                            isDark ? 'bg-[#1D1D1F] text-[#86868B]' : 'bg-[#F5F5F7] text-[#86868B]'
                          }`}>
                            {artwork.year}
                          </span>
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-light ${
                            isDark ? 'bg-[#1D1D1F] text-[#86868B]' : 'bg-[#F5F5F7] text-[#86868B]'
                          }`}>
                            {artwork.team}
                          </span>
                        </div>
                        <h3 className={`text-3xl font-light mb-4 ${
                          isDark ? 'text-[#F5F5F7]' : 'text-[#1D1D1F]'
                        }`}>
                          {artwork.title}
                        </h3>
                        <p className="text-base leading-relaxed text-[#86868B]">
                          {artwork.description}
                        </p>
                      </div>

                      {artwork.keywords && (
                        <div>
                          <h4 className={`text-sm font-medium mb-2 ${
                            isDark ? 'text-[#F5F5F7]' : 'text-[#1D1D1F]'
                          }`}>
                            {t('keywords')}
                          </h4>
                          <p className="text-sm text-[#86868B]">
                            {artwork.keywords.join(' · ')}
                          </p>
                        </div>
                      )}

                      <motion.button
                        onClick={() => setSelectedArtwork(index)}
                        whileHover={{ x: 5 }}
                        className={`inline-flex items-center gap-2 text-sm font-light transition-colors ${
                          isDark ? 'text-[#2997FF] hover:text-[#2997FF]/80' : 'text-[#0071E3] hover:text-[#0071E3]/80'
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
                  <div className={`relative overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition-all duration-500 ${
                    isDark ? 'bg-[#1D1D1F]' : 'bg-[#F5F5F7]'
                  }`}>
                    <div className="relative overflow-hidden aspect-[4/3]">
                      <Image
                        src={artwork.image}
                        alt={artwork.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <motion.div
                        className="absolute inset-0 flex flex-col justify-end p-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h3 className="text-white text-xl font-light mb-2">{artwork.title}</h3>
                        <p className="text-white/80 text-sm font-light line-clamp-2">{artwork.description}</p>
                      </motion.div>
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className="px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-xs font-light">
                          {artwork.year}
                        </span>
                        <span className="px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-xs font-light">
                          {artwork.team}
                        </span>
                      </div>
                    </div>
                    {viewMode === 'grid' && (
                      <div className="p-5">
                        <h3 className={`text-lg font-light mb-1 ${
                          isDark ? 'text-[#F5F5F7]' : 'text-[#1D1D1F]'
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
                className="relative max-w-5xl w-full max-h-[90vh] overflow-hidden rounded-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className={`overflow-y-auto max-h-[90vh] ${isDark ? 'bg-[#1D1D1F]' : 'bg-white'}`}>
                  <div className={`sticky top-0 z-10 flex items-center justify-between p-6 border-b backdrop-blur-md ${
                    isDark ? 'border-[#333336] bg-[#1D1D1F]/90' : 'border-[#D2D2D7] bg-white/90'
                  }`}>
                    <div className="flex items-center gap-4">
                      <h3 className={`text-2xl font-light ${isDark ? 'text-[#F5F5F7]' : 'text-[#1D1D1F]'}`}>
                        {filteredArtworks[selectedArtwork]?.title}
                      </h3>
                      <span className="text-sm text-[#86868B]">
                        {selectedArtwork + 1} / {filteredArtworks.length}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsAutoPlay(!isAutoPlay)}
                        className={`p-2.5 rounded-full transition-colors ${
                          isAutoPlay
                            ? isDark ? 'bg-[#2997FF] text-white' : 'bg-[#0071E3] text-white'
                            : isDark ? 'bg-[#2C2C2E] text-[#86868B] hover:text-[#F5F5F7]' : 'bg-[#F5F5F7] text-[#86868B] hover:text-[#1D1D1F]'
                        }`}
                      >
                        {isAutoPlay ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                      </button>
                      <button
                        onClick={() => setSelectedArtwork(null)}
                        className={`p-2.5 rounded-full transition-colors ${
                          isDark ? 'text-[#86868B] hover:text-[#F5F5F7] hover:bg-[#2C2C2E]' : 'text-[#86868B] hover:text-[#1D1D1F] hover:bg-[#F5F5F7]'
                        }`}
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-8 p-6">
                    <div className="relative">
                      <div className={`aspect-[4/3] relative overflow-hidden rounded-xl ${
                        isDark ? 'bg-[#2C2C2E]' : 'bg-[#F5F5F7]'
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
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <button
                        onClick={() => navigateArtwork('next')}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                    </div>

                    <div className="space-y-8">
                      <div>
                        <h4 className={`text-lg font-light mb-4 ${isDark ? 'text-[#F5F5F7]' : 'text-[#1D1D1F]'}`}>
                          {t('aboutThisWork')}
                        </h4>
                        <p className="text-[#86868B] leading-relaxed text-lg font-light">
                          {filteredArtworks[selectedArtwork]?.description}
                        </p>
                      </div>
                      <div>
                        <h5 className="font-medium mb-2 text-sm text-[#86868B]">{t('year')}</h5>
                        <p className={isDark ? 'text-[#F5F5F7]' : 'text-[#1D1D1F]'}>
                          {filteredArtworks[selectedArtwork]?.year}
                        </p>
                      </div>
                      <div>
                        <h5 className="font-medium mb-2 text-sm text-[#86868B]">{t('createdBy')}</h5>
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
                          isDark ? 'bg-[#2C2C2E] text-[#F5F5F7]' : 'bg-[#F5F5F7] text-[#1D1D1F]'
                        }`}>
                          <span className="font-medium">{filteredArtworks[selectedArtwork]?.team}</span>
                        </div>
                      </div>
                      {filteredArtworks[selectedArtwork]?.keywords && (
                        <div>
                          <h5 className="font-medium mb-3 text-sm text-[#86868B]">{t('keywords')}</h5>
                          <div className="flex flex-wrap gap-2">
                            {filteredArtworks[selectedArtwork]?.keywords?.map((keyword: string, idx: number) => (
                              <span
                                key={idx}
                                className={`px-4 py-2 rounded-full text-sm font-light ${
                                  isDark ? 'bg-[#2C2C2E] text-[#F5F5F7]' : 'bg-[#F5F5F7] text-[#1D1D1F]'
                                }`}
                              >
                                {keyword}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {filteredArtworks[selectedArtwork]?.link && (
                        <motion.a
                          href={filteredArtworks[selectedArtwork]?.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`inline-flex items-center gap-3 px-6 py-3 rounded-full font-light transition-colors ${
                            isDark
                              ? 'bg-[#2997FF] text-white hover:bg-[#2997FF]/90'
                              : 'bg-[#0071E3] text-white hover:bg-[#0071E3]/90'
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
