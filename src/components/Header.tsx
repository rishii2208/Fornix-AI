
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? 'py-3 bg-theme-dark/90 backdrop-blur-md border-b border-white/10' : 'py-6'}`}>
      <div className="container flex justify-between items-center">
        <a href="#" className="flex items-center">
          <span className="text-2xl font-bold gradient-text">Fornix AI</span>
        </a>

        <nav className="hidden md:block">
          <ul className="flex space-x-10">
            <li><a href="#home" className="text-sm font-medium text-theme-light/70 hover:text-theme-light transition">Home</a></li>
            <li><a href="#about" className="text-sm font-medium text-theme-light/70 hover:text-theme-light transition">About</a></li>
            <li><a href="#services" className="text-sm font-medium text-theme-light/70 hover:text-theme-light transition">Services</a></li>
            <li><a href="#contact" className="text-sm font-medium text-theme-light/70 hover:text-theme-light transition">Contact</a></li>
          </ul>
        </nav>

        <Button variant="default" className="hidden md:flex bg-theme-blue hover:bg-theme-blue/90 text-white animated-button">
          Get Started
        </Button>

        <button 
          className="md:hidden text-theme-light" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-theme-darker neo-blur py-20 px-6">
            <div className="flex flex-col space-y-8 items-center">
              <a href="#home" className="text-xl font-medium" onClick={() => setMobileMenuOpen(false)}>Home</a>
              <a href="#about" className="text-xl font-medium" onClick={() => setMobileMenuOpen(false)}>About</a>
              <a href="#services" className="text-xl font-medium" onClick={() => setMobileMenuOpen(false)}>Services</a>
              <a href="#contact" className="text-xl font-medium" onClick={() => setMobileMenuOpen(false)}>Contact</a>
              <Button variant="default" className="mt-6 w-full bg-theme-blue hover:bg-theme-blue/90">
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
