'use client'

import { motion } from 'framer-motion'
import { Calendar, ExternalLink, FileText, Presentation, Video } from 'lucide-react'
import { useTranslation } from '../../contexts/TranslationContext'
import { useTheme } from '../../contexts/ThemeContext'
import Image from 'next/image'

export function ProjectsSection() {
  const { t } = useTranslation()
  const { isDark } = useTheme()

  const researchProjects = [
    {
      title: "Augmented Leap",
      description: t('augmentedLeapDescription'),
      image: "/images/augmented-leap.png",
      venue: "Augmented Humans 2026",
      date: "2026.03",
      links: [
        {
          type: 'paper',
          icon: <FileText className="w-3.5 h-3.5" />,
          text: 'Paper',
          url: 'https://doi.org/10.1145/3795011.3795034'
        },
        {
          type: 'demo',
          icon: <Video className="w-3.5 h-3.5" />,
          text: 'Demo (coming soon)',
          url: '#'
        }
      ]
    },
    {
      title: "Incremental Gaussian Splatting",
      description: t('IGSDescription'),
      image: "/images/sigasi.jpg",
      venue: "SIGGRAPH Asia 2024",
      date: "2024.12",
      links: [
        {
          type: 'paper',
          icon: <FileText className="w-3.5 h-3.5" />,
          text: 'Paper',
          url: 'https://doi.org/10.1145/3681756.3697913'
        }
      ]
    },
    {
      title: "Recertif",
      description: t('recertifDescription'),
      image: "/images/Recertif.png",
      venue: "SI2023",
      date: "2024.03",
      links: [
        {
          type: 'paper',
          icon: <FileText className="w-3.5 h-3.5" />,
          text: 'Paper',
          url: 'https://jglobal.jst.go.jp/detail?JGLOBAL_ID=202402256126174476'
        },
        {
          type: 'demo',
          icon: <Video className="w-3.5 h-3.5" />,
          text: 'Demo',
          url: 'https://www.youtube.com/watch?v=RC4FkGJv0MU'
        }
      ]
    },
    {
      title: "FSTL - Forest Segmentation & Trimming Learning",
      description: t('fstlDescription'),
      image: "/images/FSTL.png",
      venue: "JSAI 2023",
      date: "2023.06",
      links: [
        {
          type: 'paper',
          icon: <FileText className="w-3.5 h-3.5" />,
          text: 'Paper',
          url: 'https://www.jstage.jst.go.jp/article/pjsai/JSAI2023/0/JSAI2023_1G5OS21b04/_article/-char/ja/'
        },
        {
          type: 'slides',
          icon: <Presentation className="w-3.5 h-3.5" />,
          text: 'Slides',
          url: 'https://www.docswell.com/s/weblab/56Y6VX-2023-10-23-111938'
        }
      ]
    }
  ]

  return (
    <section id="projects" className="py-24 md:py-32 lg:py-40 relative">
      <div className="container mx-auto px-4 max-w-6xl">
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
            {t('researchProjects')}
          </h2>
          <div className={`w-24 h-0.5 mx-auto ${isDark ? 'bg-[#333336]' : 'bg-[#D2D2D7]'}`} />
        </motion.div>

        <div className="space-y-8">
          {researchProjects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`group rounded-2xl overflow-hidden hover:shadow-md transition-all duration-300 ${
                isDark ? 'bg-[#1D1D1F]' : 'bg-[#F5F5F7]'
              }`}
            >
              <div className="flex flex-col md:flex-row">
                <div className={`md:w-1/3 overflow-hidden ${
                  isDark ? 'bg-black/30' : 'bg-white/70'
                }`}>
                  <div className="relative min-h-[200px] aspect-video md:h-full md:min-h-[280px] md:aspect-auto">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                </div>

                <div className="md:w-2/3 p-6 md:p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className={`text-xl md:text-2xl font-medium mb-2 ${
                        isDark ? 'text-[#F5F5F7]' : 'text-[#1D1D1F]'
                      }`}>
                        {project.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[#86868B]">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                          isDark ? 'bg-[#2997FF]/10 text-[#7AB7FF]' : 'bg-[#0071E3]/10 text-[#006EDB]'
                        }`}>
                          {project.venue}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar aria-hidden="true" className="h-3.5 w-3.5" />
                          {project.date}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className={`mb-6 leading-relaxed text-[#86868B]`}>
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {project.links.map((link) => (
                      <motion.a
                        key={link.text}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                          isDark
                            ? 'bg-[#2997FF]/10 text-[#2997FF] hover:bg-[#2997FF]/20'
                            : 'bg-[#0071E3]/10 text-[#0071E3] hover:bg-[#0071E3]/20'
                        }`}
                      >
                        {link.icon}
                        <span>{link.text}</span>
                        <ExternalLink className="w-3 h-3" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
