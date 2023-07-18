import { inter400, inter700, playfair400 } from '@/styles/fonts'
import '@/styles/globals.css'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: {
    default: 'NextJs 13 Project Template | Configuração e Início Rápidos',
    template: 'NextJs 13 Project Template | %s',
  },
  description:
    'Inicie rapidamente seu projeto com nosso template para NextJs 13. Pré-configurado com NodeJs, TypeScript, JavaScript, React, Tailwind, Dotenv, ZodJs, EsLint e Prettier, este template acelera seu fluxo de trabalho e permite que você se concentre no que realmente importa.',
  keywords:
    'NextJs 13, NodeJs, TypeScript, JavaScript, React, Tailwind, Dotenv, ZodJs, EsLint, Prettier, Template de Projeto, Configuração Rápida, Início Rápido',
  openGraph: {
    title: 'NextJs 13 Project Template | Configuração e Início Rápidos',
    description:
      'Inicie rapidamente seu projeto com nosso template para NextJs 13. Pré-configurado com NodeJs, TypeScript, JavaScript, React, Tailwind, Dotenv, ZodJs, EsLint e Prettier, este template acelera seu fluxo de trabalho e permite que você se concentre no que realmente importa.',
    url: 'https://https://seu.dominio.br',
    siteName: 'NextJs 13 Project Template',
    images: [
      {
        url: 'https://https://seu.dominio.br/logo-og-800-600.png',
        width: 800,
        height: 600,
        alt: 'Logo do NextJs 13 Project Template',
      },
      {
        url: 'https://https://seu.dominio.br/logo-og-1800-1600.png',
        width: 1800,
        height: 1600,
        alt: 'Logo do NextJs 13 Project Template',
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
    title: 'NextJs 13 Project Template | Configuração e Início Rápidos',
    description:
      'Inicie rapidamente seu projeto com nosso template para NextJs 13. Pré-configurado com NodeJs, TypeScript, JavaScript, React, Tailwind, Dotenv, ZodJs, EsLint e Prettier, este template acelera seu fluxo de trabalho e permite que você se concentre no que realmente importa.',
    creator: '@your-twitter-account',
    creatorId: 'https://twitter.com/your-twitter-account', // ! TODO: Change this
    images: ['https://seu.dominio.br/logo-og-800-600.png'],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
  verification: {
    google: 'your-google-verification-code', // ! TODO: Change this
  },
  alternates: {
    canonical: 'https://https://seu.dominio.br',
    languages: {
      'pt-BR': 'https://https://seu.dominio.br',
    },
  },
  category: 'Software Development',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body
        className={`${inter400.variable} ${inter700.variable} ${playfair400.variable} scroll-smooth bg-dark-700 font-inter400 text-base font-normal leading-normal tracking-[.031rem] text-tWhite selection:bg-primary selection:text-tWhite`}
      >
        {children}
      </body>
    </html>
  )
}
