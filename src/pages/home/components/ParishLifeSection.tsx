import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useScrollReveal } from '@/hooks/useScrollReveal';

function SectionTitle({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="w-1 h-6 rounded-full bg-primary-500" />
      <h2 className="text-lg font-bold text-foreground-800 font-heading">{title}</h2>
      <div className="flex-1 h-px bg-background-200" />
    </div>
  );
}

function CardHeader({ icon, title }: { icon: string; title: string }) {
  return (
    <div className="bg-primary-500 px-5 py-4 flex items-center gap-3">
      <span className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 text-white">
        <i className={`${icon} text-base`} />
      </span>
      <h3 className="text-sm font-bold text-white tracking-wide uppercase">{title}</h3>
    </div>
  );
}

export default function ParishLifeSection() {
  const { t } = useTranslation();
  const { ref: sectionRef, isVisible } = useScrollReveal();
  const [showAnnouncements, setShowAnnouncements] = useState(false);
  const [showHolyDays, setShowHolyDays] = useState(false);
  const [showDsa, setShowDsa] = useState(false);

  const eventLinks = [
    { icon: 'ri-book-open-line', label: t('events.education') },
    { icon: 'ri-group-line', label: t('events.occia') },
    { icon: 'ri-music-line', label: t('events.music') },
    { icon: 'ri-heart-line', label: t('events.soulCore') },
    { icon: 'ri-school-line', label: t('events.school') },
  ];

  const donations = [
    { icon: 'ri-calendar-check-line', label: t('donations.weekly') },
    { icon: 'ri-building-line', label: t('donations.kilby') },
    { icon: 'ri-gift-line', label: t('donations.special') },
  ];

  return (
    <div
      ref={sectionRef}
      className={`max-w-screen-xl mx-auto px-4 md:px-6 py-10 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      <SectionTitle title={t('parishLife.sectionTitle')} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
        {/* Parish Announcements */}
        <div className="bg-white rounded-xl border border-background-200 overflow-hidden flex flex-col h-full">
          <CardHeader icon="ri-megaphone-line" title={t('announcements.title')} />
          <div className="p-5 flex-1 flex flex-col">
            <div className="mb-4 pb-4 border-b border-background-100">
              <span className="inline-block text-[10px] font-semibold tracking-widest uppercase text-accent-500 mb-2">
                {t('announcements.featured')}
              </span>
              <h2 className="text-lg font-extrabold text-red-700 leading-tight mb-2">
                {t('announcements.headline')}
              </h2>
              <a
                href="https://vimeo.com/1181331575?fl=pl&fe=vl"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-primary-500 hover:underline cursor-pointer"
              >
                <span className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-play-circle-line" />
                </span>
                {t('announcements.watchVimeo')}
              </a>
            </div>
            <p className="text-sm text-foreground-600 leading-relaxed mb-4">
              {t('announcements.description')}
            </p>
            <div className="mt-auto pt-4">
              {showAnnouncements && (
                <p className="text-sm text-foreground-600 leading-relaxed mb-3">
                  Join Bishop Manuel for a special Holy Hour for Peace on Saturday, April 11, 2026 at 11:00am at Holy Name of Jesus Catholic Church. This is an opportunity for all the faithful to come together in prayer for peace in our world.
                </p>
              )}
              <button
                onClick={() => setShowAnnouncements(!showAnnouncements)}
                className="flex items-center gap-1.5 text-xs font-semibold text-primary-500 hover:text-primary-700 transition-colors cursor-pointer"
              >
                <span className="w-5 h-5 flex items-center justify-center rounded-full border border-primary-500">
                  <i className={`text-xs ${showAnnouncements ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'}`} />
                </span>
                {showAnnouncements ? 'Show less' : t('announcements.readMore')}
              </button>
            </div>
          </div>
        </div>

        {/* Our Pastor */}
        <div className="bg-white rounded-xl border border-background-200 overflow-hidden flex flex-col h-full">
          <CardHeader icon="ri-user-star-line" title={t('pastor.title')} />
          <div className="p-5 flex-1 flex flex-col items-center text-center">
            <div className="relative mb-4">
              <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-primary-50 ring-2 ring-primary-500/20">
                <img
                  alt="Very Rev. Nestor L. Rodriguez, V.F."
                  className="w-full h-full object-cover object-top"
                  src="https://stjoan.org/wp/wp-content/uploads/2022/12/Fr.-Nestor-Rodriguez-crop.jpg"
                />
              </div>
              <span className="absolute -bottom-1 -right-1 w-7 h-7 flex items-center justify-center rounded-full bg-primary-500 text-white">
                <i className="ri-cross-line text-xs" />
              </span>
            </div>
            <h4 className="text-base font-bold text-foreground-800 mb-1">
              {t('pastor.name')}
            </h4>
            <p className="text-xs text-foreground-500 mb-5">{t('pastor.role')}</p>
            <div className="w-full bg-primary-50 rounded-lg p-4 mb-4">
              <p className="text-xs text-foreground-600 italic leading-relaxed">
                &ldquo;{t('pastor.quote')}&rdquo;
              </p>
            </div>
            <a
              href="https://stjoan.org/wp/wp-content/uploads/2026/04/Easter-2026-Message.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary-500 text-white text-xs font-semibold px-4 py-2.5 rounded-full hover:bg-primary-700 transition-colors cursor-pointer whitespace-nowrap mt-auto"
            >
              <span className="w-4 h-4 flex items-center justify-center">
                <i className="ri-file-pdf-line" />
              </span>
              {t('pastor.easterLetter')}
            </a>
          </div>
        </div>

        {/* Events & Registration */}
        <div className="bg-white rounded-xl border border-background-200 overflow-hidden flex flex-col h-full">
          <CardHeader icon="ri-calendar-event-line" title={t('events.title')} />
          <div className="p-5 flex-1 flex flex-col">
            <a
              href="https://stjoan.org/wp/sja-registration-form/"
              target="_blank"
              rel="noopener noreferrer"
              className="block cursor-pointer group mb-4"
            >
              <div className="rounded-lg overflow-hidden border border-background-100">
                <img
                  alt="Events/Classes Registration"
                  className="w-full h-36 object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  src="https://readdy.ai/api/search-image?query=Catholic%20church%20community%20events%20registration%20colorful%20tickets%20and%20forms%20on%20a%20clean%20white%20background%20with%20green%20accents&width=400&height=200&seq=evtreg1&orientation=landscape"
                />
              </div>
            </a>
            <div className="space-y-2 mb-4">
              {eventLinks.map((event, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-primary-50 transition-colors cursor-pointer group"
                >
                  <span className="w-7 h-7 flex items-center justify-center rounded-full bg-primary-50 text-primary-500 group-hover:bg-primary-500 group-hover:text-white transition-colors flex-shrink-0">
                    <i className={`${event.icon} text-xs`} />
                  </span>
                  <span className="text-sm text-foreground-700 group-hover:text-primary-500 transition-colors">
                    {event.label}
                  </span>
                  <span className="w-4 h-4 flex items-center justify-center ml-auto text-foreground-300 group-hover:text-primary-500">
                    <i className="ri-arrow-right-s-line text-sm" />
                  </span>
                </a>
              ))}
            </div>
            <a
              href="https://stjoan.org/wp/sja-registration-form/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto flex items-center justify-center gap-2 bg-accent-500 hover:bg-accent-600 text-white text-sm font-semibold px-4 py-3 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            >
              <span className="w-4 h-4 flex items-center justify-center">
                <i className="ri-edit-line" />
              </span>
              {t('events.registerNow')}
            </a>
          </div>
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        {/* Online Donations */}
        <div className="bg-white rounded-xl border border-background-200 overflow-hidden flex flex-col h-full">
          <CardHeader icon="ri-heart-line" title={t('donations.title')} />
          <div className="p-5 flex-1 flex flex-col">
            <div className="rounded-lg bg-primary-50 p-4 mb-5 text-center">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-primary-500 text-white mx-auto mb-3">
                <i className="ri-hand-heart-line text-2xl" />
              </div>
              <p className="text-sm text-foreground-700 leading-relaxed">
                {t('donations.description')}
              </p>
            </div>
            <div className="space-y-3 mb-5">
              {donations.map((d, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg bg-background-50 border border-background-100"
                >
                  <span className="w-7 h-7 flex items-center justify-center rounded-full bg-primary-50 text-primary-500 flex-shrink-0">
                    <i className={`${d.icon} text-xs`} />
                  </span>
                  <span className="text-sm text-foreground-700">{d.label}</span>
                </div>
              ))}
            </div>
            <div className="mt-auto space-y-3">
              <a
                href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=XXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#003087] hover:bg-[#002060] text-white text-sm font-semibold px-4 py-3 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                <span className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-paypal-line" />
                </span>
                {t('donations.paypal')}
              </a>
              <a
                href="https://www.paypal.com/donate/?hosted_button_id=Z2ABU3WBW9G56"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-accent-500 hover:bg-accent-600 text-white text-sm font-semibold px-4 py-3 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                <span className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-building-line" />
                </span>
                {t('donations.kilbyFund')}
              </a>
            </div>
          </div>
        </div>

        {/* Mass Schedule */}
        <div className="bg-white rounded-xl border border-background-200 overflow-hidden flex flex-col h-full">
          <CardHeader icon="ri-time-line" title={t('massSchedule.title')} />
          <div className="p-5 flex-1 flex flex-col">
            <div className="space-y-3 mb-4">
              <div className="rounded-lg bg-[#f8fdf8] border border-[#e0f0e0] p-3">
                <p className="text-xs font-bold text-primary-500 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                  <span className="w-4 h-4 flex items-center justify-center">
                    <i className="ri-calendar-line text-xs" />
                  </span>
                  {t('massSchedule.monFri')}
                </p>
                <div className="space-y-1">
                  <p className="text-sm text-foreground-700 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0" />
                    {t('massSchedule.chapel815')}
                  </p>
                  <p className="text-sm text-foreground-700 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0" />
                    {t('massSchedule.chapel1215')}
                  </p>
                </div>
              </div>
              <div className="rounded-lg bg-[#f8fdf8] border border-[#e0f0e0] p-3">
                <p className="text-xs font-bold text-primary-500 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                  <span className="w-4 h-4 flex items-center justify-center">
                    <i className="ri-calendar-line text-xs" />
                  </span>
                  {t('massSchedule.saturday')}
                </p>
                <div className="space-y-1">
                  <p className="text-sm text-foreground-700 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0" />
                    {t('massSchedule.chapel815Sat')}
                  </p>
                  <p className="text-sm text-foreground-700 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0" />
                    {t('massSchedule.confessions')}
                  </p>
                  <p className="text-sm text-foreground-700 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0" />
                    {t('massSchedule.chapel430')}
                  </p>
                </div>
              </div>
              <div className="rounded-lg bg-[#f8fdf8] border border-[#e0f0e0] p-3">
                <p className="text-xs font-bold text-primary-500 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                  <span className="w-4 h-4 flex items-center justify-center">
                    <i className="ri-calendar-line text-xs" />
                  </span>
                  {t('massSchedule.sunday')}
                </p>
                <div className="space-y-1">
                  <p className="text-sm text-foreground-700 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0" />
                    {t('massSchedule.sunday730')}
                  </p>
                  <p className="text-sm text-foreground-700 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0" />
                    {t('massSchedule.sunday915')}
                  </p>
                  <p className="text-sm text-foreground-700 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0" />
                    {t('massSchedule.sunday1045')}
                  </p>
                  <p className="text-sm text-foreground-700 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0" />
                    {t('massSchedule.sunday1215')}
                  </p>
                  <p className="text-sm text-foreground-700 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0" />
                    {t('massSchedule.sunday530')}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-auto flex items-center justify-between pt-3 border-t border-background-100">
              <button
                onClick={() => setShowHolyDays(!showHolyDays)}
                className="flex items-center gap-1.5 text-xs font-semibold text-primary-500 hover:text-primary-700 transition-colors cursor-pointer"
              >
                <span className="w-5 h-5 flex items-center justify-center rounded-full border border-primary-500">
                  <i className={`text-xs ${showHolyDays ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'}`} />
                </span>
                {t('massSchedule.holyDays')}
              </button>
              <a
                href="https://www.youtube.com/channel/UC2c4NfI5qt2_uKUNmSuOEXQ"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-red-600 font-semibold hover:underline cursor-pointer"
              >
                <span className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-youtube-line" />
                </span>
                {t('massSchedule.watchLive')}
              </a>
            </div>
            {showHolyDays && (
              <div className="mt-3 rounded-lg bg-primary-50 border border-primary-100 p-3">
                <p className="text-xs font-bold text-primary-500 uppercase tracking-wide mb-2">Holy Days</p>
                <div className="space-y-1">
                  <p className="text-sm text-foreground-700 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0" />
                    8:15am — Chapel
                  </p>
                  <p className="text-sm text-foreground-700 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0" />
                    12:15pm — Chapel
                  </p>
                  <p className="text-sm text-foreground-700 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0" />
                    7:00pm — Church
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Diocesan Services Appeal */}
        <div className="bg-white rounded-xl border border-background-200 overflow-hidden flex flex-col h-full">
          <CardHeader icon="ri-community-line" title={t('dsa.title')} />
          <div className="p-5 flex-1 flex flex-col">
            <div className="rounded-lg overflow-hidden mb-4 border border-background-100">
              <img
                alt="Diocesan Services Appeal"
                className="w-full h-36 object-cover object-top"
                src="https://stjoan.org/wp/wp-content/uploads/2026/02/DSA-WEbsite.gif"
              />
            </div>
            <div className="bg-primary-50 rounded-lg p-4 mb-4">
              <p className="text-xs font-bold text-primary-500 uppercase tracking-wide mb-1">
                {t('dsa.tagline')}
              </p>
              <p className="text-sm text-foreground-600 leading-relaxed">
                {t('dsa.description')}
              </p>
            </div>
            <div className="mt-auto flex items-center justify-between pt-3 border-t border-background-100">
              <button
                onClick={() => setShowDsa(!showDsa)}
                className="flex items-center gap-1.5 text-xs font-semibold text-primary-500 hover:text-primary-700 transition-colors cursor-pointer"
              >
                <span className="w-5 h-5 flex items-center justify-center rounded-full border border-primary-500">
                  <i className={`text-xs ${showDsa ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'}`} />
                </span>
                {t('dsa.learnMore')}
              </button>
              <a
                href="https://www.diocesepb.org/dsa"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-primary-500 font-semibold hover:underline cursor-pointer"
              >
                <span className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-external-link-line" />
                </span>
                {t('dsa.dioceseWebsite')}
              </a>
            </div>
            {showDsa && (
              <div className="mt-3 rounded-lg bg-primary-50 border border-primary-100 p-3">
                <p className="text-sm text-foreground-600 leading-relaxed">
                  The Diocesan Services Appeal (DSA) is the annual fundraising campaign that supports the ministries and programs of the Diocese of Palm Beach. Your generous contributions help fund Catholic education, Catholic Charities, campus ministry, communications, and many other vital services. Thank you for your support!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}