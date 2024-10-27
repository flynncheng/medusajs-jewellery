import Link from 'next/link';
import React from 'react';

export default function Logo() {
  return (
    <div className="flex lg:order-first">
      <Link href="/home">
        <span className="sr-only">Your Company</span>
        {/* <img alt="" src="/logo.jpg" className="h-12 w-auto" /> */}
        <span className="text-xl font-medium">Logo</span>
      </Link>
    </div>
  );
}
