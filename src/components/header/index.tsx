import { HeaderContainer, HeaderContent, NewTransactionsButton } from './styles'
import * as Dialog from '@radix-ui/react-dialog'

import logoImg from '../../assets/Logo.svg'
import { NewTransactionModal } from '../NewTransactionModal'

interface SuccessProps {
  onSuccess: () => void
}

export function Header({ onSuccess }: SuccessProps) {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="" />

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NewTransactionsButton>Nova transação</NewTransactionsButton>
          </Dialog.Trigger>

          <NewTransactionModal onSuccess={onSuccess} />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}
