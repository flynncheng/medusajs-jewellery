import { cache } from 'react';

import { sortProducts } from '@/utils/sortProducts';

import { sdk } from './config';
import { getRegion } from './regions';

export const getProductsList = cache(async ({
  pageParam = 1,
  queryParams,
  countryCode,
}: {
  pageParam?: number;
  queryParams?: any;
  countryCode: string;
}): Promise<{
  response: { products: any; count: number };
  nextPage: number | null;
  queryParams?: any;
}> => {
  const limit = queryParams?.limit || 12;
  const offset = pageParam * limit;
  const region = await getRegion(countryCode);

  if (!region) {
    return {
      response: { products: [], count: 0 },
      nextPage: null,
    };
  }

  return sdk.store.product
    .list(
      {
        limit,
        offset,
        region_id: region.id,
        fields: '*variants.calculated_price',
        ...queryParams,
      },
      { next: { tags: ['products'] } },
    )
    .then(({ products, count }) => {
      const nextPage = count > offset + limit ? pageParam + 1 : null;

      return {
        response: {
          products,
          count,
        },
        nextPage,
        queryParams,
      };
    });
});

export const getProductsListWithSort = cache(async ({
  page = 0,
  queryParams,
  sortBy = 'created_at',
  countryCode,
}: {
  page?: number;
  queryParams?: any;
  sortBy?: any;
  countryCode: string;
}): Promise<{
  response: { products: any; count: number };
  nextPage: number | null;
  queryParams?: any;
}> => {
  const limit = queryParams?.limit || 12;

  const {
    response: { products, count },
  } = await getProductsList({
    pageParam: 0,
    queryParams: {
      ...queryParams,
      limit: 100,
    },
    countryCode,
  });

  const sortedProducts = sortProducts(products, sortBy);

  const pageParam = (page - 1) * limit;

  const nextPage = count > pageParam + limit ? pageParam + limit : null;

  const paginatedProducts = sortedProducts.slice(pageParam, pageParam + limit);

  return {
    response: {
      products: paginatedProducts,
      count,
    },
    nextPage,
    queryParams,
  };
});

export const getProductByHandle = cache(async (
  handle: string,
  regionId: string,
) => {
  return sdk.store.product
    .list(
      {
        handle,
        region_id: regionId,
        fields: '*variants.calculated_price,+variants.inventory_quantity',
      },
      { next: { tags: ['products'] } },
    )
    .then(({ products }) => products[0]);
});
