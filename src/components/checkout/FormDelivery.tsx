import React, { useState } from 'react';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { setShippingMethod } from '@/libs/data/cart';
import { cn } from '@/libs/shadcn';
import { convertToLocale } from '@/utils/money';

export default function FormDelivery({ form, deliveryMethods, cart, currency_code = 'eur' }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setDelivery = async (id: string) => {
    setIsLoading(true);
    await setShippingMethod({ cartId: cart?.id, shippingMethodId: id })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleChange = (field, value) => {
    field.onChange(value);
    setDelivery(value);
  };

  return (
    <div className="border-t border-gray-200 pt-10">
      <h2 className="text-lg font-medium">Delivery method</h2>
      <div className="mt-4 w-full">
        <FormField
          control={form.control}
          name="delivery"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RadioGroup
                  onValueChange={value => handleChange(field, value)}
                  defaultValue={field.value}
                  className="gap-x-4 gap-y-6 sm:grid-cols-2"
                >
                  {
                    deliveryMethods.map(deliveryMethod => (
                      <FormItem className="relative space-y-0" key={deliveryMethod.id}>
                        <FormControl className="absolute right-4 top-4 duration-200">
                          <RadioGroupItem value={deliveryMethod.id} />
                        </FormControl>
                        <FormLabel className={cn('block cursor-pointer rounded-md border p-4 font-normal', form.getValues('delivery') === deliveryMethod.id && 'shadow')}>
                          <p className="text-black">{deliveryMethod.name}</p>
                          <p className="mt-2 text-gray-500">{deliveryMethod.name.includes('Express') ? '2–5 business days' : '4–10 business days'}</p>
                          <p className="mt-6 text-black">
                            {convertToLocale({
                              amount: deliveryMethod?.amount!,
                              currency_code,
                            })}
                          </p>
                        </FormLabel>
                      </FormItem>
                    ))
                  }
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
