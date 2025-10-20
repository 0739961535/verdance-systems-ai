'use client';

import {
  MessageSquare,
  Phone,
  Search,
  Send,
  BarChart3,
  Globe
} from 'lucide-react';
import Card from '../(components)/Card';
import Section from '../(components)/Section';
import Button from '../(components)/Button';

/**
 * Features section showcasing all core product offerings
 * Grid layout with icons and descriptions for each feature
 * Emphasizes comprehensive automation capabilities
 */
export default function Features() {
  const features = [
    {
      icon: <MessageSquare className="w-10 h-10 text-primary-600 group-hover:text-white transition-colors duration-300" />,
      title: 'Website Widget',
      description: 'Intelligent chat that captures leads and qualifies prospects in real-time conversations.',
      gradient: 'from-primary-500 to-primary-600',
      emoji: '💬'
    },
    {
      icon: <Phone className="w-10 h-10 text-primary-600 group-hover:text-white transition-colors duration-300" />,
      title: 'Voice Agent',
      description: 'Natural-sounding phone calls that handle inquiries and book appointments automatically.',
      gradient: 'from-primary-400 to-primary-500',
      emoji: '📞'
    },
    {
      icon: <Search className="w-10 h-10 text-primary-600 group-hover:text-white transition-colors duration-300" />,
      title: 'Lead Finder',
      description: 'Proactive lead generation that identifies and reaches out to your ideal customers.',
      gradient: 'from-turquoise-500 to-turquoise-600',
      emoji: '🔍'
    },
    {
      icon: <Send className="w-10 h-10 text-primary-600 group-hover:text-white transition-colors duration-300" />,
      title: 'Post-Call Messenger',
      description: 'Smart follow-ups via SMS and email that nurture leads through your sales funnel.',
      gradient: 'from-primary-600 to-primary-700',
      emoji: '📧'
    },
    {
      icon: <BarChart3 className="w-10 h-10 text-primary-600 group-hover:text-white transition-colors duration-300" />,
      title: 'GHL Dashboard',
      description: 'Complete CRM integration with lead tracking, analytics, and performance insights.',
      gradient: 'from-turquoise-400 to-primary-500',
      emoji: '📊'
    },
    {
      icon: <Globe className="w-10 h-10 text-primary-600 group-hover:text-white transition-colors duration-300" />,
      title: 'Website Integration',
      description: 'Seamless embedding into your existing site or complete website rebuild with automation.',
      gradient: 'from-primary-500 to-turquoise-500',
      emoji: '🌐'
    },
  ];

  return (
    <Section id="features" background="gray" padding="lg" className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary-100 rounded-full opacity-30 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-turquoise-100 rounded-full opacity-40 animate-bounce-subtle"></div>
      </div>

      <div className="relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-primary-100 rounded-full text-primary-700 font-medium mb-6 animate-scale-in">
            ✨ Complete AI Suite
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold text-gradient mb-6 animate-fade-in-up">
            Everything You Need to
            <br />
            <span className="text-gradient-animated">Automate Growth</span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed animate-fade-in-up">
            All built, managed, and optimized by <span className="text-primary-600 font-semibold">Verdance Systems AI</span>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card-enhanced text-center hover:scale-105 transition-all duration-500 cursor-pointer animate-fade-in-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Emoji background */}
              <div className="absolute top-6 right-6 text-4xl opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                {feature.emoji}
              </div>

              {/* Icon container with gradient hover */}
              <div className="relative mb-6">
                <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-10 group-hover:opacity-100 transition-all duration-500 absolute inset-0`}></div>
                <div className="relative z-10 w-20 h-20 mx-auto flex items-center justify-center rounded-2xl border border-primary-200 group-hover:border-transparent transition-all duration-300">
                  {feature.icon}
                </div>
              </div>

              <h3 className="text-2xl font-bold text-primary-600 mb-4 group-hover:text-white transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-neutral-600 leading-relaxed group-hover:text-neutral-100 transition-colors duration-300">
                {feature.description}
              </p>

              {/* Shimmer effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -skew-x-12 -translate-x-full group-hover:translate-x-full animate-shimmer"></div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16 animate-fade-in-up">
          <p className="text-lg text-neutral-600 mb-6">
            Ready to see these features in action?
          </p>
          <Button
            variant="primary"
            size="lg"
            onClick={() => {
              const element = document.getElementById('book');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="animate-pulse-glow"
          >
            🚀 Book Your Demo Now
          </Button>
        </div>
      </div>
    </Section>
  );
}