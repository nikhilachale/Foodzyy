import {
  Navbar,
  HeroSection,
  FeaturesSection,
  HowItWorksSection,
  CuisinesSection,
  CTASection,
  Footer,
} from "../components/landing";

export default function Landing() {
  return (
    <div className="bg-slate-900 min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CuisinesSection />
      <CTASection />
      <Footer />
    </div>
  );
}
