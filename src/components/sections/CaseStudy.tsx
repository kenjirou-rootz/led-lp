"use client";

import Image from "next/image";
import { Building2, Calendar, MapPin, ArrowRight } from "lucide-react";
import { Section } from "@/components/layout";
import { Heading, Card, Badge, Button } from "@/components/ui";
import { StaggerContainer, StaggerItem } from "@/components/animation";
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
  const displayCaseStudies = caseStudiesData && caseStudiesData.length > 0
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
    <Section id="case-study" variant="alt">
      <div className="text-center mb-12">
        <Heading as="h2" className="mb-4">
          {title}
        </Heading>
        <p className="text-[--text-secondary] max-w-2xl mx-auto">{subtitle}</p>
      </div>

      <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {displayCaseStudies.slice(0, 2).map((caseStudy) => (
          <StaggerItem key={caseStudy.id}>
            <Card variant="default" hoverEffect={true} className="overflow-hidden p-0">
              {/* Image */}
              <div className="relative h-48 md:h-56 bg-[--bg-elevated]">
                <div className="absolute inset-0 bg-gradient-to-br from-[--accent-primary]/20 to-[--accent-secondary]/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Building2 className="w-16 h-16 text-[--text-muted]" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="primary" size="sm">
                    {caseStudy.industry}
                  </Badge>
                  <Badge variant="default" size="sm" icon={<MapPin className="w-3 h-3" />}>
                    {caseStudy.location}
                  </Badge>
                  <Badge variant="default" size="sm" icon={<Calendar className="w-3 h-3" />}>
                    {caseStudy.date}
                  </Badge>
                </div>

                <h3 className="text-lg font-bold text-[--text-primary] mb-2">
                  {caseStudy.title}
                </h3>
                <p className="text-sm text-[--text-muted] mb-3">{caseStudy.company}</p>
                <p className="text-[--text-secondary] text-sm mb-4 leading-relaxed">
                  {caseStudy.description}
                </p>

                {/* Results */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-[--border-default]">
                  {caseStudy.results.map((result, index) => (
                    <span
                      key={index}
                      className="text-xs text-[--accent-success] bg-[rgba(34,197,94,0.1)] px-2 py-1 rounded"
                    >
                      {result}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Third Case Study - Full Width */}
      {displayCaseStudies[2] && (
        <StaggerContainer className="mt-8">
          <StaggerItem>
            <Card
              variant="glow"
              hoverEffect={false}
              className="flex flex-col md:flex-row gap-6 overflow-hidden"
            >
              {/* Image Side */}
              <div className="md:w-2/5 relative h-48 md:h-auto bg-[--bg-elevated] rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[--accent-primary]/20 to-[--accent-secondary]/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Building2 className="w-16 h-16 text-[--text-muted]" />
                </div>
              </div>

              {/* Content Side */}
              <div className="md:w-3/5">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="primary" size="sm">
                    {displayCaseStudies[2].industry}
                  </Badge>
                  <Badge variant="default" size="sm" icon={<MapPin className="w-3 h-3" />}>
                    {displayCaseStudies[2].location}
                  </Badge>
                </div>

                <h3 className="text-xl font-bold text-[--text-primary] mb-2">
                  {displayCaseStudies[2].title}
                </h3>
                <p className="text-sm text-[--text-muted] mb-3">{displayCaseStudies[2].company}</p>
                <p className="text-[--text-secondary] mb-4 leading-relaxed">
                  {displayCaseStudies[2].description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {displayCaseStudies[2].results.map((result, index) => (
                    <span
                      key={index}
                      className="text-sm text-[--accent-success] bg-[rgba(34,197,94,0.1)] px-3 py-1 rounded-full"
                    >
                      {result}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          </StaggerItem>
        </StaggerContainer>
      )}

      {/* View More Button */}
      <div className="text-center mt-10">
        <Button variant="secondary" rightIcon={<ArrowRight className="w-4 h-4" />}>
          すべての事例を見る
        </Button>
      </div>
    </Section>
  );
}
