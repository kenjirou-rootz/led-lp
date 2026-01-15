"use client";

import { Check, Star } from "lucide-react";
import { Section } from "@/components/layout";
import { Heading, Card, Button, Badge } from "@/components/ui";
import { StaggerContainer, StaggerItem } from "@/components/animation";
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
  const displayPlans = pricingPlansData && pricingPlansData.length > 0
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
    <Section id="pricing" variant="alt">
      <div className="text-center mb-12">
        <Heading as="h2" className="mb-4">
          {title}
        </Heading>
        <p className="text-[--text-secondary] max-w-2xl mx-auto">{subtitle}</p>
      </div>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {displayPlans.map((plan) => (
          <StaggerItem key={plan.id}>
            <Card
              variant={plan.isPopular ? "glow" : "default"}
              hoverEffect={true}
              className={`
                h-full flex flex-col relative
                ${plan.isPopular ? "lg:-mt-4 lg:mb-4" : ""}
              `}
            >
              {/* Popular Badge */}
              {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge variant="warning" size="sm" icon={<Star className="w-3 h-3" />}>
                    人気No.1
                  </Badge>
                </div>
              )}

              {/* Header */}
              <div className="text-center pb-6 border-b border-[--border-default]">
                <h3 className="text-xl font-bold text-[--text-primary] mb-2">
                  {plan.name}
                </h3>
                <p className="text-sm text-[--text-muted] mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-3xl md:text-4xl font-bold text-[--text-primary]">
                    {plan.price}
                  </span>
                  <span className="text-[--text-muted]">{plan.priceNote}</span>
                </div>
              </div>

              {/* Features */}
              <div className="flex-1 py-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[--accent-success] flex-shrink-0 mt-0.5" />
                      <span className="text-[--text-secondary]">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <Button
                variant={plan.isPopular ? "primary" : "secondary"}
                className="w-full"
              >
                {plan.ctaText}
              </Button>
            </Card>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Note */}
      <div className="mt-10 text-center">
        <p className="text-sm text-[--text-muted]">
          ※ 上記は参考価格です。サイズ・期間・設置場所により変動します。
          <br />
          詳細なお見積りは無料でご相談ください。
        </p>
      </div>
    </Section>
  );
}
