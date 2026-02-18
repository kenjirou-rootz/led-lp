"use client";

import Image from "next/image";
import { Container } from "@/components/ui";
import { Mail, Phone, MapPin, Zap } from "lucide-react";
import type { SiteSettings, FooterData } from "@/lib/sanity";

interface FooterProps {
  siteSettings?: SiteSettings;
  footerData?: FooterData;
}

const defaultLinkCategories = [
  {
    title: "サービス",
    links: [
      { label: "LEDビジョンレンタル", href: "#" },
      { label: "設置・撤去サービス", href: "#" },
      { label: "映像制作", href: "#" },
      { label: "技術サポート", href: "#" },
    ],
  },
  {
    title: "会社情報",
    links: [
      { label: "会社概要", href: "#" },
      { label: "導入事例", href: "#case-study" },
      { label: "お客様の声", href: "#testimonials" },
      { label: "採用情報", href: "#" },
    ],
  },
  {
    title: "サポート",
    links: [
      { label: "よくある質問", href: "#faq" },
      { label: "お問い合わせ", href: "#cta" },
      { label: "プライバシーポリシー", href: "#" },
      { label: "利用規約", href: "#" },
    ],
  },
];

export function Footer({ siteSettings, footerData }: FooterProps) {
  const currentYear = new Date().getFullYear();

  // データフォールバック: footerData → siteSettings → デフォルト値
  const siteName = siteSettings?.siteName || "LEDビジョンレンタル";
  const phoneNumber = footerData?.phone || siteSettings?.contactPhone || "0120-XXX-XXX";
  const phoneNote = footerData?.phoneNote || "平日 11:00〜19:00";
  const email = footerData?.email || siteSettings?.contactEmail || "info@example.com";
  const address = footerData?.address || siteSettings?.companyAddress || "〒XXX-XXXX\n東京都渋谷区XXX X-X-X";
  const companyDescription = footerData?.companyDescription || "業界15年・累計3,500件の実績。展示会・イベントのLEDビジョンレンタルなら、トラブル対応も万全の当社にお任せください。";
  const copyright = footerData?.copyright || siteName;
  const logoUrl = siteSettings?.logoUrl;
  const logoAlt = siteSettings?.logoAlt || siteName;

  // リンクカテゴリ: CMSデータがあれば使用、なければデフォルト
  const linkCategories =
    footerData?.linkCategories && footerData.linkCategories.length > 0
      ? footerData.linkCategories
      : defaultLinkCategories;

  // カテゴリ数に応じたグリッド
  const gridColsClass =
    linkCategories.length <= 2
      ? "lg:grid-cols-4"
      : linkCategories.length === 3
        ? "lg:grid-cols-5"
        : linkCategories.length === 4
          ? "lg:grid-cols-6"
          : "lg:grid-cols-7";

  return (
    <footer className="bg-[--bg-secondary] border-t border-[--border-default]">
      <Container>
        <div className="py-12 md:py-16">
          <div className={`grid grid-cols-1 md:grid-cols-2 ${gridColsClass} gap-8 lg:gap-12`}>
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                {logoUrl ? (
                  <Image
                    src={logoUrl}
                    alt={logoAlt}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-lg object-contain"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[--accent-primary] to-[--accent-secondary] flex items-center justify-center">
                    <Zap className="w-4 h-4 text-white fill-white" />
                  </div>
                )}
                <span className="font-bold text-lg text-[--text-primary]">
                  {siteName}
                </span>
              </div>
              <p className="text-[--text-secondary] text-sm mb-6 max-w-xs">
                {companyDescription}
              </p>
              <div className="space-y-3">
                <a
                  href={`tel:${phoneNumber.replace(/-/g, "")}`}
                  className="flex items-center gap-3 text-[--text-secondary] hover:text-[--text-primary] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[--accent-primary]" />
                  <span className="text-sm">{phoneNumber}（{phoneNote}）</span>
                </a>
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-3 text-[--text-secondary] hover:text-[--text-primary] transition-colors"
                >
                  <Mail className="w-4 h-4 text-[--accent-primary]" />
                  <span className="text-sm">{email}</span>
                </a>
                <div className="flex items-start gap-3 text-[--text-secondary]">
                  <MapPin className="w-4 h-4 text-[--accent-primary] mt-0.5" />
                  <span className="text-sm whitespace-pre-line">
                    {address}
                  </span>
                </div>
              </div>
            </div>

            {/* Dynamic Link Categories */}
            {linkCategories.map((category, index) => (
              <div key={index}>
                <h3 className="font-semibold text-[--text-primary] mb-4">{category.title}</h3>
                <ul className="space-y-2">
                  {category.links?.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={link.href}
                        className="text-sm text-[--text-secondary] hover:text-[--text-primary] transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="py-6 border-t border-[--border-default]">
          <p className="text-center text-sm text-[--text-muted]">
            &copy; {currentYear} {copyright}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
