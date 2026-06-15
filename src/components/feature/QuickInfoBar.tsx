import { useTranslation } from 'react-i18next';

export default function QuickInfoBar() {
  const { t } = useTranslation();

  const items = [
    { icon: 'ri-map-pin-line', title: t('quickInfo.address'), subtitle: t('quickInfo.street') },
    { icon: 'ri-phone-line', title: t('quickInfo.phone'), subtitle: t('quickInfo.phoneLabel') },
    { icon: 'ri-time-line', title: t('quickInfo.mass'), subtitle: t('quickInfo.massLabel') },
    { icon: 'ri-mail-line', title: t('quickInfo.email'), subtitle: t('quickInfo.emailLabel') },
  ];

  return (
    <div className="bg-primary-500 text-white">
      <div className="max-w-screen-xl mx-auto px-4 md:px-6 py-3 grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-white/15 flex-shrink-0">
              <i className={`${item.icon} text-sm`} />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-semibold truncate">{item.title}</p>
              <p className="text-[10px] text-white/60">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}