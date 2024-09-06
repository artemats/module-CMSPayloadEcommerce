import Image from 'next/image'
import VerifyEmail from '@/components/VerifyEmail'

interface IVerifyEmailPage {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

const VerifyEmailPage = ({ searchParams }: IVerifyEmailPage) => {
  const { token, to: toEmail } = searchParams

  return (
    <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
        {token && typeof token === 'string' ? (
          <div className="grid gap-6">
            <VerifyEmail token={token} />
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-1">
            <div className="relative mb-4 h-80 w-80 text-muted-foreground">
              <Image src="/send-email.jpg" fill alt="MVP Payload Store" />
            </div>

            <h3 className="font-semibold text-2xl">Check your email</h3>

            {toEmail ? (
              <p className="text-muted-foreground text-center">
                We&apos;ve sent a verification link to{' '}
                <span className="font-semibold">{toEmail}</span>
              </p>
            ) : (
              <p className="text-muted-foreground">
                We&apos;ve sent a verification link to your email.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default VerifyEmailPage
