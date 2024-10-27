'use client';

import Image from 'next/image';
import React, { useEffect } from 'react';

import { AspectRatio } from '@/components/ui/aspect-ratio';
import { CardContent } from '@/components/ui/card';
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { cn } from '@/libs/shadcn';

export default function ProductImages({ images, title }) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <>
      <div className="w-full lg:hidden">
        <div className="relative">
          <Carousel setApi={setApi}>
            <CarouselContent>
              {images.map(el => (
                <CarouselItem key={el.id}>
                  <CardContent className="relative flex aspect-square items-center justify-center p-0">
                    <Image
                      src={el.url}
                      alt={title}
                      width={400}
                      height={500}
                      className="size-full object-cover object-center group-hover:opacity-75"
                    />
                  </CardContent>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          {count > 0
          && (
            <span className="absolute bottom-4 right-4 rounded bg-black/50 px-2.5 pt-0.5 text-sm text-white sm:right-6">
              {`${current} / ${count}`}
            </span>
          )}
        </div>
      </div>

      <div className="lg:w-1/2">
        <div className="hidden lg:block">
          {images.map((el, index) => (
            <div key={el.id} className={cn('w-full overflow-hidden shadow-sm', index !== 0 && 'mt-1')}>
              <AspectRatio ratio={1 / 1}>
                <Image
                  src={el.url}
                  alt={title}
                  width={400}
                  height={500}
                  className="size-full object-cover object-center group-hover:opacity-75"
                />
              </AspectRatio>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
