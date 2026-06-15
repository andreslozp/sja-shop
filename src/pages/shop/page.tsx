import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import TopBar from '@/components/feature/TopBar';
import Header from '@/components/feature/Header';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import ProductDetailModal from '@/components/feature/ProductDetailModal';
import CheckoutModal from '@/components/feature/CheckoutModal';
import { useCart } from '@/hooks/useCart';
import { shopProducts } from '@/mocks/shopProducts';

interface ProductDetail {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

export default function ShopPage() {
  const { t } = useTranslation();
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductDetail | null>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [addedMap, setAddedMap] = useState<Record<string, boolean>>({});

  const activeCategoryData = activeCategory
    ? shopProducts.categories.find((c) => c.id === activeCategory)
    : null;
  const activeProducts = activeCategoryData?.products || [];

  useEffect(() => {
    const handleOpenCheckout = () => setCheckoutOpen(true);
    window.addEventListener('open-checkout' as any, handleOpenCheckout);
    return () => window.removeEventListener('open-checkout' as any, handleOpenCheckout);
  }, []);

  const handleAddToCart = (product: ProductDetail, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({ id: product.id, name: product.name, price: product.price, image: product.image });
    setAddedMap((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedMap((prev) => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background-50">
      <TopBar />
      <Header />
      <Navbar />

      {/* Shop Hero */}
      <section className="relative bg-primary-500 py-14 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-400" />
        <div className="relative max-w-screen-xl mx-auto px-4 md:px-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            {t('shop.heroTitle', 'Religious Gift Shop')}
          </h1>
          <p className="text-base md:text-lg text-primary-100 max-w-2xl mx-auto">
            {t('shop.heroSubtitle', 'Beautiful religious gifts, sacramentals, and devotional items for every occasion.')}
          </p>
        </div>
      </section>

      {/* Shop Info Bar */}
      <section className="bg-accent-500 py-3">
        <div className="max-w-screen-xl mx-auto px-4 md:px-6 flex flex-wrap items-center justify-center gap-4 md:gap-8 text-sm text-white">
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 flex items-center justify-center">
              <i className="ri-map-pin-line" />
            </span>
            {t('shop.location', 'Kilby House (Old Rectory)')}
          </span>
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 flex items-center justify-center">
              <i className="ri-time-line" />
            </span>
            {t('shop.weekdayHours', 'Tue – Fri: 9am – 12pm')} | {t('shop.weekendHours', 'Sat: 9am – 5pm & Sun: 8am – 12:30pm')}
          </span>
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 flex items-center justify-center">
              <i className="ri-phone-line" />
            </span>
            {t('shop.phone', '(561) 392-0007 ext. 118')}
          </span>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-10 md:py-14 bg-background-50">
        <div className="max-w-screen-xl mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground-900 text-center mb-8">
            {t('shop.categoriesTitle', 'Browse Our Categories')}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {shopProducts.categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
                className={`group bg-white rounded-lg border-2 transition-all duration-300 cursor-pointer overflow-hidden text-left ${
                  activeCategory === category.id
                    ? 'border-primary-500 shadow-md'
                    : 'border-background-200 hover:border-primary-300 hover:shadow-sm'
                }`}
              >
                <div className="h-36 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-foreground-800 group-hover:text-primary-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-xs text-foreground-500 mt-1 line-clamp-2">{category.description}</p>
                  <span className="text-xs text-primary-500 font-medium mt-2 inline-block">
                    {category.products.length} {t('shop.items', 'items')}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products in Active Category */}
      {activeCategory && activeProducts.length > 0 && (
        <section className="py-10 bg-background-100">
          <div className="max-w-screen-xl mx-auto px-4 md:px-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-foreground-900">
                  {activeCategoryData?.name}
                </h2>
                {activeCategoryData?.description && (
                  <p className="text-sm text-foreground-600 mt-1">{activeCategoryData.description}</p>
                )}
              </div>
              <button
                onClick={() => setActiveCategory(null)}
                className="text-sm text-primary-500 hover:text-primary-600 cursor-pointer flex items-center gap-1 whitespace-nowrap"
              >
                <span className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-close-line" />
                </span>
                {t('shop.close', 'Close')}
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6" data-product-shop="">
              {activeProducts.map((product) => {
                const isAdded = addedMap[product.id];
                return (
                  <div
                    key={product.id}
                    onClick={() => setSelectedProduct(product)}
                    className="bg-white rounded-lg border border-background-200 overflow-hidden hover:shadow-md transition-all cursor-pointer flex flex-col group"
                  >
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 text-foreground-800 text-xs font-medium px-3 py-1.5 rounded-full">
                          Quick View
                        </span>
                      </div>
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="text-sm font-semibold text-foreground-800 line-clamp-2 group-hover:text-primary-600 transition-colors">{product.name}</h3>
                      <p className="text-xs text-foreground-500 mt-1.5 line-clamp-3 flex-1">{product.description}</p>
                      <p className="text-lg font-bold text-primary-600 mt-2">${product.price.toFixed(2)}</p>
                      <button
                        onClick={(e) => handleAddToCart(product, e)}
                        className={`w-full mt-3 py-2 px-4 text-sm font-medium rounded-md transition-all cursor-pointer whitespace-nowrap ${
                          isAdded
                            ? 'bg-green-500 text-white'
                            : 'bg-primary-500 text-white hover:bg-primary-600'
                        }`}
                      >
                        {isAdded ? (
                          <span className="flex items-center justify-center gap-1.5">
                            <i className="ri-check-line" />
                            Added!
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-1.5">
                            <i className="ri-shopping-cart-2-line" />
                            Add to Cart
                          </span>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Contact CTA */}
      <section className="py-12 md:py-16 bg-primary-500">
        <div className="max-w-screen-xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            {t('shop.ctaTitle', 'Visit Our Gift Shop')}
          </h2>
          <p className="text-base text-primary-100 max-w-xl mx-auto mb-6">
            {t('shop.ctaSubtitle', 'Stop by the Kilby House during our open hours to browse our full collection of religious gifts and sacramentals.')}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="tel:5613920007"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-600 font-medium rounded-md hover:bg-primary-50 transition-colors cursor-pointer whitespace-nowrap"
            >
              <span className="w-4 h-4 flex items-center justify-center">
                <i className="ri-phone-line" />
              </span>
              {t('shop.callUs', 'Call Us')}
            </a>
            <a
              href="https://www.google.com/maps?q=370+SW+3rd+St,+Boca+Raton,+FL+33432"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white text-white font-medium rounded-md hover:bg-white/10 transition-colors cursor-pointer whitespace-nowrap"
            >
              <span className="w-4 h-4 flex items-center justify-center">
                <i className="ri-map-pin-line" />
              </span>
              {t('shop.getDirections', 'Get Directions')}
            </a>
          </div>
        </div>
      </section>

      <Footer />

      <ProductDetailModal
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        product={selectedProduct}
      />
      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
      />
    </div>
  );
}