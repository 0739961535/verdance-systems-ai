'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Container from './Container';
import Button from './Button';

/**
 * Navigation component with sticky header and mobile menu
 * Includes backdrop blur effect after scrolling
 * All navigation links scroll to sections or trigger widget
 */
export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for backdrop blur
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to section handler
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  // Open BuildMyAgent widget
  const openWidget = () => {
    if (typeof window !== 'undefined' && (window as any).VERDANCE_WIDGET) {
      (window as any).VERDANCE_WIDGET.open();
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { label: 'How It Works', href: 'how-it-works' },
    { label: 'Features', href: 'features' },
    { label: 'Industries', href: 'industries' },
    { label: 'Contact', href: 'book' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-white/90 nav-blur shadow-soft'
          : 'bg-transparent'
      }`}
    >
      <Container>
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div
            onClick={() => scrollToSection('hero')}
            className="cursor-pointer"
          >
            <span className="text-xl lg:text-2xl font-bold text-primary-600">
              Verdance Systems AI
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className="text-neutral-700 hover:text-primary-600 font-medium transition-colors duration-200"
              >
                {item.label}
              </button>
            ))}
            <Button
              variant="primary"
              size="md"
              onClick={() => scrollToSection('book')}
            >
              Book Free Demo
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-neutral-700 hover:text-primary-600 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 nav-blur border-t border-border shadow-medium">
            <div className="py-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left px-4 py-3 text-neutral-700 hover:text-primary-600 hover:bg-primary-50 font-medium transition-colors duration-200"
                >
                  {item.label}
                </button>
              ))}
              <div className="px-4 pt-2">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => scrollToSection('book')}
                  className="w-full"
                >
                  Book Free Demo
                </Button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </nav>
  );
}