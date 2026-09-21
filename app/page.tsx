import { HeroSection } from "@/components/home/HeroSection"
import { SponsorMarquee } from "@/components/home/SponsorMarquee"
// import { PartnerPassesSection } from "@/components/home/PartnerPassesSection"
import { MarqueeBar } from "@/components/home/MarqueeBar"
import { AboutSection } from "@/components/home/AboutSection"
import { HighlightsSection } from "@/components/home/HighlightsSection"
import { CulinaryCupSection } from "@/components/home/CulinaryCupSection"
import { FoodForwardForumSection } from "@/components/home/FoodForwardForumSection"
import { ExhibitorsSection } from "@/components/home/ExhibitorsSection"
import { ScheduleSection } from "@/components/home/ScheduleSection"
import { VenueSection } from "@/components/home/VenueSection"
import { CtaBanner } from "@/components/home/CtaBanner"

export default function Home() {
  return (
    <>
      <HeroSection />
      <SponsorMarquee />
      {/* <PartnerPassesSection /> */}
      <MarqueeBar />
      <AboutSection />
      <HighlightsSection />
      <CulinaryCupSection />
      <FoodForwardForumSection />
      <ExhibitorsSection />
      <ScheduleSection />
      <VenueSection />
      <CtaBanner />
    </>
  )
}