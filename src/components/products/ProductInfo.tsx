'use client';

import { ChevronRight } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import ProductActions from './ProductActions';

export default function ProductInfo({ product }) {
  const hasHighlights = product.material || product.origin_country || product?.type?.value || product.weight;

  return (
    <div className="lg:w-1/2">
      <div className="sticky top-14 z-40 mx-auto flex flex-col justify-center px-6 pt-10 lg:min-h-screen lg:max-w-md lg:pb-[24vh]">
        <h1 className="text-xl font-medium tracking-tight sm:text-2xl lg:pr-8">{product.title}</h1>

        {/* Options */}
        <ProductActions product={product} />

        {/* Product description */}
        <div className="mt-10 lg:space-y-1.5">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" className="flex w-full items-center justify-between px-2">
                Product description
                <ChevronRight className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full overflow-auto sm:max-w-full sm:px-[8vw] sm:py-[3vw] lg:max-w-[50%]">
              <SheetHeader>
                <SheetTitle>Product description</SheetTitle>
              </SheetHeader>
              <div className="space-y-10 overflow-auto py-10 lg:pr-8">
                {
                  product.subtitle
                  && (
                    <div>
                      <h3 className="sr-only">Description</h3>
                      <div className="space-y-6">
                        <p className="text-sm text-gray-700">{product.subtitle}</p>
                      </div>
                    </div>
                  )
                }
                {
                  hasHighlights
                  && (
                    <div>
                      <h3 className="text-sm font-medium">Highlights</h3>
                      <div className="mt-4">
                        <ul className="w-max list-disc space-y-2 pl-4 text-sm">
                          {
                            product.material
                            && (
                              <li className="text-gray-400">
                                <span className="text-gray-700">
                                  Material:
                                  {' '}
                                  {product.material}
                                </span>
                              </li>
                            )
                          }
                          {
                            product.origin_country
                            && (
                              <li className="text-gray-400">
                                <span className="text-gray-700">
                                  County of origin:
                                  {' '}
                                  {product.origin_country}
                                </span>
                              </li>
                            )
                          }
                          {
                            product.type
                            && (
                              <li className="text-gray-400">
                                <span className="text-gray-700">
                                  Type:
                                  {' '}
                                  {product.type.value}
                                </span>
                              </li>
                            )
                          }
                          {
                            product.weight
                            && (
                              <li className="text-gray-400">
                                <span className="text-gray-700">
                                  Weight:
                                  {' '}
                                  {`${product.weight}g`}
                                </span>
                              </li>
                            )
                          }
                          {
                            product.length && product.width && product.height
                            && (
                              <li className="text-gray-400">
                                <span className="text-gray-700">
                                  Dimensions:
                                  {' '}
                                  {`${product.length}L x ${product.width}W x ${product.height}H`}
                                </span>
                              </li>
                            )
                          }
                        </ul>
                      </div>
                    </div>
                  )
                }
                {
                  product.description
                  && (
                    <div>
                      <h2 className="text-sm font-medium">Details</h2>
                      <div className="mt-4 space-y-6">
                        <p className="text-sm text-gray-700">{product.description}</p>
                      </div>
                    </div>
                  )
                }
              </div>
            </SheetContent>
          </Sheet>

          {/* Delivery & Returns */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" className="flex w-full items-center justify-between px-2">
                Delivery & Returns
                <ChevronRight className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full overflow-auto sm:max-w-full sm:px-[8vw] sm:py-[3vw] lg:max-w-[50%]">
              <SheetHeader>
                <SheetTitle>Delivery & Returns</SheetTitle>
              </SheetHeader>
              <div className="space-y-10 py-10 lg:pr-8">
                {
                  product.subtitle
                  && (
                    <div>
                      <h3 className="sr-only">Delivery & Returns</h3>
                      <div className="space-y-6">
                        <p className="text-sm text-gray-700">{product.subtitle}</p>
                      </div>
                    </div>
                  )
                }
                <div>
                  <h3 className="text-sm font-medium">Details</h3>
                  <div className="mt-4 space-y-6">
                    <p className="text-sm text-gray-700">{product.description}</p>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </div>

  );
}
