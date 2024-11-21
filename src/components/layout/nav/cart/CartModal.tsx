'use client';

import { PopoverAnchor, PopoverClose } from '@radix-ui/react-popover';
import { ShoppingBag, X } from 'lucide-react';
import { useParams, usePathname } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
} from '@/components/ui/popover';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import CartItems from './CartItems';
import CartSummary from './CartSummary';

export default function CartSheet({ cart }) {
  const [openSheet, setOpenSheet] = useState(false);
  const [openPopover, setOpenPopover] = useState(false);

  // Check if the current route is the checkout page
  const locale = useParams().locale as string;
  const pathname = usePathname();
  const isCheckoutPage = pathname === `/${locale}/checkout`;

  // newly added item
  const itemAdded = cart?.items.filter(item => item.variant_id === cart?.metadata?.variant_id_added);

  const totalItems = cart?.items?.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0) || 0;

  const itemRef = useRef<number>(totalItems || 0);

  const handleViewCart = () => {
    setOpenPopover(false);
    setOpenSheet(true);
  };

  useEffect(() => {
    // open cart popover when modifying the cart items, but only if we're not on the cart sheet
    if (totalItems !== itemRef.current && !openSheet) {
      setOpenPopover(true);
    }
    // close cart popover when removing the newly added item
    if (itemAdded?.length === 0) {
      setOpenPopover(false);
    }
  }, [totalItems, itemAdded?.length]);

  return (
    <div className="relative ml-2 flow-root lg:ml-4">
      <Sheet open={openSheet} onOpenChange={setOpenSheet}>
        <SheetTrigger asChild>
          <Button variant="ghost" className="flex w-full items-center justify-between px-2">
            <ShoppingBag
              aria-hidden="true"
              className="shrink-0 text-gray-400 group-hover:text-gray-500"
              size={20}
            />
            <span className="absolute top-1.5 ml-3 block size-3.5 rounded-full bg-black/80 text-center text-xs text-white">
              {totalItems}
            </span>
            <span className="sr-only">items in cart, view bag</span>
          </Button>
        </SheetTrigger>
        <SheetContent className="w-full sm:max-w-full sm:px-[8vw] sm:py-[3vw] lg:max-w-[50%]">
          <SheetHeader>
            <SheetTitle className="text-left">Shopping bag</SheetTitle>
          </SheetHeader>
          {
            totalItems === 0
              ? (
                <div className="flex h-full flex-col items-center justify-center pb-[24vh] lg:min-h-screen lg:pb-[48vh]">
                  <ShoppingBag size={60} strokeWidth={0.6} />
                  <div className="mt-12 space-y-6">
                    <p className="text-2xl font-light">Your shopping bag is empty</p>
                    <Button className="w-full" onClick={() => setOpenSheet(false)}>
                      Start Shopping
                      <span aria-hidden="true" className="ml-1"> &rarr;</span>
                    </Button>
                  </div>
                </div>
              )
              : (
                <div className="flex max-h-full flex-col">
                  <CartItems cartItems={cart?.items} currency_code={cart?.currency_code} setOpenModal={setOpenSheet} />
                  <CartSummary cart={cart} isCheckoutPage={isCheckoutPage} />
                  <div className="mb-8 flex justify-center text-center text-sm text-gray-500">
                    {
                      isCheckoutPage
                        ? (
                          <Button className="w-full" asChild>
                            <SheetClose className="ml-1">
                              Continue checkout
                              <span aria-hidden="true" className="ml-1"> &rarr;</span>
                            </SheetClose>
                          </Button>
                        )
                        : (
                          <p>
                            or
                            <SheetClose className="ml-1 font-medium text-gray-700 hover:text-gray-500">
                              Continue shopping
                              <span aria-hidden="true" className="ml-1"> &rarr;</span>
                            </SheetClose>
                          </p>
                        )
                    }
                  </div>
                </div>
              )
          }
        </SheetContent>
      </Sheet>
      <Popover open={openPopover} onOpenChange={setOpenPopover}>
        <PopoverAnchor />
        <PopoverContent className="w-screen pl-6 sm:w-full sm:pl-4" align="end">
          <PopoverClose className="absolute right-6 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
            <X className="size-4" />
            <span className="sr-only">Close</span>
          </PopoverClose>
          <h2 className="text-lg font-semibold text-foreground">Added to cart</h2>
          <div className="flex max-h-[75vh] flex-col">
            <CartItems cartItems={itemAdded} currency_code={cart?.currency_code} />
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <Button className="w-full" onClick={handleViewCart}>View my Cart</Button>
            </div>
            <div className="mb-2 flex justify-center text-center text-sm text-gray-500">
              <p>
                or
                <PopoverClose className="ml-1 font-medium text-gray-700 hover:text-gray-500">
                  Continue Shopping
                  <span aria-hidden="true" className="ml-1"> &rarr;</span>
                </PopoverClose>
              </p>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
