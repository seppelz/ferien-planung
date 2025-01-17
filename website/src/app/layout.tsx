import './globals.css';
import { Inter } from 'next/font/google';
import { ClientLayout } from '../components/Layout/ClientLayout';
import CookieBanner from '@/components/CookieBanner/CookieBanner';
import Script from 'next/script';

const inter = Inter({
  subsets: ['latin'],
});

const GA_MEASUREMENT_ID = 'G-VXXPTVL7PT'; // Replace with your GA measurement ID

export const metadata = {
  title: 'Holiday Planner - Intelligente Urlaubsplanung für Deutschland',
  description: 'Planen Sie Ihren Urlaub intelligent mit Holiday Planner. Finden Sie die besten Brückentage und maximieren Sie Ihre Urlaubstage.',
};

// Force static rendering and disable dynamic routes
export const dynamic = 'error';
export const dynamicParams = false;
export const revalidate = false;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className={inter.className}>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('consent', 'default', {
              'analytics_storage': 'denied'
            });
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
        <ClientLayout>
          {children}
        </ClientLayout>
        <CookieBanner />
      </body>
    </html>
  );
}
