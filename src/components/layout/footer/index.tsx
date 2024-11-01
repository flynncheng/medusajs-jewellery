import { Facebook, Instagram, X } from 'lucide-react';
import React from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTriggerPlus,
} from '@/components/ui/accordion';

import InputForm from './InputForm';

export default function Footer() {
  const footerNavs = [
    {
      label: 'Resources',
      items: [
        {
          href: '/',
          name: 'Contact',
        },
        {
          href: '/',
          name: 'Support',
        },
        {
          href: '/',
          name: 'Documentation',
        },
        {
          href: '/',
          name: 'Pricing',
        },
      ],
    },
    {
      label: 'About',
      items: [
        {
          href: '/',
          name: 'Terms',
        },
        {
          href: '/',
          name: 'License',
        },
        {
          href: '/',
          name: 'Privacy',
        },
        {
          href: '/',
          name: 'About US',
        },
      ],
    },
    {
      label: 'Explore',
      items: [
        {
          href: '/',
          name: 'Showcase',
        },
        {
          href: '/',
          name: 'Roadmap',
        },
        {
          href: '/',
          name: 'Languages',
        },
        {
          href: '/',
          name: 'Blog',
        },
      ],
    },
    {
      label: 'Company',
      items: [
        {
          href: '/',
          name: 'Partners',
        },
        {
          href: '/',
          name: 'Team',
        },
        {
          href: '/',
          name: 'Careers',
        },
      ],
    },
  ];

  return (
    <footer className="mt-16 border-t border-gray-100 lg:mt-28">
      <div className="mx-auto max-w-7xl space-y-10 p-6 sm:space-y-16 lg:max-w-screen-2xl lg:p-8">
        <InputForm />

        <Accordion type="single" collapsible className="w-full text-sm text-gray-700 sm:hidden">
          <AccordionItem value="item-1">
            <AccordionTriggerPlus className="font-normal">Resources</AccordionTriggerPlus>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTriggerPlus className="font-normal">About</AccordionTriggerPlus>
            <AccordionContent>
              Yes. It comes with default styles that matches the other
              components&apos; aesthetic.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTriggerPlus className="font-normal">Explore</AccordionTriggerPlus>
            <AccordionContent>
              Yes. It's animated by default, but you can disable it if you prefer.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTriggerPlus className="font-normal">Company</AccordionTriggerPlus>
            <AccordionContent>
              Yes. It's animated by default, but you can disable it if you prefer.
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="hidden max-w-7xl flex-1 justify-between space-y-6 text-sm text-gray-700 sm:flex sm:space-y-0 lg:max-w-screen-2xl">
          {
            footerNavs.map((item, idx) => (
              <ul
                className="space-y-4 text-gray-600"
                key={idx}
              >
                <h4 className="font-semibold text-gray-800 sm:pb-2">
                  {item.label}
                </h4>
                {
                  item.items.map(((el, idx) => (
                    <li key={idx}>
                      <a
                        href={el.href}
                        className="duration-150 hover:text-gray-800"

                      >
                        {el.name}
                      </a>
                    </li>
                  )))
                }
              </ul>
            ))
          }
        </div>

        <div className="items-center justify-between py-10 sm:flex sm:border-t">
          <p className="text-gray-600">© 2024 Oneosoft Inc. All rights reserved.</p>
          <div className="mt-6 flex items-center gap-x-6 text-gray-400 sm:m-0">
            <a href="/">
              <g clipPath="url(#a)"><path fill="currentColor" d="M48 24C48 10.745 37.255 0 24 0S0 10.745 0 24c0 11.979 8.776 21.908 20.25 23.708v-16.77h-6.094V24h6.094v-5.288c0-6.014 3.583-9.337 9.065-9.337 2.625 0 5.372.469 5.372.469v5.906h-3.026c-2.981 0-3.911 1.85-3.911 3.75V24h6.656l-1.064 6.938H27.75v16.77C39.224 45.908 48 35.978 48 24z" /></g>
              <Facebook className="duration-150 hover:text-gray-500" />
            </a>
            <a href="/">
              <X size={28} className="duration-150 hover:text-gray-500" />
            </a>
            <a href="/">
              <Instagram className="duration-150 hover:text-gray-500" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
