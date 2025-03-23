
import React, { useState, useEffect, useRef } from 'react';
import { useScrollProgress } from '@/utils/scrollUtils';
import { cn } from '@/lib/utils';
import { Zap, Sparkles, X } from 'lucide-react';

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
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    // Handle touch gestures for the mobile menu
    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.changedTouches[0];
      touchStartRef.current = { x: touch.pageX, y: touch.pageY };
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartRef.current) return;
      
      const touch = e.changedTouches[0];
      const xDiff = touchStartRef.current.x - touch.pageX;
      const yDiff = touchStartRef.current.y - touch.pageY;
      
      // If horizontal swipe is more significant than vertical
      if (Math.abs(xDiff) > Math.abs(yDiff) && Math.abs(xDiff) > 120) {
        if (xDiff > 0) {
          // Swipe left, close the menu
          setIsMenuOpen(false);
        } else {
          // Swipe right, open the menu if near the right edge
          if (touchStartRef.current.x > window.innerWidth - 50) {
            setIsMenuOpen(true);
          }
        }
      }
      
      touchStartRef.current = null;
    };

    // Handle clicks outside the mobile menu
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen && 
        mobileMenuRef.current && 
        !mobileMenuRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest('.menu-trigger')
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const handleNavLinkClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <>
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
              <span className="text-xl font-bold tracking-tight text-foreground">
                <span className="text-primary">Aditya</span> Chowdhury
                <span className="inline-block ml-1 text-xl text-secondary">
                  <Sparkles size={16} className="inline" />
                </span>
              </span>
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
                  onClick={(e) => handleNavLinkClick(e, link.href)}
                >
                  {link.label}
                </a>
              ))}
              <a 
                href="#contact" 
                className="ml-4 button-primary"
                onClick={(e) => handleNavLinkClick(e, "#contact")}
              >
                Contact Me
              </a>
            </nav>
            
            {/* Mobile Menu Trigger */}
            <button 
              className="md:hidden menu-trigger p-2 text-foreground relative z-50 flex items-center justify-center"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              <div className={`mobile-menu-trigger ${isMenuOpen ? 'open' : ''}`}>
                <span></span>
              </div>
            </button>
          </div>
        </div>
      </header>
      
      {/* Overlay */}
      <div 
        className={cn(
          "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300",
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        onClick={() => setIsMenuOpen(false)}
      />
      
      {/* Mobile Side Menu */}
      <div 
        ref={mobileMenuRef}
        className={cn(
          "fixed top-0 right-0 bottom-0 z-50 w-4/5 max-w-xs bg-background/95 backdrop-blur-xl",
          "border-l border-border/20 shadow-xl transition-transform duration-300 ease-out-expo",
          "flex flex-col md:hidden",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="h-full flex flex-col overflow-y-auto">
          <div className="flex justify-end p-4">
            <button
              className="text-foreground/80 hover:text-foreground"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>
          
          <nav className="flex-1 flex flex-col items-center justify-center px-6 py-8 space-y-6">
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "w-full py-3 text-center text-lg font-medium text-foreground/80 hover:text-primary",
                  "border-b border-border/10 transition-all duration-200",
                  "hover:border-primary/50 hover:pl-2",
                  activeSection === link.href.substring(1) && "text-primary border-primary/50 pl-2"
                )}
                style={{ animationDelay: `${index * 80}ms` }}
                onClick={(e) => handleNavLinkClick(e, link.href)}
              >
                {link.label}
              </a>
            ))}
            
            <a 
              href="#contact"
              className="mt-6 button-primary w-full text-center"
              onClick={(e) => handleNavLinkClick(e, "#contact")}
            >
              Contact Me
            </a>
          </nav>
          
          <div className="p-6 text-center text-sm text-foreground/60">
            <div className="inline-flex items-center">
              <Sparkles size={14} className="mr-1 text-primary" /> 
              <span>Swipe left to close</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
