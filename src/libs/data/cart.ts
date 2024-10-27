'use server';

import { revalidateTag } from 'next/cache';

import medusaError from '@/utils/medusaError';

import { sdk } from './config';
import { getAuthHeaders, getCartId, setCartId } from './cookies';
import { getRegion } from './regions';

export async function retrieveCart() {
  const cartId = getCartId();

  if (!cartId) {
    return null;
  }

  return await sdk.store.cart
    .retrieve(cartId, {}, { next: { tags: ['cart'] }, ...getAuthHeaders() })
    .then(({ cart }) => cart)
    .catch(() => {
      return null;
    });
}

export async function getOrSetCart(countryCode: string) {
  let cart = await retrieveCart();
  const region = await getRegion(countryCode);

  if (!region) {
    throw new Error(`Region not found for country code: ${countryCode}`);
  }

  if (!cart) {
    const cartResp = await sdk.store.cart.create({ region_id: region.id });
    cart = cartResp.cart;
    setCartId(cart.id);
    revalidateTag('cart');
  }

  if (cart && cart?.region_id !== region.id) {
    await sdk.store.cart.update(
      cart.id,
      { region_id: region.id },
      {},
      getAuthHeaders(),
    );
    revalidateTag('cart');
  }

  return cart;
}

export async function addToCart({
  variantId,
  quantity,
  countryCode,
}: {
  variantId: string;
  quantity: number;
  countryCode: string;
}) {
  if (!variantId) {
    throw new Error('Missing variant ID when adding to cart');
  }

  const cart = await getOrSetCart(countryCode);
  if (!cart) {
    throw new Error('Error retrieving or creating cart');
  }

  await sdk.store.cart
    .createLineItem(
      cart.id,
      {
        variant_id: variantId,
        quantity,
      },
      {},
      getAuthHeaders(),
    )
    .then(() => {
      revalidateTag('cart');
    })
    .catch(medusaError);
}
