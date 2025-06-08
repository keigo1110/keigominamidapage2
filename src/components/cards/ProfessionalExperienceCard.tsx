'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef } from 'react'
import Image from 'next/image'
import { 
  Calendar, 
  MapPin, 
  ExternalLink, 
  Award, 
  Users, 
  TrendingUp,
  Clock,
  Tag,
  Briefcase,
  ChevronRight,
  Star,
  Target,
  Code,
  Sparkles
} from 'lucide-react'

import { ProcessedExperience } from '../../types/experience'
import { useTheme } from '../../contexts/ThemeContext'
import { professionalDesign } from '../../utils/professional-design-system'

interface ProfessionalExperienceCardProps {
  experience: ProcessedExperience
  index: number
  isHovered: boolean
  onHover: (id: string | null) => void
}

const { colors, typography, spacing, borderRadius, shadows, animations } = professionalDesign

export function ProfessionalExperienceCard({
  experience,
  index,
  isHovered,
  onHover
}: ProfessionalExperienceCardProps) {
  const { isDark } = useTheme()
  const [isExpanded, setIsExpanded] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // カラーテーマ
  const cardTheme = {
    background: isDark 
      ? 'rgba(15, 23, 42, 0.95)' 
      : 'rgba(255, 255, 255, 0.95)',
    border: isDark 
      ? 'rgba(71, 85, 105, 0.2)' 
      : 'rgba(226, 232, 240, 0.5)',
    accent: experience.gradient?.from || experience.color,
    textPrimary: isDark ? colors.secondary[50] : colors.secondary[900],
    textSecondary: isDark ? colors.secondary[300] : colors.secondary[600],
    textMuted: isDark ? colors.secondary[400] : colors.secondary[500]
  }

  // ステータスカラー
  const getStatusColor = () => {
    switch (experience.status) {
      case 'ongoing': return colors.status.ongoing
      case 'completed': return colors.status.completed
      case 'planned': return colors.accent[500]
      case 'paused': return colors.secondary[400]
      default: return colors.secondary[400]
    }
  }

  // プライオリティレベル
  const getPriorityIcon = () => {
    switch (experience.priority) {
      case 'critical': return <Sparkles className="w-4 h-4" />
      case 'high': return <Star className="w-4 h-4" />
      case 'medium': return <TrendingUp className="w-4 h-4" />
      default: return <Target className="w-4 h-4" />
    }
  }

  // アニメーション設定
  const cardAnimations = {
    initial: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  return (
    <motion.article
      ref={cardRef}
      variants={cardAnimations}
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="relative group cursor-pointer"
      onMouseEnter={() => onHover(experience.id)}
      onMouseLeave={() => onHover(null)}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* メインカード */}
      <div
        className="relative overflow-hidden rounded-2xl border backdrop-blur-sm"
        style={{
          background: cardTheme.background,
          borderColor: cardTheme.border,
          boxShadow: isHovered ? shadows.elegant : shadows.professional,
          willChange: 'transform, box-shadow'
        }}
      >
        {/* 背景グラデーション */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            background: experience.gradient 
              ? `linear-gradient(135deg, ${experience.gradient.from}, ${experience.gradient.to})`
              : `linear-gradient(135deg, ${experience.color}, ${experience.color}90)`
          }}
        />

        {/* フィーチャードバッジ */}
        {experience.featured && (
          <div className="absolute top-4 right-4 z-10">
            <div 
              className="px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1"
              style={{
                background: `linear-gradient(135deg, ${colors.accent[500]}, ${colors.accent[600]})`,
                color: colors.secondary[50]
              }}
            >
              <Star className="w-3 h-3 fill-current" />
              Featured
            </div>
          </div>
        )}

        {/* ヘッダー部分 */}
        <div className="p-6 pb-4 relative z-10">
          <div className="flex items-start gap-4">
            {/* ロゴ */}
            <div className="relative flex-shrink-0">
              <div 
                className="w-16 h-16 rounded-xl overflow-hidden border shadow-md"
                style={{
                  borderColor: cardTheme.border
                }}
              >
                <Image
                  src={experience.logo}
                  alt={experience.title}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* ステータスインジケーター */}
              <div 
                className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center"
                style={{
                  backgroundColor: getStatusColor(),
                  borderColor: cardTheme.background
                }}
              >
                {experience.isActive && (
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                )}
              </div>
            </div>

            {/* タイトルと基本情報 */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 
                    className="text-lg font-bold truncate mb-1"
                    style={{ color: cardTheme.textPrimary }}
                  >
                    {experience.title}
                  </h3>
                  <p 
                    className="text-sm font-medium truncate"
                    style={{ color: cardTheme.textSecondary }}
                  >
                    {experience.position}
                  </p>
                </div>
                
                {/* プライオリティアイコン */}
                <div 
                  className="p-1.5 rounded-lg"
                  style={{
                    backgroundColor: isDark ? colors.secondary[800] : colors.secondary[100],
                    color: cardTheme.accent
                  }}
                >
                  {getPriorityIcon()}
                </div>
              </div>

              {/* 組織と場所 */}
              {experience.organization && (
                <div className="flex items-center gap-4 text-xs mb-3">
                  <div className="flex items-center gap-1">
                    <Briefcase className="w-3 h-3" />
                    <span style={{ color: cardTheme.textMuted }}>
                      {experience.organization}
                    </span>
                  </div>
                  {experience.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span style={{ color: cardTheme.textMuted }}>
                        {experience.location}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* 期間情報 */}
              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span style={{ color: cardTheme.textMuted }}>
                    {experience.displayDate}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span style={{ color: cardTheme.textMuted }}>
                    {professionalDesign.utils.responsiveSpacing(
                      `${experience.duration.totalMonths}ヶ月`,
                      `${experience.duration.years}年${experience.duration.months}ヶ月`
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 説明文 */}
        {experience.shortDescription && (
          <div className="px-6 pb-4">
            <p 
              className="text-sm line-clamp-2 leading-relaxed"
              style={{ color: cardTheme.textSecondary }}
            >
              {experience.shortDescription}
            </p>
          </div>
        )}

        {/* タグ */}
        {experience.tags && experience.tags.length > 0 && (
          <div className="px-6 pb-4">
            <div className="flex flex-wrap gap-2">
              {experience.tags.slice(0, 4).map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium"
                  style={{
                    backgroundColor: isDark ? colors.secondary[800] : colors.secondary[100],
                    color: cardTheme.textMuted
                  }}
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
              {experience.tags.length > 4 && (
                <span
                  className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium"
                  style={{
                    backgroundColor: isDark ? colors.secondary[700] : colors.secondary[200],
                    color: cardTheme.textMuted
                  }}
                >
                  +{experience.tags.length - 4}
                </span>
              )}
            </div>
          </div>
        )}

        {/* 進捗バー（アクティブなプロジェクト用） */}
        {experience.isActive && experience.progressPercentage > 0 && (
          <div className="px-6 pb-4">
            <div className="flex items-center justify-between text-xs mb-2">
              <span style={{ color: cardTheme.textMuted }}>進捗</span>
              <span 
                className="font-semibold"
                style={{ color: cardTheme.accent }}
              >
                {Math.round(experience.progressPercentage)}%
              </span>
            </div>
            <div 
              className="w-full h-2 rounded-full overflow-hidden"
              style={{
                backgroundColor: isDark ? colors.secondary[800] : colors.secondary[200]
              }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${cardTheme.accent}, ${cardTheme.accent}90)`
                }}
                initial={{ width: 0 }}
                animate={{ width: `${experience.progressPercentage}%` }}
                transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
              />
            </div>
          </div>
        )}

        {/* フッター */}
        <div className="px-6 py-4 border-t" style={{ borderColor: cardTheme.border }}>
          <div className="flex items-center justify-between">
            {/* アクション情報 */}
            <div className="flex items-center gap-3">
              {/* リンク数 */}
              {experience.links.length > 0 && (
                <div className="flex items-center gap-1 text-xs">
                  <ExternalLink className="w-3 h-3" />
                  <span style={{ color: cardTheme.textMuted }}>
                    {experience.links.length} link{experience.links.length > 1 ? 's' : ''}
                  </span>
                </div>
              )}

              {/* 実績数 */}
              {experience.achievements && experience.achievements.length > 0 && (
                <div className="flex items-center gap-1 text-xs">
                  <Award className="w-3 h-3" />
                  <span style={{ color: cardTheme.textMuted }}>
                    {experience.achievements.length} achievement{experience.achievements.length > 1 ? 's' : ''}
                  </span>
                </div>
              )}

              {/* チーム情報 */}
              {experience.team && (
                <div className="flex items-center gap-1 text-xs">
                  <Users className="w-3 h-3" />
                  <span style={{ color: cardTheme.textMuted }}>
                    {experience.team.size} member{experience.team.size > 1 ? 's' : ''}
                  </span>
                </div>
              )}
            </div>

            {/* 展開ボタン */}
            <button
              className="flex items-center gap-1 text-xs font-medium transition-all duration-200 hover:gap-2"
              style={{ color: cardTheme.accent }}
              onClick={(e) => {
                e.stopPropagation()
                setIsExpanded(!isExpanded)
              }}
            >
              {isExpanded ? 'Less' : 'More'}
              <ChevronRight 
                className={`w-3 h-3 transition-transform duration-200 ${
                  isExpanded ? 'rotate-90' : ''
                }`} 
              />
            </button>
          </div>
        </div>

        {/* ホバーオーバーレイ */}
        <div 
          className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
          style={{
            background: `linear-gradient(135deg, ${cardTheme.accent}08, ${cardTheme.accent}04)`
          }}
        />
      </div>

      {/* 展開コンテンツ */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <div 
              className="mt-4 p-6 rounded-2xl border backdrop-blur-sm"
              style={{
                background: cardTheme.background,
                borderColor: cardTheme.border,
                boxShadow: shadows.professional
              }}
            >
              {/* 詳細説明 */}
              {experience.description && (
                <div className="mb-6">
                  <h4 
                    className="text-sm font-semibold mb-3"
                    style={{ color: cardTheme.textPrimary }}
                  >
                    プロジェクト概要
                  </h4>
                  <p 
                    className="text-sm leading-relaxed"
                    style={{ color: cardTheme.textSecondary }}
                  >
                    {experience.description}
                  </p>
                </div>
              )}

              {/* 目標 */}
              {experience.objectives && experience.objectives.length > 0 && (
                <div className="mb-6">
                  <h4 
                    className="text-sm font-semibold mb-3"
                    style={{ color: cardTheme.textPrimary }}
                  >
                    プロジェクト目標
                  </h4>
                  <ul className="space-y-2">
                    {experience.objectives.map((objective, objIndex) => (
                      <li 
                        key={objIndex}
                        className="flex items-start gap-2 text-sm"
                        style={{ color: cardTheme.textSecondary }}
                      >
                        <Target className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: cardTheme.accent }} />
                        {objective}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* スキル */}
              {experience.primarySkills.length > 0 && (
                <div className="mb-6">
                  <h4 
                    className="text-sm font-semibold mb-3"
                    style={{ color: cardTheme.textPrimary }}
                  >
                    主要スキル
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {experience.primarySkills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium"
                        style={{
                          backgroundColor: isDark ? colors.secondary[800] : colors.secondary[100],
                          color: cardTheme.accent
                        }}
                      >
                        <Code className="w-3 h-3" />
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* リンク */}
              {experience.links.length > 0 && (
                <div>
                  <h4 
                    className="text-sm font-semibold mb-3"
                    style={{ color: cardTheme.textPrimary }}
                  >
                    関連リンク
                  </h4>
                  <div className="grid gap-2">
                    {experience.links.map((link, linkIndex) => (
                      <a
                        key={linkIndex}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-lg transition-all duration-200 hover:scale-[1.02]"
                        style={{
                          backgroundColor: isDark ? colors.secondary[800] : colors.secondary[50],
                          color: cardTheme.textSecondary
                        }}
                      >
                        <ExternalLink className="w-4 h-4" style={{ color: cardTheme.accent }} />
                        <span className="text-sm font-medium truncate">
                          {link.text || new URL(link.url).hostname}
                        </span>
                        {link.primary && (
                          <span 
                            className="px-2 py-0.5 rounded text-xs font-medium"
                            style={{
                              backgroundColor: cardTheme.accent,
                              color: colors.secondary[50]
                            }}
                          >
                            Primary
                          </span>
                        )}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  )
}