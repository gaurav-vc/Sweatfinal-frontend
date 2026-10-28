import React from 'react';
import { motion } from 'framer-motion';

export const MarqueeBanner = ({ text = "STRONGER ✕ LEANER ✕ SURE OF YOURSELF ✕ WHERE THE STARS TRAIN ✕ " }) => {
  return (
    <div
      className="marquee"
      aria-hidden="true"
      style={{
        background: '#E10600',
        color: '#FFFFFF',
        height: '84px',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        userSelect: 'none',
      }}
    >
      <motion.div
        className="disp"
        style={{ fontSize: '44px', paddingTop: '4px', display: 'flex', whiteSpace: 'nowrap' }}
        animate={{ x: ['0%', '-50%'] }}
        transition={{ repeat: Infinity, ease: 'linear', duration: 18 }}
      >
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
      </motion.div>
    </div>
  );
};

export default MarqueeBanner;
