import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ContactPanel } from "@/components/sections/ContactPanel";
import { EvidenceStrip } from "@/components/sections/EvidenceStrip";
import { ExecutiveHero } from "@/components/sections/ExecutiveHero";
import { ProfileBrief } from "@/components/sections/ProfileBrief";
import { SignatureCases } from "@/components/sections/SignatureCases";
import { TrajectoryBoard } from "@/components/sections/TrajectoryBoard";
import { CONTENT } from "@/data/content";

export function HomePage() {
  return (
    <>
      <Header
        name={CONTENT.pessoal.nomeCurto}
        navLinks={CONTENT.nav}
        navCta={CONTENT.navCta}
        linkedin={CONTENT.pessoal.linkedin}
        linkedinLabel={CONTENT.contactLinks.linkedinLabel}
        primaryNavigationLabel={CONTENT.a11y.primaryNavigation}
        linkedinAriaLabel={CONTENT.a11y.linkedinProfile}
        mobileNav={CONTENT.mobileNav}
      />
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
