import { cache } from 'react';

import { sdk } from './config';

// Shipping actions
export const listCartPaymentMethods = cache(async (regionId: string) => {
  return sdk.store.payment
    .listPaymentProviders(
      { region_id: regionId },
      { next: { tags: ['payment_providers'] } },
    )
    .then(({ payment_providers }) => payment_providers)
    .catch(() => {
      return null;
    });
});
