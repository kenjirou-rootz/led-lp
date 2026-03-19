"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { Section } from "@/components/layout";
import { Button } from "@/components/ui";
import {
  sectionHeader,
  sectionOverline,
  sectionTitle,
  sectionSubtitle,
  fadeInUp,
} from "@/lib/animations";
import type { LEDSalesData } from "@/lib/sanity";

interface LEDSalesProps {
  data?: LEDSalesData;
}

export function LEDSales({ data }: LEDSalesProps) {
  const subtitle = data?.subtitle || "LED販売サービス";
  const description = data?.description || "";
  const ctaButtonText = data?.ctaButtonText || "詳しく見る";
  const ctaButtonUrl = data?.ctaButtonUrl;

  return (
    <Section variant="default" className="relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-pixel-grid opacity-15 pointer-events-none" />

      <div className="relative z-10">
        {/* Section Header */}
        <motion.div
          variants={sectionHeader}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-14"
        >
          <motion.div variants={sectionOverline} className="mb-4">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--accent-cta-muted)] border border-[rgba(255,107,0,0.3)]">
              <ShoppingCart className="w-3.5 h-3.5 text-[var(--accent-cta)]" />
              <span className="font-display text-[10px] font-semibold tracking-[0.2em] uppercase text-[var(--accent-cta)]">
                LED Sales
              </span>
            </span>
          </motion.div>

          <motion.h2 variants={sectionTitle} className="section-title">
            {subtitle}
          </motion.h2>
        </motion.div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
          {/* Image */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[var(--border-default)] bg-[var(--bg-card)]"
          >
            {data?.imageUrl ? (
              <Image
                src={data.imageUrl}
                alt={data.imageAlt || subtitle}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg-elevated)]">
                <ShoppingCart className="w-16 h-16 text-[var(--text-muted)]" />
              </div>
            )}
          </motion.div>

          {/* Text + CTA */}
          <motion.div
            variants={sectionSubtitle}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {description && (
              <p className="text-[var(--text-secondary)] leading-relaxed whitespace-pre-wrap mb-8">
                {description}
              </p>
            )}

            {ctaButtonUrl && (
              <Button
                variant="primary"
                size="lg"
                className="group bg-[var(--accent-cta)] hover:bg-[var(--accent-cta-hover)] shadow-[var(--glow-orange)]"
                rightIcon={
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                }
                onClick={() => window.open(ctaButtonUrl, "_blank", "noopener,noreferrer")}
              >
                {ctaButtonText}
              </Button>
            )}
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
