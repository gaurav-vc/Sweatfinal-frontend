import React from 'react';
import { Link } from 'react-router-dom';
import SweatLogo from './SweatLogo';
import { trackEvent } from '../../services/pixelService';

export const Footer = () => {
  return (
    <footer style={{ background: '#070707', borderTop: '1px solid rgba(255, 255, 255, 0.1)', padding: '80px 0 40px' }}>
      <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
        
        {/* Upper Grid */}
        <div className="split" style={{ alignItems: 'start', gap: '48px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '380px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <SweatLogo height={42} showHq={false} />
            </div>
            <p style={{ margin: 0, color: '#A3A3A3', fontSize: '15px', lineHeight: 1.6 }}>
              Where the stars train. Now it's you. Olympic lifting, gymnastics conditioning and athletic reformer Pilates under one standard.
            </p>
            <div style={{ display: 'flex', gap: '12px', marginTop: '8px', flexWrap: 'wrap' }}>
              <Link
                to="/book"
                onClick={() => trackEvent('InitiateCheckout', { location: 'footer', button: 'Book Your Visit' })}
                className="btn btn-red"
                style={{ minHeight: '46px', padding: '0 20px', fontSize: '12px' }}
              >
                Book Your Visit
              </Link>
              <Link
                to="/assessment"
                onClick={() => trackEvent('Schedule', { location: 'footer', button: 'Assessment' })}
                className="btn btn-ghost"
                style={{ minHeight: '46px', padding: '0 18px', fontSize: '12px' }}
              >
                Assessment
              </Link>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '32px', width: '100%', flex: 1 }}>
            {/* Column 1: Disciplines */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <span className="eyebrow red" style={{ fontSize: '11px', letterSpacing: '0.1em' }}>Disciplines</span>
              <Link to="/bootcamp" className="lnk" style={{ fontSize: '13px', color: '#C4C4C4' }}>Bootcamp</Link>
              <Link to="/pilates" className="lnk" style={{ fontSize: '13px', color: '#C4C4C4' }}>Reformer Pilates</Link>
              <Link to="/glutes" className="lnk" style={{ fontSize: '13px', color: '#C4C4C4' }}>Glutes &amp; Abs</Link>
              <Link to="/coaching" className="lnk" style={{ fontSize: '13px', color: '#C4C4C4' }}>1-on-1 Coaching</Link>
              <Link to="/programs" className="lnk" style={{ fontSize: '13px', color: '#C4C4C4' }}>All 7 Programs</Link>
            </div>

            {/* Column 2: Specialized */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <span className="eyebrow red" style={{ fontSize: '11px', letterSpacing: '0.1em' }}>Services</span>
              <Link to="/nutrition" className="lnk" style={{ fontSize: '13px', color: '#C4C4C4' }}>Sports Nutrition</Link>
              <Link to="/recovery" className="lnk" style={{ fontSize: '13px', color: '#C4C4C4' }}>Recovery Suite</Link>
              <Link to="/online" className="lnk" style={{ fontSize: '13px', color: '#C4C4C4' }}>Online Coaching</Link>
              <Link to="/elite" className="lnk" style={{ fontSize: '13px', color: '#C4C4C4' }}>SWEAT Elite</Link>
              <Link to="/assessment" className="lnk" style={{ fontSize: '13px', color: '#C4C4C4' }}>Assessment</Link>
            </div>

            {/* Column 3: Studio & Community */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <span className="eyebrow red" style={{ fontSize: '11px', letterSpacing: '0.1em' }}>Studio</span>
              <Link to="/membership" className="lnk" style={{ fontSize: '13px', color: '#C4C4C4' }}>Memberships</Link>
              <Link to="/team" className="lnk" style={{ fontSize: '13px', color: '#C4C4C4' }}>Coaches &amp; Team</Link>
              <Link to="/app" className="lnk" style={{ fontSize: '13px', color: '#C4C4C4' }}>SWEAT App</Link>
              <Link to="/shop" className="lnk" style={{ fontSize: '13px', color: '#C4C4C4' }}>Studio Shop</Link>
              <Link to="/visit" className="lnk" style={{ fontSize: '13px', color: '#C4C4C4' }}>Location &amp; Tour</Link>
            </div>

            {/* Column 4: Info & CMS */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <span className="eyebrow red" style={{ fontSize: '11px', letterSpacing: '0.1em' }}>HQ Location</span>
              <span style={{ fontSize: '13px', color: '#A3A3A3', lineHeight: 1.5 }}>Andheri West, Mumbai 400053</span>
              <span style={{ fontSize: '12px', color: '#888' }}>Mon–Sat: 6:00 AM – 9:00 PM</span>
              <span style={{ fontSize: '12px', color: '#888' }}>Sunday: 8:00 AM – 1:00 PM</span>
              <Link to="/admin-studio/login" style={{ fontSize: '12px', color: '#E10600', marginTop: '8px', fontWeight: 700, textDecoration: 'none' }}>
                CMS Studio Login →
              </Link>
            </div>
          </div>
        </div>

        {/* Lower Bar */}
        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <span style={{ fontSize: '13px', color: '#777' }}>
            © {new Date().getFullYear()} SWEAT HQ. All rights reserved.
          </span>
          <span style={{ fontSize: '13px', color: '#777' }}>
            Entry strictly by assessment. Capped class ratios.
          </span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;