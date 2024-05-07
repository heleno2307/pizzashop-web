import { http, HttpResponse } from 'msw'

import { DispathOrderProps } from '../dispath-order'

export const dispathOrderMock = http.patch<DispathOrderProps, never, never>(
  '/orders/:orderId/dispath',
  async ({ params }) => {
    if (params.orderId === 'error-order-id') {
      return new HttpResponse(null, { status: 400 })
    }

    return new HttpResponse(null, { status: 204 })
  },
)
