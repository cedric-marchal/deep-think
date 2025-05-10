"use client";

import { motion } from "framer-motion";
import type { ComponentProps, ReactNode } from "react";

// Define types for the motion components
type MotionDivProps = ComponentProps<typeof motion.div> & {
  children: ReactNode;
};

type MotionUlProps = ComponentProps<typeof motion.ul> & {
  children: ReactNode;
};

type MotionLiProps = ComponentProps<typeof motion.li> & {
  children: ReactNode;
};

// Export motion components that can be used from server components
export const MotionDiv = ({ children, ...props }: MotionDivProps) => (
  <motion.div {...props}>{children}</motion.div>
);

export const MotionUl = ({ children, ...props }: MotionUlProps) => (
  <motion.ul {...props}>{children}</motion.ul>
);

export const MotionLi = ({ children, ...props }: MotionLiProps) => (
  <motion.li {...props}>{children}</motion.li>
);

export const MotionCard = ({ children, ...props }: MotionDivProps) => (
  <motion.div {...props}>{children}</motion.div>
);

export const MotionSection = ({ children, ...props }: MotionDivProps) => (
  <motion.section {...props}>{children}</motion.section>
);

export const MotionImage = ({ children, ...props }: MotionDivProps) => (
  <motion.div {...props}>{children}</motion.div>
);

export const MotionHeading = ({ children, ...props }: MotionDivProps) => (
  <motion.h1 {...props}>{children}</motion.h1>
);

export const MotionParagraph = ({ children, ...props }: MotionDivProps) => (
  <motion.p {...props}>{children}</motion.p>
);

export const MotionBadge = ({ children, ...props }: MotionDivProps) => (
  <motion.span {...props}>{children}</motion.span>
);
