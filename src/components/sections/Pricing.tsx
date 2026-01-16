"use client";

import { motion } from "motion/react";
import { Check, Star, CreditCard, ArrowRight, Sparkles } from "lucide-react";
import { Section } from "@/components/layout";
import { Button } from "@/components/ui";
import { StaggerContainer, StaggerItem } from "@/components/animation";
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
        }))
      : plans;

  return (
    <Section id="pricing" variant="grid" className="overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-[50%] bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,107,0,0.06)_0%,transparent_50%)] pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200%] h-[50%] bg-[radial-gradient(ellipse_at_50%_100%,rgba(0,240,255,0.04)_0%,transparent_50%)] pointer-events-none" />

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
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--accent-primary-muted)] border border-[rgba(0,240,255,0.2)]">
            <CreditCard className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
            <span className="font-display text-[10px] font-semibold tracking-[0.2em] uppercase text-[var(--accent-primary)]">
              Pricing
            </span>
          </span>
        </motion.div>

        {/* Title */}
        <motion.h2 variants={sectionTitle} className="section-title">
          <span className="text-gradient">{title.slice(0, 2)}</span>
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

      {/* Pricing Cards */}
      <StaggerContainer
        speed="slow"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 relative z-10"
      >
        {displayPlans.map((plan, index) => (
          <StaggerItem key={plan.id}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: index * 0.15,
                ease: [0.19, 1, 0.22, 1],
              }}
              className={`
                group relative h-full
                ${plan.isPopular ? "lg:-mt-6 lg:mb-6" : ""}
              `}
            >
              <div
                className={`
                  h-full rounded-2xl flex flex-col relative overflow-hidden transition-all duration-500
                  ${
                    plan.isPopular
                      ? "bg-[var(--bg-card)] border-2 border-[var(--accent-cta)]/50 shadow-[0_0_40px_rgba(255,107,0,0.15)] hover:shadow-[0_0_60px_rgba(255,107,0,0.25)] hover:border-[var(--accent-cta)]"
                      : "bg-[var(--bg-card)] border border-[var(--border-default)] hover:border-[var(--accent-primary)]/40 hover:shadow-[var(--glow-card-hover)]"
                  }
                `}
              >
                {/* Popular Glow Effect */}
                {plan.isPopular && (
                  <div className="absolute inset-0 bg-gradient-to-b from-[rgba(255,107,0,0.05)] to-transparent pointer-events-none" />
                )}

                {/* Popular Badge */}
                {plan.isPopular && (
                  <div className="absolute -top-px left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--accent-cta)] to-transparent" />
                )}

                {plan.isPopular && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-display font-bold tracking-[0.1em] uppercase rounded-lg bg-[var(--accent-cta)] text-white shadow-[var(--glow-orange)]">
                      <Star className="w-3 h-3 fill-current" />
                      人気No.1
                    </span>
                  </div>
                )}

                {/* Header */}
                <div className="p-6 pb-0">
                  <div className="text-center pb-6 border-b border-[var(--border-default)]">
                    <h3 className="font-display text-xl font-bold text-[var(--text-primary)] tracking-wide mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-sm text-[var(--text-muted)] mb-5">
                      {plan.description}
                    </p>
                    <div className="flex items-baseline justify-center gap-1">
                      <span
                        className={`font-display text-4xl md:text-5xl font-black tracking-tight ${
                          plan.isPopular
                            ? "text-[var(--accent-cta)]"
                            : "text-[var(--text-primary)]"
                        }`}
                      >
                        {plan.price}
                      </span>
                      <span className="text-[var(--text-muted)] text-sm">
                        {plan.priceNote}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="flex-1 p-6">
                  <ul className="space-y-4">
                    {plan.features.map((feature, fIndex) => (
                      <motion.li
                        key={fIndex}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + fIndex * 0.05 }}
                        className="flex items-start gap-3"
                      >
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            plan.isPopular
                              ? "bg-[var(--accent-cta)]/20"
                              : "bg-[var(--accent-success)]/20"
                          }`}
                        >
                          <Check
                            className={`w-3 h-3 ${
                              plan.isPopular
                                ? "text-[var(--accent-cta)]"
                                : "text-[var(--accent-success)]"
                            }`}
                          />
                        </div>
                        <span className="text-[var(--text-secondary)] text-sm">
                          {feature}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="p-6 pt-0">
                  <Button
                    variant={plan.isPopular ? "primary" : "secondary"}
                    className={`w-full group ${
                      plan.isPopular
                        ? "bg-[var(--accent-cta)] hover:bg-[var(--accent-cta-hover)] shadow-[var(--glow-orange)]"
                        : ""
                    }`}
                    rightIcon={
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    }
                  >
                    {plan.ctaText}
                  </Button>
                </div>

                {/* Hover Border Glow */}
                <div
                  className={`absolute inset-0 rounded-2xl transition-opacity duration-500 opacity-0 group-hover:opacity-100 pointer-events-none border ${
                    plan.isPopular
                      ? "border-[var(--accent-cta)]/30"
                      : "border-[var(--accent-primary)]/20"
                  }`}
                />
              </div>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Note */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-12 text-center relative z-10"
      >
        <div className="inline-flex items-start gap-3 px-6 py-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-default)]">
          <Sparkles className="w-5 h-5 text-[var(--accent-primary)] flex-shrink-0 mt-0.5" />
          <p className="text-sm text-[var(--text-muted)] text-left">
            上記は参考価格です。サイズ・期間・設置場所により変動します。
            <br />
            <span className="text-[var(--accent-primary)]">
              詳細なお見積りは無料
            </span>
            でご相談ください。
          </p>
        </div>
      </motion.div>
    </Section>
  );
}
