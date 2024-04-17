import { api } from '@/lib/axios'

export interface GetMonthCanceledCanceldOrdersAmountResponse {
  amount: number
  diffFromLastMonth: number
}
export async function getMonthCanceledOrdersAmount() {
  const response = await api.get<GetMonthCanceledCanceldOrdersAmountResponse>(
    '/metrics/month-canceled-orders-amount',
  )

  return response.data
}
