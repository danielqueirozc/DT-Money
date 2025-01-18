import { MagnifyingGlass } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from 'react'
import { TransactionsContext } from '../../../contexts/TransactionsContext'

const searchFormSchema = z.object({
  query: z.string(),
})

type SearchFormInputs = z.infer<typeof searchFormSchema>

export function SearchForm() {
  const { fetchTransactions } = useContext(TransactionsContext)

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  })

  async function handleSearchTransactions(data: SearchFormInputs) {
    await fetchTransactions(data.query)
  }

  return (
    <form
      onSubmit={handleSubmit(handleSearchTransactions)}
      className="flex gap-4"
    >
      <input
        type="text"
        placeholder="Busque por transações"
        {...register('query')}
        className="flex-1 rounded-md border-0 bg-gray-900 text-gray-300 p-4 placeholder-gray-500"
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex items-center gap-3 border-0 p-4 bg-transparent border border-green-300 text-green-300 font-bold rounded-md cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed hover:bg-green-500 hover:border-green-500 hover:text-white transition-colors"
      >
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </form>
  )
}
