import { CreateTransactionRepository } from '../../../../../data/repositories/transactions/create-transaction'
import { TransationData } from '../../../../../usecases/transactions/create-transaction'
import { Transaction } from '../../../../../entities/Transaction'
import { MongoHelper } from '../../helpers/mongo-helper'

export class CreateTrnsactionRepositoryMongo implements CreateTransactionRepository {
  async create (transactionData: TransationData): Promise<Transaction> {
    const transactionCollection = await MongoHelper.getCollection('transactions')
    const result = await transactionCollection.insertOne(transactionData)
    return MongoHelper.map(result.ops[0])
  }
}
