export interface Transaction{
  id: string
  value: number
  description: string
  payment_type: 'debit_card'|'credit_card'
  card_number: string
  name_owerner_card: string
  card_date_validate: string
  cvv: string
}
