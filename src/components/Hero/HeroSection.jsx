import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import HeroNavbar from "./HeroNavbar";
import ScrollIndicator from "./ScrollIndicator";

export default function HeroSection({ heroRef }) {
  return (
    <section ref={heroRef} id="hero" className="h-screen overflow-hidden bg-[#0A0A0A]">
      <HeroBackground />
      <HeroNavbar />

      <div className="absolute inset-0 bg-black/35 z-10" />

      <div className="absolute h-screen inset-0 hero-gradient z-20" />


      <HeroContent />

      <ScrollIndicator />
      

      <div className="noise" />
    </section>
  );
}