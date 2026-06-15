import { useEffect } from 'react';
import { useCart, type CartItem } from '@/hooks/useCart';

export default function CartDrawer() {
  const { items, isCartOpen, closeCart, removeFromCart, updateQuantity, cartCount, cartTotal } = useCart();

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-[60] transition-opacity"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-[70] flex flex-col shadow-2xl animate-slide-in">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-background-200">
          <div className="flex items-center gap-2">
            <span className="w-9 h-9 flex items-center justify-center rounded-full bg-primary-50 text-primary-500">
              <i className="ri-shopping-cart-2-line text-lg" />
            </span>
            <h2 className="text-base font-semibold text-foreground-900">
              Shopping Cart
              {cartCount > 0 && (
                <span className="ml-2 text-sm font-normal text-foreground-500">
                  ({cartCount} {cartCount === 1 ? 'item' : 'items'})
                </span>
              )}
            </h2>
          </div>
          <button
            onClick={closeCart}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-background-100 transition-colors cursor-pointer text-foreground-500"
          >
            <i className="ri-close-line text-lg" />
          </button>
        </div>

        {/* Content */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
            <span className="w-20 h-20 flex items-center justify-center rounded-full bg-background-100 text-foreground-300 mb-4">
              <i className="ri-shopping-cart-line text-3xl" />
            </span>
            <p className="text-foreground-700 font-medium text-base mb-1">Your cart is empty</p>
            <p className="text-sm text-foreground-500 mb-5">Browse our shop or marketplace to find beautiful religious items.</p>
            <button
              onClick={closeCart}
              className="px-5 py-2.5 bg-primary-500 text-white text-sm font-medium rounded-md hover:bg-primary-600 transition-colors cursor-pointer whitespace-nowrap"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {items.map((item) => (
                <CartItemRow
                  key={item.id}
                  item={item}
                  onRemove={removeFromCart}
                  onUpdateQuantity={updateQuantity}
                />
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-background-200 px-5 py-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-foreground-600">Subtotal</span>
                <span className="text-foreground-900 font-semibold">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-foreground-500">
                <span>Shipping</span>
                <span>Calculated at next step</span>
              </div>
              <div className="flex items-center justify-between text-base font-bold pt-2 border-t border-background-100">
                <span className="text-foreground-900">Total</span>
                <span className="text-primary-600">${cartTotal.toFixed(2)}</span>
              </div>
              <button
                className="w-full py-3 bg-primary-500 text-white text-sm font-semibold rounded-md hover:bg-primary-600 transition-colors cursor-pointer whitespace-nowrap flex items-center justify-center gap-2"
                onClick={() => {
                  const event = new CustomEvent('open-checkout');
                  window.dispatchEvent(event);
                }}
              >
                <i className="ri-secure-payment-line text-base" />
                Proceed to Checkout
              </button>
              <button
                onClick={closeCart}
                className="w-full py-2 text-sm text-foreground-600 hover:text-foreground-800 transition-colors cursor-pointer whitespace-nowrap"
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </div>

      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
}

function CartItemRow({
  item,
  onRemove,
  onUpdateQuantity,
}: {
  item: CartItem;
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, qty: number) => void;
}) {
  return (
    <div className="flex gap-3 bg-background-50 rounded-lg p-3">
      <div className="w-20 h-20 flex-shrink-0 rounded-md overflow-hidden bg-background-100">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-foreground-800 line-clamp-2">{item.name}</h4>
        <p className="text-sm font-semibold text-primary-600 mt-1">${item.price.toFixed(2)}</p>
        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center border border-background-300 rounded-md">
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              className="w-7 h-7 flex items-center justify-center text-sm text-foreground-600 hover:bg-background-100 transition-colors cursor-pointer"
            >
              <i className="ri-subtract-line" />
            </button>
            <span className="w-8 h-7 flex items-center justify-center text-sm text-foreground-800 border-x border-background-300">
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              className="w-7 h-7 flex items-center justify-center text-sm text-foreground-600 hover:bg-background-100 transition-colors cursor-pointer"
            >
              <i className="ri-add-line" />
            </button>
          </div>
          <button
            onClick={() => onRemove(item.id)}
            className="ml-auto w-7 h-7 flex items-center justify-center text-foreground-400 hover:text-red-500 transition-colors cursor-pointer"
          >
            <i className="ri-delete-bin-line" />
          </button>
        </div>
      </div>
    </div>
  );
}