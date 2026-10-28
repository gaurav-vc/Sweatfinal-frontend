import React from 'react';
import { motion } from 'framer-motion';

export const AnimatedHeadline = ({ children, className = "disp", style = {}, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedHeadline;
