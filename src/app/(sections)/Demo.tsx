'use client';

import Button from '../(components)/Button';
import Section from '../(components)/Section';

/**
 * Demo section with dual CTAs for widget and calendar
 * Emphasizes the value of automation and lead conversion
 * Clear call-to-action hierarchy
 */
export default function Demo() {
  // Scroll to calendar section
  const scrollToCalendar = () => {
    const element = document.getElementById('book');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Open BuildMyAgent widget with debugging
  const openWidget = () => {
    console.log('Demo widget button clicked!');
    if (typeof window !== 'undefined') {
      console.log('Window available, checking for VERDANCE_WIDGET...');
      if ((window as any).VERDANCE_WIDGET) {
        console.log('VERDANCE_WIDGET found:', (window as any).VERDANCE_WIDGET);
        (window as any).VERDANCE_WIDGET.open();
      } else {
        console.log('VERDANCE_WIDGET not found, showing alert...');
        alert('AI Demo is loading... Please wait a moment and try again, or contact us at +27 73 996 1535');
      }
    }
  };

  return (
    <Section id="demo" background="white" padding="lg" className="relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-primary-200 to-turquoise-200 rounded-full opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-br from-turquoise-200 to-primary-300 rounded-full opacity-30 animate-bounce-subtle"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-primary-100 to-turquoise-100 rounded-full opacity-10 animate-pulse"></div>
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-100 to-turquoise-100 rounded-full text-primary-700 font-medium mb-8 animate-scale-in shadow-lg">
          <div className="w-2 h-2 bg-primary-500 rounded-full mr-3 animate-pulse"></div>
          Experience the Future of Business
        </div>

        <h2 className="text-4xl lg:text-6xl font-bold mb-8 animate-fade-in-up leading-tight">
          <span className="text-neutral-700">Automate What</span>
          <br />
          <span className="text-gradient-animated">Slows You Down</span>
        </h2>

        <p className="text-xl lg:text-2xl text-neutral-700 mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in-up font-medium">
          Free your team from repetitive tasks. Our <span className="text-primary-600 font-bold">AI agents</span> handle lead capture,
          qualification, and follow-ups — so you can focus on <span className="text-primary-600 font-bold">closing deals</span> and
          scaling your business instead of chasing leads.
        </p>

        {/* Interactive Demo Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          {/* Try AI Demo Card */}
          <div className="glass-effect rounded-3xl p-8 hover:shadow-2xl hover:shadow-primary-500/20 transition-all duration-500 hover:-translate-y-2 group cursor-pointer animate-slide-in-left"
               onClick={openWidget}>
            <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">🤖</div>
            <h3 className="text-2xl font-bold text-primary-600 mb-4 group-hover:text-primary-700">
              Try Our AI Assistant
            </h3>
            <p className="text-neutral-600 mb-6 leading-relaxed">
              Experience our intelligent chat system that captures leads and qualifies prospects in real-time conversations.
            </p>
            <Button
              variant="primary"
              size="lg"
              onClick={openWidget}
              className="w-full animate-pulse-glow"
            >
              ✨ Chat With AI Now
            </Button>
          </div>

          {/* Book Demo Card */}
          <div className="glass-effect rounded-3xl p-8 hover:shadow-2xl hover:shadow-primary-500/20 transition-all duration-500 hover:-translate-y-2 group cursor-pointer animate-slide-in-right"
               onClick={scrollToCalendar}>
            <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">🚀</div>
            <h3 className="text-2xl font-bold text-primary-600 mb-4 group-hover:text-primary-700">
              Book Strategy Call
            </h3>
            <p className="text-neutral-600 mb-6 leading-relaxed">
              Get a custom AI automation strategy designed specifically for your business and industry.
            </p>
            <Button
              variant="secondary"
              size="lg"
              onClick={scrollToCalendar}
              className="w-full"
            >
              📅 Schedule Free Call
            </Button>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto animate-fade-in">
          <div className="text-center p-6 rounded-2xl hover:bg-primary-50 transition-colors duration-300">
            <div className="text-4xl mb-3">⚡</div>
            <h4 className="font-semibold text-neutral-700 mb-2">Instant Setup</h4>
            <p className="text-sm text-neutral-600">Live in 24 hours or less</p>
          </div>
          <div className="text-center p-6 rounded-2xl hover:bg-primary-50 transition-colors duration-300">
            <div className="text-4xl mb-3">📈</div>
            <h4 className="font-semibold text-neutral-700 mb-2">Guaranteed ROI</h4>
            <p className="text-sm text-neutral-600">More leads, less work</p>
          </div>
          <div className="text-center p-6 rounded-2xl hover:bg-primary-50 transition-colors duration-300">
            <div className="text-4xl mb-3">🎯</div>
            <h4 className="font-semibold text-neutral-700 mb-2">Zero Risk</h4>
            <p className="text-sm text-neutral-600">Try before you commit</p>
          </div>
        </div>
      </div>
    </Section>
  );
}