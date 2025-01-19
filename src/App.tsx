import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { Login } from './components/login'

import { TransactionsProvider } from './contexts/TransactionsContext'
import { Transactions } from './pages/transactios'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { ChildrenProps } from './@types'
import { Register } from './components/resgister'

const PrivateRoute = ({ children }: ChildrenProps) => {
  const { token } = useAuth();
  return token ? <>{children}</> : <Navigate to="/login" />
}

export function App() {
  return (
    <div>
      <AuthProvider>
        <TransactionsProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/transactions" element={
                <PrivateRoute>
                  <Transactions />
                </PrivateRoute>
              } />
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/register" element={<Register />} />
            </Routes>        
          </BrowserRouter>
        </TransactionsProvider>
      </AuthProvider>
    </div>
  )
}
