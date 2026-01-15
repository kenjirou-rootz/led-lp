"use client";

import { motion } from "motion/react";
import { AlertCircle, HelpCircle, Clock, DollarSign, FileQuestion, Headphones } from "lucide-react";
import { Section } from "@/components/layout";
import { Heading, Card } from "@/components/ui";
import { StaggerContainer, StaggerItem } from "@/components/animation";
import type { ProblemData } from "@/lib/sanity";

interface ProblemItem {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
}

const defaultProblems: ProblemItem[] = [
  {
    icon: HelpCircle,
    text: "LEDビジョンを使いたいが、何を選べばいいかわからない",
  },
  {
    icon: AlertCircle,
    text: "当日のトラブルが心配で、社内稟議も通しにくい",
  },
  {
    icon: Clock,
    text: "複数社に見積もりを取る時間がない",
  },
  {
    icon: DollarSign,
    text: "価格が不透明で、予算内に収まるか不安",
  },
  {
    icon: FileQuestion,
    text: "専門用語（ルーメン、ピクセルピッチ等）がわからない",
  },
  {
    icon: Headphones,
    text: "初めての利用で、サポート体制が気になる",
  },
];

// デフォルトアイコンのマッピング
const defaultIcons = [HelpCircle, AlertCircle, Clock, DollarSign, FileQuestion, Headphones];

interface ProblemProps {
  title?: string;
  subtitle?: string;
  problems?: ProblemItem[];
  problemsData?: ProblemData[];
}

export function Problem({
  title = "こんなお悩みはありませんか？",
  subtitle = "LEDビジョンの導入には、さまざまな不安がつきものです。",
  problems = defaultProblems,
  problemsData,
}: ProblemProps) {
  // CMSデータがある場合はそちらを使用、なければデフォルト
  const displayProblems = problemsData && problemsData.length > 0
    ? problemsData.map((p, index) => ({
        icon: defaultIcons[index % defaultIcons.length],
        text: p.problemText,
      }))
    : problems;
  return (
    <Section id="problem" variant="alt">
      <div className="text-center mb-12">
        <Heading as="h2" className="mb-4">
          {title}
        </Heading>
        <p className="text-[--text-secondary] max-w-2xl mx-auto">{subtitle}</p>
      </div>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayProblems.map((problem, index) => {
          const Icon = problem.icon;
          return (
            <StaggerItem key={index}>
              <Card
                variant="default"
                hoverEffect={true}
                className="flex items-start gap-4 h-full"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[rgba(239,68,68,0.1)] flex items-center justify-center">
                  <Icon className="w-6 h-6 text-[--accent-error]" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-5 h-5 rounded-full bg-[--bg-elevated] flex items-center justify-center text-xs text-[--text-muted]">
                      {index + 1}
                    </span>
                  </div>
                  <p className="text-[--text-primary] leading-relaxed">{problem.text}</p>
                </div>
              </Card>
            </StaggerItem>
          );
        })}
      </StaggerContainer>

      {/* Transition Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-center mt-12 pt-12 border-t border-[--border-default]"
      >
        <p className="text-xl md:text-2xl text-[--text-secondary]">
          そのお悩み、
          <span className="text-[--accent-primary] font-semibold">すべて解決</span>
          できます。
        </p>
      </motion.div>
    </Section>
  );
}
