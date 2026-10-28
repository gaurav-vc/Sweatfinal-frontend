import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import contentApi from '../api/contentApi';
import PanAccordion from '../components/public/PanAccordion';
import MarqueeBanner from '../components/common/MarqueeBanner';
import AnimatedHeadline from '../components/common/AnimatedHeadline';

export const ProgramsPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    contentApi.getPageContent('programs')
      .then(res => setData(res))
      .catch(err => console.error('Error fetching programs data:', err));
  }, []);

  const programs = data?.programs || [];

  return (
    <div className="sw">
      {/* HERO */}
      <section className="hero-section" style={{ padding: '120px 0 80px', borderBottom: '1px solid rgba(255, 255, 255, 0.12)' }}>
        <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <span className="eyebrow red">The Curriculum</span>
          <AnimatedHeadline className="disp h1">
            SEVEN WAYS IN.<br /><span className="out">ONE OUTCOME.</span>
          </AnimatedHeadline>
          <p style={{ margin: 0, fontSize: '21px', lineHeight: 1.55, color: '#C4C4C4', maxWidth: '680px' }}>
            Every body is placed into the exact room and class level matched to their movement screening and goals. Explore our full training ecosystem below.
          </p>
        </div>
      </section>

      <MarqueeBanner text="BOOTCAMP ✕ PILATES ✕ GLUTES & ABS ✕ COACHING ✕ ASSESSMENT ✕ NUTRITION ✕ ONLINE ✕ " />

      {/* PAN ACCORDION DISPLAY */}
      <section style={{ padding: '100px 0', background: '#0A0A0A' }}>
        <div className="wrap">
          <PanAccordion programs={programs} />
        </div>
      </section>

      {/* PROGRAM GRID TILES */}
      <section className="white" style={{ padding: '112px 0', background: '#FFFFFF' }}>
        <div className="wrap">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left', marginBottom: '64px' }}>
            <span className="eyebrow red">Full Catalog</span>
            <AnimatedHeadline className="disp h2">
              ALL PROGRAMS.
            </AnimatedHeadline>
          </div>

          <div className="grid3" style={{ gap: '28px' }}>
            {programs.map((prog, idx) => (
              <Link
                key={prog.id || idx}
                to={`/programs/${prog.slug || ''}`}
                className="tile"
                style={{
                  padding: '36px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  textDecoration: 'none',
                  background: '#F8F8F8',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  borderRadius: '4px'
                }}
              >
                <span className="num red" style={{ fontSize: '48px' }}>{prog.number || `0${idx + 1}`}</span>
                <h3 style={{ margin: 0, fontSize: '28px', color: '#0A0A0A' }}>{prog.name}</h3>
                <p style={{ margin: 0, fontSize: '16px', color: '#4A4A4A', lineHeight: 1.55 }}>{prog.tagline}</p>
                <div style={{ marginTop: 'auto', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', fontWeight: 800, color: '#E10600', textTransform: 'uppercase' }}>Explore Program →</span>
                  <span className="pill" style={{ background: 'rgba(0, 0, 0, 0.08)', color: '#0A0A0A', fontSize: '11px' }}>
                    {prog.duration || '55 Mins'}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM BOOKING CTA */}
      <section style={{ padding: '100px 0', background: '#0A0A0A', borderTop: '1px solid rgba(255, 255, 255, 0.12)' }}>
        <div className="wrap" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '32px' }}>
          <div>
            <span className="eyebrow red">Start Today</span>
            <h2 className="disp h2" style={{ margin: '8px 0 0' }}>READY TO BE PLACED?</h2>
          </div>
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <Link to="/book" className="btn btn-red" style={{ minHeight: '60px', padding: '0 32px' }}>Experience SWEAT</Link>
            <Link to="/assessment" className="btn btn-ghost" style={{ minHeight: '60px', padding: '0 28px' }}>Book Assessment</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProgramsPage;
