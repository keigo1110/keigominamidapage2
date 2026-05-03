export const SPRITE_SHEET_SRC = '/images/agent/portfolio-agent-spritesheet.webp';

export const SPRITE_SHEET = {
  width: 1536,
  height: 1872,
  frameWidth: 192,
  frameHeight: 208,
  columns: 8,
  rows: 9,
} as const;

export type SpriteDirection = 'left' | 'right';

export type SpriteFrame = Readonly<{
  column: number;
  row: number;
  durationMs?: number;
}>;

export type SpriteAnimation = Readonly<{
  frames: readonly SpriteFrame[];
  frameDurationMs: number;
  loop: boolean;
}>;

export type SpriteCell = Readonly<{
  column: number;
  row: number;
}>;

function frame(column: number, row: number, durationMs?: number): SpriteFrame {
  if (durationMs === undefined) {
    return { column, row };
  }

  return { column, row, durationMs };
}

function rowFrames(row: number, columns: readonly number[]): readonly SpriteFrame[] {
  return columns.map((column) => frame(column, row));
}

export const SPRITE_ANIMATIONS = {
  idle: {
    frames: [
      frame(0, 0, 1100),
      frame(1, 0, 180),
      frame(2, 0, 900),
      frame(3, 0, 900),
      frame(4, 0, 900),
      frame(5, 0, 180),
    ],
    frameDurationMs: 520,
    loop: true,
  },
  walk: {
    frames: rowFrames(1, [0, 1, 2, 3, 4, 5, 6, 7]),
    frameDurationMs: 90,
    loop: true,
  },
  wave: {
    frames: [
      frame(0, 3, 320),
      frame(1, 3),
      frame(2, 3),
      frame(3, 3),
      frame(3, 3),
      frame(2, 3),
      frame(1, 3),
    ],
    frameDurationMs: 180,
    loop: true,
  },
  point: {
    frames: [frame(2, 0, 260), frame(3, 0), frame(4, 0, 460), frame(3, 0)],
    frameDurationMs: 220,
    loop: true,
  },
  explain: {
    frames: [frame(2, 0, 260), frame(3, 0), frame(4, 0, 520), frame(3, 0), frame(2, 0)],
    frameDurationMs: 210,
    loop: true,
  },
  think: {
    frames: [frame(0, 5, 700), frame(1, 5, 600), frame(2, 5, 600), frame(3, 5, 900)],
    frameDurationMs: 360,
    loop: true,
  },
  thinking: {
    frames: [frame(0, 5, 700), frame(1, 5, 600), frame(2, 5, 600), frame(3, 5, 900)],
    frameDurationMs: 360,
    loop: true,
  },
  sleep: {
    frames: [frame(0, 6, 900), frame(1, 6, 900), frame(2, 6, 1200), frame(1, 6, 900)],
    frameDurationMs: 620,
    loop: true,
  },
  celebrate: {
    frames: [frame(0, 4), frame(1, 4), frame(2, 4), frame(3, 4), frame(4, 4, 320)],
    frameDurationMs: 120,
    loop: true,
  },
  talk: {
    frames: [frame(0, 6, 420), frame(1, 6), frame(2, 6), frame(3, 6, 360), frame(4, 6), frame(5, 6)],
    frameDurationMs: 240,
    loop: true,
  },
  cast: {
    frames: [...rowFrames(8, [0, 1, 2, 3, 4, 5]), ...rowFrames(8, [4, 3, 2, 1])],
    frameDurationMs: 140,
    loop: true,
  },
} as const satisfies Record<string, SpriteAnimation>;

export type SpriteAnimationName = keyof typeof SPRITE_ANIMATIONS;

export const DEFAULT_SPRITE_ANIMATION: SpriteAnimationName = 'idle';
export const DEFAULT_SPRITE_DIRECTION: SpriteDirection = 'right';
export const DEFAULT_SPRITE_SIZE = 96;

export function getSpriteAnimation(animationName: SpriteAnimationName): SpriteAnimation {
  return SPRITE_ANIMATIONS[animationName];
}

export function clampSpriteCell(frameToClamp: SpriteFrame): SpriteCell {
  return {
    column: Math.min(Math.max(Math.trunc(frameToClamp.column), 0), SPRITE_SHEET.columns - 1),
    row: Math.min(Math.max(Math.trunc(frameToClamp.row), 0), SPRITE_SHEET.rows - 1),
  };
}
