import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';

export const metadata: Metadata = {
  title: { default: 'NyayaSutra — Legal Intelligence | Adv. A.K. Tripathi', template: '%s | NyayaSutra' },
  description: 'NyayaSutra is a modern legal intelligence platform — strategic litigation, legal research, drafting, constitutional practice, corporate advisory, and student mentorship by Adv. A.K. Tripathi, Allahabad & Delhi.',
  keywords: 'lawyer allahabad, legal services delhi, advocate india, NyayaSutra, AK Tripathi advocate, legal consultation, supreme court lawyer, high court lawyer, civil lawyer, criminal lawyer, legal research india, legal drafting, constitutional law, RTI advocate',
  authors: [{ name: 'Adv. A.K. Tripathi' }],
  creator: 'NyayaSutra Legal Intelligence',
  openGraph: {
    title: 'NyayaSutra — Legal Intelligence',
    description: 'Strategic Litigation · Legal Research · Drafting · Constitutional Practice · Corporate Advisory',
    url: 'https://nyayasutra.com',
    siteName: 'NyayaSutra',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NyayaSutra — Legal Intelligence',
    description: 'Professional legal services & intelligence by Adv. A.K. Tripathi',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://nyayasutra.com' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5"/>
        <meta name="theme-color" content="#07090F"/>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
      </head>
      <body className="overflow-x-hidden">
        <div className="grain-overlay" aria-hidden="true"/>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
