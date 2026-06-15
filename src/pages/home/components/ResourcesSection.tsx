import { useTranslation } from 'react-i18next';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function ResourcesSection() {
  const { t } = useTranslation();
  const { ref: sectionRef, isVisible } = useScrollReveal();

  const resources = [
    {
      icon: 'ri-chat-quote-line',
      title: t('resources.testimonials'),
      image: 'https://stjoan.org/wp/wp-content/uploads/2016/01/Parishioners-Testimonials.gif',
      href: 'https://stjoan.org/wp/parish/visitors-center/testimonials/',
    },
    {
      icon: 'ri-team-line',
      title: t('resources.ministriesGuide'),
      image: 'https://stjoan.org/wp/wp-content/uploads/2012/01/PDFS-BOX-2.png',
      href: 'https://stjoan.org/wp/ministries/',
    },
    {
      icon: 'ri-newspaper-line',
      title: t('resources.bulletin'),
      image: 'https://stjoan.org/wp/wp-content/uploads/2012/01/PDFS-BOX-3.png',
      href: 'https://stjoan.org/wp/wp-content/uploads/2026/04/2026-4-12_Bulletin.pdf',
    },
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
        <h2 className="text-lg font-bold text-foreground-800 font-heading">{t('resources.sectionTitle')}</h2>
        <div className="flex-1 h-px bg-background-200" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        {resources.map((resource, i) => (
          <a
            key={i}
            href={resource.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative rounded-xl overflow-hidden border border-background-200 cursor-pointer block bg-white hover:border-primary-500/30 transition-all"
          >
            <div className="w-full h-40 overflow-hidden">
              <img
                alt={resource.title}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                src={resource.image}
              />
            </div>
            <div className="p-4 flex items-center gap-3">
              <span className="w-8 h-8 flex items-center justify-center rounded-full bg-primary-50 text-primary-500 flex-shrink-0">
                <i className={`${resource.icon} text-sm`} />
              </span>
              <span className="text-sm font-semibold text-foreground-800 group-hover:text-primary-500 transition-colors">
                {resource.title}
              </span>
              <span className="w-5 h-5 flex items-center justify-center ml-auto text-foreground-300 group-hover:text-primary-500">
                <i className="ri-arrow-right-line text-sm" />
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}