import React from 'react';
import { HeroSection } from '../components/landing/HeroSection';
import { MissionSection } from '../components/landing/MissionSection';
import { TimelineSection } from '../components/landing/TimelineSection';
import { TestimonialsSection } from '../components/landing/TestimonialsSection';
import { TeamSection } from '../components/landing/TeamSection';
import { GallerySection } from '../components/landing/GallerySection';
import { CTASection } from '../components/landing/CTASection';

export default function LandingPage() {
  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      <HeroSection />
      <MissionSection />
      <TimelineSection />
      <TestimonialsSection />
      <TeamSection />
      {/* <GallerySection /> */}
      <CTASection />
    </div>
  );
}