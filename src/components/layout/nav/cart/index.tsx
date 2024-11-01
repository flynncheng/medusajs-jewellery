import React from 'react';

import { retrieveCart } from '@/libs/data/cart';

import CartModal from './CartModal';

export default async function Cart() {
  const cart = await retrieveCart();

  return <CartModal cart={cart} />;
}
