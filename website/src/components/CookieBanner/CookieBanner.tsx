import { useState, useEffect } from 'react'
import styles from './CookieBanner.module.css'

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      setIsVisible(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setIsVisible(false)
    // Initialize GA after consent
    if (typeof window !== 'undefined') {
      window.gtag('consent', 'update', {
        'analytics_storage': 'granted'
      })
    }
  }

  const declineCookies = () => {
    localStorage.setItem('cookie-consent', 'declined')
    setIsVisible(false)
    // Deny GA after decline
    if (typeof window !== 'undefined') {
      window.gtag('consent', 'update', {
        'analytics_storage': 'denied'
      })
    }
  }

  if (!isVisible) return null

  return (
    <div className={styles.banner}>
      <div className={styles.content}>
        <p>
          Diese Website verwendet Cookies und Google Analytics, um die Nutzung der Website zu analysieren
          und zu verbessern. Sie können selbst entscheiden, ob Sie die Cookies zulassen möchten.
          Weitere Informationen finden Sie in unserer{' '}
          <a href="/datenschutz">Datenschutzerklärung</a>.
        </p>
        <div className={styles.buttons}>
          <button onClick={acceptCookies} className={styles.acceptButton}>
            Akzeptieren
          </button>
          <button onClick={declineCookies} className={styles.declineButton}>
            Ablehnen
          </button>
        </div>
      </div>
    </div>
  )
} 