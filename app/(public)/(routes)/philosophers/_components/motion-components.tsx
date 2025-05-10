"use client";

import { motion } from "framer-motion";
import type { ComponentProps, ReactNode } from "react";

// Define types for the motion components
type MotionDivProps = ComponentProps<typeof motion.div> & {
  children: ReactNode;
};

type MotionSectionProps = ComponentProps<typeof motion.section> & {
  children: ReactNode;
};

type MotionArticleProps = ComponentProps<typeof motion.article> & {
  children: ReactNode;
};

// Export motion components that can be used from server components
export const MotionDiv = ({ children, ...props }: MotionDivProps) => (
  <motion.div {...props}>{children}</motion.div>
);

export const MotionSection = ({ children, ...props }: MotionSectionProps) => (
  <motion.section {...props}>{children}</motion.section>
);

export const MotionArticle = ({ children, ...props }: MotionArticleProps) => (
  <motion.article {...props}>{children}</motion.article>
);

export const MotionHeading = ({ children, ...props }: MotionDivProps) => (
  <motion.h1 {...props}>{children}</motion.h1>
);

export const MotionHeading2 = ({ children, ...props }: MotionDivProps) => (
  <motion.h2 {...props}>{children}</motion.h2>
);

export const MotionHeading3 = ({ children, ...props }: MotionDivProps) => (
  <motion.h3 {...props}>{children}</motion.h3>
);

export const MotionParagraph = ({ children, ...props }: MotionDivProps) => (
  <motion.p {...props}>{children}</motion.p>
);

export const MotionCard = ({ children, ...props }: MotionDivProps) => (
  <motion.div {...props}>{children}</motion.div>
);

export const MotionHeader = ({ children, ...props }: MotionDivProps) => (
  <motion.header {...props}>{children}</motion.header>
);

export const MotionMain = ({ children, ...props }: MotionDivProps) => (
  <motion.main {...props}>{children}</motion.main>
);
