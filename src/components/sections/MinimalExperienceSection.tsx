'use client'

import { motion } from 'framer-motion'
import { useTranslation } from '../../contexts/TranslationContext'
import { useTheme } from '../../contexts/ThemeContext'
import { MinimalExperienceCard } from '../cards/MinimalExperienceCard'
import { minimalStyles } from '../../utils/minimal-styles'

export function MinimalExperienceSection() {
  const { t } = useTranslation();
  const { isDark } = useTheme();

  const experiences = [
    {
      logo: "/images/iii.jpg",
      title: t('experience1'),
      position: t('experience1Description'),
      date: t('experience1Date'),
      links: [
        { text: t('experience1Link1'), url: 'https://www.iiiexhibition.com/' }
      ]
    },
    {
      logo: "/images/wakabar.png",
      title: t('Companyname'),
      position: "Co-founder & CTO",
      date: "2023 - Present",
      links: [
        { text: "Visit Website", url: 'https://wakabar-cycle.com/' }
      ]
    }
  ];

  return (
    <section id="experience" className={`${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      <div className={minimalStyles.container.section}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className={`${minimalStyles.heading.h2(isDark)} mb-4`}>
            {t('experience')}
          </h2>
          <p className={`${minimalStyles.text.body(isDark)} max-w-2xl`}>
            Building innovative solutions and contributing to cutting-edge research.
          </p>
        </motion.div>

        <div className="grid gap-6 max-w-3xl">
          {experiences.map((experience, index) => (
            <MinimalExperienceCard key={index} {...experience} />
          ))}
        </div>

        {/* Awards section - minimal style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h3 className={`${minimalStyles.heading.h3(isDark)} mb-8`}>
            {t('awards')}
          </h3>
          <div className="space-y-4">
            <div className={`${minimalStyles.card.base(isDark)} p-6`}>
              <p className={minimalStyles.text.body(isDark)}>
                <span className="font-medium">GUGEN 2024</span> - {t('award4no2')}
              </p>
            </div>
            <div className={`${minimalStyles.card.base(isDark)} p-6`}>
              <p className={minimalStyles.text.body(isDark)}>
                <span className="font-medium">東京大学</span> - {t('award1')}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}