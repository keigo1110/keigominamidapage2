'use client'

import { motion } from 'framer-motion'
import { useTranslation } from '../../contexts/TranslationContext'
import { useTheme } from '../../contexts/ThemeContext'
import { ExperienceCard } from '../cards/ExperienceCard'

export function ExperienceSection() {
  const { t } = useTranslation();
  const { isDark } = useTheme();

  const experiences = [
    {
      logo: "/images/iii.jpg",
      title: t('experience1'),
      position: t('experience1Description'),
      date: t('experience1Date'),
      links: [
        { text: t('experience1Link1'), url: 'https://www.iiiexhibition.com/' },
        { text: t('experience1Link2'), url: 'https://iii-exhibition-2024-web.vercel.app/' }
      ]
    },
    {
      logo: "/images/1000ya.png",
      title: t('experience2'),
      position: t('experience2Description'),
      date: t('experience2Date'),
      links: [
        { text: t('experience2Link1'), url: 'https://1000ya.isis.ne.jp/1850.html' },
        { text: t('experience2Link2'), url: 'https://1000ya.isis.ne.jp/1849.html' },
        { text: t('experience2Link3'), url: 'https://1000ya.isis.ne.jp/1848.html' },
        { text: t('experience2Link4'), url: 'https://1000ya.isis.ne.jp/1847.html' },
        { text: t('experience2Link5'), url: 'https://1000ya.isis.ne.jp/1846.html' }
      ]
    },
    {
      logo: "/images/ha.png",
      title: t('experience3'),
      position: t('experience3Description'),
      date: t('experience3Date'),
      links: [
        { text: t('experience3Link1'), url: 'https://edist.ne.jp/list/82kanmon_51ha_shusseuo/' },
        { text: t('experience3Link2'), url: 'https://edist.ne.jp/list/83kanmon_51ha_book/' },
        { text: t('experience3Link3'), url: 'https://edist.ne.jp/just/kanmon83_hyper_p-1/' }
      ]
    },
    {
      logo: "/images/shu.png",
      title: t('experience4'),
      position: t('experience4Description'),
      date: t('experience4Date'),
      links: [
        { text: t('experience4Link1'), url: 'https://edist.ne.jp/list/81kanmon_51shu_names/' },
        { text: t('experience4Link2'), url: 'https://edist.ne.jp/list/82kanmon_shu_book/' },
        { text: t('experience4Link3'), url: 'https://edist.ne.jp/post/51syu_ruijisoji/' }
      ]
    }
  ];

  return (
    <section id="experience" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-100/40 via-blue-50/60 to-slate-100/50 dark:from-slate-950/40 dark:via-blue-900/30 dark:to-slate-950/60"></div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          className={`text-5xl font-bold mb-12 text-center bg-gradient-to-r ${isDark ? 'from-blue-400 to-blue-600' : 'from-blue-600 to-blue-800'} bg-clip-text text-transparent`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {t('experience')}
        </motion.h2>
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, staggerChildren: 0.2 }}
          viewport={{ once: true }}
        >
          {experiences.map((experience, index) => (
            <ExperienceCard key={index} {...experience} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}