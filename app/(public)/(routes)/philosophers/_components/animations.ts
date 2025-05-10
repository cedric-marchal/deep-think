import type { MotionProps } from "framer-motion";

// Main container animation with staggered children
export const staggerContainer: MotionProps = {
  initial: "hidden",
  animate: "visible",
  viewport: { once: true, margin: "-50px" },
  variants: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
};

// Heading animation that fades and slides down
export const headerAnimation: MotionProps = {
  variants: {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 70,
      },
    },
  },
};

// For subheading text
export const subHeaderAnimation: MotionProps = {
  variants: {
    hidden: { opacity: 0, y: -15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 90,
        delay: 0.1,
      },
    },
  },
};

// Grid animation for card container
export const gridAnimation: MotionProps = {
  variants: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  },
};

// For individual cards
export const cardAnimation: MotionProps = {
  variants: {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 70,
      },
    },
  },
};

// For filter components
export const filterAnimation: MotionProps = {
  variants: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 100,
      },
    },
  },
};

// Empty state animation
export const emptyStateAnimation: MotionProps = {
  variants: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 60,
      },
    },
  },
};
