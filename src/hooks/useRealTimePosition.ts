'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

interface TimelineBounds {
  startDate: Date
  endDate: Date
}

interface RealTimePositionConfig {
  /** 更新間隔（ミリ秒）デフォルト: 60000ms (1分) */
  updateInterval?: number
  /** 高精度モード（秒単位更新）デフォルト: false */
  highPrecision?: boolean
  /** アニメーション有効 デフォルト: true */
  animated?: boolean
  /** 日付変更時の特別処理 デフォルト: true */
  handleMidnight?: boolean
}

export function useRealTimePosition(
  timelineBounds: TimelineBounds,
  config: RealTimePositionConfig = {}
) {
  const {
    updateInterval = 60000, // 1分
    highPrecision = false,
    animated = true,
    handleMidnight = true
  } = config

  const [currentDate, setCurrentDate] = useState(new Date())
  const [currentPosition, setCurrentPosition] = useState(0)
  const [isMoving, setIsMoving] = useState(false)
  
  const intervalRef = useRef<NodeJS.Timeout>()
  const midnightTimeoutRef = useRef<NodeJS.Timeout>()
  const lastPositionRef = useRef<number>(0)

  // 位置計算関数
  const calculatePosition = useCallback((date: Date): number => {
    const { startDate, endDate } = timelineBounds
    
    // タイムライン範囲外チェック
    if (date < startDate) return 0
    if (date > endDate) return 100
    
    const totalDuration = endDate.getTime() - startDate.getTime()
    const elapsed = date.getTime() - startDate.getTime()
    
    return Math.max(0, Math.min(100, (elapsed / totalDuration) * 100))
  }, [timelineBounds])

  // 位置更新関数
  const updatePosition = useCallback(() => {
    const now = new Date()
    const newPosition = calculatePosition(now)
    
    // 位置に変化があった場合のみ更新
    if (Math.abs(newPosition - lastPositionRef.current) > 0.001) {
      setIsMoving(true)
      setCurrentDate(now)
      setCurrentPosition(newPosition)
      lastPositionRef.current = newPosition
      
      // アニメーション終了後にisMovingをfalseに
      if (animated) {
        setTimeout(() => setIsMoving(false), 1000)
      } else {
        setIsMoving(false)
      }
    }
  }, [calculatePosition, animated])

  // 午前0時までの時間を計算
  const getTimeUntilMidnight = useCallback(() => {
    const now = new Date()
    const tomorrow = new Date(now)
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(0, 0, 0, 0)
    return tomorrow.getTime() - now.getTime()
  }, [])

  // メインエフェクト
  useEffect(() => {
    // 初回位置計算
    updatePosition()

    // 定期更新の設定
    const actualInterval = highPrecision ? 1000 : updateInterval // 高精度モードでは1秒間隔
    intervalRef.current = setInterval(updatePosition, actualInterval)

    // 午前0時の特別処理
    if (handleMidnight) {
      const msUntilMidnight = getTimeUntilMidnight()
      midnightTimeoutRef.current = setTimeout(() => {
        updatePosition()
        // 午前0時後は通常の間隔で更新を継続
      }, msUntilMidnight)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      if (midnightTimeoutRef.current) {
        clearTimeout(midnightTimeoutRef.current)
      }
    }
  }, [updatePosition, updateInterval, highPrecision, handleMidnight, getTimeUntilMidnight])

  // タイムラインバウンドが変更された時の再計算
  useEffect(() => {
    updatePosition()
  }, [timelineBounds, updatePosition])

  // 手動更新関数
  const forceUpdate = useCallback(() => {
    updatePosition()
  }, [updatePosition])

  // 相対的な進捗情報
  const getProgressInfo = useCallback(() => {
    const { startDate, endDate } = timelineBounds
    const now = currentDate
    
    const totalDuration = endDate.getTime() - startDate.getTime()
    const elapsed = now.getTime() - startDate.getTime()
    const remaining = endDate.getTime() - now.getTime()
    
    return {
      elapsed: Math.max(0, elapsed),
      remaining: Math.max(0, remaining),
      totalDuration,
      progressPercentage: currentPosition,
      isBeforeStart: now < startDate,
      isAfterEnd: now > endDate,
      isWithinRange: now >= startDate && now <= endDate
    }
  }, [timelineBounds, currentDate, currentPosition])

  // フォーマット済み時刻情報
  const getFormattedTime = useCallback(() => {
    return {
      date: currentDate.toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      time: currentDate.toLocaleTimeString('ja-JP', {
        hour: '2-digit',
        minute: '2-digit',
        second: highPrecision ? '2-digit' : undefined,
        hour12: false
      }),
      iso: currentDate.toISOString(),
      relative: getRelativeTimeString(currentDate)
    }
  }, [currentDate, highPrecision])

  return {
    // 基本データ
    currentDate,
    currentPosition,
    isMoving,
    
    // 計算情報
    progressInfo: getProgressInfo(),
    formattedTime: getFormattedTime(),
    
    // 制御関数
    forceUpdate,
    
    // 設定情報
    config: {
      updateInterval: highPrecision ? 1000 : updateInterval,
      highPrecision,
      animated,
      handleMidnight
    }
  }
}

// 相対時間文字列生成
function getRelativeTimeString(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMinutes = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMinutes / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (Math.abs(diffMinutes) < 1) return '今'
  if (Math.abs(diffMinutes) < 60) return `${Math.abs(diffMinutes)}分${diffMinutes > 0 ? '前' : '後'}`
  if (Math.abs(diffHours) < 24) return `${Math.abs(diffHours)}時間${diffHours > 0 ? '前' : '後'}`
  return `${Math.abs(diffDays)}日${diffDays > 0 ? '前' : '後'}`
}

// 高精度リアルタイム位置フック（秒単位更新）
export function useHighPrecisionRealTimePosition(timelineBounds: TimelineBounds) {
  return useRealTimePosition(timelineBounds, {
    highPrecision: true,
    updateInterval: 1000,
    animated: true,
    handleMidnight: true
  })
}

// 省電力リアルタイム位置フック（長い間隔）
export function usePowerSavingRealTimePosition(timelineBounds: TimelineBounds) {
  return useRealTimePosition(timelineBounds, {
    highPrecision: false,
    updateInterval: 300000, // 5分
    animated: false,
    handleMidnight: true
  })
}