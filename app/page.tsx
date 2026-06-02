import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Reframe from "@/components/Reframe";
import Proof from "@/components/Proof";
import GrowthSystem from "@/components/GrowthSystem";
import HowItWorks from "@/components/HowItWorks";
import Founder from "@/components/Founder";
import Pricing from "@/components/Pricing";
import RiskReversal from "@/components/RiskReversal";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Nav />
      <Hero />
      <Problem />
      <Reframe />
      <Proof />
      <GrowthSystem />
      <HowItWorks />
      <Founder />
      <Pricing />
      <RiskReversal />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
