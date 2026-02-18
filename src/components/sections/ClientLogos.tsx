"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Building2 } from "lucide-react";
import { Section } from "@/components/layout";
import { FadeInView } from "@/components/animation";
import type { ClientLogoData } from "@/lib/sanity";

interface ClientLogo {
  id: string;
  name: string;
  logoUrl?: string;
}

const defaultLogos: ClientLogo[] = [
  { id: "1", name: "企業A" },
  { id: "2", name: "企業B" },
  { id: "3", name: "企業C" },
  { id: "4", name: "企業D" },
  { id: "5", name: "企業E" },
  { id: "6", name: "企業F" },
  { id: "7", name: "企業G" },
  { id: "8", name: "企業H" },
];

interface ClientLogosProps {
  title?: string;
  logos?: ClientLogo[];
  clientLogosData?: ClientLogoData[];
}

export function ClientLogos({
  title = "主要取引先",
  logos = defaultLogos,
  clientLogosData,
}: ClientLogosProps) {
  // CMSデータがある場合はそちらを使用
  const displayLogos =
    clientLogosData && clientLogosData.length > 0
      ? clientLogosData.map((c) => ({
          id: c._id,
          name: c.companyName,
          logoUrl: c.logoUrl,
        }))
      : logos;

  // Double the logos for seamless infinite scroll
  const duplicatedLogos = [...displayLogos, ...displayLogos];

  return (
    <Section
      variant="default"
      noPadding
      className="py-16 md:py-20 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-pixel-grid opacity-15 pointer-events-none" />

      {/* Section Header */}
      <div className="text-center mb-12 relative z-10">
        <FadeInView>
          {/* Overline */}
          <div className="mb-4">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--accent-primary-muted)] border border-[rgba(0,240,255,0.2)]">
              <Building2 className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
              <span className="font-display text-[10px] font-semibold tracking-[0.2em] uppercase text-[var(--accent-primary)]">
                Trusted By
              </span>
            </span>
          </div>

          {/* Title */}
          <h3 className="section-title mb-3">
            <span className="text-gradient">{title.slice(0, 2)}</span>
            <span>{title.slice(2)}</span>
          </h3>

        </FadeInView>
      </div>

      {/* Infinite Scroll Container */}
      <div className="relative">
        {/* Gradient Masks - LED style */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-[var(--bg-primary)] via-[var(--bg-primary)]/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-[var(--bg-primary)] via-[var(--bg-primary)]/80 to-transparent z-10 pointer-events-none" />

        {/* Decorative LED Lines */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent-primary)]/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent-primary)]/20 to-transparent" />

        {/* Scrolling Logos */}
        <motion.div
          className="flex gap-6 md:gap-8 py-6"
          animate={{
            x: [0, -160 * displayLogos.length],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 25,
              ease: "linear",
            },
          }}
        >
          {duplicatedLogos.map((logo, index) => (
            <div
              key={`${logo.id}-${index}`}
              className="group flex-shrink-0 w-36 h-20 md:w-44 md:h-24 bg-[var(--bg-card)] rounded-xl border border-[var(--border-default)] flex items-center justify-center px-5 transition-all duration-500 hover:border-[var(--accent-primary)]/40 hover:shadow-[var(--glow-card-hover)]"
            >
              {logo.logoUrl ? (
                <Image
                  src={logo.logoUrl}
                  alt={logo.name}
                  width={120}
                  height={60}
                  className="max-w-full max-h-full object-contain opacity-50 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0"
                />
              ) : (
                <div className="flex flex-col items-center gap-1">
                  <div className="w-8 h-8 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-default)] flex items-center justify-center">
                    <Building2 className="w-4 h-4 text-[var(--text-muted)]" />
                  </div>
                  <span className="text-[var(--text-muted)] text-xs font-medium">
                    {logo.name}
                  </span>
                </div>
              )}
            </div>
          ))}
        </motion.div>
      </div>

    </Section>
  );
}
