import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ContactPanel } from "@/components/sections/ContactPanel";
import { EvidenceStrip } from "@/components/sections/EvidenceStrip";
import { ExecutiveHero } from "@/components/sections/ExecutiveHero";
import { ProfileBrief } from "@/components/sections/ProfileBrief";
import { SignatureCases } from "@/components/sections/SignatureCases";
import { TrajectoryBoard } from "@/components/sections/TrajectoryBoard";

export function HomePage() {
  return (
    <>
      <Header />
      <ExecutiveHero />
      <EvidenceStrip />
      <ProfileBrief />
      <SignatureCases />
      <TrajectoryBoard />
      <ContactPanel />
      <Footer />
    </>
  );
}
