import AboutHeaderSection from "@/components/organisms/about-header"
import AboutServiceSection from "@/components/organisms/about-service"
import VisionMissionSection from "@/components/organisms/vission-mission"
import GuidePage from "../pages/guide/page"
export default function AboutPage() {
  return (
    <>
      <AboutHeaderSection />
      <AboutServiceSection />
      <VisionMissionSection />
      <GuidePage />
    </>
  )
}