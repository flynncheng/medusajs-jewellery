import type { HttpTypes } from '@medusajs/types';
import Link from 'next/link';
import React from 'react';

import { Button } from '@/components/ui/button';
import { convertToLocale } from '@/utils/money';

function getCheckoutStep(cart: HttpTypes.StoreCart) {
  if (!cart?.shipping_address?.address_1 || !cart.email) {
    return 'address';
  } else if (cart?.shipping_methods?.length === 0) {
    return 'delivery';
  } else {
    return 'payment';
  }
}

export default function CartSummary({ cart }) {
  const { currency_code, subtotal } = cart;

  const step = getCheckoutStep(cart);

  return (
    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
      <div className="flex justify-between text-base font-medium text-gray-900">
        <p>Subtotal</p>
        <p>
          {convertToLocale({ amount: subtotal ?? 0, currency_code })}
        </p>
      </div>
      <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
      <div className="mt-6">
        <Button className="w-full" asChild>
          <Link href={`/checkout?step=${step}`}>
            Checkout
          </Link>
        </Button>
      </div>
    </div>
  );
}
