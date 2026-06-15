import { useState, useEffect } from 'react';
import { useCart } from '@/hooks/useCart';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { items, cartTotal, clearCart, closeCart, isLoggedIn } = useCart();
  const [step, setStep] = useState<'shipping' | 'payment' | 'confirm'>('shipping');
  const [shipping, setShipping] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  });
  const [card, setCard] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setStep('shipping');
      setOrderPlaced(false);
      setShipping({ firstName: '', lastName: '', email: '', address: '', city: '', state: '', zip: '' });
      setCard({ number: '', name: '', expiry: '', cvv: '' });
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const subtotal = cartTotal;
  const shippingCost = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.07;
  const total = subtotal + shippingCost + tax;

  const isShippingValid = shipping.firstName && shipping.lastName && shipping.email && shipping.address && shipping.city && shipping.state && shipping.zip;
  const isCardValid = card.number && card.name && card.expiry && card.cvv;

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    setTimeout(() => {
      clearCart();
      closeCart();
      onClose();
      setOrderPlaced(false);
    }, 2000);
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 z-[80] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-background-200">
            <h2 className="text-lg font-bold text-foreground-900">Checkout</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-background-100 transition-colors cursor-pointer text-foreground-500"
            >
              <i className="ri-close-line text-lg" />
            </button>
          </div>

          {/* Steps */}
          <div className="flex items-center px-6 py-3 border-b border-background-100 bg-background-50">
            {['shipping', 'payment', 'confirm'].map((s, i) => {
              const label = s === 'shipping' ? 'Shipping' : s === 'payment' ? 'Payment' : 'Confirm';
              const active = step === s;
              const done = (s === 'shipping' && (step === 'payment' || step === 'confirm')) || (s === 'payment' && step === 'confirm');
              return (
                <div key={s} className="flex items-center">
                  <span
                    className={`w-7 h-7 flex items-center justify-center rounded-full text-xs font-semibold ${
                      active
                        ? 'bg-primary-500 text-white'
                        : done
                          ? 'bg-green-500 text-white'
                          : 'bg-background-200 text-foreground-500'
                    }`}
                  >
                    {done ? <i className="ri-check-line" /> : i + 1}
                  </span>
                  <span className={`ml-1.5 text-xs font-medium ${active ? 'text-primary-500' : done ? 'text-green-600' : 'text-foreground-500'}`}>
                    {label}
                  </span>
                  {i < 2 && <div className="w-8 h-px bg-background-300 mx-2" />}
                </div>
              );
            })}
          </div>

          <div className="px-6 py-5">
            {orderPlaced ? (
              <div className="text-center py-8">
                <span className="w-16 h-16 flex items-center justify-center rounded-full bg-green-100 text-green-500 mx-auto mb-3">
                  <i className="ri-check-line text-3xl" />
                </span>
                <h3 className="text-lg font-bold text-foreground-900">Order Confirmed!</h3>
                <p className="text-sm text-foreground-500 mt-1">
                  Thank you for your order. You will receive a confirmation email shortly.
                </p>
              </div>
            ) : (
              <>
                {step === 'shipping' && (
                  <div className="space-y-3">
                    {!isLoggedIn && (
                      <div className="bg-secondary-50 border border-secondary-200 rounded-lg px-4 py-3 text-sm text-secondary-700 mb-2">
                        <i className="ri-information-line mr-1.5" />
                        You are checking out as a guest. <button className="underline cursor-pointer text-primary-500 font-medium whitespace-nowrap" onClick={() => { onClose(); const event = new CustomEvent('open-login'); window.dispatchEvent(event); }}>Sign in</button> for faster checkout.
                      </div>
                    )}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-foreground-700 mb-1">First Name *</label>
                        <input type="text" value={shipping.firstName} onChange={(e) => setShipping({ ...shipping, firstName: e.target.value })} className="w-full px-3 py-2.5 text-sm border border-background-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400 bg-background-50 text-foreground-800" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-foreground-700 mb-1">Last Name *</label>
                        <input type="text" value={shipping.lastName} onChange={(e) => setShipping({ ...shipping, lastName: e.target.value })} className="w-full px-3 py-2.5 text-sm border border-background-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400 bg-background-50 text-foreground-800" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-foreground-700 mb-1">Email *</label>
                      <input type="email" value={shipping.email} onChange={(e) => setShipping({ ...shipping, email: e.target.value })} className="w-full px-3 py-2.5 text-sm border border-background-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400 bg-background-50 text-foreground-800" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-foreground-700 mb-1">Address *</label>
                      <input type="text" value={shipping.address} onChange={(e) => setShipping({ ...shipping, address: e.target.value })} className="w-full px-3 py-2.5 text-sm border border-background-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400 bg-background-50 text-foreground-800" />
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-foreground-700 mb-1">City *</label>
                        <input type="text" value={shipping.city} onChange={(e) => setShipping({ ...shipping, city: e.target.value })} className="w-full px-3 py-2.5 text-sm border border-background-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400 bg-background-50 text-foreground-800" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-foreground-700 mb-1">State *</label>
                        <input type="text" value={shipping.state} onChange={(e) => setShipping({ ...shipping, state: e.target.value })} className="w-full px-3 py-2.5 text-sm border border-background-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400 bg-background-50 text-foreground-800" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-foreground-700 mb-1">ZIP *</label>
                        <input type="text" value={shipping.zip} onChange={(e) => setShipping({ ...shipping, zip: e.target.value })} className="w-full px-3 py-2.5 text-sm border border-background-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400 bg-background-50 text-foreground-800" />
                      </div>
                    </div>
                    <button
                      onClick={() => isShippingValid && setStep('payment')}
                      disabled={!isShippingValid}
                      className="w-full py-3 bg-primary-500 text-white text-sm font-semibold rounded-md hover:bg-primary-600 transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                    >
                      Continue to Payment
                    </button>
                  </div>
                )}

                {step === 'payment' && (
                  <div className="space-y-3">
                    <div className="bg-background-50 rounded-lg p-4 mb-2">
                      <h4 className="text-sm font-semibold text-foreground-800 mb-2">Order Summary</h4>
                      <div className="space-y-2 max-h-32 overflow-y-auto">
                        {items.map((item) => (
                          <div key={item.id} className="flex items-center justify-between text-xs text-foreground-600">
                            <span className="line-clamp-1 flex-1 mr-2">{item.name} × {item.quantity}</span>
                            <span className="whitespace-nowrap">${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                      <div className="border-t border-background-200 mt-3 pt-3 space-y-1 text-xs">
                        <div className="flex justify-between text-foreground-600"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                        <div className="flex justify-between text-foreground-600"><span>Shipping</span><span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span></div>
                        <div className="flex justify-between text-foreground-600"><span>Tax</span><span>${tax.toFixed(2)}</span></div>
                        <div className="flex justify-between text-sm font-bold text-foreground-900 pt-1 border-t border-background-200"><span>Total</span><span>${total.toFixed(2)}</span></div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-foreground-700 mb-1">Card Number *</label>
                      <input type="text" value={card.number} onChange={(e) => setCard({ ...card, number: e.target.value })} placeholder="1234 5678 9012 3456" maxLength={19} className="w-full px-3 py-2.5 text-sm border border-background-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400 bg-background-50 text-foreground-800" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-foreground-700 mb-1">Name on Card *</label>
                      <input type="text" value={card.name} onChange={(e) => setCard({ ...card, name: e.target.value })} className="w-full px-3 py-2.5 text-sm border border-background-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400 bg-background-50 text-foreground-800" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-foreground-700 mb-1">Expiry *</label>
                        <input type="text" value={card.expiry} onChange={(e) => setCard({ ...card, expiry: e.target.value })} placeholder="MM/YY" maxLength={5} className="w-full px-3 py-2.5 text-sm border border-background-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400 bg-background-50 text-foreground-800" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-foreground-700 mb-1">CVV *</label>
                        <input type="text" value={card.cvv} onChange={(e) => setCard({ ...card, cvv: e.target.value })} placeholder="123" maxLength={4} className="w-full px-3 py-2.5 text-sm border border-background-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400 bg-background-50 text-foreground-800" />
                      </div>
                    </div>
                    <div className="flex gap-3 mt-2">
                      <button
                        onClick={() => setStep('shipping')}
                        className="flex-1 py-3 text-sm font-medium text-foreground-700 border border-background-300 rounded-md hover:bg-background-50 transition-colors cursor-pointer whitespace-nowrap"
                      >
                        Back
                      </button>
                      <button
                        onClick={() => isCardValid && setStep('confirm')}
                        disabled={!isCardValid}
                        className="flex-1 py-3 bg-primary-500 text-white text-sm font-semibold rounded-md hover:bg-primary-600 transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Review Order
                      </button>
                    </div>
                  </div>
                )}

                {step === 'confirm' && (
                  <div className="space-y-4">
                    <div className="bg-background-50 rounded-lg p-4">
                      <h4 className="text-sm font-semibold text-foreground-800 mb-2">Shipping Address</h4>
                      <p className="text-sm text-foreground-600">
                        {shipping.firstName} {shipping.lastName}<br />
                        {shipping.address}<br />
                        {shipping.city}, {shipping.state} {shipping.zip}<br />
                        {shipping.email}
                      </p>
                    </div>
                    <div className="bg-background-50 rounded-lg p-4">
                      <h4 className="text-sm font-semibold text-foreground-800 mb-2">Order Items</h4>
                      <div className="space-y-2">
                        {items.map((item) => (
                          <div key={item.id} className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-foreground-800 line-clamp-1">{item.name}</p>
                              <p className="text-xs text-foreground-500">Qty: {item.quantity}</p>
                            </div>
                            <p className="text-sm font-semibold text-foreground-800 whitespace-nowrap">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        ))}
                      </div>
                      <div className="border-t border-background-200 mt-3 pt-3 space-y-1 text-sm">
                        <div className="flex justify-between text-foreground-600"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                        <div className="flex justify-between text-foreground-600"><span>Shipping</span><span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span></div>
                        <div className="flex justify-between text-foreground-600"><span>Tax (7%)</span><span>${tax.toFixed(2)}</span></div>
                        <div className="flex justify-between text-base font-bold text-foreground-900 pt-2 border-t border-background-200"><span>Total</span><span>${total.toFixed(2)}</span></div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setStep('payment')}
                        className="flex-1 py-3 text-sm font-medium text-foreground-700 border border-background-300 rounded-md hover:bg-background-50 transition-colors cursor-pointer whitespace-nowrap"
                      >
                        Back
                      </button>
                      <button
                        onClick={handlePlaceOrder}
                        className="flex-1 py-3 bg-green-500 text-white text-sm font-semibold rounded-md hover:bg-green-600 transition-colors cursor-pointer whitespace-nowrap flex items-center justify-center gap-2"
                      >
                        <i className="ri-check-line text-base" />
                        Place Order — ${total.toFixed(2)}
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}