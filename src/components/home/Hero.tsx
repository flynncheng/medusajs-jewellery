import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative max-h-[80vh] overflow-hidden">
      <a href="/home">
        <picture className="after:absolute after:inset-x-0 after:bottom-0 after:h-1/2 after:bg-gradient-to-t after:from-[rgba(0,0,0,0.5)] after:to-[rgba(0,0,0,0)]">
          <source
            srcSet="/assets/images/hero-large.webp"
            media="(min-width: 1024px)"
          />
          <Image
            src="/assets/images/hero.webp"
            alt="Picture of the hero"
            width={1440}
            height={1800}
            style={{ width: '100%' }}
            priority
          />
        </picture>
        <div className="absolute bottom-12 w-full text-center text-white">
          <span className="text-[10px] uppercase tracking-wide">women</span>
          <h2 className="mb-6 mt-3 text-3xl tracking-tight">New In: LV Vibe Bags</h2>
          <span className="underline underline-offset-4">Shop now</span>
        </div>
      </a>
    </section>
  );
};
