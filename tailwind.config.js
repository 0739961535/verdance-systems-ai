/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Modern Turquoise/White/Grey Brand Colors
        primary: {
          50: '#f0fdfa',    // Very light turquoise-tinted white
          100: '#ccfbf1',   // Light turquoise background
          200: '#99f6e4',   // Soft turquoise for subtle backgrounds
          300: '#5eead4',   // Light accent turquoise
          400: '#2dd4bf',   // Medium turquoise
          500: '#14b8a6',   // Main turquoise (primary)
          600: '#0d9488',   // Deep turquoise (primary dark)
          700: '#0f766e',   // Darker turquoise
          800: '#115e59',   // Very dark turquoise
          900: '#134e4a',   // Almost black turquoise
          950: '#042f2e',   // Deepest turquoise
        },
        // Turquoise accent system
        turquoise: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        // Enhanced neutrals with better contrast
        neutral: {
          25: '#fcfcfd',    // Ultra light background
          50: '#f8fafc',    // Light background
          100: '#f1f5f9',   // Card backgrounds
          200: '#e2e8f0',   // Subtle borders
          300: '#cbd5e1',   // Light borders/dividers
          400: '#94a3b8',   // Muted text
          500: '#64748b',   // Secondary text
          600: '#475569',   // Primary text (lighter)
          700: '#334155',   // Primary text
          800: '#1e293b',   // Dark text
          900: '#0f172a',   // Very dark text
          950: '#111111',   // Darkest text
        },
        // Semantic colors for feedback
        success: {
          50: '#f0fdf4',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
        },
        warning: {
          50: '#fefce8',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
        },
        error: {
          50: '#fef2f2',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
        },
        // Accent colors for highlights
        accent: {
          blue: '#3b82f6',
          purple: '#8b5cf6',
          emerald: '#10b981',
        },
        // Border and surface colors
        border: {
          DEFAULT: '#E5E7EB',
          light: '#F3F4F6',
          medium: '#D1D5DB',
          dark: '#9CA3AF',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          secondary: '#F9FAFB',
          tertiary: '#F3F4F6',
        },
      },
      fontSize: {
        'hero-desktop': ['48px', { lineHeight: '1.1', fontWeight: '700' }],
        'hero-mobile': ['36px', { lineHeight: '1.1', fontWeight: '700' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
        'slide-in-left': 'slideInLeft 0.8s ease-out',
        'slide-in-right': 'slideInRight 0.8s ease-out',
        'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'gradient-x': 'gradientX 3s ease infinite',
        'gradient-y': 'gradientY 3s ease infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(20, 184, 166, 0.5)' },
          '100%': { boxShadow: '0 0 30px rgba(20, 184, 166, 0.8)' },
        },
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        gradientY: {
          '0%, 100%': { backgroundPosition: '50% 0%' },
          '50%': { backgroundPosition: '50% 100%' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        pulseGlow: {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(20, 184, 166, 0.4)',
            transform: 'scale(1)'
          },
          '50%': {
            boxShadow: '0 0 40px rgba(20, 184, 166, 0.8)',
            transform: 'scale(1.05)'
          },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};