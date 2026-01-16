"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";
import { Section } from "@/components/layout";
import { StaggerContainer, StaggerItem } from "@/components/animation";
import {
  sectionHeader,
  sectionOverline,
  sectionTitle,
  sectionSubtitle,
  accordionContent,
} from "@/lib/animations";
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
    .filter(
      (block: unknown) => (block as { _type?: string })._type === "block"
    )
    .map((block: unknown) => {
      const typedBlock = block as { children?: Array<{ text?: string }> };
      return (
        typedBlock.children?.map((child) => child.text || "").join("") || ""
      );
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
  const displayFAQs =
    faqsData && faqsData.length > 0
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
    <Section id="faq" variant="default" className="overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-pixel-grid opacity-15 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[50%] h-[80%] -translate-y-1/2 bg-[radial-gradient(ellipse_at_0%_50%,rgba(0,240,255,0.04)_0%,transparent_50%)] pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[50%] h-[80%] -translate-y-1/2 bg-[radial-gradient(ellipse_at_100%_50%,rgba(255,107,0,0.03)_0%,transparent_50%)] pointer-events-none" />

      {/* Section Header */}
      <motion.div
        variants={sectionHeader}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="text-center mb-14 relative z-10"
      >
        {/* Overline */}
        <motion.div variants={sectionOverline} className="mb-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--accent-primary-muted)] border border-[rgba(0,240,255,0.2)]">
            <HelpCircle className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
            <span className="font-display text-[10px] font-semibold tracking-[0.2em] uppercase text-[var(--accent-primary)]">
              FAQ
            </span>
          </span>
        </motion.div>

        {/* Title */}
        <motion.h2 variants={sectionTitle} className="section-title">
          <span className="text-gradient">{title.slice(0, 4)}</span>
          <span>{title.slice(4)}</span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          variants={sectionSubtitle}
          className="mt-4 section-subtitle max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>
      </motion.div>

      {/* FAQ Items */}
      <StaggerContainer
        speed="slow"
        className="max-w-3xl mx-auto space-y-4 relative z-10"
      >
        {displayFAQs.map((faq, index) => {
          const isOpen = openItems.has(faq.id);

          return (
            <StaggerItem key={faq.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: [0.19, 1, 0.22, 1],
                }}
                className={`
                  group rounded-xl overflow-hidden transition-all duration-500
                  ${
                    isOpen
                      ? "bg-[var(--bg-card)] border border-[var(--accent-primary)]/40 shadow-[var(--glow-card-hover)]"
                      : "bg-[var(--bg-card)] border border-[var(--border-default)] hover:border-[var(--accent-primary)]/30"
                  }
                `}
              >
                {/* Question Header */}
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left transition-colors"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-4">
                    {/* Number Badge */}
                    <span
                      className={`
                        w-8 h-8 rounded-lg flex items-center justify-center text-sm font-display font-bold flex-shrink-0 transition-all duration-300
                        ${
                          isOpen
                            ? "bg-[var(--accent-primary)] text-white"
                            : "bg-[var(--bg-elevated)] text-[var(--text-muted)] group-hover:text-[var(--accent-primary)]"
                        }
                      `}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`font-medium transition-colors duration-300 ${
                        isOpen
                          ? "text-[var(--text-primary)]"
                          : "text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]"
                      }`}
                    >
                      {faq.question}
                    </span>
                  </div>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className={`flex-shrink-0 transition-colors duration-300 ${
                      isOpen
                        ? "text-[var(--accent-primary)]"
                        : "text-[var(--text-muted)]"
                    }`}
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
                        <div className="pl-12 pt-2 border-t border-[var(--border-default)]">
                          <p className="text-[var(--text-secondary)] leading-relaxed pt-4">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </StaggerItem>
          );
        })}
      </StaggerContainer>

      {/* More Questions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-center mt-12 relative z-10"
      >
        <div className="inline-flex items-center gap-3 px-6 py-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-default)]">
          <MessageCircle className="w-5 h-5 text-[var(--accent-primary)]" />
          <p className="text-sm text-[var(--text-muted)]">
            その他のご質問は
            <a
              href="#cta"
              className="text-[var(--accent-primary)] hover:text-[var(--accent-primary-hover)] font-medium ml-1 transition-colors"
            >
              お問い合わせ
            </a>
            からお気軽にどうぞ。
          </p>
        </div>
      </motion.div>
    </Section>
  );
}
