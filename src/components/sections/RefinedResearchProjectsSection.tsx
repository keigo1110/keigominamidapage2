'use client'

import { motion } from 'framer-motion'
import { FileText, Video, Presentation, Calendar, Users, ChevronRight } from 'lucide-react'
import { useTranslation } from '../../contexts/TranslationContext'
import { useTheme } from '../../contexts/ThemeContext'
import Image from 'next/image'
import { colors } from '../../utils/refined-styles'

export function RefinedResearchProjectsSection() {
  const { t } = useTranslation()
  const { isDark } = useTheme()

  const researchProjects = [
    {
      title: "Incremental Gaussian Splatting",
      description: t('IGSDescription'),
      image: "/images/sigasi.jpg",
      conference: "SIGGRAPH Asia 2024",
      date: "Dec 2024",
      category: "Computer Vision",
      impact: "High",
      links: [
        {
          type: 'paper',
          icon: <FileText className="w-4 h-4" />,
          text: t('paper'),
          url: 'https://doi.org/10.1145/3681756.3697913'
        },
        {
          type: 'conference',
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
      date: "Mar 2024",
      category: "Human-Robot Interaction",
      impact: "High",
      links: [
        {
          type: 'paper',
          icon: <FileText className="w-4 h-4" />,
          text: t('paper'),
          url: 'https://jglobal.jst.go.jp/detail?JGLOBAL_ID=202402256126174476'
        },
        {
          type: 'demo',
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
      date: "Jun 2023",
      category: "Agricultural Robotics",
      impact: "Medium",
      links: [
        {
          type: 'paper',
          icon: <FileText className="w-4 h-4" />,
          text: t('paper'),
          url: 'https://www.jstage.jst.go.jp/article/pjsai/JSAI2023/0/JSAI2023_1G5OS21b04/_article/-char/ja/'
        },
        {
          type: 'slide',
          icon: <Presentation className="w-4 h-4" />,
          text: t('slide'),
          url: 'https://www.docswell.com/s/weblab/56Y6VX-2023-10-23-111938'
        }
      ]
    }
  ]

  const getLinkStyle = (type: string) => {
    switch(type) {
      case 'paper':
        return isDark
          ? 'bg-red-600/20 text-red-400 hover:bg-red-600/30'
          : 'bg-red-50 text-red-600 hover:bg-red-100'
      case 'demo':
        return isDark
          ? 'bg-green-600/20 text-green-400 hover:bg-green-600/30'
          : 'bg-green-50 text-green-600 hover:bg-green-100'
      case 'slide':
        return isDark
          ? 'bg-orange-600/20 text-orange-400 hover:bg-orange-600/30'
          : 'bg-orange-50 text-orange-600 hover:bg-orange-100'
      case 'conference':
        return isDark
          ? 'bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600/30'
          : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
      default:
        return isDark
          ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8
      }
    }
  }

  return (
    <section id="research" className="min-h-screen px-4 py-20">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-${colors.primary[500]} to-${colors.secondary[500]} bg-clip-text text-transparent`}>
            {t('researchProjects')}
          </h2>
          <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Pushing the boundaries of technology through innovative research
          </p>
        </motion.div>

        {/* Research Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8"
        >
          {researchProjects.map((project, index) => (
            <motion.article
              key={project.title}
              variants={itemVariants}
              whileHover={{ x: 8 }}
              className={`group relative overflow-hidden rounded-2xl ${
                isDark ? 'bg-gray-900/50' : 'bg-white/70'
              } backdrop-blur-sm border ${
                isDark ? 'border-gray-800' : 'border-gray-200'
              } transition-all duration-300`}
            >
              {/* Gradient Border on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-r from-${colors.primary[500]} to-${colors.secondary[500]} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              <div className={`absolute inset-[1px] rounded-2xl ${isDark ? 'bg-gray-900' : 'bg-white'}`} />

              <div className="relative z-10 grid md:grid-cols-5 gap-6 p-6">
                {/* Image Column */}
                <div className="md:col-span-2">
                  <div className="relative h-48 md:h-full rounded-lg overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Conference Badge */}
                    <div className="absolute top-3 left-3">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                        isDark ? 'bg-indigo-900/90 text-indigo-300' : 'bg-indigo-600/90 text-white'
                      } backdrop-blur-sm`}>
                        {project.conference}
                      </span>
                    </div>
                    {/* Impact Badge */}
                    {project.impact === 'High' && (
                      <div className="absolute top-3 right-3">
                        <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                          isDark ? 'bg-yellow-900/90 text-yellow-300' : 'bg-yellow-500/90 text-white'
                        } backdrop-blur-sm`}>
                          High Impact
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Content Column */}
                <div className="md:col-span-3 space-y-4">
                  {/* Header */}
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className={`text-2xl font-bold ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        {project.title}
                      </h3>
                      <span className={`text-sm ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {project.date}
                      </span>
                    </div>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${
                      isDark
                        ? 'bg-gray-800 text-gray-300'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {project.category}
                    </span>
                  </div>

                  {/* Description */}
                  <p className={`leading-relaxed ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {project.description}
                  </p>

                  {/* Links */}
                  <div className="flex flex-wrap gap-3 pt-2">
                    {project.links.map((link) => (
                      <motion.a
                        key={link.text}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          getLinkStyle(link.type)
                        }`}
                      >
                        {link.icon}
                        <span>{link.text}</span>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className={`text-lg mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            View more research and publications
          </p>
          <motion.a
            href="#projects"
            whileHover={{ x: 5 }}
            className={`inline-flex items-center gap-2 text-lg font-medium ${
              isDark ? 'text-indigo-400' : 'text-indigo-600'
            } hover:underline`}
          >
            Explore Other Projects
            <ChevronRight className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}