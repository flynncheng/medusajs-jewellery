'use client';
import { Settings2 } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Collection() {
  const [position, setPosition] = React.useState('bottom');

  const products = [
    {
      id: 1,
      name: 'Earthen Bottle',
      href: '/products/shirt',
      price: '$48',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
      imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
    },
    {
      id: 2,
      name: 'Nomad Tumbler',
      href: '#',
      price: '$35',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
      imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
    },
    {
      id: 3,
      name: 'Focus Paper Refill',
      href: '#',
      price: '$89',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
      imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
    },
    {
      id: 4,
      name: 'Machined Mechanical Pencil',
      href: '#',
      price: '$35',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
      imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
    },
    {
      id: 5,
      name: 'Earthen Bottle',
      href: '#',
      price: '$48',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
      imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
    },
    {
      id: 6,
      name: 'Nomad Tumbler',
      href: '#',
      price: '$35',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
      imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
    },
    {
      id: 7,
      name: 'Focus Paper Refill',
      href: '#',
      price: '$89',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
      imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
    },
    {
      id: 8,
      name: 'Machined Mechanical Pencil',
      href: '#',
      price: '$35',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
      imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
    },
  ];

  return (
    <main>
      <section className="sticky top-24 z-40 bg-white shadow-sm lg:top-16">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:max-w-screen-2xl lg:px-8">
          <h1 className="text-sm">All Handbags</h1>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex gap-1.5 rounded-full">
                  <Settings2 size={16} />
                  Sort
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48" align="end">
                <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                  <DropdownMenuRadioItem value="top">Latest Arrivals</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="bottom">Price: Low -&gt; High</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="right">Price: High -&gt; Low</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </section>
      <section className="relative overflow-hidden lg:max-h-[80vh]">
        <a href="/collections/ring">
          <picture className="after:inset-x-0 after:bottom-0 after:h-1/2 after:bg-gradient-to-t after:from-[rgba(0,0,0,0.5)] after:to-[rgba(0,0,0,0)] lg:after:absolute">
            <source
              srcSet="/assets/images/hero-large.webp"
              media="(min-width: 1024px)"
            />
            <Image
              src="/assets/images/hero.webp"
              alt="Picture of the hero"
              width={1440}
              height={1800}
              style={{ width: '100%' }}
              priority
            />
          </picture>
          <div className="p-6 pb-0 lg:absolute lg:bottom-12 lg:max-w-3xl lg:p-12 lg:pb-0 lg:text-white xl:px-[8vw]">
            <h2 className="mb-6 mt-3 text-3xl tracking-tight">Tote Bags</h2>
            <p className="text-sm leading-6 lg:tracking-wider">
              Function meets form with Louis Vuitton’s sophisticated range of tote bags for Women. Crafted from the Maison’s signature materials, the versatile creations easily traverse the city and the beach.
            </p>
          </div>
        </a>
      </section>
      <section className="space-y-6 lg:space-y-12">
        <div className="relative z-10 mx-auto bg-white p-6 pb-0 lg:p-12 lg:pb-0 xl:px-[8vw]">
          <div className="grid grid-cols-2 gap-x-4 gap-y-6 lg:grid-cols-4">
            {products.map(product => (
              <a key={product.id} href={product.href} className="group">
                <div className="w-full overflow-hidden bg-gray-200">
                  <AspectRatio ratio={4 / 5}>
                    <Image
                      src={product.imageSrc}
                      alt={product.imageAlt}
                      width={400}
                      height={500}
                      className="size-full object-cover object-center group-hover:opacity-75"
                    />
                  </AspectRatio>
                </div>
                <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                <p className="mt-1 font-light text-gray-700">{product.price}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
