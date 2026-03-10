"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Monitor } from "lucide-react";
import { Section } from "@/components/layout";
import {
  sectionHeader,
  sectionOverline,
  sectionTitle,
  staggerContainer,
  staggerItem,
} from "@/lib/animations";
import type { ProductLineupData } from "@/lib/sanity";

interface ProductLineupProps {
  data?: ProductLineupData;
}

export function ProductLineup({ data }: ProductLineupProps) {
  const sectionTitleText = data?.sectionTitle || "商品ラインナップ";
  const products = data?.products || [];

  if (products.length === 0) return null;

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
              <Monitor className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
              <span className="font-display text-[10px] font-semibold tracking-[0.2em] uppercase text-[var(--accent-primary)]">
                Product Lineup
              </span>
            </span>
          </motion.div>

          <motion.h2 variants={sectionTitle} className="section-title">
            <span className="text-gradient">{sectionTitleText.slice(0, 2)}</span>
            <span>{sectionTitleText.slice(2)}</span>
          </motion.h2>
        </motion.div>

        {/* Product Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {products.map((product, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              className="group rounded-xl bg-[var(--bg-card)] border border-[var(--border-default)] overflow-hidden transition-all duration-300 hover:border-[var(--accent-primary)]/40 hover:shadow-[var(--glow-card-hover)]"
            >
              {/* Thumbnail */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[var(--bg-elevated)]">
                {product.thumbnailUrl ? (
                  <Image
                    src={product.thumbnailUrl}
                    alt={product.thumbnailAlt || product.subtitle}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg-elevated)]">
                    <Monitor className="w-10 h-10 text-[var(--text-muted)]" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-display text-base font-bold text-[var(--text-primary)] tracking-wide mb-2">
                  {product.subtitle}
                </h3>
                {product.attributes && (
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed whitespace-pre-wrap">
                    {product.attributes}
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
