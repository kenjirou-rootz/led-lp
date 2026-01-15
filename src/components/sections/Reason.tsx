"use client";

import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Section } from "@/components/layout";
import { Heading } from "@/components/ui";
import { motion } from "motion/react";
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
  const sectionTitle = reasonSectionData?.sectionTitle || "選ばれる3つの理由";
  const sectionSubtitle =
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

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <Section id="reason" variant="default">
      <div className="text-center mb-12">
        <Heading as="h2" gradient className="mb-4">
          {sectionTitle}
        </Heading>
        <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
          {sectionSubtitle}
        </p>
      </div>

      {/* Carousel Container */}
      <div className="relative">
        {/* Navigation Buttons */}
        <button
          onClick={scrollPrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-default)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-primary)] transition-all duration-300 shadow-lg hidden md:flex"
          aria-label="前へ"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={scrollNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-default)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-primary)] transition-all duration-300 shadow-lg hidden md:flex"
          aria-label="次へ"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Embla Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-5">
            {items.map((item, index) => (
              <motion.div
                key={index}
                className="flex-[0_0_100%] min-w-0 md:flex-[0_0_calc(50%-10px)] lg:flex-[0_0_calc(33.333%-14px)]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="group relative h-full rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-default)] overflow-hidden transition-all duration-300 hover:border-[var(--accent-primary)] hover:shadow-xl hover:shadow-[var(--accent-primary)]/10">
                  {/* Card Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.imageAlt || item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[var(--accent-primary)]/20 to-[var(--accent-secondary)]/20 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] flex items-center justify-center">
                          <span className="text-2xl font-bold text-white">
                            {item.number}
                          </span>
                        </div>
                      </div>
                    )}
                    {/* Number Badge */}
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[var(--accent-primary)] text-white text-sm font-bold shadow-lg">
                      {item.number}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <h3 className="text-lg md:text-xl font-bold text-[var(--text-primary)] mb-3 line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-sm md:text-base text-[var(--text-secondary)] mb-4 line-clamp-3 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Highlights */}
                    {item.highlights && item.highlights.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {item.highlights.map((highlight, hIndex) => (
                          <span
                            key={hIndex}
                            className="px-3 py-1 text-xs rounded-full bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border-default)]"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile Navigation Dots */}
        <div className="flex justify-center gap-2 mt-6 md:hidden">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className="w-2 h-2 rounded-full bg-[var(--border-default)] hover:bg-[var(--accent-primary)] transition-colors"
              aria-label={`スライド ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
