import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/libs/shadcn';

export default function OptionSelect({
  option,
  setOptions,
  current,
  title,
}) {
  const isColorOption = title === 'Color';

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="flex w-full items-center justify-between">
          {title}
          <div className="ml-auto flex items-center">
            {current}
            {
              current && isColorOption
              && <span className="ml-2 size-2.5 rounded-full border shadow" style={{ backgroundColor: current.toLowerCase() }}></span>
            }
          </div>
          <ChevronDown className="size-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="min-h-[50%] w-full sm:max-w-full sm:px-[8vw] sm:py-[3vw] lg:h-full lg:max-w-[50%]" side="bottom">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        <div className="grid grid-cols-2 items-center gap-6 py-10 lg:pr-8">
          {option.values.map(optionValue =>
            (
              <div key={optionValue.value} className={cn('group relative', isColorOption && 'mb-6')}>
                <SheetClose
                  onClick={() => setOptions(prev => ({ ...prev, [option.id]: optionValue.value }))}
                  className={cn('w-full rounded ring-1 ring-gray-200 focus:outline-none focus:ring-1 focus:ring-black active:ring-2 active:ring-black', optionValue.value === current && 'ring-2 ring-black')}
                  data-testid="option-button"
                >
                  {
                    isColorOption
                      ? (
                          <>
                            <Image
                              src={optionValue.image_url}
                              alt="test"
                              width={400}
                              height={500}
                              className="size-full rounded object-cover object-center p-2 group-hover:opacity-75"
                            />
                            <div className="absolute bottom-[-30px]">{optionValue.value}</div>
                          </>
                        )
                      : <div className="group:hover:text-accent-foreground flex h-10 items-center justify-center group-hover:bg-accent">{optionValue.value}</div>
                  }
                </SheetClose>
              </div>
            ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
