import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import ProductImages from '@/components/products/ProductImages';
import ProductInfo from '@/components/products/ProductInfo';
import { getProductByHandle } from '@/libs/data/products';
import { getRegion } from '@/libs/data/regions';

type Props = {
  params: { locale: string; handle: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = params;
  const region = await getRegion(params.locale);

  if (!region) {
    notFound();
  }

  const product = await getProductByHandle(handle, region.id);

  if (!product) {
    notFound();
  }

  return {
    title: `${product.title} | Oneosoft`,
    description: `${product.title}`,
    openGraph: {
      title: `${product.title} | Oneosoft`,
      description: `${product.title}`,
      images: product.thumbnail ? [product.thumbnail] : [],
    },
  };
}

export default async function Product({ params }) {
  const region = await getRegion(params.locale);

  if (!region) {
    notFound();
  }

  const product = await getProductByHandle(params.handle, region.id);
  if (!product) {
    notFound();
  }

  return (
    <main className="justify-between lg:flex">
      <ProductImages images={product?.images || []} title={product.title} />
      <ProductInfo product={product} />
    </main>
  );
}
