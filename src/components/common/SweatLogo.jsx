import React, { useState } from 'react';

export default function SweatLogo({ height = 36, showHq = false, dark = false, style = {} }) {
  const [imgError, setImgError] = useState(false);

  // Pick image based on theme (dark prop means dark text on light background)
  const imgSrc = dark ? "/sweat-logo-dark.png" : "/sweat-logo.png";

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', ...style }}>
      {!imgError ? (
        <img
          src={imgSrc}
          alt="SWEAT"
          onError={() => setImgError(true)}
          style={{
            height: `${height}px`,
            width: 'auto',
            objectFit: 'contain',
            display: 'block',
            filter: dark ? 'invert(1)' : 'none',
            imageRendering: 'crisp-edges'
          }}
        />
      ) : (
        <span style={{
          fontFamily: '"Bebas Neue", sans-serif',
          fontSize: `${height * 1.15}px`,
          letterSpacing: '0.08em',
          color: dark ? '#0A0A0A' : '#FFFFFF',
          lineHeight: 1
        }}>
          SWEAT
        </span>
      )}

      {showHq && (
        <span
          className="disp"
          style={{
            fontSize: `${height * 0.75}px`,
            color: '#E10600',
            letterSpacing: '0.1em',
            paddingTop: '2px',
            lineHeight: 1
          }}
        >
          HQ
        </span>
      )}
    </div>
  );
}
