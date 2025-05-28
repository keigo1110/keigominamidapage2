'use client'

import { motion, useTransform, useScroll, useSpring } from 'framer-motion'
import { useTranslation } from '../../contexts/TranslationContext'
import { useTheme } from '../../contexts/ThemeContext'
import { useState, useRef, useEffect } from 'react'
import {
  ArrowRight,
  Globe,
  ChevronDown,
  Play
} from 'lucide-react'
import Image from 'next/image'

export function StartupSection() {
  const { t } = useTranslation()
  const { isDark } = useTheme()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [activeFeature, setActiveFeature] = useState<number | null>(null)
  const containerRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const cardY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"])
  const springCardY = useSpring(cardY, { stiffness: 100, damping: 30 })

  // Mouse movement effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width
        const y = (e.clientY - rect.top) / rect.height
        setMousePosition({ x, y })
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('mousemove', handleMouseMove)
      return () => container.removeEventListener('mousemove', handleMouseMove)
    }

    return () => {}
  }, [])

  const features = [
    {
      title: 'IoT Security',
      description: 'Advanced IoT solutions for bicycle safety monitoring and real-time threat detection',
      stats: '99.9% Uptime'
    },
    {
      title: 'Data Analytics',
      description: 'Machine learning-powered analytics for traffic patterns and safety optimization',
      stats: '10M+ Data Points'
    },
    {
      title: 'Community',
      description: 'Building connected cycling communities with shared safety intelligence',
      stats: '50K+ Users'
    },
    {
      title: 'Innovation',
      description: 'Cutting-edge technology combining AI, IoT, and mobile platforms',
      stats: '5 Patents'
    }
  ]

  const achievements = [
    {
      number: '3+',
      label: 'Municipal Partnerships',
      description: 'Active collaborations with city governments'
    },
    {
      number: '1000+',
      label: 'Active Users',
      description: 'Daily active cyclists using our platform'
    },
    {
      number: '95%',
      label: 'Safety Improvement',
      description: 'Reduction in cycling incidents'
    }
  ]

  const keyItems = [
    {
      title: t('achivement1'),
      description: 'Strategic partnerships with municipal governments'
    },
    {
      title: t('achivement2'),
      description: 'Real-world testing with live user feedback'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  const floatingVariants = {
    initial: { y: 0, rotate: 0 },
    animate: {
      y: [-10, 10, -10],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  const pulseVariants = {
    initial: { scale: 1, opacity: 0.7 },
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <section
      ref={containerRef}
      id="startup"
      className="relative py-32 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Refined Dynamic Background */}
      <div className="absolute inset-0">
        {/* Base gradient with parallax */}
        <motion.div
          style={{ y: backgroundY }}
          className={`absolute inset-0 bg-gradient-to-br ${
            isDark
              ? 'from-slate-900 via-blue-950/50 to-purple-950/30'
              : 'from-blue-50/80 via-cyan-50/60 to-emerald-50/40'
          }`}
        />

        {/* Subtle interactive glow effect */}
        <motion.div
          variants={pulseVariants}
          initial="initial"
          animate="animate"
          className={`absolute w-96 h-96 rounded-full blur-3xl transition-all duration-1000 ${
            isDark ? 'bg-cyan-500/5' : 'bg-cyan-400/8'
          }`}
          style={{
            left: `${mousePosition.x * 100}%`,
            top: `${mousePosition.y * 100}%`,
            transform: 'translate(-50%, -50%)',
            scale: isHovered ? 1.2 : 1
          }}
        />

        {/* Minimal floating elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              variants={floatingVariants}
              initial="initial"
              animate="animate"
              transition={{ delay: i * 1.2 }}
              className={`absolute w-1 h-1 rounded-full ${
                isDark ? 'bg-cyan-400/15' : 'bg-cyan-500/20'
              }`}
              style={{
                left: `${15 + (i * 15)}%`,
                top: `${20 + (i * 12)}%`,
              }}
            />
          ))}
        </div>

        {/* Minimal geometric patterns */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(2)].map((_, i) => (
            <motion.div
              key={`geo-${i}`}
              className={`absolute w-48 h-48 border ${
                isDark ? 'border-cyan-400/5' : 'border-cyan-500/8'
              } rounded-full`}
              style={{
                left: `${30 + (i * 40)}%`,
                top: `${25 + (i * 20)}%`,
              }}
              animate={{
                rotate: [0, 360],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 25 + i * 10,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        {/* Clean Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className={`text-5xl md:text-7xl font-light mb-6 tracking-tight ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            <motion.span
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent"
            >
              {t('startup')}
            </motion.span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={`text-xl font-light ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            } max-w-2xl mx-auto leading-relaxed`}
          >
            {t('startupMissionDescription')}
          </motion.p>

          {/* Minimal scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
            className="mt-8"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className={`inline-flex items-center gap-2 ${
                isDark ? 'text-gray-500' : 'text-gray-400'
              }`}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8"
        >
          {/* Company & Mission Section */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Company Card */}
            <motion.div
              variants={itemVariants}
              style={{ y: springCardY }}
              className="lg:col-span-2"
            >
              <motion.div
                whileHover={{ y: -8, scale: 1.01 }}
                className={`relative overflow-hidden rounded-3xl ${
                  isDark
                    ? 'bg-gray-900/40 border-gray-700/30'
                    : 'bg-white/70 border-gray-200/30'
                } backdrop-blur-xl border shadow-xl group`}
              >
                {/* Subtle Card Background Effects */}
                <div className="absolute inset-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/3 via-blue-500/3 to-purple-500/3" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${
                    isDark ? 'from-gray-900/70 to-gray-800/50' : 'from-white/85 to-gray-50/70'
                  }`} />
                </div>

                <div className="relative p-8 md:p-12">
                  {/* Clean Company Header */}
                  <div className="flex flex-col md:flex-row items-start gap-8 mb-12">
                    {/* Company Logo */}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="relative"
                    >
                      <div className={`w-20 h-20 rounded-2xl ${
                        isDark ? 'bg-white/5' : 'bg-white/80'
                      } flex items-center justify-center shadow-lg overflow-hidden backdrop-blur-sm border ${
                        isDark ? 'border-gray-700/30' : 'border-gray-200/30'
                      }`}>
                        <Image
                          src="/images/wakabar.png"
                          alt="Wakabar Logo"
                          width={56}
                          height={56}
                          className="object-contain"
                        />
                      </div>
                    </motion.div>

                    <div className="flex-1">
                      <h3 className={`text-3xl md:text-4xl font-light mb-3 tracking-tight ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        {t('Companyname')}
                      </h3>
                      <p className={`text-lg font-light ${
                        isDark ? 'text-gray-300' : 'text-gray-600'
                      } mb-6 leading-relaxed`}>
                        {t('wakabarDescription')}
                      </p>

                      <div className="flex flex-wrap gap-4 mb-6">
                        <motion.a
                          href="https://wakabar-cycle.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.02, x: 2 }}
                          whileTap={{ scale: 0.98 }}
                          className={`inline-flex items-center gap-2 px-8 py-3 rounded-xl ${
                            isDark
                              ? 'bg-cyan-600/90 hover:bg-cyan-600 text-white'
                              : 'bg-cyan-600 hover:bg-cyan-700 text-white'
                          } font-medium shadow-lg transition-all duration-300`}
                        >
                          <Globe className="w-4 h-4" />
                          <span>{t('visitWebsite')}</span>
                          <ArrowRight className="w-3 h-3" />
                        </motion.a>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`inline-flex items-center gap-2 px-8 py-3 rounded-xl ${
                            isDark
                              ? 'bg-gray-800/60 hover:bg-gray-800/80 text-gray-300'
                              : 'bg-gray-100/80 hover:bg-gray-200/80 text-gray-600'
                          } font-medium transition-all duration-300`}
                        >
                          <Play className="w-3 h-3" />
                          <span>Watch Demo</span>
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  {/* Clean Features Grid */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {features.map((feature, index) => {
                      const isActive = activeFeature === index
                      return (
                        <motion.div
                          key={index}
                          whileHover={{ y: -3 }}
                          onHoverStart={() => setActiveFeature(index)}
                          onHoverEnd={() => setActiveFeature(null)}
                          className={`p-6 rounded-xl ${
                            isDark ? 'bg-gray-800/30' : 'bg-gray-50/60'
                          } backdrop-blur-sm border ${
                            isDark ? 'border-gray-700/30' : 'border-gray-200/30'
                          } transition-all duration-300 ${
                            isActive ? 'shadow-md' : ''
                          }`}
                        >
                          <div className="mb-3">
                            <h4 className={`text-lg font-medium mb-2 ${
                              isDark ? 'text-white' : 'text-gray-900'
                            }`}>
                              {feature.title}
                            </h4>
                            <div className={`w-8 h-0.5 ${
                              isDark ? 'bg-cyan-400/40' : 'bg-cyan-600/40'
                            } rounded-full mb-3`} />
                          </div>
                          <p className={`text-sm ${
                            isDark ? 'text-gray-400' : 'text-gray-600'
                          } mb-3 leading-relaxed font-light`}>
                            {feature.description}
                          </p>
                          <span className={`text-xs font-medium ${
                            isDark ? 'text-cyan-400' : 'text-cyan-600'
                          }`}>
                            {feature.stats}
                          </span>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Mission & Achievements */}
            <motion.div
              variants={itemVariants}
              className="space-y-6"
            >
              {/* Mission Statement */}
              <motion.div
                whileHover={{ y: -3 }}
                className={`p-8 rounded-2xl ${
                  isDark
                    ? 'bg-gray-900/40 border-gray-700/30'
                    : 'bg-white/70 border-gray-200/30'
                } backdrop-blur-xl border`}
              >
                <h3 className={`text-xl font-medium mb-4 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {t('startupMission')}
                </h3>
                <div className={`w-8 h-0.5 ${
                  isDark ? 'bg-purple-400/40' : 'bg-purple-600/40'
                } rounded-full mb-4`} />
                <p className={`font-light ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                } leading-relaxed`}>
                  {t('startupMissionDescription')}
                </p>
              </motion.div>

              {/* Clean Achievements */}
              <motion.div
                whileHover={{ y: -3 }}
                className={`p-8 rounded-2xl ${
                  isDark
                    ? 'bg-gray-900/40 border-gray-700/30'
                    : 'bg-white/70 border-gray-200/30'
                } backdrop-blur-xl border`}
              >
                <h4 className={`text-xl font-medium mb-6 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {t('startupAchievements')}
                </h4>
                <div className="space-y-6">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      whileHover={{ x: 3 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className="group"
                    >
                      <div className="flex items-baseline gap-3 mb-2">
                        <span className={`text-3xl font-light ${
                          isDark ? 'text-emerald-400' : 'text-emerald-600'
                        }`}>
                          {achievement.number}
                        </span>
                        <span className={`text-base font-medium ${
                          isDark ? 'text-white' : 'text-gray-900'
                        }`}>
                          {achievement.label}
                        </span>
                      </div>
                      <p className={`text-sm pl-2 ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      } font-light`}>
                        {achievement.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Integrated Key Achievements */}
          <motion.div
            variants={itemVariants}
            className={`p-8 md:p-12 rounded-3xl ${
              isDark
                ? 'bg-gray-900/40 border-gray-700/30'
                : 'bg-white/70 border-gray-200/30'
            } backdrop-blur-xl border shadow-xl`}
          >
            <div className="text-center mb-10">
              <h4 className={`text-2xl font-light tracking-tight ${
                isDark ? 'text-white' : 'text-gray-900'
              } mb-3`}>
                Key Achievements
              </h4>
              <div className={`w-16 h-0.5 ${
                isDark ? 'bg-cyan-400/40' : 'bg-cyan-600/40'
              } rounded-full mx-auto`} />
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {keyItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -2, x: 3 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="group"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-1 h-16 ${
                      isDark ? 'bg-gradient-to-b from-cyan-400/60 to-cyan-400/20' : 'bg-gradient-to-b from-cyan-600/60 to-cyan-600/20'
                    } rounded-full mt-1 flex-shrink-0`} />
                    <div className="flex-1">
                      <h5 className={`font-medium mb-2 ${
                        isDark ? 'text-gray-200 group-hover:text-white' : 'text-gray-800 group-hover:text-gray-900'
                      } transition-colors`}>
                        {item.title}
                      </h5>
                      <p className={`text-sm font-light leading-relaxed ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}