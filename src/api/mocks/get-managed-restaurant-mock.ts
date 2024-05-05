import { http, HttpResponse } from 'msw'

import { GetManagedRestaurantResponse } from '../get-managed-restaurant'

export const getMenagedRestaurantMock = http.get<
  never,
  never,
  GetManagedRestaurantResponse
>('/managed-restaurant', () => {
  return HttpResponse.json({
    createdAt: new Date(),
    id: 'Custom-restaurant-id',
    name: 'Pizza Shop',
    updatedAt: null,
    description: 'Custom restaurant description',
    managerId: 'Custom-user-id',
  })
})
