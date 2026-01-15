"use client";

import { motion } from "motion/react";
import { Play, ArrowRight, Shield, Users, Clock } from "lucide-react";
import { Container, Button, Badge } from "@/components/ui";
import { heroHeadline, heroSubheadline, heroCTA, heroBadges } from "@/lib/animations";

interface HeroProps {
  headline?: string;
  subheadline?: string;
  videoUrl?: string;
  posterUrl?: string;
}

const trustBadges = [
  { icon: Clock, label: "累計3,500件", value: "の実績" },
  { icon: Shield, label: "代替機即日対応", value: "で安心" },
  { icon: Users, label: "東証プライム上場", value: "企業含む50社以上と取引" },
];

export function Hero({
  headline = "展示会の成功を、映像演出で確実なものに。",
  subheadline = "業界15年・累計3,500件の実績。トラブル時も代替機即日対応で安心。",
  videoUrl,
  posterUrl = "/images/hero-poster.jpg",
}: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pointer-events-none">
      {/* Video Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {videoUrl ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={posterUrl}
            className="w-full h-full object-cover"
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        ) : (
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${posterUrl})`,
              backgroundColor: "var(--bg-secondary)",
            }}
          />
        )}
        {/* Overlay */}
        <div className="video-overlay" />
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid opacity-30" />
        {/* Glow Effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(59,130,246,0.1)_0%,transparent_60%)]" />
      </div>

      {/* Content */}
      <Container className="relative z-10 pt-20 pointer-events-auto">
        <div className="max-w-3xl mx-auto text-center">
          {/* Main Headline */}
          <motion.h1
            variants={heroHeadline}
            initial="hidden"
            animate="visible"
            className="text-[--text-hero] font-bold leading-[--leading-tight] tracking-[--tracking-tight] text-[--text-primary] mb-6"
          >
            <span className="text-gradient">{headline.split("、")[0]}、</span>
            <br className="hidden sm:block" />
            {headline.split("、")[1]}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={heroSubheadline}
            initial="hidden"
            animate="visible"
            className="text-lg md:text-xl text-[--text-secondary] mb-8 max-w-2xl mx-auto"
          >
            {subheadline}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={heroCTA}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Button size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
              無料で相談する
            </Button>
            <Button variant="secondary" size="lg" leftIcon={<Play className="w-5 h-5" />}>
              サービス紹介動画
            </Button>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            variants={heroBadges}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap justify-center gap-4"
          >
            {trustBadges.map((badge, index) => (
              <Badge
                key={index}
                variant="primary"
                size="md"
                icon={<badge.icon className="w-4 h-4" />}
              >
                <span className="font-semibold">{badge.label}</span>
                <span className="text-[--text-secondary]">{badge.value}</span>
              </Badge>
            ))}
          </motion.div>
        </div>
      </Container>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-[--text-muted] flex justify-center pt-2"
        >
          <div className="w-1.5 h-3 rounded-full bg-[--text-muted]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
