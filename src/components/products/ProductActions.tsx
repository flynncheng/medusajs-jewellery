import type { HttpTypes } from '@medusajs/types';
import { isEqual } from 'lodash';
import { LoaderCircle } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import { addToCart } from '@/libs/data/cart';
import { getProductPrice } from '@/utils/getProductPrice';

import OptionSelect from './OptionSelect';

const optionsAsKeymap = (variantOptions: HttpTypes.StoreProductVariant['options']) => {
  return variantOptions?.reduce((acc: Record<string, string>, varopt: any) => {
    acc[varopt.option_id] = varopt.value;
    return acc;
  }, {});
};

export default function ProductActions({ product }) {
  const [options, setOptions] = useState<Record<string, string | undefined>>({});
  const [isAdding, setIsAdding] = useState(false);

  const countryCode = useParams().locale as string;

  // Select the variant based on the options selected
  const selectedVariant = useMemo(() => {
    if (!product.variants || product.variants.length === 0) {
      return;
    }
    return product.variants.find((variant) => {
      const variantOptions = optionsAsKeymap(variant.options);
      return isEqual(variantOptions, options);
    });
  }, [product.variants, options]);

  // Product price
  const { variantPrice, cheapestPrice } = getProductPrice({
    product,
    variantId: selectedVariant?.id,
  });
  const selectedPrice = selectedVariant ? variantPrice : cheapestPrice;

  // Attach image URL to the color option
  const addColorOptionImage = (option) => {
    if (option.title === 'Color') {
      option.values.forEach((optionValue) => {
        optionValue.image_url = product.images.find(image => image.url.includes(optionValue.value.toLowerCase())).url;
      });
    }
  };

  // Check if the selected variant is in stock
  const inStock = useMemo(() => {
    // If we don't manage inventory, we can always add to cart
    if (selectedVariant && !selectedVariant.manage_inventory) {
      return true;
    }
    // If we allow back orders on the variant, we can add to cart
    if (selectedVariant?.allow_backorder) {
      return true;
    }
    // If there is inventory available, we can add to cart
    if (
      selectedVariant?.manage_inventory
      && (selectedVariant?.inventory_quantity || 0) > 0
    ) {
      return true;
    }
    // Otherwise, we can't add to cart
    return false;
  }, [selectedVariant]);

  // Add the selected variant to the cart
  const handleAddToCart = async () => {
    if (!selectedVariant?.id) {
      return;
    }
    setIsAdding(true);
    await addToCart({
      variantId: selectedVariant.id,
      quantity: 1,
      countryCode,
    });
    setIsAdding(false);
  };

  // Preselect variant
  useEffect(() => {
    // If there is one variant in stock, preselect that variant; otherwise, preselect the first one
    const preselected = product.variants.find(variant => variant.inventory_quantity > 0)?.options || product.variants[0].options;
    const variantOptions = optionsAsKeymap(preselected);
    setOptions(variantOptions ?? {});
  }, []);

  return (
    <div className="mt-3">
      <p className="text-lg tracking-tight">
        {selectedPrice && selectedPrice.calculated_price.replace(/([^\d,.]+)(\d[\d,.]*)/, '$1 $2')}
      </p>
      <form className="mt-10 space-y-8">
        {
          product.variants?.length > 1
          && (
            <div className="space-y-1.5 px-1">
              <h2 className="sr-only">Product options</h2>
              {product.options.map((option) => {
                addColorOptionImage(option);
                return (
                  <div key={option.id} className="border-b">
                    <OptionSelect
                      option={option}
                      setOptions={setOptions}
                      current={options[option.id]}
                      title={option.title ?? ''}
                    />
                  </div>
                );
              })}
            </div>
          )
        }
        <Button
          className="w-full"
          onClick={handleAddToCart}
          disabled={!inStock || !selectedVariant || isAdding || !selectedPrice}
        >
          {!selectedVariant || isAdding
            ? <LoaderCircle className="animate-spin" />
            : !inStock || !selectedPrice
                ? 'Out of stock'
                : 'Add to cart'}
        </Button>
      </form>
      {inStock && selectedPrice && <p className="mt-5 px-2 text-sm text-gray-500">Due to high demand, your product will be shipped in 3 to 4 days.</p>}
    </div>
  );
}
