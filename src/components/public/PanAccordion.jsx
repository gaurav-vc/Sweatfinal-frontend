import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { resolveMediaUrl } from '../../utils/mediaUrl';

export const PanAccordion = ({ programs = [] }) => {
  const [activeHover, setActiveHover] = useState(null);

  if (!programs || programs.length === 0) {
    return (
      <div className="shot" style={{ minHeight: '300px', width: '100%' }}>
        <b>No Programs Published Yet</b>
        <span>Create programs in CMS Studio to display them dynamically here</span>
      </div>
    );
  }

  return (
    <div className="pans" style={{ marginTop: '56px' }}>
      {programs.map((prog, index) => {
        const itemNumber = prog.number || `0${index + 1}`;
        const isHovered = activeHover === prog.id;
        const heroImg = resolveMediaUrl(prog.hero_image);
        const videoLoop = resolveMediaUrl(prog.featured_video);

        return (
          <Link
            key={prog.id || index}
            to={`/programs/${prog.slug || ''}`}
            className="pan"
            onMouseEnter={() => setActiveHover(prog.id)}
            onMouseLeave={() => setActiveHover(null)}
            style={{
              backgroundImage: heroImg ? `url(${heroImg})` : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {videoLoop && (
              <video
                src={videoLoop}
                autoPlay
                loop
                muted
                playsInline
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: isHovered ? 0.85 : 0.45,
                  transition: 'opacity 0.3s ease',
                  zIndex: 0,
                }}
              />
            )}
            {/* Background Texture Overlay */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
              <div
                className="shot"
                style={{
                  width: '100%',
                  height: '100%',
                  border: 0,
                  opacity: 0.75,
                  background: 'rgba(17, 17, 17, 0.85)',
                }}
              >
                <b>{prog.name} · {prog.tagline?.slice(0, 30) || 'SWEAT Floor'}</b>
              </div>
            </div>

            {/* Gradient Mask */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(rgba(10, 10, 10, 0) 30%, rgba(10, 10, 10, 0.94) 100%)',
                pointerEvents: 'none',
              }}
            />

            {/* Text and Details Container */}
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '14px', zIndex: 2 }}>
              <span className="num red" style={{ fontSize: '40px' }}>
                {itemNumber}
              </span>
              <h3 className="disp vt" style={{ fontSize: '64px', whiteSpace: 'nowrap' }}>
                {prog.name}
              </h3>
              
              <div className="more">
                <p style={{ margin: '0 0 10px', fontSize: '19px', lineHeight: 1.35, fontWeight: 700, color: '#FFFFFF', minWidth: '280px' }}>
                  {prog.tagline}
                </p>
                <p style={{ margin: '0 0 16px', fontSize: '14px', lineHeight: 1.5, color: '#D4D4D4', minWidth: '280px' }}>
                  {prog.description}
                </p>
                <span className="btn btn-red" style={{ minHeight: '46px', fontSize: '12px' }}>
                  Explore →
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default PanAccordion;
