import { zodResolver } from '@hookform/resolvers/zod'
import { Search } from 'lucide-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const searchFormSchema = z.object({
  search: z.string().nonempty(),
})

type SearchFormInputs = z.infer<typeof searchFormSchema>

export function SearchForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  })

  function handleSearchTransactions(data: SearchFormInputs) {
    console.log(
      '🚀 ~ file: index.tsx:18 ~ handleSearchTransactions ~ data:',
      data,
    )
  }

  return (
    <form
      onSubmit={handleSubmit(handleSearchTransactions)}
      className="wrapper flex gap-4 lg:pt-10"
    >
      <input
        type="text"
        placeholder="Busque por transações"
        {...register('search')}
        className="accessibilityFocus flex-grow rounded-md border-0 bg-gray-900 p-4 text-gray-300 placeholder:text-gray-500"
      ></input>
      <button
        type="submit"
        disabled={isSubmitting}
        className="accessibilityFocus button flex h-[54px] w-[54px] items-center justify-center rounded-md border-2 border-primary bg-transparent p-4 text-primary duration-200 ease-linear disabled:cursor-not-allowed disabled:opacity-60 md:w-[147px] md:gap-3 lg:enabled:cursor-pointer lg:enabled:hover:bg-primary lg:enabled:hover:text-tWhite"
      >
        <Search size={22} />
        <span className="hidden md:block">Buscar</span>
      </button>
    </form>
  )
}
