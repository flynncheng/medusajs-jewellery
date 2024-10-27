import { cache } from 'react';

import medusaError from '@/utils/medusaError';

import { sdk } from './config';

const regionMap = new Map<string, any>();

export const listRegions = cache(async () => {
  return sdk.store.region
    .list({}, { next: { tags: ['regions'] } })
    .then(({ regions }) => regions)
    .catch(medusaError);
});

export const retrieveRegion = cache(async (id: string) => {
  return sdk.store.region
    .retrieve(id, {}, { next: { tags: ['regions'] } })
    .then(({ region }) => region)
    .catch(medusaError);
});

export const getRegion = cache(async (countryCode: string) => {
  try {
    if (regionMap.has(countryCode)) {
      return regionMap.get(countryCode);
    }

    const regions = await listRegions();

    if (!regions) {
      return null;
    }

    regions.forEach((region) => {
      region.countries?.forEach((c) => {
        regionMap.set(c?.iso_2 ?? '', region);
      });
    });

    const region = countryCode
      ? regionMap.get(countryCode)
      : regionMap.get('us');

    return region;
  } catch (e: any) {
    return null;
  }
});
