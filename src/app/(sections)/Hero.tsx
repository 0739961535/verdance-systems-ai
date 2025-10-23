'use client';

import Button from '../(components)/Button';
import Section from '../(components)/Section';
import { Sparkles, Brain, Network, Video, MessageCircle } from 'lucide-react';

/**
 * Hero section with main value proposition and dual CTAs
 * Features gradient background and responsive typography
 * Includes demo widget launcher and calendar scroll functionality
 */
export default function Hero() {
  // Scroll to calendar section
  const scrollToCalendar = () => {
    const element = document.getElementById('book');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scroll to contact section
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Section
      id="hero"
      background="white"
      padding="lg"
      className="pt-20 lg:pt-28 modern-geometric-bg"
    >
      {/* Modern Floating Elements */}
      <div className="absolute top-20 left-10 w-8 h-8 bg-gradient-to-br from-slate-800 to-slate-600 rounded-full opacity-20 animate-float shadow-lg"></div>
      <div className="absolute top-40 right-20 w-6 h-6 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full opacity-30 animate-bounce-subtle shadow-md"></div>
      <div className="absolute bottom-20 left-1/4 w-4 h-4 bg-gradient-to-br from-slate-700 to-slate-500 rounded-full opacity-25 animate-float shadow-sm" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/3 left-3/4 w-5 h-5 bg-gradient-to-br from-primary-400 to-turquoise-400 rounded-full opacity-20 animate-bounce-subtle shadow-md" style={{ animationDelay: '2s' }}></div>

      <div className="text-center max-w-5xl mx-auto relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center px-6 py-3 bg-white/90 backdrop-blur-sm border border-primary-200 rounded-full text-primary-600 font-medium mb-8 animate-scale-in shadow-lg">
          <div className="w-2 h-2 bg-primary-500 rounded-full mr-3 animate-pulse"></div>
          Next-Level AI Automation
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl lg:text-7xl font-bold mb-8 animate-fade-in-up leading-tight">
          <span className="text-gradient-animated">Automate Growth</span>
          <br />
          <span className="text-neutral-700 font-extrabold">With AI</span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl lg:text-2xl text-neutral-700 mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in-up font-medium">
          We build <span className="text-primary-600 font-bold">intelligent systems</span> and
          <span className="text-primary-600 font-bold"> stunning websites</span> that turn leads into customers,
          reduce manual work, and deliver predictable revenue growth.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12 animate-fade-in-up">
          <Button
            variant="primary"
            size="lg"
            onClick={scrollToCalendar}
            className="w-full sm:w-auto text-lg px-12 py-5 animate-pulse-glow"
          >
            <span className="flex items-center gap-2">
              <Video className="w-5 h-5 text-white" />
              BOOK FREE DEMO
            </span>
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={scrollToContact}
            className="w-full sm:w-auto text-lg px-12 py-5 hover-glow"
          >
            <span className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-turquoise-500" />
              CONTACT US
            </span>
          </Button>
        </div>

        {/* Feature Highlights - Simplified */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8 animate-fade-in">
          <div className="glass-effect rounded-2xl p-6 text-center hover:shadow-xl hover:shadow-primary-500/20 transition-all duration-300 group">
            <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <p className="text-sm font-semibold text-neutral-700 group-hover:text-primary-600 transition-colors">Precision-Built Systems</p>
          </div>
          <div className="glass-effect rounded-2xl p-6 text-center hover:shadow-xl hover:shadow-turquoise-500/20 transition-all duration-300 group">
            <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-turquoise-500 to-primary-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <p className="text-sm font-semibold text-neutral-700 group-hover:text-turquoise-600 transition-colors">Adaptive Intelligence</p>
          </div>
          <div className="glass-effect rounded-2xl p-6 text-center hover:shadow-xl hover:shadow-primary-500/20 transition-all duration-300 group">
            <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary-400 to-turquoise-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Network className="w-7 h-7 text-white" />
            </div>
            <p className="text-sm font-semibold text-neutral-700 group-hover:text-primary-600 transition-colors">Seamless Integration</p>
          </div>
        </div>

        {/* Small Note */}
        <p className="text-sm text-neutral-500 max-w-md mx-auto animate-fade-in italic">
          💬 Contact us to discuss your custom automation solution
        </p>
      </div>
    </Section>
  );
}