import { http, HttpResponse } from 'msw'

import { GetPopularProductsResponse } from '../get-popular-products'

export const getPopularProductsMock = http.get<
  never,
  never,
  GetPopularProductsResponse
>('/metrics/popular-products', () => {
  return HttpResponse.json([
    { amount: 50, product: 'pizza-pepperoni' },
    { amount: 45, product: 'pizza-calabresa' },
    { amount: 90, product: 'pizza-dwqhd' },
    { amount: 25, product: 'pizza-ertgdd' },
    { amount: 20, product: 'pizza-ertgdd' },
  ])
})
