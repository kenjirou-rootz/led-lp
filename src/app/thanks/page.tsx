import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, ArrowLeft, Clock, Mail } from "lucide-react";
import { inquiryTypeLabels, type InquiryType } from "@/lib/validations/contact";

export const metadata: Metadata = {
  title: "無料相談 受付完了 | LEDビジョンレンタル",
  description:
    "無料相談のお申し込みを受け付けました。担当者より1営業日以内にご連絡いたします。",
  // サンクスページは検索結果に出す必要がないため除外する
  robots: { index: false, follow: false },
};

interface ThanksPageProps {
  searchParams: Promise<{ type?: string }>;
}

export default async function ThanksPage({ searchParams }: ThanksPageProps) {
  const { type } = await searchParams;
  const inquiryLabel =
    type === "rental" || type === "purchase"
      ? inquiryTypeLabels[type as InquiryType]
      : null;

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-24 bg-[var(--bg-primary)]">
      <div className="w-full max-w-2xl text-center">
        <div className="relative inline-flex items-center justify-center mb-10">
          <div className="w-24 h-24 rounded-full bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/30 flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-[var(--accent-primary)]" />
          </div>
          <div className="absolute inset-0 rounded-full bg-[var(--accent-primary)]/20 blur-xl" />
        </div>

        <p className="font-[family-name:var(--font-display)] tracking-[0.3em] text-sm text-[var(--accent-cta)] mb-4">
          THANK YOU
        </p>

        <h1 className="font-[family-name:var(--font-japanese)] text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-6">
          お問い合わせありがとうございます
        </h1>

        {inquiryLabel && (
          <p className="inline-block px-4 py-1.5 mb-6 rounded-full border border-[var(--border-default)] text-sm text-[var(--text-secondary)]">
            お問い合わせ種別：{inquiryLabel}
          </p>
        )}

        <p className="font-[family-name:var(--font-japanese)] text-[var(--text-secondary)] leading-relaxed mb-10">
          無料相談のお申し込みを受け付けました。
          <br />
          内容を確認のうえ、担当者よりご連絡いたします。
        </p>

        <div className="grid gap-4 sm:grid-cols-2 mb-12 text-left">
          <div className="p-5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-default)]">
            <Clock className="w-5 h-5 text-[var(--accent-cta)] mb-3" />
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              1営業日以内に担当者よりご連絡いたします。
            </p>
          </div>
          <div className="p-5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-default)]">
            <Mail className="w-5 h-5 text-[var(--accent-cta)] mb-3" />
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              自動返信メールが届かない場合は、迷惑メールフォルダをご確認ください。
            </p>
          </div>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-[var(--border-default)] text-[var(--text-primary)] hover:border-[var(--border-hover)] transition-colors duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
          トップページに戻る
        </Link>
      </div>
    </main>
  );
}
