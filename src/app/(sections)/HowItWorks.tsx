import { Search, Map, Wrench, Rocket } from 'lucide-react';
import Card from '../(components)/Card';
import Section from '../(components)/Section';

/**
 * How It Works section explaining the 4-step process
 * Sequential numbered cards with icons and detailed descriptions
 * Builds confidence in the implementation process
 */
export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      icon: <Search className="w-8 h-8 text-primary-600" />,
      title: 'Business Analysis',
      description: 'We start by analyzing your business — review workflows, website, lead gen; identify drop-offs; design the automation plan.',
    },
    {
      number: '02',
      icon: <Map className="w-8 h-8 text-primary-600" />,
      title: 'Blueprint Creation',
      description: 'We map out your automation blueprint — exact automations, website improvements, AI agents; custom growth plan.',
    },
    {
      number: '03',
      icon: <Wrench className="w-8 h-8 text-primary-600" />,
      title: 'Custom Development',
      description: 'We build your custom AI infrastructure — website, CRM, chat/voice agents, tool integrations (or embed AI into your existing site).',
    },
    {
      number: '04',
      icon: <Rocket className="w-8 h-8 text-primary-600" />,
      title: 'Launch & Optimize',
      description: 'Your systems go live and start learning — 24/7 capture and follow-ups, real-time tracking, continuous optimization, and support.',
    },
  ];

  return (
    <Section id="how-it-works" background="white" padding="lg">
      <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-bold text-primary-600 mb-4">
          How It Works
        </h2>
        <p className="text-lg text-neutral-700 max-w-2xl mx-auto leading-relaxed">
          From analysis to automation in four strategic steps
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {steps.map((step, index) => (
          <Card
            key={index}
            className="text-center relative animate-fade-in-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Step Number */}
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
              {step.number}
            </div>

            <div className="flex justify-center mb-4">
              {step.icon}
            </div>
            <h3 className="text-lg font-semibold text-primary-600 mb-3">
              {step.title}
            </h3>
            <p className="text-neutral-700 text-sm leading-relaxed">
              {step.description}
            </p>
          </Card>
        ))}
      </div>
    </Section>
  );
}