import { Clock, TrendingUp, Calendar } from 'lucide-react';
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
      icon: <Clock className="w-8 h-8 text-primary-600" />,
      title: '24/7 Lead Capture',
      description: 'Never miss another opportunity. Our AI responds instantly to every inquiry, even when you sleep.',
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-primary-600" />,
      title: '3–5x More Booked Calls',
      description: 'Convert more leads with intelligent follow-ups and qualification that works around the clock.',
    },
    {
      icon: <Calendar className="w-8 h-8 text-primary-600" />,
      title: 'Live in Under 2 Weeks',
      description: 'From strategy session to fully automated system — we handle the entire setup and optimization.',
    },
  ];

  return (
    <Section id="social-proof" background="gray" padding="lg">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {valueCards.map((card, index) => (
          <Card
            key={index}
            className="text-center animate-fade-in-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex justify-center mb-4">
              {card.icon}
            </div>
            <h3 className="text-xl font-semibold text-primary-600 mb-3">
              {card.title}
            </h3>
            <p className="text-neutral-700 leading-relaxed">
              {card.description}
            </p>
          </Card>
        ))}
      </div>
    </Section>
  );
}