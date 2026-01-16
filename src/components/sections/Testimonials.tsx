"use client";

import { motion } from "motion/react";
import { Quote, Star, MessageSquare } from "lucide-react";
import { Section } from "@/components/layout";
import { StaggerContainer, StaggerItem } from "@/components/animation";
import {
  sectionHeader,
  sectionOverline,
  sectionTitle,
  sectionSubtitle,
} from "@/lib/animations";
import type { TestimonialData } from "@/lib/sanity";

interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
}

const defaultTestimonials: TestimonialItem[] = [
  {
    id: "1",
    quote:
      "初めてのLEDビジョン導入で不安でしたが、担当者の方が丁寧に説明してくださり、安心して任せることができました。当日のサポートも完璧で、展示会は大成功でした。",
    author: "田中 様",
    role: "マーケティング部長",
    company: "製造業 A社",
    rating: 5,
  },
  {
    id: "2",
    quote:
      "予算内で最大限の効果を出すプランを提案いただきました。特に代替機の即日対応は心強く、リスクを気にせず大規模なイベントに挑戦できました。",
    author: "鈴木 様",
    role: "イベント企画担当",
    company: "IT企業 B社",
    rating: 5,
  },
  {
    id: "3",
    quote:
      "他社と比較して価格が明瞭で、追加費用の心配がありませんでした。機材の質も高く、映像がとても綺麗でした。次回も必ずお願いします。",
    author: "佐藤 様",
    role: "広報室",
    company: "商社 C社",
    rating: 5,
  },
];

interface TestimonialsProps {
  title?: string;
  subtitle?: string;
  testimonials?: TestimonialItem[];
  testimonialsData?: TestimonialData[];
}

export function Testimonials({
  title = "お客様の声",
  subtitle = "実際にご利用いただいたお客様からの声をご紹介します。",
  testimonials = defaultTestimonials,
  testimonialsData,
}: TestimonialsProps) {
  // CMSデータがある場合はそちらを使用
  const displayTestimonials =
    testimonialsData && testimonialsData.length > 0
      ? testimonialsData.map((t) => ({
          id: t._id,
          quote: t.quote,
          author: t.authorName || "",
          role: t.authorRole || "",
          company: t.companyName || "",
          rating: t.rating || 5,
        }))
      : testimonials;

  return (
    <Section id="testimonials" variant="grid" className="overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-[50%] bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,240,255,0.05)_0%,transparent_50%)] pointer-events-none" />

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
            <MessageSquare className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
            <span className="font-display text-[10px] font-semibold tracking-[0.2em] uppercase text-[var(--accent-primary)]">
              Testimonials
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

      {/* Testimonials Grid */}
      <StaggerContainer
        speed="slow"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10"
      >
        {displayTestimonials.map((testimonial, index) => (
          <StaggerItem key={testimonial.id}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.19, 1, 0.22, 1],
              }}
              className="group relative h-full"
            >
              <div className="h-full rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)] p-6 flex flex-col transition-all duration-500 hover:border-[var(--accent-primary)]/40 hover:shadow-[var(--glow-card-hover)]">
                {/* Quote Icon */}
                <div className="mb-5">
                  <div className="relative w-12 h-12 rounded-xl bg-[var(--accent-primary-muted)] border border-[rgba(0,240,255,0.2)] flex items-center justify-center transition-all duration-500 group-hover:border-[rgba(0,240,255,0.4)] group-hover:shadow-[var(--glow-cyan-subtle)]">
                    <Quote className="w-5 h-5 text-[var(--accent-primary)]" />
                    {/* Decorative Corner */}
                    <div className="absolute -top-1 -right-1 w-3 h-3 border-t border-r border-[var(--accent-primary)]/50 rounded-tr-md" />
                  </div>
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 transition-colors duration-300 ${
                        i < testimonial.rating
                          ? "text-[var(--accent-cta)] fill-[var(--accent-cta)]"
                          : "text-[var(--text-muted)]"
                      }`}
                    />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-[var(--text-secondary)] leading-relaxed flex-1 mb-6 relative">
                  <span className="text-[var(--accent-primary)]/60 text-xl leading-none">
                    「
                  </span>
                  {testimonial.quote}
                  <span className="text-[var(--accent-primary)]/60 text-xl leading-none">
                    」
                  </span>
                </p>

                {/* Author */}
                <div className="pt-5 border-t border-[var(--border-default)]">
                  <div className="flex items-center gap-4">
                    {/* Avatar Placeholder */}
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--accent-primary)]/20 to-[var(--accent-cta)]/20 border border-[var(--border-default)] flex items-center justify-center">
                      <span className="font-display text-sm font-bold text-[var(--accent-primary)]">
                        {testimonial.author.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-display font-semibold text-[var(--text-primary)] tracking-wide">
                        {testimonial.author}
                      </p>
                      <p className="text-xs text-[var(--text-muted)]">
                        {testimonial.company} / {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Hover Border Glow */}
                <div className="absolute inset-0 rounded-2xl transition-opacity duration-500 opacity-0 group-hover:opacity-100 pointer-events-none border border-[var(--accent-primary)]/20" />
              </div>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Decorative Bottom Line */}
      <div className="mt-16 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent-primary)]/30 to-transparent relative z-10" />
    </Section>
  );
}
