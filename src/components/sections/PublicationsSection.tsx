'use client'

import { motion } from 'framer-motion'
import { useTheme } from '../../contexts/ThemeContext'
import { useTranslation } from '../../contexts/TranslationContext'
import type { Language } from '../../translations'

interface Author {
  name: string
  highlight?: boolean
}

interface Publication {
  authors: Author[] | Record<Language, Author[]>
  title: string | Record<Language, string>
  venue: string | Record<Language, string>
  location: string | Record<Language, string>
  date: string
  url?: string
}

function localizePublication<T>(value: T | Record<Language, T>, language: Language): T {
  if (value && typeof value === 'object' && !Array.isArray(value) && 'en' in value && 'ja' in value) {
    return value[language]
  }
  return value as T
}

export function PublicationsSection() {
  const { isDark } = useTheme()
  const { language } = useTranslation()

  const publications: Publication[] = [
    {
      authors: [
        { name: 'Xiang Li' },
        { name: 'Koya Dendo' },
        { name: 'Keigo Minamida', highlight: true },
        { name: 'Yuto Nakamura' },
        { name: 'Per Ola Kristensson' },
        { name: 'Jun Rekimoto' },
      ],
      title: 'Can People Distinguish Human and AI Agency in Humanoid Teleoperation? A Preliminary Study of Agency Perception.',
      venue: "UIST Adjunct '26",
      location: 'Detroit, MI, USA',
      date: '2026.11',
      url: 'https://doi.org/10.1145/3830397.3841874',
    },
    {
      authors: [
        { name: 'Keigo Minamida', highlight: true },
        { name: 'Koya Dendo' },
        { name: 'Yuto Nakamura' },
        { name: 'Jun Rekimoto' },
      ],
      title: 'Warping the Workspace: Expanding Visual Access with Adjustable Reach Mapping for Humanoid Teleoperation.',
      venue: "UIST Adjunct '26",
      location: 'Detroit, MI, USA',
      date: '2026.11',
      url: 'https://doi.org/10.1145/3830397.3841893',
    },
    {
      authors: {
        en: [
          { name: 'Taiyo Ozaki' },
          { name: 'Keigo Minamida', highlight: true },
          { name: 'Keiko Nakamoto' },
          { name: 'Tsubasa Ichikawa' },
          { name: 'Jun Rekimoto' },
        ],
        ja: [
          { name: '尾崎大耀' },
          { name: '南田桂吾', highlight: true },
          { name: '中本啓子' },
          { name: '市川翼' },
          { name: '暦本純一' },
        ],
      },
      title: {
        en: 'SCOPE-GS: Spatial Construction and Viewpoint-aware Online Updating system for Dynamic Environments via Gaussian Splatting.',
        ja: 'SCOPE-GS：Gaussian Splattingによる動的環境の視点考慮型オンライン空間構築・更新システム',
      },
      venue: {
        en: 'Spatial Media Conference 2026',
        ja: '空間メディアコンファレンス2026',
      },
      location: {
        en: 'Tokyo, Japan',
        ja: '東京',
      },
      date: '2026.07',
      url: 'https://www.ite.or.jp/ken/paper/20260730vAPu/',
    },
    {
      authors: [
        { name: 'Yuto Nakamura' },
        { name: 'Keigo Minamida', highlight: true },
        { name: 'Masanobu Kanazawa' },
        { name: 'Koya Dendo' },
        { name: 'Jun Rekimoto' },
      ],
      title: 'Augmented Leap: Human Jump Augmentation through Wearable Apparent Reduced Gravity.',
      venue: 'Augmented Humans 2026',
      location: 'Okinawa, Japan',
      date: '2026.03',
      url: 'https://doi.org/10.1145/3795011.3795034',
    },
    {
      authors: [
        { name: 'Keigo Minamida', highlight: true },
        { name: 'Jun Rekimoto' },
      ],
      title: 'Incremental Gaussian Splatting: Gradual 3D Reconstruction from a Monocular Camera Following Physical World Changes.',
      venue: 'SIGGRAPH Asia 2024 Posters',
      location: 'Tokyo, Japan',
      date: '2024.12',
      url: 'https://doi.org/10.1145/3681756.3697913',
    },
    {
      authors: [
        { name: '南田桂吾', highlight: true },
        { name: '大坪義一' },
      ],
      title: '作業環境を評価するためのヒトとロボットの協調作業空間におけるロボットの個体特定と物体認識の統合システム',
      venue: '第24回計測自動制御学会システムインテグレーション部門講演会',
      location: '新潟',
      date: '2023.12',
    },
    {
      authors: [
        { name: '藤崎勇哉' },
        { name: '南田桂吾', highlight: true },
        { name: '土方祥平' },
        { name: '澤野千賀 et al.' },
      ],
      title: '世界モデルにおける未知の環境への転移',
      venue: '2023年度人工知能学会全国大会（第37回）',
      location: '福岡',
      date: '2023.06',
      url: 'https://www.jstage.jst.go.jp/article/pjsai/JSAI2023/0/JSAI2023_1G5OS21b04/_article/-char/ja/',
    },
  ]

  return (
    <section id="publications" className="py-24 md:py-32 lg:py-40 relative">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl md:text-5xl font-semibold mb-6 tracking-tight ${
            isDark ? 'text-[#F5F5F7]' : 'text-[#1D1D1F]'
          }`}>
            Publications
          </h2>
          <div className={`w-24 h-0.5 mx-auto ${isDark ? 'bg-[#333336]' : 'bg-[#D2D2D7]'}`} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-12"
        >
          {publications.map((pub, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className={`flex flex-col md:flex-row md:items-baseline gap-4 md:gap-8 pb-8 border-b ${
                isDark ? 'border-[#333336]' : 'border-[#D2D2D7]'
              }`}>
                <motion.div
                  className="flex-shrink-0"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="text-sm font-light text-[#86868B]">
                    {pub.date}
                  </span>
                </motion.div>
                <div className="flex-1">
                  <p className={`text-sm mb-2 text-[#86868B]`}>
                    {localizePublication(pub.authors, language).map((author, i) => (
                      <span key={i}>
                        {i > 0 && ', '}
                        <span className={author.highlight ? (isDark ? 'text-[#F5F5F7] font-medium' : 'text-[#1D1D1F] font-medium') : ''}>
                          {author.name}
                        </span>
                      </span>
                    ))}
                  </p>
                  <p className={`text-base leading-relaxed mb-2 ${
                    isDark ? 'text-[#F5F5F7]' : 'text-[#1D1D1F]'
                  }`}>
                    {pub.url ? (
                      <a
                        href={pub.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`transition-colors ${
                          isDark ? 'hover:text-[#2997FF]' : 'hover:text-[#0071E3]'
                        }`}
                      >
                        {localizePublication(pub.title, language)}
                      </a>
                    ) : (
                      localizePublication(pub.title, language)
                    )}
                  </p>
                  <p className="text-sm text-[#86868B]">
                    {localizePublication(pub.venue, language)}, {localizePublication(pub.location, language)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
