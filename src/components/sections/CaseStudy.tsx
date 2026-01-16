"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Sparkles, MapPin, Calendar, ArrowRight, TrendingUp } from "lucide-react";
import { Section } from "@/components/layout";
import { Button } from "@/components/ui";
import { StaggerContainer, StaggerItem } from "@/components/animation";
import {
  sectionHeader,
  sectionOverline,
  sectionTitle,
  sectionSubtitle,
} from "@/lib/animations";
import type { CaseStudyData } from "@/lib/sanity";

interface CaseStudyItem {
  id: string;
  title: string;
  company: string;
  industry: string;
  location: string;
  date: string;
  description: string;
  imageUrl: string;
  results: string[];
}

const defaultCaseStudies: CaseStudyItem[] = [
  {
    id: "1",
    title: "大規模展示会でのブランディング強化",
    company: "株式会社XXX",
    industry: "製造業",
    location: "東京ビッグサイト",
    date: "2024年10月",
    description:
      "ブース全面にLEDビジョンを設置し、ダイナミックな製品紹介を実現。来場者の注目を集め、名刺交換数が前年比150%に。",
    imageUrl: "/images/case-study-1.jpg",
    results: ["来場者数 前年比150%", "商談数 80件獲得", "メディア掲載 5社"],
  },
  {
    id: "2",
    title: "新製品発表会での演出効果最大化",
    company: "△△株式会社",
    industry: "IT・テクノロジー",
    location: "品川インターシティホール",
    date: "2024年9月",
    description:
      "ステージ背面の大型LEDと両サイドのサブビジョンで、製品の魅力を多角的にアピール。参加者満足度95%を達成。",
    imageUrl: "/images/case-study-2.jpg",
    results: ["満足度 95%", "SNS投稿 1,200件", "動画再生 50万回"],
  },
  {
    id: "3",
    title: "音楽フェス会場でのステージ演出",
    company: "○○エンターテインメント",
    industry: "エンターテインメント",
    location: "幕張メッセ",
    date: "2024年8月",
    description:
      "メインステージに超大型LEDビジョンを設置。リアルタイム映像とエフェクトで、圧倒的な没入感を提供。",
    imageUrl: "/images/case-study-3.jpg",
    results: ["動員数 30,000人", "公式動画再生 200万回", "リピート決定"],
  },
];

// イベント種別のラベル
const eventTypeLabels: Record<string, string> = {
  exhibition: "展示会",
  live: "ライブ・コンサート",
  signage: "デジタルサイネージ",
  corporate: "企業イベント",
  other: "その他",
};

interface CaseStudyProps {
  title?: string;
  subtitle?: string;
  caseStudies?: CaseStudyItem[];
  caseStudiesData?: CaseStudyData[];
}

export function CaseStudy({
  title = "導入事例",
  subtitle = "さまざまな業界・規模のお客様にご利用いただいています。",
  caseStudies = defaultCaseStudies,
  caseStudiesData,
}: CaseStudyProps) {
  // CMSデータがある場合はそちらを使用
  const displayCaseStudies =
    caseStudiesData && caseStudiesData.length > 0
      ? caseStudiesData.map((c) => ({
          id: c._id,
          title: c.summary || c.clientName,
          company: c.clientName,
          industry: c.industry || "",
          location: eventTypeLabels[c.eventType || ""] || c.eventType || "",
          date: "",
          description: c.summary || "",
          imageUrl: c.images?.[0]?.url || "",
          results: [] as string[],
        }))
      : caseStudies;

  return (
    <Section id="case-study" variant="default" className="overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-pixel-grid opacity-20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-[radial-gradient(ellipse_at_100%_0%,rgba(0,240,255,0.06)_0%,transparent_50%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[60%] h-[60%] bg-[radial-gradient(ellipse_at_0%_100%,rgba(255,107,0,0.04)_0%,transparent_50%)] pointer-events-none" />

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
            <Sparkles className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
            <span className="font-display text-[10px] font-semibold tracking-[0.2em] uppercase text-[var(--accent-primary)]">
              Case Studies
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

      {/* Case Studies Grid */}
      <StaggerContainer
        speed="slow"
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10"
      >
        {displayCaseStudies.slice(0, 2).map((caseStudy, index) => (
          <StaggerItem key={caseStudy.id}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: [0.19, 1, 0.22, 1],
              }}
              className="group relative h-full rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)] overflow-hidden transition-all duration-500 hover:border-[var(--accent-primary)]/50 hover:shadow-[var(--glow-card-hover)]"
            >
              {/* Image Area */}
              <div className="relative h-56 overflow-hidden">
                {caseStudy.imageUrl ? (
                  <Image
                    src={caseStudy.imageUrl}
                    alt={caseStudy.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[var(--bg-elevated)] via-[var(--bg-card)] to-[var(--bg-secondary)] flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-pixel-grid-dense opacity-50" />
                    <div className="w-20 h-20 rounded-2xl bg-[var(--bg-primary)]/80 backdrop-blur-sm border border-[var(--accent-primary)]/30 flex items-center justify-center">
                      <TrendingUp className="w-10 h-10 text-[var(--accent-primary)]" />
                    </div>
                  </div>
                )}
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-transparent to-transparent" />

                {/* Industry Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-[var(--accent-cta)]/90 text-white backdrop-blur-sm">
                    {caseStudy.industry}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Meta Info */}
                <div className="flex flex-wrap gap-3 mb-4">
                  {caseStudy.location && (
                    <span className="inline-flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                      <MapPin className="w-3 h-3 text-[var(--accent-primary)]" />
                      {caseStudy.location}
                    </span>
                  )}
                  {caseStudy.date && (
                    <span className="inline-flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                      <Calendar className="w-3 h-3 text-[var(--accent-primary)]" />
                      {caseStudy.date}
                    </span>
                  )}
                </div>

                <h3 className="font-display text-xl font-bold text-[var(--text-primary)] mb-2 leading-tight tracking-wide line-clamp-2">
                  {caseStudy.title}
                </h3>
                <p className="text-sm text-[var(--text-muted)] mb-3">
                  {caseStudy.company}
                </p>
                <p className="text-sm text-[var(--text-secondary)] mb-5 leading-relaxed line-clamp-3">
                  {caseStudy.description}
                </p>

                {/* Results Tags */}
                {caseStudy.results.length > 0 && (
                  <div className="pt-4 border-t border-[var(--border-default)]">
                    <div className="flex flex-wrap gap-2">
                      {caseStudy.results.map((result, rIndex) => (
                        <span
                          key={rIndex}
                          className="px-3 py-1.5 text-xs font-medium rounded-lg bg-[rgba(34,197,94,0.1)] text-[var(--accent-success)] border border-[rgba(34,197,94,0.2)]"
                        >
                          {result}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Hover Border Glow */}
              <div className="absolute inset-0 rounded-2xl transition-opacity duration-500 opacity-0 group-hover:opacity-100 pointer-events-none border border-[var(--accent-primary)]/20" />
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Featured Case Study - Full Width */}
      {displayCaseStudies[2] && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
          className="mt-10 relative z-10"
        >
          <div className="group relative rounded-2xl bg-[var(--bg-card)] border border-[var(--accent-primary)]/30 overflow-hidden transition-all duration-500 hover:border-[var(--accent-primary)]/60 hover:shadow-[var(--glow-cyan-subtle)]">
            {/* Featured Label */}
            <div className="absolute top-4 right-4 z-20">
              <span className="px-3 py-1.5 text-[10px] font-display font-bold tracking-[0.15em] uppercase rounded-lg bg-[var(--accent-primary)]/20 text-[var(--accent-primary)] border border-[var(--accent-primary)]/30 backdrop-blur-sm">
                Featured
              </span>
            </div>

            <div className="flex flex-col md:flex-row">
              {/* Image Side */}
              <div className="md:w-2/5 relative h-64 md:h-auto min-h-[300px] overflow-hidden">
                {displayCaseStudies[2].imageUrl ? (
                  <Image
                    src={displayCaseStudies[2].imageUrl}
                    alt={displayCaseStudies[2].title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[var(--bg-elevated)] via-[var(--bg-card)] to-[var(--bg-secondary)] flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-pixel-grid-dense opacity-50" />
                    <div className="w-24 h-24 rounded-2xl bg-[var(--bg-primary)]/80 backdrop-blur-sm border border-[var(--accent-primary)]/30 flex items-center justify-center">
                      <Sparkles className="w-12 h-12 text-[var(--accent-primary)]" />
                    </div>
                  </div>
                )}
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[var(--bg-card)] hidden md:block" />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] to-transparent md:hidden" />
              </div>

              {/* Content Side */}
              <div className="md:w-3/5 p-8 flex flex-col justify-center">
                {/* Meta Badges */}
                <div className="flex flex-wrap gap-3 mb-4">
                  <span className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-[var(--accent-cta)]/90 text-white">
                    {displayCaseStudies[2].industry}
                  </span>
                  {displayCaseStudies[2].location && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border-default)]">
                      <MapPin className="w-3 h-3 text-[var(--accent-primary)]" />
                      {displayCaseStudies[2].location}
                    </span>
                  )}
                </div>

                <h3 className="font-display text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-3 leading-tight tracking-wide">
                  {displayCaseStudies[2].title}
                </h3>
                <p className="text-sm text-[var(--text-muted)] mb-4">
                  {displayCaseStudies[2].company}
                </p>
                <p className="text-base text-[var(--text-secondary)] mb-6 leading-relaxed">
                  {displayCaseStudies[2].description}
                </p>

                {/* Results Tags */}
                {displayCaseStudies[2].results.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {displayCaseStudies[2].results.map((result, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 text-sm font-medium rounded-lg bg-[rgba(34,197,94,0.1)] text-[var(--accent-success)] border border-[rgba(34,197,94,0.2)]"
                      >
                        {result}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Decorative Lines */}
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent-primary)]/30 to-transparent" />
          </div>
        </motion.div>
      )}

      {/* View More Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-center mt-12 relative z-10"
      >
        <Button
          variant="secondary"
          size="lg"
          className="group"
          rightIcon={
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          }
        >
          すべての事例を見る
        </Button>
      </motion.div>
    </Section>
  );
}
