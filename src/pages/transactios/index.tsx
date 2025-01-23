import { useEffect, useState } from 'react'
import { Header } from '../../components/header'
import { Summary } from '../../components/summary'
import { dateFormatter, priceFormatter } from '../../utils/formatter'
import { SearchForm } from './components/SearchForm'
import { authService, transactionService } from '../../lib/axios'
import { Transaction } from '../../@types'

enum TransactionType {
  INCOME = 'income',
  OUTCOME = 'outcome',
}

export function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  async function fetchTransactions() {
    if (!authService.isAuthenticated()) {
      window.location.href = '/login'
      return
    }

    try {
      setIsLoading(true)
      const response = await transactionService.list()
      setTransactions(response)
    } catch (error) {
      setError(error as Error)
      console.error('Erro ao buscar transações:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      <Header onSuccess={fetchTransactions} />
      <Summary transactions={transactions} />

      <main className="w-full max-w-[1120px] mx-auto mt-16 px-6">
        <SearchForm />

        <table className="w-full border-separate border-spacing-y-2 mt-6">
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="p-5 bg-gray700 rounded-l-lg" width="40%">
                  {transaction.description}
                </td>
                <td className="p-5 bg-gray700">
                  <span
                    className={`${
                      transaction.type === TransactionType.INCOME
                        ? 'text-[#00b37e]'
                        : 'text-[#f75A68]'
                    }`}
                  >
                    {transaction.type === TransactionType.OUTCOME && '- '}
                    {priceFormatter.format(transaction.price)}
                  </span>
                </td>
                <td className="p-5 bg-gray700">{transaction.category}</td>
                <td className="p-5 bg-gray700 rounded-r-lg">
                  {dateFormatter.format(new Date(transaction.createdAt!))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  )
}
