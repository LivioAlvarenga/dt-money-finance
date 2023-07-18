import { ArrowDownCircle, ArrowUpCircle, DollarSign } from 'lucide-react'

export function Summary() {
  return (
    <section className="lg:wrapper relative -bottom-[74px] w-screen overflow-hidden">
      <div className="hiddenScrollbar hiddenScrollbarFirefox flex w-screen gap-8 overflow-x-scroll px-[2%] lg:w-auto lg:justify-between lg:overflow-x-hidden lg:px-0">
        {/* summary cards */}
        <div className="min-w-[280px] rounded-md bg-gray-600 p-8 shadow-2xl lg:min-w-[352px] lg:flex-grow">
          <header className="flex items-center justify-between text-gray-300">
            <span>Entradas</span>
            <ArrowUpCircle size={32} className="text-green-500" />
          </header>
          <strong className="headline5 mt-4 block font-inter700">
            R$ 17.400,00
          </strong>
        </div>

        <div className="min-w-[280px] rounded-md bg-gray-600 p-8 shadow-2xl lg:min-w-[352px] lg:flex-grow">
          <header className="flex items-center justify-between text-gray-300">
            <span>Saídas</span>
            <ArrowDownCircle size={32} className="text-red-300" />
          </header>
          <strong className="headline5 mt-4 block font-inter700">
            R$ 17.400,00
          </strong>
        </div>

        <div className="min-w-[280px] rounded-md bg-primary p-8 shadow-2xl lg:min-w-[352px] lg:flex-grow">
          <header className="flex items-center justify-between text-tBlack">
            <span>Total</span>
            <DollarSign size={32} className="text-tBlack" />
          </header>
          <strong className="headline5 mt-4 block font-inter700 text-tBlack">
            R$ 17.400,00
          </strong>
        </div>
      </div>
    </section>
  )
}
