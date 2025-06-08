'use client'

import { motion } from 'framer-motion'
import { Calendar, Users, ExternalLink } from 'lucide-react'
import Image from 'next/image'

interface ResearchProjectCardProps {
  title: string
  description: string
  longDescription?: string
  image: string
  conference: string
  date: string
  authors: string[]
  keywords: string[]
  links: Array<{
    type: 'paper' | 'demo' | 'slide' | 'conference' | 'github'
    icon: React.ReactNode
    text: string
    url: string
  }>
  highlights?: string[]
  layout?: 'horizontal' | 'vertical'
}

export function ResearchProjectCard({
  title,
  description,
  longDescription,
  image,
  conference,
  date,
  authors,
  keywords,
  links,
  highlights = [],
  layout = 'horizontal'
}: ResearchProjectCardProps) {
  const isDark = true // ダークモード固定

    const getLinkStyle = (type: string) => {
    const styles: Record<string, string> = {
      paper: isDark
        ? 'bg-red-900/20 text-red-400 hover:bg-red-900/30 border-red-800/50'
        : 'bg-red-50 text-red-600 hover:bg-red-100 border-red-200',
      demo: isDark
        ? 'bg-green-900/20 text-green-400 hover:bg-green-900/30 border-green-800/50'
        : 'bg-green-50 text-green-600 hover:bg-green-100 border-green-200',
      slide: isDark
        ? 'bg-orange-900/20 text-orange-400 hover:bg-orange-900/30 border-orange-800/50'
        : 'bg-orange-50 text-orange-600 hover:bg-orange-100 border-orange-200',
      conference: isDark
        ? 'bg-blue-900/20 text-blue-400 hover:bg-blue-900/30 border-blue-800/50'
        : 'bg-blue-50 text-blue-600 hover:bg-blue-100 border-blue-200',
      github: isDark
        ? 'bg-gray-800/50 text-gray-300 hover:bg-gray-800/70 border-gray-700'
        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-300'
    }
    return styles[type] || styles.paper
  }

  if (layout === 'vertical') {
    return (
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={`group relative overflow-hidden rounded-2xl ${
          isDark ? 'bg-gray-900/80' : 'bg-white'
        } shadow-xl hover:shadow-2xl transition-all duration-300`}
        whileHover={{ y: -8 }}
      >
        {/* Image */}
        <div className="relative h-64 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${
            isDark ? 'from-gray-900' : 'from-white'
          } via-transparent to-transparent opacity-60`} />

          {/* Conference Badge */}
          <div className="absolute top-4 left-4">
            <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
              isDark ? 'bg-blue-900/90 text-blue-300' : 'bg-blue-600/90 text-white'
            } backdrop-blur-sm`}>
              {conference}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Title and Meta */}
          <div>
            <h3 className={`text-2xl font-bold mb-2 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {title}
            </h3>
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <div className={`flex items-center gap-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                <Calendar className="w-3 h-3" />
                <span>{date}</span>
              </div>
              <div className={`flex items-center gap-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                <Users className="w-3 h-3" />
                <span>{authors[0]}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {description}
          </p>

          {/* Keywords */}
          <div className="flex flex-wrap gap-1.5">
            {keywords.slice(0, 3).map((keyword) => (
              <span
                key={keyword}
                className={`px-2 py-0.5 rounded text-xs font-medium ${
                  isDark
                    ? 'bg-gray-800/50 text-gray-400'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {keyword}
              </span>
            ))}
            {keywords.length > 3 && (
              <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                +{keywords.length - 3} more
              </span>
            )}
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-2 pt-2">
            {links.map((link) => (
              <motion.a
                key={link.text}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium text-xs border transition-all duration-300 ${
                  getLinkStyle(link.type)
                }`}
              >
                {link.icon}
                <span>{link.text}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </motion.article>
    )
  }

  // Horizontal layout (default)
  return (
    <motion.article
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className={`group relative overflow-hidden rounded-2xl ${
        isDark ? 'bg-gray-900/80' : 'bg-white'
      } shadow-xl hover:shadow-2xl transition-all duration-300`}
    >
      <div className="grid md:grid-cols-2 gap-6">
        {/* Image Side */}
        <div className="relative h-full min-h-[300px] md:min-h-[400px]">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${
            isDark ? 'from-gray-900/50' : 'from-white/50'
          } to-transparent`} />

          {/* Conference Badge */}
          <div className="absolute top-4 left-4">
            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
              isDark ? 'bg-blue-900/90 text-blue-300' : 'bg-blue-600/90 text-white'
            } backdrop-blur-sm`}>
              {conference}
            </span>
          </div>
        </div>

        {/* Content Side */}
        <div className="p-8 space-y-5">
          {/* Title and Meta */}
          <div>
            <h3 className={`text-3xl font-bold mb-3 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {title}
            </h3>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className={`flex items-center gap-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                <Calendar className="w-4 h-4" />
                <span>{date}</span>
              </div>
              <div className={`flex items-center gap-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                <Users className="w-4 h-4" />
                <span>{authors.join(', ')}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <p className={`text-base font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {description}
            </p>
            {longDescription && (
              <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {longDescription}
              </p>
            )}
          </div>

          {/* Keywords */}
          <div className="flex flex-wrap gap-2">
            {keywords.map((keyword) => (
              <span
                key={keyword}
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  isDark
                    ? 'bg-gray-800/50 text-gray-400 border border-gray-700'
                    : 'bg-gray-100 text-gray-600 border border-gray-200'
                }`}
              >
                {keyword}
              </span>
            ))}
          </div>

          {/* Highlights */}
          {highlights.length > 0 && (
            <ul className="space-y-1">
              {highlights.map((highlight, idx) => (
                <li key={idx} className={`flex items-start gap-2 text-sm ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <span className={`block w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                    isDark ? 'bg-blue-400' : 'bg-blue-600'
                  }`} />
                  {highlight}
                </li>
              ))}
            </ul>
          )}

          {/* Links */}
          <div className="flex flex-wrap gap-3 pt-2">
            {links.map((link) => (
              <motion.a
                key={link.text}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm border transition-all duration-300 ${
                  getLinkStyle(link.type)
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
  )
}