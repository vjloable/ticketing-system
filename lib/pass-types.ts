export type PassType = "visitor" | "exhibitor" | "sponsor"
export type UserRole = "member" | "admin"

export interface ClaimedPass {
  id: string
  passType: PassType
  claimedAt: string
  ticketCode: string
  formData: Record<string, any>
}

export interface UserAccount {
  id: string
  name: string
  email: string
  role: UserRole
  passes: ClaimedPass[]
}

export interface VisitorFormData {
  fullName: string
  email: string
  phone: string
  organization?: string
  jobTitle?: string
  interests: string[]
  daysAttending: "day1" | "day2" | "both"
  howDidYouHear?: string
}

export interface ExhibitorFormData {
  companyName: string
  brandName: string
  contactPerson: string
  email: string
  phone: string
  websiteOrSocial?: string
  productCategory: string
  boothSizePreference: "standard" | "corner" | "custom"
  specialRequirements?: string
}

export interface SponsorFormData {
  companyName: string
  contactPerson: string
  email: string
  phone: string
  sponsorshipTier: "presenting" | "platinum" | "gold" | "silver"
  customObjectives?: string
}