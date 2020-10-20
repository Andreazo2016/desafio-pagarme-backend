import { CreateTransationUseCase, TransationData } from '../../../usecases/transactions/create-transaction'
import { Transaction } from '../../../entities/Transaction'
import { CreateTransactionRepository } from '../../repositories/transactions/create-transaction'
export class CreateTransactionDB implements CreateTransationUseCase {
  private readonly createTransactionRepository: CreateTransactionRepository
  constructor (createTransactionRepository: CreateTransactionRepository) {
    this.createTransactionRepository = createTransactionRepository
  }

  async create (transactionData: TransationData): Promise<Transaction> {
    const transaction = await this.createTransactionRepository.create(transactionData)
    return transaction
  }
}
