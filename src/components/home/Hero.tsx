import Image from "next/image";

const Hero = () => {
  return (
    <section>
      <a href="/home">
        <picture>
          <source
            srcSet="/assets/images/hero-small.webp"
            media="(max-width: 1024px)"
          />
          <Image
            src="/assets/images/hero.webp"
            alt="Picture of the hero"
            width={2400}
            height={2400}
            style={{ width: "100%" }}
            priority
          />
        </picture>
      </a>
    </section>
  );
};

export default Hero;
