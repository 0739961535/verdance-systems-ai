import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
  hover?: boolean;
}

/**
 * Card component with consistent styling and optional hover effects
 * Used for features, testimonials, and other content blocks
 */
export default function Card({
  children,
  className = '',
  padding = 'md',
  hover = true,
}: CardProps) {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const hoverClasses = hover
    ? 'hover:shadow-lg hover:-translate-y-1 transition-all duration-200'
    : '';

  return (
    <div
      className={`bg-white border border-border rounded-2xl ${paddingClasses[padding]} ${hoverClasses} ${className}`}
    >
      {children}
    </div>
  );
}