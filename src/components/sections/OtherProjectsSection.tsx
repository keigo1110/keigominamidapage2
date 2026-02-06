'use client'

import { motion } from 'framer-motion'
import { FaYoutube, FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import { useTranslation } from '../../contexts/TranslationContext'
import { useTheme } from '../../contexts/ThemeContext'
import { ProjectCard } from '../cards/ProjectCard'

export function OtherProjectsSection() {
  const { t } = useTranslation();
  const { isDark } = useTheme();

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
    },
    {
      title: t('oProject4'),
      description: t('oProject4Description'),
      image: "/images/minikuro-title.jpg",
      links: [
        { icon: <FaExternalLinkAlt />, text: t('demo'), url: 'https://myminichronology.vercel.app/' },
        { icon: <FaExternalLinkAlt />, text: t('usageGuide'), url: 'https://note.com/namida1110/n/nfd97132121ef' },
        { icon: <FaGithub />, text: t('repository'), url: 'https://github.com/keigo1110/myminichronology' }
      ]
    }
  ];

  return (
    <section id="otherProjects" className="py-24 md:py-32 lg:py-40 relative">
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          className={`text-4xl md:text-5xl font-semibold mb-12 text-center tracking-tight ${
            isDark ? 'text-[#F5F5F7]' : 'text-[#1D1D1F]'
          }`}
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
