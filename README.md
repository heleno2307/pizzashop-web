# Exemplos de como usar o Tanstack - React Query

Iremos usar duas Bibliotecas para utilizar o react-query

## Instalação:
- instalação do react-query.
```
  npm i @tanstack/react-query
```
- instalação do axios.
```
  npm i axios
```

## Para iniciar devemos criar um arquivo para ficar nossa instacia do QueryClient.

```ts
import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient()

```
## Após isso devemos envolver nossa aplicação no QueryClientProvider e passar nossa instância como propiedade.
```jsx
import { queryClient } from './lib/react-query'
import { QueryClientProvider } from '@tanstack/react-query'

<QueryClientProvider client={queryClient}>
  <RouterProvider router={router} />
</QueryClientProvider>
```

## Para fazer requisições verbo POST, PUT e DELETE, devemos usar o hook useMutation.
### Exemplo de utilização:
```tsx
export interface SignInBody {
  email: string
}
export async function signIn({ email }: SignInBody) {
  await api.post('/authenticate', { email })
}

```
```tsx
import { useMutation } from '@tanstack/react-query'
import { signIn } from '@/api/sign-in'

const { mutateAsync: authenticate } = useMutation({
    //função axios para fazer a requisição.
    mutationFn: signIn,
  })
```
