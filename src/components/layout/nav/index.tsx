'use client';

import Account from './Account';
import Cart from './Cart';
import Logo from './Logo';
import Menu from './Menu';
import Search from './Search';

export default function Nav() {
  return (
    <nav
      aria-label="Top"
      className="sticky top-0 z-50 border-b border-gray-100 bg-white"
    >
      <div className="mx-auto flex h-24 max-w-7xl flex-wrap items-center justify-between px-4 pb-2 sm:px-6 lg:h-16 lg:max-w-screen-2xl lg:px-8 lg:pb-0">
        <Menu />
        <Logo />
        <div className="flex items-center lg:order-last">
          <Account />
          <Cart />
        </div>
        <Search />
      </div>
    </nav>
  );
}
