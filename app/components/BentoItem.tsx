'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface BentoItemProps {
  children: ReactNode;
  className?: string;
  showBottomBorder?: boolean;
  showRightBorder?: boolean;
}

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

export default function BentoItem({
  children,
  className = '',
  showBottomBorder = false,
  showRightBorder = false,
}: BentoItemProps) {
  return (
    <motion.div
      className={`bento-item relative ${className}`}
      data-bottom-border={showBottomBorder ? 'true' : 'false'}
      data-right-border={showRightBorder ? 'true' : 'false'}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={itemVariants}
    >

      {/* Bottom Border - moves left to right */}
      <motion.div
        className="bento-border-bottom absolute bottom-0 left-0 right-0 h-[1px] overflow-hidden"
        style={{ zIndex: 10 }}
      >
        <motion.div
          className="h-full w-[200%]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              to right,
              var(--grid-line) 0px,
              var(--grid-line) 8px,
              transparent 8px,
              transparent 16px
            )`,
          }}
          animate={{
            x: [0, 16],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </motion.div>

      {/* Right Border - moves top to bottom */}
      <motion.div
        className="bento-border-right absolute top-0 bottom-0 right-0 w-[1px] overflow-hidden"
        style={{ zIndex: 10 }}
      >
        <motion.div
          className="w-full h-[200%]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              to bottom,
              var(--grid-line) 0px,
              var(--grid-line) 8px,
              transparent 8px,
              transparent 16px
            )`,
          }}
          animate={{
            y: [0, -16],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </motion.div>

      <span className="bento-corner bento-corner-tl" aria-hidden="true" />
      <span className="bento-corner bento-corner-tr" aria-hidden="true" />
      <span className="bento-corner bento-corner-bl" aria-hidden="true" />
      <span className="bento-corner bento-corner-br" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-20">{children}</div>
    </motion.div>
  );
}
