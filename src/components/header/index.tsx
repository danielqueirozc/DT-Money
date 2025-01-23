import * as Dialog from '@radix-ui/react-dialog'
import logoImg from '../../assets/Logo.svg'
import { NewTransactionModal } from '../NewTransactionModal'

interface SuccessProps {
  onSuccess: () => void
}

export function Header({ onSuccess }: SuccessProps) {
  return (
    <header className="bg-gray900 py-10 pb-28">
      <div className="w-full max-w-[1120px] mx-auto px-6 flex justify-between items-center">
        <img src={logoImg} alt="Logo" />

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button className="h-12 border-0 bg-green500 text-white font-bold px-5 rounded-lg hover:bg-green700 transition-colors">
              Nova transação
            </button>
          </Dialog.Trigger>

          <NewTransactionModal onSuccess={onSuccess} />
        </Dialog.Root>
      </div>
    </header>
  )
}
