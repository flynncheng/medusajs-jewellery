'use client';

import Image from 'next/image';
import React from 'react';

import { convertToLocale } from '@/utils/money';

export default function CheckoutSummary({ cart, currency_code = 'eur' }) {
  const cartItems = cart?.items;
  const { original_item_subtotal, shipping_total, tax_total, total } = cart;

  return (
    <section className="mt-10 border-t pt-10 lg:mt-0 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
      <div className="sticky top-[6.6rem]">
        <h2 className="text-lg font-medium">Order Summary</h2>
        <div className="mt-6 flex-1 overflow-y-auto pr-4 sm:pr-6">
          <div className="flow-root">
            <ul className="-mt-6 divide-y divide-gray-200">
              {cartItems?.map(cartItem => (
                <li key={cartItem.id} className="flex py-6">
                  <div className="size-20 shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <Image
                      alt={cartItem.product_title}
                      src={cartItem.thumbnail}
                      width={500}
                      height={500}
                      className="size-full object-cover object-center"
                    />
                  </div>
                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base text-gray-900">
                        <h3>
                          {cartItem.product_title}
                        </h3>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{cartItem.variant_title}</p>
                    </div>
                    <div className="mt-1 flex flex-1 items-end justify-between text-sm">
                      <p className="text-sm text-gray-500">
                        {convertToLocale({ amount: cartItem.unit_price ?? 0, currency_code })}
                        <span className="px-1.5">x</span>
                        {cartItem.quantity}
                      </p>
                      <p className="ml-4 text-base leading-5">
                        {convertToLocale({ amount: cartItem.unit_price * cartItem.quantity ?? 0, currency_code })}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <dl className="space-y-6 border-t border-gray-200 px-4 py-6 text-sm sm:px-6">
          <div className="flex justify-between">
            <dt className="text-gray-500">Subtotal</dt>
            <dd>
              {convertToLocale({ amount: original_item_subtotal ?? 0, currency_code })}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">Taxes</dt>
            <dd>
              {convertToLocale({ amount: tax_total ?? 0, currency_code })}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">Shipping</dt>
            <dd>
              {convertToLocale({ amount: shipping_total ?? 0, currency_code })}
            </dd>
          </div>
          <div className="flex justify-between border-t py-6 text-base font-medium text-gray-900">
            <dt>Total</dt>
            <dd>
              {convertToLocale({ amount: total ?? 0, currency_code })}
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
