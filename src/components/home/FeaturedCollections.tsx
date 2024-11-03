import Image from 'next/image';
import React from 'react';

import { AspectRatio } from '@/components/ui/aspect-ratio';

export default function FeaturedCollections() {
  const products = [
    {
      id: 1,
      name: 'Earthen Bottle',
      href: '#',
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
    <>
      <section className="space-y-6 lg:space-y-12">
        <a href="/home" className="block px-6 text-center lg:px-8">
          <span className="text-[10px] uppercase tracking-wide">women</span>
          <h2 className="mb-6 mt-3 text-3xl tracking-tight">Iconic Handbags: The Side Trunk</h2>
          <span className="underline underline-offset-4">Explore the Selection</span>
        </a>
        <picture className="sticky top-14 z-[-1] block max-h-[85vh] overflow-hidden lg:top-16">
          <source
            srcSet="/assets/images/one-large.avif"
            media="(min-width: 1024px)"
          />
          <Image
            src="/assets/images/one.avif"
            alt="Picture of the hero"
            width={2400}
            height={2400}
            style={{ width: '100%' }}
            priority
          />
        </picture>
        <div className="mx-auto bg-white p-6 pb-0 lg:p-12 lg:pb-0 xl:px-[8vw]">
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
      <section className="space-y-6 lg:space-y-12">
        <a href="/home" className="block px-6 text-center lg:px-8">
          <span className="text-[10px] uppercase tracking-wide">women</span>
          <h2 className="mb-6 mt-3 text-3xl tracking-tight">New this Season</h2>
          <span className="underline underline-offset-4">Shop the Selection</span>
        </a>
        <picture className="sticky top-14 z-[-1] block max-h-[85vh] overflow-hidden lg:top-16">
          <source
            srcSet="/assets/images/two-large.avif"
            media="(min-width: 1024px)"
          />
          <Image
            src="/assets/images/two.avif"
            alt="Picture of the hero"
            width={2400}
            height={2400}
            style={{ width: '100%' }}
            priority
          />
        </picture>
        <div className="mx-auto bg-white p-6 pb-0 lg:p-12 lg:pb-0 xl:px-[8vw]">
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
    </>
  );
}
