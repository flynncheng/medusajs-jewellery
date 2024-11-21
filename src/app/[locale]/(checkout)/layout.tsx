import Back from '@/components/checkout/Back';
import Cart from '@/components/layout/nav/cart';
import Logo from '@/components/layout/nav/Logo';

export default async function CheckoutLayout(props: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <nav
        aria-label="Top"
        className="sticky top-0 z-50 border-b border-gray-100 bg-gray-50"
      >
        <div className="mx-auto flex h-14 max-w-7xl flex-wrap items-center justify-between px-4 py-2 sm:px-6 lg:h-16 lg:max-w-screen-2xl lg:px-8 lg:pb-0">
          <Back />
          <Logo />
          <Cart />
        </div>
      </nav>
      {props.children}
    </div>
  );
}
