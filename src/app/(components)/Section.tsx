import { ReactNode } from 'react';
import Container from './Container';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  background?: 'white' | 'gray' | 'gradient' | 'enhanced-gradient';
  padding?: 'sm' | 'md' | 'lg';
  containerSize?: 'sm' | 'md' | 'lg' | 'xl';
}

/**
 * Section component for consistent spacing and background options
 * Wraps content in a Container component for proper width constraints
 */
export default function Section({
  children,
  className = '',
  id,
  background = 'white',
  padding = 'lg',
  containerSize = 'xl',
}: SectionProps) {
  const backgroundClasses = {
    white: 'bg-white',
    gray: 'bg-neutral-50',
    gradient: 'moving-gradient',
    'enhanced-gradient': 'enhanced-gradient',
  };

  const paddingClasses = {
    sm: 'py-8 lg:py-12',
    md: 'py-12 lg:py-16',
    lg: 'py-16 lg:py-24',
  };

  return (
    <section
      id={id}
      className={`${backgroundClasses[background]} ${paddingClasses[padding]} ${className}`}
    >
      <Container size={containerSize}>
        {children}
      </Container>
    </section>
  );
}