import type { Language } from '../../../translations'
import type { LocalizedAgentText } from './types'

export interface ChatPreset {
  id: string
  label: LocalizedAgentText
  question: LocalizedAgentText
  answer: LocalizedAgentText
  guideId?: string
}

export const chatPresets = [
  {
    id: 'who-rota',
    label: {
      ja: 'ROTAって何者？',
      en: 'Who is ROTA?',
    },
    question: {
      ja: 'ROTAって何者？',
      en: 'Who are you?',
    },
    answer: {
      ja: '僕は ROTA。rotare、「回るもの」から来た名前だよ。計算機魔法で、勇者のルートを照らしてる。詳しくは ROTA のページを見てみて。',
      en: 'I’m ROTA. The name comes from rotare, “to rotate.” A computational wizard keeping the hero’s route clear. The ROTA page has more if you want it.',
    },
    guideId: 'rota-route',
  },
  {
    id: 'recommend',
    label: {
      ja: 'おすすめは？',
      en: 'Any recs?',
    },
    question: {
      ja: 'おすすめは？',
      en: 'What do you recommend?',
    },
    answer: {
      ja: 'まず研究から見るのがいいよ。桂吾の芯が見えるし、そのあと制作や Wakabar を見ると、実装で世界を動かそうとしてる感じがつながる。',
      en: 'Start with the research. That shows Keigo’s core, and the making and Wakabar make more sense right after.',
    },
    guideId: 'first-visit-route',
  },
] as const satisfies readonly ChatPreset[]

export function getChatPreset(id: string): ChatPreset | undefined {
  return chatPresets.find((preset) => preset.id === id)
}

export function localizePresetText(text: LocalizedAgentText, language: Language): string {
  return text[language]
}
