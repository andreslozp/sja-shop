import { useTranslation } from 'react-i18next';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function MinistriesSection() {
  const { t } = useTranslation();
  const { ref: sectionRef, isVisible } = useScrollReveal();

  const ministries = [
    { icon: 'ri-music-2-line', label: t('ministries.liturgicalMusic'), bg: 'bg-purple-50', text: 'text-purple-700', href: 'https://stjoan.org/wp/ministries/' },
    { icon: 'ri-heart-line', label: t('ministries.care'), bg: 'bg-red-50', text: 'text-red-700', href: 'https://stjoan.org/wp/ministries/' },
    { icon: 'ri-restaurant-line', label: t('ministries.foodPantry'), bg: 'bg-orange-50', text: 'text-orange-700', href: 'https://stjoan.org/wp/ministries/' },
    { icon: 'ri-global-line', label: t('ministries.hispanic'), bg: 'bg-yellow-50', text: 'text-yellow-700', href: 'https://stjoan.org/wp/ministries/' },
    { icon: 'ri-book-open-line', label: t('ministries.religiousEd'), bg: 'bg-blue-50', text: 'text-blue-700', href: 'https://stjoan.org/wp/ccd/' },
    { icon: 'ri-group-line', label: t('ministries.youth'), bg: 'bg-green-50', text: 'text-green-700', href: 'https://stjoan.org/wp/ministries/' },
  ];

  return (
    <div
      ref={sectionRef}
      className={`max-w-screen-xl mx-auto px-4 md:px-6 pb-10 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      <div className="flex items-center gap-3 mb-6">
        <span className="w-1 h-6 rounded-full bg-primary-500" />
        <h2 className="text-lg font-bold text-foreground-800 font-heading">{t('ministries.sectionTitle')}</h2>
        <div className="flex-1 h-px bg-background-200" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
        {ministries.map((ministry, i) => (
          <a
            key={i}
            href={ministry.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-background-200 hover:border-primary-500/30 hover:bg-primary-50 transition-all cursor-pointer group"
          >
            <span className={`w-10 h-10 flex items-center justify-center rounded-full ${ministry.bg} ${ministry.text} group-hover:scale-110 transition-transform`}>
              <i className={`${ministry.icon} text-lg`} />
            </span>
            <span className="text-xs font-medium text-foreground-700 text-center leading-tight">{ministry.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}