import React, { useState } from 'react';
import { Play, X } from 'lucide-react';
import { resolveMediaUrl } from '../../utils/mediaUrl';

export const CelebrityReelGrid = ({ celebrities = [] }) => {
  const [activeVideo, setActiveVideo] = useState(null);

  if (!celebrities || celebrities.length === 0) {
    return (
      <div className="shot" style={{ minHeight: '260px', width: '100%' }}>
        <b>No Celebrity Reels Published Yet</b>
        <span>Upload vertical celebrity reels from the CMS Studio to display them dynamically here</span>
      </div>
    );
  }

  return (
    <>
      <div className="grid5">
        {celebrities.map((celeb, idx) => (
          <div
            key={celeb.id || idx}
            style={{ display: 'flex', flexDirection: 'column', gap: '12px', cursor: 'pointer' }}
            onClick={() => {
              if (celeb.video_file || celeb.video_url) {
                setActiveVideo(celeb);
              }
            }}
          >
            <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '4px' }}>
              
              {/* Media Container with reticle styling */}
              <div
                className="shot"
                style={{
                  height: '420px',
                  backgroundImage: celeb.thumbnail ? `url(${celeb.thumbnail})` : undefined,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                {!celeb.thumbnail && (
                  <>
                    <b style={{ color: '#FFFFFF', fontSize: '15px' }}>[VIDEO] {celeb.star_name}</b>
                    <span>with the SWEAT team · {celeb.duration_label || 'vertical'}</span>
                  </>
                )}
              </div>

              {/* Play Button Overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(0, 0, 0, 0.25)',
                  transition: 'background 0.2s ease',
                }}
              >
                <div className="play" style={{ width: '64px', height: '64px' }}>
                  <Play size={24} color="#FFFFFF" fill="#FFFFFF" />
                </div>
              </div>

            </div>

            <div className="disp" style={{ fontSize: '34px', lineHeight: 1, textTransform: 'uppercase' }}>
              {celeb.star_name}
            </div>
            {celeb.quote && (
              <p style={{ margin: 0, fontSize: '13px', color: '#A3A3A3', lineHeight: 1.4 }}>
                "{celeb.quote}"
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Video Modal Player */}
      {activeVideo && (
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
          onClick={() => setActiveVideo(null)}
        >
          <div
            style={{ position: 'relative', width: '100%', maxWidth: '420px', aspectRatio: '9/16', background: '#0A0A0A', borderRadius: '8px', overflow: 'hidden' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveVideo(null)}
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
            <video
              src={resolveMediaUrl(activeVideo.video_url || activeVideo.video_file)}
              controls
              autoPlay
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default CelebrityReelGrid;
