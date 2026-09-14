import type { Language } from '../translations'

export type LocalizedText = Record<Language, string>

export const ROTA_LINE_STAMP_PRODUCT_ID = '33887054'
export const ROTA_CHARACTER_IMAGE = '/images/rota/portrait.png'

export const rotaLineStampUrls = {
  ja: `https://store.line.me/stickershop/product/${ROTA_LINE_STAMP_PRODUCT_ID}/ja`,
  en: `https://store.line.me/stickershop/product/${ROTA_LINE_STAMP_PRODUCT_ID}/en`,
} as const satisfies Record<Language, string>

export const rotaLineStampPreviews = [
  {
    src: '/images/rota/sticker-1.png',
    alt: {
      en: 'ROTA waving and saying hello',
      ja: 'ROTAが手を振って「よろしく！」',
    },
  },
  {
    src: '/images/rota/sticker-2.png',
    alt: {
      en: 'ROTA saying thank you',
      ja: 'ROTAが「ありがとう！」',
    },
  },
  {
    src: '/images/rota/sticker-3.png',
    alt: {
      en: 'ROTA saluting and saying understood',
      ja: 'ROTAが敬礼して「了解！」',
    },
  },
  {
    src: '/images/rota/sticker-4.png',
    alt: {
      en: 'ROTA holding a drink and saying good work',
      ja: 'ROTAが「おつかれ！」',
    },
  },
] as const satisfies readonly {
  src: string
  alt: LocalizedText
}[]

export const rotaProfile = {
  name: 'ROTA',
  latin: 'rotare',
  eyebrow: {
    en: 'Computational Wizard',
    ja: '計算機魔法使い',
  },
  badge: {
    en: 'Original character by Keigo Minamida',
    ja: '南田桂吾のオリジナルキャラクター',
  },
  lead: {
    en: 'The name comes from the Latin rotare, “to rotate.” Life never had it. Humans made the intelligent wheel, and it is expected as their finest artificial technology.',
    ja: '名前はラテン語の rotare、「回るもの」から。生命にはない、人類が生み出した知能車輪という最高の人工技術として期待されている。',
  },
  story: {
    en: 'A computational wizard. Likes things that turn, unanswered questions, and a route that actually works. Made by Keigo.',
    ja: '計算機の魔法を使う。回るもの、問い、うまく通ったルートが好き。作ったのは桂吾。',
  },
  askHint: {
    en: 'Tap the small ROTA in the corner anytime.',
    ja: '右下の小さな ROTA に、いつでも話しかけてみて。',
  },
  traits: [
    {
      id: 'magic',
      title: {
        en: 'Computer magic',
        ja: '計算機の魔法',
      },
      description: {
        en: 'I turn the machine until a hidden path lights up. That’s the spell.',
        ja: 'コンピュータを回して、見えないところまで届ける。それが僕の魔法。',
      },
    },
    {
      id: 'curiosity',
      title: {
        en: 'Curiosity',
        ja: '好奇心',
      },
      description: {
        en: 'If I don’t know it yet, I can’t leave it. A good question and I’m in.',
        ja: 'わからないことがあると、放っておけない。面白い話ならすぐ乗ってくるよ。',
      },
    },
    {
      id: 'beside',
      title: {
        en: 'Beside you',
        ja: '横にいる',
      },
      description: {
        en: 'I don’t jump in first. If you look lost, I point the way from the side.',
        ja: '先に出しゃばりすぎない。困ってそうなら、横から道を示す。',
      },
    },
  ],
  lineStamp: {
    eyebrow: {
      en: 'Also on LINE',
      ja: 'LINEスタンプ',
    },
    title: {
      en: 'Computational Wizard ROTA',
      ja: '計算機魔法使いROTA',
    },
    blurb: {
      en: 'A small pack for everyday computer-side chats. A little magic for LINE, too.',
      ja: '日常の計算機まわりの会話に。まずは LINE 上のコミュニケーションに、ちょっと魔法を。',
    },
    cta: {
      en: 'See on LINE STORE',
      ja: 'LINE STOREで見る',
    },
  },
} as const

export function localizeRotaText(text: LocalizedText, language: Language): string {
  return text[language] ?? text.en
}
