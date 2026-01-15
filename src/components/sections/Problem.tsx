"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Section } from "@/components/layout";
import { Heading } from "@/components/ui";
import { StaggerContainer, StaggerItem } from "@/components/animation";
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
  const sectionTitle = problemSectionData?.sectionTitle || "こんなお悩みはありませんか？";
  const sectionSubtitle = problemSectionData?.sectionSubtitle || "LEDビジョンの導入には、さまざまな不安がつきものです。";
  const transitionText = problemSectionData?.transitionText || "そのお悩み、すべて解決できます。";
  const items = problemSectionData?.items && problemSectionData.items.length > 0
    ? problemSectionData.items
    : defaultItems;

  return (
    <Section id="problem" variant="alt">
      <div className="text-center mb-12">
        <Heading as="h2" className="mb-4">
          {sectionTitle}
        </Heading>
        <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">{sectionSubtitle}</p>
      </div>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((item, index) => (
          <StaggerItem key={index}>
            <motion.div
              className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                {item.backgroundImageUrl ? (
                  <Image
                    src={item.backgroundImageUrl}
                    alt={item.backgroundImageAlt || item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[var(--bg-elevated)] to-[var(--bg-secondary)]" />
                )}
              </div>

              {/* Dark Overlay with Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 transition-opacity duration-300 group-hover:from-black/85 group-hover:via-black/55" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
                <h3 className="text-lg md:text-xl font-bold text-white mb-2 leading-tight">
                  {item.title}
                </h3>
                <p className="text-sm md:text-base text-white/80 leading-relaxed line-clamp-2">
                  {item.description}
                </p>
              </div>

              {/* Subtle Border Glow on Hover */}
              <div className="absolute inset-0 rounded-xl border border-white/0 transition-colors duration-300 group-hover:border-white/20" />
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Transition Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-center mt-12 pt-12 border-t border-[var(--border-default)]"
      >
        <p className="text-xl md:text-2xl text-[var(--text-secondary)]">
          そのお悩み、
          <span className="text-[var(--accent-primary)] font-semibold">すべて解決</span>
          できます。
        </p>
      </motion.div>
    </Section>
  );
}
