import { ShoppingBag } from "lucide-react";
import React from "react";

export default function Cart() {
  return (
    <div className="relative ml-4 flow-root pr-2 lg:ml-6">
      <a href="/cart" className="group -m-2 flex items-center p-2">
        <ShoppingBag
          aria-hidden="true"
          className="shrink-0 text-gray-400 group-hover:text-gray-500"
          size={20}
        />
        <span className="absolute -top-1.5 ml-3 block size-3.5 rounded-full bg-black/80 text-center text-xs font-medium text-white">
          0
        </span>
        <span className="sr-only">items in cart, view bag</span>
      </a>
    </div>
  );
}
