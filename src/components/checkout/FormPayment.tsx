import React from 'react';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function FormPayment({ form, paymentMethods }) {
  return (
    <div className="border-t border-gray-200 pt-10">
      <h2 className="text-lg font-medium">Payment</h2>
      <div className="mt-4 w-full">
        <FormField
          control={form.control}
          name="payment"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  {
                    paymentMethods.map(paymentMethod => (
                      <FormItem className="flex items-center space-x-3 space-y-0" key={paymentMethod.id}>
                        <FormControl>
                          <RadioGroupItem value={paymentMethod.id} />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Credit Card
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
      <div className="mt-6 grid grid-cols-4 gap-x-4 gap-y-6 rounded-md border bg-gray-50 p-4">
        <div className="col-span-4">
          <FormField
            control={form.control}
            name="cardNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-600">Card number</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="col-span-4">
          <FormField
            control={form.control}
            name="nameOnCard"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-600">Name on card</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="col-span-3">
          <FormField
            control={form.control}
            name="expirationDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-600">Expiration date (MM/YY)</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="col-span-1">
          <FormField
            control={form.control}
            name="cvc"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-600">CVC</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}
