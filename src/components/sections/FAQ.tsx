"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { Section } from "@/components/layout";
import { Heading } from "@/components/ui";
import { StaggerContainer, StaggerItem } from "@/components/animation";
import { accordionContent, accordionIcon } from "@/lib/animations";
import type { FAQData } from "@/lib/sanity";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

const defaultFAQs: FAQItem[] = [
  {
    id: "1",
    category: "technical",
    question: "LEDビジョンのピクセルピッチとは何ですか？",
    answer:
      "ピクセルピッチとは、LEDの画素間の距離を表す数値です。数値が小さいほど高精細で、近距離での視聴に適しています。例えば、P2.5なら2.5mmピッチです。用途や視聴距離に応じて最適なものをご提案します。",
  },
  {
    id: "2",
    category: "contract",
    question: "最短でどのくらいの期間で利用できますか？",
    answer:
      "在庫状況によりますが、最短で3日前からのご予約が可能です。大型サイズやイベント繁忙期は早めのご相談をおすすめします。緊急の場合もまずはお問い合わせください。",
  },
  {
    id: "3",
    category: "trouble",
    question: "当日トラブルが発生した場合、対応してもらえますか？",
    answer:
      "はい、24時間対応のサポート体制を整えています。万が一の機材トラブル時は、在庫豊富な代替機を即日でお届けします。スタンダードプラン以上は代替機即日対応が含まれています。",
  },
  {
    id: "4",
    category: "beginner",
    question: "初めて利用するのですが、設置は自分でできますか？",
    answer:
      "小型のモデルは比較的簡単に設置いただけますが、安全のため設置サポートをおすすめしています。全プランに操作説明が含まれており、スタンダード以上は設置サポートも付いています。",
  },
  {
    id: "5",
    category: "contract",
    question: "キャンセル料はかかりますか？",
    answer:
      "利用日の7日前までのキャンセルは無料です。6日前〜3日前は50%、2日前〜当日は100%のキャンセル料が発生します。日程変更の場合は別途ご相談ください。",
  },
  {
    id: "6",
    category: "technical",
    question: "屋外でも使用できますか？",
    answer:
      "はい、屋外対応モデルをご用意しています。防水・防塵仕様で、直射日光下でも高い視認性を確保できます。屋外利用の場合は事前にご相談ください。",
  },
];

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

interface FAQProps {
  title?: string;
  subtitle?: string;
  faqs?: FAQItem[];
  faqsData?: FAQData[];
}

export function FAQ({
  title = "よくある質問",
  subtitle = "お客様からよくいただくご質問にお答えします。",
  faqs = defaultFAQs,
  faqsData,
}: FAQProps) {
  // CMSデータがある場合はそちらを使用
  const displayFAQs = faqsData && faqsData.length > 0
    ? faqsData.map((f) => ({
        id: f._id,
        question: f.question,
        answer: extractPlainText(f.answer),
        category: f.category,
      }))
    : faqs;
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <Section id="faq" variant="default">
      <div className="text-center mb-12">
        <Heading as="h2" className="mb-4">
          {title}
        </Heading>
        <p className="text-[--text-secondary] max-w-2xl mx-auto">{subtitle}</p>
      </div>

      <StaggerContainer className="max-w-3xl mx-auto space-y-4">
        {displayFAQs.map((faq) => {
          const isOpen = openItems.has(faq.id);

          return (
            <StaggerItem key={faq.id}>
              <div className="bg-[--bg-card] border border-[--border-default] rounded-xl overflow-hidden">
                {/* Question Header */}
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-[--bg-elevated] transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-medium text-[--text-primary]">
                    {faq.question}
                  </span>
                  <motion.span
                    variants={accordionIcon}
                    animate={isOpen ? "expanded" : "collapsed"}
                    className="flex-shrink-0 text-[--text-muted]"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.span>
                </button>

                {/* Answer Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      variants={accordionContent}
                      initial="collapsed"
                      animate="expanded"
                      exit="collapsed"
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-0">
                        <div className="pt-4 border-t border-[--border-default]">
                          <p className="text-[--text-secondary] leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </StaggerItem>
          );
        })}
      </StaggerContainer>

      {/* More Questions */}
      <div className="text-center mt-10">
        <p className="text-[--text-muted]">
          その他のご質問は
          <a href="#cta" className="text-[--accent-primary] hover:underline ml-1">
            お問い合わせ
          </a>
          からお気軽にどうぞ。
        </p>
      </div>
    </Section>
  );
}
