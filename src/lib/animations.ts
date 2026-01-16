import type { Variants, Transition } from "motion/react";

/* =============================================================================
   LED VISION LP - CINEMA TECH Animation System
   Dramatic, cinematic animations with LED-inspired effects
   ============================================================================= */

// -----------------------------------------------------------------------------
// Transition Presets - Cinematic Timing
// -----------------------------------------------------------------------------

export const springTransition: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 15,
  mass: 1,
};

export const smoothTransition: Transition = {
  duration: 0.6,
  ease: [0.16, 1, 0.3, 1], // easeOutExpo
};

export const fastTransition: Transition = {
  duration: 0.3,
  ease: [0.16, 1, 0.3, 1],
};

export const cinematicTransition: Transition = {
  duration: 1,
  ease: [0.19, 1, 0.22, 1], // easeOutExpo
};

export const dramaticTransition: Transition = {
  duration: 1.2,
  ease: [0.87, 0, 0.13, 1], // easeInOutExpo
};

// -----------------------------------------------------------------------------
// Fade In Variants
// -----------------------------------------------------------------------------

export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: smoothTransition,
  },
};

export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: smoothTransition,
  },
};

export const fadeInDown: Variants = {
  hidden: {
    opacity: 0,
    y: -30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: smoothTransition,
  },
};

export const fadeInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: smoothTransition,
  },
};

export const fadeInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: smoothTransition,
  },
};

// -----------------------------------------------------------------------------
// Scale Variants
// -----------------------------------------------------------------------------

export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: smoothTransition,
  },
};

export const scaleInDramatic: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: cinematicTransition,
  },
};

// -----------------------------------------------------------------------------
// Stagger Container Variants
// -----------------------------------------------------------------------------

export const staggerContainer: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerFast: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

export const staggerContainerDramatic: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

// -----------------------------------------------------------------------------
// Stagger Item Variants
// -----------------------------------------------------------------------------

export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: smoothTransition,
  },
};

export const staggerItemDramatic: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: cinematicTransition,
  },
};

// -----------------------------------------------------------------------------
// Hero Section Variants - CINEMA TECH
// -----------------------------------------------------------------------------

export const heroOverline: Variants = {
  hidden: {
    opacity: 0,
    y: -20,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.19, 1, 0.22, 1],
      delay: 0.2,
    },
  },
};

export const heroHeadline: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.19, 1, 0.22, 1],
      delay: 0.4,
    },
  },
};

export const heroSubheadline: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.19, 1, 0.22, 1],
      delay: 0.6,
    },
  },
};

export const heroCTA: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.19, 1, 0.22, 1],
      delay: 0.8,
    },
  },
};

export const heroBadges: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      delay: 1.0,
      staggerChildren: 0.1,
      delayChildren: 1.0,
    },
  },
};

export const heroBadgeItem: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.19, 1, 0.22, 1],
    },
  },
};

export const heroStats: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 1.2,
    },
  },
};

export const heroStatItem: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.19, 1, 0.22, 1],
    },
  },
};

// -----------------------------------------------------------------------------
// Section Header Variants
// -----------------------------------------------------------------------------

export const sectionHeader: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

export const sectionOverline: Variants = {
  hidden: {
    opacity: 0,
    y: -10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: smoothTransition,
  },
};

export const sectionTitle: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: cinematicTransition,
  },
};

export const sectionSubtitle: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: smoothTransition,
  },
};

// -----------------------------------------------------------------------------
// Card Hover Variants
// -----------------------------------------------------------------------------

export const cardHover = {
  rest: {
    scale: 1,
    y: 0,
  },
  hover: {
    scale: 1.02,
    y: -8,
    transition: fastTransition,
  },
};

export const cardHoverDramatic = {
  rest: {
    scale: 1,
    y: 0,
    rotateX: 0,
    rotateY: 0,
  },
  hover: {
    scale: 1.03,
    y: -12,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// -----------------------------------------------------------------------------
// Button Hover Variants
// -----------------------------------------------------------------------------

export const buttonHover = {
  rest: {
    scale: 1,
  },
  hover: {
    scale: 1.03,
    transition: fastTransition,
  },
  tap: {
    scale: 0.97,
  },
};

export const buttonGlow = {
  rest: {
    boxShadow: "0 0 0 rgba(0, 240, 255, 0)",
  },
  hover: {
    boxShadow: "0 0 30px rgba(0, 240, 255, 0.4), 0 0 60px rgba(0, 240, 255, 0.2)",
    transition: {
      duration: 0.3,
    },
  },
};

// -----------------------------------------------------------------------------
// Viewport Settings
// -----------------------------------------------------------------------------

export const viewportOnce = {
  once: true,
  amount: 0.3,
  margin: "-100px",
};

export const viewportRepeat = {
  once: false,
  amount: 0.2,
};

export const viewportEager = {
  once: true,
  amount: 0.1,
  margin: "-50px",
};

// -----------------------------------------------------------------------------
// Accordion Variants
// -----------------------------------------------------------------------------

export const accordionContent: Variants = {
  collapsed: {
    height: 0,
    opacity: 0,
    transition: {
      height: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
      opacity: { duration: 0.2 },
    },
  },
  expanded: {
    height: "auto",
    opacity: 1,
    transition: {
      height: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
      opacity: { duration: 0.3, delay: 0.15 },
    },
  },
};

export const accordionIcon: Variants = {
  collapsed: {
    rotate: 0,
  },
  expanded: {
    rotate: 180,
    transition: fastTransition,
  },
};

// -----------------------------------------------------------------------------
// Logo Scroll Animation
// -----------------------------------------------------------------------------

export const logoScroll: Variants = {
  animate: {
    x: [0, -1000],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 25,
        ease: "linear",
      },
    },
  },
};

// -----------------------------------------------------------------------------
// Tab Variants
// -----------------------------------------------------------------------------

export const tabContent: Variants = {
  hidden: {
    opacity: 0,
    x: 20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: smoothTransition,
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: { duration: 0.3 },
  },
};

// -----------------------------------------------------------------------------
// Glow Pulse Animation
// -----------------------------------------------------------------------------

export const glowPulse: Variants = {
  initial: {
    boxShadow: "0 0 20px rgba(0, 240, 255, 0.3)",
  },
  animate: {
    boxShadow: [
      "0 0 20px rgba(0, 240, 255, 0.3)",
      "0 0 40px rgba(0, 240, 255, 0.5)",
      "0 0 20px rgba(0, 240, 255, 0.3)",
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// -----------------------------------------------------------------------------
// LED Line Animation
// -----------------------------------------------------------------------------

export const ledLine: Variants = {
  hidden: {
    scaleX: 0,
    opacity: 0,
  },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// -----------------------------------------------------------------------------
// Number Counter Animation (for stats)
// -----------------------------------------------------------------------------

export const numberReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// -----------------------------------------------------------------------------
// Image Reveal Animation
// -----------------------------------------------------------------------------

export const imageReveal: Variants = {
  hidden: {
    opacity: 0,
    scale: 1.1,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// -----------------------------------------------------------------------------
// List Item Stagger
// -----------------------------------------------------------------------------

export const listContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

export const listItem: Variants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};
