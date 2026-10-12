export const WAKABAR_APP_STORE_URL = 'https://apps.apple.com/jp/app/wakabar/id6759553729'
export const WAKABAR_PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=net.wakabar.app'
export const WAKABAR_APP_URL = 'https://wakabar.net/'
export const WAKABAR_TOUR_URL = 'https://wakabar.net/wakabar-tours'
export const WAKABAR_CORPORATE_URL = 'https://www.wakabar-cycle.com/'

export const WAKABAR_PAGE_CONTENT = {
  ja: {
    headline: ['その土地の', '新しい発見を。'],
    explore: 'ツアーを探す',
    safetyLink: '安全への取り組み',
    tourTitle: '走る。聴く。発見する。',
    tourIntro: '目的地までの移動も、旅の楽しみに。気になるコースを選んだら、自分のペースで出発。',
    tourSteps: [
      { title: 'コースを選ぶ', description: '距離や所要時間を見ながら、気になるツアーを見つける。' },
      { title: '街の声を聴く', description: 'ガイド地点に近づくと、その場所の物語が音声で届く。' },
      { title: '自分のペースでめぐる', description: '景色を楽しみ、気になる場所に立ち寄りながら進む。' },
    ],
    safetyTitle: '必要なだけ安全を。',
    safetyViews: {
      hazards: { title: '危険な箇所がマップに紐づいている', description: '赤丸の数字は、周辺に登録された危険地点の数。' },
      hazardDirection: { title: '必要な時だけ作動', description: '円は検知する領域、矢印は通知対象の進行方向。' },
    },
    safetyMore: '取り組みを詳しく見る',
    demo: '音声警告のデモを見る',
    engineeringTitle: ['移動を、', '音声のタイミングに変える。'],
    engineeringSteps: [
      { title: '移動区間を補間', description: '前回と現在のGPS位置の間に、通過判定用の点を補う。' },
      { title: '通知条件を判定', description: '距離・検知領域・進行方向を照合し、通知が必要かを判断。' },
      { title: '音声の優先度を制御', description: '危険通知を優先。解説は中断した位置から再開。' },
    ],
    appTitle: 'あらゆる場所をwakabarと。',
    browser: 'Web版のwakabarを開く',
    webBadgeTop: 'Web App',
    webBadgeAction: 'ブラウザで開く',
    company: 'wakabar株式会社について',
    enlarge: '画面を拡大',
    close: '画面を閉じる',
    screenshots: {
      tours: '鴨川・嵐山・琵琶湖の風景を使った、セルフツアー一覧の画面イメージ',
      tourDetail: '鴨川をめぐるセルフツアーの詳細画面イメージ',
      hazards: '京都市・桂川周辺の登録済み危険地点を拡大した、現在の公開Web版のマップ',
      hazardDirection: '現在の公開Web版で、1つの危険地点と方向を持つ検知領域を表示したマップ',
    },
  },
  en: {
    headline: ['New discoveries,', 'in every place.'],
    explore: 'Explore the tours',
    safetyLink: 'Our work on safety',
    tourTitle: 'Ride. Listen. Discover.',
    tourIntro: 'Make the journey part of the experience. Pick a route that interests you, and explore at your own pace.',
    tourSteps: [
      { title: 'Find your route', description: 'Browse tours by distance and duration to find your next ride.' },
      { title: 'Hear the local stories', description: 'An audio guide brings each place to life as you approach a guide point.' },
      { title: 'Go at your own pace', description: 'Enjoy the scenery and stop at places that catch your eye along the way.' },
    ],
    safetyTitle: 'Safety when you need it.',
    safetyViews: {
      hazards: { title: 'Hazards linked to the map', description: 'Red circles show the number of hazards registered nearby.' },
      hazardDirection: { title: 'Alerts only when needed', description: 'The circle is the alert area. The arrow is the direction that triggers an alert.' },
    },
    safetyMore: 'Explore our work on safety',
    demo: 'Watch the audio alert demo',
    engineeringTitle: ['Turning movement into', 'the right moment for audio.'],
    engineeringSteps: [
      { title: 'Sample the movement segment', description: 'Add points between successive GPS fixes to check for passing a location.' },
      { title: 'Evaluate alert conditions', description: 'Check distance, alert area and direction to decide whether to notify.' },
      { title: 'Control audio priority', description: 'Prioritize hazard alerts, then resume the narration where it was interrupted.' },
    ],
    appTitle: 'Explore everywhere with wakabar.',
    browser: 'Open the wakabar web app',
    webBadgeTop: 'Web App',
    webBadgeAction: 'Open in browser',
    company: 'About wakabar Co., Ltd.',
    enlarge: 'Enlarge screen',
    close: 'Close screen',
    screenshots: {
      tours: 'Illustrative self-guided tour list with generated scenery from the Kamo River, Arashiyama and Lake Biwa',
      tourDetail: 'Illustrative course details for a self-guided tour along the Kamo River',
      hazards: 'Current public web app with a close view of registered hazards around Katsuragawa, Kyoto',
      hazardDirection: 'Current public web app showing one hazard and its directional alert area',
    },
  },
} as const

// Tours: scenic imagery and example names generated on 2026-10-13 at the owner's request.
// They illustrate the existing tour UI; they are not new published tour records.
// Safety: captured from the signed-in public web app on 2026-10-13.
// Lossless browser captures retain the Google attribution; no ride was started.
export const WAKABAR_SCREENSHOTS = {
  tours: { src: '/images/wakabar-tours-scenic-v2.webp', width: 1600, height: 548 },
  tourDetail: { src: '/images/wakabar-tour-scenic-detail-v2.webp', width: 780, height: 1686 },
  hazards: { src: '/images/wakabar-safety-kyoto-hd-v5.png', width: 1200, height: 1000 },
  hazardDirection: { src: '/images/wakabar-safety-direction-hd-v5.png', width: 1200, height: 1000 },
} as const
