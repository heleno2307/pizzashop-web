import { api } from '@/lib/axios'

export interface DispathOrderProps {
  orderId: string
}

export async function dispatchOrder({ orderId }: DispathOrderProps) {
  await api.patch(`/orders/${orderId}/dispatch`)
}
