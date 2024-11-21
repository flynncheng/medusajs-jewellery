'use server';

import type { HttpTypes } from '@medusajs/types';
import { omit } from 'lodash';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

import medusaError from '@/utils/medusaError';

import { sdk } from './config';
import { getAuthHeaders, getCartId, removeCartId, setCartId } from './cookies';
import { getProductsById } from './products';
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

  await sdk.store.cart.update(
    cart.id,
    { metadata: { variant_id_added: variantId } },
    {},
    getAuthHeaders(),
  );
  revalidateTag('cart');

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

export async function deleteLineItem(lineId: string) {
  if (!lineId) {
    throw new Error('Missing lineItem ID when deleting line item');
  }

  const cartId = getCartId();
  if (!cartId) {
    throw new Error('Missing cart ID when deleting line item');
  }

  await sdk.store.cart
    .deleteLineItem(cartId, lineId, getAuthHeaders())
    .then(() => {
      revalidateTag('cart');
    })
    .catch(medusaError);
  revalidateTag('cart');
}

export async function updateLineItem({
  lineId,
  quantity,
}: {
  lineId: string;
  quantity: number;
}) {
  if (!lineId) {
    throw new Error('Missing lineItem ID when updating line item');
  }

  const cartId = getCartId();
  if (!cartId) {
    throw new Error('Missing cart ID when updating line item');
  }

  await sdk.store.cart
    .updateLineItem(cartId, lineId, { quantity }, {}, getAuthHeaders())
    .then(() => {
      revalidateTag('cart');
    })
    .catch(medusaError);
}

export async function enrichLineItems(
  lineItems:
    | HttpTypes.StoreCartLineItem[]
    | HttpTypes.StoreOrderLineItem[]
    | null,
  regionId: string,
) {
  if (!lineItems) {
    return [];
  }

  // Prepare query parameters
  const queryParams = {
    ids: lineItems.map(lineItem => lineItem.product_id!),
    regionId,
  };

  // Fetch products by their IDs
  const products = await getProductsById(queryParams);
  // If there are no line items or products, return an empty array
  if (!lineItems?.length || !products) {
    return [];
  }

  // Enrich line items with product and variant information
  const enrichedItems = lineItems.map((item) => {
    const product = products.find((p: any) => p.id === item.product_id);
    const variant = product?.variants?.find(
      (v: any) => v.id === item.variant_id,
    );

    // If product or variant is not found, return the original item
    if (!product || !variant) {
      return item;
    }

    // If product and variant are found, enrich the item
    return {
      ...item,
      variant: {
        ...variant,
        product: omit(product, 'variants'),
      },
    };
  }) as HttpTypes.StoreCartLineItem[];

  return enrichedItems;
}

export async function updateCart(data: HttpTypes.StoreUpdateCart) {
  const cartId = getCartId();
  if (!cartId) {
    throw new Error('No existing cart found, please create one before updating');
  }

  return sdk.store.cart
    .update(cartId, data, {}, getAuthHeaders())
    .then(({ cart }) => {
      revalidateTag('cart');
      return cart;
    })
    .catch(medusaError);
}

export async function setAddresses(data) {
  if (!data) {
    throw new Error('No form data found when setting addresses');
  }
  const cartId = getCartId();
  if (!cartId) {
    throw new Error('No existing cart found when setting addresses');
  }

  const shipping = {
    shipping_address: {
      first_name: data.firstName,
      last_name: data.lastName,
      address_1: data.address1,
      address_2: '',
      company: data.company,
      postal_code: data.postalCode,
      city: data.city,
      country_code: data.country,
      province: data.province,
      phone: data.phone,
    },
    email: data.email,
  } as any;
  await updateCart(shipping);
}

export async function setShippingMethod({
  cartId,
  shippingMethodId,
}: {
  cartId: string;
  shippingMethodId: string;
}) {
  return sdk.store.cart
    .addShippingMethod(
      cartId,
      { option_id: shippingMethodId },
      {},
      getAuthHeaders(),
    )
    .then(() => {
      revalidateTag('cart');
    })
    .catch(medusaError);
}

export async function initiatePaymentSession(
  cart: HttpTypes.StoreCart,
  data: {
    provider_id: string;
    context?: Record<string, unknown>;
  },
) {
  return sdk.store.payment
    .initiatePaymentSession(cart, data, {}, getAuthHeaders())
    .then((resp) => {
      revalidateTag('cart');
      return resp;
    })
    .catch(medusaError);
}

export async function placeOrder(data, cart) {
  await setAddresses(data);
  await initiatePaymentSession(cart, { provider_id: data.payment });

  const cartId = getCartId();
  if (!cartId) {
    throw new Error('No existing cart found when placing an order');
  }

  const cartRes = await sdk.store.cart
    .complete(cartId, {}, getAuthHeaders())
    .then((cartRes) => {
      revalidateTag('cart');
      return cartRes;
    })
    .catch(medusaError);

  if (cartRes?.type === 'order') {
    const locale
      = cartRes.order.shipping_address?.country_code?.toLowerCase();
    removeCartId();
    redirect(`/${locale}/orders/${cartRes?.order.id}`);
  }

  return cartRes.cart;
}
