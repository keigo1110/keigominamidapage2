'use client'

import { motion } from 'framer-motion'
import { useTranslation } from '../../contexts/TranslationContext'
import { useTheme } from '../../contexts/ThemeContext'
import { Rocket, Target, Users, TrendingUp, ExternalLink } from 'lucide-react'
import { colors } from '../../utils/refined-styles'

interface Startup {
  name: string
  logo?: string
  description: string
  mission?: string
  achievements: string[]
  link?: string
}

export function RefinedStartupSection() {
  const { t } = useTranslation()
  const { isDark } = useTheme()

  const startup: Startup = {
    name: t('Companyname'),
    logo: '/images/startup-logo.png',
    description: t('wakabarDescription'),
    mission: t('startupMissionDescription'),
    achievements: [
      t('achivement1'),
      t('achivement2')
    ],
    link: 'https://wakabar.com'
  }

  const features = [
    {
      icon: Target,
      title: 'Mission',
      description: startup.mission || ''
    },
    {
      icon: Users,
      title: 'Team',
      description: 'Dedicated team of engineers and designers'
    },
    {
      icon: TrendingUp,
      title: 'Growth',
      description: 'Expanding to multiple cities across Japan'
    }
  ]

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
    <section id="startup" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-${colors.primary[500]} to-${colors.secondary[500]} bg-clip-text text-transparent`}>
            {t('startup')}
          </h2>
          <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Building innovative solutions for a safer world
          </p>
        </motion.div>

        {/* Main startup card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={`relative overflow-hidden rounded-2xl ${
            isDark ? 'bg-gray-900/50' : 'bg-white/70'
          } backdrop-blur-sm border ${
            isDark ? 'border-gray-800' : 'border-gray-200'
          } mb-12`}
        >
          {/* Background gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br from-${colors.primary[500]}/5 to-${colors.secondary[500]}/5`} />

          <div className="relative p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Logo/Icon */}
              <div className="flex-shrink-0">
                <div className={`w-24 h-24 rounded-2xl bg-gradient-to-r from-${colors.primary[500]} to-${colors.secondary[500]} p-0.5`}>
                  <div className={`w-full h-full rounded-2xl ${
                    isDark ? 'bg-gray-900' : 'bg-white'
                  } flex items-center justify-center`}>
                    <Rocket className="w-12 h-12 text-indigo-500" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-grow text-center md:text-left">
                <h3 className={`text-3xl font-bold mb-2 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {startup.name}
                </h3>
                <p className={`text-lg mb-4 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {startup.description}
                </p>
                
                {startup.link && (
                  <motion.a
                    href={startup.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                      isDark 
                        ? 'bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600/30' 
                        : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                    }`}
                  >
                    <ExternalLink className="w-5 h-5" />
                    Visit Website
                  </motion.a>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Features grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className={`p-6 rounded-xl ${
                  isDark ? 'bg-gray-900/50' : 'bg-white/70'
                } backdrop-blur-sm border ${
                  isDark ? 'border-gray-800' : 'border-gray-200'
                } group transition-all duration-300`}
              >
                <Icon className={`w-8 h-8 mb-4 ${
                  isDark ? 'text-indigo-400' : 'text-indigo-600'
                } group-hover:scale-110 transition-transform`} />
                <h4 className={`text-lg font-semibold mb-2 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {feature.title}
                </h4>
                <p className={`text-sm ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`p-8 rounded-xl ${
            isDark ? 'bg-gray-800/30' : 'bg-gray-50/50'
          } backdrop-blur-sm`}
        >
          <h4 className={`text-xl font-semibold mb-6 text-center ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Key Achievements
          </h4>
          <div className="grid md:grid-cols-2 gap-4">
            {startup.achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className={`flex items-start gap-3 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 bg-gradient-to-r from-${colors.primary[500]} to-${colors.secondary[500]}`} />
                <span>{achievement}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}