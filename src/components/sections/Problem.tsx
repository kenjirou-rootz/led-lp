"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { AlertCircle } from "lucide-react";
import { Section } from "@/components/layout";
import { StaggerContainer, StaggerItem } from "@/components/animation";
import {
  sectionHeader,
  sectionOverline,
  sectionTitle,
  sectionSubtitle,
  cardHoverDramatic,
} from "@/lib/animations";
import type { ProblemSectionData, ProblemItemData } from "@/lib/sanity";

// デフォルトのカードデータ（CMSデータがない場合）
const defaultItems: ProblemItemData[] = [
  {
    title: "機材選びがわからない",
    description: "LEDビジョンを使いたいが、何を選べばいいかわからない",
    backgroundImageUrl: "/images/problem-1.jpg",
  },
  {
    title: "当日のトラブルが心配",
    description: "機材トラブルが心配で、社内稟議も通しにくい",
    backgroundImageUrl: "/images/problem-2.jpg",
  },
  {
    title: "見積もり取得の時間がない",
    description: "複数社に見積もりを取る時間がない",
    backgroundImageUrl: "/images/problem-3.jpg",
  },
  {
    title: "価格が不透明",
    description: "価格が不透明で、予算内に収まるか不安",
    backgroundImageUrl: "/images/problem-4.jpg",
  },
  {
    title: "専門用語がわからない",
    description: "ルーメン、ピクセルピッチ等の専門用語がわからない",
    backgroundImageUrl: "/images/problem-5.jpg",
  },
  {
    title: "サポート体制が不安",
    description: "初めての利用で、サポート体制が気になる",
    backgroundImageUrl: "/images/problem-6.jpg",
  },
];

interface ProblemProps {
  problemSectionData?: ProblemSectionData | null;
}

export function Problem({ problemSectionData }: ProblemProps) {
  const sectionTitleText =
    problemSectionData?.sectionTitle || "こんなお悩みはありませんか？";
  const sectionSubtitleText =
    problemSectionData?.sectionSubtitle ||
    "LEDビジョンの導入には、さまざまな不安がつきものです。";
  const transitionText =
    problemSectionData?.transitionText || "そのお悩み、すべて解決できます。";
  const items =
    problemSectionData?.items && problemSectionData.items.length > 0
      ? problemSectionData.items
      : defaultItems;

  return (
    <Section id="problem" variant="grid" className="overflow-hidden">
      {/* Spotlight Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-[50%] bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,240,255,0.08)_0%,transparent_50%)] pointer-events-none" />

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
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[rgba(255,51,102,0.1)] border border-[rgba(255,51,102,0.2)]">
            <AlertCircle className="w-3.5 h-3.5 text-[var(--accent-error)]" />
            <span className="font-display text-[10px] font-semibold tracking-[0.2em] uppercase text-[var(--accent-error)]">
              Common Problems
            </span>
          </span>
        </motion.div>

        {/* Title */}
        <motion.h2
          variants={sectionTitle}
          className="section-title mb-4"
        >
          {sectionTitleText}
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          variants={sectionSubtitle}
          className="section-subtitle max-w-2xl mx-auto"
        >
          {sectionSubtitleText}
        </motion.p>
      </motion.div>

      {/* Problem Cards Grid */}
      <StaggerContainer
        speed="slow"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10"
      >
        {items.map((item, index) => (
          <StaggerItem key={index}>
            <motion.div
              variants={cardHoverDramatic}
              initial="rest"
              whileHover="hover"
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                {item.backgroundImageUrl ? (
                  <Image
                    src={item.backgroundImageUrl}
                    alt={item.backgroundImageAlt || item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[var(--bg-elevated)] to-[var(--bg-card)]" />
                )}
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)]/60 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-95" />

              {/* Scanline Effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 scanline-overlay" />

              {/* Number Badge */}
              <div className="absolute top-4 left-4 z-10">
                <div className="w-10 h-10 rounded-lg bg-[var(--bg-primary)]/80 backdrop-blur-sm border border-[var(--accent-error)]/30 flex items-center justify-center transition-all duration-300 group-hover:border-[var(--accent-error)]/60 group-hover:shadow-[0_0_20px_rgba(255,51,102,0.3)]">
                  <span className="font-display text-lg font-bold text-[var(--accent-error)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h3 className="font-display text-xl md:text-2xl font-bold text-[var(--text-primary)] mb-2 leading-tight tracking-wide">
                  {item.title}
                </h3>
                <p className="text-sm md:text-base text-[var(--text-secondary)] leading-relaxed line-clamp-2">
                  {item.description}
                </p>
              </div>

              {/* Border Glow Effect */}
              <div className="absolute inset-0 rounded-2xl border border-[var(--border-default)] transition-all duration-500 group-hover:border-[var(--accent-error)]/30 group-hover:shadow-[inset_0_0_30px_rgba(255,51,102,0.1)]" />
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Transition Text with LED Line */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
        className="relative z-10 mt-20"
      >
        {/* LED Divider Line */}
        <div className="h-[1px] bg-gradient-to-r from-transparent via-[var(--accent-primary)]/50 to-transparent mb-12" />

        {/* Transition Text */}
        <div className="text-center">
          <p className="text-2xl md:text-3xl font-display font-medium text-[var(--text-secondary)] tracking-wide">
            {transitionText.split("、")[0]}
            {transitionText.includes("、") && "、"}
            <span className="text-[var(--accent-primary)] font-bold text-glow">
              {transitionText.includes("すべて解決")
                ? "すべて解決"
                : transitionText.split("、")[1]?.replace("できます。", "")}
            </span>
            {transitionText.includes("できます") && (
              <span className="text-[var(--text-primary)]">できます。</span>
            )}
          </p>
        </div>
      </motion.div>
    </Section>
  );
}
