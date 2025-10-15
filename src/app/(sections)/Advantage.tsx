import { Zap, MessageCircle, Phone } from 'lucide-react';
import Section from '../(components)/Section';

/**
 * The Verdance Advantage section highlighting key differentiators
 * Features three main benefits with icons and detailed descriptions
 * Emphasizes automation and efficiency gains
 */
export default function Advantage() {
  const advantages = [
    {
      icon: <Zap className="w-6 h-6 text-primary-600 flex-shrink-0" />,
      title: 'Instant Lead Response',
      description: 'Human-sounding replies on web, voice, or SMS.',
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-primary-600 flex-shrink-0" />,
      title: 'Hands-Free Follow-Ups',
      description: 'Nurture and reminders that raise conversion.',
    },
    {
      icon: <Phone className="w-6 h-6 text-primary-600 flex-shrink-0" />,
      title: 'Booked Calls, Not Busywork',
      description: 'Agents qualify and schedule directly to your CRM.',
    },
  ];

  return (
    <Section id="advantage" background="white" padding="lg">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-primary-600 mb-4">
          The Verdance Advantage
        </h2>
        <p className="text-lg lg:text-xl text-neutral-700 mb-12 leading-relaxed">
          AI agents that handle the busywork—so your team can focus on growth.
        </p>

        <div className="space-y-8">
          {advantages.map((advantage, index) => (
            <div
              key={index}
              className="flex items-start gap-4 text-left p-6 rounded-2xl border border-border hover:shadow-medium transition-all duration-200 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mt-1">
                {advantage.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary-600 mb-2">
                  {advantage.title}
                </h3>
                <p className="text-neutral-700 leading-relaxed">
                  {advantage.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}