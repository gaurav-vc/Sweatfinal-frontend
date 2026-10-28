import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import contentApi from '../api/contentApi';
import SlotBookingWidget from '../components/public/SlotBookingWidget';
import MarqueeBanner from '../components/common/MarqueeBanner';
import AnimatedHeadline from '../components/common/AnimatedHeadline';
import { resolveMediaUrl } from '../utils/mediaUrl';

export const RecoveryPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    contentApi.getPageContent('recovery')
      .then(res => setData(res))
      .catch(err => console.error('Error fetching recovery data:', err));
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
              alt="SWEAT Recovery"
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
            />
          ) : null}
        </div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(10, 10, 10, 0.92) 0%, rgba(10, 10, 10, 0.6) 55%, rgba(10, 10, 10, 0.25) 100%)' }} />
        <div style={{ position: 'absolute', inset: 'auto 0 0', height: '240px', background: 'linear-gradient(rgba(10, 10, 10, 0), rgba(10, 10, 10, 0.95))' }} />

        <div className="wrap" style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <span className="eyebrow red">{hero.eyebrow || "SWEAT Recovery"}</span>
            <span className="pill" style={{ background: '#E10600' }}>Athletic Restoration</span>
          </div>

          <AnimatedHeadline className="disp h1" style={{ fontSize: '230px', lineHeight: 0.84 }}>
            {hero.headline || "RECOVERY."}
          </AnimatedHeadline>

          <p style={{ margin: 0, fontSize: '24px', lineHeight: 1.45, color: '#F2F2F2', maxWidth: '680px', fontWeight: 600 }}>
            {hero.subheading || "Train hard. Recover faster. In-house physiotherapy, contrast therapy cold plunge, and targeted myofascial release under one suite."}
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a href={hero.cta_primary_link || "#book"} className="btn btn-red" style={{ minHeight: '64px', padding: '0 34px' }}>
              {hero.cta_primary_text || "Experience Recovery Suite"}
            </a>
            <a href={hero.cta_secondary_link || "/assessment"} className="btn btn-ghost" style={{ minHeight: '64px', padding: '0 30px' }}>
              {hero.cta_secondary_text || "Book Assessment"}
            </a>
          </div>

          <div className="grid4" style={{ marginTop: '28px', borderTop: '1px solid rgba(255, 255, 255, 0.2)', paddingTop: '28px' }}>
            <div><div className="num" style={{ fontSize: '60px' }}>3°C</div><div className="eyebrow" style={{ color: '#D4D4D4' }}>Cold Plunge Tub</div></div>
            <div><div className="num" style={{ fontSize: '60px' }}>100%</div><div className="eyebrow" style={{ color: '#D4D4D4' }}>Licensed Physios</div></div>
            <div><div className="num" style={{ fontSize: '60px' }}>45</div><div className="eyebrow" style={{ color: '#D4D4D4' }}>Minutes Myofascial Release</div></div>
            <div><div className="num" style={{ fontSize: '60px' }}>0</div><div className="eyebrow" style={{ color: '#D4D4D4' }}>Downtime or Overtraining</div></div>
          </div>
        </div>
      </section>

      <MarqueeBanner text="RESTORE ✕ FLUSH ✕ RECHARGE ✕ ATHLETIC RECOVERY ✕ " />

      {/* RECOVERY MODALITIES (WHITE CONTRAST) */}
      <section className="white" style={{ padding: '112px 0', background: '#FFFFFF', minHeight: '640px' }}>
        <div className="wrap">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
            <span className="eyebrow red">Suite Modalities</span>
            <AnimatedHeadline className="disp h2" style={{ fontSize: '112px' }}>
              RESTORE.<br /><span className="red">REBUILD. REPEAT.</span>
            </AnimatedHeadline>
            <p style={{ margin: 0, fontSize: '18px', lineHeight: 1.6, color: '#4A4A4A', maxWidth: '640px' }}>
              Growth and athletic adaptation occur during deep systemic recovery. Our suite combines hot and cold contrast with hands-on clinical care.
            </p>
          </div>

          <div className="grid3" style={{ gap: '24px', marginTop: '64px' }}>
            <div className="tile" style={{ padding: '36px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <span className="num red" style={{ fontSize: '48px' }}>01</span>
              <h3 style={{ margin: 0, fontSize: '24px' }}>Cold Plunge Hydrotherapy</h3>
              <p style={{ margin: 0, color: '#4A4A4A', lineHeight: 1.6 }}>Filtered water chilled to 3–6°C triggers vasoconstriction, suppresses systemic inflammation, and speeds up CNS recovery.</p>
            </div>
            <div className="tile" style={{ padding: '36px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <span className="num red" style={{ fontSize: '48px' }}>02</span>
              <h3 style={{ margin: 0, fontSize: '24px' }}>Infrared Sauna</h3>
              <p style={{ margin: 0, color: '#4A4A4A', lineHeight: 1.6 }}>Deep penetrating thermal waves promote micro-vascular circulation, flush cellular metabolic waste, and relieve chronic muscle stiffness.</p>
            </div>
            <div className="tile" style={{ padding: '36px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <span className="num red" style={{ fontSize: '48px' }}>03</span>
              <h3 style={{ margin: 0, fontSize: '24px' }}>Physiotherapy & Myofascial</h3>
              <p style={{ margin: 0, color: '#4A4A4A', lineHeight: 1.6 }}>Licensed sports physiotherapists on-site provide targeted trigger point release, dry needling, and joint mobility rehabilitation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* BOOKING */}
      <section id="book" style={{ padding: '104px 0 120px', background: '#0A0A0A', borderTop: '1px solid rgba(255, 255, 255, 0.12)' }}>
        <div className="wrap">
          <div className="grid2" style={{ gap: '24px', alignItems: 'stretch' }}>
            <SlotBookingWidget
              leadType="recovery"
              theme="red"
              title="RESERVE RECOVERY SUITE."
              eyebrow="Contrast Plunge & Sauna"
              description="Book a dedicated contrast therapy session or physiotherapy assessment."
              buttonText="Reserve Recovery Slot"
            />
            <SlotBookingWidget
              leadType="experience"
              theme="dark"
              title="EXPERIENCE SWEAT."
              eyebrow="Studio Floor Tour"
              description="Tour the entire 12,000 sq ft Andheri facility including the recovery wing."
              buttonText="Book Visit"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default RecoveryPage;