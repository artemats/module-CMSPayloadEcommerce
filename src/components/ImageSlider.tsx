'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import type SwiperType from 'swiper'

import 'swiper/css'
import 'swiper/css/pagination'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface IImageSlider {
  urls: string[]
}

const ImageSlider = ({ urls }: IImageSlider) => {
  const [swiper, setSwiper] = useState<null | SwiperType>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const activeStyles =
    'active:scale-[0.97] grid opacity-100 hover:scale-105 absolute top-1/2 -translate-y-1/2 aspect-square h-8 w-8 z-50 place-items-center rounded-full border-2 bg-white border-zinc-300'
  const inActiveStyles = 'hidden text-gery-400'

  const [slideConfig, setSlideConfig] = useState({
    isBeginning: true,
    isEnd: activeIndex === (urls.length ?? 0) - 1,
  })

  useEffect(() => {
    swiper?.on('slideChange', ({ activeIndex }) => {
      setActiveIndex(activeIndex)
      setSlideConfig({
        isBeginning: activeIndex === 0,
        isEnd: activeIndex === (urls.length ?? 0) - 1,
      })
    })
  }, [swiper, urls])

  return (
    <div className="group relative bg-zinc-100 aspect-square overflow-hidden rounded-xl">
      <div className="absolute z-10 inset-0 opacity-0 group-hover:opacity-100 transition">
        <button
          className={cn(activeStyles, 'right-3 transition', {
            [inActiveStyles]: slideConfig.isEnd,
            'hover:bg-primary-300 text-primary-800 opacity-100':
              !slideConfig.isEnd,
          })}
        >
          <ChevronRight
            onClick={(e) => {
              e.preventDefault()
              swiper?.slideNext()
            }}
            className="h-4 w-4 text-zinc-700"
            aria-label="next image"
          />{' '}
        </button>
        <button
          className={cn(activeStyles, 'left-3 transition', {
            [inActiveStyles]: slideConfig.isBeginning,
            'hover:bg-primary-300 text-primary-800 opacity-100':
              !slideConfig.isBeginning,
          })}
        >
          <ChevronLeft
            onClick={(e) => {
              e.preventDefault()
              swiper?.slidePrev()
            }}
            className="h-4 w-4 text-zinc-700"
            aria-label="previous image"
          />{' '}
        </button>
      </div>

      <Swiper
        onSwiper={(swiper) => setSwiper(swiper)}
        spaceBetween={50}
        slidesPerView={1}
        modules={[Pagination]}
        pagination={{
          renderBullet: (_, className) => {
            return `<span class="rounded-full transition ${className}"></span>`
          },
        }}
        className="h-full w-full"
      >
        {urls.map((url, index) => (
          <SwiperSlide
            key={`${index}-${url}`}
            className="-z-10 relative h-full w-full"
          >
            <Image
              fill
              loading="eager"
              className="-z-10 h-full w-full object-contain object-center"
              src={url}
              alt={`Product image ${url}`}
              sizes="100%"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default ImageSlider
