import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { inter400, inter700, playfair400 } from '@/styles/fonts'
import '@/styles/globals.css'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: {
    default: 'Pomodoro Timer por Livio Alvarenga | Gestão de Tarefas e Tempo',
    template: 'Pomodoro Timer por Livio Alvarenga | %s',
  },
  description:
    'O Pomodoro Timer de Livio Alvarenga é uma ferramenta de gestão de tempo altamente eficaz. Desenvolvido com tecnologias modernas como NodeJs, TypeScript, JavaScript, Nextjs, React e outros, este aplicativo permite inserir tarefas e gerenciar seu tempo com eficácia. Experimente a funcionalidade do timer e veja seu progresso em tempo real.',
  keywords:
    'Pomodoro Timer, Gestão de Tempo, Gestão de Tarefas, NodeJs, TypeScript, JavaScript, Nextjs, React, Livio Alvarenga, Portfolio, Desenvolvedor FullStack',
  openGraph: {
    title: 'Pomodoro Timer por Livio Alvarenga | Gestão de Tarefas e Tempo',
    description:
      'O Pomodoro Timer de Livio Alvarenga é uma ferramenta de gestão de tempo altamente eficaz. Desenvolvido com tecnologias modernas como NodeJs, TypeScript, JavaScript, Nextjs, React e outros, este aplicativo permite inserir tarefas e gerenciar seu tempo com eficácia. Experimente a funcionalidade do timer e veja seu progresso em tempo real.',
    url: 'https://pomodoro-timer-qaf7ns626-livioalvarenga.vercel.app',
    siteName: 'Pomodoro Timer por Livio Alvarenga',
    images: [
      {
        url: 'https://pomodoro-timer-qaf7ns626-livioalvarenga.vercel.app/logo-og-800-600.png',
        width: 800,
        height: 600,
        alt: 'Logo do desenvolver fullstack Livio Alvarenga',
      },
      {
        url: 'https://pomodoro-timer-qaf7ns626-livioalvarenga.vercel.app/logo-og-1800-1600.png',
        width: 1800,
        height: 1600,
        alt: 'Logo do desenvolver fullstack Livio Alvarenga',
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
    title: 'Pomodoro Timer por Livio Alvarenga | Gestão de Tarefas e Tempo',
    description:
      'O Pomodoro Timer de Livio Alvarenga é uma ferramenta de gestão de tempo altamente eficaz. Desenvolvido com tecnologias modernas como NodeJs, TypeScript, JavaScript, Nextjs, React e outros, este aplicativo permite inserir tarefas e gerenciar seu tempo com eficácia. Experimente a funcionalidade do timer e veja seu progresso em tempo real.',
    creator: '@AlvarengaLivio',
    creatorId: 'https://twitter.com/AlvarengaLivio',
    images: [
      'https://pomodoro-timer-qaf7ns626-livioalvarenga.vercel.app/logo-og-800-600.png',
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
    canonical: 'https://pomodoro-timer-qaf7ns626-livioalvarenga.vercel.app/',
    languages: {
      'pt-BR': 'https://pomodoro-timer-qaf7ns626-livioalvarenga.vercel.app/',
    },
  },
  category: 'Gestão de Tempo e Tarefas',
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
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
