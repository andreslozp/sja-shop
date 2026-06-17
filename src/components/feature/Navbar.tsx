import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCart } from '@/hooks/useCart';
import CartDrawer from '@/components/feature/CartDrawer';
import LoginModal from '@/components/feature/LoginModal';
import UserMenu from '@/components/feature/UserMenu';

interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
  children?: { label: string; href: string }[];
}

export default function Navbar() {
  const { t } = useTranslation();
  const { cartCount, openCart, isLoggedIn } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [loginOpen, setLoginOpen] = useState(false);

  const navItems: NavItem[] = [
    { label: t('nav.home'), href: '/' },
    {
      label: t('nav.parish'),
      href: 'https://stjoan.org/wp/parish/',
      hasDropdown: true,
      children: [
        { label: 'About Our Parish', href: 'https://stjoan.org/wp/parish/' },
        { label: 'Parish Staff', href: 'https://stjoan.org/wp/parish/' },
        { label: 'Visitors Center', href: 'https://stjoan.org/wp/parish/' },
        { label: 'Testimonials', href: 'https://stjoan.org/wp/parish/' },
      ],
    },
    {
      label: t('nav.worship'),
      href: 'https://stjoan.org/wp/worship-life-sacraments/',
      hasDropdown: true,
      children: [
        { label: 'Mass Schedule', href: 'https://stjoan.org/wp/worship-life-sacraments/' },
        { label: 'Sacraments', href: 'https://stjoan.org/wp/worship-life-sacraments/' },
        { label: 'Baptism', href: 'https://stjoan.org/wp/worship-life-sacraments/' },
        { label: 'Marriage', href: 'https://stjoan.org/wp/worship-life-sacraments/' },
        { label: 'Funerals', href: 'https://stjoan.org/wp/worship-life-sacraments/' },
      ],
    },
    {
      label: t('nav.school'),
      href: 'https://stjoan.org/wp/school/',
      hasDropdown: true,
      children: [
        { label: 'About Our School', href: 'https://stjoan.org/wp/school/' },
        { label: 'Admissions', href: 'https://stjoan.org/wp/school/' },
        { label: 'Academics', href: 'https://stjoan.org/wp/school/' },
        { label: 'Open House', href: 'https://stjoan.org/wp/school/' },
      ],
    },
    {
      label: t('nav.ministries'),
      href: 'https://stjoan.org/wp/ministries/',
      hasDropdown: true,
      children: [
        { label: 'Liturgical Music', href: 'https://stjoan.org/wp/ministries/' },
        { label: 'Care Ministry', href: 'https://stjoan.org/wp/ministries/' },
        { label: 'Food Pantry', href: 'https://stjoan.org/wp/ministries/' },
        { label: 'Youth Ministry', href: 'https://stjoan.org/wp/ministries/' },
      ],
    },
    { label: t('nav.religiousEducation'), href: 'https://stjoan.org/wp/ccd/' },
    { label: t('nav.occia'), href: 'https://stjoan.org/wp/rcia/' },
    { label: t('nav.waysToGive'), href: 'https://stjoan.org/wp/development-stewardship/' },
    { label: t('nav.shop'), href: '/shop' },
    { label: t('nav.marketplace'), href: '/marketplace' },
  ];

  return (
    <>
    <nav className="sticky top-0 z-50 transition-all duration-300 bg-white border-b border-background-200">
      <div className="max-w-screen-xl mx-auto px-4 md:px-6">
        <div className="hidden lg:flex items-center justify-between">
          <div className="flex items-center">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative group"
              onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <a
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={`flex items-center gap-1 px-3.5 py-3.5 text-[13px] font-medium whitespace-nowrap transition-all cursor-pointer border-b-2 ${
                  (item.href === '/' || item.href === '/shop' || item.href === '/marketplace')
                    ? 'border-primary-500 text-primary-500'
                    : 'border-transparent text-foreground-700 hover:text-primary-500 hover:border-primary-500'
                }`}
              >
                {item.label}
                {item.hasDropdown && (
                  <span className="w-3 h-3 flex items-center justify-center opacity-60">
                    <i className="ri-arrow-down-s-line text-xs" />
                  </span>
                )}
              </a>
              {item.hasDropdown && activeDropdown === item.label && (
                <div className="absolute top-full left-0 bg-white rounded-lg shadow-lg border border-background-200 py-2 min-w-[220px] z-50">
                  {item.children?.map((child) => (
                    <a
                      key={child.label}
                      href={child.href}
                      target={child.href.startsWith('http') ? '_blank' : undefined}
                      rel={child.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="block px-4 py-2.5 text-sm text-foreground-700 hover:text-primary-500 hover:bg-primary-50 transition-colors cursor-pointer"
                    >
                      {child.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          </div>
          {/* Right side: cart + login */}
          <div className="flex items-center gap-2">
            <button
              onClick={openCart}
              className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-background-100 transition-colors cursor-pointer text-foreground-700"
              aria-label="Shopping cart"
            >
              <i className="ri-shopping-cart-2-line text-lg" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 flex items-center justify-center rounded-full bg-accent-500 text-white text-[10px] font-bold">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </button>
            {isLoggedIn ? (
              <UserMenu />
            ) : (
              <button
                onClick={() => setLoginOpen(true)}
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-foreground-700 hover:text-primary-500 rounded-full border border-background-200 hover:border-primary-300 transition-all cursor-pointer whitespace-nowrap"
              >
                <span className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-user-line" />
                </span>
                Sign In
              </button>
            )}
          </div>
        </div>
        <div className="lg:hidden flex items-center justify-between py-3">
          <a href="/" className="flex items-center gap-2 cursor-pointer">
            <img
              alt="St. Joan of Arc"
              className="h-10 w-auto object-contain"
              src="https://stjoan.org/wp/wp-content/themes/stjoan%20Wordpress/img/stjoan-logo.png"
            />
          </a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="w-9 h-9 flex items-center justify-center rounded-md cursor-pointer transition-colors text-foreground-700 hover:bg-background-100"
          >
            <i className={`text-xl ${mobileOpen ? 'ri-close-line' : 'ri-menu-3-line'}`} />
          </button>
        </div>
        {mobileOpen && (
          <div className="lg:hidden pb-4 space-y-1 border-t border-background-200 pt-2">
            {navItems.map((item) => (
              <div key={item.label}>
                <a
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={`flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                    (item.href === '/' || item.href === '/shop' || item.href === '/marketplace')
                      ? 'text-primary-500 bg-primary-50'
                      : 'text-foreground-700 hover:text-primary-500 hover:bg-primary-50'
                  }`}
                >
                  {item.label}
                  {item.hasDropdown && (
                    <i className="ri-arrow-down-s-line text-xs text-foreground-400" />
                  )}
                </a>
                {item.children && (
                  <div className="pl-6 space-y-1">
                    {item.children.map((child) => (
                      <a
                        key={child.label}
                        href={child.href}
                        target={child.href.startsWith('http') ? '_blank' : undefined}
                        rel={child.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="block px-3 py-2 text-sm text-foreground-600 hover:text-primary-500 transition-colors cursor-pointer"
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </nav>
    <CartDrawer />
    <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}