import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import contentApi from '../api/contentApi';
import SlotBookingWidget from '../components/public/SlotBookingWidget';
import TransformationSlider from '../components/public/TransformationSlider';
import MarqueeBanner from '../components/common/MarqueeBanner';
import AnimatedHeadline from '../components/common/AnimatedHeadline';
import { resolveMediaUrl } from '../utils/mediaUrl';

export const ElitePage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    contentApi.getPageContent('elite')
      .then(res => setData(res))
      .catch(err => console.error('Error fetching elite data:', err));
  }, []);

  const hero = data?.hero || {};
  const videoSrc = resolveMediaUrl(hero.video_url || hero.video_file);
  const imageSrc = resolveMediaUrl(hero.background_image || hero.fallback_image);
  const transformations = data?.transformations || [];

  return (
    <div className="sw">
      {/* DYNAMIC HERO */}
      <section className="hero-section">
        <div style={{ position: 'absolute', inset: 0 }}>
          {videoSrc ? (
            <video
              src={videoSrc}
              autoPlay
              loop
              muted
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
            />
          ) : imageSrc ? (
            <img
              src={imageSrc}
              alt="SWEAT Elite"
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
            />
          ) : null}
        </div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(10, 10, 10, 0.92) 0%, rgba(10, 10, 10, 0.6) 55%, rgba(10, 10, 10, 0.25) 100%)' }} />
        <div style={{ position: 'absolute', inset: 'auto 0 0', height: '240px', background: 'linear-gradient(rgba(10, 10, 10, 0), rgba(10, 10, 10, 0.95))' }} />

        <div className="wrap" style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <span className="eyebrow red">{hero.eyebrow || "SWEAT Elite"}</span>
            <span className="pill" style={{ background: '#E10600' }}>All-Inclusive VIP</span>
          </div>

          <AnimatedHeadline className="disp h1">
            {hero.headline || "SWEAT ELITE."}
          </AnimatedHeadline>

          <p style={{ margin: 0, fontSize: '24px', lineHeight: 1.45, color: '#F2F2F2', maxWidth: '680px', fontWeight: 600 }}>
            {hero.subheading || "Everything handled. Bootcamp, reformer Pilates, personal coaching, recovery, and sports nutrition under one bespoke tier."}
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a href={hero.cta_primary_link || "#book"} className="btn btn-red" style={{ minHeight: '64px', padding: '0 34px' }}>
              {hero.cta_primary_text || "Apply For Elite"}
            </a>
            <a href={hero.cta_secondary_link || "/assessment"} className="btn btn-ghost" style={{ minHeight: '64px', padding: '0 30px' }}>
              {hero.cta_secondary_text || "Book Assessment"}
            </a>
          </div>

          <div className="hero-stats-grid">
            <div><div className="num" style={{ fontSize: '60px' }}>All</div><div className="eyebrow" style={{ color: '#D4D4D4' }}>Access Unrestricted</div></div>
            <div><div className="num" style={{ fontSize: '60px' }}>VIP</div><div className="eyebrow" style={{ color: '#D4D4D4' }}>Priority Slot Reservation</div></div>
            <div><div className="num" style={{ fontSize: '60px' }}>Head</div><div className="eyebrow" style={{ color: '#D4D4D4' }}>Dedicated Coach Oversight</div></div>
            <div><div className="num" style={{ fontSize: '60px' }}>Suite</div><div className="eyebrow" style={{ color: '#D4D4D4' }}>Full Recovery Inclusion</div></div>
          </div>
        </div>
      </section>

      <MarqueeBanner text="ALL-INCLUSIVE ✕ DEDICATED COACH ✕ UNRESTRICTED ✕ SWEAT ELITE ✕ " />

      {/* THREE PILLARS (WHITE CONTRAST) */}
      <section className="white" style={{ padding: '112px 0', background: '#FFFFFF', minHeight: '640px' }}>
        <div className="wrap">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
            <span className="eyebrow red">The Privileges</span>
            <AnimatedHeadline className="disp h2">
              EVERY DETAIL.<br /><span className="red">ZERO FRICTION.</span>
            </AnimatedHeadline>
            <p style={{ margin: 0, fontSize: '18px', lineHeight: 1.6, color: '#4A4A4A', maxWidth: '640px' }}>
              Designed for leaders, actors, and high-performance individuals who want total physical results handled without administrative friction.
            </p>
          </div>

          <div className="grid3" style={{ gap: '24px', marginTop: '64px' }}>
            <div className="tile" style={{ padding: '36px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <span className="num red" style={{ fontSize: '48px' }}>01</span>
              <h3 style={{ margin: 0, fontSize: '24px' }}>Total Floor Access</h3>
              <p style={{ margin: 0, color: '#4A4A4A', lineHeight: 1.6 }}>Unlimited access across both Bootcamp rig floors, all 4 levels of Reformer Pilates, and open studio hours.</p>
            </div>
            <div className="tile" style={{ padding: '36px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <span className="num red" style={{ fontSize: '48px' }}>02</span>
              <h3 style={{ margin: 0, fontSize: '24px' }}>Recovery Suite Included</h3>
              <p style={{ margin: 0, color: '#4A4A4A', lineHeight: 1.6 }}>Complimentary weekly contrast plunge, infrared sauna sessions, and dedicated physical therapy screenings.</p>
            </div>
            <div className="tile" style={{ padding: '36px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <span className="num red" style={{ fontSize: '48px' }}>03</span>
              <h3 style={{ margin: 0, fontSize: '24px' }}>Dedicated WhatsApp Line</h3>
              <p style={{ margin: 0, color: '#4A4A4A', lineHeight: 1.6 }}>Direct priority booking desk. Reschedule, book private slots, or consult coaches on nutrition anytime.</p>
            </div>
          </div>
        </div>
      </section>

      {/* TRANSFORMATIONS */}
      <section style={{ padding: '112px 0', background: '#0A0A0A', minHeight: '900px' }}>
        <div className="wrap">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
            <span className="eyebrow red">Transformations</span>
            <AnimatedHeadline className="disp h2">
              ELITE<br /><span className="out">RESULTS.</span>
            </AnimatedHeadline>
          </div>
          <TransformationSlider transformations={transformations} />
        </div>
      </section>

      {/* BOOKING */}
      <section id="book" style={{ padding: '104px 0 120px', background: '#0A0A0A', borderTop: '1px solid rgba(255, 255, 255, 0.12)' }}>
        <div className="wrap">
          <div className="grid2" style={{ gap: '24px', alignItems: 'stretch' }}>
            <SlotBookingWidget
              leadType="elite"
              theme="red"
              title="APPLY FOR SWEAT ELITE."
              eyebrow="Strictly Capped Roster"
              description="Speak directly with management regarding VIP membership onboarding and private locker allocation."
              buttonText="Apply for Elite Membership"
            />
            <SlotBookingWidget
              leadType="assessment"
              theme="dark"
              title="FITNESS ASSESSMENT."
              eyebrow="Mandatory Entry Sitting"
              description="Biometric and functional screening to configure your personalized Elite roadmap."
              buttonText="Book Assessment"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ElitePage;