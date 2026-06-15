import { useEffect, useState } from 'react';
import { useCart } from '@/hooks/useCart';

interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
  } | null;
}

export default function ProductDetailModal({ isOpen, onClose, product }: ProductDetailModalProps) {
  const { addToCart, openCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setQuantity(1);
      setAdded(false);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    if (quantity > 1) {
      for (let i = 1; i < quantity; i++) {
        addToCart({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
        });
      }
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    onClose();
    setTimeout(() => openCart(), 100);
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
          <div className="relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-white/80 text-foreground-700 hover:bg-white hover:text-foreground-900 transition-colors cursor-pointer z-10 shadow-sm"
            >
              <i className="ri-close-line text-lg" />
            </button>
            <div className="h-[300px] md:h-[380px] overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="px-6 md:px-8 py-6">
            <h2 className="text-xl md:text-2xl font-bold text-foreground-900">{product.name}</h2>

            <p className="text-2xl font-bold text-primary-600 mt-3">${product.price.toFixed(2)}</p>

            <div className="flex items-center gap-1 mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className="w-4 h-4 flex items-center justify-center text-accent-400">
                  <i className="ri-star-fill text-sm" />
                </span>
              ))}
              <span className="text-xs text-foreground-500 ml-1">(24 reviews)</span>
            </div>

            <p className="text-sm text-foreground-600 leading-relaxed mt-4">{product.description}</p>

            <div className="border-t border-background-200 mt-5 pt-5">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-foreground-700">Quantity:</span>
                <div className="flex items-center border border-background-300 rounded-md">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 flex items-center justify-center text-sm text-foreground-600 hover:bg-background-100 transition-colors cursor-pointer"
                  >
                    <i className="ri-subtract-line" />
                  </button>
                  <span className="w-10 h-8 flex items-center justify-center text-sm text-foreground-800 border-x border-background-300">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center text-sm text-foreground-600 hover:bg-background-100 transition-colors cursor-pointer"
                  >
                    <i className="ri-add-line" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-3 text-sm font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap flex items-center justify-center gap-2 ${
                    added
                      ? 'bg-green-500 text-white'
                      : 'bg-primary-500 text-white hover:bg-primary-600'
                  }`}
                >
                  {added ? (
                    <>
                      <i className="ri-check-line text-base" />
                      Added to Cart!
                    </>
                  ) : (
                    <>
                      <i className="ri-shopping-cart-2-line text-base" />
                      Add to Cart — ${(product.price * quantity).toFixed(2)}
                    </>
                  )}
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 py-3 bg-accent-500 text-white text-sm font-semibold rounded-md hover:bg-accent-600 transition-colors cursor-pointer whitespace-nowrap flex items-center justify-center gap-2"
                >
                  <i className="ri-flashlight-line text-base" />
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}