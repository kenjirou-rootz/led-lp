"use client";

import { motion } from "motion/react";
import { ClipboardList } from "lucide-react";
import { Section } from "@/components/layout";
import {
  sectionHeader,
  sectionOverline,
  sectionTitle,
  staggerContainer,
  staggerItem,
} from "@/lib/animations";
import type { ServiceFlowData } from "@/lib/sanity";

interface ServiceFlowProps {
  data?: ServiceFlowData;
}

export function ServiceFlow({ data }: ServiceFlowProps) {
  const sectionTitleText = data?.sectionTitle || "サービスの流れ";
  const steps = data?.steps || [];

  if (steps.length === 0) return null;

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
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--accent-primary-muted)] border border-[rgba(0,240,255,0.2)]">
              <ClipboardList className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
              <span className="font-display text-[10px] font-semibold tracking-[0.2em] uppercase text-[var(--accent-primary)]">
                Service Flow
              </span>
            </span>
          </motion.div>

          <motion.h2 variants={sectionTitle} className="section-title">
            {sectionTitleText}
          </motion.h2>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="max-w-3xl mx-auto"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              className="relative flex gap-6 pb-10 last:pb-0"
            >
              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div className="absolute left-6 top-14 bottom-0 w-[2px] bg-gradient-to-b from-[var(--accent-primary)]/40 to-[var(--accent-primary)]/10" />
              )}

              {/* Step Number */}
              <div className="flex-shrink-0 relative z-10">
                <div className="w-12 h-12 rounded-full bg-[var(--accent-primary-muted)] border-2 border-[var(--accent-primary)]/50 flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.2)]">
                  <span className="font-display text-lg font-bold text-[var(--accent-primary)]">
                    {index + 1}
                  </span>
                </div>
              </div>

              {/* Step Content */}
              <div className="flex-1 pt-1">
                <h3 className="font-display text-lg font-bold text-[var(--text-primary)] tracking-wide mb-2">
                  {step.title}
                </h3>
                {step.description && (
                  <p className="text-[var(--text-secondary)] leading-relaxed text-sm whitespace-pre-wrap">
                    {step.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
