'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Form } from '@/components/ui/form';
import { placeOrder } from '@/libs/data/cart';
import { convertToLocale } from '@/utils/money';

import { Button } from '../ui/button';
import FormContact from './FormContact';
import FormDelivery from './FormDelivery';
import FormPayment from './FormPayment';
import FormShipping from './FormShipping';

const FormSchema = z.object({
  email: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  firstName: z.string().min(1, {
    message: 'Username must be at least 1 characters.',
  }),
  lastName: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  company: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  address1: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  address2: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  city: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  country: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  province: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  postalCode: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  phone: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  delivery: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  payment: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  cardNumber: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  nameOnCard: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  expirationDate: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  cvc: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
});

export default function CheckoutForm({ cart, deliveryMethods, paymentMethods, currency_code = 'eur' }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      company: '',
      address1: '',
      address2: '',
      city: '',
      country: 'fr',
      province: 'bc',
      postalCode: '',
      phone: '',
      delivery: deliveryMethods[0].id,
      payment: paymentMethods[0].id,
      cardNumber: '',
      nameOnCard: '',
      expirationDate: '',
      cvc: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    try {
      await placeOrder(data, cart);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  if (!cart) {
    return null;
  }

  return (
    <section>
      <Form {...form}>
        <form className="space-y-10" onSubmit={form.handleSubmit(onSubmit)}>
          <FormContact form={form} />
          <FormShipping form={form} />
          <FormDelivery form={form} deliveryMethods={deliveryMethods} cart={cart} />
          <FormPayment form={form} paymentMethods={paymentMethods} />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {
              isLoading
                ? <LoaderCircle className="animate-spin" />
                : `Pay ${convertToLocale({ amount: cart.total ?? 0, currency_code })}`
            }
          </Button>
          <div className="pt-2 text-rose-500">
            <span>{error}</span>
          </div>
        </form>
      </Form>
    </section>
  );
}
