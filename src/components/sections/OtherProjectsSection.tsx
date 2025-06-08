'use client'

import { motion } from 'framer-motion'
import { FaYoutube, FaGithub } from 'react-icons/fa'
import { useTranslation } from '../../contexts/TranslationContext'
import { ProjectCard } from '../cards/ProjectCard'

export function OtherProjectsSection() {
  const { t } = useTranslation();
  const isDark = true; // ダークモード固定

  const otherProjects = [
    {
      title: t('oProject1'),
      description: t('oProject1Description'),
      image: "/images/robot_room.png",
      links: [
        { icon: <FaYoutube />, text: t('demoSwitch'), url: 'https://www.youtube.com/watch?v=XedxYF_UYmQ' },
        { icon: <FaYoutube />, text: t('demoDiscord'), url: 'https://www.youtube.com/watch?v=oPy740TgO-8' },
        { icon: <FaYoutube />, text: t('demoAA'), url: 'https://www.youtube.com/watch?v=5qL3k0K_MPc' }
      ]
    },
    {
      title: t('oProject2'),
      description: t('oProject2Description'),
      image: "/images/bodyop.png",
      links: [{ icon: <FaYoutube />, text: 'Demo', url: 'https://www.youtube.com/watch?v=-y6T3JDFr5Q' }]
    },
    {
      title: t('oProject3'),
      description: t('oProject3Description'),
      image: "/images/unilidar.png",
      links: [{ icon: <FaGithub />, text: t('repository'), url: 'https://github.com/keigo1110/unilidar_sdk' }]
    }
  ];

  return (
    <section id="otherProjects" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-100/40 via-blue-50/50 to-slate-100/60 dark:from-slate-950/40 dark:via-blue-900/30 dark:to-slate-950/50"></div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          className={`text-5xl font-bold mb-12 text-center bg-gradient-to-r ${isDark ? 'from-blue-400 to-blue-600' : 'from-blue-600 to-blue-800'} bg-clip-text text-transparent`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {t('otherProjects')}
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, staggerChildren: 0.2 }}
          viewport={{ once: true }}
        >
          {otherProjects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}