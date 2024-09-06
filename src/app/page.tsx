import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Link from 'next/link'
import { Button, buttonVariants } from '@/components/ui/button'
import { ScanSearch, ShieldCheck, SquareMousePointer } from 'lucide-react'
import ProductReel from '@/components/ProductReel'

const perks = [
  {
    name: 'High-Quality Resources',
    Icon: ShieldCheck,
    description:
      'We offer only the best. Our test images, icons, and templates are top-notch, ensuring your projects stand out.',
  },
  {
    name: 'Wide Selection',
    Icon: SquareMousePointer,
    description:
      'From modern icons to versatile templates, our store provides a diverse range of digital assets for any creative need.',
  },
  {
    name: 'Instant Access',
    Icon: ScanSearch,
    description:
      'Get the assets you need instantly. Download and start working right away, keeping your creative flow uninterrupted.',
  },
]

export default function Home() {
  return (
    <>
      <MaxWidthWrapper>
        <div className="py-20 mx-auto text-center flex flex-col items-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Payload Store – Empowering Your Creativity with{' '}
            <span className="text-blue-600">Quality Assets</span>
          </h1>
          <p className="mt-8 text-md max-w-prose text-muted-foreground">
            Explore our Payload Store for a diverse range of test images, icons,
            and design templates. Whether you&apos;re a designer, developer, or
            creative enthusiast, our resources are here to help you create with
            confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link href="/products" className={buttonVariants()}>
              Browse Trending
            </Link>
            <Button variant="ghost">Discover our quality &rarr;</Button>
          </div>
        </div>
        <ProductReel
          query={{ sort: 'desc', limit: 4 }}
          title="Brand new"
          href="/products"
        />
      </MaxWidthWrapper>
      <section className="border-t border-gray-200 bg-gray-50">
        <MaxWidthWrapper className="py-20">
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
            {perks.map((perk) => (
              <div
                key={perk.name}
                className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
              >
                <div className="md:flex-shrink-0 flex justify-center">
                  <div className="h-16 w-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-900">
                    {<perk.Icon className="w-1/25 h-1/25" />}
                  </div>
                </div>
                <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                  <h3 className="text-base font-medium text-gray-900">
                    {perk.name}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {perk.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  )
}
