import { useState, useRef, useEffect } from 'react';
import { useCart } from '@/hooks/useCart';

export default function UserMenu() {
  const { isLoggedIn, userName, logout } = useCart();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [open]);

  if (!isLoggedIn) return null;

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-background-200 hover:bg-background-50 transition-colors cursor-pointer"
      >
        <span className="w-7 h-7 flex items-center justify-center rounded-full bg-primary-100 text-primary-600 text-xs font-bold">
          {userName.charAt(0).toUpperCase()}
        </span>
        <span className="text-sm font-medium text-foreground-700 hidden md:inline">{userName}</span>
        <span className="w-3 h-3 flex items-center justify-center text-foreground-500">
          <i className={`text-xs ${open ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'}`} />
        </span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-background-200 py-2 z-50">
          <div className="px-4 py-2 border-b border-background-100">
            <p className="text-sm font-semibold text-foreground-800">{userName}</p>
            <p className="text-xs text-foreground-500">Parishioner</p>
          </div>
          <a href="/shop" className="flex items-center gap-2 px-4 py-2.5 text-sm text-foreground-700 hover:bg-background-50 transition-colors cursor-pointer">
            <i className="ri-store-2-line text-base text-foreground-500" />
            My Orders
          </a>
          <a href="#" className="flex items-center gap-2 px-4 py-2.5 text-sm text-foreground-700 hover:bg-background-50 transition-colors cursor-pointer">
            <i className="ri-heart-line text-base text-foreground-500" />
            Wishlist
          </a>
          <a href="#" className="flex items-center gap-2 px-4 py-2.5 text-sm text-foreground-700 hover:bg-background-50 transition-colors cursor-pointer">
            <i className="ri-settings-3-line text-base text-foreground-500" />
            Account Settings
          </a>
          <div className="border-t border-background-100 mt-1 pt-1">
            <button
              onClick={() => { logout(); setOpen(false); }}
              className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer text-left"
            >
              <i className="ri-logout-box-line text-base" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}