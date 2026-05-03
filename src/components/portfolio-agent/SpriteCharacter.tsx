'use client'

import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import {
  DEFAULT_SPRITE_ANIMATION,
  DEFAULT_SPRITE_DIRECTION,
  DEFAULT_SPRITE_SIZE,
  SPRITE_SHEET,
  SPRITE_SHEET_SRC,
  clampSpriteCell,
  getSpriteAnimation,
  type SpriteAnimationName,
  type SpriteDirection,
  type SpriteFrame,
} from './spriteConfig';

type SpriteCharacterProps = Readonly<{
  animation?: SpriteAnimationName;
  direction?: SpriteDirection;
  size?: number;
  isPaused?: boolean;
  className?: string;
  style?: CSSProperties;
  ariaLabel?: string;
}>;

const FALLBACK_FRAME: SpriteFrame = { column: 0, row: 0 };

type SpriteFrameState = Readonly<{
  animation: SpriteAnimationName;
  cursor: number;
}>;

function clampDisplaySize(size: number): number {
  if (!Number.isFinite(size) || size <= 0) {
    return DEFAULT_SPRITE_SIZE;
  }

  return size;
}

function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return prefersReducedMotion;
}

export function SpriteCharacter({
  animation = DEFAULT_SPRITE_ANIMATION,
  direction = DEFAULT_SPRITE_DIRECTION,
  size = DEFAULT_SPRITE_SIZE,
  isPaused = false,
  className,
  style,
  ariaLabel,
}: SpriteCharacterProps) {
  const [frameState, setFrameState] = useState<SpriteFrameState>(() => ({
    animation,
    cursor: 0,
  }));
  const prefersReducedMotion = usePrefersReducedMotion();
  const spriteAnimation = getSpriteAnimation(animation);
  const frameCursor = frameState.animation === animation ? frameState.cursor : 0;
  const activeFrame = spriteAnimation.frames[frameCursor] ?? spriteAnimation.frames[0] ?? FALLBACK_FRAME;
  const spriteCell = clampSpriteCell(activeFrame);
  const displayWidth = clampDisplaySize(size);
  const scale = displayWidth / SPRITE_SHEET.frameWidth;
  const displayHeight = SPRITE_SHEET.frameHeight * scale;
  const shouldAnimate = !isPaused && !prefersReducedMotion && spriteAnimation.frames.length > 1;

  useEffect(() => {
    if (!shouldAnimate) {
      return;
    }

    const currentFrame = spriteAnimation.frames[frameCursor] ?? spriteAnimation.frames[0] ?? FALLBACK_FRAME;
    const timeoutMs = currentFrame.durationMs ?? spriteAnimation.frameDurationMs;
    const timeoutId = window.setTimeout(() => {
      setFrameState((currentState) => {
        const currentCursor = currentState.animation === animation ? currentState.cursor : 0;
        const nextCursor = currentCursor + 1;

        if (nextCursor < spriteAnimation.frames.length) {
          return { animation, cursor: nextCursor };
        }

        return {
          animation,
          cursor: spriteAnimation.loop ? 0 : currentCursor,
        };
      });
    }, timeoutMs);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [animation, frameCursor, shouldAnimate, spriteAnimation]);

  const backgroundWidth = SPRITE_SHEET.width * scale;
  const backgroundHeight = SPRITE_SHEET.height * scale;
  const backgroundX = spriteCell.column * SPRITE_SHEET.frameWidth * scale;
  const backgroundY = spriteCell.row * SPRITE_SHEET.frameHeight * scale;

  return (
    <div
      aria-hidden={ariaLabel ? undefined : true}
      aria-label={ariaLabel}
      className={`relative inline-block shrink-0 overflow-hidden select-none ${className ?? ''}`}
      role={ariaLabel ? 'img' : undefined}
      style={{
        width: displayWidth,
        height: displayHeight,
        ...style,
      }}
    >
      <div
        className="absolute inset-0 bg-no-repeat will-change-[background-position]"
        style={{
          width: displayWidth,
          height: displayHeight,
          backgroundImage: `url("${SPRITE_SHEET_SRC}")`,
          backgroundPosition: `-${backgroundX}px -${backgroundY}px`,
          backgroundSize: `${backgroundWidth}px ${backgroundHeight}px`,
          imageRendering: 'auto',
          backfaceVisibility: 'hidden',
          transform: direction === 'left' ? 'scaleX(-1)' : 'scaleX(1)',
          transformOrigin: 'center bottom',
          willChange: 'background-position, transform',
        }}
      />
    </div>
  );
}
