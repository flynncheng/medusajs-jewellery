'use client';

import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

import { Button } from '@/components/ui/button';

export default function Back() {
  const router = useRouter();
  const handleClick = () => {
    router.back();
  };

  return (
    <Button variant="ghost" className="gap-1 pl-0 hover:bg-inherit lg:order-first" onClick={handleClick}>
      <ChevronLeft size={16} />
      <span className="pt-1">Back</span>
    </Button>
  );
}
