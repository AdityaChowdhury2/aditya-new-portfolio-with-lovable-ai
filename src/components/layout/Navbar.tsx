import React, { useState, useEffect } from "react";
import { useScrollProgress } from "@/utils/scrollUtils";
import { cn } from "@/lib/utils";
import { Zap, Sparkles, X } from "lucide-react";

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
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

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md",
        isScrolled
          ? "border-b border-border/20 bg-background/80"
          : "bg-transparent"
      )}
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="absolute bottom-0 left-0 right-0 h-0.5 overflow-hidden">
          <div
            className="h-full bg-primary"
            style={{ width: `${scrollProgress}%`, transition: "width 0.1s" }}
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
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector(link.href)
                    ?.scrollIntoView({ behavior: "smooth" });
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
                document
                  .querySelector("#contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Contact Me
            </a>
          </nav>

          {/* Mobile Menu Button - Custom Design */}
          <button
            className={`md:hidden p-2 text-foreground/80 hover:text-foreground relative z-50 flex items-center justify-center `}
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X size={24} className="text-foreground animate-fade-in" />
            ) : (
              <div className={`menu-icon ${isMenuOpen ? "menu-open" : ""}`}>
                {/* <span className="line-1"></span>
                <span className="line-2"></span>
                <span className="line-3"></span> */}
                <Zap
                  size={20}
                  className="absolute text-primary  transition-opacity duration-300"
                />
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation - Animated Overlay with Glass Effect */}

      <nav
        className={cn(
          "fixed inset-0 z-50 bg-primary flex w-2/3 flex-col h-[110vh] justify-center items-center transform duration-1000 text-foreground space-y-4 ",
          isMenuOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        )}
      >
        {navLinks.map((link, index) => (
          <a
            key={link.href}
            href={link.href}
            className={cn(
              "font-bold text-foreground w-full text-center transition-all text-white",
              "transform hover:scale-110 hover:text-primary",
              isMenuOpen ? "animate-fade-in-up" : "opacity-0"
            )}
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector(link.href)
                ?.scrollIntoView({ behavior: "smooth" });
              closeMenu();
            }}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div
        className={cn(
          "fixed inset-0 bg-black z-1 bg-opacity-50 transition-opacity duration-300 ease-in-out h-[110vh]",
          isMenuOpen
            ? "opacity-100 visible h-screen transform"
            : "opacity-0 invisible"
        )}
      ></div>
    </header>
  );
};

export default Navbar;
