import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { Login } from './components/login'

import { TransactionsProvider } from './contexts/TransactionsContext'
import { Transactions } from './pages/transactios'

export function App() {
  return (
    <div>
      <TransactionsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>        
        </BrowserRouter>
      </TransactionsProvider>
    </div>
  )
}
