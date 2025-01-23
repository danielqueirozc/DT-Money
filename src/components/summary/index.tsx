import { ArrowCircleUp, ArrowCircleDown, CurrencyDollar } from 'phosphor-react'
import { useSummary } from '../../hooks/useSummary'
import { priceFormatter } from '../../utils/formatter'

import { Transaction } from '../../@types'

interface TransactionsProps {
  transactions: Transaction[]
}

export function Summary({ transactions }: TransactionsProps) {
  const summary = useSummary({ transactions })

  return (
    <section className="w-full max-w-[1120px] mx-auto px-6 grid grid-cols-3 gap-8 -mt-20">
      <div className="bg-gray700 rounded-lg p-8">
        <header className="flex items-center justify-between text-gray300">
          <span>Entradas</span>
          <ArrowCircleUp size={32} color="#00B37E" />
        </header>

        <strong className="block mt-4 text-2xl">
          {priceFormatter.format(summary.income)}
        </strong>
      </div>

      <div className="bg-gray700 rounded-lg p-8">
        <header className="flex items-center justify-between text-gray300">
          <span>Saídas</span>
          <ArrowCircleDown size={32} color="#F75A68" />
        </header>

        <strong className="block mt-4 text-2xl">
          {priceFormatter.format(summary.outcome)}
        </strong>
      </div>

      <div className="bg-green700 rounded-lg p-8">
        <header className="flex items-center justify-between text-gray300">
          <span>Total</span>
          <CurrencyDollar size={32} color="#fff" />
        </header>

        <strong className="block mt-4 text-2xl">
          {priceFormatter.format(summary.total)}
        </strong>
      </div>
    </section>
  )
}
