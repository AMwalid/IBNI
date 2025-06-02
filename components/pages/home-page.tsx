"use client"

import { HeroSection } from "@/components/home/hero-section"
import { UserCardsSection } from "@/components/home/user-cards-section"
import { FeaturesSection } from "@/components/home/features-section"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { StatsSection } from "@/components/home/stats-section"
import { CTASection } from "@/components/home/cta-section"

interface HomePageProps {
  navigateTo: (page: string) => void
}

export default function HomePage({ navigateTo }: HomePageProps) {
  return (
    <>
      <HeroSection navigateTo={navigateTo} />
      <UserCardsSection navigateTo={navigateTo} />
      <FeaturesSection />
      <StatsSection />
      <TestimonialsSection />
      <CTASection navigateTo={navigateTo} />
    </>
  )
}
