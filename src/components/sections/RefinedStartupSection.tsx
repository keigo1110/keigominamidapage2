'use client'

import { motion } from 'framer-motion'
import { useTranslation } from '../../contexts/TranslationContext'
import { MapPin, BarChart3, GraduationCap, ExternalLink, Play } from 'lucide-react'
import Image from 'next/image'

export function RefinedStartupSection() {
  const { t } = useTranslation()
  const isDark = true // ダークモード固定

  // 主要サービス・機能
  const coreFeatures = [
    {
      icon: Play,
      title: t('audioWarningSystem'),
      description: t('audioWarningDescription'),
      color: 'from-red-500 to-orange-500'
    },
    {
      icon: MapPin,
      title: t('realtimeTracking'),
      description: t('realtimeTrackingDescription'),
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: BarChart3,
      title: t('dataAnalysis'),
      description: t('dataAnalysisDescription'),
      color: 'from-emerald-500 to-teal-500'
    },
    {
      icon: GraduationCap,
      title: t('safetyEducation'),
      description: t('safetyEducationDescription'),
      color: 'from-purple-500 to-violet-500'
    }
  ]



  // Wakabarのサイト情報
  const wakabarSites = [
    {
      name: t('wakabarMainSite'),
      url: 'https://www.wakabar-cycle.com/',
              description: t('corporateSiteDescription'),
      isPrimary: true
    },
    {
      name: t('wakabarTourSite'),
      url: 'https://wakabar-tour.com/',
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
    <section id="startup" className="py-24 relative overflow-hidden">
      {/* 背景グラデーション */}
      <div className="absolute inset-0">
        <div className={`absolute inset-0 bg-gradient-to-br ${
          isDark
            ? 'from-slate-950 via-blue-950/50 to-emerald-950/30'
            : 'from-blue-50/80 via-emerald-50/60 to-cyan-50/40'
        }`} />

        {/* 装飾的要素 */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full ${
            isDark ? 'bg-emerald-500/5' : 'bg-emerald-400/10'
          } blur-3xl`} />
          <div className={`absolute -bottom-40 -left-40 w-96 h-96 rounded-full ${
            isDark ? 'bg-blue-500/5' : 'bg-blue-400/10'
          } blur-3xl`} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ヘッダーセクション */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className={`text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r ${
            isDark
              ? 'from-emerald-400 via-blue-400 to-cyan-400'
              : 'from-emerald-600 via-blue-600 to-cyan-600'
          } bg-clip-text text-transparent`}>
            {t('startup')}
          </h2>
          <p className={`text-xl font-light ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          } max-w-3xl mx-auto leading-relaxed`}>
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
          {/* メイン企業カード */}
          <motion.div
            variants={itemVariants}
            className={`relative overflow-hidden rounded-3xl ${
              isDark
                ? 'bg-gray-900/40 border-gray-700/30'
                : 'bg-white/70 border-gray-200/30'
            } backdrop-blur-xl border shadow-2xl`}
          >
            {/* 背景グラデーション */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-blue-500/5 to-cyan-500/5" />

            <div className="relative p-8 md:p-12">
              <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
                {/* 企業情報 */}
                <div className="lg:col-span-2 order-1 lg:order-1">
                  <div className="flex items-center gap-6 mb-8">
                    {/* ロゴ */}
                    <div className={`w-20 h-20 rounded-2xl ${
                      isDark ? 'bg-white/10' : 'bg-white/90'
                    } flex items-center justify-center shadow-lg backdrop-blur-sm border ${
                      isDark ? 'border-gray-700/30' : 'border-gray-200/30'
                    } overflow-hidden`}>
                      <Image
                        src="/images/wakabar.png"
                        alt="Wakabar Logo"
                        width={56}
                        height={56}
                        className="object-contain"
                      />
                    </div>

                    <div>
                      <h3 className={`text-3xl md:text-4xl font-bold ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        {t('Companyname')}
                      </h3>
                      <p className={`text-lg ${
                        isDark ? 'text-emerald-400' : 'text-emerald-600'
                      } font-medium`}>
                        {t('locationBasedAccidentPrevention')}
                      </p>
                    </div>
                  </div>

                  <p className={`text-xl font-light mb-8 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  } leading-relaxed`}>
                    {t('wakabarDescription')}
                  </p>

                  <div className={`p-6 rounded-2xl ${
                    isDark ? 'bg-gray-800/30' : 'bg-gray-50/50'
                  } backdrop-blur-sm border ${
                    isDark ? 'border-gray-700/30' : 'border-gray-200/30'
                  } mb-8`}>
                    <h4 className={`text-lg font-semibold mb-3 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {t('startupMission')}
                    </h4>
                    <p className={`${
                      isDark ? 'text-gray-300' : 'text-gray-600'
                    } leading-relaxed`}>
                      {t('startupMissionDescription')}
                    </p>
                  </div>

                  {/* サイトリンク */}
                  <div className="space-y-3">
                    {wakabarSites.map((site, index) => (
                      <motion.a
                        key={index}
                        href={site.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02, x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        className={`flex items-center justify-between p-4 rounded-xl w-full ${
                          site.isPrimary
                            ? isDark
                              ? 'bg-emerald-600/20 border-emerald-500/30 hover:bg-emerald-600/30'
                              : 'bg-emerald-50 border-emerald-200 hover:bg-emerald-100'
                            : isDark
                              ? 'bg-gray-800/30 border-gray-700/30 hover:bg-gray-800/50'
                              : 'bg-gray-50/50 border-gray-200/30 hover:bg-gray-100/70'
                        } border backdrop-blur-sm transition-all duration-300 group`}
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <span className={`font-semibold text-lg ${
                              site.isPrimary
                                ? isDark ? 'text-emerald-400' : 'text-emerald-600'
                                : isDark ? 'text-white' : 'text-gray-900'
                            }`}>
                              {site.name}
                            </span>
                            {site.isPrimary && (
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700'
                              }`}>
                                {t('mainSite')}
                              </span>
                            )}
                          </div>
                          <p className={`text-sm ${
                            isDark ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            {site.description}
                          </p>
                        </div>
                        <ExternalLink className={`w-5 h-5 ml-4 ${
                          site.isPrimary
                            ? isDark ? 'text-emerald-400' : 'text-emerald-600'
                            : isDark ? 'text-gray-400' : 'text-gray-600'
                        } group-hover:translate-x-1 transition-transform`} />
                      </motion.a>
                    ))}
                  </div>
                </div>

                {/* サービスデモ */}
                <div className="lg:col-span-3 order-2 lg:order-2">
                  <div className={`p-4 rounded-2xl ${
                    isDark ? 'bg-gray-800/30' : 'bg-gray-50/50'
                  } backdrop-blur-sm border ${
                    isDark ? 'border-gray-700/30' : 'border-gray-200/30'
                  }`}>
                    <h4 className={`text-lg font-semibold mb-4 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {t('serviceDemo')}
                    </h4>
                    <div className="aspect-video rounded-xl overflow-hidden shadow-2xl">
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

          {/* コア機能セクション */}
          <motion.div variants={itemVariants}>
            <h3 className={`text-3xl font-bold text-center mb-12 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {t('coreServices')}
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {coreFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-6 rounded-2xl ${
                    isDark
                      ? 'bg-gray-900/40 border-gray-700/30'
                      : 'bg-white/70 border-gray-200/30'
                  } backdrop-blur-xl border shadow-lg group`}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} p-0.5 mb-4`}>
                    <div className={`w-full h-full rounded-xl ${
                      isDark ? 'bg-gray-900' : 'bg-white'
                    } flex items-center justify-center`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <h4 className={`text-lg font-semibold mb-3 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {feature.title}
                  </h4>
                  <p className={`text-sm ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  } leading-relaxed`}>
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