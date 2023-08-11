import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { TransactionProvider } from '@/context/TransactionsContext'
import { inter400, inter700, playfair400 } from '@/styles/fonts'
import '@/styles/globals.css'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: {
    default: 'DT Money por Livio Alvarenga | Gestão Financeira',
    template: 'DT Money por Livio Alvarenga | %s',
  },
  description:
    'O DT Money de Livio Alvarenga é uma aplicação de gestão financeira altamente eficaz. Desenvolvido com tecnologias modernas como Nextjs 13, React, TypeScript, Tailwindcss e Axios, este aplicativo oferece uma maneira eficiente de gerenciar suas finanças.',
  keywords:
    'DT Money, Gestão Financeira, Nextjs 13, React, TypeScript, Tailwindcss, Axios, Livio Alvarenga, Portfolio, Desenvolvedor FullStack',
  manifest: 'https://dt-money-finance.vercel.app/manifest.json',
  openGraph: {
    title: 'DT Money por Livio Alvarenga | Gestão Financeira',
    description:
      'O DT Money de Livio Alvarenga é uma aplicação de gestão financeira altamente eficaz. Desenvolvido com tecnologias modernas como Nextjs 13, React, TypeScript, Tailwindcss e Axios, este aplicativo oferece uma maneira eficiente de gerenciar suas finanças.',
    url: 'https://dt-money-qaf7ns626-livioalvarenga.vercel.app', // ! TODO: Change this URL
    siteName: 'DT Money por Livio Alvarenga',
    images: [
      // TODO: Update these image URLs and dimensions
      {
        url: 'https://dt-money-qaf7ns626-livioalvarenga.vercel.app/logo-og-800-600.png',
        width: 800,
        height: 600,
        alt: 'Logo do DT Money por Livio Alvarenga',
      },
      {
        url: 'https://dt-money-qaf7ns626-livioalvarenga.vercel.app/logo-og-1800-1600.png',
        width: 1800,
        height: 1600,
        alt: 'Logo do DT Money por Livio Alvarenga',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#e5e7eb' },
    { media: '(prefers-color-scheme: dark)', color: '#39322f' },
  ],
  twitter: {
    card: 'summary_large_image',
    title: 'DT Money por Livio Alvarenga | Gestão Financeira',
    description:
      'O DT Money de Livio Alvarenga é uma aplicação de gestão financeira altamente eficaz. Desenvolvido com tecnologias modernas como Nextjs 13, React, TypeScript, Tailwindcss e Axios, este aplicativo oferece uma maneira eficiente de gerenciar suas finanças.',
    creator: '@AlvarengaLivio',
    creatorId: 'https://twitter.com/AlvarengaLivio',
    images: [
      'https://dt-money-qaf7ns626-livioalvarenga.vercel.app/logo-og-800-600.png', // TODO: Update this image URL
    ],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
  verification: {
    google: 'your-google-verification-code', // ! TODO: Change this
  },
  alternates: {
    canonical: 'https://dt-money-finance.vercel.app/', // ! TODO: Change this URL
    languages: {
      'pt-BR': 'https://dt-money-finance.vercel.app/', // ! TODO: Change this URL
    },
  },
  category: 'Gestão Financeira',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body
        className={`${inter400.variable} ${inter700.variable} ${playfair400.variable} flex min-h-screen flex-col scroll-smooth bg-dark-700 font-inter400 text-base font-normal leading-normal tracking-[.031rem] text-gray-300 selection:bg-primary selection:text-tWhite`}
      >
        <TransactionProvider>
          <Header />
          {children}
          <Footer />
        </TransactionProvider>
      </body>
    </html>
  )
}
