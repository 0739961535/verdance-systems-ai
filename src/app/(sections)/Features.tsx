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

/**
 * Features section showcasing all core product offerings
 * Grid layout with icons and descriptions for each feature
 * Emphasizes comprehensive automation capabilities
 */
export default function Features() {
  const features = [
    {
      icon: <MessageSquare className="w-8 h-8 text-primary-600" />,
      title: 'Website Widget',
      description: 'Intelligent chat that captures leads and qualifies prospects in real-time conversations.',
    },
    {
      icon: <Phone className="w-8 h-8 text-primary-600" />,
      title: 'Voice Agent',
      description: 'Natural-sounding phone calls that handle inquiries and book appointments automatically.',
    },
    {
      icon: <Search className="w-8 h-8 text-primary-600" />,
      title: 'Lead Finder',
      description: 'Proactive lead generation that identifies and reaches out to your ideal customers.',
    },
    {
      icon: <Send className="w-8 h-8 text-primary-600" />,
      title: 'Post-Call Messenger',
      description: 'Smart follow-ups via SMS and email that nurture leads through your sales funnel.',
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-primary-600" />,
      title: 'GHL Dashboard',
      description: 'Complete CRM integration with lead tracking, analytics, and performance insights.',
    },
    {
      icon: <Globe className="w-8 h-8 text-primary-600" />,
      title: 'Website Integration',
      description: 'Seamless embedding into your existing site or complete website rebuild with automation.',
    },
  ];

  return (
    <Section id="features" background="gray" padding="lg">
      <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-bold text-primary-600 mb-4">
          Everything You Need to Automate Growth
        </h2>
        <p className="text-lg text-neutral-700 max-w-2xl mx-auto leading-relaxed">
          All built, managed, and optimized by Verdance Systems AI.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {features.map((feature, index) => (
          <Card
            key={index}
            className="text-center animate-fade-in-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex justify-center mb-4">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold text-primary-600 mb-3">
              {feature.title}
            </h3>
            <p className="text-neutral-700 leading-relaxed">
              {feature.description}
            </p>
          </Card>
        ))}
      </div>
    </Section>
  );
}