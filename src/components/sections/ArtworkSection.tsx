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
  materials?: string[]
  dimensions?: string
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
      materials: ['Sand', 'Sensors', 'Audio System'],
      dimensions: '120cm × 80cm × 15cm'
    },
    {
      id: 'protophysica',
      title: t('artwork2Title'),
      description: t('artwork2Description'),
      image: "/images/proto.jpeg",
      link: "https://protophysicahp.vercel.app/",
      year: '2024',
      materials: ['Supercapacitors', 'Electronics', 'Mixed Media'],
      dimensions: 'Variable'
    },
    {
      id: 'cotton-sketch-pen',
      title: t('artwork3Title'),
      description: t('artwork3Description'),
      image: "/images/cotton.jpeg",
      link: "https://cotton-sketch-pen-hp.vercel.app/",
      year: '2024',
      materials: ['Plastic Cotton', 'Electronics'],
      dimensions: '15cm × 3cm × 3cm'
    },
    {
      id: 'metransfer',
      title: t('artwork4Title'),
      description: t('artwork4Description'),
      image: "/images/met.jpeg",
      link: "https://metransfer.vercel.app/",
      year: '2024',
      materials: ['Liquid Materials', 'Foam', 'Transformation System'],
      dimensions: '200cm × 150cm × 100cm'
    },
    {
      id: 'puflica',
      title: t('artwork5Title'),
      description: t('artwork5Description'),
      image: "/images/puf.jpeg",
      link: "https://puflica.vercel.app/",
      year: '2024',
      materials: ['Interactive Elements', 'Sound System'],
      dimensions: '80cm × 60cm × 40cm'
    },
    {
      id: 'nozoko',
      title: t('artwork6Title'),
      description: t('artwork6Description'),
      image: "/images/nozo.jpeg",
      link: "https://nozoko.vercel.app/",
      year: '2024',
      materials: ['Heat Control System', 'Aromatics'],
      dimensions: '25cm × 25cm × 15cm'
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

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlay || selectedArtwork === null) return

    const interval = setInterval(() => {
      navigateArtwork('next')
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlay, selectedArtwork, navigateArtwork])

  // Keyboard navigation
  useEffect(() => {
    if (selectedArtwork === null) return

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        navigateArtwork('prev')
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        navigateArtwork('next')
      } else if (e.key === 'Escape') {
        e.preventDefault()
        setSelectedArtwork(null)
      } else if (e.key === ' ') {
        e.preventDefault()
        setIsAutoPlay(!isAutoPlay)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [selectedArtwork, navigateArtwork, isAutoPlay])

  // Preload adjacent images for smooth navigation
  useEffect(() => {
    if (selectedArtwork === null) return

    const preloadImages = () => {
      const totalLength = filteredArtworks.length
      const prevIndex = selectedArtwork > 0 ? selectedArtwork - 1 : totalLength - 1
      const nextIndex = selectedArtwork < totalLength - 1 ? selectedArtwork + 1 : 0 as number

      [prevIndex, nextIndex].forEach((index: number) => {
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
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  }

  return (
    <section id="artwork" className="py-16 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl md:text-5xl font-light mb-6 tracking-tight ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {t('artwork')}
          </h2>
          <div className="w-24 h-0.5 bg-blue-600 mx-auto mb-6" />
          <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'} max-w-3xl mx-auto leading-relaxed font-light`}>
            Exploring the intersection of technology and art through interactive installations
          </p>
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
            isDark ? 'bg-gray-800/50' : 'bg-gray-100'
          } backdrop-blur-sm`}>
            <button
              onClick={() => setViewMode('minimal')}
              className={`p-2.5 rounded-full transition-all duration-300 ${
                viewMode === 'minimal'
                  ? `bg-black text-white ${isDark ? 'shadow-lg shadow-white/10' : ''}`
                  : `${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`
              }`}
              aria-label="Minimal view"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2.5 rounded-full transition-all duration-300 ${
                viewMode === 'grid'
                  ? `bg-black text-white ${isDark ? 'shadow-lg shadow-white/10' : ''}`
                  : `${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`
              }`}
              aria-label="Grid view"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('masonry')}
              className={`p-2.5 rounded-full transition-all duration-300 ${
                viewMode === 'masonry'
                  ? `bg-black text-white ${isDark ? 'shadow-lg shadow-white/10' : ''}`
                  : `${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`
              }`}
              aria-label="Masonry view"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
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
                // Minimal View - Large, elegant presentation
                <div className="group">
                  <motion.div
                    className="grid md:grid-cols-2 gap-8 items-center"
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                  >
                    {/* Image */}
                    <div className={`${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                      <div
                        className="relative aspect-[4/3] overflow-hidden rounded-lg cursor-pointer"
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
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Zoom Icon */}
                        <motion.div
                          className="absolute bottom-6 right-6 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: hoveredIndex === index ? 1 : 0, scale: hoveredIndex === index ? 1 : 0.8 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ZoomIn className="w-5 h-5 text-gray-900" />
                        </motion.div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className={`${index % 2 === 0 ? 'md:order-2' : 'md:order-1'} space-y-6`}>
                      <div>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-light mb-4 ${
                          isDark ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {artwork.year}
                        </span>
                        <h3 className={`text-3xl font-light mb-4 ${
                          isDark ? 'text-white' : 'text-gray-900'
                        }`}>
                          {artwork.title}
                        </h3>
                        <p className={`text-base leading-relaxed ${
                          isDark ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {artwork.description}
                        </p>
                      </div>

                      {artwork.materials && (
                        <div>
                          <h4 className={`text-sm font-medium mb-2 ${
                            isDark ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            Materials
                          </h4>
                          <p className={`text-sm ${
                            isDark ? 'text-gray-500' : 'text-gray-500'
                          }`}>
                            {artwork.materials.join(' • ')}
                          </p>
                        </div>
                      )}

                      <motion.button
                        onClick={() => setSelectedArtwork(index)}
                        whileHover={{ x: 5 }}
                        className={`inline-flex items-center gap-2 text-sm font-light ${
                          isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                        } transition-colors`}
                      >
                        View Full Details
                        <ChevronRight className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </motion.div>
                </div>
              ) : (
                // Grid/Masonry View - Compact cards
                <motion.div
                  className="group cursor-pointer"
                  onClick={() => setSelectedArtwork(index)}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`relative overflow-hidden rounded-lg ${
                    isDark ? 'bg-gray-900/50' : 'bg-white'
                  } shadow-md hover:shadow-2xl transition-all duration-500`}>
                    {/* Image Container */}
                    <div className={`relative ${
                      viewMode === 'grid' ? 'aspect-[4/3]' : 'aspect-auto'
                    } overflow-hidden`}>
                      <Image
                        src={artwork.image}
                        alt={artwork.title}
                        fill={viewMode === 'grid'}
                        width={viewMode === 'masonry' ? 400 : undefined}
                        height={viewMode === 'masonry' ? 300 : undefined}
                        className={`${
                          viewMode === 'grid' ? 'object-cover' : 'w-full h-auto'
                        } transition-transform duration-700 group-hover:scale-110`}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        loading="lazy"
                      />

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Hover Content */}
                      <motion.div
                        className="absolute inset-0 flex flex-col justify-end p-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h3 className="text-white text-xl font-light mb-2">
                          {artwork.title}
                        </h3>
                        <p className="text-white/80 text-sm font-light line-clamp-2">
                          {artwork.description}
                        </p>
                        <div className="flex items-center gap-2 mt-4 text-white/90">
                          <span className="text-xs">View Details</span>
                          <ChevronRight className="w-3 h-3" />
                        </div>
                      </motion.div>

                      {/* Minimal Labels */}
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className="px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-xs font-light">
                          {artwork.year}
                        </span>
                      </div>
                    </div>

                    {/* Minimal Content (for non-hover state) */}
                    {viewMode === 'grid' && (
                      <div className="p-5">
                        <h3 className={`text-lg font-light mb-1 ${
                          isDark ? 'text-white' : 'text-gray-900'
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
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
              onClick={() => setSelectedArtwork(null)}
            >
              {/* Modal Content */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative max-w-5xl w-full max-h-[90vh] overflow-hidden rounded-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className={`${isDark ? 'bg-gray-900' : 'bg-white'} overflow-y-auto max-h-[90vh]`}>
                  {/* Header */}
                  <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 backdrop-blur-md bg-white/90 dark:bg-gray-900/90">
                    <div className="flex items-center gap-4">
                      <h3 className={`text-2xl font-light ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {filteredArtworks[selectedArtwork]?.title}
                      </h3>
                      <span className="text-sm text-gray-500">
                        {selectedArtwork + 1} / {filteredArtworks.length}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Auto-play Toggle */}
                      <button
                        onClick={() => setIsAutoPlay(!isAutoPlay)}
                        className={`p-2.5 rounded-full transition-colors ${
                          isAutoPlay
                            ? 'bg-black text-white'
                            : isDark ? 'bg-gray-800 text-gray-400 hover:text-white' : 'bg-gray-100 text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        {isAutoPlay ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                      </button>

                      {/* Close Button */}
                      <button
                        onClick={() => setSelectedArtwork(null)}
                        className={`p-2.5 rounded-full transition-colors ${
                          isDark ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                        }`}
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-8 p-6">
                    {/* Image */}
                    <div className="relative">
                      <div className="aspect-[4/3] relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                        <Image
                          src={filteredArtworks[selectedArtwork]?.image || ''}
                          alt={filteredArtworks[selectedArtwork]?.title || ''}
                          fill
                          className="object-contain"
                          priority
                        />
                      </div>

                      {/* Navigation Arrows */}
                      <button
                        onClick={() => navigateArtwork('prev')}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors backdrop-blur-sm"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <button
                        onClick={() => navigateArtwork('next')}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors backdrop-blur-sm"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                    </div>

                    {/* Details */}
                    <div className="space-y-8">
                      <div>
                        <h4 className={`text-lg font-light mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          About this work
                        </h4>
                        <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} leading-relaxed text-lg font-light`}>
                          {filteredArtworks[selectedArtwork]?.description}
                        </p>
                      </div>

                      {/* Year */}
                      <div>
                        <h5 className={`font-medium mb-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          Year
                        </h5>
                        <p className={`${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {filteredArtworks[selectedArtwork]?.year}
                        </p>
                      </div>

                      {filteredArtworks[selectedArtwork]?.materials && (
                        <div>
                          <h5 className={`font-medium mb-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Materials & Media
                          </h5>
                          <div className="flex flex-wrap gap-2">
                            {filteredArtworks[selectedArtwork]?.materials?.map((material, idx) => (
                              <span
                                key={idx}
                                className={`px-4 py-2 rounded-full text-sm font-light ${
                                  isDark ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'
                                }`}
                              >
                                {material}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {filteredArtworks[selectedArtwork]?.dimensions && (
                        <div>
                          <h5 className={`font-medium mb-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Dimensions
                          </h5>
                          <p className={`${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {filteredArtworks[selectedArtwork]?.dimensions}
                          </p>
                        </div>
                      )}

                      {/* Project Link */}
                      {filteredArtworks[selectedArtwork]?.link && (
                        <motion.a
                          href={filteredArtworks[selectedArtwork]?.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="inline-flex items-center gap-3 px-6 py-3 bg-black text-white rounded-full font-light hover:bg-gray-900 transition-colors"
                        >
                          <ExternalLink className="w-5 h-5" />
                          Visit Project Website
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