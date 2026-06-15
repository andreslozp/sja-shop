import TopBar from '@/components/feature/TopBar';
import Header from '@/components/feature/Header';
import Navbar from '@/components/feature/Navbar';
import HeroCarousel from '@/components/feature/HeroCarousel';
import QuickInfoBar from '@/components/feature/QuickInfoBar';
import ParishLifeSection from './components/ParishLifeSection';
import MinistriesSection from './components/MinistriesSection';
import ResourcesSection from './components/ResourcesSection';
import CTABanner from '@/components/feature/CTABanner';
import Footer from '@/components/feature/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <TopBar />
      <Header />
      <Navbar />
      <div className="flex-1">
        <main className="bg-background-100">
          <HeroCarousel />
          <QuickInfoBar />
          <ParishLifeSection />
          <MinistriesSection />
          <ResourcesSection />
          <CTABanner />
        </main>
      </div>
      <Footer />
    </div>
  );
}