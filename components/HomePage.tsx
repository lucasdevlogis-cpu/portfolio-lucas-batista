import { Cases } from "@/components/Cases";
import { Contato } from "@/components/Contato";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProfileBrief } from "@/components/ProfileBrief";

export function HomePage() {
  return (
    <>
      <Header />
      <Hero />
      <ProfileBrief />
      <Cases />
      <Contato />
      <Footer />
    </>
  );
}
