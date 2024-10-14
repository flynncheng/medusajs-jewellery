import { cache } from 'react';

import { sdk } from './config';

export const listCategories = cache(async () => {
  return sdk.store.category
    .list({ fields: '+category_children' }, { next: { tags: ['categories'] } })
    .then(({ product_categories }) => product_categories);
});

export const getCategoriesList = cache(async (
  offset: number = 0,
  limit: number = 100,
) => {
  return sdk.store.category.list(
    // TODO: Look into fixing the type
    // @ts-ignore
    { limit, offset },
    { next: { tags: ['categories'] } },
  );
});

export const getCategoryByHandle = cache(async (
  categoryHandle: string[],
) => {
  return sdk.store.category.list(
    // TODO: Look into fixing the type
    // @ts-ignore
    { handle: categoryHandle },
    { next: { tags: ['categories'] } },
  );
});
