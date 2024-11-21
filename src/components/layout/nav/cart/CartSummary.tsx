import Link from 'next/link';
import React from 'react';

import { Button } from '@/components/ui/button';
import { convertToLocale } from '@/utils/money';

export default function CartSummary({ cart, isCheckoutPage }) {
  const { currency_code, original_item_subtotal } = cart;

  return (
    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
      <div className="flex justify-between text-base font-medium text-gray-900">
        <p>Subtotal</p>
        <p>
          {convertToLocale({ amount: original_item_subtotal ?? 0, currency_code })}
        </p>
      </div>
      <p className="mt-0.5 text-sm text-gray-500">{isCheckoutPage ? 'Excluding shipping and taxes.' : 'Shipping and taxes calculated at checkout.'}</p>
      {
        !isCheckoutPage
        && (
          <div className="mt-6">
            <Button className="w-full" asChild>
              <Link href="/checkout">
                Checkout
              </Link>
            </Button>
          </div>
        )
      }
    </div>
  );
}
