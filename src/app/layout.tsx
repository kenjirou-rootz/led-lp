import type { Metadata } from "next";
import { Orbitron, Outfit, Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import "./globals.css";

// Display font - Futuristic, geometric, LED-inspired
// Orbitron evokes digital displays and sci-fi interfaces
const orbitron = Orbitron({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

// Body font - Distinctive geometric sans with excellent readability
// Outfit: modern, geometric yet warm, avoids generic AI aesthetics
const outfit = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

// Japanese support - Sans-serif
const notoSansJP = Noto_Sans_JP({
  variable: "--font-japanese",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Japanese Mincho (Serif) - For section titles
// 明朝体: elegant, traditional, authoritative for headlines
const notoSerifJP = Noto_Serif_JP({
  variable: "--font-mincho",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: "LEDビジョンレンタル | 展示会・イベントの映像演出",
  description:
    "業界15年・累計3,500件の実績。展示会・イベントのLEDビジョンレンタルなら、トラブル時も代替機即日対応で安心。無料相談受付中。",
  keywords: [
    "LEDビジョン",
    "レンタル",
    "展示会",
    "イベント",
    "映像演出",
    "大型ディスプレイ",
  ],
  openGraph: {
    title: "LEDビジョンレンタル | 展示会・イベントの映像演出",
    description:
      "業界15年・累計3,500件の実績。展示会・イベントのLEDビジョンレンタルなら、トラブル時も代替機即日対応で安心。",
    type: "website",
    locale: "ja_JP",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${orbitron.variable} ${outfit.variable} ${notoSansJP.variable} ${notoSerifJP.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
