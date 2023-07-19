import { SearchForm } from '@/components/SearchForm'
import { Summary } from '@/components/Summary'
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  ChevronRightSquare,
} from 'lucide-react'

export default function Home() {
  const textShadow = {
    color: '#ffffff',
    textShadow:
      '0 0 10px #26a9e0, 0 0 20px #26a9e0, 0 0 40px #26a9e0, 0 0 80px #26a9e0',
  }

  return (
    <main className="flex flex-col items-start justify-start">
      <h1 className="wrapper headline6 sm:headline4 lg:headline3 mb-0 mt-5 text-center font-playfair400 text-tGray lg:max-w-7xl">
        Projeto de <b style={textShadow}>DT Money Gestão Financeira</b> com
        Nextjs 13 App Router, React, Typescript e Tailwindcss.
      </h1>
      <Summary />
      <div className="flex w-full flex-col gap-7 bg-gray-800 pt-24">
        {/* title */}
        <div className="wrapper flex items-center justify-between pt-8 lg:hidden">
          <h2>Transações</h2>
          <div className="text-gray-500">
            <span>4</span>
            <span className="pl-2">itens</span> {/* TODO verify if is plural */}
          </div>
        </div>

        {/* search form */}
        <SearchForm />

        {/* table */}
        <table className="w-full border-collapse border-spacing-x-2 overflow-hidden bg-gray-800">
          <tbody className="wrapper flex flex-col items-center justify-center gap-4 lg:gap-2">
            <tr className="flex w-full flex-wrap justify-between rounded-md bg-gray-600 px-8 py-5 lg:flex-nowrap lg:items-center lg:justify-start">
              <td className="mb-3 w-full lg:mb-0 lg:w-1/2">
                Desenvolvimento de site
              </td>
              <td className="headline6 lg:body1 mb-5 w-full font-inter700 text-green-500 lg:mb-0 lg:w-[20%] lg:font-inter400">
                R$ 12.000,00
              </td>
              <td className="flex items-center gap-2 text-gray-500 lg:w-[20%] lg:text-gray-300">
                <ChevronRightSquare size={16} className="lg:hidden" /> Venda
              </td>
              <td className="flex items-center gap-2 text-gray-500 lg:w-[10%] lg:text-gray-300">
                <Calendar size={16} className="lg:hidden" />
                13/04/2022
              </td>
            </tr>

            <tr className="flex w-full flex-wrap justify-between rounded-md bg-gray-600 px-8 py-5 lg:flex-nowrap lg:items-center lg:justify-start">
              <td className="mb-3 w-full lg:mb-0 lg:w-1/2">Hambúrguer</td>
              <td className="headline6 lg:body1 mb-5 w-full font-inter700 text-red-300 lg:mb-0 lg:w-[20%] lg:font-inter400">
                - R$ 70,00
              </td>
              <td className="flex items-center gap-2 text-gray-500 lg:w-[20%] lg:text-gray-300">
                <ChevronRightSquare size={16} className="lg:hidden" />{' '}
                Alimentação
              </td>
              <td className="flex items-center gap-2 text-gray-500 lg:w-[10%] lg:text-gray-300">
                <Calendar size={16} className="lg:hidden" />
                10/04/2022
              </td>
            </tr>
          </tbody>
        </table>

        {/* pagination */}
        <div className="wrapper my-7 flex items-center justify-center gap-2">
          <button className="accessibilityFocus group flex h-[48px] w-[48px] items-center justify-center rounded-md border-0 bg-transparent lg:cursor-pointer">
            <ChevronLeft
              size={30}
              className="text-gray-600 duration-200 ease-linear lg:group-hover:scale-125"
            />
          </button>
          <button className="accessibilityFocus button flex h-[48px] w-[48px] items-center justify-center rounded-md border-0 bg-primary p-4  duration-200 ease-linear lg:cursor-pointer lg:hover:bg-tertiary">
            <span className="subtitle1 text-tBlack">1</span>
          </button>
          <button className="accessibilityFocus button flex h-[48px] w-[48px] items-center justify-center rounded-md border-0 bg-gray-600 p-4  duration-200 ease-linear lg:cursor-pointer lg:hover:bg-tertiary">
            <span className="subtitle1 text-gray-300">2</span>
          </button>
          <button className="accessibilityFocus button flex h-[48px] w-[48px] items-center justify-center rounded-md border-0 bg-gray-600 p-4  duration-200 ease-linear lg:cursor-pointer lg:hover:bg-tertiary">
            <span className="subtitle1 text-gray-300">3</span>
          </button>
          <button className="accessibilityFocus group flex h-[48px] w-[48px] items-center justify-center rounded-md border-0 bg-transparent lg:cursor-pointer">
            <ChevronRight
              size={30}
              className="text-primary duration-200 ease-linear lg:group-hover:scale-125"
            />
          </button>
        </div>

        <div className="z-50 flex justify-center lg:hidden">
          <span className="h-[6px] w-1/3 rounded-md bg-gray-600" />
        </div>
      </div>
    </main>
  )
}
