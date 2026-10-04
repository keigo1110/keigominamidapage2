const summaries = {
  home: 'Keigo Minamida (南田桂吾) is a first-year doctoral student at the Graduate School of Interdisciplinary Information Studies, The University of Tokyo, in the Ishiguro Laboratory. He researches human-computer interaction, augmented humans, and computer vision. His life theme is editing as software. 南田桂吾は東京大学大学院 学際情報学府・石黒研究室の博士1年。専門はHCI、人間拡張、コンピュータビジョン。ライフテーマは「ソフトウェアとしての編集化」。',
  artwork:
    'Artwork by Keigo Minamida (南田桂吾) and 4ZIGEN: interactive installations including Geocussion and Protophysica, and personal works such as LexiAtlas and kAIgi. The team received the GUGEN2024 Grand Prize and Hosii-ne Award. 南田桂吾と4ZIGENのインタラクティブ作品、および個人制作。GUGEN2024 大賞・ほしいね賞。',
  startup:
    'Wakabar is Keigo Minamida’s bicycle-safety startup. Its iOS and Android apps alert riders to dangerous locations before they arrive. Wakabarは南田桂吾が取り組む自転車安全のスタートアップ。危険地点を事前に知らせて事故を防ぐアプリで、App Store と Google Play で公開している。',
  experience:
    'Experience of Keigo Minamida (南田桂吾): publications at UIST Adjunct 2026, Spatial Media Conference 2026, Augmented Humans 2026, and SIGGRAPH Asia 2024, plus awards, education at The University of Tokyo and Kindai University, and professional work. 南田桂吾の論文、受賞、学歴、経歴。',
  rota: 'ROTA is an original computational wizard by Keigo Minamida (南田桂吾). The name comes from the Latin rotare, to rotate. LINE stamps are available in Japanese and English. ROTAは南田桂吾のオリジナルキャラクター、計算機魔法使い。名前はラテン語の rotare に由来する。',
} as const

export function IndexableSummary({ page }: { page: keyof typeof summaries }) {
  return <p className="sr-only">{summaries[page]}</p>
}
