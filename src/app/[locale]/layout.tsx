import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, setRequestLocale} from 'next-intl/server';
import {routing} from '@/i18n/routing';
import {notFound} from 'next/navigation';
import { LazyMotion, domAnimation } from "framer-motion";
import type {Metadata} from 'next';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl = 'https://anfernee.dev';

const titles: Record<string, string> = {
  en: 'Anfernee Pichardo | Full-Stack Developer',
  es: 'Anfernee Pichardo | Desarrollador Full-Stack',
};

const descriptions: Record<string, string> = {
  en: 'Portfolio of Anfernee Pichardo, a full-stack developer specializing in Next.js, React Native, and Node.js.',
  es: 'Portafolio de Anfernee Pichardo, desarrollador full-stack especializado en Next.js, React Native y Node.js.',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;

  const title = titles[locale] ?? titles.en;
  const description = descriptions[locale] ?? descriptions.en;
  const ogLocale = locale === 'es' ? 'es_ES' : 'en_US';
  const otherLocale = locale === 'es' ? 'en_US' : 'es_ES';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: baseUrl,
      siteName: 'Anfernee Pichardo',
      images: [
        {
          url: `${baseUrl}/anfernee.jpg`,
          width: 800,
          height: 800,
          alt: 'Anfernee Pichardo',
        },
      ],
      locale: ogLocale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${baseUrl}/anfernee.jpg`],
    },
    alternates: {
      canonical: baseUrl,
      languages: {
        'en': `${baseUrl}/en`,
        'es': `${baseUrl}/es`,
        'x-default': baseUrl,
      },
    },
    metadataBase: new URL(baseUrl),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;

  if (!routing.locales.includes(locale as typeof routing.locales[number])) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased pt-16 flex flex-col min-h-screen`}
      >
        <NextIntlClientProvider messages={messages}>
          <LazyMotion features={domAnimation}>
            <Header />
            <div className="flex-1">
              {children}
            </div>
            <Footer />
          </LazyMotion>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
