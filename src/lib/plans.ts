export type PlanKey = "FREE" | "STARTER" | "GROWTH" | "PRO";

export interface PlanConfig {
  name: string;
  price: number; // INR per month
  maxAutomations: number;
  maxDmsPerMonth: number;
  hasWatermark: boolean;
  dmDelay: number; // seconds delay before sending DM (0 = instant)
  features: string[];
}

export const PLANS: Record<PlanKey, PlanConfig> = {
  FREE: {
    name: "Free",
    price: 0,
    maxAutomations: 1,
    maxDmsPerMonth: 50,
    hasWatermark: true,
    dmDelay: 30, // 30 second delay on free
    features: [
      "1 active post automation",
      "50 DMs / month",
      "Basic keyword triggers",
      "\"Powered by LinkReady\" in DM",
      "30-second DM delay",
    ],
  },
  STARTER: {
    name: "Starter",
    price: 299,
    maxAutomations: 5,
    maxDmsPerMonth: 1000,
    hasWatermark: false,
    dmDelay: 0,
    features: [
      "5 active post automations",
      "1,000 DMs / month",
      "Multiple keyword triggers",
      "No watermark",
      "Instant DM delivery",
      "Basic analytics",
    ],
  },
  GROWTH: {
    name: "Growth",
    price: 799,
    maxAutomations: 25,
    maxDmsPerMonth: 5000,
    hasWatermark: false,
    dmDelay: 0,
    features: [
      "25 active automations",
      "5,000 DMs / month",
      "Analytics dashboard",
      "Story reply triggers",
      "Reel comment triggers",
      "Priority support",
    ],
  },
  PRO: {
    name: "Pro",
    price: 1499,
    maxAutomations: 999,
    maxDmsPerMonth: 99999,
    hasWatermark: false,
    dmDelay: 0,
    features: [
      "Unlimited automations",
      "Unlimited DMs",
      "WhatsApp follow-up (coming soon)",
      "UPI link in DM (coming soon)",
      "Priority support",
      "Custom branding",
    ],
  },
};

export function getPlanLimits(plan: PlanKey): PlanConfig {
  return PLANS[plan] || PLANS.FREE;
}
