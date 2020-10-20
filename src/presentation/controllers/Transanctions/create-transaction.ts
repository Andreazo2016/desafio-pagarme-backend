/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { CreateTransationUseCase } from '../../../usecases/transactions/create-transaction'

export class CreateTransactionController implements Controller {
  private readonly createTransationUseCase: CreateTransationUseCase

  constructor (createTransationUseCase: CreateTransationUseCase) {
    this.createTransationUseCase = createTransationUseCase
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const fields = ['value', 'description', 'paymentType', 'cardNumber', 'nameOwernerCard', 'cardDateValidate', 'cvv']
      for (const field of fields) {
        if (!httpRequest.body[field]) {
          return {
            statusCode: 400,
            body: { error: { message: `Missing params ${field}` } }
          }
        }
      }
      const {
        value,
        description,
        paymentType,
        cardNumber,
        nameOwernerCard,
        cardDateValidate,
        cvv
      } = httpRequest.body

      const data = {
        value,
        description,
        payment_type: paymentType,
        card_number: cardNumber,
        name_owerner_card: nameOwernerCard,
        card_date_validate: cardDateValidate,
        cvv
      }

      const transaction = await this.createTransationUseCase.create(data)

      return {
        statusCode: 200,
        body: { data: { transaction } }
      }
    } catch (error) {
      return {

        statusCode: 500,
        body: { error: { message: 'Internal Server Error' } }
      }
    }
  }
}
