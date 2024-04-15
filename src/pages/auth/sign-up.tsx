import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import * as z from 'zod'

import { registerRestaurant } from '@/api/register.restaurant'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const singUp = z.object({
  email: z.string().email(),
  restaurantName: z.string(),
  managerName: z.string(),
  phone: z.string(),
})

type SingUpFormType = z.infer<typeof singUp>

export function SingUp() {
  const navigate = useNavigate()
  const {
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting },
  } = useForm<SingUpFormType>({
    resolver: zodResolver(singUp),
  })
  const { mutateAsync: registerRestaurantFn } = useMutation({
    mutationFn: registerRestaurant,
  })
  const handleSingUp = async (data: SingUpFormType) => {
    await registerRestaurantFn({
      restaurantName: data.restaurantName,
      email: data.email,
      managerName: data.managerName,
      phone: data.phone,
    })
    try {
      toast.success('Restaurante cadastrado com sucesso.', {
        action: {
          label: 'Login',
          onClick: () => navigate(`/sign-in?email=${data.email}`),
        },
      })
    } catch (error) {
      toast.error('Erro ao cadastrar restaurante.')
    } finally {
      reset()
    }
  }
  return (
    <>
      <Helmet title="Cadastro" />
      <div className="p-8">
        <Button asChild className="absolute right-8 top-8" variant={'ghost'}>
          <Link to={'/sign-in'}>Fazer login</Link>
        </Button>
        <div className=" flex w-[350px] flex-col justify-center gap-6">
          <div className=" flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar conta grátis
            </h1>
            <p className="text-sm text-muted-foreground">
              seja um parceiro e começe suas vendas!
            </p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit(handleSingUp)}>
            <div className="space-y-2 ">
              <Label htmlFor="restaurantName">Nome do estabelecimento</Label>
              <Input
                id="restaurantName"
                type="text"
                {...register('restaurantName')}
              />
            </div>
            <div className="space-y-2 ">
              <Label htmlFor="managerName">Seu nome</Label>
              <Input
                id="managerName"
                type="text"
                {...register('managerName')}
              />
            </div>
            <div className="space-y-2 ">
              <Label htmlFor="phone">Seu celular</Label>
              <Input id="phone" type="tel" {...register('phone')} />
            </div>
            <div className="space-y-2 ">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input id="emial" type="email" {...register('email')} />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              Finalizar Cadastro
            </Button>
            <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
              Ao continuar, você concorda com nossos{' '}
              <a href="" className="underline underline-offset-4">
                Termos de serviço
              </a>{' '}
              e{' '}
              <a href="" className="underline underline-offset-4">
                políticas de privacidade
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}
