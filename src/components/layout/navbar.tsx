"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Search, ChevronDown, Bell, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { NAV_LINKS, APP_NAME } from "@/constants";

// ------ Hook: track scroll position for navbar transparency --

function useScrolled(threshold = 16): boolean {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [threshold]);

  return scrolled;
}

// ------ Logo ------------------------------------------------

function NavLogo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-700 rounded-md"
      aria-label={`${APP_NAME} — go to homepage`}
    >
      {/* Mark */}
      <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-navy-900">
        <span className="text-white font-bold text-sm tracking-tight" aria-hidden="true">P</span>
      </div>
      {/* Wordmark */}
      <span className="font-bold text-lg text-[var(--text-primary)] tracking-tight leading-none">
        Pro<span className="text-emerald-500">Serve</span>
      </span>
    </Link>
  );
}

// ------ Desktop Nav Links -----------------------------------

interface NavLinksProps {
  pathname: string;
}

function DesktopNavLinks({ pathname }: NavLinksProps) {
  return (
    <nav aria-label="Primary navigation">
      <ul className="flex items-center gap-1" role="list">
        {NAV_LINKS.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "px-3.5 py-2 rounded-lg text-sm font-medium transition-colors duration-150",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-700",
                  isActive
                    ? "text-navy-900 bg-navy-50"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

// ------ Navbar Actions (CTA buttons) -----------------------

function NavActions() {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        aria-label="Search services"
        className="hidden md:inline-flex"
      >
        <Search size={18} />
      </Button>

      <Link
        href="/login"
        className={cn(buttonVariants({ variant: "ghost", size: "md" }))}
      >
        Sign in
      </Link>

      <Link
        href="/register"
        className={cn(buttonVariants({ variant: "primary", size: "md" }))}
      >
        Get started
      </Link>
    </div>
  );
}

// ------ Mobile Menu -----------------------------------------

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
}

function MobileMenu({ isOpen, onClose, pathname }: MobileMenuProps) {
  // Trap scroll when menu open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative ml-auto h-full w-80 max-w-full bg-[var(--surface-card)] shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[var(--border-subtle)]">
          <NavLogo />
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
            aria-label="Close navigation menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Links */}
        <nav className="flex-1 p-5 space-y-1" aria-label="Mobile navigation links">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={cn(
                  "flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                  isActive
                    ? "text-navy-900 bg-navy-50 font-semibold"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer actions */}
        <div className="p-5 border-t border-[var(--border-subtle)] space-y-3 flex flex-col">
          <Link
            href="/login"
            onClick={onClose}
            className={cn(buttonVariants({ variant: "outline", size: "md" }), "w-full text-center")}
          >
            Sign in
          </Link>
          <Link
            href="/register"
            onClick={onClose}
            className={cn(buttonVariants({ variant: "primary", size: "md" }), "w-full text-center")}
          >
            Get started free
          </Link>
        </div>
      </div>
    </div>
  );
}

// ------ Navbar Root -----------------------------------------

export function Navbar() {
  const pathname = usePathname();
  const scrolled = useScrolled();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-40",
          "transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
          scrolled
            ? "bg-[var(--surface-card)]/95 backdrop-blur-md shadow-sm border-b border-[var(--border-subtle)]"
            : "bg-transparent"
        )}
        role="banner"
      >
        <div className="container-section">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Left: Logo */}
            <NavLogo />

            {/* Center: Desktop Nav */}
            <div className="hidden lg:flex">
              <DesktopNavLinks pathname={pathname} />
            </div>

            {/* Right: Actions */}
            <div className="hidden lg:flex">
              <NavActions />
            </div>

            {/* Mobile: Hamburger */}
            <button
              className={cn(
                "lg:hidden p-2 rounded-lg transition-colors",
                "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-700"
              )}
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        pathname={pathname}
      />
    </>
  );
}
