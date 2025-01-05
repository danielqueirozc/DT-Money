export enum TransactionType {
    INCOME = 'income',
    OUTCOME = 'outcome',
  }
  
  export interface Transaction {
    id?: string
    description: string
    type: TransactionType
    price: number
    category: string
    createdAt?: Date
  }
  