
import { TooltipProvider } from '@radix-ui/react-tooltip';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import ParticlesAnimation from '@/components/ParticlesAnimation';

const Index = () => {
  return (
    <TooltipProvider>
      <div className="min-h-screen bg-theme-darker text-theme-light overflow-hidden">
        <ParticlesAnimation />
        <Header />
        
        <main>
          <HeroSection />
          <AboutSection />
          <ContactSection />
        </main>
        
        <Footer />
      </div>
    </TooltipProvider>
  );
};

export default Index;
