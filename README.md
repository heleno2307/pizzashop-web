# Exemplos de como usar o Tanstack - React Query

Iremos usar duas Bibliotecas para utilizar o react-query

## Instalação:
- instalação da biblioteca.
```
  npm i @tanstack/react-query
```
- instalação dos @Types.
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
