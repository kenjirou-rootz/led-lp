"use client";

import { Award, RefreshCw, PiggyBank } from "lucide-react";
import { Section } from "@/components/layout";
import { Heading, Card } from "@/components/ui";
import { StaggerContainer, StaggerItem } from "@/components/animation";
import { FadeInView } from "@/components/animation";
import type { ReasonData } from "@/lib/sanity";

interface ReasonItem {
  icon: React.ComponentType<{ className?: string }>;
  number: string;
  title: string;
  description: string;
  highlights: string[];
}

const defaultReasons: ReasonItem[] = [
  {
    icon: Award,
    number: "01",
    title: "業界15年・累計3,500件の実績と信頼",
    description:
      "東証プライム上場企業を含む50社以上との取引実績。大規模展示会から小規模イベントまで、あらゆる規模に対応してきた経験があります。",
    highlights: ["15年の実績", "3,500件以上", "上場企業50社以上"],
  },
  {
    icon: RefreshCw,
    number: "02",
    title: "トラブル時の代替機即日対応",
    description:
      "万が一の機材トラブル時も、在庫豊富な代替機を即日でお届け。24時間対応のサポート体制で、イベント成功を最後までサポートします。",
    highlights: ["即日対応", "24時間サポート", "豊富な在庫"],
  },
  {
    icon: PiggyBank,
    number: "03",
    title: "予算に合わせた柔軟な提案",
    description:
      "ご予算と用途をヒアリングし、最適な機材構成をご提案。無駄なコストを省き、費用対効果の高いプランをご用意します。",
    highlights: ["明瞭な価格", "柔軟なプラン", "無駄のない提案"],
  },
];

// デフォルトアイコンのマッピング
const defaultIcons = [Award, RefreshCw, PiggyBank];

// Portable Textからプレーンテキストを抽出
function extractPlainText(blocks: unknown[]): string {
  if (!blocks || !Array.isArray(blocks)) return "";
  return blocks
    .filter((block: unknown) => (block as { _type?: string })._type === "block")
    .map((block: unknown) => {
      const typedBlock = block as { children?: Array<{ text?: string }> };
      return typedBlock.children?.map((child) => child.text || "").join("") || "";
    })
    .join("\n");
}

interface ReasonProps {
  title?: string;
  subtitle?: string;
  reasons?: ReasonItem[];
  reasonsData?: ReasonData[];
}

export function Reason({
  title = "選ばれる3つの理由",
  subtitle = "私たちが選ばれ続けるのには、理由があります。",
  reasons = defaultReasons,
  reasonsData,
}: ReasonProps) {
  // CMSデータがある場合はそちらを使用
  const displayReasons = reasonsData && reasonsData.length > 0
    ? reasonsData.map((r, index) => ({
        icon: defaultIcons[index % defaultIcons.length],
        number: String(index + 1).padStart(2, "0"),
        title: r.title,
        description: extractPlainText(r.description || []),
        highlights: [] as string[], // CMSからはハイライトは取得しない（シンプル化）
      }))
    : reasons;
  return (
    <Section id="reason" variant="default">
      <div className="text-center mb-12">
        <Heading as="h2" gradient className="mb-4">
          {title}
        </Heading>
        <p className="text-[--text-secondary] max-w-2xl mx-auto">{subtitle}</p>
      </div>

      <StaggerContainer speed="slow" className="space-y-8">
        {displayReasons.map((reason, index) => {
          const Icon = reason.icon;
          const isEven = index % 2 === 1;

          return (
            <StaggerItem key={index}>
              <Card
                variant="glow"
                hoverEffect={false}
                className={`
                  flex flex-col lg:flex-row gap-8 items-center
                  ${isEven ? "lg:flex-row-reverse" : ""}
                `}
              >
                {/* Icon Side */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gradient-to-br from-[--accent-primary] to-[--accent-secondary] flex items-center justify-center glow-blue">
                      <Icon className="w-12 h-12 md:w-16 md:h-16 text-white" />
                    </div>
                    <span className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-[--bg-primary] border-2 border-[--accent-primary] flex items-center justify-center text-[--accent-primary] font-bold text-sm">
                      {reason.number}
                    </span>
                  </div>
                </div>

                {/* Content Side */}
                <div className="flex-1 text-center lg:text-left">
                  <h3 className="text-[--text-h3] font-bold text-[--text-primary] mb-4">
                    {reason.title}
                  </h3>
                  <p className="text-[--text-secondary] mb-6 leading-relaxed">
                    {reason.description}
                  </p>
                  <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                    {reason.highlights.map((highlight, hIndex) => (
                      <span
                        key={hIndex}
                        className="px-4 py-2 rounded-full bg-[--bg-elevated] text-sm text-[--text-secondary] border border-[--border-default]"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            </StaggerItem>
          );
        })}
      </StaggerContainer>
    </Section>
  );
}
