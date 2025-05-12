import type { MotionProps } from "framer-motion";

// Container principal avec animation en séquence des enfants
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

// Animation de la section Hero
export const heroAnimation: MotionProps = {
  variants: {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 60,
      },
    },
  },
};

// Animation pour le badge
export const badgeAnimation: MotionProps = {
  variants: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 80,
        delay: 0.2,
      },
    },
  },
};

// Animation pour les titres principaux
export const headingAnimation: MotionProps = {
  variants: {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 70,
        delay: 0.3,
      },
    },
  },
};

// Animation pour les sous-titres et textes d'introduction
export const textAnimation: MotionProps = {
  variants: {
    hidden: { opacity: 0, y: -15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 90,
        delay: 0.4,
      },
    },
  },
};

// Animation pour les boutons CTA
export const buttonAnimation: MotionProps = {
  variants: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 70,
        delay: 0.5,
      },
    },
  },
};

// Animation pour les sections de contenu
export const sectionAnimation: MotionProps = {
  variants: {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 50,
      },
    },
  },
};

// Animation pour les cartes de philosophes
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

// Animation pour les caractéristiques (icons + texte)
export const featureAnimation: MotionProps = {
  variants: {
    hidden: { opacity: 0, y: 20, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 18,
        stiffness: 60,
      },
    },
  },
};

// Animation pour les cartes de prix
export const pricingCardAnimation: MotionProps = {
  variants: {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 50,
      },
    },
  },
};

// Animation pour les témoignages
export const testimonialAnimation: MotionProps = {
  variants: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 18,
        stiffness: 60,
      },
    },
  },
};

// Animation pour la section CTA finale
export const ctaAnimation: MotionProps = {
  variants: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 60,
      },
    },
  },
};
