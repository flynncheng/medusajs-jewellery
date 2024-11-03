import { UserRound } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function Account() {
  return (
    <div className="flex lg:ml-6">
      <Link href="/account" className="p-2 text-gray-400 hover:text-gray-500">
        <span className="sr-only">Account</span>
        <UserRound size={20} />
      </Link>
    </div>
  );
}
