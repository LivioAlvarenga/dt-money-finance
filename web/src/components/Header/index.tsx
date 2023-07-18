'use client'

import clsx from 'clsx'
import { ScrollText, Timer } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Header() {
  const pathname = usePathname()

  return (
    <header className="w-full bg-gray-800">
      <div className="wrapper flex h-20 items-center justify-between">
        <Image
          src={'./logoCodeDark.svg'}
          width={60}
          height={25}
          alt="ícone representando código de programação sinal menor e maior da cor azul"
          className="sm:hidden"
        />
        <Image
          src={'./logo-livioalvarenga-light.svg'}
          width={350}
          height={60}
          alt="Logo do desenvolvedor Livio Alvarenga escrito em letras brancas e um ícone de código de programação sinal menor e maior da cor azul"
          className="hidden sm:block"
        />

        {/* icons navigate */}
        <div className="flex items-center gap-2">
          <Link
            href="/"
            title="Timer"
            className={clsx(
              'accessibilityFocus flex h-12 w-12 items-center justify-center rounded-sm border-b-[3px] border-t-[3px] border-transparent bg-transparent  transition-colors active:text-red-500 lg:cursor-pointer lg:hover:border-b-primary',
              {
                'text-primary': pathname === '/',
                'text-gray-100': pathname !== '/',
              },
            )}
          >
            <Timer size={24} />
          </Link>
          <Link
            href="/history"
            title="Histórico"
            className={clsx(
              'accessibilityFocus flex h-12 w-12 items-center justify-center rounded-sm border-b-[3px] border-t-[3px] border-transparent bg-transparent text-gray-100 transition-colors lg:cursor-pointer lg:hover:border-b-primary',
              {
                'text-primary': pathname === '/history',
                'text-gray-100': pathname !== '/history',
              },
            )}
          >
            <ScrollText size={24} />
          </Link>
        </div>
      </div>
    </header>
  )
}
