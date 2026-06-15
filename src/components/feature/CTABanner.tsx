import { useTranslation } from 'react-i18next';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function CTABanner() {
  const { t } = useTranslation();
  const { ref: sectionRef, isVisible } = useScrollReveal();

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-6 pb-10">
      <div
        ref={sectionRef}
        className={`relative rounded-2xl overflow-hidden transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <img
          alt="St. Joan of Arc Church"
          className="absolute inset-0 w-full h-full object-cover object-top"
          src="https://readdy.ai/api/search-image?query=Beautiful%20Catholic%20church%20interior%20with%20stained%20glass%20windows%20warm%20golden%20light%20pews%20and%20altar%20peaceful%20serene%20atmosphere%20high%20quality%20photography&width=1200&height=400&seq=ctabanner1&orientation=landscape"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-950/90 via-primary-950/70 to-transparent" />
        <div className="relative z-10 p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-accent-500 mb-2">
              {t('cta.tagline')}
            </p>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 font-heading">
              {t('cta.title')}
            </h3>
            <p className="text-white/70 text-sm max-w-md">
              {t('cta.description')}
            </p>
          </div>
          <a
            href="https://stjoan.org/wp/sja-registration-form/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-bold px-8 py-4 rounded-full transition-colors cursor-pointer whitespace-nowrap text-sm"
          >
            <span className="w-5 h-5 flex items-center justify-center">
              <i className="ri-user-add-line" />
            </span>
            {t('cta.register')}
          </a>
        </div>
      </div>
    </div>
  );
}