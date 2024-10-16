import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Metadata } from 'next'

export const cn = function (...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatPrice = function (
  price: number | string,
  options: {
    currency?: 'USD' | 'EUR' | 'GBP' | 'BDT'
    notation?: Intl.NumberFormatOptions['notation']
  } = {},
) {
  const { currency = 'USD', notation = 'compact' } = options

  const numericPrice = typeof price === 'string' ? parseFloat(price) : price

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    notation,
    maximumFractionDigits: 2,
  }).format(numericPrice)
}

export const constructMetadata = ({
  title = 'MVP Payload Store',
  description = 'Payload Store – Empowering Your Creativity with Quality Assets',
  image = '/OG.jpg',
  icons = '/favicon.ico',
  noIndex = false,
}: {
  title?: string
  description?: string
  image?: string
  icons?: string
  noIndex?: boolean
} = {}): Metadata => {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@studio_presto',
    },
    icons,
    metadataBase: new URL('https://mvp-payloadstore.vercel.app/'),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  }
}
