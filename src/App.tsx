import { TransactionsProvider } from './contexts/TransactionsContext'
import { Transactions } from './pages/transactios'
import { GlobalStyle } from './styles/global'

export function App() {
  return (
    <div>
      <GlobalStyle />

      <TransactionsProvider>
        <Transactions />
      </TransactionsProvider>
    </div>
  )
}
