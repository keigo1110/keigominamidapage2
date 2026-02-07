'use client'

import { motion } from 'framer-motion'
import { useTheme } from '../../contexts/ThemeContext'

interface Publication {
  authors: { name: string; highlight?: boolean }[]
  title: string
  venue: string
  location: string
  date: string
  url?: string
}

export function PublicationsSection() {
  const { isDark } = useTheme()

  const publications: Publication[] = [
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
                    {pub.authors.map((author, i) => (
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
                        {pub.title}
                      </a>
                    ) : (
                      pub.title
                    )}
                  </p>
                  <p className="text-sm text-[#86868B]">
                    {pub.venue}, {pub.location}
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
