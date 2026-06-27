import { Search, CalendarCheck, Star } from "lucide-react";
import { cn } from "@/lib/utils";

// ------ Steps Data ------------------------------------------

const STEPS = [
  {
    step: "01",
    icon: Search,
    title: "Search & Compare",
    description:
      "Browse hundreds of verified professionals in your area. Filter by category, price, ratings, and availability to find your perfect match.",
    color: "text-navy-700",
    bgColor: "bg-navy-50",
    borderColor: "border-navy-200",
    connectorColor: "bg-navy-200",
  },
  {
    step: "02",
    icon: CalendarCheck,
    title: "Book Instantly",
    description:
      "Select your preferred time slot, provide service details, and confirm your booking in under 60 seconds. No phone calls required.",
    color: "text-emerald-700",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    connectorColor: "bg-emerald-200",
  },
  {
    step: "03",
    icon: Star,
    title: "Get It Done & Review",
    description:
      "Your verified professional arrives on time. Pay securely through the platform. Leave a review to help the community.",
    color: "text-gold-700",
    bgColor: "bg-gold-50",
    borderColor: "border-gold-200",
    connectorColor: "bg-gold-200",
  },
] as const;

// ------ Section ---------------------------------------------

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="section-padding"
      aria-labelledby="how-it-works-heading"
    >
      <div className="container-section">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <p className="text-sm font-semibold text-emerald-600 uppercase tracking-widest">
            Simple Process
          </p>
          <h2 id="how-it-works-heading" className="text-[var(--text-primary)]">
            How ProServe Works
          </h2>
          <p className="text-[var(--text-secondary)] text-base text-balance">
            From search to completion in three simple steps. We handle the vetting, 
            you enjoy the results.
          </p>
        </div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Connector lines (desktop) */}
          <div
            className="hidden md:block absolute top-12 left-[33.33%] right-[33.33%] h-0.5 bg-gradient-to-r from-navy-200 via-emerald-200 to-gold-200"
            aria-hidden="true"
          />

          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                className={cn(
                  "relative flex flex-col items-center text-center gap-5",
                  "md:items-center",
                )}
              >
                {/* Step Number + Icon */}
                <div className="relative flex flex-col items-center gap-3">
                  {/* Step number */}
                  <span
                    className="text-xs font-bold text-[var(--text-disabled)] tracking-[0.2em] uppercase"
                    aria-label={`Step ${index + 1}`}
                  >
                    {step.step}
                  </span>

                  {/* Icon circle */}
                  <div
                    className={cn(
                      "h-24 w-24 rounded-3xl flex items-center justify-center",
                      "border-2 shadow-sm",
                      step.bgColor,
                      step.borderColor,
                      "relative z-10 bg-[var(--surface-card)]",
                      "transition-transform duration-300 hover:scale-105",
                    )}
                    aria-hidden="true"
                  >
                    <Icon size={36} className={step.color} />
                  </div>
                </div>

                {/* Text */}
                <div className="space-y-2 max-w-xs">
                  <h3 className="text-lg font-bold text-[var(--text-primary)]">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Guarantee strip */}
        <div className={cn(
          "mt-16 rounded-2xl p-6 lg:p-8",
          "bg-navy-950 text-white",
          "flex flex-col sm:flex-row items-center justify-between gap-6",
        )}>
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-bold mb-1">
              100% Satisfaction Guarantee
            </h3>
            <p className="text-sm text-navy-300">
              Not happy with the result? We'll arrange a re-do at no extra cost, or issue a full refund.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex -space-x-2">
              {["FA", "AK", "MB"].map((initials) => (
                <div
                  key={initials}
                  className="h-9 w-9 rounded-full ring-2 ring-navy-900 bg-navy-700 flex items-center justify-center text-[10px] font-bold text-white"
                  aria-hidden="true"
                >
                  {initials}
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={12} className="fill-gold-400 stroke-gold-400" aria-hidden="true" />
                ))}
              </div>
              <p className="text-xs text-navy-400 mt-0.5">Rated 4.9/5 by 50,000+ customers</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
