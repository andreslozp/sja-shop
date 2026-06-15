import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

interface Slide {
  image: string;
  tag: string;
  title: string;
  subtitle: string;
}

export default function HeroCarousel() {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);

  const slides: Slide[] = [
    {
      image: 'https://stjoan.org/wp/wp-content/uploads/2019/04/Banner-Easter-2019.jpg',
      tag: t('hero.easter.tag'),
      title: t('hero.easter.title'),
      subtitle: t('hero.easter.subtitle'),
    },
    {
      image: 'https://stjoan.org/wp/wp-content/uploads/2026/03/Bishop-Manuel-Social-Media-launch_Bulletin_SM-handles-added.png',
      tag: t('hero.bishop.tag'),
      title: t('hero.bishop.title'),
      subtitle: t('hero.bishop.subtitle'),
    },
    {
      image: 'https://stjoan.org/wp/wp-content/uploads/2026/02/DSA-WEbsite.gif',
      tag: t('hero.dsa.tag'),
      title: t('hero.dsa.title'),
      subtitle: t('hero.dsa.subtitle'),
    },
    {
      image: 'https://stjoan.org/wp/wp-content/uploads/2021/07/MASTER-St.-Joan-of-Arc-Pano-.jpg',
      tag: t('hero.parish.tag'),
      title: t('hero.parish.title'),
      subtitle: t('hero.parish.subtitle'),
    },
  ];

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goTo = (index: number) => {
    setCurrent(index);
  };

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className="relative w-full overflow-hidden bg-primary-950 h-[420px] md:h-[600px]">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <img
            alt={slide.title}
            className="w-full h-full object-cover object-top"
            src={slide.image}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute inset-0 z-10 flex flex-col justify-end pb-16 px-6 md:px-10 lg:px-16 max-w-2xl">
            <span className="inline-block text-[11px] font-semibold tracking-[0.2em] uppercase text-accent-500 mb-3 bg-black/30 px-3 py-1 rounded-full w-fit">
              {slide.tag}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-2 drop-shadow-lg font-heading">
              {slide.title}
            </h2>
            <p className="text-base md:text-lg text-white/80 font-light">
              {slide.subtitle}
            </p>
          </div>
        </div>
      ))}

      <button
        onClick={prev}
        className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center bg-white/10 hover:bg-white/25 backdrop-blur-sm text-white rounded-full transition-all cursor-pointer border border-white/20"
        aria-label="Previous slide"
      >
        <i className="ri-arrow-left-s-line text-2xl" />
      </button>
      <button
        onClick={next}
        className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center bg-white/10 hover:bg-white/25 backdrop-blur-sm text-white rounded-full transition-all cursor-pointer border border-white/20"
        aria-label="Next slide"
      >
        <i className="ri-arrow-right-s-line text-2xl" />
      </button>

      <div className="absolute bottom-6 right-6 md:right-10 z-20 flex gap-2 items-center">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className={`transition-all cursor-pointer rounded-full ${
              index === current ? 'w-6 h-2 bg-white' : 'w-2 h-2 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      <div className="absolute bottom-6 left-6 md:left-10 z-20 text-white/50 text-xs font-mono">
        {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
      </div>
    </div>
  );
}