"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Phone } from "lucide-react";
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

interface HeaderProps {
  siteSettings?: SiteSettings;
}

export function Header({ siteSettings }: HeaderProps) {
  const siteName = siteSettings?.siteName || "LEDビジョンレンタル";
  const phoneNumber = siteSettings?.contactPhone || "0120-XXX-XXX";
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
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`
        fixed top-0 left-0 right-0 z-[--z-fixed]
        transition-all duration-300
        ${isScrolled
          ? "bg-[--bg-primary]/90 backdrop-blur-md border-b border-[--border-default]"
          : "bg-transparent"
        }
      `}
    >
      <Container className="relative z-10">
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[--accent-primary] to-[--accent-secondary] flex items-center justify-center">
              <span className="text-white font-bold text-sm">LED</span>
            </div>
            <span className="font-bold text-lg text-[--text-primary] hidden sm:inline">
              {siteName}
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-[--text-secondary] hover:text-[--text-primary] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={`tel:${phoneNumber.replace(/-/g, "")}`}
              className="flex items-center gap-2 text-sm text-[--text-secondary] hover:text-[--text-primary] transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>{phoneNumber}</span>
            </a>
            <Button size="sm">無料相談</Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-[--text-primary]"
            aria-label={isMobileMenuOpen ? "メニューを閉じる" : "メニューを開く"}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </Container>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-[--bg-primary] border-b border-[--border-default]"
          >
            <Container>
              <div className="py-4 space-y-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2 text-[--text-secondary] hover:text-[--text-primary] transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="pt-4 border-t border-[--border-default] space-y-3">
                  <a
                    href={`tel:${phoneNumber.replace(/-/g, "")}`}
                    className="flex items-center gap-2 text-[--text-secondary]"
                  >
                    <Phone className="w-4 h-4" />
                    <span>{phoneNumber}</span>
                  </a>
                  <Button className="w-full">無料相談</Button>
                </div>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
