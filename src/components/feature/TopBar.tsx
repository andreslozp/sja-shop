import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function TopBar() {
  const { t } = useTranslation();
  const [showLang, setShowLang] = useState(false);

  const socialLinks = [
    { icon: 'ri-instagram-line', href: 'https://www.instagram.com/stjoanofarcschool_boca/' },
    { icon: 'ri-youtube-line', href: 'https://www.youtube.com/user/stjoanofarcboca' },
    { icon: 'ri-twitter-x-line', href: 'https://twitter.com/JoanofArcChurch' },
    { icon: 'ri-facebook-line', href: 'https://www.facebook.com/pages/St-Joan-of-Arc-Catholic-Church/179683658763145' },
  ];

  return (
    <div className="bg-primary-950 text-white">
      <div className="max-w-screen-xl mx-auto px-4 md:px-6 py-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {socialLinks.map((link, i) => (
            <a
              key={i}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              <i className={`${link.icon} text-base`} />
            </a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://stjoan.org/wp/sja-registration-form/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1.5 text-xs text-white/80 hover:text-white transition-colors cursor-pointer whitespace-nowrap"
          >
            <span className="w-4 h-4 flex items-center justify-center">
              <i className="ri-user-add-line" />
            </span>
            {t('topBar.register')}
          </a>
          <a
            href="https://www.paypal.com/cgi-bin/webscr"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1.5 bg-accent-500 hover:bg-accent-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full transition-colors cursor-pointer whitespace-nowrap"
          >
            <span className="w-4 h-4 flex items-center justify-center">
              <i className="ri-heart-line" />
            </span>
            {t('topBar.donate')}
          </a>
          <div className="relative">
            <button
              onClick={() => setShowLang(!showLang)}
              className="flex items-center gap-1 text-xs text-white/80 hover:text-white transition-colors cursor-pointer px-2 py-1 rounded border border-white/20 hover:border-white/50"
            >
              <span>🇺🇸</span>
              <span>{t('topBar.language')}</span>
              <span className="w-3 h-3 flex items-center justify-center">
                <i className="ri-arrow-down-s-line text-xs" />
              </span>
            </button>
            {showLang && (
              <div className="absolute right-0 mt-1 bg-white rounded-lg shadow-lg border border-background-200 py-1 z-50 min-w-[100px]">
                <button className="flex items-center gap-2 px-3 py-2 text-sm text-foreground-800 hover:bg-background-100 w-full text-left cursor-pointer">
                  <span>🇺🇸</span> English
                </button>
                <button className="flex items-center gap-2 px-3 py-2 text-sm text-foreground-800 hover:bg-background-100 w-full text-left cursor-pointer">
                  <span>🇪🇸</span> Español
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}