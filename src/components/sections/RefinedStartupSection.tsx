'use client'

import { motion } from 'framer-motion'
import { useTranslation } from '../../contexts/TranslationContext'
import { useTheme } from '../../contexts/ThemeContext'
import { MapPin, BarChart3, GraduationCap, ExternalLink, Play } from 'lucide-react'
import Image from 'next/image'

export function RefinedStartupSection() {
  const { t } = useTranslation()
  const { isDark } = useTheme()

  const coreFeatures = [
    {
      icon: Play,
      title: t('audioWarningSystem'),
      description: t('audioWarningDescription'),
    },
    {
      icon: MapPin,
      title: t('realtimeTracking'),
      description: t('realtimeTrackingDescription'),
    },
    {
      icon: BarChart3,
      title: t('dataAnalysis'),
      description: t('dataAnalysisDescription'),
    },
    {
      icon: GraduationCap,
      title: t('safetyEducation'),
      description: t('safetyEducationDescription'),
    }
  ]

  const wakabarSites = [
    {
      name: t('wakabarMainSite'),
      url: 'https://www.wakabar-cycle.com/',
      description: t('corporateSiteDescription'),
      isPrimary: true
    },
    {
      name: t('wakabarTourSite'),
      url: 'https://wakabar.net/wakabar-tours',
      description: t('selfTourDescription'),
      isPrimary: false
    },
    {
      name: t('wakabarAppSite'),
      url: 'https://wakabar.net/',
      description: t('applicationDescription'),
      isPrimary: false
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <section id="startup" className="py-24 md:py-32 lg:py-40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
            {t('startup')}
          </h2>
          <p className={`text-xl font-light max-w-3xl mx-auto leading-relaxed text-[#86868B]`}>
            {t('bicycleAccidentPrevention')}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-16"
        >
          <motion.div
            variants={itemVariants}
            className={`relative overflow-hidden rounded-2xl ${
              isDark ? 'bg-[#1D1D1F]' : 'bg-[#F5F5F7]'
            }`}
          >
            <div className="relative p-8 md:p-12">
              <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
                <div className="lg:col-span-2 order-1 lg:order-1">
                  <div className="flex items-center gap-6 mb-8">
                    <div className={`w-20 h-20 rounded-2xl flex items-center justify-center shadow-sm overflow-hidden ${
                      isDark ? 'bg-[#2C2C2E]' : 'bg-white'
                    }`}>
                      <Image
                        src="/images/wakabar.png"
                        alt="Wakabar Logo"
                        width={56}
                        height={56}
                        className="object-contain"
                      />
                    </div>

                    <div>
                      <h3 className={`text-3xl md:text-4xl font-semibold ${
                        isDark ? 'text-[#F5F5F7]' : 'text-[#1D1D1F]'
                      }`}>
                        {t('Companyname')}
                      </h3>
                      <p className={`text-lg font-medium ${
                        isDark ? 'text-[#2997FF]' : 'text-[#0071E3]'
                      }`}>
                        {t('locationBasedAccidentPrevention')}
                      </p>
                    </div>
                  </div>

                  <p className={`text-xl font-light mb-8 leading-relaxed text-[#86868B]`}>
                    {t('wakabarDescription')}
                  </p>

                  <div className={`p-6 rounded-2xl mb-8 ${
                    isDark ? 'bg-[#2C2C2E]' : 'bg-white'
                  }`}>
                    <h4 className={`text-lg font-semibold mb-3 ${
                      isDark ? 'text-[#F5F5F7]' : 'text-[#1D1D1F]'
                    }`}>
                      {t('startupMission')}
                    </h4>
                    <p className="text-[#86868B] leading-relaxed">
                      {t('startupMissionDescription')}
                    </p>
                  </div>

                  <div className="space-y-3">
                    {wakabarSites.map((site, index) => (
                      <motion.a
                        key={index}
                        href={site.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02, x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        className={`flex items-center justify-between p-4 rounded-xl w-full border transition-all duration-300 group ${
                          site.isPrimary
                            ? isDark
                              ? 'bg-[#2997FF]/10 border-[#2997FF]/20 hover:bg-[#2997FF]/15'
                              : 'bg-[#0071E3]/5 border-[#0071E3]/20 hover:bg-[#0071E3]/10'
                            : isDark
                              ? 'bg-[#2C2C2E] border-[#333336] hover:bg-[#333336]'
                              : 'bg-white border-[#D2D2D7] hover:bg-[#F5F5F7]'
                        }`}
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <span className={`font-semibold text-lg ${
                              site.isPrimary
                                ? isDark ? 'text-[#2997FF]' : 'text-[#0071E3]'
                                : isDark ? 'text-[#F5F5F7]' : 'text-[#1D1D1F]'
                            }`}>
                              {site.name}
                            </span>
                            {site.isPrimary && (
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                isDark ? 'bg-[#2997FF]/20 text-[#2997FF]' : 'bg-[#0071E3]/10 text-[#0071E3]'
                              }`}>
                                {t('mainSite')}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-[#86868B]">
                            {site.description}
                          </p>
                        </div>
                        <ExternalLink className={`w-5 h-5 ml-4 text-[#86868B] group-hover:translate-x-1 transition-transform`} />
                      </motion.a>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-3 order-2 lg:order-2">
                  <div className={`p-4 rounded-2xl ${
                    isDark ? 'bg-[#2C2C2E]' : 'bg-white'
                  }`}>
                    <h4 className={`text-lg font-semibold mb-4 ${
                      isDark ? 'text-[#F5F5F7]' : 'text-[#1D1D1F]'
                    }`}>
                      {t('serviceDemo')}
                    </h4>
                    <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
                      <iframe
                        src="https://www.youtube.com/embed/C9rNbZwhLqE"
                        title={t('serviceDemoVideoTitle')}
                        className="w-full h-full"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className={`text-3xl font-semibold text-center mb-12 ${
              isDark ? 'text-[#F5F5F7]' : 'text-[#1D1D1F]'
            }`}>
              {t('coreServices')}
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {coreFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-6 rounded-2xl transition-all duration-300 hover:shadow-md ${
                    isDark ? 'bg-[#1D1D1F]' : 'bg-[#F5F5F7]'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    isDark ? 'bg-[#2997FF]/10' : 'bg-[#0071E3]/10'
                  }`}>
                    <feature.icon className={`w-6 h-6 ${
                      isDark ? 'text-[#2997FF]' : 'text-[#0071E3]'
                    }`} />
                  </div>
                  <h4 className={`text-lg font-semibold mb-3 ${
                    isDark ? 'text-[#F5F5F7]' : 'text-[#1D1D1F]'
                  }`}>
                    {feature.title}
                  </h4>
                  <p className="text-sm text-[#86868B] leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
