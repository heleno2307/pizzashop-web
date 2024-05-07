import { api } from '@/lib/axios'

export interface GetOrderDatailsParams {
  orderId: string
}

export interface GetOrderDatailsResponse {
  status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
  id: string
  createdAt: string
  totalInCents: number
  customer: {
    name: string
    email: string
    phone: string | null
  }
  orderItems: {
    id: string
    priceInCents: number
    quantity: number
    product: {
      name: string
    }
  }[]
}
export async function getOrderDatails({ orderId }: GetOrderDatailsParams) {
  const response = await api.get<GetOrderDatailsResponse>(`/orders/${orderId}`)
  return response.data
}
