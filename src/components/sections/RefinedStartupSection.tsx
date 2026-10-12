'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowDown, ArrowRight, ArrowUpRight, Globe2, Play, X } from 'lucide-react'
import { useTranslation } from '../../contexts/TranslationContext'
import { ModalDialog } from '../ModalDialog'
import {
  WAKABAR_APP_STORE_URL,
  WAKABAR_APP_URL,
  WAKABAR_CORPORATE_URL,
  WAKABAR_PAGE_CONTENT,
  WAKABAR_PLAY_STORE_URL,
  WAKABAR_SCREENSHOTS,
  WAKABAR_TOUR_URL,
} from '../../data/wakabar'
import styles from './RefinedStartupSection.module.css'

type ScreenshotKey = keyof typeof WAKABAR_SCREENSHOTS

function ScreenshotButton({
  screen, label, action, className = '', sizes, priority = false, onOpen,
}: {
  screen: ScreenshotKey
  label: string
  action: string
  className?: string
  sizes: string
  priority?: boolean
  onOpen: (screen: ScreenshotKey) => void
}) {
  return (
    <button
      type="button"
      className={`${styles.screenButton} ${className}`}
      onClick={() => onOpen(screen)}
      aria-label={`${action}: ${label}`}
      aria-haspopup="dialog"
    >
      <Image
        {...WAKABAR_SCREENSHOTS[screen]} alt={label} sizes={sizes} priority={priority}
        unoptimized={screen === 'hazards' || screen === 'hazardDirection'}
      />
    </button>
  )
}

export function RefinedStartupSection() {
  const { t, language } = useTranslation()
  const copy = WAKABAR_PAGE_CONTENT[language]
  const [activeScreen, setActiveScreen] = useState<ScreenshotKey | null>(null)
  const closePreview = () => setActiveScreen(null)

  return (
    <section id="startup" className={styles.page}>
      <div className={styles.container}>
        <header className={styles.hero}>
          <div className={styles.heroCopy}>
            <div className={styles.brand}>
              <Image src="/images/wakabar.png" alt="" width={36} height={36} />
              <span>wakabar</span>
            </div>
            <h1 className={styles.headline}>
              <span>{copy.headline[0]}</span>
              <span className={styles.accent}>{copy.headline[1]}</span>
            </h1>
            <div className={styles.heroActions}>
              <a href={WAKABAR_TOUR_URL} target="_blank" rel="noopener noreferrer" className={styles.primaryLink}>
                {copy.explore}<ArrowUpRight size={21} aria-hidden="true" />
              </a>
              <a href="#wakabar-safety" className={styles.textLink}>
                {copy.safetyLink}<ArrowDown size={18} aria-hidden="true" />
              </a>
            </div>
          </div>
          <figure className={styles.heroFigure}>
            <div className={styles.tourStage}>
              <ScreenshotButton
                screen="tours" label={copy.screenshots.tours} action={copy.enlarge}
                className={styles.tourList} sizes="(min-width: 1536px) 800px, (min-width: 1024px) 55vw, (min-width: 768px) 44vw, 88vw"
                priority onOpen={setActiveScreen}
              />
              <ScreenshotButton
                screen="tourDetail" label={copy.screenshots.tourDetail} action={copy.enlarge}
                className={styles.tourPhone} sizes="(min-width: 1024px) 240px, (min-width: 768px) 190px, 172px"
                onOpen={setActiveScreen}
              />
            </div>
          </figure>
        </header>

        <section className={styles.tours} aria-labelledby="wakabar-tours-title">
          <div className={styles.tourHeading}>
            <p className={styles.sectionLabel}>01 / SELF-GUIDED TOURS</p>
            <div>
              <h2 id="wakabar-tours-title" className={styles.sectionTitle}>{copy.tourTitle}</h2>
              <p className={styles.sectionIntro}>{copy.tourIntro}</p>
            </div>
          </div>
          <ol className={styles.steps}>
            {copy.tourSteps.map((step, index) => (
              <li key={step.title}>
                <span className={styles.stepNumber} aria-hidden="true">0{index + 1}</span>
                <div><h3>{step.title}</h3><p>{step.description}</p></div>
              </li>
            ))}
          </ol>
          <p className={styles.tourClosing} lang="en">Every ride, a new discovery.</p>
        </section>

        <section id="wakabar-safety" className={styles.safety} aria-labelledby="wakabar-safety-title">
          <p className={styles.sectionLabel}>02 / SAFETY</p>
          <div className={styles.safetyHeading}>
            <h2 id="wakabar-safety-title" className={`${styles.safetyTitle} ${styles.accent}`}>
              {copy.safetyTitle}
            </h2>
            <div className={styles.safetyLinks}>
              <a href={WAKABAR_CORPORATE_URL} target="_blank" rel="noopener noreferrer" className={styles.textLink}>
                {copy.safetyMore}<ArrowUpRight size={18} aria-hidden="true" />
              </a>
              <a href="https://www.youtube.com/watch?v=C9rNbZwhLqE" target="_blank" rel="noopener noreferrer" className={styles.demoLink}>
                <Play size={14} aria-hidden="true" />{copy.demo}
              </a>
            </div>
          </div>
          <div className={styles.safetyGrid}>
            {(['hazards', 'hazardDirection'] as const).map((screen, index) => (
              <article key={screen} className={styles.safetyCard}>
                <div className={styles.safetyCardHeading}>
                  <span className={styles.safetyCardNumber} aria-hidden="true">0{index + 1}</span>
                  <div><h3>{copy.safetyViews[screen].title}</h3><p>{copy.safetyViews[screen].description}</p></div>
                </div>
                <ScreenshotButton
                  screen={screen} label={copy.screenshots[screen]} action={copy.enlarge}
                  className={styles.hazardMap}
                  sizes={screen === 'hazards'
                    ? '(min-width: 1440px) 850px, (min-width: 768px) 60vw, 90vw'
                    : '(min-width: 1440px) 500px, (min-width: 768px) 36vw, 90vw'}
                  onOpen={setActiveScreen}
                />
              </article>
            ))}
          </div>
        </section>

        <section className={styles.engineering} aria-labelledby="wakabar-engineering-title">
          <div className={styles.engineeringHeading}>
            <p className={styles.sectionLabel}>03 / ENGINEERING</p>
            <div>
              <h2 id="wakabar-engineering-title" className={`${styles.sectionTitle} ${styles.engineeringTitle}`}>
                {copy.engineeringTitle.map((line, index) => <span key={line}>{index > 0 && language === 'en' ? ' ' : ''}{line}</span>)}
              </h2>
            </div>
          </div>
          <ol className={styles.signalFlow}>
            {copy.engineeringSteps.map((step, index) => (
              <li key={step.title}>
                <span className={styles.signalNumber}>0{index + 1}</span>
                <div><h3>{step.title}</h3><p>{step.description}</p></div>
                {index < copy.engineeringSteps.length - 1 ? <ArrowRight size={20} aria-hidden="true" /> : null}
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.download} aria-labelledby="wakabar-download-title">
          <div>
            <h2 id="wakabar-download-title" className={styles.sectionTitle}>{copy.appTitle}</h2>
          </div>
          <div className={styles.downloadActions}>
            <div className={styles.storeBadges}>
              <a href={WAKABAR_APP_URL} target="_blank" rel="noopener noreferrer" className={styles.webBadge} aria-label={copy.browser}>
                <Globe2 size={29} strokeWidth={1.6} aria-hidden="true" />
                <span><small>{copy.webBadgeTop}</small><strong>{copy.webBadgeAction}</strong></span>
              </a>
              <a href={WAKABAR_APP_STORE_URL} target="_blank" rel="noopener noreferrer" aria-label={t('wakabarAppStoreBadgeAlt')}>
                <Image
                  src={`/images/badges/app-store-${language}-black.svg`} alt={t('wakabarAppStoreBadgeAlt')}
                  width={language === 'ja' ? 109 : 120} height={40} style={{ width: 'auto', height: 46 }} unoptimized
                />
              </a>
              <a href={WAKABAR_PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" aria-label={t('wakabarPlayStoreBadgeAlt')}>
                <Image
                  src={`/images/badges/google-play-${language}.png`} alt={t('wakabarPlayStoreBadgeAlt')}
                  width={language === 'ja' ? 135 : 154} height={language === 'ja' ? 52 : 60} style={{ width: 'auto', height: 60 }} unoptimized
                />
              </a>
            </div>
          </div>
          <a href={WAKABAR_CORPORATE_URL} target="_blank" rel="noopener noreferrer" className={`${styles.textLink} ${styles.companyLink}`}>
            {copy.company}<ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </section>
      </div>

      <ModalDialog open={activeScreen !== null} onDismiss={closePreview} labelledBy="wakabar-screen-title">
        {activeScreen !== null ? (
          <div className={styles.preview}>
            <div className={styles.previewHeader}>
              <h2 id="wakabar-screen-title">{copy.screenshots[activeScreen]}</h2>
              <button type="button" onClick={closePreview} data-dialog-close aria-label={copy.close}>
                <X size={22} aria-hidden="true" />
              </button>
            </div>
            <Image
              {...WAKABAR_SCREENSHOTS[activeScreen]} alt={copy.screenshots[activeScreen]}
              className={styles.previewImage} sizes={activeScreen === 'tours' ? '90vw' : '60vw'}
              unoptimized={activeScreen === 'hazards' || activeScreen === 'hazardDirection'}
            />
          </div>
        ) : null}
      </ModalDialog>
    </section>
  )
}
