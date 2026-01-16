"use client";

import { useCallback, useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Award } from "lucide-react";
import Image from "next/image";
import { Section } from "@/components/layout";
import { motion } from "motion/react";
import {
  sectionHeader,
  sectionOverline,
  sectionTitle,
  sectionSubtitle,
} from "@/lib/animations";
import type { ReasonSectionData, ReasonItemData } from "@/lib/sanity";

// デフォルトのカードデータ（CMSデータがない場合）
const defaultItems: ReasonItemData[] = [
  {
    number: "01",
    title: "業界15年・累計3,500件の実績と信頼",
    description:
      "東証プライム上場企業を含む50社以上との取引実績。大規模展示会から小規模イベントまで、あらゆる規模に対応してきた経験があります。",
    highlights: ["15年の実績", "3,500件以上", "上場企業50社以上"],
  },
  {
    number: "02",
    title: "トラブル時の代替機即日対応",
    description:
      "万が一の機材トラブル時も、在庫豊富な代替機を即日でお届け。24時間対応のサポート体制で、イベント成功を最後までサポートします。",
    highlights: ["即日対応", "24時間サポート", "豊富な在庫"],
  },
  {
    number: "03",
    title: "予算に合わせた柔軟な提案",
    description:
      "ご予算と用途をヒアリングし、最適な機材構成をご提案。無駄なコストを省き、費用対効果の高いプランをご用意します。",
    highlights: ["明瞭な価格", "柔軟なプラン", "無駄のない提案"],
  },
];

interface ReasonProps {
  reasonSectionData?: ReasonSectionData | null;
}

export function Reason({ reasonSectionData }: ReasonProps) {
  const sectionTitleText =
    reasonSectionData?.sectionTitle || "選ばれる3つの理由";
  const sectionSubtitleText =
    reasonSectionData?.sectionSubtitle ||
    "私たちが選ばれ続けるのには、理由があります。";
  const items =
    reasonSectionData?.items && reasonSectionData.items.length > 0
      ? reasonSectionData.items
      : defaultItems;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
    containScroll: "trimSnaps",
    breakpoints: {
      "(min-width: 768px)": { slidesToScroll: 2 },
      "(min-width: 1024px)": { slidesToScroll: 3 },
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

    // Subscribe to events for state updates
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    // Trigger initial state via reInit event
    emblaApi.reInit();

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <Section id="reason" variant="spotlight" className="overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-pixel-grid opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200%] h-[40%] bg-[radial-gradient(ellipse_at_50%_100%,rgba(0,240,255,0.06)_0%,transparent_50%)] pointer-events-none" />

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
            <Award className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
            <span className="font-display text-[10px] font-semibold tracking-[0.2em] uppercase text-[var(--accent-primary)]">
              Why Choose Us
            </span>
          </span>
        </motion.div>

        {/* Title */}
        <motion.h2 variants={sectionTitle} className="section-title">
          <span className="text-gradient">{sectionTitleText.slice(0, 4)}</span>
          <span>{sectionTitleText.slice(4)}</span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          variants={sectionSubtitle}
          className="mt-4 section-subtitle max-w-2xl mx-auto"
        >
          {sectionSubtitleText}
        </motion.p>
      </motion.div>

      {/* Carousel Container */}
      <div className="relative z-10">
        {/* Navigation Buttons - visible on all screen sizes */}
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
            {items.map((item, index) => (
              <motion.div
                key={index}
                className="flex-[0_0_100%] min-w-0 md:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  ease: [0.19, 1, 0.22, 1],
                }}
              >
                <div className="group relative h-full rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)] overflow-hidden transition-all duration-500 hover:border-[var(--accent-primary)]/50 hover:shadow-[var(--glow-card-hover)]">
                  {/* Card Image / Visual */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.imageAlt || item.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[var(--bg-elevated)] via-[var(--bg-card)] to-[var(--bg-secondary)] flex items-center justify-center relative">
                        {/* Decorative Grid */}
                        <div className="absolute inset-0 bg-pixel-grid-dense opacity-50" />
                        {/* Large Number Display */}
                        <span className="font-display text-[8rem] font-black text-[var(--accent-primary)]/10 leading-none select-none">
                          {item.number}
                        </span>
                      </div>
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-transparent to-transparent" />

                    {/* Number Badge */}
                    <div className="absolute top-4 left-4">
                      <div className="relative">
                        <div className="w-14 h-14 rounded-xl bg-[var(--bg-primary)]/90 backdrop-blur-sm border border-[var(--accent-cta)]/50 flex items-center justify-center transition-all duration-500 group-hover:border-[var(--accent-cta)] group-hover:shadow-[var(--glow-orange)]">
                          <span className="font-display text-2xl font-black text-[var(--accent-cta)]">
                            {item.number}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <h3 className="font-display text-xl md:text-2xl font-bold text-[var(--text-primary)] mb-3 leading-tight tracking-wide line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-sm md:text-base text-[var(--text-secondary)] mb-5 line-clamp-3 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Highlights Tags */}
                    {item.highlights && item.highlights.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {item.highlights.map((highlight, hIndex) => (
                          <span
                            key={hIndex}
                            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-[var(--accent-primary-muted)] text-[var(--accent-primary)] border border-[rgba(0,240,255,0.15)] transition-all duration-300 group-hover:border-[rgba(0,240,255,0.3)]"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Hover Border Glow */}
                  <div className="absolute inset-0 rounded-2xl transition-opacity duration-500 opacity-0 group-hover:opacity-100 pointer-events-none border border-[var(--accent-primary)]/20" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile Navigation Dots */}
        <div className="flex justify-center gap-3 mt-8 md:hidden">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
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
