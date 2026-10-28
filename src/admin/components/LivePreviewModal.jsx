import React, { useState } from 'react';
import { Monitor, Tablet, Smartphone, X, ExternalLink, RotateCw } from 'lucide-react';

export default function LivePreviewModal({ isOpen, onClose, defaultPath = '/' }) {
  const [device, setDevice] = useState('mobile'); // 'desktop' | 'tablet' | 'mobile'
  const [currentPath, setCurrentPath] = useState(defaultPath);
  const [iframeKey, setIframeKey] = useState(0);

  if (!isOpen) return null;

  const pages = [
    { label: 'Home Page', path: '/' },
    { label: 'Bootcamp', path: '/bootcamp' },
    { label: 'Pilates', path: '/pilates' },
    { label: 'Membership', path: '/membership' },
    { label: 'Assessment', path: '/assessment' },
    { label: 'Book & Slots', path: '/book' },
    { label: 'Glutes & Abs', path: '/glutes' },
    { label: 'Coaching', path: '/coaching' },
    { label: 'Programs', path: '/programs' },
    { label: 'Nutrition', path: '/nutrition' },
    { label: 'Recovery', path: '/recovery' },
    { label: 'Online', path: '/online' },
    { label: 'Sweat Elite', path: '/elite' },
    { label: 'Team', path: '/team' },
    { label: 'Shop', path: '/shop' },
    { label: 'Visit', path: '/visit' },
    { label: 'The App', path: '/app' }
  ];

  // Device frame widths
  const getFrameWidth = () => {
    switch (device) {
      case 'mobile':
        return '390px';
      case 'tablet':
        return '768px';
      case 'desktop':
      default:
        return '100%';
    }
  };

  const getFrameHeight = () => {
    switch (device) {
      case 'mobile':
        return '844px';
      case 'tablet':
        return '1024px';
      case 'desktop':
      default:
        return '100%';
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      background: 'rgba(0, 0, 0, 0.82)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      flexDirection: 'column',
      animation: 'fadeIn 0.2s ease-out'
    }}>
      {/* TOP HEADER CONTROLS (EXACTLY LIKE REFERENCE SCREENSHOT) */}
      <header style={{
        height: '64px',
        minHeight: '64px',
        background: '#FFFFFF',
        borderBottom: '1px solid #E5E7EB',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.06)'
      }}>
        {/* Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#E10600', boxShadow: '0 0 8px #E10600' }} />
          <span style={{
            fontFamily: '"Manrope", sans-serif',
            fontSize: '13px',
            fontWeight: 800,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#111827'
          }}>
            LIVE PREVIEW
          </span>

          {/* Quick Page Navigator Dropdown */}
          <select
            value={currentPath}
            onChange={(e) => {
              setCurrentPath(e.target.value);
              setIframeKey(k => k + 1);
            }}
            style={{
              height: '34px',
              padding: '0 12px',
              borderRadius: '6px',
              border: '1px solid #D1D5DB',
              background: '#F9FAFB',
              color: '#111827',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              marginLeft: '8px'
            }}
          >
            {pages.map(p => (
              <option key={p.path} value={p.path}>{p.label}</option>
            ))}
          </select>

          <button
            onClick={() => setIframeKey(k => k + 1)}
            title="Refresh Preview"
            style={{
              background: 'none',
              border: '1px solid #E5E7EB',
              borderRadius: '6px',
              padding: '6px 10px',
              cursor: 'pointer',
              color: '#4B5563',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '11px',
              fontWeight: 600
            }}
          >
            <RotateCw size={13} color="#000000" strokeWidth={2.2} />
            <span>Reload</span>
          </button>
        </div>

        {/* Center/Right: Device Switchers (Desktop, Tablet, Mobile) */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          background: '#F3F4F6',
          padding: '4px',
          borderRadius: '8px',
          border: '1px solid #E5E7EB'
        }}>
          <button
            type="button"
            onClick={() => setDevice('desktop')}
            title="Desktop View"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '32px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              background: device === 'desktop' ? '#FFFFFF' : 'transparent',
              color: '#000000',
              boxShadow: device === 'desktop' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            <Monitor size={17} color="#000000" strokeWidth={2.2} />
          </button>

          <button
            type="button"
            onClick={() => setDevice('tablet')}
            title="Tablet View (768px)"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '32px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              background: device === 'tablet' ? '#FFFFFF' : 'transparent',
              color: '#000000',
              boxShadow: device === 'tablet' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            <Tablet size={17} color="#000000" strokeWidth={2.2} />
          </button>

          <button
            type="button"
            onClick={() => setDevice('mobile')}
            title="Mobile View (390px)"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '32px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              background: device === 'mobile' ? '#FFFFFF' : 'transparent',
              color: '#000000',
              boxShadow: device === 'mobile' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            <Smartphone size={17} color="#000000" strokeWidth={2.2} />
          </button>
        </div>

        {/* Right Actions: Open in Tab & Close */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <a
            href={currentPath}
            target="_blank"
            rel="noreferrer"
            title="Open in new window"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '6px',
              background: '#FFFFFF',
              border: '1px solid #D1D5DB',
              color: '#0F172A',
              fontSize: '12px',
              fontWeight: 600,
              textDecoration: 'none'
            }}
          >
            <ExternalLink size={13} color="#000000" strokeWidth={2.2} />
            <span>Open Tab</span>
          </a>

          <button
            onClick={onClose}
            title="Close Preview (Esc)"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '6px',
              background: '#FEE2E2',
              border: '1px solid #FECACA',
              color: '#DC2626',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.15s ease'
            }}
          >
            <X size={18} />
          </button>
        </div>
      </header>

      {/* DEVICE SIMULATOR CONTAINER (CANVAS) */}
      <div style={{
        flex: 1,
        overflow: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: device === 'desktop' ? '0' : '32px 20px',
        background: '#E5E7EB'
      }}>
        <div style={{
          width: getFrameWidth(),
          maxWidth: '100%',
          height: device === 'desktop' ? '100%' : getFrameHeight(),
          maxHeight: device === 'desktop' ? '100%' : '90vh',
          background: '#0A0A0A',
          borderRadius: device === 'desktop' ? '0' : '32px',
          boxShadow: device === 'desktop' ? 'none' : '0 25px 60px rgba(0, 0, 0, 0.4), 0 0 0 10px #1F2937',
          overflow: 'hidden',
          transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative'
        }}>
          {/* Mobile Speaker / Camera Notch Simulator */}
          {device === 'mobile' && (
            <div style={{
              height: '24px',
              background: '#0A0A0A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <div style={{ width: '80px', height: '14px', background: '#1F2937', borderRadius: '10px' }} />
            </div>
          )}

          {/* Live Interactive Iframe */}
          <iframe
            key={iframeKey}
            src={currentPath}
            title="Live Preview Simulator"
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              flex: 1,
              background: '#0A0A0A'
            }}
          />
        </div>
      </div>
    </div>
  );
}
