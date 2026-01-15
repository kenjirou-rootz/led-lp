import type { Variants, Transition } from "motion/react";

/* =============================================================================
   LED VISION LP - Animation Variants
   B2B向け控えめ+スクロール連動アニメーション
   ============================================================================= */

// -----------------------------------------------------------------------------
// Transition Presets
// -----------------------------------------------------------------------------

export const springTransition: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 15,
  mass: 1,
};

export const smoothTransition: Transition = {
  duration: 0.6,
  ease: [0.16, 1, 0.3, 1],
};

export const fastTransition: Transition = {
  duration: 0.3,
  ease: [0.16, 1, 0.3, 1],
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
    y: 20,
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
    y: -20,
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
    x: -20,
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
    x: 20,
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
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: smoothTransition,
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

// -----------------------------------------------------------------------------
// Hero Section Variants
// -----------------------------------------------------------------------------

export const heroHeadline: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const heroSubheadline: Variants = {
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
      delay: 0.2,
    },
  },
};

export const heroCTA: Variants = {
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
      delay: 0.4,
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
      delay: 0.6,
    },
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
    y: -4,
    transition: fastTransition,
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
    scale: 1.02,
    transition: fastTransition,
  },
  tap: {
    scale: 0.98,
  },
};

// -----------------------------------------------------------------------------
// Viewport Settings
// -----------------------------------------------------------------------------

export const viewportOnce = {
  once: true,
  amount: 0.3,
  margin: "-50px",
};

export const viewportRepeat = {
  once: false,
  amount: 0.2,
};

// -----------------------------------------------------------------------------
// Accordion Variants
// -----------------------------------------------------------------------------

export const accordionContent: Variants = {
  collapsed: {
    height: 0,
    opacity: 0,
    transition: {
      height: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
      opacity: { duration: 0.2 },
    },
  },
  expanded: {
    height: "auto",
    opacity: 1,
    transition: {
      height: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
      opacity: { duration: 0.3, delay: 0.1 },
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
        duration: 20,
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
    x: 10,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: fastTransition,
  },
  exit: {
    opacity: 0,
    x: -10,
    transition: { duration: 0.2 },
  },
};
