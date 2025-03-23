
import React, { useState, useEffect } from 'react';
import { useScrollProgress } from '@/utils/scrollUtils';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrollProgress = useScrollProgress();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = navLinks.map((link) => link.href.substring(1));
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (!element) return false;
        
        const rect = element.getBoundingClientRect();
        return rect.top <= 150 && rect.bottom > 150;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md",
        isScrolled ? "border-b border-border/20 bg-background/80" : "bg-transparent"
      )}
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="absolute bottom-0 left-0 right-0 h-0.5 overflow-hidden">
          <div 
            className="h-full bg-primary" 
            style={{ width: `${scrollProgress}%`, transition: 'width 0.1s' }}
          />
        </div>
        
        <div className="flex items-center justify-between py-4">
          <a href="#home" className="flex items-center">
            <span className="text-xl font-bold tracking-tight text-foreground">Aditya Chowdhury</span>
          </a>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "nav-link",
                  activeSection === link.href.substring(1) && "active"
                )}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {link.label}
              </a>
            ))}
            <a 
              href="#contact" 
              className="ml-4 button-primary"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Contact Me
            </a>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-foreground/80 hover:text-foreground"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div
        className={cn(
          "md:hidden fixed inset-0 bg-background z-40 transition-transform duration-300 ease-out-expo pt-20",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="flex flex-col items-center space-y-4 px-4 py-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-lg font-medium py-3 w-full text-center"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                closeMenu();
              }}
            >
              {link.label}
            </a>
          ))}
          <a 
            href="#contact" 
            className="w-full mt-4 button-primary text-center"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              closeMenu();
            }}
          >
            Contact Me
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
