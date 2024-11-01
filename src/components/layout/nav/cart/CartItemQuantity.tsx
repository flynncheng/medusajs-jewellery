import React, { useEffect, useRef, useState } from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { updateLineItem } from '@/libs/data/cart';

export default function CartItemQuantity({ cartItem }) {
  const [value, setValue] = useState('');
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const changeQuantity = async (quantity: number) => {
    setError(null);
    setUpdating(true);
    const message = await updateLineItem({
      lineId: cartItem.id,
      quantity,
    })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setUpdating(false);
      });
  };

  // Create an array based on the quantity in `cartItem`.
  // If `quantity` is greater than 3, generate an array from 1 to `quantity`.
  // Otherwise, default to an array from 1 to 3.
  const quantityRef = useRef<number>(cartItem.quantity || 0);
  const options = quantityRef.current > 3
    ? Array.from({ length: quantityRef.current }, (_, i) => i + 1)
    : Array.from({ length: 3 }, (_, i) => i + 1);

  useEffect(() => {
    if (value === '') {
      setValue(cartItem.quantity);
    } else {
      changeQuantity(Number(value));
    }
  }, [value]);

  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger className="h-8 w-14 px-2.5 text-gray-500">
        <SelectValue>{value}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Quantity</SelectLabel>
          {
            options.map(quantity =>
              <SelectItem key={quantity} value={quantity.toString()}>{quantity}</SelectItem>,
            )
          }
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
