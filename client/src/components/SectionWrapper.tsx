import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  id?: string;
  delay?: number;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const containerVariantsReduced = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const itemVariantsReduced = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 },
};

export default function SectionWrapper({
  children,
  className = "",
  id,
  delay = 0,
}: SectionWrapperProps) {
  const prefersReducedMotion = useReducedMotion();
  return (
    <motion.section
      id={id}
      variants={prefersReducedMotion ? containerVariantsReduced : containerVariants}
      initial={prefersReducedMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: prefersReducedMotion ? 0 : delay }}
      className={`relative ${className}`}
    >
      {children}
    </motion.section>
  );
}
