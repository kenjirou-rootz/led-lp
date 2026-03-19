"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Section } from "@/components/layout";
import { FadeInView } from "@/components/animation";
import type { BeltSliderData } from "@/lib/sanity";

interface BeltSliderProps {
  id?: string;
  data?: BeltSliderData;
}

export function BeltSlider({ id, data }: BeltSliderProps) {
  const heading = data?.heading;
  const images = data?.images || [];

  if (images.length === 0) return null;

  // 画像を複製してシームレスなループを実現
  const duplicatedImages = [...images, ...images];
  const imageWidth = 272; // w-64 = 256px + gap 16px
  const totalWidth = imageWidth * images.length;

  return (
    <Section
      id={id}
      variant="default"
      noPadding
      className="py-12 md:py-16 overflow-hidden"
    >
      <div className="relative z-10">
        {/* Heading */}
        {heading && (
          <FadeInView className="text-center mb-8">
            <h3 className="font-display text-xl md:text-2xl font-bold text-[var(--text-primary)] tracking-wide">
              {heading}
            </h3>
          </FadeInView>
        )}

        {/* Infinite Scroll */}
        <div className="relative">
          {/* Gradient Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[var(--bg-primary)] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[var(--bg-primary)] to-transparent z-10 pointer-events-none" />

          {/* Decorative LED Lines */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent-primary)]/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent-primary)]/20 to-transparent" />

          {/* Scrolling Images */}
          <motion.div
            className="flex gap-4 py-4"
            animate={{
              x: [0, -totalWidth],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: images.length * 4,
                ease: "linear",
              },
            }}
          >
            {duplicatedImages.map((image, index) => (
              <div
                key={`${image.url}-${index}`}
                className="flex-shrink-0 w-64 h-40 rounded-xl overflow-hidden border border-[var(--border-default)] bg-[var(--bg-card)]"
              >
                <Image
                  src={image.url}
                  alt={image.alt || ""}
                  width={256}
                  height={160}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
