import type { Metadata } from 'next';

import Footer from '@/components/layout/footer';
import Nav from '@/components/layout/nav';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://localhost:8000';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
};

export default async function PageLayout(props: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      {props.children}
      <Footer />
    </>
  );
}
