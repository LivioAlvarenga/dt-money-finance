'use client'

import { TransactionsContext } from '@/context/TransactionsContext'
import clsx from 'clsx'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useContext } from 'react'

export function TransactionsPagination() {
  const {
    pageList,
    currentPage,
    prevPage,
    nextPage,
    setCurrentPage,
    totalPagination,
  } = useContext(TransactionsContext)

  function handleSetPage(page: number) {
    setCurrentPage(page)
  }
  function handlePrevPage(page: number) {
    prevPage(page)
  }
  function handleNextPage(page: number) {
    nextPage(page)
  }

  return (
    <div className="wrapper my-7 flex items-center justify-center gap-2">
      {/* Previous Page */}
      <button
        onClick={() => handlePrevPage(currentPage)}
        disabled={currentPage === 1}
        className="accessibilityFocus group flex h-[48px] w-[48px] items-center justify-center rounded-md border-0 bg-transparent enabled:cursor-pointer enabled:text-primary disabled:cursor-not-allowed disabled:text-gray-600"
      >
        <ChevronLeft
          size={30}
          className="duration-200 ease-linear lg:group-hover:scale-125"
        />
      </button>

      {/* Pages */}
      {pageList.map((page) => {
        return (
          <button
            key={page}
            onClick={() => handleSetPage(page)}
            disabled={page > totalPagination}
            className={clsx(
              'accessibilityFocus button flex h-[48px] w-[48px] items-center justify-center rounded-md border-0 p-4 duration-200 ease-linear enabled:cursor-pointer enabled:opacity-100 disabled:cursor-not-allowed disabled:opacity-50',
              {
                'bg-gray-600 text-gray-300 lg:enabled:hover:bg-tertiary lg:enabled:hover:text-tBlack':
                  page !== currentPage,
                'bg-primary text-tBlack lg:hover:bg-tertiary':
                  page === currentPage,
              },
            )}
          >
            <span className="subtitle1">{page}</span>
          </button>
        )
      })}

      {/* Next Page */}
      <button
        onClick={() => handleNextPage(currentPage)}
        disabled={currentPage >= totalPagination}
        className="accessibilityFocus group flex h-[48px] w-[48px] items-center justify-center rounded-md border-0 bg-transparent enabled:cursor-pointer enabled:text-primary disabled:cursor-not-allowed disabled:text-gray-600"
      >
        <ChevronRight
          size={30}
          className="duration-200 ease-linear lg:group-hover:scale-125"
        />
      </button>
    </div>
  )
}
