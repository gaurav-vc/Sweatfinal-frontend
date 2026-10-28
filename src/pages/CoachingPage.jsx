import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import contentApi from '../api/contentApi';
import SlotBookingWidget from '../components/public/SlotBookingWidget';
import TransformationSlider from '../components/public/TransformationSlider';
import MarqueeBanner from '../components/common/MarqueeBanner';
import AnimatedHeadline from '../components/common/AnimatedHeadline';
import { resolveMediaUrl } from '../utils/mediaUrl';

export const CoachingPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    contentApi.getPageContent('coaching')
      .then(res => setData(res))
      .catch(err => console.error('Error fetching coaching data:', err));
  }, []);

  const hero = data?.hero || {};
  const videoSrc = resolveMediaUrl(hero.video_url || hero.video_file);
  const imageSrc = resolveMediaUrl(hero.background_image || hero.fallback_image);
  const transformations = data?.transformations || [];

  return (
    <div className="sw">
      {/* DYNAMIC HERO SECTION */}
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
              alt="SWEAT 1:1 Coaching"
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
            />
          ) : null}
        </div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(10, 10, 10, 0.92) 0%, rgba(10, 10, 10, 0.6) 55%, rgba(10, 10, 10, 0.25) 100%)' }} />
        <div style={{ position: 'absolute', inset: 'auto 0 0', height: '240px', background: 'linear-gradient(rgba(10, 10, 10, 0), rgba(10, 10, 10, 0.95))' }} />

        <div className="wrap" style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <span className="eyebrow red">{hero.eyebrow || "SWEAT 1:1 Coaching"}</span>
            <span className="pill" style={{ background: '#E10600' }}>Bespoke Standard</span>
          </div>

          <AnimatedHeadline className="disp h1">
            {hero.headline || "ONE-ON-ONE."}
          </AnimatedHeadline>

          <p style={{ margin: 0, fontSize: '24px', lineHeight: 1.45, color: '#F2F2F2', maxWidth: '680px', fontWeight: 600 }}>
            {hero.subheading || "Your goal. Your coach. Your timeline. The exact private training system used on Bollywood's elite."}
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a href={hero.cta_primary_link || "#book"} className="btn btn-red" style={{ minHeight: '64px', padding: '0 34px' }}>
              {hero.cta_primary_text || "Experience 1:1 Coaching"}
            </a>
            <a href={hero.cta_secondary_link || "/assessment"} className="btn btn-ghost" style={{ minHeight: '64px', padding: '0 30px' }}>
              {hero.cta_secondary_text || "Book an Assessment"}
            </a>
          </div>

          <div className="hero-stats-grid">
            <div>
              <div className="num" style={{ fontSize: '60px' }}>1:1</div>
              <div className="eyebrow" style={{ color: '#D4D4D4' }}>Dedicated Floor Ratio</div>
            </div>
            <div>
              <div className="num" style={{ fontSize: '60px' }}>100%</div>
              <div className="eyebrow" style={{ color: '#D4D4D4' }}>Bespoke Programming</div>
            </div>
            <div>
              <div className="num" style={{ fontSize: '60px' }}>7</div>
              <div className="eyebrow" style={{ color: '#D4D4D4' }}>Days Nutrition Accountability</div>
            </div>
            <div>
              <div className="num" style={{ fontSize: '60px' }}>15</div>
              <div className="eyebrow" style={{ color: '#D4D4D4' }}>Days Reassessment Cadence</div>
            </div>
          </div>
        </div>
      </section>

      <MarqueeBanner text="BESPOKE ✕ ACCOUNTABILITY ✕ RESULTS ✕ ONE-ON-ONE ✕ " />

      {/* WHY 1:1 (WHITE CONTRAST) */}
      <section className="white" style={{ padding: '112px 0', background: '#FFFFFF', minHeight: '640px' }}>
        <div className="wrap">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
            <span className="eyebrow red">The Standard</span>
            <AnimatedHeadline className="disp h2">
              BUILT AROUND<br /><span className="red">ONE PERSON.</span>
            </AnimatedHeadline>
            <p style={{ margin: 0, fontSize: '18px', lineHeight: 1.6, color: '#4A4A4A', maxWidth: '640px' }}>
              No generic templates. Your posture, past injuries, schedule constraints, and body goals dictate every single workout.
            </p>
          </div>

          <div className="grid3" style={{ gap: '24px', marginTop: '64px' }}>
            <div className="tile" style={{ padding: '36px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <span className="num red" style={{ fontSize: '48px' }}>01</span>
              <h3 style={{ margin: 0, fontSize: '24px' }}>Form Perfection</h3>
              <p style={{ margin: 0, color: '#4A4A4A', lineHeight: 1.6 }}>Zero guesswork. A master coach monitors joint alignment, tempo, and spine mechanics on every rep.</p>
            </div>
            <div className="tile" style={{ padding: '36px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <span className="num red" style={{ fontSize: '48px' }}>02</span>
              <h3 style={{ margin: 0, fontSize: '24px' }}>Dynamic Periodization</h3>
              <p style={{ margin: 0, color: '#4A4A4A', lineHeight: 1.6 }}>Workouts adjust in real time to your sleep, stress, and muscle recovery for maximum gains with zero burnout.</p>
            </div>
            <div className="tile" style={{ padding: '36px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <span className="num red" style={{ fontSize: '48px' }}>03</span>
              <h3 style={{ margin: 0, fontSize: '24px' }}>Strict Accountability</h3>
              <p style={{ margin: 0, color: '#4A4A4A', lineHeight: 1.6 }}>Daily meal logging check-ins, WhatsApp progress touchpoints, and scheduled re-evaluations.</p>
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
              1-ON-1<br /><span className="out">RESULTS.</span>
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
              leadType="coaching"
              theme="red"
              title="BOOK 1-ON-1 COACHING."
              eyebrow="Private Consultation"
              description="Discuss your target goals and schedule with a SWEAT master coach."
              buttonText="Request 1:1 Session"
            />
            <SlotBookingWidget
              leadType="assessment"
              theme="dark"
              title="FITNESS ASSESSMENT."
              eyebrow="Know your starting point"
              description="Full movement diagnostics and body composition screening before your first personal session."
              buttonText="Book Assessment"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default CoachingPage;