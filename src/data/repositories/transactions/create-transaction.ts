import { TransationData } from '../../../usecases/transactions/create-transaction'
import { Transaction } from '../../../entities/Transaction'

export interface CreateTransactionRepository{
  create: (transactionData: TransationData) => Promise<Transaction>
}
