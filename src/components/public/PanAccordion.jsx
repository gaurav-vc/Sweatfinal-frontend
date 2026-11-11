import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { resolveMediaUrl } from '../../utils/mediaUrl';

export const PanAccordion = ({ programs = [] }) => {
  const [activeHover, setActiveHover] = useState(null);

  if (!programs || programs.length === 0) {
    return (
      <div className="shot" style={{ minHeight: '320px', width: '100%' }}>
        <b>No Programs Published Yet</b>
        <span>Create programs in CMS Studio to display them dynamically here</span>
      </div>
    );
  }

  return (
    <div className="pans">
      {programs.map((prog, index) => {
        const itemNumber = prog.number || `0${index + 1}`;
        const isHovered = activeHover === (prog.id ?? index);
        const heroImg = resolveMediaUrl(prog.hero_image);
        const videoLoop = resolveMediaUrl(prog.featured_video);

        return (
          <Link
            key={prog.id || index}
            to={`/programs/${prog.slug || ''}`}
            className={`pan ${isHovered ? 'active' : ''}`}
            onMouseEnter={() => setActiveHover(prog.id ?? index)}
            onMouseLeave={() => setActiveHover(null)}
            style={{
              backgroundImage: heroImg ? `url(${heroImg})` : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Background Video Loop */}
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
                  opacity: isHovered ? 0.88 : 0.35,
                  transition: 'opacity 0.4s ease',
                  zIndex: 0,
                }}
              />
            )}

            {/* Dark Cinematic Gradient Vignette (Clean gradient, no overriding text) */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: isHovered
                  ? 'linear-gradient(to top, rgba(10, 10, 10, 0.98) 0%, rgba(10, 10, 10, 0.72) 42%, rgba(10, 10, 10, 0.25) 100%)'
                  : 'linear-gradient(to top, rgba(10, 10, 10, 0.95) 0%, rgba(10, 10, 10, 0.55) 50%, rgba(10, 10, 10, 0.38) 100%)',
                transition: 'background 0.4s ease',
                pointerEvents: 'none',
                zIndex: 1,
              }}
            />

            {/* Subtle camera reticle corner brackets */}
            <span
              style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                width: '14px',
                height: '14px',
                borderLeft: '2px solid #E10600',
                borderTop: '2px solid #E10600',
                pointerEvents: 'none',
                zIndex: 4,
                opacity: isHovered ? 1 : 0.6,
                transition: 'opacity 0.3s ease',
              }}
            />

            {/* TOP BAR: Number anchored at top to prevent any overlap with rotated titles */}
            <div className="pan-top">
              <span className="pan-number">{itemNumber}</span>
              {isHovered && (
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#E10600',
                    background: 'rgba(225, 6, 0, 0.12)',
                    padding: '4px 10px',
                    borderRadius: '2px',
                    border: '1px solid rgba(225, 6, 0, 0.35)',
                    animation: 'fadeIn 0.3s ease',
                  }}
                >
                  {prog.duration || 'DISCIPLINE'}
                </span>
              )}
            </div>

            {/* BOTTOM SPINE & EXPANDED CONTENT: Anchored to the bottom */}
            <div className="pan-bottom">
              <h3 className="disp vt">
                {prog.name}
              </h3>

              {/* Expanded details revealed smoothly on hover */}
              <div className="more">
                {prog.tagline && (
                  <p
                    style={{
                      margin: 0,
                      fontSize: 'clamp(16px, 1.3vw, 19px)',
                      lineHeight: 1.35,
                      fontWeight: 700,
                      color: '#FFFFFF',
                      maxWidth: '520px',
                    }}
                  >
                    {prog.tagline}
                  </p>
                )}

                {prog.description && (
                  <p
                    style={{
                      margin: 0,
                      fontSize: '14px',
                      lineHeight: 1.55,
                      color: '#C8C8C8',
                      maxWidth: '480px',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {prog.description}
                  </p>
                )}

                {prog.class_ratio && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#E10600' }} />
                    <span style={{ fontSize: '12px', color: '#9E9E9E', letterSpacing: '0.04em' }}>
                      {prog.class_ratio}
                    </span>
                  </div>
                )}

                <div style={{ paddingTop: '8px' }}>
                  <span
                    className="btn btn-red"
                    style={{
                      minHeight: '44px',
                      padding: '0 24px',
                      fontSize: '12px',
                      letterSpacing: '0.08em',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    Explore Program
                    <ArrowUpRight size={16} />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default PanAccordion;
