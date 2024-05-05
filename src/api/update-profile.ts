import { api } from '@/lib/axios'

export interface UpdateProfileBody {
  name: string
  description: string | null
}
export async function updateProfile({ description, name }: UpdateProfileBody) {
  api.put('/profile', {
    name,
    description,
  })
}
