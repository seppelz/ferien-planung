import { Metadata } from 'next';
import Link from 'next/link';
import styles from '../styles/Legal.module.css';
import Navigation from '@/components/Navigation/Navigation';
import Footer from '@/components/Footer/Footer';

export const metadata: Metadata = {
  title: 'Impressum | Ferien Planung',
  description: 'Impressum der Ferien Planung. Hier finden Sie alle rechtlichen Informationen und Kontaktdaten.',
  alternates: {
    canonical: 'https://ferien-planung.de/impressum',
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Impressum - Ferien Planung',
  description: 'Rechtliche Informationen und Kontaktdaten der Ferien Planung',
  publisher: {
    '@type': 'Organization',
    name: 'Ferien Planung',
    url: 'https://ferien-planung.de'
  }
};

export default function Imprint() {
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
          <h1>Impressum</h1>

          <section>
            <h2>Angaben gemäß § 5 TMG</h2>
            <p>
              Sebastian Söcker<br />
              Hülshoffstr. 22<br />
              46342 Velen
            </p>
          </section>

          <section>
            <h2>Vertreten durch</h2>
            <p>
              Sebastian Söcker<br />
            </p>
          </section>

          <section>
            <h2>Kontakt</h2>
            <p>
              E-Mail: <a href="mail: info@ferien-planung.de">info@ferien-planung.de</a>
            </p>
          </section>

          <section>
            <h2>EU-Streitschlichtung</h2>
            <p>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
              <Link href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">
                https://ec.europa.eu/consumers/odr/
              </Link>
            </p>
          </section>

          <section>
            <h2>Verbraucherstreitbeilegung/Universalschlichtungsstelle</h2>
            <p>
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer 
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>

          <section>
            <h2>Haftung für Inhalte</h2>
            <p>
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den 
              allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht 
              verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen 
              zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
            </p>
          </section>

          <section>
            <h2>Haftung für Links</h2>
            <p>
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. 
              Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der 
              verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
            </p>
          </section>

          <section>
            <h2>Urheberrecht</h2>
            <p>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen 
              Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der 
              Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
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