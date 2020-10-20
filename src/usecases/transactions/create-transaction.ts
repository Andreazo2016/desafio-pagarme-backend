import { Transaction } from '../../entities/Transaction'
export interface TransationData{
  value: number
  description: string
  payment_type: 'debit_card'|'credit_card'
  card_number: string
  name_owerner_card: string
  card_date_validate: string
  cvv: string
}
export interface CreateTransationUseCase{
  create: (transactionData: TransationData) => Promise<Transaction>
}
