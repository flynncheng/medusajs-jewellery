import { Menu as MenuIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import type { CategoryData } from '@/types/medusa';

export default function MenuMobile({ data }: { data: CategoryData }) {
  const { categories, category } = data;

  return (
    <div className="w-20 lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="relative rounded-md bg-white p-2 text-gray-400"
          >
            <MenuIcon size={20} />
            <span className="sr-only">Open menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <Accordion type="single" collapsible className="mt-4 w-full">
            {
              categories && categories.map((el, index) => (
                <AccordionItem value={`item-${index}`} key={el.id}>
                  <AccordionTrigger>{el.name}</AccordionTrigger>
                  <AccordionContent className="pb-0">
                    {
                      el.category_children.map(child => (
                        <SheetClose asChild key={el.id}>
                          <Link href={`/categories/${child.handle}`} className="block pb-4">
                            {child.name}
                          </Link>
                        </SheetClose>
                      ))
                    }
                  </AccordionContent>
                </AccordionItem>
              ))
            }
            {
              category && category.map(el => (
                <div className="border-b font-medium transition-all hover:underline" key={el.id}>
                  <SheetClose asChild>
                    <Link href={`/categories/${el.handle}`} className="block py-4">
                      {el.name}
                    </Link>
                  </SheetClose>
                </div>
              ))
            }
          </Accordion>
        </SheetContent>
      </Sheet>
    </div>

  );
}
