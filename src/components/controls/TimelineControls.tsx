'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import {
  Clock,
  Activity,
  Settings,
  ChevronDown,
  Timer,
  Zap,
  Battery
} from 'lucide-react'
import { useTranslation } from '../../contexts/TranslationContext'

interface TimelineControlsProps {
  highPrecisionTime: boolean
  onHighPrecisionChange: (enabled: boolean) => void
  isRealTimeEnabled: boolean
  onRealTimeToggle: (enabled: boolean) => void
}

export function TimelineControls({
  highPrecisionTime,
  onHighPrecisionChange,
  isRealTimeEnabled,
  onRealTimeToggle
}: TimelineControlsProps) {
  const { t } = useTranslation()
  const [isExpanded, setIsExpanded] = useState(false)

  const controlTheme = {
    background: 'rgba(15, 23, 42, 0.95)',
    border: 'rgba(71, 85, 105, 0.3)',
    text: 'rgb(248, 250, 252)',
    textMuted: 'rgb(148, 163, 184)'
  }

  const precisionModes = [
    {
      key: 'standard',
      label: t('standardMode'),
      description: t('standardModeDescription'),
      icon: Battery,
      enabled: !highPrecisionTime
    },
    {
      key: 'high',
      label: t('highPrecisionMode'),
      description: t('highPrecisionModeDescription'),
      icon: Zap,
      enabled: highPrecisionTime
    }
  ]

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 1 }}
    >
      {/* メインコントロールボタン */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-sm shadow-lg transition-all duration-200 hover:shadow-xl"
        style={{
          background: controlTheme.background,
          borderColor: controlTheme.border,
          color: controlTheme.text
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="flex items-center gap-2">
          {isRealTimeEnabled ? (
            <Activity className="w-4 h-4 text-green-500 animate-pulse" />
          ) : (
            <Clock className="w-4 h-4 text-gray-400" />
          )}
          <span className="text-sm font-medium">
            {isRealTimeEnabled ? t('realTimeDisplay') : t('staticDisplay')}
          </span>
        </div>

        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.button>

      {/* 展開コントロールパネル */}
      <motion.div
        initial={{ opacity: 0, height: 0, y: 10 }}
        animate={{
          opacity: isExpanded ? 1 : 0,
          height: isExpanded ? 'auto' : 0,
          y: isExpanded ? 0 : 10
        }}
        transition={{ duration: 0.3 }}
        className="mt-3 overflow-hidden"
      >
        <div
          className="p-4 rounded-xl border backdrop-blur-sm shadow-lg"
          style={{
            background: controlTheme.background,
            borderColor: controlTheme.border
          }}
        >
          {/* リアルタイム切り替え */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-3">
              <label
                className="text-sm font-medium flex items-center gap-2"
                style={{ color: controlTheme.text }}
              >
                <Settings className="w-4 h-4" />
                {t('realTimeUpdate')}
              </label>
              <button
                onClick={() => onRealTimeToggle(!isRealTimeEnabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors outline-none ${
                  isRealTimeEnabled ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isRealTimeEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            <p
              className="text-xs leading-relaxed"
              style={{ color: controlTheme.textMuted }}
            >
              {t('enableRealTimeDescription')}
            </p>
          </div>

          {/* 精度モード選択 */}
          {isRealTimeEnabled && (
            <div>
              <h4
                className="text-sm font-medium mb-3 flex items-center gap-2"
                style={{ color: controlTheme.text }}
              >
                <Timer className="w-4 h-4" />
                {t('updatePrecision')}
              </h4>

              <div className="space-y-2">
                {precisionModes.map((mode) => {
                  const Icon = mode.icon
                  return (
                    <button
                      key={mode.key}
                      onClick={() => onHighPrecisionChange(mode.key === 'high')}
                      className={`w-full p-3 rounded-lg border transition-all duration-200 text-left ${
                        mode.enabled
                          ? 'ring-2 ring-blue-500 border-blue-500'
                          : 'hover:border-gray-400'
                      }`}
                      style={{
                        background: mode.enabled
                          ? 'rgba(59, 130, 246, 0.1)'
                          : 'transparent',
                        borderColor: mode.enabled
                          ? 'rgb(59, 130, 246)'
                          : controlTheme.border
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <Icon
                          className={`w-4 h-4 mt-0.5 ${
                            mode.enabled ? 'text-blue-500' : 'text-gray-400'
                          }`}
                        />
                        <div>
                          <div
                            className="text-sm font-medium"
                            style={{ color: controlTheme.text }}
                          >
                            {mode.label}
                          </div>
                          <div
                            className="text-xs mt-1"
                            style={{ color: controlTheme.textMuted }}
                          >
                            {mode.description}
                          </div>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* 注意事項 */}
              {highPrecisionTime && (
                <div
                  className="mt-3 p-2 rounded-lg text-xs"
                  style={{
                    background: 'rgba(245, 158, 11, 0.1)',
                    color: 'rgb(245, 158, 11)'
                  }}
                >
                  {t('batteryWarning')}
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}