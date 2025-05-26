'use client'

import { motion } from 'framer-motion'
import { useTheme } from '../../contexts/ThemeContext'
import { useTranslation } from '../../contexts/TranslationContext'
import { Mail, Github, Twitter, Linkedin, Globe, Calendar, MapPin } from 'lucide-react'
import Image from 'next/image'
import { colors } from '../../utils/refined-styles'

export function RefinedHomeSection() {
  const { isDark } = useTheme()
  const { t } = useTranslation()

  const socialLinks = [
    { icon: Mail, href: 'mailto:keigo.minamida@gmail.com', label: 'Email' },
    { icon: Github, href: 'https://github.com/keigo9', label: 'GitHub' },
    { icon: Twitter, href: 'https://twitter.com/coaKuGa9', label: 'Twitter' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/keigo-minamida-69a1301a8', label: 'LinkedIn' },
  ]

  const interests = [
    'Web Development',
    'Machine Learning',
    'Computer Vision',
    'Robotics',
    'Open Source',
    'Technology'
  ]

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto text-center"
      >
        {/* Profile Image */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <div className="relative inline-block">
            <div className={`absolute inset-0 bg-gradient-to-r from-${colors.primary[500]} to-${colors.secondary[500]} rounded-full blur-2xl opacity-20`} />
            <Image
              src="/images/myface.jpg"
              alt={t('profileAlt')}
              width={180}
              height={180}
              className="rounded-full relative z-10 border-4 border-white/10"
              priority
            />
          </div>
        </motion.div>

        {/* Name and Title */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className={`text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-${colors.primary[500]} to-${colors.secondary[500]} bg-clip-text text-transparent`}
        >
          {t('name')}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className={`text-xl md:text-2xl mb-8 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
        >
          {t('statement')}
        </motion.p>

        {/* Education Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className={`flex flex-wrap justify-center gap-6 mb-8 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
        >
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            <span>{t('university')}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{t('location')}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{t('academicYear')}</span>
          </div>
        </motion.div>

        {/* Interests */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-12"
        >
          <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            {t('interests')}
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {interests.map((interest, index) => (
              <motion.span
                key={interest}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                className={`px-4 py-2 rounded-full text-sm font-medium border ${
                  isDark 
                    ? 'bg-gray-800/50 border-gray-700 text-gray-300 hover:bg-gray-700/50' 
                    : 'bg-white/50 border-gray-200 text-gray-700 hover:bg-gray-50'
                } transition-all backdrop-blur-sm`}
              >
                {interest}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex justify-center gap-6"
        >
          {socialLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`p-3 rounded-lg ${
                isDark 
                  ? 'bg-gray-800/50 hover:bg-gray-700/50 text-gray-300' 
                  : 'bg-white/50 hover:bg-gray-50 text-gray-700'
              } transition-all backdrop-blur-sm border ${
                isDark ? 'border-gray-700' : 'border-gray-200'
              }`}
              aria-label={link.label}
            >
              <link.icon className="w-5 h-5" />
            </motion.a>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className={`w-6 h-10 rounded-full border-2 ${
              isDark ? 'border-gray-600' : 'border-gray-400'
            } p-1`}
          >
            <div className={`w-1 h-3 rounded-full mx-auto ${
              isDark ? 'bg-gray-600' : 'bg-gray-400'
            }`} />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}