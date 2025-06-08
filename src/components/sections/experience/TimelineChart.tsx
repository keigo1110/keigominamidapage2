import { motion, AnimatePresence } from 'framer-motion'
import { ProcessedExperience } from '../../../types/experience'
import { TimelineBounds, groupExperiences, calculateGroupProjectPositions, GroupedExperience, ProjectPosition } from '../../../utils/experienceProcessor'
import { CurrentTimeIndicator } from './CurrentTimeIndicator'
import { Calendar, Clock, ExternalLink, Activity, GitBranch } from 'lucide-react'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { useTranslation } from '../../../contexts/TranslationContext'


interface TimelineChartProps {
  experiences: ProcessedExperience[]
  timelineBounds: TimelineBounds
  hoveredProject: string | null
  onProjectHover: (id: string | null) => void
}

export function TimelineChart({
  experiences,
  timelineBounds,
  hoveredProject,
  onProjectHover
}: TimelineChartProps) {
  const { t } = useTranslation()
  // ダークモード固定
  const isDark = true
  const [isClient, setIsClient] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [showCard, setShowCard] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const timelineRef = useRef<HTMLDivElement>(null)
  const hoverTimeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    setIsClient(true)
    const checkMobile = () => setIsMobile(window.innerWidth < 640)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // 最適化されたホバー処理
  const handleProjectHover = (projectId: string | null, event?: React.MouseEvent) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }

    if (projectId && event) {
      // マウス位置を記録 (デバウンス処理)
      setMousePosition({ x: event.clientX, y: event.clientY })

      // モバイルでは即座に表示、デスクトップでは短い遅延
      const delay = isMobile ? 0 : 200
      hoverTimeoutRef.current = setTimeout(() => {
        onProjectHover(projectId)
        setShowCard(true)
      }, delay)
    } else {
      // ホバー終了処理 - モバイルでは長めの遅延
      const exitDelay = isMobile ? 500 : 150
      hoverTimeoutRef.current = setTimeout(() => {
        onProjectHover(null)
        setShowCard(false)
      }, exitDelay)
    }
  }

  // 最適化されたカードエリアホバー処理
  const handleCardHover = (isEntering: boolean) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }

    if (!isEntering) {
      const exitDelay = isMobile ? 300 : 150
      hoverTimeoutRef.current = setTimeout(() => {
        onProjectHover(null)
        setShowCard(false)
      }, exitDelay)
    }
  }

  // クリーンアップ
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
    }
  }, [])

  // プロジェクトのグループ化
  const groupedExperiences = groupExperiences(experiences)

  // 年ラベル生成
  const generateTimeLabels = () => {
    const labels: Array<{ year: number; isYear: boolean }> = []
    const startYear = timelineBounds.startDate.getFullYear()
    const endYear = timelineBounds.endDate.getFullYear()

    for (let year = startYear; year <= endYear; year++) {
      labels.push({ year, isYear: true })
    }
    return labels
  }

  const yearLabels = generateTimeLabels()

  return (
    <div
      className="relative w-full"
      role="region"
      aria-label="経歴タイムライン"
      tabIndex={0}
    >
      {/* 年表示ヘッダー - レスポンシブ対応 */}
      <div className="flex justify-between items-center pb-4 sm:pb-6 mb-6 sm:mb-8 border-b border-gray-200/20 dark:border-gray-700/20">
        {yearLabels.map((label, index) => {
          const isCurrentYear = label.year === new Date().getFullYear()

          return (
            <motion.div
              key={label.year}
              className={`text-center flex-1 ${
                isCurrentYear
                  ? isDark ? 'text-blue-400 font-bold' : 'text-blue-600 font-bold'
                  : isDark ? 'text-gray-400' : 'text-gray-600'
              }`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-sm sm:text-base lg:text-xl font-semibold">{label.year}</div>
              {isCurrentYear && (
                <motion.div
                  className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full mx-auto mt-1 sm:mt-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                />
              )}
            </motion.div>
          )
        })}
      </div>

      {/* タイムライン本体 */}
      <div
        ref={timelineRef}
        className="relative"
        style={{
          minHeight: `${groupedExperiences.length * (isMobile ? 60 : 80) + 40}px`
        }}
      >
        {/* 背景グリッド */}
        <div className="absolute inset-0">
          {yearLabels.map((label, index) => (
            <div
              key={`year-${label.year}`}
              className={`absolute top-0 bottom-0 w-px ${
                label.year === new Date().getFullYear()
                  ? 'bg-blue-400/50'
                  : isDark ? 'bg-gray-700/30' : 'bg-gray-300/30'
              }`}
              style={{ left: `${(index / (yearLabels.length - 1)) * 100}%` }}
            />
          ))}
        </div>

        {/* プロジェクトバー */}
        <div className="relative z-10 py-2 sm:py-4">
          {groupedExperiences.map((group, groupIndex) => {
            const rowHeight = isMobile ? 60 : 80
            const projectPositions = calculateGroupProjectPositions(group, timelineBounds)

            const representative = group.experiences[0]
            if (!representative) return null
                            const displayTitle = representative.title || `${t('projectsLabel')} ${groupIndex + 1}`

            return (
              <motion.div
                key={group.group}
                className="relative flex items-center"
                style={{
                  height: `${rowHeight}px`,
                  marginBottom: isMobile ? '2px' : '4px'
                }}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: groupIndex * 0.05 }}
              >
                {/* プロジェクト情報 - モバイル対応 */}
                <div className="w-32 sm:w-40 lg:w-56 flex-shrink-0 pr-2 sm:pr-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-lg overflow-hidden shadow-sm border border-white/20">
                      <Image
                        src={group.logo}
                        alt={displayTitle}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`text-xs sm:text-sm lg:text-base font-semibold truncate flex items-center gap-1 sm:gap-2 ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        {isMobile ? displayTitle.slice(0, 8) + (displayTitle.length > 8 ? '...' : '') : displayTitle}
                        {group.experiences.length > 1 && !isMobile && (
                          <GitBranch className="w-3 h-3 opacity-60 flex-shrink-0" />
                        )}
                      </div>
                      {!isMobile && (
                        <div className={`text-xs lg:text-sm ${
                          isDark ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {group.experiences.length > 1
                            ? `${group.experiences.length}${t('periodsLabel')}`
                            : representative.displayDate
                          }
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* タイムラインバー領域 */}
                <div className="flex-1 relative" style={{ height: isMobile ? '30px' : '40px' }}>
                                    {projectPositions.map((projectPos, posIndex) => {
                    const isHovered = hoveredProject === projectPos.experience.id

                    return (
                      <div key={projectPos.experience.id} className="absolute inset-0">
                        {/* アクセシブルなホバー領域 */}
                        <div
                          className="absolute z-30 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 rounded"
                          style={{
                            left: `${Math.max(0, projectPos.leftPercent - (isMobile ? 2 : 1))}%`,
                            width: `${Math.min(100, projectPos.widthPercent + (isMobile ? 4 : 2))}%`,
                            top: isMobile ? '-12px' : '-8px',
                            bottom: isMobile ? '-12px' : '-8px'
                          }}
                          role="button"
                          tabIndex={0}
                          aria-label={`${projectPos.experience.title} の詳細を表示`}
                          onMouseEnter={!isMobile ? (e) => handleProjectHover(projectPos.experience.id, e) : undefined}
                          onMouseLeave={!isMobile ? () => handleProjectHover(null) : undefined}
                          onClick={isMobile ? (e) => handleProjectHover(projectPos.experience.id, e) : undefined}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault()
                              handleProjectHover(projectPos.experience.id, e)
                            }
                          }}
                        />

                        {/* プロジェクトバー */}
                        <div
                          className={`absolute top-1/2 -translate-y-1/2 ${isMobile ? 'h-5' : 'h-7'} border border-white/20 transition-all duration-200 ease-out ${
                            isHovered ? 'shadow-lg transform scale-105 z-20' : 'shadow-sm z-10'
                          } ${
                            projectPos.isOngoing ? 'rounded-l-lg' : 'rounded-lg'
                          }`}
                          style={{
                            left: `${projectPos.leftPercent}%`,
                            width: `${projectPos.widthPercent}%`,
                            backgroundColor: group.color,
                            opacity: isHovered ? 0.9 : (posIndex === 0 ? 0.8 : 0.6),
                            willChange: isHovered ? 'transform, box-shadow' : 'auto'
                          }}
                        >
                          {/* 進捗表示 */}
                          {projectPos.isActive && !projectPos.isOngoing && projectPos.progress > 0 && (
                            <div
                              className="absolute inset-y-0 left-0 bg-white/25 rounded-lg"
                              style={{ width: `${projectPos.progress}%` }}
                            />
                          )}

                          {/* ongoingの場合のアニメーション */}
                          {projectPos.isOngoing && (
                            <div className="absolute inset-0 bg-white/20 rounded-l-lg animate-pulse" />
                          )}

                          {/* ステータスインジケータ */}
                          {posIndex === 0 && (
                            <div className={`absolute ${isMobile ? '-left-1.5' : '-left-2'} top-1/2 -translate-y-1/2 ${isMobile ? 'w-3 h-3' : 'w-4 h-4'} rounded-full border-2 border-white shadow-sm transition-all duration-200 ${
                              projectPos.experience.status === 'completed' ? 'bg-green-500' :
                              projectPos.experience.status === 'ongoing' ? 'bg-blue-500' :
                              projectPos.isOngoing ? 'bg-orange-500' : 'bg-gray-400'
                            } ${isHovered ? 'scale-110' : ''}`} />
                          )}

                          {/* プロジェクトタイトル */}
                          {posIndex === 0 && projectPos.widthPercent > (isMobile ? 20 : 15) && (
                            <div className={`absolute inset-0 flex items-center ${isMobile ? 'px-2' : 'px-3'} text-white ${isMobile ? 'text-xs' : 'text-xs lg:text-sm'} font-medium truncate`}>
                              {isMobile ? displayTitle.slice(0, 6) + (displayTitle.length > 6 ? '..' : '') : displayTitle}
                              {projectPos.isOngoing && !isMobile && (
                                <span className="ml-2 text-xs opacity-75">{t('continuing')}</span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* 現在時刻インジケータ */}
        <CurrentTimeIndicator
          timelineBounds={timelineBounds}
          experiences={experiences.map(exp => ({
            startDate: exp.startDate,
            endDate: exp.endDate,
            status: exp.status
          }))}
        />
      </div>

      {/* プロフェッショナルなホバーカード */}
      <AnimatePresence>
        {isClient && showCard && hoveredProject && (() => {
          // ホバーされているプロジェクトを検索
          let hoveredProjectPos: ProjectPosition | null = null
          let hoveredGroup: GroupedExperience | null = null

          groupedExperiences.forEach((group) => {
            const projectPositions = calculateGroupProjectPositions(group, timelineBounds)
            const foundProject = projectPositions.find(p => p.experience.id === hoveredProject)
            if (foundProject) {
              hoveredProjectPos = foundProject
              hoveredGroup = group
            }
          })

          if (!hoveredProjectPos || !hoveredGroup) return null

          const hoveredExperience = (hoveredProjectPos as ProjectPosition).experience

          // 動的カードサイズ計算 - モバイル対応
          const baseCardWidth = isMobile ? Math.min(320, window.innerWidth - 32) : 360
          const baseCardHeight = isMobile ? 200 : 240
          const linkCount = hoveredExperience.links.length
          const hasProgress = (hoveredProjectPos as ProjectPosition).isActive && !(hoveredProjectPos as ProjectPosition).isOngoing

          // リンク数に応じた高さ調整
          const linkAreaHeight = Math.min(linkCount * (isMobile ? 36 : 44) + 40, isMobile ? 120 : 180)
          const cardHeight = baseCardHeight + (linkCount > 0 ? linkAreaHeight : 0) + (hasProgress ? 40 : 0)

          // カード位置の計算 - モバイル対応
          let cardX = isMobile ? 16 : mousePosition.x - baseCardWidth / 2
          let cardY = isMobile ? 100 : mousePosition.y - cardHeight - 20

          // 画面端調整
          const padding = 16
          if (!isMobile) {
            if (cardX < padding) cardX = padding
            if (cardX + baseCardWidth > window.innerWidth - padding) cardX = window.innerWidth - baseCardWidth - padding
            if (cardY < padding) cardY = mousePosition.y + 20
            if (cardY + cardHeight > window.innerHeight - padding) cardY = window.innerHeight - cardHeight - padding
          }

          return (
            <motion.div
              key={hoveredProject}
              role="dialog"
              aria-labelledby={`project-title-${hoveredProject}`}
              aria-describedby={`project-content-${hoveredProject}`}
              className={`fixed z-50 rounded-xl shadow-2xl border backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-blue-400/50 ${
                isDark
                  ? 'bg-gray-800/95 text-white border-gray-600/80'
                  : 'bg-white/95 text-gray-900 border-gray-200/80'
              }`}
              style={{
                left: `${cardX}px`,
                top: `${cardY}px`,
                width: `${baseCardWidth}px`,
                maxHeight: `${Math.min(cardHeight, window.innerHeight - 32)}px`
              }}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => handleCardHover(true)}
              onMouseLeave={() => handleCardHover(false)}
            >
              {/* ヘッダー */}
              <div className="p-4 border-b border-gray-200/30 dark:border-gray-700/30">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl overflow-hidden shadow-lg border border-white/20">
                    <Image
                      src={hoveredExperience.logo}
                      alt={hoveredExperience.title}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4
                      id={`project-title-${hoveredProject}`}
                      className="font-semibold text-lg line-clamp-1 mb-1"
                    >
                      {hoveredExperience.title}
                    </h4>
                    <p className="text-sm opacity-70 line-clamp-1">
                      {hoveredExperience.position}
                    </p>
                  </div>
                  {(hoveredGroup as GroupedExperience).experiences.length > 1 && (
                    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-blue-500/20 text-blue-400">
                      <GitBranch className="w-3 h-3" />
                      <span className="text-xs font-medium">
                        {(hoveredGroup as GroupedExperience).experiences.findIndex(e => e.id === hoveredExperience.id) + 1}/{(hoveredGroup as GroupedExperience).experiences.length}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* メインコンテンツエリア */}
              <div
                id={`project-content-${hoveredProject}`}
                className="p-4 space-y-4"
              >
                {/* 期間とステータス */}
                <div className="grid grid-cols-2 gap-3">
                  <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700/50' : 'bg-gray-100/50'}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="w-4 h-4 opacity-70" />
                      <span className="text-xs font-medium opacity-80">{t('duration')}</span>
                    </div>
                    <div className="text-sm font-semibold">
                      {hoveredExperience.displayDate}
                    </div>
                  </div>

                  <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700/50' : 'bg-gray-100/50'}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <Activity className="w-4 h-4 opacity-70" />
                      <span className="text-xs font-medium opacity-80">{t('status')}</span>
                    </div>
                    <div className={`text-sm font-semibold flex items-center gap-2 ${
                      (hoveredProjectPos as ProjectPosition).isOngoing ? 'text-orange-400' :
                      hoveredExperience.status === 'completed' ? 'text-green-400' :
                      hoveredExperience.status === 'ongoing' ? 'text-blue-400' :
                      'text-gray-400'
                    }`}>
                      <div className={`w-2 h-2 rounded-full ${
                        (hoveredProjectPos as ProjectPosition).isOngoing ? 'bg-orange-400 animate-pulse' :
                        hoveredExperience.status === 'completed' ? 'bg-green-400' :
                        hoveredExperience.status === 'ongoing' ? 'bg-blue-400' :
                        'bg-gray-400'
                      }`} />
                                              {(hoveredProjectPos as ProjectPosition).isOngoing ? t('continuing') :
                                       hoveredExperience.status === 'completed' ? t('completed') :
                hoveredExperience.status === 'ongoing' ? t('ongoing') : t('planned')}
                    </div>
                  </div>
                </div>

                {/* 進捗バー */}
                {hasProgress && (
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <div className="flex items-center gap-2 font-medium">
                        <Clock className="w-4 h-4" />
                        {t('progressStatus')}
                      </div>
                      <span className="font-bold text-blue-500">
                        {Math.round((hoveredProjectPos as ProjectPosition).progress)}%
                      </span>
                    </div>
                    <div className={`w-full h-2 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600"
                        initial={{ width: 0 }}
                        animate={{ width: `${(hoveredProjectPos as ProjectPosition).progress}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                )}

                {/* 関連リンク - 全リンク対応 */}
                {hoveredExperience.links.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 text-sm font-medium mb-3">
                      <ExternalLink className="w-4 h-4 opacity-70" />
                      <span>{t('relatedLinksWithCount')} ({hoveredExperience.links.length}{t('items')})</span>
                    </div>

                    {/* スクロール可能なリンクエリア */}
                    <div
                      className={`space-y-2 ${
                        linkCount > 4 ? 'max-h-40 overflow-y-auto pr-2' : ''
                      }`}
                      style={{
                        scrollbarWidth: 'thin',
                        scrollbarColor: isDark ? '#4B5563 #1F2937' : '#D1D5DB #F9FAFB'
                      }}
                    >
                      {hoveredExperience.links.map((link, index) => (
                        <motion.a
                          key={index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`group flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                            isDark
                              ? 'bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white'
                              : 'bg-gray-100/50 hover:bg-gray-200/50 text-gray-700 hover:text-gray-900'
                          } hover:scale-[1.02] hover:shadow-md border border-transparent hover:border-blue-400/30`}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          onClick={() => handleProjectHover(null)}
                        >
                          <div className="flex-shrink-0">
                            <ExternalLink className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm truncate">
                              {link.text || new URL(link.url).hostname}
                            </div>
                            {link.text && (
                              <div className="text-xs opacity-60 truncate">
                                {new URL(link.url).hostname}
                              </div>
                            )}
                          </div>
                          <div className="flex-shrink-0">
                            <div className="w-2 h-2 rounded-full bg-current opacity-30 group-hover:opacity-70 transition-opacity" />
                          </div>
                        </motion.a>
                      ))}
                    </div>

                    {/* スクロールヒント */}
                    {linkCount > 4 && (
                      <div className="text-xs opacity-50 text-center mt-2">
                        ↕ スクロールして他のリンクを表示
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* フッター装飾 */}
              <div className={`h-1 rounded-b-xl ${
                isDark
                  ? 'bg-gradient-to-r from-blue-400/60 to-purple-400/60'
                  : 'bg-gradient-to-r from-blue-500/60 to-purple-500/60'
              }`} />
            </motion.div>
          )
        })()}
      </AnimatePresence>
    </div>
  )
}