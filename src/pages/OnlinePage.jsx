import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import contentApi from '../api/contentApi';
import SlotBookingWidget from '../components/public/SlotBookingWidget';
import MarqueeBanner from '../components/common/MarqueeBanner';
import AnimatedHeadline from '../components/common/AnimatedHeadline';
import { resolveMediaUrl } from '../utils/mediaUrl';

export const OnlinePage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    contentApi.getPageContent('online')
      .then(res => setData(res))
      .catch(err => console.error('Error fetching online data:', err));
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
              alt="SWEAT Online"
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
            />
          ) : null}
        </div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(10, 10, 10, 0.92) 0%, rgba(10, 10, 10, 0.6) 55%, rgba(10, 10, 10, 0.25) 100%)' }} />
        <div style={{ position: 'absolute', inset: 'auto 0 0', height: '240px', background: 'linear-gradient(rgba(10, 10, 10, 0), rgba(10, 10, 10, 0.95))' }} />

        <div className="wrap" style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <span className="eyebrow red">{hero.eyebrow || "SWEAT Online"}</span>
            <span className="pill" style={{ background: '#E10600' }}>Global Remote System</span>
          </div>

          <AnimatedHeadline className="disp h1" style={{ fontSize: '230px', lineHeight: 0.84 }}>
            {hero.headline || "ONLINE."}
          </AnimatedHeadline>

          <p style={{ margin: 0, fontSize: '24px', lineHeight: 1.45, color: '#F2F2F2', maxWidth: '680px', fontWeight: 600 }}>
            {hero.subheading || "Your coach, wherever you are. The exact SWEAT training standard and periodization, delivered remotely."}
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a href={hero.cta_primary_link || "#book"} className="btn btn-red" style={{ minHeight: '64px', padding: '0 34px' }}>
              {hero.cta_primary_text || "Start Online Coaching"}
            </a>
            <a href={hero.cta_secondary_link || "/assessment"} className="btn btn-ghost" style={{ minHeight: '64px', padding: '0 30px' }}>
              {hero.cta_secondary_text || "Virtual Assessment"}
            </a>
          </div>

          <div className="grid4" style={{ marginTop: '28px', borderTop: '1px solid rgba(255, 255, 255, 0.2)', paddingTop: '28px' }}>
            <div><div className="num" style={{ fontSize: '60px' }}>Global</div><div className="eyebrow" style={{ color: '#D4D4D4' }}>Access Anywhere</div></div>
            <div><div className="num" style={{ fontSize: '60px' }}>100%</div><div className="eyebrow" style={{ color: '#D4D4D4' }}>Custom Periodization</div></div>
            <div><div className="num" style={{ fontSize: '60px' }}>48h</div><div className="eyebrow" style={{ color: '#D4D4D4' }}>Video Form Feedback</div></div>
            <div><div className="num" style={{ fontSize: '60px' }}>App</div><div className="eyebrow" style={{ color: '#D4D4D4' }}>Workout & Macro Logs</div></div>
          </div>
        </div>
      </section>

      <MarqueeBanner text="GLOBAL ✕ PERIODIZED ✕ VIDEO REVIEW ✕ REMOTE COACHING ✕ " />

      {/* THREE PILLARS (WHITE CONTRAST) */}
      <section className="white" style={{ padding: '112px 0', background: '#FFFFFF', minHeight: '640px' }}>
        <div className="wrap">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
            <span className="eyebrow red">How It Operates</span>
            <AnimatedHeadline className="disp h2" style={{ fontSize: '112px' }}>
              NO DISTANCE.<br /><span className="red">NO EXCUSES.</span>
            </AnimatedHeadline>
            <p style={{ margin: 0, fontSize: '18px', lineHeight: 1.6, color: '#4A4A4A', maxWidth: '640px' }}>
              Train in your home gym, local box, or hotel. Your SWEAT coach programmes your weekly training blocks and reviews lifting videos with voiceover annotations.
            </p>
          </div>

          <div className="grid3" style={{ gap: '24px', marginTop: '64px' }}>
            <div className="tile" style={{ padding: '36px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <span className="num red" style={{ fontSize: '48px' }}>01</span>
              <h3 style={{ margin: 0, fontSize: '24px' }}>App Delivery</h3>
              <p style={{ margin: 0, color: '#4A4A4A', lineHeight: 1.6 }}>Workouts appear with exact exercise order, tempo prescriptions, rest intervals, and warm-up protocols.</p>
            </div>
            <div className="tile" style={{ padding: '36px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <span className="num red" style={{ fontSize: '48px' }}>02</span>
              <h3 style={{ margin: 0, fontSize: '24px' }}>Video Analysis</h3>
              <p style={{ margin: 0, color: '#4A4A4A', lineHeight: 1.6 }}>Record your heavy sets. Your coach reviews bar paths, bracing, and joint angles to correct technique remotely.</p>
            </div>
            <div className="tile" style={{ padding: '36px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <span className="num red" style={{ fontSize: '48px' }}>03</span>
              <h3 style={{ margin: 0, fontSize: '24px' }}>Weekly Check-ins</h3>
              <p style={{ margin: 0, color: '#4A4A4A', lineHeight: 1.6 }}>Direct video and voice consultations to review sleep metrics, energy levels, and adjust weight targets.</p>
            </div>
          </div>
        </div>
      </section>

      {/* BOOKING */}
      <section id="book" style={{ padding: '104px 0 120px', background: '#0A0A0A', borderTop: '1px solid rgba(255, 255, 255, 0.12)' }}>
        <div className="wrap">
          <div className="grid2" style={{ gap: '24px', alignItems: 'stretch' }}>
            <SlotBookingWidget
              leadType="online"
              theme="red"
              title="START ONLINE COACHING."
              eyebrow="Remote Onboarding"
              description="Connect with head coach Praveen Nair and the coaching team from anywhere in the world."
              buttonText="Apply for Online Coaching"
            />
            <SlotBookingWidget
              leadType="assessment"
              theme="dark"
              title="VIRTUAL ASSESSMENT."
              eyebrow="Initial Video Screening"
              description="A 45-minute video evaluation of your movement patterns and current conditioning."
              buttonText="Schedule Video Screening"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default OnlinePage;