'use client'

import * as Dialog from '@radix-ui/react-dialog'
import Image from 'next/image'
import { NewTransactionModal } from '../NewTransactionModal'

export function Header() {
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

        <Dialog.Root>
          {/* Trigger is like a button, so use attributes asChild to do not repeat button element */}
          <Dialog.Trigger asChild>
            {/* new transaction button */}
            <button className="accessibilityFocus button h-[50px] rounded-md border-0 bg-primary px-5 text-tBlack duration-200 ease-linear lg:cursor-pointer lg:hover:bg-tertiary">
              Nova transação
            </button>
          </Dialog.Trigger>
          <NewTransactionModal />
        </Dialog.Root>
      </div>
    </header>
  )
}
