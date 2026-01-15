"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Presentation, PartyPopper, Building, Megaphone, Store, GraduationCap, type LucideIcon } from "lucide-react";
import { Section } from "@/components/layout";
import { Heading, Card, Button } from "@/components/ui";
import { FadeInView } from "@/components/animation";
import { tabContent } from "@/lib/animations";
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
    .filter((block: unknown) => (block as { _type?: string })._type === "block")
    .map((block: unknown) => {
      const typedBlock = block as { children?: Array<{ text?: string }> };
      return typedBlock.children?.map((child) => child.text || "").join("") || "";
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
    features: ["高輝度で明るい会場でも鮮明", "カスタムサイズ対応", "設営撤去サポート付き"],
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
    description:
      "大人数での視認性を確保し、学習効果を高めます。",
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
  const displayUseCases = useCasesData && useCasesData.length > 0
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
  const activeCase = displayUseCases.find((uc) => uc.id === activeTab) || displayUseCases[0];

  return (
    <Section id="use-cases" variant="default">
      <div className="text-center mb-12">
        <Heading as="h2" className="mb-4">
          {title}
        </Heading>
        <p className="text-[--text-secondary] max-w-2xl mx-auto">{subtitle}</p>
      </div>

      {/* Tab Navigation */}
      <FadeInView className="mb-8">
        <div className="flex flex-wrap justify-center gap-2 md:gap-3">
          {displayUseCases.map((useCase) => {
            const Icon = useCase.icon;
            const isActive = activeTab === useCase.id;

            return (
              <button
                key={useCase.id}
                onClick={() => setActiveTab(useCase.id)}
                className={`
                  flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium
                  transition-all duration-300
                  ${
                    isActive
                      ? "bg-[--accent-primary] text-white"
                      : "bg-[--bg-elevated] text-[--text-secondary] hover:text-[--text-primary] hover:bg-[--bg-card]"
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{useCase.title}</span>
              </button>
            );
          })}
        </div>
      </FadeInView>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          variants={tabContent}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <Card variant="glow" hoverEffect={false} className="p-6 md:p-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left: Main Info */}
              <div className="lg:w-2/3">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[--accent-primary] to-[--accent-secondary] flex items-center justify-center">
                    <activeCase.icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[--text-primary]">
                      {activeCase.title}
                    </h3>
                  </div>
                </div>

                <p className="text-[--text-secondary] mb-6 leading-relaxed">
                  {activeCase.description}
                </p>

                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-[--text-muted] uppercase tracking-wide">
                    特徴
                  </h4>
                  <ul className="space-y-2">
                    {activeCase.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-[--accent-primary]" />
                        <span className="text-[--text-secondary]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right: Quick Info */}
              <div className="lg:w-1/3">
                <div className="bg-[--bg-elevated] rounded-xl p-6 space-y-4">
                  <div>
                    <p className="text-xs text-[--text-muted] uppercase tracking-wide mb-1">
                      推奨サイズ
                    </p>
                    <p className="text-lg font-semibold text-[--text-primary]">
                      {activeCase.recommendedSize}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[--text-muted] uppercase tracking-wide mb-1">
                      参考価格
                    </p>
                    <p className="text-lg font-semibold text-[--accent-cta]">
                      {activeCase.budget}
                    </p>
                  </div>
                  <Button className="w-full mt-4">この用途で相談</Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>
    </Section>
  );
}
