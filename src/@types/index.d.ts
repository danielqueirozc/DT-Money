import { Children } from "react"

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

  export interface Login {
    Username: string;
    Password: string;
  }

  export interface Register extends Login {
    ConfirmPassword: string;
  }

  export interface ChildrenProps {
    children: React.ReactNode
  }