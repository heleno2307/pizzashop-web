import { http, HttpResponse } from 'msw'

import { GetProfileResponse } from '../get-profile'

export const getProfileMock = http.get<never, never, GetProfileResponse>(
  '/me',
  () => {
    return HttpResponse.json({
      createdAt: new Date(),
      email: 'johndoe@exemple.com',
      id: 'efejhfweifh',
      name: 'John Doe',
      phone: '31 9999999',
      updatedAt: null,
      role: 'manager',
    })
  },
)
