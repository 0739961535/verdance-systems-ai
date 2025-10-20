import { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  className?: string;
}

/**
 * Button component with multiple variants and sizes
 * Supports both button and link functionality
 * Includes hover animations and focus states for accessibility
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-1 active:translate-y-0 relative overflow-hidden group';

  const variantClasses = {
    primary: 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 hover:shadow-2xl hover:shadow-primary-500/25 focus:ring-primary-400 shadow-lg border border-transparent',
    secondary: 'bg-white/80 backdrop-blur-sm text-primary-600 border-2 border-primary-500 hover:bg-primary-50 hover:border-primary-600 hover:shadow-lg hover:shadow-primary-500/20 focus:ring-primary-400 shadow-md',
    ghost: 'text-primary-600 hover:bg-primary-50 hover:shadow-md focus:ring-primary-400 border border-transparent',
  };

  const sizeClasses = {
    sm: 'px-6 py-3 text-sm',
    md: 'px-8 py-4 text-base',
    lg: 'px-12 py-5 text-lg',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  // Shimmer effect for primary buttons
  const shimmerEffect = variant === 'primary' ? (
    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -skew-x-12 -translate-x-full group-hover:translate-x-full group-hover:animate-shimmer"></span>
  ) : null;

  // If href is provided, render as a link
  if (href) {
    return (
      <a
        href={href}
        className={classes}
        onClick={onClick}
        {...(props as any)}
      >
        {shimmerEffect}
        <span className="relative z-10">{children}</span>
      </a>
    );
  }

  // Otherwise render as a button
  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {shimmerEffect}
      <span className="relative z-10">{children}</span>
    </button>
  );
}