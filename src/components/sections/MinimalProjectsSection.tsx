'use client'

import { motion } from 'framer-motion'
import { FaFileAlt, FaYoutube, FaGithub } from 'react-icons/fa'
import { useTranslation } from '../../contexts/TranslationContext'
import { MinimalProjectCard } from '../cards/MinimalProjectCard'
import { minimalStyles } from '../../utils/minimal-styles'

export function MinimalProjectsSection() {
  const { t } = useTranslation();
  const isDark = true; // ダークモード固定

  const projects = [
    {
      title: "Incremental Gaussian Splatting",
      description: t('IGSDescription'),
      image: "/images/sigasi.jpg",
      links: [
        { icon: <FaFileAlt />, text: t('paper'), url: 'https://doi.org/10.1145/3681756.3697913' }
      ]
    },
    {
      title: "Recertif",
      description: t('recertifDescription'),
      image: "/images/Recertif.png",
      links: [
        { icon: <FaFileAlt />, text: t('paper'), url: 'https://jglobal.jst.go.jp/detail?JGLOBAL_ID=202402256126174476' },
        { icon: <FaYoutube />, text: 'Demo', url: 'https://www.youtube.com/watch?v=RC4FkGJv0MU' }
      ]
    },
    {
      title: "UniLiDAR SDK",
      description: t('oProject3Description'),
      image: "/images/unilidar.png",
      links: [
        { icon: <FaGithub />, text: t('repository'), url: 'https://github.com/keigo1110/unilidar_sdk' }
      ]
    }
  ];

  return (
    <section id="projects" className={`${isDark ? 'bg-gray-950' : 'bg-gray-50'}`}>
      <div className={minimalStyles.container.section}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className={`${minimalStyles.heading.h2(isDark)} mb-4`}>
            {t('researchProjects')}
          </h2>
          <p className={`${minimalStyles.text.body(isDark)} max-w-2xl`}>
            Exploring the boundaries of human-computer interaction through innovative research and development.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <MinimalProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}