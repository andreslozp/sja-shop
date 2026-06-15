import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  const socialLinks = [
    { icon: 'ri-instagram-line', href: 'https://www.instagram.com/stjoanofarcschool_boca/' },
    { icon: 'ri-youtube-line', href: 'https://www.youtube.com/user/stjoanofarcboca' },
    { icon: 'ri-twitter-x-line', href: 'https://twitter.com/JoanofArcChurch' },
    { icon: 'ri-facebook-line', href: 'https://www.facebook.com/pages/St-Joan-of-Arc-Catholic-Church/179683658763145' },
  ];

  const quickLinks = [
    { label: 'SJA Registration', href: 'https://stjoan.org/wp/sja-registration-form/' },
    { label: 'Parish', href: 'https://stjoan.org/wp/parish/' },
    { label: 'Worship & Sacraments', href: 'https://stjoan.org/wp/worship-life-sacraments/' },
    { label: 'School', href: 'https://stjoan.org/wp/school/' },
    { label: 'Ministries', href: 'https://stjoan.org/wp/ministries/' },
    { label: 'Religious Education', href: 'https://stjoan.org/wp/ccd/' },
    { label: 'OCIA', href: 'https://stjoan.org/wp/rcia/' },
    { label: 'Ways To Give', href: 'https://stjoan.org/wp/development-stewardship/' },
  ];

  return (
    <footer className="bg-primary-950 text-white mt-0">
      <div className="max-w-screen-xl mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <a href="/" className="inline-block mb-4 cursor-pointer">
              <img
                alt="St. Joan of Arc"
                className="h-16 w-auto object-contain brightness-0 invert"
                src="https://stjoan.org/wp/wp-content/themes/stjoan%20Wordpress/img/stjoan-logo.png"
              />
            </a>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              {t('footer.about')}
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-primary-500 text-white/70 hover:text-white transition-all cursor-pointer"
                >
                  <i className={`${link.icon} text-sm`} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-4">
              {t('footer.quickLinks')}
            </h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {quickLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/70 hover:text-white hover:translate-x-0.5 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span className="w-1 h-1 rounded-full bg-primary-500 flex-shrink-0" />
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-4">
              {t('footer.contact')}
            </h4>
            <div className="space-y-3">
              <a
                href="https://maps.google.com/maps?q=370+S.W.+3rd+Street+Boca+Raton+FL+33432"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 group cursor-pointer"
              >
                <span className="w-7 h-7 flex items-center justify-center rounded-full bg-white/10 text-accent-500 flex-shrink-0 mt-0.5 group-hover:bg-primary-500 transition-colors">
                  <i className="ri-map-pin-line text-xs" />
                </span>
                <span className="text-sm text-white/70 group-hover:text-white transition-colors whitespace-pre-line">
                  {t('header.address')}{'\n'}{t('header.city')}
                </span>
              </a>
              <a
                href="tel:5613920007"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 group cursor-pointer"
              >
                <span className="w-7 h-7 flex items-center justify-center rounded-full bg-white/10 text-accent-500 flex-shrink-0 mt-0.5 group-hover:bg-primary-500 transition-colors">
                  <i className="ri-phone-line text-xs" />
                </span>
                <span className="text-sm text-white/70 group-hover:text-white transition-colors whitespace-pre-line">
                  {t('header.phone')}
                </span>
              </a>
              <a
                href="mailto:info_church@stjoan.org"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 group cursor-pointer"
              >
                <span className="w-7 h-7 flex items-center justify-center rounded-full bg-white/10 text-accent-500 flex-shrink-0 mt-0.5 group-hover:bg-primary-500 transition-colors">
                  <i className="ri-mail-line text-xs" />
                </span>
                <span className="text-sm text-white/70 group-hover:text-white transition-colors whitespace-pre-line">
                  {t('quickInfo.email')}
                </span>
              </a>
            </div>
            <div className="mt-4 rounded-lg overflow-hidden border border-white/10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3574.5!2d-80.0878!3d26.3559!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDIxJzIxLjIiTiA4MMKwMDUnMTYuMSJX!5e0!3m2!1sen!2sus!4v1"
                width="100%"
                height={120}
                allowFullScreen
                loading="lazy"
                title="St. Joan of Arc Location"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-screen-xl mx-auto px-4 md:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-white/40">
            &copy; {t('footer.copyright')}
          </p>
          <div className="flex items-center gap-4">
            <a href="/shop" className="text-xs text-white/40 hover:text-white/70 transition-colors cursor-pointer whitespace-nowrap">
              Shop
            </a>
            <a href="/marketplace" className="text-xs text-white/40 hover:text-white/70 transition-colors cursor-pointer whitespace-nowrap">
              Marketplace
            </a>
            <a href="mailto:info_church@stjoan.org" className="text-xs text-white/40 hover:text-white/70 transition-colors cursor-pointer whitespace-nowrap">
              {t('footer.privacy')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}