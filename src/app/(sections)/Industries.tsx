import {
  Heart,
  Home,
  Dumbbell,
  TrendingUp,
  Sparkles,
  Wrench,
  GraduationCap,
  Scale,
  Plane,
  Car
} from 'lucide-react';
import Card from '../(components)/Card';
import Section from '../(components)/Section';

/**
 * Industries section showcasing verticals we serve
 * Grid of industry cards with relevant icons
 * Builds credibility through sector expertise
 */
export default function Industries() {
  const industries = [
    {
      icon: <Heart className="w-6 h-6 text-primary-600" />,
      name: 'Dental & Healthcare',
    },
    {
      icon: <Home className="w-6 h-6 text-primary-600" />,
      name: 'Real Estate',
    },
    {
      icon: <Dumbbell className="w-6 h-6 text-primary-600" />,
      name: 'Fitness & Gyms',
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-primary-600" />,
      name: 'Marketing Agencies',
    },
    {
      icon: <Sparkles className="w-6 h-6 text-primary-600" />,
      name: 'Beauty & Aesthetics',
    },
    {
      icon: <Wrench className="w-6 h-6 text-primary-600" />,
      name: 'Home Services',
    },
    {
      icon: <GraduationCap className="w-6 h-6 text-primary-600" />,
      name: 'Education & Coaching',
    },
    {
      icon: <Scale className="w-6 h-6 text-primary-600" />,
      name: 'Legal & Finance',
    },
    {
      icon: <Plane className="w-6 h-6 text-primary-600" />,
      name: 'Hospitality & Travel',
    },
    {
      icon: <Car className="w-6 h-6 text-primary-600" />,
      name: 'Automotive Services',
    },
  ];

  return (
    <Section id="industries" background="gray" padding="lg">
      <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-bold text-primary-600 mb-4">
          Industries We've Helped Succeed
        </h2>
        <p className="text-lg text-neutral-700 max-w-2xl mx-auto leading-relaxed">
          Proven automation solutions across diverse business sectors
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
        {industries.map((industry, index) => (
          <Card
            key={index}
            className="text-center p-4 animate-fade-in-up"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="flex justify-center mb-3">
              {industry.icon}
            </div>
            <h3 className="text-sm font-medium text-neutral-700 leading-tight">
              {industry.name}
            </h3>
          </Card>
        ))}
      </div>
    </Section>
  );
}