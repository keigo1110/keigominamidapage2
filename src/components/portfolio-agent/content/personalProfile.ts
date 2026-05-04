import type { Language } from '../../../translations'

type LocalizedText = Record<Language, string>
type LocalizedList = Record<Language, readonly string[]>

interface PersonalProfileEntry {
  id: string
  title: LocalizedText
  tags: readonly string[]
  keywords: LocalizedList
  body: LocalizedText
  useWhen: LocalizedText
}

interface ScoredPersonalProfileEntry {
  entry: PersonalProfileEntry
  score: number
}

const personalQuestionKeywords = {
  en: [
    'favorite',
    'food',
    'manga',
    'comic',
    'like',
    'taste',
    'hobby',
    'personal',
    'personality',
    'who',
    'what kind of person',
    'off-work',
    'outside work',
    'daily',
    'life',
    'drink',
    'snack',
    'gummy',
    'onsen',
    'hot spring',
    'midnight',
    'dawn',
    'walk',
    'walking',
    'reading',
    'book',
    'influence',
    'value',
    'values',
    'making',
    'craft',
    'grounding',
    'team',
    'leadership',
    'strategist',
    'weakness',
    'birthday',
    'birth',
    'osaka',
  ],
  ja: [
    '好き',
    '好み',
    '食べ',
    '食べ物',
    '漫画',
    'マンガ',
    '趣味',
    '人柄',
    'どんな人',
    'どんなひと',
    '人物',
    '性格',
    '個人',
    'プロフィール',
    'プライベート',
    '仕事以外',
    '普段',
    '日常',
    '暮らし',
    '飲み物',
    '飲む',
    'お菓子',
    'グミ',
    '温泉',
    '深夜',
    '真夜中',
    '明け方',
    '散歩',
    '歩く',
    '読書',
    '本',
    '影響',
    'こだわり',
    '習慣',
    'リフレッシュ',
    '価値観',
    '制作',
    'ものづくり',
    '手を動かす',
    '現場',
    '一人で考える',
    '接地',
    'グラウンディング',
    '現実',
    'チーム',
    '共同制作',
    'リーダー',
    'リーダーシップ',
    '参謀',
    '苦手',
    '頼る',
    '誕生日',
    '生年月日',
    '大阪',
    '大阪弁',
  ],
} as const satisfies LocalizedList

export const personalProfileConfig = {
  disclosurePolicy: {
    en: [
      'Use personal profile entries only when the visitor explicitly asks about Keigo’s personal tastes or off-work profile.',
      'Do not proactively bring personal profile entries into research, work, project, or navigation answers.',
      'Use the entry body as natural background. Do not reduce it to a one-question-one-answer fact.',
      'Never invent personal preferences, family details, private history, addresses, contact details, or health information.',
      'If the visitor asks about a personal topic that has no retrieved entry, answer naturally that ROTA has not heard it yet and will ask Keigo later. Vary the wording.',
    ],
    ja: [
      '個人プロフィールは、ユーザが好みや仕事外のプロフィールを明確に聞いた時だけ使う。',
      '研究、仕事、プロジェクト、案内の返答には、ROTA から勝手に混ぜない。',
      '本文は自然な背景情報として使う。一問一答の固定回答にはしない。',
      '好み、家族、私生活、住所、連絡先、健康情報などを勝手に作らない。',
      '個人的な話題を聞かれても該当メモがない時は、「まだ聞けてない」「今度桂吾に聞いとくね」くらいの自然な言い方で返す。毎回同じ文にしない。',
    ],
  },
  unknownPersonalAnswer: {
    en: "Use a short natural variant of: I haven't heard that one yet, so I'll ask Keigo later.",
    ja: '「まだ聞けてないな」「今度桂吾に聞いとくね」くらいの自然な短い返し。固定文にしない。',
  },
  entries: [
    {
      id: 'personal-overview',
      title: {
        en: 'Personal overview',
        ja: '人柄の概要',
      },
      tags: ['overview', 'personality', 'off-work', 'hobby', 'taste'],
      keywords: {
        en: [
          'personal',
          'personality',
          'profile',
          'off-work',
          'outside work',
          'what kind of person',
          'who is keigo',
          'daily life',
          'hobby',
          'taste',
        ],
        ja: [
          '人柄',
          'どんな人',
          'どんなひと',
          '人物',
          '性格',
          '個人プロフィール',
          '仕事以外',
          '普段',
          '日常',
          '趣味',
          '好み',
        ],
      },
      body: {
        en: 'Outside research and making, Keigo feels like someone who loosens thought through concrete rhythms: running to an onsen, walking when stuck, reading widely, and enjoying quiet midnight-to-dawn hours. His tastes have texture too: sukiyaki, tororo, drinkable yogurt, hard gummies, and Medalist all point to warmth, persistence, embodiment, and craft.',
        ja: '研究や制作から離れた桂吾は、身体のリズムで思考をほどくタイプに見える。詰まったら歩くし、温泉まで走ってゆるむし、真夜中から明け方の静けさも好き。本をよく読み、すき焼き、とろろ、飲むヨーグルト、ハードグミ、『メダリスト』みたいに、食感・熱量・身体性・執念があるものに惹かれている感じがある。',
      },
      useWhen: {
        en: 'Use for broad questions about Keigo’s personality, off-work profile, hobbies, everyday rhythm, or general personal vibe.',
        ja: '桂吾の人柄、仕事以外のプロフィール、趣味、日常のリズム、全体的な雰囲気を聞かれた時に使う。',
      },
    },
    {
      id: 'favorite-food-sukiyaki',
      title: {
        en: 'Favorite food: Sukiyaki',
        ja: '好きな食べ物: すき焼き',
      },
      tags: ['food', 'favorite', 'taste'],
      keywords: {
        en: ['sukiyaki', 'food', 'favorite food', 'eat', 'meal'],
        ja: ['すき焼き', '食べ物', '好きな食べ物', 'ご飯', '料理'],
      },
      body: {
        en: 'Keigo likes sukiyaki. It is not only the taste: he likes how the sweet-savory broth, beef, vegetables, tofu, and egg come together into one shared table experience. It feels warm, generous, and a little special without being formal.',
        ja: '桂吾の好きな食べ物はすき焼き。甘じょっぱい割下、肉、野菜、豆腐、卵が一つの鍋でまとまっていく感じが良いらしい。味だけじゃなくて、同じ鍋を囲むあたたかさと、ちょっと特別な日の感じがあるところが好き。',
      },
      useWhen: {
        en: 'Use when asked about food, favorite meals, or personal taste.',
        ja: '食べ物、好きな料理、好みを聞かれた時に使う。',
      },
    },
    {
      id: 'making-values-hands-site-thinking',
      title: {
        en: 'Making values: hands, site, and solo thinking',
        ja: '制作の価値観: 手を動かす・現場に居合わせる・一人で考える',
      },
      tags: ['values', 'making', 'craft', 'thinking', 'site'],
      keywords: {
        en: [
          'value',
          'values',
          'making',
          'craft',
          'hands-on',
          'hands',
          'site',
          'field',
          'solo thinking',
          'thinking alone',
          'ai',
        ],
        ja: [
          '価値観',
          '制作',
          'ものづくり',
          '手を動かす',
          '手',
          '現場',
          '居合わせる',
          '一人で考える',
          'ひとりで考える',
          'AI',
        ],
      },
      body: {
        en: 'Keigo values moving his hands in making. He also cares about being present at the actual site where things happen. Even in an age where it is easy to ask AI right away, he thinks time spent thinking alone still matters.',
        ja: '桂吾は制作では手を動かすことを大事にしている。それと、現場に居合わせること。今はすぐ AI に聞ける時代だけど、それでも一人で考える時間は大事だと思っている。',
      },
      useWhen: {
        en: 'Use when asked about values, making style, how Keigo thinks, or his stance toward AI and hands-on work.',
        ja: '価値観、制作姿勢、考え方、AIとの距離感、手を動かすことについて聞かれた時に使う。',
      },
    },
    {
      id: 'making-feeling-grounded-reality',
      title: {
        en: 'Making joy: grounded links to reality',
        ja: '制作で気持ちいい瞬間: 現実とリンクして動く',
      },
      tags: ['making', 'grounding', 'reality', 'implementation', 'craft'],
      keywords: {
        en: [
          'making',
          'joy',
          'good moment',
          'grounding',
          'grounded',
          'reality',
          'real world',
          'implementation',
          'link',
        ],
        ja: [
          '制作',
          '気持ちいい',
          '楽しい',
          '現実',
          'リンク',
          '接地',
          'グラウンディング',
          '動いた',
          '実装',
        ],
      },
      body: {
        en: 'In making, Keigo feels the best moment when something links back to reality and actually moves. The key word is grounding: an idea, system, sensor, or interface becomes satisfying when it touches the real world instead of staying abstract.',
        ja: '制作で桂吾が気持ちいいと感じるのは、現実とリンクして動いた時。キーワードは接地、グラウンディング。概念やシステムやセンサーやUIが、抽象のままではなく現実に触れて動く瞬間にかなり気持ちよさがある。',
      },
      useWhen: {
        en: 'Use when asked what Keigo enjoys in making, implementation, physical computing, or grounded interaction.',
        ja: '制作の楽しさ、実装、フィジカルコンピューティング、現実とつながる体験について聞かれた時に使う。',
      },
    },
    {
      id: 'growth-learning-to-rely-on-others',
      title: {
        en: 'Growth edge: Learning to rely on others',
        ja: '向き合っていること: 人に頼ること',
      },
      tags: ['growth', 'weakness', 'team', 'collaboration'],
      keywords: {
        en: [
          'weakness',
          'growth',
          'challenge',
          'rely',
          'ask for help',
          'collaboration',
          'team',
          'do it myself',
        ],
        ja: [
          '苦手',
          '向き合っている',
          '成長',
          '頼る',
          '人に頼る',
          '関わる',
          'チーム',
          '共同制作',
          '自分でやる',
        ],
      },
      body: {
        en: 'Keigo tends to do things himself, so he is consciously working on involving and relying on other people. He knows there are many things one person cannot do alone, and that is exactly why collaboration is an active growth point for him.',
        ja: '桂吾は結構自分でやっちゃうタイプ。だからこそ、いろんな人と関わったり、人に頼ったりすることを意識して頑張っている。一人じゃできないことも多いから、協働は桂吾にとってちゃんと向き合っているテーマ。',
      },
      useWhen: {
        en: 'Use when asked about weaknesses, growth, collaboration, asking for help, or what Keigo is working on personally.',
        ja: '苦手なこと、成長課題、協働、人に頼ること、個人的に向き合っていることを聞かれた時に使う。',
      },
    },
    {
      id: 'team-role-leader-strategist',
      title: {
        en: 'Team role: Leader and strategist',
        ja: 'チームでの立ち回り: リーダーシップと参謀',
      },
      tags: ['team', 'leadership', 'strategy', 'collaboration'],
      keywords: {
        en: [
          'team',
          'collaboration',
          'leadership',
          'leader',
          'strategist',
          'advisor',
          'role',
          'frontline',
        ],
        ja: [
          'チーム',
          '共同制作',
          '立ち回り',
          'リーダーシップ',
          'リーダー',
          '参謀',
          '役割',
          '前線',
        ],
      },
      body: {
        en: 'In teams, Keigo tends to be a leader-strategist hybrid. He can show leadership, but he is not usually the type to stand at the very front and perform. He is closer to the person who reads the situation, shapes the direction, and helps the team move.',
        ja: 'チームや共同制作では、桂吾はリーダーシップを発揮しつつ参謀的な立ち回りになりがち。最前線に出てパフォーマンスするというより、状況を読んで、方向を整えて、チームを動かす側に近い。',
      },
      useWhen: {
        en: 'Use when asked about team role, leadership, collaboration style, or how Keigo works with others.',
        ja: 'チームでの役割、リーダーシップ、共同制作、他人との関わり方を聞かれた時に使う。',
      },
    },
    {
      id: 'origin-birthday-osaka',
      title: {
        en: 'Origin and birthday',
        ja: '出身と誕生日',
      },
      tags: ['origin', 'birthday', 'osaka', 'profile'],
      keywords: {
        en: [
          'birthday',
          'birth',
          'born',
          'origin',
          'hometown',
          'osaka',
          'kansai',
          'profile',
        ],
        ja: [
          '誕生日',
          '生年月日',
          '生まれ',
          '出身',
          '大阪',
          '関西',
          '大阪弁',
          'プロフィール',
        ],
      },
      body: {
        en: 'Keigo is from Osaka, but he worries a little that his Osaka dialect does not come out much anymore. His birthday is November 10, 2001.',
        ja: '桂吾は大阪出身。ただ、大阪弁が出なくなってきたことをちょっと悩んでいる。誕生日は2001年11月10日。',
      },
      useWhen: {
        en: 'Use when asked about birthplace, hometown, Osaka, dialect, birthday, or basic personal profile.',
        ja: '出身、大阪、大阪弁、誕生日、生年月日、基本プロフィールを聞かれた時に使う。',
      },
    },
    {
      id: 'favorite-food-tororo-soba',
      title: {
        en: 'Favorite food: Tororo soba',
        ja: '好きな食べ物: とろろ蕎麦',
      },
      tags: ['food', 'favorite', 'taste', 'texture'],
      keywords: {
        en: ['tororo', 'tororo soba', 'soba', 'yam', 'food', 'noodle'],
        ja: ['とろろ', 'とろろ蕎麦', 'とろろそば', '蕎麦', 'そば', '山芋', '長芋'],
      },
      body: {
        en: 'Keigo likes tororo soba. More precisely, he likes tororo itself: it feels refreshing, but still has real body and satisfaction. He describes it as somewhere between eating and drinking, which is a very Keigo kind of observation.',
        ja: '桂吾はとろろ蕎麦が好き。というか、とろろそのものが好きらしい。さっぱりしているのに食べ応えがあって、飲み応えみたいな感覚もある。その「食べる」と「飲む」の間みたいな感じに惹かれているのが、かなり桂吾っぽい。',
      },
      useWhen: {
        en: 'Use when asked about food, favorite meals, texture, or why Keigo likes tororo.',
        ja: '食べ物、好きな料理、とろろのどこが好きかを聞かれた時に使う。',
      },
    },
    {
      id: 'current-drink-drinkable-yogurt',
      title: {
        en: 'Current drink: Drinkable yogurt',
        ja: '最近ハマっている飲み物: 飲むヨーグルト',
      },
      tags: ['drink', 'favorite', 'current'],
      keywords: {
        en: ['drinkable yogurt', 'yogurt', 'drink', 'favorite drink', 'current favorite'],
        ja: ['飲むヨーグルト', 'ヨーグルト', '飲み物', '最近ハマっている', 'ハマってる'],
      },
      body: {
        en: 'Keigo is currently into drinkable yogurt. ROTA does not need to make this grand: it is just a nice casual preference, something smooth and easy to reach for.',
        ja: '桂吾は最近、飲むヨーグルトにハマっている。大げさな理由というより、さらっと飲めて満足感もある、今のちょうどいい定番みたいな感じ。',
      },
      useWhen: {
        en: 'Use when asked about drinks, recent favorites, or casual preferences.',
        ja: '飲み物、最近ハマっているもの、何気ない好みを聞かれた時に使う。',
      },
    },
    {
      id: 'favorite-snack-hard-gummies',
      title: {
        en: 'Favorite snack: Hard gummies',
        ja: '好きなお菓子: ハードなグミ',
      },
      tags: ['snack', 'gummy', 'favorite', 'texture'],
      keywords: {
        en: ['gummy', 'gummies', 'hard gummy', 'snack', 'candy'],
        ja: ['グミ', 'ハードグミ', '硬いグミ', 'お菓子', 'おやつ'],
      },
      body: {
        en: 'Keigo likes gummies, especially harder ones. The appeal is probably the chew and resistance: a small snack that gives the mouth something to work on.',
        ja: '桂吾はお菓子だとグミが好き。特にハードなやつが好きで、噛みごたえや抵抗感があるところが良いらしい。ちょっと思考のテンポを刻むお菓子、という感じもある。',
      },
      useWhen: {
        en: 'Use when asked about snacks, candy, gummies, or texture preferences.',
        ja: 'お菓子、グミ、食感の好みを聞かれた時に使う。',
      },
    },
    {
      id: 'favorite-manga-medalist',
      title: {
        en: 'Favorite manga: Medalist',
        ja: '好きな漫画: メダリスト',
      },
      tags: ['manga', 'favorite', 'culture', 'craft'],
      keywords: {
        en: ['medalist', 'manga', 'comic', 'favorite manga', 'favorite work'],
        ja: ['メダリスト', '漫画', 'マンガ', '好きな漫画', '好きな作品'],
      },
      body: {
        en: 'Keigo likes the manga Medalist. He is especially encouraged by protagonist Inori’s fierce commitment to what she wants to do. The story’s heat around practice, craft, embodiment, and growth seems to resonate with his own way of approaching research and making.',
        ja: '桂吾は漫画『メダリスト』が好き。特に、主人公のいのりさんが「自分のやりたいこと」に向ける執念にいつも勇気づけられている。練習、技術、身体性、成長への熱が、桂吾の研究や制作への向き合い方とも響き合っている感じがある。',
      },
      useWhen: {
        en: 'Use when asked about manga, favorite works, culture, or what kind of stories Keigo likes.',
        ja: '漫画、好きな作品、カルチャー、好きな物語を聞かれた時に使う。',
      },
    },
    {
      id: 'refresh-onsen-run',
      title: {
        en: 'Refresh habit: Running to an onsen',
        ja: 'リフレッシュ習慣: 温泉まで走る',
      },
      tags: ['habit', 'refresh', 'onsen', 'running'],
      keywords: {
        en: ['onsen', 'hot spring', 'refresh', 'run', 'running', 'relax'],
        ja: ['温泉', '源泉かけ流し', 'リフレッシュ', '走る', 'ランニング', 'ゆったり'],
      },
      body: {
        en: 'For refresh, Keigo often goes to a nearby free-flowing onsen. He tends to run about 3 km there, then relax slowly. It feels very him: move the body first, then let the mind loosen.',
        ja: 'リフレッシュにはよく温泉に行く。近くに源泉かけ流しの場所があって、3kmくらい走って行ってからゆったりすることが多い。まず身体を動かして、それから思考をほどく感じが桂吾らしい。',
      },
      useWhen: {
        en: 'Use when asked about refreshing, relaxing, exercise, onsen, or off-work routines.',
        ja: 'リフレッシュ、休み方、運動、温泉、仕事外の習慣を聞かれた時に使う。',
      },
    },
    {
      id: 'favorite-time-midnight-dawn',
      title: {
        en: 'Favorite time: Midnight to dawn',
        ja: '好きな時間帯: 真夜中から明け方',
      },
      tags: ['time', 'night', 'dawn', 'work-style'],
      keywords: {
        en: ['midnight', 'dawn', 'night', 'all-nighter', 'typing', 'writing', 'quiet'],
        ja: ['真夜中', '深夜', '明け方', '徹夜', 'タイピング', 'ペン', '静か', '好きな時間'],
      },
      body: {
        en: 'Keigo likes the stretch from midnight to dawn. He likes the quiet city, the sound of typing, and the feeling of a pen moving while everything else has settled down. Dawn also gives him that sense that a new day is about to begin, though it does reveal that he often stays up all night.',
        ja: '桂吾は真夜中から明け方が好き。街中が静まった中で、パソコンのタイピング音やペンが走る感じがたまらないらしい。明け方の「これから1日が始まる」感じも好き。ただ、よく徹夜しているのもわかっちゃうね。',
      },
      useWhen: {
        en: 'Use when asked about favorite time, work rhythm, night, dawn, or creative atmosphere.',
        ja: '好きな時間帯、作業リズム、夜、明け方、創作の空気感を聞かれた時に使う。',
      },
    },
    {
      id: 'thinking-habit-walking',
      title: {
        en: 'Thinking habit: Walking when stuck',
        ja: '思考習慣: 詰まったら歩く',
      },
      tags: ['habit', 'thinking', 'walking', 'refresh'],
      keywords: {
        en: ['walk', 'walking', 'stuck', 'thinking', 'block', 'idea'],
        ja: ['歩く', '散歩', '詰まる', '思考', '作業', '止まった', 'アイデア'],
      },
      body: {
        en: 'When Keigo’s work or thinking gets stuck, he tries to walk. Walking seems to loosen the blockage: it changes the rhythm enough for thought to start moving again.',
        ja: '作業や思考が止まったら、桂吾は歩くことを意識している。歩くと詰まりが少し緩む感じがあるらしい。リズムを変えることで、止まっていた考えがまた動き出すみたいね。',
      },
      useWhen: {
        en: 'Use when asked about habits, thinking style, how Keigo handles blocks, or idea generation.',
        ja: '習慣、思考法、詰まった時の対処、アイデアの出し方を聞かれた時に使う。',
      },
    },
    {
      id: 'hobby-reading-influences',
      title: {
        en: 'Hobby and influences: Reading',
        ja: '趣味と影響: 読書',
      },
      tags: ['reading', 'books', 'philosophy', 'influence', 'culture'],
      keywords: {
        en: [
          'reading',
          'book',
          'books',
          'influence',
          'philosophy',
          'yoro',
          'wittgenstein',
          'matsuoka',
          'leibniz',
          'peirce',
          'petroski',
          'greg egan',
          'nishigaki',
        ],
        ja: [
          '読書',
          '本',
          '影響',
          '哲学',
          '唯脳論',
          '養老孟司',
          '哲学探求',
          'ウィトゲンシュタイン',
          '相似律',
          '松岡正剛',
          'ライプニッツ',
          'パース',
          'ペトロスキー',
          'グレッグ・イーガン',
          '西垣通',
        ],
      },
      body: {
        en: 'Keigo buys and reads books often; reading is the hobby he can say with confidence. Books that influenced him include Takeshi Yoro’s The Cerebralism, Wittgenstein’s Philosophical Investigations, and Seigo Matsuoka’s Sōjiritsu. He also likes Leibniz, Charles Sanders Peirce, Henry Petroski, Greg Egan, Toru Nishigaki, and reads widely across genres.',
        ja: '桂吾は本をよく買って読んでいる。自信を持って言える趣味は読書。影響を受けた本は、養老孟司『唯脳論』、ウィトゲンシュタイン『哲学探求』、松岡正剛『相似律』。ほかにもライプニッツ、チャールズ・サンダース・パース、ヘンリー・ペトロスキー、グレッグ・イーガン、西垣通などが好きで、ジャンルを問わずいろいろ読む。',
      },
      useWhen: {
        en: 'Use when asked about hobbies, books, intellectual influences, philosophy, or what shaped Keigo’s thinking.',
        ja: '趣味、本、影響を受けたもの、哲学、桂吾の思考の背景を聞かれた時に使う。',
      },
    },
  ],
} as const satisfies {
  disclosurePolicy: Record<Language, readonly string[]>
  unknownPersonalAnswer: LocalizedText
  entries: readonly PersonalProfileEntry[]
}

function formatLines(lines: readonly string[]): string {
  return lines.map((line) => `- ${line}`).join('\n')
}

function normalizeQuery(query: string): string {
  return query.toLowerCase().replace(/\s+/g, ' ').trim()
}

function includesKeyword(query: string, keyword: string): boolean {
  return query.includes(keyword.toLowerCase())
}

function tokenizeSearchText(value: string): string[] {
  return value
    .toLowerCase()
    .split(/[\s,./:;()[\]'"!?、。・「」『』（）]+/)
    .map((token) => token.trim())
    .filter((token) => token.length >= 2)
}

function isPersonalProfileQuestion(query: string, language: Language): boolean {
  const normalizedQuery = normalizeQuery(query)

  if (!normalizedQuery) return false

  return personalQuestionKeywords[language].some((keyword) => includesKeyword(normalizedQuery, keyword))
}

function scorePersonalProfileEntry(
  entry: PersonalProfileEntry,
  query: string,
  language: Language
): number {
  const searchableText = [
    entry.title[language],
    entry.title.en,
    entry.body[language],
    entry.body.en,
    entry.useWhen[language],
    entry.useWhen.en,
    ...entry.tags,
    ...entry.keywords[language],
    ...entry.keywords.en,
  ].join(' ')
  const directKeywords = [
    ...entry.keywords[language],
    ...entry.keywords.en,
    ...entry.tags,
  ]
  const directKeywordScore = directKeywords.reduce((score, keyword) => {
    return includesKeyword(query, keyword) ? score + 6 : score
  }, 0)
  const tokenScore = tokenizeSearchText(searchableText).reduce((score, token) => {
    return query.includes(token) ? score + 1 : score
  }, 0)

  return directKeywordScore + tokenScore
}

function selectPersonalProfileEntries(query: string, language: Language): readonly PersonalProfileEntry[] {
  const normalizedQuery = normalizeQuery(query)

  if (!isPersonalProfileQuestion(normalizedQuery, language)) {
    return []
  }

  const scoredEntries: ScoredPersonalProfileEntry[] = personalProfileConfig.entries
    .map((entry) => ({
      entry,
      score: scorePersonalProfileEntry(entry, normalizedQuery, language),
    }))
    .filter((scoredEntry) => scoredEntry.score > 0)
    .sort((left, right) => right.score - left.score)

  if (scoredEntries.length > 0) {
    return scoredEntries.slice(0, 3).map((scoredEntry) => scoredEntry.entry)
  }

  const overviewEntry = personalProfileConfig.entries.find((entry) => entry.id === 'personal-overview')
  return overviewEntry ? [overviewEntry] : []
}

export function formatPersonalProfileContext(language: Language, latestUserMessage: string): string {
  const isPersonalQuestion = isPersonalProfileQuestion(latestUserMessage, language)
  const entries = selectPersonalProfileEntries(latestUserMessage, language)
  const retrievalStatus = isPersonalQuestion
    ? entries.length > 0
      ? 'matched-personal-profile-entry'
      : 'personal-question-without-matching-entry'
    : 'not-a-personal-profile-question'
  const formattedEntries = entries.length > 0
    ? entries
      .map((entry) => [
        `- ${entry.title[language]}`,
        `  Body: ${entry.body[language]}`,
        `  Tags: ${entry.tags.join(', ')}`,
        `  Use when: ${entry.useWhen[language]}`,
      ].join('\n'))
      .join('\n')
    : '- No personal profile entry selected for this turn.'

  return [
    `Retrieval status: ${retrievalStatus}`,
    'Relevant personal profile entries:',
    formattedEntries,
    '',
    'Disclosure policy:',
    formatLines(personalProfileConfig.disclosurePolicy[language]),
    `Unknown personal handling: ${personalProfileConfig.unknownPersonalAnswer[language]}`,
  ].join('\n')
}
