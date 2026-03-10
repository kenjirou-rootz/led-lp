"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { Section } from "@/components/layout";
import { FadeInView } from "@/components/animation";
import {
  sectionHeader,
  sectionOverline,
  sectionTitle,
  staggerContainer,
  staggerItem,
} from "@/lib/animations";
import type { MicroMeshLedData } from "@/lib/sanity";

interface MicroMeshLEDProps {
  data?: MicroMeshLedData;
}

export function MicroMeshLED({ data }: MicroMeshLEDProps) {
  const catchcopy = data?.catchcopy || "次世代マイクロメッシュLED";
  const sellingPointsTitle = data?.sellingPointsTitle || "3つの特長";
  const sellingPoints = data?.sellingPoints || [
    "圧倒的な軽さで設営・撤去がスムーズ",
    "高透過率で空間デザインを損なわない",
    "屋内外問わず高輝度で鮮明な映像表現",
  ];

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
          className="text-center mb-12"
        >
          <motion.div variants={sectionOverline} className="mb-4">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--accent-primary-muted)] border border-[rgba(0,240,255,0.2)]">
              <Sparkles className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
              <span className="font-display text-[10px] font-semibold tracking-[0.2em] uppercase text-[var(--accent-primary)]">
                Micro Mesh LED
              </span>
            </span>
          </motion.div>

          <motion.h2 variants={sectionTitle} className="section-title">
            <span className="text-gradient">{catchcopy.slice(0, 4)}</span>
            <span>{catchcopy.slice(4)}</span>
          </motion.h2>
        </motion.div>

        {/* Device-specific Images */}
        <FadeInView className="mb-12">
          <div className="max-w-4xl mx-auto">
            {/* PC Image */}
            {data?.pcImageUrl ? (
              <div className="hidden md:block rounded-2xl overflow-hidden border border-[var(--border-default)]">
                <Image
                  src={data.pcImageUrl}
                  alt={data.pcImageAlt || catchcopy}
                  width={1200}
                  height={600}
                  className="w-full h-auto object-cover"
                />
              </div>
            ) : (
              <div className="hidden md:flex aspect-[2/1] rounded-2xl bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg-elevated)] border border-[var(--border-default)] items-center justify-center">
                <Sparkles className="w-16 h-16 text-[var(--text-muted)]" />
              </div>
            )}

            {/* Mobile Image */}
            {data?.mobileImageUrl ? (
              <div className="md:hidden rounded-2xl overflow-hidden border border-[var(--border-default)]">
                <Image
                  src={data.mobileImageUrl}
                  alt={data.mobileImageAlt || catchcopy}
                  width={600}
                  height={800}
                  className="w-full h-auto object-cover"
                />
              </div>
            ) : (
              <div className="md:hidden flex aspect-[3/4] rounded-2xl bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg-elevated)] border border-[var(--border-default)] items-center justify-center">
                <Sparkles className="w-12 h-12 text-[var(--text-muted)]" />
              </div>
            )}
          </div>
        </FadeInView>

        {/* Selling Points */}
        <div className="max-w-3xl mx-auto">
          <FadeInView className="text-center mb-8">
            <h3 className="font-display text-xl md:text-2xl font-bold text-[var(--text-primary)] tracking-wide">
              {sellingPointsTitle}
            </h3>
          </FadeInView>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {sellingPoints.map((point, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                className="relative p-6 rounded-xl bg-[var(--bg-card)] border border-[var(--border-default)] transition-all duration-300 hover:border-[var(--accent-primary)]/40 hover:shadow-[var(--glow-card-hover)]"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[var(--accent-primary-muted)] border border-[var(--accent-primary)]/30 flex items-center justify-center">
                    <span className="font-display text-sm font-bold text-[var(--accent-primary)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="text-[var(--text-secondary)] leading-relaxed text-sm">
                    {point}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
