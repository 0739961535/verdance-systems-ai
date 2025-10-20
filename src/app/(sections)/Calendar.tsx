'use client';

import { useEffect, useState } from 'react';

export default function Calendar() {
  const [currentTimezone, setCurrentTimezone] = useState('');
  const [calendarError, setCalendarError] = useState(false);

  useEffect(() => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const readableTimezone = timezone.replace('_', ' ');
    setCurrentTimezone(readableTimezone);

    // Load the form embed script
    const script = document.createElement('script');
    script.src = 'https://link.msgsndr.com/js/form_embed.js';
    script.type = 'text/javascript';
    script.async = true;

    if (!document.querySelector('script[src="https://link.msgsndr.com/js/form_embed.js"]')) {
      document.body.appendChild(script);
    }

    return () => {
      const existingScript = document.querySelector('script[src="https://link.msgsndr.com/js/form_embed.js"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  const handleCalendarError = () => {
    setCalendarError(true);
    console.error('Calendar failed to load');
  };

  return (
    <section id="book" className="py-16 lg:py-24 bg-gradient-to-br from-neutral-50 to-primary-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 right-10 w-32 h-32 bg-primary-200 rounded-full opacity-30 animate-float"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-turquoise-200 rounded-full opacity-40 animate-bounce-subtle"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-6 py-3 bg-white/90 backdrop-blur-sm border border-primary-200 rounded-full text-primary-600 font-medium mb-8 animate-scale-in shadow-lg">
            <div className="w-2 h-2 bg-primary-500 rounded-full mr-3 animate-pulse"></div>
            Ready to Transform Your Business?
          </div>

          <h2 className="text-4xl lg:text-6xl font-bold text-gradient mb-6 animate-fade-in-up">
            Book Your Free
            <br />
            <span className="text-gradient-animated">AI Demo Call</span>
          </h2>
          <p className="text-xl text-neutral-600 mb-4 animate-fade-in-up max-w-3xl mx-auto leading-relaxed">
            <span className="text-primary-600 font-semibold">30-minute session</span> hosted on Google Meet.
            See our AI systems in action and discover how they can automate your growth.
          </p>
          {currentTimezone && (
            <p className="text-sm text-neutral-500 animate-fade-in">
              📍 Times shown in {currentTimezone}
            </p>
          )}
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="glass-effect rounded-3xl border border-primary-200 shadow-2xl shadow-primary-500/10 overflow-hidden animate-scale-in p-2">
            <iframe
              src="https://api.leadconnectorhq.com/widget/booking/yLGPT8nNF78G32doGmoW"
              style={{ width: '100%', border: 'none', overflow: 'hidden', minHeight: '600px' }}
              scrolling="no"
              id="yLGPT8nNF78G32doGmoW_1760630215402"
              title="Book a Demo Call"
              className="w-full h-[600px] rounded-2xl"
              onError={handleCalendarError}
              allow="fullscreen"
            />

            {calendarError && (
              <div className="p-12 text-center bg-gradient-to-br from-error-50 to-neutral-50 rounded-2xl m-2">
                <div className="text-6xl mb-6 animate-bounce-subtle">⚠️</div>
                <h3 className="text-2xl font-bold text-neutral-700 mb-4">
                  Calendar Temporarily Unavailable
                </h3>
                <p className="text-lg text-neutral-600 mb-8 max-w-md mx-auto leading-relaxed">
                  No worries! Contact us directly to schedule your demo:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                  <a
                    href="tel:+27739961535"
                    className="glass-effect p-6 rounded-2xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                  >
                    <div className="text-2xl mb-2">📞</div>
                    <div className="text-primary-600 hover:text-primary-700 font-semibold">
                      +27 73 996 1535
                    </div>
                  </a>
                  <a
                    href="mailto:verdancesystems@gmail.com"
                    className="glass-effect p-6 rounded-2xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                  >
                    <div className="text-2xl mb-2">📧</div>
                    <div className="text-primary-600 hover:text-primary-700 font-semibold">
                      Email Us
                    </div>
                  </a>
                  <a
                    href="https://wa.me/27739961535"
                    className="glass-effect p-6 rounded-2xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="text-2xl mb-2">💬</div>
                    <div className="text-primary-600 hover:text-primary-700 font-semibold">
                      WhatsApp
                    </div>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Trust indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12 animate-fade-in">
          <div className="text-center">
            <div className="text-3xl mb-2">🎯</div>
            <p className="text-sm font-medium text-neutral-600">No High-Pressure Sales</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">🚀</div>
            <p className="text-sm font-medium text-neutral-600">See Live AI Demo</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">💡</div>
            <p className="text-sm font-medium text-neutral-600">Custom Strategy Session</p>
          </div>
        </div>
      </div>
    </section>
  );
}