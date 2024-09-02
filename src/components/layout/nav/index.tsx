"use client";

import Account from "./Account";
import Cart from "./Cart";
import Header from "./Header";
import Logo from "./Logo";
import Menu from "./Menu";
import Search from "./Search";

export default function Nav() {
  return (
    <div className="relative bg-white">
      <Header />
      <nav
        aria-label="Top"
        className="mx-auto max-w-7xl px-4 pb-2 sm:px-6 lg:px-8 lg:pb-0"
      >
        <div className="flex h-24 flex-wrap items-center justify-between lg:h-16">
          <Menu />
          <Logo />
          <div className="flex items-center lg:order-last">
            <Account />
            <Cart />
          </div>
          <Search />
        </div>
      </nav>
    </div>
  );
}
