import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
        className={`${geistSans.variable} ${geistMono.variable} ${notoSansJP.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
