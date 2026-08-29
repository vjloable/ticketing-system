import { ClaimedPass } from "./pass-types"

export const BANK_PAYMENT_DETAILS = {
  bankName: "Security Bank",
  accountType: "Current",
  accountName: "Asuncion Family Ventures Inc.",
  accountNumber: "0000071667602",
  venueLayoutUrl: "https://canva.link/59jgmeo05db",
}

export const VISITOR_AGE_OPTIONS = [
  "Below 13 years old",
  "13 - 17 years old",
  "18 - 24 years old",
  "25 - 34 years old",
  "35 - 44 years old",
  "45 - 54 years old",
  "55 years old and above",
]

export const VISITOR_PURPOSE_OPTIONS = [
  {
    id: "b2b",
    label: "B2B Networking & Sourcing: Looking for new F&B suppliers, ingredients, or raw materials",
  },
  {
    id: "franchise",
    label: "Franchise & Business Opportunities: Exploring food franchises, dealership, or distributorships",
  },
  {
    id: "equipment",
    label: "Equipment & Technology: Sourcing kitchen equipment, packaging, or tech solutions",
  },
  {
    id: "coffee",
    label: "Coffee & Beverage Sourcing: Looking for coffee bean/matcha suppliers, equipment, or cafe concepts (ONE Coffee & Matcha Fest)",
  },
  {
    id: "culinary",
    label: "Culinary Showcase & Competitions: Attending/Supporting the One Pampanga Culinary Competition (OPCC)",
  },
  {
    id: "tasting",
    label: "General Visitor / Food Tasting: Exploring local food brands and consumer products",
  },
]

export const VISITOR_HEAR_OPTIONS = [
  "Social Media (Facebook / Instagram / TikTok)",
  "Directly invited by an Exhibitor / Partner",
  "Email Newsletter / Online Announcement",
  "Billboard / Poster / Streamer",
  "Word of Mouth / Friend or Colleague",
]

export const EXHIBITOR_PACKAGES = [
  {
    id: "MSME Booth",
    name: "MSME Booth",
    price: "₱25,000 net of VAT",
    duration: "2 days",
    accent: "border-basil text-basil bg-basil/10",
    specs: [
      "Size: 2m × 2m with booth shell",
      "2 Official Exhibitor IDs",
      "5 amperes electrical capacity",
      "Selling Permit from Mabalacat LGU",
    ],
  },
  {
    id: "FOOD EXHIBITOR",
    name: "Food Exhibitor",
    price: "₱40,000 – ₱45,000 net of VAT",
    duration: "2 days",
    accent: "border-marigold text-marigold bg-marigold/10",
    note: "₱40,000 (Own Structure) · ₱45,000 (With Booth Shell)",
    specs: [
      "Size: 3m × 3m",
      "4 Official Exhibitor IDs",
      "5 amperes electrical capacity",
      "Selling Permit from Mabalacat LGU",
    ],
  },
  {
    id: "NON-FOOD (SERVICES) EXHIBITOR",
    name: "Non-Food (Services) Exhibitor",
    price: "₱40,000 – ₱45,000 net of VAT",
    duration: "2 days",
    accent: "border-tangerine text-tangerine bg-tangerine/10",
    note: "₱40,000 (Own Structure) · ₱45,000 (With Booth Shell)",
    specs: [
      "Size: 3m × 3m",
      "4 Official Exhibitor IDs",
      "5 amperes electrical capacity",
      "Selling Permit from Mabalacat LGU",
    ],
  },
  {
    id: "LOBBY TABLE SPACE",
    name: "Lobby Table Space",
    price: "₱15,000 net of VAT",
    duration: "2 days",
    accent: "border-lime text-lime bg-lime/10",
    specs: [
      "Size: 1m × 1.5m booth space only",
      "2 Official Exhibitor IDs",
    ],
  },
]

export const SPONSORSHIP_TIERS = [
  {
    id: "CO-PRESENTOR",
    name: "Co-Presentor",
    price: "₱2,000,000",
    accent: "border-marigold text-marigold bg-marigold/10",
    tag: "Exclusive",
    perks: [
      "Brand Exclusivity",
      "Year-round inclusion in all OPFBEX major & pocket activities",
      "FREE 6 units 2m × 3m booths inside SMX Halls",
      "Inclusion in all NLEX LED wall ads & road banners",
      "Inclusion in all posters & digital boosting & promotions",
      "45 minutes on-stage air time for 2 days",
      "Branded special award in the Culinary Cup",
      "Banner display at SMX Lobby",
      "Inclusion in OPFBEX website inc. promotional videos & ads",
      "Access to all exhibitors & attendees database",
    ],
  },
  {
    id: "GOLD",
    name: "Gold Sponsor",
    price: "₱1,000,000",
    accent: "border-tangerine text-tangerine bg-tangerine/10",
    perks: [
      "Year-round inclusion in all OPFBEX major & pocket activities",
      "FREE 4 units 2m × 3m booths inside SMX Halls OR 1 unit 5m × 3m at SMX Lobby",
      "Inclusion in all NLEX LED wall ads & road banners",
      "Inclusion in all posters & digital boosting & promotions",
      "30 minutes on-stage air time for 2 days",
      "Branded special award in the Culinary Cup",
      "Banner display at SMX Lobby",
      "Inclusion in OPFBEX website",
      "Access to all exhibitors & attendees database",
    ],
  },
  {
    id: "SILVER",
    name: "Silver Sponsor",
    price: "₱500,000",
    accent: "border-white/40 text-white bg-white/5",
    perks: [
      "FREE 3 units 2m × 3m booths inside SMX Halls",
      "Inclusion in all NLEX LED wall ads & road banners",
      "Inclusion in all posters & digital boosting & promotions",
      "15 minutes on-stage air time for 2 days",
    ],
  },
  {
    id: "BRONZE",
    name: "Bronze Sponsor",
    price: "₱250,000",
    accent: "border-basil text-basil bg-basil/10",
    perks: [
      "FREE 1 unit 2m × 3m booths inside SMX Halls",
      "Inclusion in all road banners",
      "Inclusion in all posters & digital boosting & promotions",
      "10 minutes on-stage air time for 2 days",
    ],
  },
  {
    id: "AFFILIATE",
    name: "Affiliate Partner",
    price: "₱100,000",
    accent: "border-lime text-lime bg-lime/10",
    perks: [
      "FREE 1 unit table space at SMX Lobby",
      "Inclusion in all NLEX LED wall ads & road banners",
      "Inclusion in all posters & digital boosting & promotions",
      "Opportunity for flyering within expo halls",
    ],
  },
]

// Cutoff Date: September 12, 2026 (7 days before OPFBEX opens on Sept 19)
export const EDIT_CUTOFF_DATE = new Date("2026-09-12T23:59:59+08:00")

export const POLICY_RULES = {
  cutoffDateFormatted: "September 12, 2026 (11:59 PM PHT)",
  supportEmail: "opfbexofficial@gmail.com",
  supportPhone: "+63 917 521 1106",
}

// Check if edit window is open based on date
export function isEditWindowOpen(): boolean {
  return new Date() <= EDIT_CUTOFF_DATE
}

// Policy: Can this specific pass be edited?
export function canEditPass(pass: ClaimedPass): { allowed: boolean; reason?: string } {
  if (pass.status === "cancelled") {
    return { allowed: false, reason: "Cancelled passes cannot be edited." }
  }

  if (!isEditWindowOpen()) {
    return {
      allowed: false,
      reason: `The editing deadline was ${POLICY_RULES.cutoffDateFormatted}. Registration details are now locked for on-site badge printing.`,
    }
  }

  return { allowed: true }
}

// Policy: Can this pass be self-cancelled by the member?
export function canCancelPass(pass: ClaimedPass): { allowed: boolean; reason?: string } {
  if (pass.status === "cancelled") {
    return { allowed: false, reason: "Pass is already cancelled." }
  }

  // Only free Visitor passes can be cancelled directly by attendees
  if (pass.passType !== "visitor") {
    return {
      allowed: false,
      reason: `Commercial ${pass.passType} agreements cannot be cancelled online. Please contact the OPFBEX secretariat at ${POLICY_RULES.supportEmail}.`,
    }
  }

  return { allowed: true }
}