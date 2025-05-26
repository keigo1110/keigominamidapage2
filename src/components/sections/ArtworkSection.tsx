'use client'

import { motion } from 'framer-motion'
import { useTranslation } from '../../contexts/TranslationContext'
import { useTheme } from '../../contexts/ThemeContext'
import { ArtworkCard } from '../cards/ArtworkCard'

export function ArtworkSection() {
  const { t } = useTranslation();
  const { isDark } = useTheme();

  const artworks = [
    {
      title: t('artwork1Title'),
      description: t('artwork1Description'),
      image: "/images/geo.jpeg",
      link: "https://geohp.vercel.app/"
    },
    {
      title: t('artwork2Title'),
      description: t('artwork2Description'),
      image: "/images/proto.jpeg",
      link: "https://protophysicahp.vercel.app/"
    },
    {
      title: t('artwork3Title'),
      description: t('artwork3Description'),
      image: "/images/cotton.jpeg",
      link: "https://cotton-sketch-pen-hp.vercel.app/"
    },
    {
      title: t('artwork4Title'),
      description: t('artwork4Description'),
      image: "/images/met.jpeg",
      link: "https://metransferhp.vercel.app/"
    },
    {
      title: t('artwork5Title'),
      description: t('artwork5Description'),
      image: "/images/puf.jpeg",
      link: "https://puflicahp.vercel.app/"
    },
    {
      title: t('artwork6Title'),
      description: t('artwork6Description'),
      image: "/images/nozo.jpeg",
      link: "https://nozohp.vercel.app/"
    }
  ];

  return (
    <section id="artwork" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-100/40 via-blue-50/60 to-slate-50/50 dark:from-slate-950/40 dark:via-blue-900/60 dark:to-slate-900/50"></div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          className={`text-5xl font-bold mb-12 text-center bg-gradient-to-r ${isDark ? 'from-blue-400 to-blue-600' : 'from-blue-600 to-blue-800'} bg-clip-text text-transparent`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {t('artwork')}
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, staggerChildren: 0.1 }}
          viewport={{ once: true }}
        >
          {artworks.map((artwork, index) => (
            <ArtworkCard key={index} {...artwork} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}