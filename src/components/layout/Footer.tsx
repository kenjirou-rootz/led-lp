"use client";

import { Container } from "@/components/ui";
import { Mail, Phone, MapPin } from "lucide-react";
import type { SiteSettings } from "@/lib/sanity";

interface FooterProps {
  siteSettings?: SiteSettings;
}

const footerLinks = {
  services: [
    { label: "LEDビジョンレンタル", href: "#" },
    { label: "設置・撤去サービス", href: "#" },
    { label: "映像制作", href: "#" },
    { label: "技術サポート", href: "#" },
  ],
  company: [
    { label: "会社概要", href: "#" },
    { label: "導入事例", href: "#case-study" },
    { label: "お客様の声", href: "#testimonials" },
    { label: "採用情報", href: "#" },
  ],
  support: [
    { label: "よくある質問", href: "#faq" },
    { label: "お問い合わせ", href: "#cta" },
    { label: "プライバシーポリシー", href: "#" },
    { label: "利用規約", href: "#" },
  ],
};

export function Footer({ siteSettings }: FooterProps) {
  const currentYear = new Date().getFullYear();

  // Sanityデータまたはデフォルト値
  const siteName = siteSettings?.siteName || "LEDビジョンレンタル";
  const phoneNumber = siteSettings?.contactPhone || "0120-XXX-XXX";
  const email = siteSettings?.contactEmail || "info@example.com";
  const address = siteSettings?.companyAddress || "〒XXX-XXXX\n東京都渋谷区XXX X-X-X";

  return (
    <footer className="bg-[--bg-secondary] border-t border-[--border-default]">
      <Container>
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[--accent-primary] to-[--accent-secondary] flex items-center justify-center">
                  <span className="text-white font-bold text-sm">LED</span>
                </div>
                <span className="font-bold text-lg text-[--text-primary]">
                  {siteName}
                </span>
              </div>
              <p className="text-[--text-secondary] text-sm mb-6 max-w-xs">
                業界15年・累計3,500件の実績。
                展示会・イベントのLEDビジョンレンタルなら、
                トラブル対応も万全の当社にお任せください。
              </p>
              <div className="space-y-3">
                <a
                  href={`tel:${phoneNumber.replace(/-/g, "")}`}
                  className="flex items-center gap-3 text-[--text-secondary] hover:text-[--text-primary] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[--accent-primary]" />
                  <span className="text-sm">{phoneNumber}（平日 9:00-18:00）</span>
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

            {/* Services */}
            <div>
              <h3 className="font-semibold text-[--text-primary] mb-4">サービス</h3>
              <ul className="space-y-2">
                {footerLinks.services.map((link) => (
                  <li key={link.label}>
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

            {/* Company */}
            <div>
              <h3 className="font-semibold text-[--text-primary] mb-4">会社情報</h3>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
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

            {/* Support */}
            <div>
              <h3 className="font-semibold text-[--text-primary] mb-4">サポート</h3>
              <ul className="space-y-2">
                {footerLinks.support.map((link) => (
                  <li key={link.label}>
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
          </div>
        </div>

        {/* Copyright */}
        <div className="py-6 border-t border-[--border-default]">
          <p className="text-center text-sm text-[--text-muted]">
            © {currentYear} {siteName}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
