'use client'

import { motion } from 'framer-motion'
import { FaFileAlt, FaYoutube } from 'react-icons/fa'
import { useTranslation } from '../../contexts/TranslationContext'
import { useTheme } from '../../contexts/ThemeContext'
import { ProjectCard } from '../cards/ProjectCard'

export function ProjectsSection() {
  const { t } = useTranslation();
  const { isDark } = useTheme();

  const projects = [
    {
      title: "Incremental Gaussian Splatting",
      description: t('IGSDescription'),
      image: "/images/sigasi.jpg",
      links: [
        { icon: <FaFileAlt />, text: t('siggraphasia'), url: 'https://asia.siggraph.org/2024/presentation/?id=pos_232&sess=sess198' },
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
      title: "FSTL",
      description: t('fstlDescription'),
      image: "/images/FSTL.png",
      links: [
        { icon: <FaFileAlt />, text: t('paper'), url: 'https://www.jstage.jst.go.jp/article/pjsai/JSAI2023/0/JSAI2023_1G5OS21b04/_article/-char/ja/' },
        { icon: <FaWindowMaximize />, text: t('slide'), url: 'https://www.docswell.com/s/weblab/56Y6VX-2023-10-23-111938' }
      ]
    }
  ];

  return (
    <section id="projects" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/60 via-blue-50/40 to-slate-100/60 dark:from-slate-900/60 dark:via-blue-900/40 dark:to-slate-950/60"></div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          className={`text-5xl font-bold mb-12 text-center bg-gradient-to-r ${isDark ? 'from-blue-400 to-blue-600' : 'from-blue-600 to-blue-800'} bg-clip-text text-transparent`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {t('researchProjects')}
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, staggerChildren: 0.2 }}
          viewport={{ once: true }}
        >
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FaWindowMaximize({ className }: { className?: string }) {
  return <svg className={className} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M464 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-16 160H64v-84c0-6.6 5.4-12 12-12h360c6.6 0 12 5.4 12 12v84z"></path></svg>;
}