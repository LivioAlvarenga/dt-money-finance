import { Search } from 'lucide-react'

export function SearchForm() {
  return (
    <form className="wrapper flex gap-4 lg:pt-10">
      <input
        type="text"
        placeholder="Busque por transações"
        className="accessibilityFocus flex-grow rounded-md border-0 bg-gray-900 p-4 text-gray-300 placeholder:text-gray-500"
      ></input>
      <button className="accessibilityFocus button flex h-[54px] w-[54px] items-center justify-center rounded-md border-2 border-primary bg-transparent p-4 text-primary duration-200 ease-linear md:w-[147px] md:gap-3 lg:cursor-pointer lg:hover:bg-primary lg:hover:text-tWhite">
        <Search size={22} />
        <span className="hidden md:block">Buscar</span>
      </button>
    </form>
  )
}
