"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Rating } from "@/components/common/rating";
import { TESTIMONIALS } from "@/constants";
import { formatDate } from "@/lib/utils";

// ------ Testimonial Card ------------------------------------

function TestimonialCard({
  review,
  isActive,
}: {
  review: (typeof TESTIMONIALS)[number];
  isActive: boolean;
}) {
  return (
    <motion.div
      key={review.id}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.35, ease: [0, 0, 0.2, 1] }}
      className={cn(
        "flex flex-col gap-6 p-8 rounded-3xl",
        "bg-[var(--surface-card)] border border-[var(--border-subtle)]",
        "shadow-lg max-w-2xl mx-auto",
      )}
      aria-label={`Review by ${review.customer.fullName}`}
    >
      {/* Quote icon */}
      <Quote
        size={36}
        className="text-gold-400 fill-gold-100 -mb-2"
        aria-hidden="true"
      />

      {/* Rating */}
      <Rating value={review.rating} size="md" />

      {/* Title */}
      <h3 className="text-lg lg:text-xl font-bold text-[var(--text-primary)] leading-snug">
        "{review.title}"
      </h3>

      {/* Body */}
      <p className="text-[var(--text-secondary)] leading-relaxed text-balance">
        {review.body}
      </p>

      {/* Author */}
      <div className="flex items-center gap-4 pt-2 border-t border-[var(--border-subtle)]">
        {/* Avatar */}
        <div
          className="h-12 w-12 rounded-full bg-gradient-to-br from-navy-700 to-navy-900 flex items-center justify-center text-white font-bold shrink-0"
          aria-hidden="true"
        >
          {review.customer.fullName
            .split(" ")
            .map((n: string) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2)}
        </div>

        <div>
          <p className="font-semibold text-[var(--text-primary)]">
            {review.customer.fullName}
          </p>
          <p className="text-xs text-[var(--text-tertiary)]">
            Verified customer · {formatDate(review.createdAt)}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ------ Section ---------------------------------------------

export function ReviewsSection() {
  const [current, setCurrent] = React.useState(0);
  const total = TESTIMONIALS.length;

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  // Auto-advance
  React.useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="section-padding"
      aria-labelledby="reviews-heading"
    >
      <div className="container-section">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <p className="text-sm font-semibold text-emerald-600 uppercase tracking-widest">
            Customer Stories
          </p>
          <h2 id="reviews-heading" className="text-[var(--text-primary)]">
            What Our Customers Say
          </h2>
          <p className="text-[var(--text-secondary)] text-base">
            Real reviews from real people. We don't cherry-pick — these are our latest testimonials.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative" aria-roledescription="carousel" aria-label="Customer reviews">
          <AnimatePresence mode="wait">
            <TestimonialCard
              key={TESTIMONIALS[current].id}
              review={TESTIMONIALS[current]}
              isActive
            />
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            {/* Prev */}
            <button
              onClick={prev}
              className={cn(
                "h-10 w-10 rounded-full border border-[var(--border-default)]",
                "bg-[var(--surface-card)] text-[var(--text-secondary)]",
                "hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]",
                "transition-colors",
                "flex items-center justify-center",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-700",
              )}
              aria-label="Previous review"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Dots */}
            <div
              className="flex items-center gap-2"
              role="tablist"
              aria-label="Review navigation"
            >
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === current}
                  aria-label={`Review ${i + 1} of ${total}`}
                  onClick={() => setCurrent(i)}
                  className={cn(
                    "rounded-full transition-all duration-300",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-700",
                    i === current
                      ? "h-2.5 w-8 bg-navy-900"
                      : "h-2.5 w-2.5 bg-[var(--border-strong)] hover:bg-[var(--text-disabled)]",
                  )}
                />
              ))}
            </div>

            {/* Next */}
            <button
              onClick={next}
              className={cn(
                "h-10 w-10 rounded-full border border-[var(--border-default)]",
                "bg-[var(--surface-card)] text-[var(--text-secondary)]",
                "hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]",
                "transition-colors",
                "flex items-center justify-center",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-700",
              )}
              aria-label="Next review"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Total review count */}
          <p className="text-center text-xs text-[var(--text-disabled)] mt-4">
            Showing {current + 1} of {total} featured reviews
          </p>
        </div>
      </div>
    </section>
  );
}
