export type PassType = "visitor" | "exhibitor" | "sponsor"
export type UserRole = "member" | "admin"
export type PassStatus = "active" | "cancelled" | "pending_verification"

export interface ClaimedPass {
  id: string
  passType: PassType
  claimedAt: string
  ticketCode: string
  status: PassStatus
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
  cityProvince: string
  age: string
  purposes: string[]
  otherPurpose?: string
  daysAttending: string[]
  howDidYouHear: string
  privacyConsent: boolean
}

export interface ExhibitorFormData {
  companyName: string
  contactPerson: string
  email: string
  phone: string
  packageSelection: "MSME Booth" | "FOOD EXHIBITOR" | "NON-FOOD (SERVICES) EXHIBITOR" | "LOBBY TABLE SPACE" | ""
  numberOfBooths: string
  boothWithShellStructure: "Yes" | "No" | ""
  sellingAtEvent: "Yes" | "No" | ""
  cookingOnSite: "Yes" | "No" | ""
  additionalIds: string
  additionalFurniture: string
  agree: boolean
}

export interface SponsorFormData {
  companyName: string
  contactPerson: string
  email: string
  phone: string
  sponsorshipTier: "CO-PRESENTOR" | "GOLD" | "SILVER" | "BRONZE" | "AFFILIATE" | ""
  preferredBoothNo: string
  boothWithShellStructure: "Yes" | "No" | ""
  sellingAtEvent: "Yes" | "No" | ""
  cookingOnSite: "Yes" | "No" | ""
  extraElectricalLoad: "Yes" | "No" | ""
  additionalIds: string
  agree: boolean
}