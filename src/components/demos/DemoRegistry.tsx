"use client";

/**
 * DemoRegistry — maps a demoKey from src/data/services.ts to the actual demo(s)
 * to render on a service sub-page. Composite keys render multiple demos stacked.
 */

import {
  PipelineDemo,
  WhatsAppDemo,
  CalendarDemo,
  VoiceAgentDemo,
  MissedCallTextbackDemo,
  LeadReactivationDemo,
  ReviewEngineDemo,
  AgentDashboardDemo,
  WebsiteWidgetDemo,
  MetricsLineDemo,
  LeadScraperDemo,
  PaymentsDemo,
  WebsiteBuildDemo,
  SocialMediaDemo,
} from "./index";

export function ServiceDemo({ demoKey }: { demoKey: string }) {
  switch (demoKey) {
    case "lead-scraper":
      return <LeadScraperDemo />;
    case "conversation-ai":
      return (
        <div className="grid gap-8 lg:grid-cols-2">
          <WhatsAppDemo />
          <WebsiteWidgetDemo />
        </div>
      );
    case "voice-ai":
      return <VoiceAgentDemo />;
    case "crm-pipeline":
      return (
        <div className="grid gap-8 lg:grid-cols-1">
          <PipelineDemo size="md" />
          <AgentDashboardDemo />
        </div>
      );
    case "booking-calendar":
      return <CalendarDemo />;
    case "follow-up-nurture":
      return (
        <div className="grid gap-8 lg:grid-cols-2">
          <MissedCallTextbackDemo />
          <LeadReactivationDemo />
        </div>
      );
    case "payments":
      return <PaymentsDemo />;
    case "reputation-reviews":
      return <ReviewEngineDemo />;
    case "website-build":
      return <WebsiteBuildDemo />;
    case "social-media":
      return <SocialMediaDemo />;
    case "custom-builds":
      return (
        <div className="grid gap-8 lg:grid-cols-1">
          <PipelineDemo size="md" />
          <AgentDashboardDemo />
        </div>
      );
    case "analytics-compliance":
      return (
        <div className="grid gap-8 lg:grid-cols-1">
          <MetricsLineDemo />
          <AgentDashboardDemo />
        </div>
      );
    default:
      return <PipelineDemo size="md" />;
  }
}
