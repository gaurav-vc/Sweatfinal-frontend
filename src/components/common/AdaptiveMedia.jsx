import React from 'react';
import { resolveMediaUrl, isVideoMedia } from '../../utils/mediaUrl';

/**
 * AdaptiveMedia - Universally renders either a Photo (<img>) or Video (<video>)
 * based on automatic content/extension detection.
 * 
 * Automatically applies:
 * - width: 100%, height: 100%
 * - object-fit: cover (no squishing, no stretching, natural aspect ratio preserved)
 * - object-position: center (or custom e.g. 'top' for portraits)
 * - autoPlay, loop, muted, playsInline for videos
 */
export const AdaptiveMedia = ({
  src,
  alt = 'Media',
  style = {},
  className = '',
  objectFit = 'cover',
  objectPosition = 'center',
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
  controls = false,
  fallback = null,
  ...props
}) => {
  if (!src) return fallback;

  const resolved = resolveMediaUrl(src);
  const isVideo = isVideoMedia(resolved);

  const defaultStyle = {
    width: '100%',
    height: '100%',
    objectFit,
    objectPosition,
    display: 'block',
    ...style,
  };

  if (isVideo) {
    return (
      <video
        src={resolved}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline={playsInline}
        controls={controls}
        style={defaultStyle}
        className={className}
        {...props}
      />
    );
  }

  return (
    <img
      src={resolved}
      alt={alt}
      loading="lazy"
      style={defaultStyle}
      className={className}
      {...props}
    />
  );
};

export default AdaptiveMedia;

