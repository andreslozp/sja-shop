import { useTranslation } from 'react-i18next';

export default function Header() {
  const { t } = useTranslation();

  const infoItems = [
    {
      icon: 'ri-map-pin-line',
      title: t('header.address'),
      subtitle: t('header.city'),
    },
    {
      icon: 'ri-phone-line',
      title: t('header.phone'),
      subtitle: t('header.phoneLabel'),
    },
    {
      icon: 'ri-time-line',
      title: t('header.massTimes'),
      subtitle: t('header.massLabel'),
    },
  ];

  return (
    <div className="bg-white border-b border-background-200">
      <div className="max-w-screen-xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        <a href="/" className="flex items-center gap-4 cursor-pointer">
          <img
            alt="St. Joan of Arc Catholic Church and School"
            className="h-20 w-auto object-contain"
            src="https://stjoan.org/wp/wp-content/themes/stjoan%20Wordpress/img/stjoan-logo.png"
          />
          <div className="hidden md:block">
            <p className="text-[11px] font-semibold tracking-[0.2em] text-primary-500 uppercase">
              {t('site.subtitle')}
            </p>
            <p className="text-[10px] text-foreground-400 tracking-widest uppercase">
              {t('site.location')}
            </p>
          </div>
        </a>
        <div className="hidden lg:flex items-center gap-8 text-sm text-foreground-600">
          {infoItems.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="w-8 h-8 flex items-center justify-center rounded-full bg-primary-50 text-primary-500">
                <i className={`${item.icon} text-base`} />
              </span>
              <div>
                <p className="text-xs font-semibold text-foreground-800 leading-tight">{item.title}</p>
                <p className="text-xs text-foreground-500 leading-tight">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}