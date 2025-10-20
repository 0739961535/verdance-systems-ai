'use client';

import { useEffect, useCallback } from 'react';

/**
 * WidgetLauncher component initializes the BuildMyAgent widget
 * Creates the global VERDANCE_WIDGET object for opening the widget
 * This component should be included in the main layout
 */
export default function WidgetLauncher() {
  const WIDGET_ID = '68ece20a5ba4585357eb476d';
  const WIDGET_URL = `https://buildmyagent.io/widget/${WIDGET_ID}/widget-professional.js?widgetId=${WIDGET_ID}`;

  const loadWidget = useCallback(() => {
    return new Promise<void>((resolve, reject) => {
      // Check if script is already loaded
      if (document.querySelector(`script[src="${WIDGET_URL}"]`)) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = WIDGET_URL;
      script.async = true;

      script.onload = () => {
        console.log('BuildMyAgent widget script loaded successfully');
        resolve();
      };

      script.onerror = () => {
        console.error('Failed to load BuildMyAgent widget script');
        reject(new Error('Widget script failed to load'));
      };

      document.body.appendChild(script);
    });
  }, [WIDGET_URL]);

  const openWidget = useCallback(async () => {
    try {
      // Load the widget if not already loaded
      await loadWidget();

      // Wait a moment for the widget to initialize
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Try multiple methods to open the widget
      const attempts = [
        () => {
          // Method 1: Check for global widget object
          if ((window as any).BuildMyAgent && (window as any).BuildMyAgent.open) {
            (window as any).BuildMyAgent.open();
            return true;
          }
          return false;
        },
        () => {
          // Method 2: Check for widget element and click it
          const widgetElement = document.querySelector('.buildmyagent-widget, .bma-widget, [data-widget-id]');
          if (widgetElement && widgetElement instanceof HTMLElement) {
            widgetElement.click();
            return true;
          }
          return false;
        },
        () => {
          // Method 3: Dispatch a custom event
          window.dispatchEvent(new CustomEvent('openBuildMyAgent'));
          return true;
        },
        () => {
          // Method 4: Try to find and trigger any widget button
          const widgetButtons = document.querySelectorAll('button[class*="widget"], div[class*="widget"], .chat-widget');
          for (const button of widgetButtons) {
            if (button instanceof HTMLElement) {
              button.click();
              return true;
            }
          }
          return false;
        }
      ];

      let opened = false;
      for (const attempt of attempts) {
        try {
          if (attempt()) {
            opened = true;
            console.log('BuildMyAgent widget opened successfully');
            break;
          }
        } catch (error) {
          console.warn('Widget open attempt failed:', error);
        }
      }

      if (!opened) {
        console.warn('Could not open BuildMyAgent widget - trying fallback');
        // Fallback: Show alert with information
        alert('Our AI assistant is loading. If it doesn\'t appear automatically, please refresh the page and try again.');
      }
    } catch (error) {
      console.error('Error opening BuildMyAgent widget:', error);
      // Fallback: Direct user to contact
      alert('Having trouble with our AI assistant? Please call us at +27 73 996 1535 or email verdancesystems@gmail.com');
    }
  }, [loadWidget]);

  useEffect(() => {
    // Initialize the widget launcher function
    if (typeof window !== 'undefined') {
      // Create the global widget object
      (window as any).VERDANCE_WIDGET = {
        open: openWidget,
        load: loadWidget,
        widgetId: WIDGET_ID
      };

      // Preload the widget script for better performance
      loadWidget().catch(error => {
        console.warn('Failed to preload widget script:', error);
      });

      // Add error handling for the widget
      window.addEventListener('error', (event) => {
        if (event.filename?.includes('buildmyagent.io')) {
          console.error('BuildMyAgent widget error:', event.error);
        }
      });
    }
  }, [openWidget, loadWidget, WIDGET_ID]);

  return null; // This component doesn't render anything
}