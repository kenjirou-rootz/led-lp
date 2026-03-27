"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

// LED BOOT SEQUENCE - Cinema Tech Loading Screen
export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [phase, setPhase] = useState(0); // 0: init, 1: logo, 2: scanline, 3: exit

  const handleLoadComplete = useCallback(() => {
    setPhase(3);
    setTimeout(() => setIsLoading(false), 800);
  }, []);

  useEffect(() => {
    const phaseTimers = [
      setTimeout(() => setPhase(1), 100),
      setTimeout(() => setPhase(2), 600),
    ];

    let windowLoaded = false;
    let minimumTimePassed = false;

    const tryComplete = () => {
      if (windowLoaded && minimumTimePassed) {
        handleLoadComplete();
      }
    };

    const onLoad = () => {
      windowLoaded = true;
      tryComplete();
    };

    const minimumTimer = setTimeout(() => {
      minimumTimePassed = true;
      tryComplete();
    }, 1800);

    if (document.readyState === "complete") {
      windowLoaded = true;
    } else {
      window.addEventListener("load", onLoad);
    }

    const fallbackTimer = setTimeout(() => {
      handleLoadComplete();
    }, 4000);

    return () => {
      phaseTimers.forEach(clearTimeout);
      clearTimeout(minimumTimer);
      clearTimeout(fallbackTimer);
      window.removeEventListener("load", onLoad);
    };
  }, [handleLoadComplete]);

  if (!isLoading) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="loading-screen"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
          aria-hidden="true"
        >
          {/* Background: LED Pixel Grid */}
          <div className="loading-grid" />

          {/* Noise texture */}
          <div className="loading-noise" />

          {/* Center content */}
          <div className="loading-content">
            {/* Overline label */}
            <motion.div
              className="loading-overline"
              initial={{ opacity: 0, y: 8 }}
              animate={phase >= 1 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              CINEMA TECH
            </motion.div>

            {/* Logo text: LED VISION */}
            <div className="loading-logo" aria-label="LED VISION">
              {"LEDVISION".split("").map((char, i) => (
                <motion.span
                  key={i}
                  className="loading-char"
                  initial={{ opacity: 0, filter: "blur(8px)" }}
                  animate={
                    phase >= 1
                      ? {
                          opacity: 1,
                          filter: "blur(0px)",
                        }
                      : {}
                  }
                  transition={{
                    duration: 0.4,
                    delay: i * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {i === 3 && <span className="loading-space" />}
                  {char}
                </motion.span>
              ))}
            </div>

            {/* Subtitle */}
            <motion.div
              className="loading-subtitle"
              initial={{ opacity: 0 }}
              animate={phase >= 2 ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              LOADING
              <span className="loading-dots">
                <span className="loading-dot" />
                <span className="loading-dot" />
                <span className="loading-dot" />
              </span>
            </motion.div>
          </div>

          {/* Scanline progress bar */}
          <div className="loading-progress-track">
            <motion.div
              className="loading-progress-bar"
              initial={{ scaleX: 0 }}
              animate={
                phase >= 2
                  ? { scaleX: phase >= 3 ? 1 : 0.85 }
                  : {}
              }
              transition={{
                duration: phase >= 3 ? 0.3 : 2.5,
                ease: phase >= 3 ? [0.16, 1, 0.3, 1] : [0.4, 0, 0.2, 1],
              }}
            />
          </div>

          {/* Horizontal scanline sweep */}
          {phase >= 2 && phase < 3 && (
            <motion.div
              className="loading-scanline"
              initial={{ top: "0%" }}
              animate={{ top: "100%" }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
