'use client'

import { motion } from 'framer-motion'
import { useTranslation } from '../../contexts/TranslationContext'
import { useTheme } from '../../contexts/ThemeContext'
import { Trophy, Award, Star, Calendar } from 'lucide-react'
import { colors } from '../../utils/refined-styles'

interface AwardItem {
  title: string
  date: string
  type: 'academic' | 'competition' | 'professional'
}

export function RefinedAwardsSection() {
  const { t } = useTranslation()
  const { isDark } = useTheme()

  const awards: AwardItem[] = [
    {
      title: t('award1'),
      date: 'March 2024',
      type: 'academic'
    },
    {
      title: t('award2'),
      date: 'March 2024',
      type: 'academic'
    },
    {
      title: `${t('award3no1')} ${t('award3no2')} ${t('award3no3')}`,
      date: 'November 2022',
      type: 'professional'
    },
    {
      title: `${t('award4no1')} ${t('award4no2')}${t('award4no3')}${t('award4no4')}`,
      date: 'December 2024',
      type: 'competition'
    }
  ]

  const getAwardIcon = (type: AwardItem['type']) => {
    switch (type) {
      case 'academic':
        return Award
      case 'competition':
        return Trophy
      case 'professional':
        return Star
    }
  }

  const getAwardGradient = (type: AwardItem['type']) => {
    switch (type) {
      case 'academic':
        return isDark ? 'from-blue-600 to-cyan-600' : 'from-blue-500 to-cyan-500'
      case 'competition':
        return isDark ? 'from-amber-600 to-orange-600' : 'from-amber-500 to-orange-500'
      case 'professional':
        return isDark ? 'from-purple-600 to-pink-600' : 'from-purple-500 to-pink-500'
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  const stats = [
    { label: 'Total Awards', value: awards.length },
    { label: 'Academic', value: awards.filter(a => a.type === 'academic').length },
    { label: 'Competition', value: awards.filter(a => a.type === 'competition').length },
  ]

  return (
    <section id="awards" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-${colors.primary[500]} to-${colors.secondary[500]} bg-clip-text text-transparent`}>
            {t('awards')}
          </h2>
          <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Recognition for excellence in academics, research, and innovation
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-3 gap-4 mb-12"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`text-center p-6 rounded-xl ${
                isDark ? 'bg-gray-900/50' : 'bg-white/70'
              } backdrop-blur-sm border ${
                isDark ? 'border-gray-800' : 'border-gray-200'
              }`}
            >
              <div className={`text-3xl font-bold mb-2 bg-gradient-to-r from-${colors.primary[500]} to-${colors.secondary[500]} bg-clip-text text-transparent`}>
                {stat.value}
              </div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Awards List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-4"
        >
          {awards.map((award, index) => {
            const Icon = getAwardIcon(award.type)
            const gradient = getAwardGradient(award.type)
            
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className={`group relative overflow-hidden rounded-xl ${
                  isDark ? 'bg-gray-900/50' : 'bg-white/70'
                } backdrop-blur-sm border ${
                  isDark ? 'border-gray-800' : 'border-gray-200'
                } transition-all duration-300`}
              >
                {/* Gradient accent */}
                <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${gradient}`} />
                
                <div className="p-6 pl-8 flex items-start gap-6">
                  {/* Icon */}
                  <div className={`flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-r ${gradient} p-0.5`}>
                    <div className={`w-full h-full rounded-lg ${
                      isDark ? 'bg-gray-900' : 'bg-white'
                    } flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 text-transparent bg-gradient-to-r ${gradient} bg-clip-text`} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-grow">
                    <h3 className={`text-lg font-semibold mb-2 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    } group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${gradient} transition-all duration-300`}>
                      {award.title}
                    </h3>
                    
                    <div className="flex items-center gap-4 text-sm">
                      <div className={`flex items-center gap-2 ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        <Calendar className="w-4 h-4" />
                        {award.date}
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        isDark ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {award.type.charAt(0).toUpperCase() + award.type.slice(1)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}