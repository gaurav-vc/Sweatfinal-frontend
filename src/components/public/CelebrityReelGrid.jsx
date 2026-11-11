import React, { useState } from 'react';
import { Play, X } from 'lucide-react';
import { resolveMediaUrl, isVideoMedia } from '../../utils/mediaUrl';

export const CelebrityReelGrid = ({ celebrities = [] }) => {
  const [activeMedia, setActiveMedia] = useState(null);

  if (!celebrities || celebrities.length === 0) {
    return (
      <div className="shot" style={{ minHeight: '260px', width: '100%' }}>
        <b>No Celebrity Cards Published Yet</b>
        <span>Upload photos or vertical video reels from CMS Studio to display them dynamically here</span>
      </div>
    );
  }

  const isCount3 = celebrities.length === 3;

  return (
    <>
      <div className={`celeb-reel-grid ${isCount3 ? 'count-3' : ''}`}>
        {celebrities.map((celeb, idx) => {
          const mediaUrl = celeb.video_url || celeb.video_file || celeb.thumbnail;
          const isVideo = isVideoMedia(mediaUrl);
          const resolvedSrc = resolveMediaUrl(mediaUrl);

          return (
            <div
              key={celeb.id || idx}
              className="celeb-card"
              onClick={() => {
                if (resolvedSrc) {
                  setActiveMedia({ ...celeb, resolvedSrc, isVideo });
                }
              }}
            >
              <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.12)' }}>
                
                {/* Media Container with reticle styling */}
                <div
                  className="shot"
                  style={{
                    height: 'clamp(500px, 58vh, 620px)',
                    padding: 0,
                    overflow: 'hidden',
                    background: '#111111',
                    position: 'relative'
                  }}
                >
                  {resolvedSrc ? (
                    isVideo ? (
                      <video
                        src={resolvedSrc}
                        autoPlay
                        loop
                        muted
                        playsInline
                        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
                      />
                    ) : (
                      <img
                        src={resolvedSrc}
                        alt={celeb.star_name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
                      />
                    )
                  ) : (
                    <div style={{ padding: '24px', textAlign: 'center' }}>
                      <b style={{ color: '#FFFFFF', fontSize: '16px' }}>{celeb.star_name}</b>
                      <span>with the SWEAT team · {celeb.duration_label || 'vertical reel'}</span>
                    </div>
                  )}

                  {/* Micro-badge at top */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '16px',
                      left: '16px',
                      zIndex: 3,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: 'rgba(10, 10, 10, 0.75)',
                      backdropFilter: 'blur(8px)',
                      padding: '4px 10px',
                      borderRadius: '2px',
                      border: '1px solid rgba(255, 255, 255, 0.14)',
                    }}
                  >
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#E10600' }} />
                    <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', color: '#FFFFFF', textTransform: 'uppercase' }}>
                      SWEAT ATHLETE
                    </span>
                  </div>

                  {/* Bottom Vignette Scrim */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(10, 10, 10, 0.88) 0%, rgba(10, 10, 10, 0.2) 40%, rgba(10, 10, 10, 0) 100%)',
                      pointerEvents: 'none',
                    }}
                  />
                </div>

                {/* Play Button Overlay (shown for videos) */}
                {isVideo && (
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'rgba(0, 0, 0, 0.2)',
                      transition: 'background 0.3s ease',
                    }}
                  >
                    <div className="play" style={{ width: '72px', height: '72px' }}>
                      <Play size={28} color="#FFFFFF" fill="#FFFFFF" style={{ marginLeft: '4px' }} />
                    </div>
                  </div>
                )}

              </div>

              {/* Text Info */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div className="disp" style={{ fontSize: 'clamp(30px, 2.5vw, 40px)', lineHeight: 1, letterSpacing: '0.03em', textTransform: 'uppercase' }}>
                  {celeb.star_name}
                </div>
                {celeb.quote && (
                  <p style={{ margin: 0, fontSize: '14px', color: '#B8B8B8', lineHeight: 1.55, fontStyle: 'italic' }}>
                    "{celeb.quote}"
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Media Modal Player (Video or Photo) */}
      {activeMedia && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999,
            background: 'rgba(0, 0, 0, 0.92)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={() => setActiveMedia(null)}
        >
          <div
            style={{ position: 'relative', width: '100%', maxWidth: '420px', aspectRatio: '9/16', background: '#0A0A0A', borderRadius: '8px', overflow: 'hidden' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveMedia(null)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                zIndex: 10,
                background: 'rgba(0, 0, 0, 0.6)',
                border: 'none',
                color: '#FFFFFF',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <X size={24} />
            </button>
            {activeMedia.isVideo ? (
              <video
                src={activeMedia.resolvedSrc}
                controls
                autoPlay
                playsInline
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <img
                src={activeMedia.resolvedSrc}
                alt={activeMedia.star_name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CelebrityReelGrid;
