import type { MotionProps } from "framer-motion";

// Animation variants for staggered children elements
export const staggerContainer: MotionProps = {
  initial: "hidden",
  animate: "visible",
  viewport: { once: true, margin: "-100px" },
  variants: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  },
};

// Fade in up animation for hero section elements
export const fadeInUp: MotionProps = {
  variants: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
      },
    },
  },
};

// Simple fade in animation for cards
export const fadeIn: MotionProps = {
  variants: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  },
};

// Scale up animation for image
export const scaleUp: MotionProps = {
  variants: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 70,
      },
    },
  },
};

// Slide in animation for card sections
export const slideIn: MotionProps = {
  variants: {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 120,
      },
    },
  },
};

// Bounce animation for items in lists
export const listItemAnimation: MotionProps = {
  variants: {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 80,
      },
    },
  },
};

// Subtle scale animation for quote cards
export const quoteAnimation: MotionProps = {
  variants: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 70,
      },
    },
  },
};
