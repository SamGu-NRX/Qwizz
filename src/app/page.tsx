"use client";

import { useEffect, useRef } from 'react';
import { fadeUp } from '@/animations/gsap';
import { motion } from 'framer-motion';

import Navbar from '@/components/Navbar';
import Pricing from '@/components/main/Pricing';
import Hero from '@/components/main/Hero';
// import Hero from '@/components/main/Hero';
// import About from '@/components/main/About';
// import Features from '@/components/main/Features';
// import CTA from '@/components/main/CTA';
import Footer from '@/components/Footer';
import Testimonials from '@/components/main/Testimonials';
import FeatureCardsDeck from '@/components/main/Features';
import HomeGrid from "@/components/main/HomeCards";
import DemoGrid from '@/components/main/DemoGrid';
import InnovativePricingSection from '@/components/main/NewPricing';

const HomePage = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<(HTMLHeadingElement | HTMLParagraphElement | HTMLButtonElement)[]>([]);

  useEffect(() => {
    if (heroRef.current) {
      fadeUp(elementsRef.current.filter(el => el !== null) as HTMLElement[], heroRef.current,
      { delay: 0.05 });
    }
  }, []);

  return (
    <div className="h-screen flex flex-col">
      {/* TODO:Check bugs for Dynamic Navbar, i.e. fade out when scrolling and show up when scrolling up */}
      <Navbar />
      <Hero />
      <DemoGrid />
      <HomeGrid />
      {/* <FeatureCardsDeck /> */}
      <Testimonials />
      <Pricing />
      <InnovativePricingSection/>
      <Footer />
    </div>
  );
};

export default HomePage;
