'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useTranslation } from '../../contexts/TranslationContext'
import { X, ZoomIn } from 'lucide-react'
import { colors } from '../../utils/refined-styles'

interface Artwork {
  title: string
  image: string
  description: string
  details?: string
}

export function RefinedArtworkSection() {
  const { t } = useTranslation()
  const isDark = true // ダークモード固定
  const [selectedArtwork, setSelectedArtwork] = useState<number | null>(null)

  const artworks: Artwork[] = [
    {
      title: t('artwork1Title'),
      image: '/images/geo.jpeg',
      description: t('artwork1Description')
    },
    {
      title: t('artwork2Title'),
      image: '/images/proto.jpeg',
      description: t('artwork2Description')
    },
    {
      title: t('artwork3Title'),
      image: '/images/cotton.jpeg',
      description: t('artwork3Description')
    },
    {
      title: t('artwork4Title'),
      image: '/images/met.jpeg',
      description: t('artwork4Description')
    },
    {
      title: t('artwork5Title'),
      image: '/images/puf.jpeg',
      description: t('artwork5Description')
    },
    {
      title: t('artwork6Title'),
      image: '/images/nozo.jpeg',
      description: t('artwork6Description')
    },
    {
      title: t('artwork7Title'),
      image: '/images/Protozoa.png',
      description: t('artwork7Description')
    }
  ]

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
        duration: 0.5
      }
    }
  }

  return (
    <section id="artwork" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
                    <h2 className={`text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent`}>
            {t('artwork')}
          </h2>
          <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Creative explorations in digital art and interactive experiences
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {artworks.map((artwork, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedArtwork(index)}
              className={`relative cursor-pointer group overflow-hidden rounded-xl ${
                isDark ? 'bg-gray-900/50' : 'bg-white/70'
              } backdrop-blur-sm border ${
                isDark ? 'border-gray-800' : 'border-gray-200'
              } transition-all duration-300`}
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={artwork.image}
                  alt={artwork.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${
                  isDark ? 'from-gray-900' : 'from-white'
                } to-transparent opacity-60 group-hover:opacity-40 transition-opacity`} />

                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className={`p-3 rounded-full ${
                    isDark ? 'bg-white/20' : 'bg-black/20'
                  } backdrop-blur-sm`}>
                    <ZoomIn className={`w-6 h-6 ${isDark ? 'text-white' : 'text-black'}`} />
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className={`text-xl font-semibold mb-2 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {artwork.title}
                </h3>
                <p className={`text-sm ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                } line-clamp-2`}>
                  {artwork.description}
                </p>
              </div>

              {/* Gradient border on hover */}
              <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-${colors.primary[500]} to-${colors.secondary[500]} opacity-0 group-hover:opacity-100 transition-opacity`} />
              <div className={`absolute inset-[1px] rounded-xl ${
                isDark ? 'bg-gray-900' : 'bg-white'
              }`} />
            </motion.div>
          ))}
        </motion.div>

        {/* Lightbox modal */}
        <AnimatePresence>
          {selectedArtwork !== null && artworks[selectedArtwork] && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArtwork(null)}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className={`relative max-w-4xl w-full ${
                  isDark ? 'bg-gray-900' : 'bg-white'
                } rounded-2xl overflow-hidden shadow-2xl`}
              >
                <button
                  onClick={() => setSelectedArtwork(null)}
                  className={`absolute top-4 right-4 z-10 p-2 rounded-full ${
                    isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-black/10 hover:bg-black/20'
                  } transition-colors`}
                >
                  <X className={`w-6 h-6 ${isDark ? 'text-white' : 'text-black'}`} />
                </button>

                <div className="grid md:grid-cols-2">
                  <div className="relative h-64 md:h-full">
                    <Image
                      src={artworks[selectedArtwork].image}
                      alt={artworks[selectedArtwork].title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-8 md:p-12">
                    <h3 className={`text-3xl font-bold mb-4 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {artworks[selectedArtwork].title}
                    </h3>
                    <p className={`text-lg mb-6 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {artworks[selectedArtwork].description}
                    </p>
                    {artworks[selectedArtwork].details && (
                      <p className={`${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {artworks[selectedArtwork].details}
                      </p>
                    )}
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