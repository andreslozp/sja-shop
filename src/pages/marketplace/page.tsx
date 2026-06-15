import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import TopBar from '@/components/feature/TopBar';
import Header from '@/components/feature/Header';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import ProductDetailModal from '@/components/feature/ProductDetailModal';
import CheckoutModal from '@/components/feature/CheckoutModal';
import { useCart } from '@/hooks/useCart';
import { marketplaceProducts } from '@/mocks/shopProducts';

interface ProductDetail {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

export default function MarketplacePage() {
  const { t } = useTranslation();
  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<ProductDetail | null>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [addedMap, setAddedMap] = useState<Record<string, boolean>>({});

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

      {/* Marketplace Hero */}
      <section className="relative bg-accent-500 py-14 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent-600 to-accent-400" />
        <div className="relative max-w-screen-xl mx-auto px-4 md:px-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            {t('marketplace.heroTitle', 'SJA Marketplace')}
          </h1>
          <p className="text-base md:text-lg text-accent-100 max-w-2xl mx-auto">
            {t('marketplace.heroSubtitle', 'Support our parish community by purchasing exclusive SJA merchandise and curated religious items.')}
          </p>
        </div>
      </section>

      {/* Product Sections */}
      <section className="py-10 md:py-14 bg-background-50">
        <div className="max-w-screen-xl mx-auto px-4 md:px-6">
          {marketplaceProducts.sections.map((section) => (
            <div key={section.id} className="mb-12 md:mb-16">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-foreground-900">
                  {section.title}
                </h2>
                <a
                  href="/shop"
                  className="text-sm text-primary-500 hover:text-primary-600 cursor-pointer flex items-center gap-1 whitespace-nowrap"
                >
                  {t('marketplace.viewAll', 'View all')}
                  <span className="w-3 h-3 flex items-center justify-center">
                    <i className="ri-arrow-right-line" />
                  </span>
                </a>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6" data-product-shop="">
                {section.items.map((item) => {
                  const isAdded = addedMap[item.id];
                  return (
                    <div
                      key={item.id}
                      onClick={() => setSelectedProduct(item)}
                      className="bg-white rounded-lg border border-background-200 overflow-hidden hover:shadow-lg transition-all duration-300 group flex flex-col cursor-pointer"
                    >
                      <div className="relative h-52 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 text-foreground-800 text-xs font-medium px-3 py-1.5 rounded-full">
                            Quick View
                          </span>
                        </div>
                        {item.tag && (
                          <span className="absolute top-3 left-3 px-2.5 py-1 bg-accent-500 text-white text-xs font-medium rounded-full">
                            {item.tag}
                          </span>
                        )}
                      </div>
                      <div className="p-4 flex flex-col flex-1">
                        <h3 className="text-sm font-semibold text-foreground-800 line-clamp-2 group-hover:text-primary-600 transition-colors">
                          {item.name}
                        </h3>
                        <p className="text-xs text-foreground-500 mt-1.5 line-clamp-3 flex-1">{item.description}</p>
                        <p className="text-lg font-bold text-primary-600 mt-2">${item.price.toFixed(2)}</p>
                        <button
                          onClick={(e) => handleAddToCart(item, e)}
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
          ))}
        </div>
      </section>

      {/* How to Order */}
      <section className="py-10 md:py-14 bg-background-100">
        <div className="max-w-screen-xl mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground-900 text-center mb-10">
            {t('marketplace.howToOrder', 'How to Order')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-white rounded-lg p-6 md:p-8 text-center border border-background-200">
              <span className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-primary-50 text-primary-500 mx-auto mb-4">
                <i className="ri-store-2-line text-2xl md:text-3xl" />
              </span>
              <h3 className="text-base font-semibold text-foreground-800 mb-2">
                {t('marketplace.step1Title', 'Visit In Person')}
              </h3>
              <p className="text-sm text-foreground-600">
                {t('marketplace.step1Desc', 'Come to the Kilby House during shop hours to browse our full selection and speak with our staff.')}
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 md:p-8 text-center border border-background-200">
              <span className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-accent-50 text-accent-500 mx-auto mb-4">
                <i className="ri-phone-line text-2xl md:text-3xl" />
              </span>
              <h3 className="text-base font-semibold text-foreground-800 mb-2">
                {t('marketplace.step2Title', 'Call to Order')}
              </h3>
              <p className="text-sm text-foreground-600">
                {t('marketplace.step2Desc', 'Call (561) 392-0007 ext. 118 to inquire about items and arrange pickup or shipping.')}
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 md:p-8 text-center border border-background-200">
              <span className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-secondary-50 text-secondary-500 mx-auto mb-4">
                <i className="ri-mail-send-line text-2xl md:text-3xl" />
              </span>
              <h3 className="text-base font-semibold text-foreground-800 mb-2">
                {t('marketplace.step3Title', 'Email Inquiry')}
              </h3>
              <p className="text-sm text-foreground-600">
                {t('marketplace.step3Desc', 'Send an email to info_church@stjoan.org with the item names and we will get back to you promptly.')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Donate Banner */}
      <section className="py-12 md:py-16 bg-accent-500">
        <div className="max-w-screen-xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            {t('marketplace.donateTitle', 'Support Our Parish')}
          </h2>
          <p className="text-base text-accent-100 max-w-xl mx-auto mb-6">
            {t('marketplace.donateSubtitle', 'All proceeds from the SJA Gift Shop and Marketplace support our parish ministries, school programs, and outreach efforts.')}
          </p>
          <a
            href="https://www.paypal.com/donate/?hosted_button_id=XH4NC8FX6VU9A"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-accent-600 font-medium rounded-md hover:bg-accent-50 transition-colors cursor-pointer whitespace-nowrap"
          >
            <span className="w-4 h-4 flex items-center justify-center">
              <i className="ri-heart-line" />
            </span>
            {t('marketplace.donateNow', 'Donate Now')}
          </a>
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