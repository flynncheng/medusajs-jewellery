import type { StoreProductCategory, StoreRegion } from '@medusajs/types';
import { startCase } from 'lodash';
import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import Filters from '@/components/cagetories/Filters';
import PaginatedProducts from '@/components/cagetories/PaginatedProducts';
import { getCategoryByHandle, listCategories } from '@/libs/data/categories';
import { listRegions } from '@/libs/data/regions';

type SortOptions = 'price_asc' | 'price_desc' | 'created_at';

type Props = {
  params: { category: string[]; countryCode: string };
  searchParams: {
    sortBy?: SortOptions;
    page?: string;
  };
};

export async function generateStaticParams() {
  const product_categories = await listCategories();

  if (!product_categories) {
    return [];
  }

  const countryCodes = await listRegions().then((regions: StoreRegion[]) =>
    regions?.map(r => r.countries?.map(c => c.iso_2)).flat(),
  );

  const categoryHandles = product_categories.map(
    (category: any) => category.handle,
  );

  const staticParams = countryCodes
    ?.map((countryCode: string | undefined) =>
      categoryHandles.map((handle: any) => ({
        locale: countryCode,
        category: handle,
      })),
    )
    .flat();

  return staticParams;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: categoryParam } = params;

  try {
    const { product_categories } = await getCategoryByHandle(categoryParam);

    const title = product_categories
      .map((category: StoreProductCategory) => category.name)
      .join(' | ');

    const description
      = product_categories[product_categories.length - 1].description
      ?? `${title} category.`;

    return {
      title: `${title} | Oneosoft`,
      description,
      alternates: {
        canonical: categoryParam,
      },
    };
  } catch (error) {
    notFound();
  }
}

export default async function Category({ params, searchParams }) {
  const { sortBy: sortByParam, page: pageParam } = searchParams;
  const { locale: localeParam, category: categoryParam } = params;

  const { product_categories } = await getCategoryByHandle(categoryParam);

  if (!product_categories) {
    notFound();
  }

  const sortBy = sortByParam || 'created_at';
  const page = pageParam ? Number.parseInt(pageParam) : 1;
  const category = product_categories[product_categories.length - 1];

  return (
    <main>
      <section className="sticky top-14 z-40 bg-white shadow-sm lg:top-16">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between pl-6 pr-4 sm:px-6 lg:max-w-screen-2xl lg:px-8">
          <h1 className="text-sm">
            {startCase(categoryParam)}
          </h1>
          <Filters option="sortBy" />
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
          <h2 className="mb-6 mt-3 text-3xl tracking-tight">{startCase(categoryParam)}</h2>
          <p className="text-sm leading-6 lg:tracking-wider">
            {category?.description}
          </p>
        </div>
      </section>
      <section className="space-y-6 lg:space-y-12">
        <div className="mx-auto bg-white p-6 pb-0 lg:p-12 lg:pb-0 xl:px-[8vw]">
          <PaginatedProducts sortBy={sortBy} page={page} categoryId={category?.id} countryCode={localeParam} />
        </div>
      </section>
    </main>
  );
}
