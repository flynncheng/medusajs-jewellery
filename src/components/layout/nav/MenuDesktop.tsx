'use client';

import Link from 'next/link';
import React from 'react';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/libs/shadcn';
import type { CategoryData } from '@/types/medusa';

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href=""
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';

export default function MenuDesktop({ data }: { data: CategoryData }) {
  const { categories, category } = data;

  return (
    <div className="hidden h-full space-x-8 lg:ml-8 lg:flex lg:self-stretch">
      <NavigationMenu>
        <NavigationMenuList>
          {
            categories && categories.map(el => (
              <NavigationMenuItem key={el.id}>
                <NavigationMenuTrigger className="focus:bg-background">{el.name}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {
                      el.category_children.map(child => (
                        <ListItem
                          key={child.name}
                          title={child.name}
                          href={`/collections/${child.handle}`}
                        >
                          {child.description}
                        </ListItem>
                      ))
                    }
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))
          }
          {
            category && category.map(el => (
              <Link href={`/collections/${el.handle}`} legacyBehavior passHref key={el.id}>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {el.name}
                </NavigationMenuLink>
              </Link>
            ))
          }
        </NavigationMenuList>
      </NavigationMenu>
    </div>

  );
}
