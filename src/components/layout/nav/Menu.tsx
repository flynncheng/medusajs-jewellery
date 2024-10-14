import * as React from 'react';

import { getCategoriesList } from '@/libs/data/categories';
import type { Category } from '@/types/medusa';

import MenuDesktop from './MenuDesktop';
import MenuMobile from './MenuMobile';

export default async function Menu() {
  const { product_categories } = await getCategoriesList();
  const categories = product_categories.filter((category: Category) => category.parent_category === null && category.category_children.length !== 0);
  const category = product_categories.filter((category: Category) => category.parent_category === null && category.category_children.length === 0);
  const data = { categories, category };

  return (
    <>
      <MenuMobile data={data} />
      <MenuDesktop data={data} />
    </>
  );
}
