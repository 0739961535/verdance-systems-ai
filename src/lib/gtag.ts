/**
 * Google Analytics tracking utilities
 * Provides type-safe event tracking and page view functions
 * Only loads and tracks in production environment
 */

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Track page views
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && GA_MEASUREMENT_ID) {
    (window as any).gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

// Track custom events
type EventParameters = {
  action: string;
  category: string;
  label?: string;
  value?: number;
};

export const event = ({ action, category, label, value }: EventParameters) => {
  if (typeof window !== 'undefined' && GA_MEASUREMENT_ID) {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Predefined events for common actions
export const trackEvents = {
  // Button clicks
  buttonClick: (label: string) =>
    event({
      action: 'click',
      category: 'engagement',
      label,
    }),

  // Widget interactions
  widgetOpen: () =>
    event({
      action: 'widget_open',
      category: 'lead_generation',
      label: 'ai_demo',
    }),

  // Calendar bookings
  calendarView: () =>
    event({
      action: 'calendar_view',
      category: 'conversion',
      label: 'demo_booking',
    }),

  // Section scrolling
  sectionView: (sectionName: string) =>
    event({
      action: 'section_view',
      category: 'engagement',
      label: sectionName,
    }),

  // Form submissions
  formSubmit: (formName: string) =>
    event({
      action: 'form_submit',
      category: 'lead_generation',
      label: formName,
    }),

  // External link clicks
  externalLink: (url: string) =>
    event({
      action: 'external_link',
      category: 'engagement',
      label: url,
    }),
};