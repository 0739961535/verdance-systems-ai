'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Video } from 'lucide-react';
import Image from 'next/image';
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 nav-blur shadow-2xl shadow-primary-500/10 border-b border-primary-100'
          : 'bg-transparent'
      }`}
    >
      <Container>
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div
            onClick={() => scrollToSection('hero')}
            className="cursor-pointer group flex items-center space-x-3"
          >
            <div className="relative w-10 h-10 lg:w-12 lg:h-12 group-hover:scale-110 transition-transform duration-300">
              <Image
                src="/LOGOFinal1.png"
                alt="Verdance Systems AI Logo"
                fill
                className="object-contain hover-glow"
                priority
              />
            </div>
            <span className="text-xl lg:text-2xl font-bold text-gradient-animated group-hover:scale-105 transition-transform duration-300">
              Verdance Systems AI
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className="relative text-neutral-700 hover:text-primary-600 font-medium transition-all duration-300 hover:scale-105 group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-turquoise-500 group-hover:w-full transition-all duration-300"></span>
              </button>
            ))}
            <Button
              variant="primary"
              size="md"
              onClick={() => scrollToSection('book')}
              className="hover:scale-105 transition-transform duration-300 glow-effect"
            >
              <span className="flex items-center gap-2">
                <Video className="w-4 h-4" />
                Book Free Demo
              </span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-3 text-neutral-700 hover:text-primary-600 transition-all duration-300 hover:scale-110 hover:bg-primary-50 rounded-xl"
            aria-label="Toggle menu"
          >
            <div className={`transform transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 nav-blur border-t border-primary-200 shadow-2xl shadow-primary-500/20 animate-fade-in-up">
            <div className="py-6 space-y-2">
              {navItems.map((item, index) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left px-6 py-4 text-neutral-700 hover:text-primary-600 hover:bg-gradient-to-r hover:from-primary-50 hover:to-turquoise-50 font-medium transition-all duration-300 hover:scale-105 hover:translate-x-2 group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="group-hover:translate-x-2 transition-transform duration-300 inline-block">
                    {item.label}
                  </span>
                </button>
              ))}
              <div className="px-6 pt-4">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => scrollToSection('book')}
                  className="w-full animate-pulse-glow"
                >
                  <span className="flex items-center justify-center gap-2">
                    <Video className="w-4 h-4" />
                    Book Free Demo
                  </span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </nav>
  );
}