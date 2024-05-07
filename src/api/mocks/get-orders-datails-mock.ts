import { http, HttpResponse } from 'msw'

import {
  GetOrderDatailsParams,
  GetOrderDatailsResponse,
} from '../get-order-datails'

export const getOrdersDatailsMock = http.get<
  GetOrderDatailsParams,
  never,
  GetOrderDatailsResponse
>('/orders/:orderid', ({ params }) => {
  return HttpResponse.json({
    createdAt: new Date().toISOString(),
    customer: {
      email: 'johndoe@exemple.com',
      name: 'John Doe',
      phone: '99 9999999',
    },
    id: params.orderId,
    status: 'pending',
    orderItems: [
      {
        id: 'order-item-1',
        priceInCents: 1000,
        product: { name: 'Pizza Pepperoni' },
        quantity: 1,
      },
      {
        id: 'order-item-2',
        priceInCents: 2000,
        product: { name: 'Pizza Marguerita' },
        quantity: 2,
      },
    ],
    totalInCents: 5000,
  })
})
