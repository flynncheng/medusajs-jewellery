'use client';

import { ChevronRight, Dot } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';

import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

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

const product = {
  name: 'Basic Tee 6-Pack',
  price: '$192',
  href: '#',
  breadcrumbs: [
    { id: 1, name: 'Men', href: '#' },
    { id: 2, name: 'Clothing', href: '#' },
  ],
  images: [
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
      alt: 'Two each of gray, white, and black shirts laying flat.',
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
      alt: 'Model wearing plain black basic tee.',
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
      alt: 'Model wearing plain gray basic tee.',
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
      alt: 'Model wearing plain white basic tee.',
    },
  ],
  colors: [
    { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
    { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
    { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
  ],
  sizes: [
    { name: 'XXS', inStock: false },
    { name: 'XS', inStock: true },
    { name: 'S', inStock: true },
    { name: 'M', inStock: true },
    { name: 'L', inStock: true },
    { name: 'XL', inStock: true },
    { name: '2XL', inStock: true },
    { name: '3XL', inStock: true },
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    'Hand cut and sewn locally',
    'Dyed with our proprietary colors',
    'Pre-washed & pre-shrunk',
    'Ultra-soft 100% cotton',
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
};

export default function Product() {
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
    <main className="justify-between lg:flex">
      <div className="relative">
        <Carousel className="w-full lg:hidden" setApi={setApi}>
          <CarouselContent>
            {products.map(el => (
              <CarouselItem key={el.id}>
                <CardContent className="relative flex aspect-square items-center justify-center p-0">
                  <Image
                    src={el.imageSrc}
                    alt={el.imageAlt}
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

      <div className="lg:w-1/2">
        <div className="hidden lg:block">
          {products.map(product => (
            <div key={product.id} className="w-full overflow-hidden bg-gray-200 shadow">
              <AspectRatio ratio={1 / 1}>
                <Image
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  width={400}
                  height={500}
                  className="size-full object-cover object-center group-hover:opacity-75"
                />
              </AspectRatio>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:w-1/2">
        {/* Product info */}
        <div className="sticky top-24 z-40 mx-auto flex flex-col justify-center px-6 pt-10 lg:min-h-screen lg:max-w-md lg:pb-[24vh]">
          <div className="lg:pr-8">
            <h1 className="text-xl font-bold tracking-tight sm:text-2xl">{product.name}</h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3">
            <h2 className="sr-only">Product information</h2>
            <p className="text-2xl tracking-tight">{product.price}</p>

            <form className="mt-10">
              {/* Colors */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" className="flex w-full items-center justify-between px-2">
                    Colors
                    <span className="flex-auto text-right">Black</span>
                    <Dot className="-mx-2 size-12" />
                    <ChevronRight className="size-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-full sm:px-[8vw] sm:py-[3vw] lg:max-w-[50%]">
                  <SheetHeader>
                    <SheetTitle>Colors</SheetTitle>
                  </SheetHeader>
                  <div className="grid grid-cols-2 items-center gap-6 py-10 lg:pr-8">
                    <Link href="?variant=black">
                      <AspectRatio ratio={1 / 1}>
                        <Image
                          src="https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg"
                          alt="test"
                          width={400}
                          height={500}
                          className="size-full rounded border-2 border-black object-cover object-center p-2 group-hover:opacity-75"
                        />
                      </AspectRatio>
                      <span className="mt-3 inline-block">black</span>
                    </Link>
                    <Link href="?variant=white">
                      <AspectRatio ratio={1 / 1}>
                        <Image
                          src="https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg"
                          alt="test"
                          width={400}
                          height={500}
                          className="size-full rounded border object-cover object-center p-2 group-hover:opacity-75"
                        />
                      </AspectRatio>
                      <span className="mt-3 inline-block">white</span>
                    </Link>
                  </div>
                </SheetContent>
              </Sheet>

              <Button className="mt-5 w-full">Add to bag</Button>
            </form>
          </div>

          <p className="mt-5 px-2 text-sm text-gray-500">Due to high demand, your product will be shipped in 3 to 4 days.</p>

          <div className="mt-10 lg:space-y-1.5">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" className="flex w-full items-center justify-between px-2">
                  Product details
                  <ChevronRight className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-full sm:px-[8vw] sm:py-[3vw] lg:max-w-[50%]">
                <SheetHeader>
                  <SheetTitle>Product details</SheetTitle>
                </SheetHeader>
                <div className="py-10 lg:pr-8">
                  {/* Description and details */}
                  <div>
                    <h3 className="sr-only">Description</h3>
                    <div className="space-y-6">
                      <p className="text-sm text-gray-700">{product.description}</p>
                    </div>
                  </div>
                  <div className="mt-10">
                    <h3 className="text-sm font-medium">Highlights</h3>
                    <div className="mt-4">
                      <ul className="list-disc space-y-2 pl-4 text-sm">
                        {product.highlights.map(highlight => (
                          <li key={highlight} className="text-gray-400">
                            <span className="text-gray-700">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="mt-10">
                    <h2 className="text-sm font-medium">Details</h2>
                    <div className="mt-4 space-y-6">
                      <p className="text-sm text-gray-700">{product.details}</p>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" className="flex w-full items-center justify-between px-2">
                  Delivery & Returns
                  <ChevronRight className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-full sm:px-[8vw] sm:py-[3vw] lg:max-w-[50%]">
                <SheetHeader>
                  <SheetTitle>Delivery & Returns</SheetTitle>
                </SheetHeader>
                <div className="py-10 lg:pr-8">
                  {/* Description and details */}
                  <div>
                    <h3 className="sr-only">Delivery & Returns</h3>
                    <div className="space-y-6">
                      <p className="text-sm text-gray-700">{product.description}</p>
                    </div>
                  </div>
                  <div className="mt-10">
                    <h3 className="text-sm font-medium">Highlights</h3>
                    <div className="mt-4">
                      <ul className="list-disc space-y-2 pl-4 text-sm">
                        {product.highlights.map(highlight => (
                          <li key={highlight} className="text-gray-400">
                            <span className="text-gray-700">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="mt-10">
                    <h2 className="text-sm font-medium">Details</h2>
                    <div className="mt-4 space-y-6">
                      <p className="text-sm text-gray-700">{product.details}</p>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

        </div>
      </div>
    </main>
  );
}
