import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'
import * as RadioGroup from '@radix-ui/react-radio-group'
import { ArrowDownCircle, ArrowUpCircle, X } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'

const newTransactionFormSchema = z.object({
  description: z.string().nonempty(),
  price: z.number().positive(),
  category: z.string().nonempty(),
  type: z.enum(['income', 'outcome']),
})

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>

export function NewTransactionModal() {
  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema),
    defaultValues: {
      type: 'income',
    },
  })

  function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    console.log(
      '🚀 ~ file: index.tsx:27 ~ handleCreateNewTransaction ~ data:',
      data,
    )
  }

  return (
    // Portal is a React component that renders its children into a new React tree
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 h-screen w-screen bg-black/75">
        <Dialog.Content className="fixed bottom-0 flex w-full flex-col rounded-t-[20px] bg-gray-800 px-6 pb-3 pt-6 lg:bottom-1/2 lg:right-1/2 lg:w-auto lg:min-w-[525px] lg:translate-x-1/2 lg:translate-y-1/2 lg:rounded-2xl lg:p-12">
          <Dialog.Title className="headline6 font-inter700">
            Nova transação
          </Dialog.Title>

          <Dialog.Close className="accessibilityFocus text-0 absolute right-3 top-3 h-12 w-12 cursor-pointer rounded-md border-0 bg-transparent leading-none">
            <X
              size={24}
              className="absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 text-gray-500"
            />
          </Dialog.Close>

          <form
            onSubmit={handleSubmit(handleCreateNewTransaction)}
            className="mt-8 flex flex-col gap-4"
          >
            <input
              type="text"
              placeholder="Descrição"
              required
              {...register('description')}
              className="accessibilityFocus rounded-md border-0 bg-gray-900 p-4 text-gray-300 placeholder:text-gray-500"
            />
            <input
              type="number"
              placeholder="Preço"
              required
              {...register('price', { valueAsNumber: true })}
              className="accessibilityFocus rounded-md border-0 bg-gray-900 p-4 text-gray-300 placeholder:text-gray-500"
            />
            <input
              type="text"
              placeholder="Categoria"
              required
              {...register('category')}
              className="accessibilityFocus rounded-md border-0 bg-gray-900 p-4 text-gray-300 placeholder:text-gray-500"
            />
            <Controller
              control={control}
              name="type"
              render={({ field }) => {
                return (
                  <RadioGroup.Root
                    onValueChange={field.onChange}
                    value={field.value}
                    className="grid grid-cols-2 gap-2"
                  >
                    <RadioGroup.Item
                      value="income"
                      className="accessibilityFocus button group mt-5 flex h-[58px] flex-grow items-center justify-center gap-3 rounded-md border-0 px-5 text-gray-300 duration-200 ease-linear data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-700 data-[state=checked]:text-tWhite lg:cursor-pointer lg:data-[state=unchecked]:hover:bg-gray-600"
                    >
                      <ArrowUpCircle
                        size={24}
                        className="duration-200 ease-linear group-data-[state=checked]:text-tWhite group-data-[state=unchecked]:text-green-500 lg:data-[state=unchecked]:group-hover:text-green-500"
                      />
                      <span>Entrada</span>
                    </RadioGroup.Item>

                    <RadioGroup.Item
                      value="outcome"
                      className="accessibilityFocus button group mt-5 flex h-[58px] flex-grow items-center justify-center gap-3 rounded-md border-0 px-5 text-gray-300 duration-200 ease-linear data-[state=checked]:bg-red-500 data-[state=unchecked]:bg-gray-700 data-[state=checked]:text-tWhite lg:cursor-pointer lg:data-[state=unchecked]:hover:bg-gray-600"
                    >
                      <ArrowDownCircle
                        size={24}
                        className="duration-200 ease-linear group-data-[state=checked]:text-tWhite group-data-[state=unchecked]:text-red-300 lg:data-[state=unchecked]:group-hover:text-red-300"
                      />
                      <span>Saída</span>
                    </RadioGroup.Item>
                  </RadioGroup.Root>
                )
              }}
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="accessibilityFocus button mt-8 h-[50px] rounded-md border-0 bg-primary px-5 text-tBlack duration-200 ease-linear disabled:cursor-not-allowed disabled:opacity-60 lg:enabled:cursor-pointer lg:enabled:hover:bg-tertiary"
            >
              Cadastrar
            </button>
          </form>

          <div className="mt-8 flex justify-center lg:hidden">
            <span className="h-[6px] w-1/3 rounded-md bg-gray-600" />
          </div>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Portal>
  )
}
