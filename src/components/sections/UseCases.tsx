"use client";

import { useCallback, useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "motion/react";
import {
  Layers,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
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
  title: string;
  description: string;
  features: string[];
  recommendedSize: string;
  budget: string;
}

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
    title: "イベント・コンサート",
    description:
      "ステージ演出を最大化し、観客の没入感を高めます。大規模なイベントにも対応可能です。",
    features: ["超大型サイズ対応", "リアルタイム映像連携", "特殊形状も相談可"],
    recommendedSize: "4m × 6m 〜",
    budget: "1日 ¥300,000〜",
  },
  {
    id: "corporate",
    title: "企業説明会・株主総会",
    description:
      "プレゼンテーションの説得力を高め、参加者の理解度を向上させます。",
    features: ["高解像度で資料も鮮明", "音響機材セット可能", "控えめな設置対応"],
    recommendedSize: "1.5m × 2.5m 〜",
    budget: "1日 ¥80,000〜",
  },
  {
    id: "advertisement",
    title: "広告・プロモーション",
    description:
      "屋外・屋内問わず、高い視認性で効果的な広告展開を実現します。",
    features: ["屋外対応モデルあり", "24時間稼働対応", "コンテンツ制作相談可"],
    recommendedSize: "サイズ応相談",
    budget: "月額 ¥200,000〜",
  },
  {
    id: "retail",
    title: "店舗・商業施設",
    description:
      "来店客の目を引き、購買意欲を高める演出を実現します。",
    features: ["スリムタイプ対応", "省電力モデルあり", "長期レンタル割引"],
    recommendedSize: "設置場所に応じて",
    budget: "1日 ¥50,000〜",
  },
  {
    id: "education",
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
          title: u.tabLabel,
          description: extractPlainText(u.description || []),
          features: u.recommendedEquipment?.map((e) => e.name || "") || [],
          recommendedSize: u.recommendedEquipment?.[0]?.spec || "",
          budget: u.recommendedEquipment?.[0]?.note || "",
        }))
      : useCases;

  // Embla Carousel setup
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
    containScroll: "trimSnaps",
    breakpoints: {
      "(min-width: 768px)": { slidesToScroll: 2 },
    },
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    emblaApi.reInit();

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // タブクリック → カルーセルをスクロール
  const handleTabClick = (index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  };

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

      {/* Tab Navigation - テキストのみ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-10 relative z-10"
      >
        <div className="flex flex-wrap justify-center gap-2 md:gap-3">
          {displayUseCases.map((useCase, index) => {
            const isActive = selectedIndex === index;

            return (
              <button
                key={useCase.id}
                onClick={() => handleTabClick(index)}
                className={`
                  group px-4 py-2.5 rounded-xl text-sm font-medium
                  transition-all duration-300 border
                  ${
                    isActive
                      ? "bg-[var(--accent-primary)] text-white border-[var(--accent-primary)] shadow-[var(--glow-cyan-subtle)]"
                      : "bg-[var(--bg-card)] text-[var(--text-secondary)] border-[var(--border-default)] hover:text-[var(--text-primary)] hover:border-[var(--accent-primary)]/40"
                  }
                `}
              >
                <span className="font-display tracking-wide">
                  {useCase.title}
                </span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Carousel Content */}
      <div className="relative z-10">
        {/* Navigation Buttons */}
        <button
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[var(--bg-card)]/90 backdrop-blur-sm border border-[var(--border-default)] flex items-center justify-center transition-all duration-300 ${
            canScrollPrev
              ? "text-[var(--text-primary)] hover:border-[var(--accent-primary)] hover:shadow-[var(--glow-cyan-subtle)]"
              : "text-[var(--text-muted)] opacity-50 cursor-not-allowed"
          }`}
          aria-label="前へ"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={scrollNext}
          disabled={!canScrollNext}
          className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[var(--bg-card)]/90 backdrop-blur-sm border border-[var(--border-default)] flex items-center justify-center transition-all duration-300 ${
            canScrollNext
              ? "text-[var(--text-primary)] hover:border-[var(--accent-primary)] hover:shadow-[var(--glow-cyan-subtle)]"
              : "text-[var(--text-muted)] opacity-50 cursor-not-allowed"
          }`}
          aria-label="次へ"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Embla Carousel */}
        <div className="overflow-hidden px-12 md:px-16" ref={emblaRef}>
          <div className="flex gap-6">
            {displayUseCases.map((useCase, index) => (
              <motion.div
                key={useCase.id}
                className="flex-[0_0_100%] min-w-0 md:flex-[0_0_calc(50%-12px)]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.19, 1, 0.22, 1],
                }}
              >
                <div className="group h-full rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)] overflow-hidden transition-all duration-500 hover:border-[var(--accent-primary)]/50 hover:shadow-[var(--glow-card-hover)]">
                  {/* Decorative Top Line */}
                  <div className="h-[2px] bg-gradient-to-r from-transparent via-[var(--accent-primary)] to-transparent" />

                  <div className="p-6 md:p-8">
                    {/* Title */}
                    <h3 className="font-display text-xl md:text-2xl font-bold text-[var(--text-primary)] mb-4 tracking-wide">
                      {useCase.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[var(--text-secondary)] mb-6 leading-relaxed text-sm md:text-base line-clamp-3">
                      {useCase.description}
                    </p>

                    {/* Features */}
                    {useCase.features.length > 0 && (
                      <div className="mb-6">
                        <h4 className="font-display text-xs font-semibold text-[var(--accent-primary)] uppercase tracking-[0.15em] mb-3">
                          Features
                        </h4>
                        <ul className="space-y-2">
                          {useCase.features.map((feature, fIndex) => (
                            <li
                              key={fIndex}
                              className="flex items-center gap-2"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] shadow-[0_0_6px_var(--accent-primary)]" />
                              <span className="text-sm text-[var(--text-secondary)]">
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Quick Info */}
                    <div className="rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-default)] p-4 space-y-3">
                      {useCase.recommendedSize && (
                        <div>
                          <p className="font-display text-[10px] text-[var(--text-muted)] uppercase tracking-[0.15em] mb-1">
                            Recommended Size
                          </p>
                          <p className="text-base font-display font-bold text-[var(--text-primary)] tracking-wide">
                            {useCase.recommendedSize}
                          </p>
                        </div>
                      )}

                      {useCase.budget && (
                        <>
                          <div className="h-[1px] bg-gradient-to-r from-[var(--border-default)] via-[var(--accent-primary)]/30 to-[var(--border-default)]" />
                          <div>
                            <p className="font-display text-[10px] text-[var(--text-muted)] uppercase tracking-[0.15em] mb-1">
                              Starting From
                            </p>
                            <p className="text-lg font-display font-bold text-[var(--accent-cta)] tracking-tight">
                              {useCase.budget}
                            </p>
                          </div>
                        </>
                      )}

                      <Button
                        className="w-full mt-2 group"
                        rightIcon={
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        }
                      >
                        この用途で相談
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Dot Navigation */}
        <div className="flex justify-center gap-3 mt-8">
          {displayUseCases.map((_, index) => (
            <button
              key={index}
              onClick={() => handleTabClick(index)}
              className={`transition-all duration-300 ${
                index === selectedIndex
                  ? "w-8 h-2 rounded-full bg-[var(--accent-primary)]"
                  : "w-2 h-2 rounded-full bg-[var(--border-default)] hover:bg-[var(--text-muted)]"
              }`}
              aria-label={`スライド ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
