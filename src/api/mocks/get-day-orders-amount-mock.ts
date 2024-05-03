import { http, HttpResponse } from 'msw'

import { GetDayOrdersAmountResponse } from '../get-day-oders-amount'

export const getDayOrdersAmountMock = http.get<
  never,
  never,
  GetDayOrdersAmountResponse
>('/metrics/day-orders-amount', () => {
  return HttpResponse.json({
    amount: 5,
    diffFromYesterday: -5,
  })
})
