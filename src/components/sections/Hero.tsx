"use client";

import { motion } from "motion/react";
import { ArrowRight, Zap, Shield, TrendingUp } from "lucide-react";
import { Container, Button } from "@/components/ui";
import {
  heroOverline,
  heroHeadline,
  heroSubheadline,
  heroCTA,
  heroStats,
  heroStatItem,
} from "@/lib/animations";

// Animated Dot Wave Component - Fine dot pattern with multiply blend (Optimized)
function AnimatedDotWave() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `
          radial-gradient(circle, rgba(0, 0, 0, 0.8) 0.8px, transparent 0.8px),
          radial-gradient(circle, rgba(0, 0, 0, 0.8) 0.8px, transparent 0.8px)
        `,
        backgroundSize: '4px 4px',
        backgroundPosition: '0 0, 2px 2px',
        mixBlendMode: 'multiply',
      }}
    />
  );
}

// Animated organic gradient overlay - 蠢くグラデーション (Optimized: 5→3 elements, reduced blur)
function AnimatedGradientOverlay() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Primary soft dark blob - GPU optimized */}
      <motion.div
        className="absolute w-[200%] h-[200%]"
        style={{
          background: `
            radial-gradient(ellipse 50% 50% at 50% 50%, transparent 0%, transparent 20%, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0.7) 100%)
          `,
          filter: 'blur(50px)',
          willChange: 'transform',
        }}
        animate={{
          x: ['-50%', '-30%', '-60%', '-40%', '-50%'],
          y: ['-50%', '-40%', '-55%', '-45%', '-50%'],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Secondary dark area - combined layer */}
      <motion.div
        className="absolute w-[180%] h-[180%]"
        style={{
          background: `
            radial-gradient(ellipse 45% 45% at 50% 50%, transparent 0%, transparent 25%, rgba(0, 0, 0, 0.45) 55%, rgba(0, 0, 0, 0.6) 100%)
          `,
          filter: 'blur(40px)',
          willChange: 'transform',
        }}
        animate={{
          x: ['-40%', '-25%', '-50%', '-35%', '-40%'],
          y: ['-40%', '-50%', '-30%', '-45%', '-40%'],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Orange glow - combined and optimized */}
      <motion.div
        className="absolute w-[150%] h-[150%]"
        style={{
          background: `
            radial-gradient(ellipse 50% 50% at 50% 50%, rgba(255, 100, 0, 0.4) 0%, rgba(255, 80, 0, 0.2) 35%, transparent 65%)
          `,
          filter: 'blur(20px)',
          mixBlendMode: 'overlay',
          willChange: 'transform',
        }}
        animate={{
          x: ['-25%', '0%', '-30%', '-10%', '-25%'],
          y: ['-25%', '-35%', '-15%', '-30%', '-25%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

interface HeroProps {
  headline?: string;
  subheadline?: string;
  backgroundType?: "image" | "video" | "youtube";
  backgroundImageUrl?: string;
  backgroundVideoUrl?: string;
  youtubeUrl?: string;
  posterUrl?: string;
}

// Stats data - LED themed metrics
const heroMetrics = [
  { value: "15", suffix: "年", label: "業界実績", icon: TrendingUp },
  { value: "3,500", suffix: "件+", label: "累計案件", icon: Zap },
  { value: "50", suffix: "社+", label: "取引企業", icon: Shield },
];

// YouTube URLからビデオIDを抽出
function extractYouTubeId(url: string): string | null {
  const regExp = /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[1].length === 11 ? match[1] : null;
}

export function Hero({
  headline = "イベントの成功は映像演出で決まる。、映像演出で確実なものに。",
  subheadline = "業界15年・累計3,500件の実績。確実に成功へ導く映像のプロ集団",
  backgroundType = "image",
  backgroundImageUrl,
  backgroundVideoUrl,
  youtubeUrl,
  posterUrl = "/images/hero-poster.jpg",
}: HeroProps) {
  const youtubeId = youtubeUrl ? extractYouTubeId(youtubeUrl) : null;

  // 背景コンテンツをレンダリング
  const renderBackground = () => {
    switch (backgroundType) {
      case "video":
        if (backgroundVideoUrl) {
          return (
            <video
              autoPlay
              muted
              loop
              playsInline
              poster={backgroundImageUrl || posterUrl}
              className="w-full h-full object-cover"
            >
              <source src={backgroundVideoUrl} type="video/mp4" />
            </video>
          );
        }
        break;

      case "youtube":
        if (youtubeId) {
          return (
            <div className="w-full h-full relative overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.78vh] min-w-full h-[56.25vw] min-h-full"
                style={{ border: "none" }}
              />
            </div>
          );
        }
        break;

      case "image":
      default:
        break;
    }

    // フォールバック: 画像表示
    return (
      <div
        className="w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImageUrl || posterUrl})`,
          backgroundColor: "var(--bg-secondary)",
        }}
      />
    );
  };

  // Split headline for styled rendering
  const headlineParts = headline.split("、");

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* ===== Background Layers ===== */}
      <div className="absolute inset-0 z-0">
        {/* Base Background (Video/Image) */}
        {renderBackground()}

        {/* Minimal dark overlay for readability - bottom only */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--bg-primary)]" />

        {/* Animated organic gradient overlay - 蠢くグラデーション */}
        <AnimatedGradientOverlay />

        {/* LED Pixel Grid Pattern */}
        <div className="absolute inset-0 bg-pixel-grid opacity-30" />

        {/* Scanline Effect */}
        <div className="absolute inset-0 scanline-overlay opacity-20" />

        {/* Animated Dot Wave Pattern */}
        <AnimatedDotWave />

        {/* Noise texture */}
        <div className="absolute inset-0 bg-noise opacity-40" />
      </div>

      {/* ===== Main Content ===== */}
      <Container className="relative z-10 pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="max-w-4xl mx-auto">
          {/* Overline Badge - Orange themed */}
          <motion.div
            variants={heroOverline}
            initial="hidden"
            animate="visible"
            className="flex justify-center md:justify-start mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent-cta-muted)] border border-[rgba(255,107,0,0.3)] backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-cta)] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent-cta)]" />
              </span>
              <span className="font-display text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--accent-cta)]">
                LED Vision Rental
              </span>
            </div>
          </motion.div>

          {/* Main Headline - Orange gradient */}
          <motion.h1
            variants={heroHeadline}
            initial="hidden"
            animate="visible"
            className="text-center md:text-left"
          >
            <span className="block font-display text-[clamp(2.5rem,7vw,5rem)] font-black leading-[1.1] tracking-wide">
              <span className="text-gradient-orange text-glow-orange">{headlineParts[0]}、</span>
              <br className="hidden sm:block" />
              <span className="text-[var(--text-primary)]">
                {headlineParts[1] || "映像演出で確実なものに。"}
              </span>
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={heroSubheadline}
            initial="hidden"
            animate="visible"
            className="mt-8 text-lg md:text-xl text-white leading-relaxed max-w-2xl text-center md:text-left mx-auto md:mx-0"
          >
            {subheadline}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={heroCTA}
            initial="hidden"
            animate="visible"
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
          >
            <Button
              size="lg"
              className="group relative overflow-hidden bg-[var(--accent-cta)] hover:bg-[var(--accent-cta-hover)] shadow-[var(--glow-orange)]"
              rightIcon={
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              }
            >
              <span className="relative z-10">無料で相談する</span>
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="backdrop-blur-sm border-[var(--accent-cta)]/30 hover:border-[var(--accent-cta)]/60"
            >
              サービス詳細を見る
            </Button>
          </motion.div>

          {/* Stats Row - Orange accents */}
          <motion.div
            variants={heroStats}
            initial="hidden"
            animate="visible"
            className="mt-16 pt-10 border-t border-[var(--accent-cta)]/20"
          >
            <div className="grid grid-cols-3 gap-6 md:gap-12">
              {heroMetrics.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={heroStatItem}
                  className="text-center md:text-left"
                >
                  <div className="flex items-baseline justify-center md:justify-start gap-1 whitespace-nowrap">
                    <span className="font-display text-2xl sm:text-3xl md:text-5xl font-black text-[var(--text-primary)] tracking-tight">
                      {stat.value}
                    </span>
                    <span className="font-display text-base sm:text-lg md:text-2xl font-bold text-[var(--accent-cta)]">
                      {stat.suffix}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-center md:justify-start gap-2">
                    <stat.icon className="w-4 h-4 text-[var(--accent-cta)] opacity-60" />
                    <span className="text-sm text-[var(--text-muted)] uppercase tracking-wide">
                      {stat.label}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>

      {/* ===== Scroll Indicator - Orange themed ===== */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
            Scroll
          </span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-[var(--accent-cta)] to-transparent" />
        </motion.div>
      </motion.div>

      {/* ===== Decorative LED Lines - Orange ===== */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent-cta)]/50 to-transparent" />
    </section>
  );
}
