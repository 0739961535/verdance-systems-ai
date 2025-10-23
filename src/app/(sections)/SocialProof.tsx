import { Clock, TrendingUp, Calendar, Zap, Target, Bot } from 'lucide-react';
import Card from '../(components)/Card';
import Section from '../(components)/Section';

/**
 * Social proof section with value proposition cards
 * Displays key benefits in an easy-to-scan format
 * Uses icons and metrics to build trust and credibility
 */
export default function SocialProof() {
  const valueCards = [
    {
      icon: <Clock className="w-10 h-10 text-primary-500 group-hover:text-white transition-colors duration-300" />,
      title: '24/7 Lead Capture',
      description: 'Never miss another opportunity. Our AI responds instantly to every inquiry, even when you sleep.',
      gradient: 'from-primary-500 to-primary-600',
      emoji: '💼',
      metric: '24/7'
    },
    {
      icon: <TrendingUp className="w-10 h-10 text-turquoise-600 group-hover:text-white transition-colors duration-300" />,
      title: 'Intelligent Lead Qualification',
      description: 'Smart AI conversations that understand your business and qualify leads with precision and natural conversation.',
      gradient: 'from-turquoise-500 to-primary-500',
      emoji: '🎯',
      metric: 'Smart',
      metricSize: 'text-xl'
    },
    {
      icon: <Calendar className="w-10 h-10 text-turquoise-500 group-hover:text-white transition-colors duration-300" />,
      title: 'Live in Under 2 Weeks',
      description: 'From strategy session to fully automated system — we handle the entire setup and optimization.',
      gradient: 'from-primary-400 to-turquoise-500',
      emoji: '⚙️',
      metric: '<14 Days'
    },
  ];

  return (
    <Section id="social-proof" background="gray" padding="lg" className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary-200 rounded-full opacity-20 animate-float"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-turquoise-200 rounded-full opacity-30 animate-bounce-subtle"></div>
      </div>

      <div className="relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-white/90 backdrop-blur-sm border border-primary-200 rounded-full text-primary-600 font-medium mb-8 animate-scale-in shadow-lg">
            <div className="w-2 h-2 bg-primary-500 rounded-full mr-3 animate-pulse"></div>
            Why Businesses Choose Us
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gradient mb-6 animate-fade-in-up">
            Proven Results That
            <br />
            <span className="text-gradient-animated">Drive Growth</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {valueCards.map((card, index) => (
            <div
              key={index}
              className="card-enhanced text-center hover:scale-105 transition-all duration-500 cursor-pointer animate-fade-in-up group"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Icon container with gradient hover */}
              <div className="relative mb-6">
                <div className={`w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br ${card.gradient} opacity-10 group-hover:opacity-20 transition-all duration-500 absolute inset-0`}></div>
                <div className="relative z-10 w-24 h-24 mx-auto flex items-center justify-center rounded-3xl border border-primary-200 group-hover:border-primary-300 transition-all duration-300 bg-white/50 group-hover:bg-white/80">
                  {card.icon}
                </div>
              </div>

              <h3 className="text-2xl font-bold text-primary-600 mb-4 group-hover:text-primary-700 transition-colors duration-300">
                {card.title}
              </h3>
              <p className="text-neutral-600 leading-relaxed group-hover:text-neutral-700 transition-colors duration-300 text-lg">
                {card.description}
              </p>

              {/* Shimmer effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -skew-x-12 -translate-x-full group-hover:translate-x-full animate-shimmer"></div>
            </div>
          ))}
        </div>

      </div>
    </Section>
  );
}