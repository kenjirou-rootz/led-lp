"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Presentation,
  PartyPopper,
  Building,
  Megaphone,
  Store,
  GraduationCap,
  Layers,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/layout";
import { Button } from "@/components/ui";
import {
  sectionHeader,
  sectionOverline,
  sectionTitle,
  sectionSubtitle,
} from "@/lib/animations";
import type { UseCaseData } from "@/lib/sanity";

interface UseCase {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  recommendedSize: string;
  budget: string;
}

// カテゴリからアイコンを取得
const categoryIcons: Record<string, LucideIcon> = {
  exhibition: Presentation,
  live: PartyPopper,
  signage: Megaphone,
};

// Portable Textからプレーンテキストを抽出
function extractPlainText(blocks: unknown[]): string {
  if (!blocks || !Array.isArray(blocks)) return "";
  return blocks
    .filter(
      (block: unknown) => (block as { _type?: string })._type === "block"
    )
    .map((block: unknown) => {
      const typedBlock = block as { children?: Array<{ text?: string }> };
      return (
        typedBlock.children?.map((child) => child.text || "").join("") || ""
      );
    })
    .join("\n");
}

const defaultUseCases: UseCase[] = [
  {
    id: "exhibition",
    icon: Presentation,
    title: "展示会・見本市",
    description:
      "ブース全体のインパクトを高め、来場者の注目を集めます。競合との差別化に効果的です。",
    features: [
      "高輝度で明るい会場でも鮮明",
      "カスタムサイズ対応",
      "設営撤去サポート付き",
    ],
    recommendedSize: "2m × 3m 〜",
    budget: "1日 ¥150,000〜",
  },
  {
    id: "event",
    icon: PartyPopper,
    title: "イベント・コンサート",
    description:
      "ステージ演出を最大化し、観客の没入感を高めます。大規模なイベントにも対応可能です。",
    features: ["超大型サイズ対応", "リアルタイム映像連携", "特殊形状も相談可"],
    recommendedSize: "4m × 6m 〜",
    budget: "1日 ¥300,000〜",
  },
  {
    id: "corporate",
    icon: Building,
    title: "企業説明会・株主総会",
    description:
      "プレゼンテーションの説得力を高め、参加者の理解度を向上させます。",
    features: ["高解像度で資料も鮮明", "音響機材セット可能", "控えめな設置対応"],
    recommendedSize: "1.5m × 2.5m 〜",
    budget: "1日 ¥80,000〜",
  },
  {
    id: "advertisement",
    icon: Megaphone,
    title: "広告・プロモーション",
    description:
      "屋外・屋内問わず、高い視認性で効果的な広告展開を実現します。",
    features: ["屋外対応モデルあり", "24時間稼働対応", "コンテンツ制作相談可"],
    recommendedSize: "サイズ応相談",
    budget: "月額 ¥200,000〜",
  },
  {
    id: "retail",
    icon: Store,
    title: "店舗・商業施設",
    description:
      "来店客の目を引き、購買意欲を高める演出を実現します。",
    features: ["スリムタイプ対応", "省電力モデルあり", "長期レンタル割引"],
    recommendedSize: "設置場所に応じて",
    budget: "1日 ¥50,000〜",
  },
  {
    id: "education",
    icon: GraduationCap,
    title: "教育・研修",
    description: "大人数での視認性を確保し、学習効果を高めます。",
    features: ["持ち運び可能なモデル", "簡単セットアップ", "教育機関割引"],
    recommendedSize: "1m × 2m 〜",
    budget: "1日 ¥40,000〜",
  },
];

interface UseCasesProps {
  title?: string;
  subtitle?: string;
  useCases?: UseCase[];
  useCasesData?: UseCaseData[];
}

export function UseCases({
  title = "用途別提案",
  subtitle = "ご利用シーンに合わせて、最適なプランをご提案します。",
  useCases = defaultUseCases,
  useCasesData,
}: UseCasesProps) {
  // CMSデータがある場合はそちらを使用
  const displayUseCases =
    useCasesData && useCasesData.length > 0
      ? useCasesData.map((u) => ({
          id: u._id,
          icon: categoryIcons[u.category] || Presentation,
          title: u.tabLabel,
          description: extractPlainText(u.description || []),
          features: u.recommendedEquipment?.map((e) => e.name || "") || [],
          recommendedSize: u.recommendedEquipment?.[0]?.spec || "",
          budget: u.recommendedEquipment?.[0]?.note || "",
        }))
      : useCases;

  const [activeTab, setActiveTab] = useState(displayUseCases[0]?.id || "");
  const activeCase =
    displayUseCases.find((uc) => uc.id === activeTab) || displayUseCases[0];

  return (
    <Section id="use-cases" variant="spotlight" className="overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-pixel-grid opacity-25 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,240,255,0.04)_0%,transparent_50%)] pointer-events-none" />

      {/* Section Header */}
      <motion.div
        variants={sectionHeader}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="text-center mb-12 relative z-10"
      >
        {/* Overline */}
        <motion.div variants={sectionOverline} className="mb-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--accent-primary-muted)] border border-[rgba(0,240,255,0.2)]">
            <Layers className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
            <span className="font-display text-[10px] font-semibold tracking-[0.2em] uppercase text-[var(--accent-primary)]">
              Use Cases
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

      {/* Tab Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-10 relative z-10"
      >
        <div className="flex flex-wrap justify-center gap-2 md:gap-3">
          {displayUseCases.map((useCase) => {
            const Icon = useCase.icon;
            const isActive = activeTab === useCase.id;

            return (
              <button
                key={useCase.id}
                onClick={() => setActiveTab(useCase.id)}
                className={`
                  group flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium
                  transition-all duration-300 border
                  ${
                    isActive
                      ? "bg-[var(--accent-primary)] text-white border-[var(--accent-primary)] shadow-[var(--glow-cyan-subtle)]"
                      : "bg-[var(--bg-card)] text-[var(--text-secondary)] border-[var(--border-default)] hover:text-[var(--text-primary)] hover:border-[var(--accent-primary)]/40"
                  }
                `}
              >
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive
                      ? "text-white"
                      : "text-[var(--accent-primary)] group-hover:text-[var(--accent-primary)]"
                  }`}
                />
                <span className="hidden sm:inline font-display tracking-wide">
                  {useCase.title}
                </span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Tab Content */}
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
          >
            <div className="rounded-2xl bg-[var(--bg-card)] border border-[var(--accent-primary)]/30 overflow-hidden shadow-[var(--glow-cyan-subtle)]">
              {/* Decorative Top Line */}
              <div className="h-[2px] bg-gradient-to-r from-transparent via-[var(--accent-primary)] to-transparent" />

              <div className="p-6 md:p-10">
                <div className="flex flex-col lg:flex-row gap-10">
                  {/* Left: Main Info */}
                  <div className="lg:w-2/3">
                    <div className="flex items-center gap-5 mb-8">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-cta)] flex items-center justify-center shadow-[var(--glow-cyan-subtle)]">
                          <activeCase.icon className="w-8 h-8 text-white" />
                        </div>
                        {/* Decorative Corner */}
                        <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-[var(--accent-primary)]/50 rounded-tr-lg" />
                      </div>
                      <div>
                        <h3 className="font-display text-2xl md:text-3xl font-bold text-[var(--text-primary)] tracking-wide">
                          {activeCase.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-[var(--text-secondary)] mb-8 leading-relaxed text-base md:text-lg">
                      {activeCase.description}
                    </p>

                    <div className="space-y-4">
                      <h4 className="font-display text-xs font-semibold text-[var(--accent-primary)] uppercase tracking-[0.15em]">
                        Features
                      </h4>
                      <ul className="space-y-3">
                        {activeCase.features.map((feature, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 + index * 0.1 }}
                            className="flex items-center gap-3"
                          >
                            <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)] shadow-[0_0_8px_var(--accent-primary)]" />
                            <span className="text-[var(--text-secondary)]">
                              {feature}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right: Quick Info */}
                  <div className="lg:w-1/3">
                    <div className="rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-default)] p-6 space-y-5">
                      <div>
                        <p className="font-display text-[10px] text-[var(--text-muted)] uppercase tracking-[0.15em] mb-2">
                          Recommended Size
                        </p>
                        <p className="text-xl font-display font-bold text-[var(--text-primary)] tracking-wide">
                          {activeCase.recommendedSize}
                        </p>
                      </div>

                      <div className="h-[1px] bg-gradient-to-r from-[var(--border-default)] via-[var(--accent-primary)]/30 to-[var(--border-default)]" />

                      <div>
                        <p className="font-display text-[10px] text-[var(--text-muted)] uppercase tracking-[0.15em] mb-2">
                          Starting From
                        </p>
                        <p className="text-2xl font-display font-bold text-[var(--accent-cta)] tracking-tight">
                          {activeCase.budget}
                        </p>
                      </div>

                      <Button
                        className="w-full mt-4 group"
                        rightIcon={
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        }
                      >
                        この用途で相談
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </Section>
  );
}
