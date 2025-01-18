import * as Dialog from '@radix-ui/react-dialog'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { transactionService } from '../../lib/axios'

enum TransactionType {
  INCOME = 'income',
  OUTCOME = 'outcome',
}

interface onSuccessProps {
  onSuccess: () => void
}

const newTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome']),
})

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>

export function NewTransactionModal({ onSuccess }: onSuccessProps) {
  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema),
  })

  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    const { description, price, type, category } = data

    try {
      await transactionService.create({
        description,
        price,
        category,
        type: type as TransactionType,
      })
    } catch (error) {
      console.log('Error creating new transaction', error)
    } finally {
      reset()
      onSuccess()
    }
  }

  return (
    <Dialog.Portal>
      <div className="fixed inset-0 bg-black bg-opacity-75" />

      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 rounded-lg p-10 w-[32rem]">
        <Dialog.Title className="text-lg font-bold text-white">Nova transação</Dialog.Title>

        <button
          className="absolute top-6 right-6 bg-transparent text-gray-500 cursor-pointer"
          aria-label="Close"
        >
          <X size={24} />
        </button>

        <form
          onSubmit={handleSubmit(handleCreateNewTransaction)}
          className="flex flex-col gap-4 mt-8"
        >
          <input
            type="text"
            placeholder="Descrição"
            required
            {...register('description')}
            className="rounded-lg border-0 bg-gray-900 text-gray-300 p-4 placeholder-gray-500"
          />
          <input
            type="number"
            placeholder="Preço"
            required
            {...register('price', { valueAsNumber: true })}
            className="rounded-lg border-0 bg-gray-900 text-gray-300 p-4 placeholder-gray-500"
          />
          <input
            type="text"
            placeholder="Categoria"
            required
            {...register('category')}
            className="rounded-lg border-0 bg-gray-900 text-gray-300 p-4 placeholder-gray-500"
          />

          <Controller
            control={control}
            name="type"
            render={({ field }) => (
              <div className="grid grid-cols-2 gap-4 mt-2">
                <button
                  type="button"
                  onClick={() => field.onChange('income')}
                  className={`bg-gray-700 p-4 flex items-center justify-center gap-2 rounded-lg cursor-pointer text-gray-300 ${
                    field.value === 'income'
                      ? 'text-white bg-green-700'
                      : 'hover:bg-gray-600'
                  }`}
                >
                  <ArrowCircleUp size={24} />
                  Entrada
                </button>

                <button
                  type="button"
                  onClick={() => field.onChange('outcome')}
                  className={`bg-gray-700 p-4 flex items-center justify-center gap-2 rounded-lg cursor-pointer text-gray-300 ${
                    field.value === 'outcome'
                      ? 'text-white bg-red-700'
                      : 'hover:bg-gray-600'
                  }`}
                >
                  <ArrowCircleDown size={24} />
                  Saída
                </button>
              </div>
            )}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="h-14 bg-green-500 text-white font-bold px-5 rounded-lg mt-6 cursor-pointer hover:bg-green-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </Dialog.Portal>
  )
}
