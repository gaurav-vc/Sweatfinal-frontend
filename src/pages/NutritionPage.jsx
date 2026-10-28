import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import contentApi from '../api/contentApi';
import SlotBookingWidget from '../components/public/SlotBookingWidget';
import MarqueeBanner from '../components/common/MarqueeBanner';
import AnimatedHeadline from '../components/common/AnimatedHeadline';
import { resolveMediaUrl } from '../utils/mediaUrl';

export const NutritionPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    contentApi.getPageContent('nutrition')
      .then(res => setData(res))
      .catch(err => console.error('Error fetching nutrition data:', err));
  }, []);

  const hero = data?.hero || {};
  const videoSrc = resolveMediaUrl(hero.video_url || hero.video_file);
  const imageSrc = resolveMediaUrl(hero.background_image || hero.fallback_image);

  return (
    <div className="sw">
      {/* DYNAMIC HERO */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '120px 0 72px', borderBottom: '1px solid rgba(255, 255, 255, 0.12)', minHeight: '940px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
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
              alt="SWEAT Nutrition"
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
            />
          ) : null}
        </div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(10, 10, 10, 0.92) 0%, rgba(10, 10, 10, 0.6) 55%, rgba(10, 10, 10, 0.25) 100%)' }} />
        <div style={{ position: 'absolute', inset: 'auto 0 0', height: '240px', background: 'linear-gradient(rgba(10, 10, 10, 0), rgba(10, 10, 10, 0.95))' }} />

        <div className="wrap" style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <span className="eyebrow red">{hero.eyebrow || "SWEAT Nutrition"}</span>
            <span className="pill" style={{ background: '#E10600' }}>Fuel Your Transformation</span>
          </div>

          <AnimatedHeadline className="disp h1" style={{ fontSize: '230px', lineHeight: 0.84 }}>
            {hero.headline || "NUTRITION."}
          </AnimatedHeadline>

          <p style={{ margin: 0, fontSize: '24px', lineHeight: 1.45, color: '#F2F2F2', maxWidth: '680px', fontWeight: 600 }}>
            {hero.subheading || "Eat for the result you want. Zero crash diets. Plans calculated to your metabolic burn and logged in the SWEAT app."}
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a href={hero.cta_primary_link || "#book"} className="btn btn-red" style={{ minHeight: '64px', padding: '0 34px' }}>
              {hero.cta_primary_text || "Book Nutrition Consult"}
            </a>
            <a href={hero.cta_secondary_link || "/assessment"} className="btn btn-ghost" style={{ minHeight: '64px', padding: '0 30px' }}>
              {hero.cta_secondary_text || "Fitness Assessment"}
            </a>
          </div>

          <div className="grid4" style={{ marginTop: '28px', borderTop: '1px solid rgba(255, 255, 255, 0.2)', paddingTop: '28px' }}>
            <div><div className="num" style={{ fontSize: '60px' }}>1:1</div><div className="eyebrow" style={{ color: '#D4D4D4' }}>Sports Nutritionist</div></div>
            <div><div className="num" style={{ fontSize: '60px' }}>0</div><div className="eyebrow" style={{ color: '#D4D4D4' }}>Starvation or Crash Diets</div></div>
            <div><div className="num" style={{ fontSize: '60px' }}>7</div><div className="eyebrow" style={{ color: '#D4D4D4' }}>Days Weekly App Review</div></div>
            <div><div className="num" style={{ fontSize: '60px' }}>15</div><div className="eyebrow" style={{ color: '#D4D4D4' }}>Days Body Re-Scan</div></div>
          </div>
        </div>
      </section>

      <MarqueeBanner text="SUSTAINABLE ✕ CALCULATED ✕ MACROS ✕ FUEL THE FLOOR ✕ " />

      {/* THREE PILLARS (WHITE CONTRAST) */}
      <section className="white" style={{ padding: '112px 0', background: '#FFFFFF', minHeight: '640px' }}>
        <div className="wrap">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
            <span className="eyebrow red">The Methodology</span>
            <AnimatedHeadline className="disp h2" style={{ fontSize: '112px' }}>
              SCIENCE-BACKED.<br /><span className="red">SUSTAINABLE FUEL.</span>
            </AnimatedHeadline>
            <p style={{ margin: 0, fontSize: '18px', lineHeight: 1.6, color: '#4A4A4A', maxWidth: '640px' }}>
              We calculate calories and macronutrients directly around your training days, rest days, and lean mass expenditure.
            </p>
          </div>

          <div className="grid3" style={{ gap: '24px', marginTop: '64px' }}>
            <div className="tile" style={{ padding: '36px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <span className="num red" style={{ fontSize: '48px' }}>01</span>
              <h3 style={{ margin: 0, fontSize: '24px' }}>Biometric Baseline</h3>
              <p style={{ margin: 0, color: '#4A4A4A', lineHeight: 1.6 }}>DEXA and multi-frequency bio-impedance to calculate your real basal metabolic rate.</p>
            </div>
            <div className="tile" style={{ padding: '36px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <span className="num red" style={{ fontSize: '48px' }}>02</span>
              <h3 style={{ margin: 0, fontSize: '24px' }}>Flexible Macros</h3>
              <p style={{ margin: 0, color: '#4A4A4A', lineHeight: 1.6 }}>Real food that fits your culture, work schedule, and travel without anti-social restrictions.</p>
            </div>
            <div className="tile" style={{ padding: '36px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <span className="num red" style={{ fontSize: '48px' }}>03</span>
              <h3 style={{ margin: 0, fontSize: '24px' }}>App Integration</h3>
              <p style={{ margin: 0, color: '#4A4A4A', lineHeight: 1.6 }}>Log meals directly in the companion SWEAT app for weekly coach feedback and adjustments.</p>
            </div>
          </div>
        </div>
      </section>

      {/* BOOKING */}
      <section id="book" style={{ padding: '104px 0 120px', background: '#0A0A0A', borderTop: '1px solid rgba(255, 255, 255, 0.12)' }}>
        <div className="wrap">
          <div className="grid2" style={{ gap: '24px', alignItems: 'stretch' }}>
            <SlotBookingWidget
              leadType="nutrition"
              theme="red"
              title="BOOK NUTRITION CONSULT."
              eyebrow="One-on-One Protocol"
              description="Meet our sports nutritionists for a 45-minute metabolic and macro consultation."
              buttonText="Reserve Nutrition Slot"
            />
            <SlotBookingWidget
              leadType="assessment"
              theme="dark"
              title="FITNESS ASSESSMENT."
              eyebrow="Full Body Screening"
              description="Cardio, strength, body fat and muscle distribution evaluated under one session."
              buttonText="Book Assessment"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default NutritionPage;