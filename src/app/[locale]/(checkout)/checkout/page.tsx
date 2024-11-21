import type { HttpTypes } from '@medusajs/types';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import CheckoutForm from '@/components/checkout/CheckoutForm';
import CheckoutSummary from '@/components/checkout/CheckoutSummary';
import { enrichLineItems, retrieveCart } from '@/libs/data/cart';
import { listCartDeliveryMethods } from '@/libs/data/fulfillment';
import { listCartPaymentMethods } from '@/libs/data/payment';

export const metadata: Metadata = {
  title: 'Checkout - oneosoft.com',
};

const fetchCart = async () => {
  const cart = await retrieveCart();
  if (!cart) {
    return notFound();
  }

  if (cart?.items?.length) {
    const enrichedItems = await enrichLineItems(cart?.items, cart?.region_id!);
    cart.items = enrichedItems as HttpTypes.StoreCartLineItem[];
  }

  return cart;
};

export default async function Checkout() {
  const cart = await fetchCart();
  const deliveryMethods = await listCartDeliveryMethods(cart.id);
  const paymentMethods = await listCartPaymentMethods(cart.region?.id ?? '');

  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-10 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-12 lg:px-8 lg:pb-96">
      <h2 className="sr-only">Checkout</h2>
      <CheckoutForm cart={cart} deliveryMethods={deliveryMethods} paymentMethods={paymentMethods} />
      <CheckoutSummary cart={cart} />
    </main>
  );
}
