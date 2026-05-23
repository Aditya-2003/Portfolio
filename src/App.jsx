import { useState, useRef, useEffect } from 'react'
import FloatingNavbar from './components/FloatingNavbar'
import HeroSection from "./components/Hero/HeroSection"
import Billa from './components/Billa/index'
import './App.css'
import InfiniteText from './components/InfiniteText'
import Philosophy from './components/Philosophy'
import SelectedWork from './components/SelectedWork'
import CapabilitiesSection from './components/CapabilitiesSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'

function App() {
const [showFloatingNav, setShowFloatingNav] = useState(false);
const heroRef = useRef(null);

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      setShowFloatingNav(!entry.isIntersecting);
    },
    {
      threshold: 0.15,
    }
  );

  if (heroRef.current) {
    observer.observe(heroRef.current);
  }

  return () => {
    if (heroRef.current) {
      observer.unobserve(heroRef.current);
    }
  };
}, []);

  return (
    <div className="google-sans-flex">
        <FloatingNavbar visible={showFloatingNav} />  
        <Billa />
      <section id="home">
        <HeroSection heroRef={heroRef} />
      </section>
      <InfiniteText />
      <section id="work">
        <SelectedWork />
      </section>
      <section id="skills">
        <CapabilitiesSection />
      </section>
      <section id="philosophy">
        <Philosophy />
      </section>
      <section id="contact">
        <ContactSection />
      </section>
      <Footer />
    </div>
  )
}

export default App
