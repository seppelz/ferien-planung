import { Metadata } from 'next';
import Link from 'next/link';
import styles from '../styles/Legal.module.css';
import Navigation from '@/components/Navigation/Navigation';
import Footer from '@/components/Footer/Footer';

export const metadata: Metadata = {
  title: 'Datenschutzerklärung | Ferien Planung',
  description: 'Datenschutzerklärung der Ferien Planung. Erfahren Sie, wie wir Ihre Daten schützen und verarbeiten.',
  alternates: {
    canonical: 'https://ferien-planung.de/datenschutz',
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Datenschutzerklärung - Ferien Planung',
  description: 'Datenschutzerklärung der Ferien Planung',
  publisher: {
    '@type': 'Organization',
    name: 'Ferien Planung',
    url: 'https://ferien-planung.de'
  }
};

export default function PrivacyPolicy() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <Navigation />
      <main className={styles.legalPage}>
        <div className={styles.container}>
          <h1>Datenschutzerklärung</h1>
          
          <section>
            <h2>1. Datenschutz auf einen Blick</h2>
            <h3>Allgemeine Hinweise</h3>
            <p>
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, 
              wenn Sie unsere Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert 
              werden können.
            </p>
          </section>

          <section>
            <h2>2. Datenerfassung auf unserer Website</h2>
            <h3>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</h3>
            <p>
              Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Die Kontaktdaten können Sie dem 
              <Link href="/impressum"> Impressum</Link> dieser Website entnehmen.
            </p>
            <h3>Verantwortliche Stelle</h3>
            <p>
              Müller & Söcker GbR<br />
              c/o VELT STUDIO GmbH<br />
              Urbanstraße 71<br />
              10967 Berlin<br />
              E-Mail: info@ferien-planung.de
            </p>
          </section>

          <section>
            <h2>3. Wie erfassen wir Ihre Daten?</h2>
            <p>
              Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z.B. um Daten handeln, 
              die Sie in ein Kontaktformular eingeben.
            </p>
            <p>
              Andere Daten werden automatisch beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische 
              Daten (z.B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).
            </p>
          </section>

          <section>
            <h2>4. Lokale Datenspeicherung</h2>
            <p>
              Die Ferien Planung speichert alle Ihre Urlaubsplanungsdaten ausschließlich lokal in Ihrem Browser. Es erfolgt keine 
              Übertragung dieser Daten an unsere Server. Die Daten bleiben auf Ihrem Gerät und können jederzeit von Ihnen gelöscht werden.
            </p>
          </section>

          <section>
            <h2>5. Analyse-Tools und Tools von Drittanbietern</h2>
            <p>
              Beim Besuch unserer Website kann Ihr Surf-Verhalten statistisch ausgewertet werden. Das geschieht vor allem mit Cookies 
              und mit sogenannten Analyseprogrammen. Die Analyse Ihres Surf-Verhaltens erfolgt in der Regel anonym; das Surf-Verhalten 
              kann nicht zu Ihnen zurückverfolgt werden.
            </p>
          </section>

          <section>
            <h2>6. SSL- bzw. TLS-Verschlüsselung</h2>
            <p>
              Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine SSL-bzw. 
              TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von 
              &quot;http://&quot; auf &quot;https://&quot; wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
            </p>
          </section>

          <section>
            <h2>7. Änderungen</h2>
            <p>
              Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen rechtlichen Anforderungen 
              entspricht oder um Änderungen unserer Leistungen in der Datenschutzerklärung umzusetzen, z.B. bei der Einführung 
              neuer Services.
            </p>
          </section>

          <div className={styles.lastUpdated}>
            Stand: Januar 2025
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
} 