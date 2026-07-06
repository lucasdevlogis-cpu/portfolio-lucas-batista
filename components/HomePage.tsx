import { Cases } from "@/components/Cases";
import { Contato } from "@/components/Contato";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProfileSection } from "@/components/ProfileSection";
import { TrajectorySection } from "@/components/TrajectorySection";

export function HomePage() {
  return (
    <>
      <Header />
      <Hero />
      <ProfileSection />
      <Cases />
      <TrajectorySection />
      <Contato />
      <Footer />
    </>
  );
}
