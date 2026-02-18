"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Zap } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/ui";
import { Button } from "@/components/ui";
import type { SiteSettings } from "@/lib/sanity";

const navLinks = [
  { label: "選ばれる理由", href: "#reason" },
  { label: "導入事例", href: "#case-study" },
  { label: "用途別提案", href: "#use-cases" },
  { label: "料金", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

// スムーズスクロール関数
const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  e.preventDefault();
  const targetId = href.replace("#", "");
  const element = document.getElementById(targetId);
  if (element) {
    const headerHeight = 80; // ヘッダーの高さ分オフセット
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - headerHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};

interface HeaderProps {
  siteSettings?: SiteSettings;
}

export function Header({ siteSettings }: HeaderProps) {
  const siteName = siteSettings?.siteName || "Rootz LED";
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`
        fixed top-0 left-0 right-0 z-[1000]
        transition-all duration-500
        ${isScrolled
          ? "bg-[--bg-primary]/95 backdrop-blur-xl border-b border-[--accent-primary]/10 shadow-[0_4px_30px_rgba(0,240,255,0.05)]"
          : "bg-transparent"
        }
      `}
    >
      {/* Subtle top glow line when scrolled */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{
          scaleX: isScrolled ? 1 : 0,
          opacity: isScrolled ? 1 : 0
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[--accent-primary]/50 to-transparent origin-center"
      />

      <Container className="relative z-10">
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.a
            href="#"
            className="flex items-center gap-3 group"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            {/* Logo / Icon Mark */}
            <div className="relative">
              {siteSettings?.logoUrl ? (
                <Image
                  src={siteSettings.logoUrl}
                  alt={siteSettings.logoAlt || siteName}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-xl object-contain transition-all duration-300 group-hover:shadow-[var(--glow-cyan)]"
                />
              ) : (
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[--accent-primary] via-[--accent-secondary] to-[--accent-primary] flex items-center justify-center transition-all duration-300 group-hover:shadow-[var(--glow-cyan)]">
                  <Zap className="w-5 h-5 text-white fill-white" />
                </div>
              )}
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[--accent-primary] to-[--accent-secondary] blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
            </div>

            {/* Brand Text */}
            <div className="hidden sm:flex items-baseline gap-1.5">
              <span className="font-display text-xs font-bold tracking-[0.2em] text-[--accent-primary] uppercase">
                LED
              </span>
              <span className="font-display text-lg font-bold tracking-wide text-[--text-primary] group-hover:text-[--accent-primary] transition-colors duration-300">
                {siteName}
              </span>
            </div>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.1 + index * 0.05,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="nav-link relative px-4 py-2 font-display text-[13px] font-medium tracking-[0.05em] text-[--text-secondary] hover:text-[--text-primary] transition-colors duration-300 group"
              >
                {link.label}
                {/* Animated underline */}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-[--accent-primary] to-[--accent-secondary] group-hover:w-[calc(100%-1.5rem)] transition-all duration-300 ease-out rounded-full" />
                {/* Subtle glow on hover */}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[--accent-primary] blur-sm group-hover:w-[calc(100%-2rem)] transition-all duration-300 ease-out opacity-60" />
              </motion.a>
            ))}
          </div>

          {/* CTA Area */}
          <div className="hidden md:flex items-center gap-4">
            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Button
                size="sm"
                className="relative overflow-hidden bg-gradient-to-r from-[--accent-cta] to-[--accent-cta-hover] hover:shadow-[var(--glow-orange)] transition-shadow duration-300 font-display tracking-wide"
              >
                <span className="relative z-10">無料相談</span>
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden relative p-2.5 rounded-xl text-[--text-primary] hover:bg-[--accent-primary]/10 transition-colors duration-300"
            aria-label={isMobileMenuOpen ? "メニューを閉じる" : "メニューを開く"}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </nav>
      </Container>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden bg-[--bg-primary]/98 backdrop-blur-xl border-b border-[--accent-primary]/10"
          >
            {/* Decorative line */}
            <div className="h-[1px] bg-gradient-to-r from-transparent via-[--accent-primary]/30 to-transparent" />

            <Container>
              <div className="py-6 space-y-2">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      scrollToSection(e, link.href);
                      setIsMobileMenuOpen(false);
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.05,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    className="flex items-center gap-3 py-3 px-4 rounded-xl font-display text-[15px] tracking-wide text-[--text-secondary] hover:text-[--text-primary] hover:bg-[--accent-primary]/5 transition-all duration-300 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[--accent-primary]/40 group-hover:bg-[--accent-primary] group-hover:shadow-[0_0_8px_var(--accent-primary)] transition-all duration-300" />
                    {link.label}
                  </motion.a>
                ))}

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="pt-4 mt-4 border-t border-[--border-default]"
                >
                  <Button className="w-full bg-gradient-to-r from-[--accent-cta] to-[--accent-cta-hover] hover:shadow-[var(--glow-orange)] transition-shadow duration-300 font-display tracking-wide">
                    無料相談
                  </Button>
                </motion.div>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
