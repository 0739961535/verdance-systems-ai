'use client';

import Button from '../(components)/Button';
import Section from '../(components)/Section';
import { Zap, TrendingUp, ShieldCheck, CalendarDays } from 'lucide-react';

/**
 * Contact Us section with WhatsApp integration
 * Emphasizes direct communication and custom quotes
 * Clear call-to-action for business inquiries
 */
export default function ContactUs() {
  // WhatsApp business number
  const whatsappNumber = '27739961535'; // Format: country code + number (no + or spaces)
  const whatsappMessage = encodeURIComponent('Hi! I would like to get a custom quote for AI automation solutions.');

  // Open WhatsApp chat
  const openWhatsApp = () => {
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  // Scroll to calendar section
  const scrollToCalendar = () => {
    const element = document.getElementById('book');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Section id="contact" background="white" padding="lg" className="relative overflow-hidden">
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
          Get in Touch
        </div>

        <h2 className="text-4xl lg:text-6xl font-bold mb-8 animate-fade-in-up leading-tight">
          <span className="text-neutral-700">Ready to</span>
          <br />
          <span className="text-gradient-animated">Transform Your Business?</span>
        </h2>

        <p className="text-xl lg:text-2xl text-neutral-700 mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in-up font-medium">
          Let's discuss how our <span className="text-primary-600 font-bold">AI automation solutions</span> can help your business
          capture more leads, save time, and <span className="text-primary-600 font-bold">scale efficiently</span>.
          Get a custom quote tailored to your needs.
        </p>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          {/* WhatsApp Card */}
          <div className="glass-effect rounded-3xl p-8 hover:shadow-2xl hover:shadow-success-500/20 transition-all duration-500 hover:-translate-y-2 group cursor-pointer animate-slide-in-left"
               onClick={openWhatsApp}>
            <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">💬</div>
            <h3 className="text-2xl font-bold text-primary-600 mb-4 group-hover:text-primary-700">
              Get Custom Quote
            </h3>
            <p className="text-neutral-600 mb-6 leading-relaxed">
              Chat with us on WhatsApp for an instant response. We'll create a personalized solution for your business.
            </p>
            <Button
              variant="primary"
              size="lg"
              onClick={openWhatsApp}
              className="w-full animate-pulse-glow bg-success-600 hover:bg-success-700 border-success-600"
            >
              💬 WhatsApp Us Now
            </Button>
          </div>

          {/* Book Strategy Call Card */}
          <div className="glass-effect rounded-3xl p-8 hover:shadow-2xl hover:shadow-primary-500/20 transition-all duration-500 hover:-translate-y-2 group cursor-pointer animate-slide-in-right"
               onClick={scrollToCalendar}>
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <CalendarDays className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-primary-600 mb-4 group-hover:text-primary-700">
              Book Strategy Call
            </h3>
            <p className="text-neutral-600 mb-6 leading-relaxed">
              Schedule a free consultation to discuss your goals and get a custom AI automation strategy.
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
          <div className="text-center p-6 rounded-2xl hover:bg-primary-50 transition-colors duration-300 group">
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-semibold text-neutral-700 mb-2">Instant Setup</h4>
            <p className="text-sm text-neutral-600">Live in 24 hours or less</p>
          </div>
          <div className="text-center p-6 rounded-2xl hover:bg-primary-50 transition-colors duration-300 group">
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-turquoise-500 to-primary-500 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-semibold text-neutral-700 mb-2">Guaranteed ROI</h4>
            <p className="text-sm text-neutral-600">More leads, less work</p>
          </div>
          <div className="text-center p-6 rounded-2xl hover:bg-primary-50 transition-colors duration-300 group">
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary-400 to-turquoise-500 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-semibold text-neutral-700 mb-2">Zero Risk</h4>
            <p className="text-sm text-neutral-600">Try before you commit</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
