"use client";

import { Quote } from "lucide-react";
import { Section } from "@/components/layout";
import { Heading, Card } from "@/components/ui";
import { StaggerContainer, StaggerItem } from "@/components/animation";
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
  const displayTestimonials = testimonialsData && testimonialsData.length > 0
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
    <Section id="testimonials" variant="default">
      <div className="text-center mb-12">
        <Heading as="h2" className="mb-4">
          {title}
        </Heading>
        <p className="text-[--text-secondary] max-w-2xl mx-auto">{subtitle}</p>
      </div>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayTestimonials.map((testimonial) => (
          <StaggerItem key={testimonial.id}>
            <Card variant="default" hoverEffect={true} className="h-full flex flex-col">
              {/* Quote Icon */}
              <div className="mb-4">
                <div className="w-10 h-10 rounded-lg bg-[rgba(59,130,246,0.1)] flex items-center justify-center">
                  <Quote className="w-5 h-5 text-[--accent-primary]" />
                </div>
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${
                      i < testimonial.rating
                        ? "text-[--accent-cta]"
                        : "text-[--text-muted]"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote Text */}
              <p className="text-[--text-secondary] leading-relaxed flex-1 mb-6">
                「{testimonial.quote}」
              </p>

              {/* Author */}
              <div className="pt-4 border-t border-[--border-default]">
                <p className="font-semibold text-[--text-primary]">
                  {testimonial.author}
                </p>
                <p className="text-sm text-[--text-muted]">
                  {testimonial.company} / {testimonial.role}
                </p>
              </div>
            </Card>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </Section>
  );
}
