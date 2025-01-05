import { useEffect, useState } from 'react'
import { Header } from '../../components/header'
import { Summary } from '../../components/summary'
import { dateFormatter, priceFormatter } from '../../utils/formatter'
import { SearchForm } from './components/SearchForm'
import { PriceHighLight, TransactionsContainer, TransactionsTable,} from './styles'
import { transactionService } from '../../lib/axios'
import { Transaction } from '../../@types'

 enum TransactionType {
  INCOME = 'income',
  OUTCOME = 'outcome',
}

export function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchTransactions() {
      try {
        setIsLoading(true)
        const response = await transactionService.list()
        setTransactions(response)
      } catch (error) {
        setError(error as Error)
        console.error('Error fetching transactions:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTransactions()
  }, [])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />

        <TransactionsTable>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td width="40%">{transaction.description}</td>
                <td>
                  <PriceHighLight variant={transaction.type}>
                    {transaction.type === TransactionType.OUTCOME && '- '}
                    {priceFormatter.format(transaction.price)}
                  </PriceHighLight>
                </td>
                <td>{transaction.category}</td>
                <td>
                  {dateFormatter.format(new Date(transaction.createdAt!))}
                </td>
              </tr>
            ))}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  )
}
