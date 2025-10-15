'use client';

import { useEffect } from 'react';

/**
 * WidgetLauncher component initializes the BuildMyAgent widget
 * Creates the global VERDANCE_WIDGET object for opening the widget
 * This component should be included in the main layout
 */
export default function WidgetLauncher() {
  useEffect(() => {
    // Initialize the widget launcher function
    if (typeof window !== 'undefined') {
      // Create the global widget object
      (window as any).VERDANCE_WIDGET = {
        open: () => {
          console.log('Widget open function called - Please paste your BuildMyAgent script here');
          // This is where the actual widget opening logic will go
          // The client will paste their BuildMyAgent script here
          alert('Widget integration ready! Please paste your BuildMyAgent script in the WidgetLauncher.tsx file.');
        }
      };
    }
  }, []);

  return null; // This component doesn't render anything
}