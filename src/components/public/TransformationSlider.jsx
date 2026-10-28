import React from 'react';

export const TransformationSlider = ({ transformations = [] }) => {
  if (!transformations || transformations.length === 0) {
    return (
      <div className="shot" style={{ minHeight: '260px', width: '100%' }}>
        <b>No Transformations Uploaded Yet</b>
        <span>Upload Before/After photos in CMS Studio to display live client results here</span>
      </div>
    );
  }

  return (
    <div className="grid3" style={{ marginTop: '56px', alignItems: 'stretch' }}>
      {transformations.map((item, idx) => (
        <div
          key={item.id || idx}
          style={{
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid rgba(255, 255, 255, 0.14)',
            background: '#000000',
            borderRadius: '4px',
          }}
        >
          {/* Dual Before / After Split View */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3px', height: '520px' }}>
            
            {/* Before Column */}
            <div style={{ position: 'relative', overflow: 'hidden' }}>
              {item.before_image || item.before_image_url ? (
                <img
                  src={item.before_image || item.before_image_url}
                  alt={`${item.member_name || 'Member'} before`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'grayscale(1) contrast(1.05) brightness(0.8)',
                  }}
                />
              ) : (
                <div className="shot" style={{ height: '100%', border: 0 }}>
                  <b>Before</b>
                </div>
              )}
              <span
                className="pill"
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '12px',
                  background: '#000000',
                  color: '#FFFFFF',
                  fontSize: '11px',
                  padding: '7px 12px',
                  letterSpacing: '0.18em',
                }}
              >
                Before
              </span>
            </div>

            {/* After Column */}
            <div style={{ position: 'relative', overflow: 'hidden' }}>
              {item.after_image || item.after_image_url ? (
                <img
                  src={item.after_image || item.after_image_url}
                  alt={`${item.member_name || 'Member'} after`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    contrast: '1.05',
                  }}
                />
              ) : (
                <div className="shot" style={{ height: '100%', border: 0 }}>
                  <b style={{ color: '#E10600' }}>After</b>
                </div>
              )}
              <span
                className="pill"
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '12px',
                  background: '#E10600',
                  color: '#FFFFFF',
                  fontSize: '11px',
                  padding: '7px 12px',
                  letterSpacing: '0.18em',
                }}
              >
                After
              </span>
            </div>

          </div>

          {/* Member Metric Overlay Badge */}
          <div
            style={{
              padding: '16px 20px',
              background: '#0A0A0A',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <div style={{ fontWeight: 700, fontSize: '15px', color: '#FFFFFF' }}>
                {item.member_name || `Member Result #${idx + 1}`}
              </div>
              <div style={{ fontSize: '12px', color: '#FF3B30', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: '2px' }}>
                {item.metric_label || 'Verified Transformation'}
              </div>
            </div>
            {item.timeline_weeks && (
              <span className="pill" style={{ background: 'rgba(255, 255, 255, 0.1)', fontSize: '11px' }}>
                {item.timeline_weeks} Weeks
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransformationSlider;
