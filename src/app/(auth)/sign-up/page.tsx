'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ArrowRight } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Icons } from '@/components/Icons'
import { buttonVariants } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  AuthCredentialsValidator,
  TAuthCredentialsValidator,
} from '@/lib/validators/account-credentials-validator'
import { trpc } from '@/trpc/client'
import { toast } from 'sonner'

const Page = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  })

  const { mutate } = trpc.auth.createPayloadUser.useMutation({
    onError: (err) => {
      if (err.data?.code === 'CONFLICT') {
        toast.error('This email is already in use. Sign in instead?')

        return
      }

      if ('issue' in err && Array.isArray(err.issue)) {
        toast.error(err.issue[0].message)

        return
      }

      toast.error('Something went wrong. Please try again.')
    },
    onSuccess: ({ sentToEmail }) => {
      toast.success(`Verification email sent to ${sentToEmail}`)
      router.push(`/verify-email?to=${sentToEmail}`)
    },
  })

  const onSubmit: SubmitHandler<TAuthCredentialsValidator> = ({
    email,
    password,
  }) => {
    mutate({ email, password })
  }

  return (
    <>
      <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Icons.logo className="h-20 w-20" />
            <h1 className="text-3xl font-bold">Create an account</h1>
            <Link
              href="/sign-in"
              className={buttonVariants({
                variant: 'link',
                className: 'gap-1.5',
              })}
            >
              Already have an account? Sign in
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grod- gap-2">
                <div className="grid gap-1 py-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    {...register('email')}
                    className={cn({
                      'focus-visible:ring-red-500': errors.email,
                    })}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-1 py-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    {...register('password')}
                    type="password"
                    className={cn({
                      'focus-visible:ring-red-500': errors.password,
                    })}
                    placeholder="******"
                  />
                  {errors.password && (
                    <p className="text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <Button className="w-full mt-2">Sign up</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
