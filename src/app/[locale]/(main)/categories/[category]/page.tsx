import { startCase } from 'lodash';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import Filters from '@/components/cagetories/Filters';
import PaginatedProducts from '@/components/cagetories/PaginatedProducts';
import { getCategoryByHandle } from '@/libs/data/categories';
import type { Category } from '@/types/medusa';

export async function generateMetadata({ params }) {
  try {
    const { product_categories } = await getCategoryByHandle(
      params.category,
    );

    const title = product_categories
      .map((category: Category) => category.name)
      .join(' | ');

    const description
      = product_categories[product_categories.length - 1].description
      ?? `${title} category.`;

    return {
      title: `${title} | Oneosoft`,
      description,
      alternates: {
        canonical: params.category,
      },
    };
  } catch (error) {
    notFound();
  }
}

export default async function Category({ params }) {
  const { product_categories } = await getCategoryByHandle(
    params.category,
  );

  if (!product_categories) {
    notFound();
  }

  const category = product_categories[product_categories.length - 1];

  const pageNumber = 1;

  const sortBy = null;
  const sort = sortBy || 'created_at';

  return (
    <main>
      <section className="sticky top-24 z-40 bg-white shadow-sm lg:top-16">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:max-w-screen-2xl lg:px-8">
          <h1 className="text-sm">
            {startCase(params.category)}
          </h1>
          <Filters />
        </div>
      </section>
      <section className="relative overflow-hidden lg:max-h-[80vh]">
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
          <h2 className="mb-6 mt-3 text-3xl tracking-tight">{startCase(params.category)}</h2>
          <p className="text-sm leading-6 lg:tracking-wider">
            {category.description}
          </p>
        </div>
      </section>
      <section className="space-y-6 lg:space-y-12">
        <div className="relative z-10 mx-auto bg-white p-6 pb-0 lg:p-12 lg:pb-0 xl:px-[8vw]">
          <PaginatedProducts sortBy={sort} page={pageNumber} categoryId={category.id} countryCode={params.locale} />
        </div>
      </section>
    </main>
  );
}
