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
## Para fazer uma requisição verbo GET.
### Exemplo de utilização:
- Utilizando React-query
```tsx
  const { data: managedRestaurant, isLoading: isLoadingManagedRestaurant } =
    useQuery({
      queryKey: ['managed-restaurant'],
      queryFn: getManagedRestaurant,

      // desativa revalidação de dados quando muda de aba.
      staleTime: Infinity,
    })
```
## Para fazer requisições verbo POST, PUT e DELETE, devemos usar o hook useMutation.
### Exemplo de utilização:
- Função Axios
```ts
export interface SignInBody {
  email: string
}
export async function signIn({ email }: SignInBody) {
  await api.post('/authenticate', { email })
}

```
- Utilizando React-query para fazer 
```tsx
import { useMutation } from '@tanstack/react-query'
import { signIn } from '@/api/sign-in'

const { mutateAsync: authenticate } = useMutation({
    //função axios para fazer a requisição.
    mutationFn: signIn,
  })

const handleSignIn = async (data: SingInFormType) => {
    try {
      // chamando a requisição
      await authenticate({ email: data.email })
      toast.success('Enviamos um link de autenticação para seu e-mail.', {
        action: {
          label: 'Reenviar',
          onClick: () => handleSignIn(data),
        },
      })
    } catch (error) {
      toast.error('Erro ao realizar login')
    } finally {
      reset()
    }
  }
```
### Alterando uma requisição em cache
```tsx
//função para atualizar o estado da requisição em cache.
const updateManagedRestaurantCache = ({
    name,
    description,
  }: StoreProfileSchema) => {
    const cached = queryClient.getQueryData<GetManagedRestaurantResponse>([
      'managed-restaurant',
    ])

    if (cached) {
      queryClient.setQueryData<GetManagedRestaurantResponse>(
        ['managed-restaurant'],
        {
          ...cached,
          name,
          description,
        },
      )
    }
    // retorna todos os dados antes da mudança
    return { cached }
  }

 const { mutateAsync: updateProfileFn } = useMutation({
    mutationFn: updateProfile,
    onSuccess(_,{description,name}){
      updateManagedRestaurantCache({description,name})
    }
  })
```
### Agora utilizando o conceito de interface otimista
- Utilizando React-query
```tsx
//função para atualizar o estado da requisição em cache.
const updateManagedRestaurantCache = ({
    name,
    description,
  }: StoreProfileSchema) => {
    const cached = queryClient.getQueryData<GetManagedRestaurantResponse>([
      'managed-restaurant',
    ])

    if (cached) {
      queryClient.setQueryData<GetManagedRestaurantResponse>(
        ['managed-restaurant'],
        {
          ...cached,
          name,
          description,
        },
      )
    }
    // retorna todos os dados antes da mudança
    return { cached }
  }

//hook react query
const { mutateAsync: updateProfileFn } = useMutation({
    //função axios
    mutationFn: updateProfile,

    // Altera o cache da requisição sem ter certeza se a requisição foi um sucesso.
    onMutate({ description, name }) {
      const { cached } = updateManagedRestaurantCache({ description, name })

      //pega as informações antogas e disponibiliza no contexto da função.
      return { previusProfile: cached }
    },

    // Caso haja erro retorna as informações antigas para o cache da requisição.
    onError(_, __, context) {
      if (context?.previusProfile) {
        updateManagedRestaurantCache(context.previusProfile)
      }
    },
  })

//Envio de formulário
const handleSubmitProfile = async (data: StoreProfileSchema) => {
    try {
      //chamada função react query
      await updateProfileFn({
        description: data.description,
        name: data.name,
      })

      toast.success('Perfil atualizado com sucesso!')
    } catch {
      toast.error('Falha ao autualizar o perfil tente novamente!')
    }
  }
```
