"use client";

import { motion } from "motion/react";
import { Section } from "@/components/layout";
import { Heading } from "@/components/ui";
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
  subtitle?: string;
  logos?: ClientLogo[];
  clientLogosData?: ClientLogoData[];
}

export function ClientLogos({
  title = "主要取引先",
  subtitle = "東証プライム上場企業を含む、多くの企業様にご利用いただいています。",
  logos = defaultLogos,
  clientLogosData,
}: ClientLogosProps) {
  // CMSデータがある場合はそちらを使用
  const displayLogos = clientLogosData && clientLogosData.length > 0
    ? clientLogosData.map((c) => ({
        id: c._id,
        name: c.companyName,
        logoUrl: c.logoUrl,
      }))
    : logos;
  // Double the logos for seamless infinite scroll
  const duplicatedLogos = [...displayLogos, ...displayLogos];

  return (
    <Section variant="alt" noPadding className="py-12 md:py-16 overflow-hidden">
      <div className="text-center mb-10">
        <FadeInView>
          <Heading as="h3" animateOnScroll={false} className="text-lg md:text-xl mb-2">
            {title}
          </Heading>
          <p className="text-sm text-[--text-muted]">{subtitle}</p>
        </FadeInView>
      </div>

      {/* Infinite Scroll Container */}
      <div className="relative">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-[--bg-secondary] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-[--bg-secondary] to-transparent z-10" />

        {/* Scrolling Logos */}
        <motion.div
          className="flex gap-8 md:gap-12"
          animate={{
            x: [0, -50 * displayLogos.length],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            },
          }}
        >
          {duplicatedLogos.map((logo, index) => (
            <div
              key={`${logo.id}-${index}`}
              className="flex-shrink-0 w-32 h-16 md:w-40 md:h-20 bg-[--bg-card] rounded-lg border border-[--border-default] flex items-center justify-center px-4"
            >
              {logo.logoUrl ? (
                <img
                  src={logo.logoUrl}
                  alt={logo.name}
                  className="max-w-full max-h-full object-contain opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                />
              ) : (
                <span className="text-[--text-muted] text-sm font-medium">
                  {logo.name}
                </span>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
