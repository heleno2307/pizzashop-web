import { api } from '@/lib/axios'

export type DailyRevenueInPeriodResponse = {
  receipt: number
  date: string
}[]

interface GetDailyRevenueInPeriodQuery {
  from?: Date
  to?: Date
}
export async function getDailyRevenueInPeriod({
  from,
  to,
}: GetDailyRevenueInPeriodQuery) {
  const response = await api.get<DailyRevenueInPeriodResponse>(
    '/metrics/daily-receipt-in-period',
    {
      params: {
        from,
        to,
      },
    },
  )

  return response.data
}
