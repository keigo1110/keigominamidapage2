'use client'

import { motion } from 'framer-motion'
import { FileText, Video, Presentation, ExternalLink } from 'lucide-react'
import { useTranslation } from '../../contexts/TranslationContext'
import { useTheme } from '../../contexts/ThemeContext'
import Image from 'next/image'

export function MinimalResearchProjectsSection() {
  const { t } = useTranslation()
  const { isDark } = useTheme()

  const researchProjects = [
    {
      title: "Incremental Gaussian Splatting",
      description: t('IGSDescription'),
      image: "/images/sigasi.jpg",
      conference: "SIGGRAPH Asia 2024",
      links: [
        {
          icon: <FileText className="w-4 h-4" />,
          text: t('paper'),
          url: 'https://doi.org/10.1145/3681756.3697913'
        },
        {
          icon: <Presentation className="w-4 h-4" />,
          text: 'Conference',
          url: 'https://asia.siggraph.org/2024/presentation/?id=pos_232&sess=sess198'
        }
      ]
    },
    {
      title: "Recertif",
      description: t('recertifDescription'),
      image: "/images/Recertif.png",
      conference: "SI2023",
      links: [
        {
          icon: <FileText className="w-4 h-4" />,
          text: t('paper'),
          url: 'https://jglobal.jst.go.jp/detail?JGLOBAL_ID=202402256126174476'
        },
        {
          icon: <Video className="w-4 h-4" />,
          text: 'Demo',
          url: 'https://www.youtube.com/watch?v=RC4FkGJv0MU'
        }
      ]
    },
    {
      title: "FSTL",
      description: t('fstlDescription'),
      image: "/images/FSTL.png",
      conference: "JSAI 2023",
      links: [
        {
          icon: <FileText className="w-4 h-4" />,
          text: t('paper'),
          url: 'https://www.jstage.jst.go.jp/article/pjsai/JSAI2023/0/JSAI2023_1G5OS21b04/_article/-char/ja/'
        },
        {
          icon: <Presentation className="w-4 h-4" />,
          text: t('slide'),
          url: 'https://www.docswell.com/s/weblab/56Y6VX-2023-10-23-111938'
        }
      ]
    }
  ]

  return (
    <section id="research" className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={`text-3xl font-mono mb-12 ${isDark ? 'text-white' : 'text-gray-900'}`}
        >
          {t('researchProjects')}
        </motion.h2>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-8"
        >
          {researchProjects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`border-t ${isDark ? 'border-gray-800' : 'border-gray-200'} pt-8`}
            >
              <div className="grid md:grid-cols-3 gap-8">
                {/* Image */}
                <div className="md:col-span-1">
                  <div className="relative aspect-video rounded overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                    {/* Conference Badge */}
                    <div className="absolute top-2 left-2">
                      <span className={`px-2 py-1 text-xs font-mono ${
                        isDark ? 'bg-gray-900/90 text-gray-300' : 'bg-white/90 text-gray-700'
                      } backdrop-blur-sm`}>
                        {project.conference}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="md:col-span-2 space-y-4">
                  <div>
                    <h3 className={`text-xl font-mono mb-2 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {project.title}
                    </h3>
                    <p className={`text-sm leading-relaxed ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {project.description}
                    </p>
                  </div>

                  {/* Links */}
                  <div className="flex flex-wrap gap-4">
                    {project.links.map((link) => (
                      <a
                        key={link.text}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 text-sm font-mono ${
                          isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                        } transition-colors`}
                      >
                        {link.icon}
                        <span className="underline">{link.text}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}