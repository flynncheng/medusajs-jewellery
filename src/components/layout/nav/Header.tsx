import { Pause, X } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="h-10 bg-gray-100/75">
      <div className="mx-auto flex items-center justify-between px-4 sm:px-6 lg:max-w-screen-2xl lg:px-8">
        <Button variant="ghost" className="p-2 lg:relative lg:-left-3">
          <Pause size={20} strokeWidth={1} />
          <span className="sr-only">Stop</span>
        </Button>
        <p className="text-center text-sm font-[350]">
          New In: LV Vibe Bags. A bold complement to this season's looks.
          <a href="/">
            <span className="pl-1 underline underline-offset-2">Shop now.</span>
          </a>
        </p>
        <Button variant="ghost" className="p-2">
          <X size={20} strokeWidth={1} />
          <span className="sr-only">Close</span>
        </Button>
      </div>
    </header>
  );
}
