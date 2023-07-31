'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { NewTransactionModal } from '../NewTransactionModal'

export function NewTransactionButton() {
  return (
    <div className="wrapper relative -bottom-10 mt-0 flex justify-end">
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
  )
}
