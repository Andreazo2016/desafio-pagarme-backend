import { CreateTransactionController } from './create-transaction'
import { CreateTransationUseCase, TransationData } from '../../../usecases/transactions/create-transaction'
import { Transaction } from '../../../entities/Transaction'

const makeCreateTransactionUseCaseStub = (): CreateTransationUseCase => {
  class CreateTransationUseCaseStub implements CreateTransationUseCase {
    async create (transactionData: TransationData): Promise<Transaction> {
      const fakeTransactionDebitCard: Transaction = {
        id: 'fake_id',
        value: 10,
        card_date_validate: 'fake_card_date_value',
        card_number: 'fake_card_number',
        description: 'fake_description',
        payment_type: 'debit_card',
        cvv: 'fake_cvv',
        name_owerner_card: 'fake_owerner'
      }
      return fakeTransactionDebitCard
    }
  }
  return new CreateTransationUseCaseStub()
}

interface SutTypes {
  sut: CreateTransactionController
  createTransationUseCaseStub: CreateTransationUseCase
}
const makeSut = (): SutTypes => {
  const createTransationUseCaseStub = makeCreateTransactionUseCaseStub()
  const sut = new CreateTransactionController(createTransationUseCaseStub)
  return {
    sut,
    createTransationUseCaseStub
  }
}
describe('CreateTrnsactionController', () => {
  test('Should return 400 if value is not provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        cardDateValidate: 'fake_card_date_value',
        cardNumber: 'fake_card_number',
        description: 'fake_description',
        paymentType: 'debit_card',
        cvv: 'fake_cvv',
        nameOwernerCard: 'fake_owerner'
      }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
  })
  test('Should return 400 if cardDateValidate is not provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        value: 0,
        cardNumber: 'fake_card_number',
        description: 'fake_description',
        paymentType: 'debit_card',
        cvv: 'fake_cvv',
        nameOwernerCard: 'fake_owerner'
      }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
  })

  test('Should call CreateTrnsactionUseCase with correct params', async () => {
    const { sut, createTransationUseCaseStub } = makeSut()
    const createSpy = jest.spyOn(createTransationUseCaseStub, 'create')
    const httpRequest = {
      body: {
        value: 10,
        description: 'any_description',
        paymentType: 'debit_card',
        cardNumber: 'any_card_number',
        nameOwernerCard: 'any_name',
        cardDateValidate: 'any_date',
        cvv: 'any_cvv'
      }
    }

    await sut.handle(httpRequest)

    expect(createSpy).toHaveBeenCalledWith({
      value: 10,
      description: 'any_description',
      payment_type: 'debit_card',
      card_number: 'any_card_number',
      name_owerner_card: 'any_name',
      card_date_validate: 'any_date',
      cvv: 'any_cvv'
    })
  })

  test('Should return 500', async () => {
    const { sut, createTransationUseCaseStub } = makeSut()
    jest.spyOn(createTransationUseCaseStub, 'create').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpRequest = {
      body: {
        value: 10,
        description: 'any_description',
        paymentType: 'debit_card',
        cardNumber: 'any_card_number',
        nameOwernerCard: 'any_name',
        cardDateValidate: 'any_date',
        cvv: 'any_cvv'
      }
    }

    const response = await sut.handle(httpRequest)

    expect(response.statusCode).toBe(500)
  })

  test('Should return 200', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        value: 10,
        description: 'any_description',
        paymentType: 'debit_card',
        cardNumber: 'any_card_number',
        nameOwernerCard: 'any_name',
        cardDateValidate: 'any_date',
        cvv: 'any_cvv'
      }
    }

    const response = await sut.handle(httpRequest)

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      data: {
        transaction: {
          id: 'fake_id',
          value: 0,
          card_date_validate: 'fake_card_date_value',
          card_number: 'fake_card_number',
          description: 'fake_description',
          payment_type: 'debit_card',
          cvv: 'fake_cvv',
          name_owerner_card: 'fake_owerner'
        }
      }
    })
  })
})
