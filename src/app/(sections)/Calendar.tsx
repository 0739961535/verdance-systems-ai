'use client';

import { useEffect, useState } from 'react';
import Section from '../(components)/Section';

/**
 * Calendar section with GHL iframe integration
 * Displays current timezone and responsive iframe
 * Uses environment variable for calendar URL
 */
export default function Calendar() {
  const [currentTimezone, setCurrentTimezone] = useState('');

  // Get current timezone
  useEffect(() => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setCurrentTimezone(timezone);
  }, []);

  // Get calendar URL from environment variable
  const calendarUrl = process.env.NEXT_PUBLIC_GHL_CALENDAR_URL || '';

  return (
    <Section id="book" background="white" padding="lg">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-600 mb-4">
            Demo Call — 30 Min
          </h2>
          <p className="text-lg text-neutral-700 mb-2">
            Meeting hosted on Google Meet. Select a date & time.
          </p>
          {currentTimezone && (
            <p className="text-sm text-neutral-600">
              Times shown in {currentTimezone}
            </p>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-border shadow-soft overflow-hidden">
          {calendarUrl ? (
            <iframe
              src={calendarUrl}
              width="100%"
              height="600"
              frameBorder="0"
              title="Book a Demo Call"
              className="w-full h-96 lg:h-[600px]"
              loading="lazy"
            />
          ) : (
            <div className="flex items-center justify-center h-96 lg:h-[600px] bg-neutral-50">
              <div className="text-center p-8">
                <h3 className="text-xl font-semibold text-neutral-700 mb-2">
                  Calendar Integration Ready
                </h3>
                <p className="text-neutral-600 mb-4">
                  Please add your GHL calendar URL to the .env.local file
                </p>
                <code className="bg-neutral-100 px-3 py-1 rounded text-sm text-neutral-800">
                  NEXT_PUBLIC_GHL_CALENDAR_URL=your-calendar-url
                </code>
              </div>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}