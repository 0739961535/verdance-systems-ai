'use client';

import Button from '../(components)/Button';
import Section from '../(components)/Section';

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

  // Open BuildMyAgent widget with debugging
  const openWidget = () => {
    console.log('Widget button clicked!');
    if (typeof window !== 'undefined') {
      console.log('Window available, checking for VERDANCE_WIDGET...');
      if ((window as any).VERDANCE_WIDGET) {
        console.log('VERDANCE_WIDGET found:', (window as any).VERDANCE_WIDGET);
        (window as any).VERDANCE_WIDGET.open();
      } else {
        console.log('VERDANCE_WIDGET not found, showing alert...');
        alert('Widget is initializing... Please wait a moment and try again, or contact us at +27 73 996 1535');
      }
    }
  };

  return (
    <Section
      id="hero"
      background="gradient"
      padding="lg"
      className="pt-20 lg:pt-28 relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 mesh-gradient opacity-30"></div>
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary-300 rounded-full opacity-20 animate-float"></div>
      <div className="absolute top-40 right-20 w-24 h-24 bg-primary-400 rounded-full opacity-30 animate-bounce-subtle"></div>
      <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-primary-500 rounded-full opacity-25 animate-float" style={{ animationDelay: '1s' }}></div>

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
            🚀 BOOK FREE DEMO
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={openWidget}
            className="w-full sm:w-auto text-lg px-12 py-5 hover-glow"
          >
            ✨ TRY AI DEMO
          </Button>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8 animate-fade-in">
          <div className="glass-effect rounded-2xl p-6 text-center">
            <div className="text-primary-500 text-2xl mb-2">⚡</div>
            <p className="text-sm font-medium text-neutral-700">Setup in 24 Hours</p>
          </div>
          <div className="glass-effect rounded-2xl p-6 text-center">
            <div className="text-primary-500 text-2xl mb-2">🎯</div>
            <p className="text-sm font-medium text-neutral-700">ROI Guaranteed</p>
          </div>
          <div className="glass-effect rounded-2xl p-6 text-center">
            <div className="text-primary-500 text-2xl mb-2">🤖</div>
            <p className="text-sm font-medium text-neutral-700">AI-Powered Automation</p>
          </div>
        </div>

        {/* Small Note */}
        <p className="text-sm text-neutral-500 max-w-md mx-auto animate-fade-in italic">
          💬 Try the chat — it captures your details and offers times automatically.
        </p>
      </div>
    </Section>
  );
}