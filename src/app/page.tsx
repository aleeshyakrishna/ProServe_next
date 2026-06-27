import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/features/landing/hero-section";
import { CategoriesSection } from "@/features/landing/categories-section";
import { PopularServicesSection } from "@/features/landing/popular-services-section";
import { FeaturedProvidersSection } from "@/features/landing/featured-providers-section";
import { HowItWorksSection } from "@/features/landing/how-it-works-section";
import { StatisticsSection } from "@/features/landing/statistics-section";
import { ReviewsSection } from "@/features/landing/reviews-section";
import { CTASection } from "@/features/landing/cta-section";
import { APP_NAME, APP_TAGLINE, APP_URL } from "@/constants";

// ------ Page Metadata ----------------------------------------

export const metadata: Metadata = {
  title: `${APP_NAME} — ${APP_TAGLINE}`,
  description:
    "ProServe connects you with verified, background-checked service professionals across Dubai, Abu Dhabi, and Sharjah. Book home cleaning, AC service, electrical, plumbing, beauty services and more.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: APP_URL,
    title: `${APP_NAME} — ${APP_TAGLINE}`,
    description:
      "Book verified service professionals across the UAE. 50,000+ happy customers. Rated 4.9/5.",
  },
};

// ------ Page ------------------------------------------------

export default function LandingPage() {
  return (
    <>
      <Navbar />

      <main id="main-content">
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-navy-900 focus:rounded-lg focus:shadow-lg focus:font-semibold"
        >
          Skip to main content
        </a>

        {/* 1. Hero */}
        <HeroSection />

        {/* 2. Categories */}
        <CategoriesSection />

        {/* 3. Popular Services */}
        <PopularServicesSection />

        {/* 4. Featured Providers */}
        <FeaturedProvidersSection />

        {/* 5. How It Works */}
        <HowItWorksSection />

        {/* 6. Statistics */}
        <StatisticsSection />

        {/* 7. Customer Reviews */}
        <ReviewsSection />

        {/* 8. Final CTA */}
        <CTASection />
      </main>

      <Footer />
    </>
  );
}
