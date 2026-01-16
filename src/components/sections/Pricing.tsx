"use client";

import { motion } from "motion/react";
import { Check, CreditCard, ArrowRight, Sparkles, Zap } from "lucide-react";
import Image from "next/image";
import { Section } from "@/components/layout";
import { Button } from "@/components/ui";
import {
  sectionHeader,
  sectionOverline,
  sectionTitle,
  sectionSubtitle,
} from "@/lib/animations";
import type { PricingPlanData } from "@/lib/sanity";

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: string;
  priceNote: string;
  features: string[];
  isPopular?: boolean;
  ctaText: string;
  imageUrl?: string;
  imageAlt?: string;
}

const defaultPlans: PricingPlan[] = [
  {
    id: "light",
    name: "ライトプラン",
    description: "小規模イベント・会議向け",
    price: "¥50,000",
    priceNote: "〜 / 1日",
    features: [
      "1m × 2m サイズ",
      "基本設置サポート",
      "操作説明",
      "電話サポート",
      "機材保険付き",
    ],
    ctaText: "お見積り",
  },
  {
    id: "standard",
    name: "スタンダードプラン",
    description: "展示会・中規模イベント向け",
    price: "¥150,000",
    priceNote: "〜 / 1日",
    features: [
      "2m × 3m サイズ",
      "設置・撤去サポート",
      "操作説明・リハーサル対応",
      "24時間サポート",
      "代替機即日対応",
      "機材保険付き",
    ],
    isPopular: true,
    ctaText: "お見積り",
  },
  {
    id: "premium",
    name: "プレミアムプラン",
    description: "大規模イベント・コンサート向け",
    price: "¥300,000",
    priceNote: "〜 / 1日",
    features: [
      "4m × 6m〜 サイズ",
      "完全設置・撤去",
      "技術スタッフ常駐",
      "24時間サポート",
      "代替機即日対応",
      "映像制作相談可",
      "機材保険付き",
    ],
    ctaText: "お見積り",
  },
];

interface PricingProps {
  title?: string;
  subtitle?: string;
  plans?: PricingPlan[];
  pricingPlansData?: PricingPlanData[];
}

export function Pricing({
  title = "料金プラン",
  subtitle = "用途と規模に合わせた、明瞭な料金体系をご用意しています。",
  plans = defaultPlans,
  pricingPlansData,
}: PricingProps) {
  // CMSデータがある場合はそちらを使用
  const displayPlans =
    pricingPlansData && pricingPlansData.length > 0
      ? pricingPlansData.map((p) => ({
          id: p._id,
          name: p.planName,
          description: p.recommendedFor || "",
          price: p.price,
          priceNote: p.priceNote || "",
          features: p.features || [],
          isPopular: p.isPopular || false,
          ctaText: "お見積り",
          imageUrl: p.imageUrl,
          imageAlt: p.imageAlt,
        }))
      : plans;

  return (
    <Section id="pricing" variant="grid" className="overflow-hidden">
      {/* Background Effects - LED Matrix inspired */}
      <div className="absolute inset-0 bg-pixel-grid opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-[60%] bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,107,0,0.08)_0%,transparent_50%)] pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200%] h-[40%] bg-[radial-gradient(ellipse_at_50%_100%,rgba(0,240,255,0.05)_0%,transparent_50%)] pointer-events-none" />

      {/* Decorative corner accents */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-[var(--accent-cta)]/20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-[var(--accent-cta)]/20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-[var(--accent-primary)]/20 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-[var(--accent-primary)]/20 pointer-events-none" />

      {/* Section Header */}
      <motion.div
        variants={sectionHeader}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="text-center mb-16 relative z-10"
      >
        {/* Overline */}
        <motion.div variants={sectionOverline} className="mb-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--accent-cta-muted)] border border-[rgba(255,107,0,0.3)]">
            <CreditCard className="w-3.5 h-3.5 text-[var(--accent-cta)]" />
            <span className="font-display text-[10px] font-semibold tracking-[0.2em] uppercase text-[var(--accent-cta)]">
              Pricing
            </span>
          </span>
        </motion.div>

        {/* Title */}
        <motion.h2 variants={sectionTitle} className="section-title">
          <span className="text-gradient-orange">{title.slice(0, 2)}</span>
          <span>{title.slice(2)}</span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          variants={sectionSubtitle}
          className="mt-4 section-subtitle max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>
      </motion.div>

      {/* Pricing Cards - LED Display Style */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 max-w-6xl mx-auto">
        {displayPlans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: index * 0.12,
              ease: [0.19, 1, 0.22, 1],
            }}
            className={`
              group relative
              ${plan.isPopular ? "lg:-mt-4 lg:mb-4 z-10" : "z-0"}
            `}
          >
            {/* Card Container */}
            <div
              className={`
                h-full rounded-2xl flex flex-col relative overflow-hidden transition-all duration-500
                ${
                  plan.isPopular
                    ? "bg-gradient-to-b from-[var(--bg-elevated)] to-[var(--bg-card)] border-2 border-[var(--accent-cta)] shadow-[0_0_50px_rgba(255,107,0,0.2),inset_0_1px_0_rgba(255,255,255,0.05)] hover:shadow-[0_0_80px_rgba(255,107,0,0.35)]"
                    : "bg-[var(--bg-card)] border border-[var(--border-default)] hover:border-[var(--accent-primary)]/50 hover:shadow-[0_0_40px_rgba(0,240,255,0.1)]"
                }
              `}
            >

              {/* Image Section */}
              <div className="relative aspect-[16/9] overflow-hidden">
                {plan.imageUrl ? (
                  <Image
                    src={plan.imageUrl}
                    alt={plan.imageAlt || plan.name}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  /* Default LED-style placeholder */
                  <div className="w-full h-full bg-gradient-to-br from-[var(--bg-secondary)] via-[var(--bg-elevated)] to-[var(--bg-primary)] relative">
                    {/* Pixel grid overlay */}
                    <div className="absolute inset-0 bg-pixel-grid-dense opacity-60" />

                    {/* Decorative LED elements */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className={`
                        relative w-24 h-24 rounded-2xl flex items-center justify-center
                        ${plan.isPopular
                          ? "bg-[var(--accent-cta)]/20 border border-[var(--accent-cta)]/50"
                          : "bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/30"
                        }
                      `}>
                        <Zap className={`w-12 h-12 ${plan.isPopular ? "text-[var(--accent-cta)]" : "text-[var(--accent-primary)]"}`} />

                        {/* Corner dots */}
                        <div className={`absolute -top-1 -left-1 w-2 h-2 rounded-full ${plan.isPopular ? "bg-[var(--accent-cta)]" : "bg-[var(--accent-primary)]"}`} />
                        <div className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${plan.isPopular ? "bg-[var(--accent-cta)]" : "bg-[var(--accent-primary)]"}`} />
                        <div className={`absolute -bottom-1 -left-1 w-2 h-2 rounded-full ${plan.isPopular ? "bg-[var(--accent-cta)]" : "bg-[var(--accent-primary)]"}`} />
                        <div className={`absolute -bottom-1 -right-1 w-2 h-2 rounded-full ${plan.isPopular ? "bg-[var(--accent-cta)]" : "bg-[var(--accent-primary)]"}`} />
                      </div>
                    </div>

                    {/* Scan line effect */}
                    <div className="absolute inset-0 scanline-overlay opacity-30" />
                  </div>
                )}

                {/* Image overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-[var(--bg-card)]/50 to-transparent" />

              </div>

              {/* Content Section */}
              <div className="flex-1 flex flex-col p-6">
                {/* Header */}
                <div className="text-center mb-6">
                  <h3 className={`
                    font-display text-2xl font-bold tracking-wide mb-2
                    ${plan.isPopular ? "text-[var(--accent-cta)]" : "text-[var(--text-primary)]"}
                  `}>
                    {plan.name}
                  </h3>
                  <p className="text-sm text-[var(--text-muted)]">
                    {plan.description}
                  </p>
                </div>

                {/* Price */}
                <div className={`
                  text-center py-4 mb-6 rounded-xl border overflow-hidden
                  ${plan.isPopular
                    ? "bg-[var(--accent-cta)]/5 border-[var(--accent-cta)]/30"
                    : "bg-[var(--bg-elevated)] border-[var(--border-default)]"
                  }
                `}>
                  <div className="flex items-baseline justify-center gap-1 flex-wrap px-2">
                    <span
                      className={`
                        font-display text-3xl sm:text-4xl font-black tracking-tight whitespace-nowrap
                        ${plan.isPopular ? "text-[var(--accent-cta)]" : "text-[var(--text-primary)]"}
                      `}
                    >
                      {plan.price}
                    </span>
                    <span className="text-[var(--text-muted)] text-xs sm:text-sm font-medium whitespace-nowrap">
                      {plan.priceNote}
                    </span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 flex-1">
                  {plan.features.map((feature, fIndex) => (
                    <motion.li
                      key={fIndex}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + fIndex * 0.05 }}
                      className="flex items-start gap-3"
                    >
                      <div
                        className={`
                          w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5
                          ${plan.isPopular ? "bg-[var(--accent-cta)]/20" : "bg-[var(--accent-success)]/20"}
                        `}
                      >
                        <Check
                          className={`w-3 h-3 ${
                            plan.isPopular ? "text-[var(--accent-cta)]" : "text-[var(--accent-success)]"
                          }`}
                        />
                      </div>
                      <span className="text-[var(--text-secondary)] text-sm leading-relaxed">
                        {feature}
                      </span>
                    </motion.li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="mt-6 pt-6 border-t border-[var(--border-default)]">
                  <Button
                    variant={plan.isPopular ? "primary" : "secondary"}
                    className={`
                      w-full group relative overflow-hidden
                      ${plan.isPopular
                        ? "bg-[var(--accent-cta)] hover:bg-[var(--accent-cta-hover)] shadow-[0_4px_20px_rgba(255,107,0,0.3)] hover:shadow-[0_6px_30px_rgba(255,107,0,0.5)]"
                        : "hover:border-[var(--accent-primary)] hover:shadow-[0_4px_20px_rgba(0,240,255,0.15)]"
                      }
                    `}
                    rightIcon={
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    }
                  >
                    {plan.ctaText}
                  </Button>
                </div>
              </div>

              {/* Hover glow effect */}
              <div
                className={`
                  absolute inset-0 rounded-2xl transition-opacity duration-500 opacity-0 group-hover:opacity-100 pointer-events-none
                  ${plan.isPopular
                    ? "shadow-[inset_0_0_30px_rgba(255,107,0,0.1)]"
                    : "shadow-[inset_0_0_30px_rgba(0,240,255,0.05)]"
                  }
                `}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Note */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-16 text-center relative z-10"
      >
        <div className="inline-flex items-start gap-3 px-6 py-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-default)] backdrop-blur-sm">
          <Sparkles className="w-5 h-5 text-[var(--accent-cta)] flex-shrink-0 mt-0.5" />
          <p className="text-sm text-[var(--text-muted)] text-left">
            上記は参考価格です。サイズ・期間・設置場所により変動します。
            <br />
            <span className="text-[var(--accent-cta)] font-medium">
              詳細なお見積りは無料
            </span>
            でご相談ください。
          </p>
        </div>
      </motion.div>
    </Section>
  );
}
