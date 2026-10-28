import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import contentApi from '../api/contentApi';
import MarqueeBanner from '../components/common/MarqueeBanner';
import AnimatedHeadline from '../components/common/AnimatedHeadline';
import { resolveMediaUrl } from '../utils/mediaUrl';

export const TeamPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    contentApi.getPageContent('team')
      .then(res => setData(res))
      .catch(err => console.error('Error fetching team data:', err));
  }, []);

  const hero = data?.hero || {};
  const videoSrc = resolveMediaUrl(hero.video_url || hero.video_file);
  const imageSrc = resolveMediaUrl(hero.background_image || hero.fallback_image);
  const coaches = data?.coaches || [];

  return (
    <div className="sw">
      {/* DYNAMIC HERO */}
      <section className="hero-section" style={{ position: 'relative', overflow: 'hidden', padding: '120px 0 88px', borderBottom: '1px solid rgba(255, 255, 255, 0.12)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
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
              alt="SWEAT Team"
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
            />
          ) : null}
        </div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(10, 10, 10, 0.92) 0%, rgba(10, 10, 10, 0.6) 55%, rgba(10, 10, 10, 0.25) 100%)' }} />
        <div style={{ position: 'absolute', inset: 'auto 0 0', height: '240px', background: 'linear-gradient(rgba(10, 10, 10, 0), rgba(10, 10, 10, 0.95))' }} />

        <div className="wrap" style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <span className="eyebrow red">{hero.eyebrow || "The Coaches & Founders"}</span>
          <AnimatedHeadline className="disp h1">
            {hero.headline || "THE TEAM."}
          </AnimatedHeadline>
          <p style={{ margin: 0, fontSize: '21px', lineHeight: 1.55, color: '#E5E5E5', maxWidth: '620px' }}>
            {hero.subheading || "Specialists in strength training, precision movement, nutrition, recovery and athletic periodization. The people on the floor with you."}
          </p>
        </div>
      </section>

      {/* DYNAMIC COACHES ON THE FLOOR */}
      <section className="white" style={{ padding: '112px 0', background: '#FFFFFF', minHeight: '800px' }}>
        <div className="wrap">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
            <span className="eyebrow red">The Coaches</span>
            <AnimatedHeadline className="disp h2">
              THE PEOPLE<br />ON THE FLOOR.
            </AnimatedHeadline>
            <p style={{ margin: 0, fontSize: '18px', lineHeight: 1.6, color: '#4A4A4A', maxWidth: '640px' }}>
              Every class has a Teaching Trainer and an Assistant Trainer. Nobody trains unseen.
            </p>
          </div>

          <div className="grid4" style={{ marginTop: '64px', gap: '24px' }}>
            {coaches && coaches.length > 0 ? (
              coaches.map((coach, idx) => (
                <div key={coach.id || idx} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div
                    className="shot shot-lt"
                    style={{
                      height: '380px',
                      backgroundImage: coach.photo || coach.photo_url ? `url(${coach.photo || coach.photo_url})` : undefined,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    {!(coach.photo || coach.photo_url) && <b>[TRAINER PHOTO]</b>}
                  </div>
                  <h3 className="disp" style={{ fontSize: '38px', margin: 0, color: '#0A0A0A' }}>
                    {coach.name}
                  </h3>
                  <span className="eyebrow" style={{ color: '#E10600', fontWeight: 800 }}>
                    {coach.role_title}
                  </span>
                  {coach.celebrities_trained && (
                    <span style={{ fontSize: '11px', color: '#666', fontWeight: 600 }}>
                      Trained: {coach.celebrities_trained}
                    </span>
                  )}
                  {coach.bio && (
                    <p style={{ margin: 0, fontSize: '13px', color: '#4A4A4A', lineHeight: 1.5 }}>
                      {coach.bio}
                    </p>
                  )}
                </div>
              ))
            ) : (
              <div className="shot shot-lt" style={{ gridColumn: 'span 4', height: '240px' }}>
                <b>No Coaches Added Yet in CMS</b>
                <span>Add coaches and trainers from the CMS Studio to display them dynamically here</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <MarqueeBanner text="ONE STANDARD ✕ OLYMPIC LIFTING ✕ REFORMER PILATES ✕ ZERO FLUFF ✕ " />

      {/* CALL TO ACTION */}
      <section style={{ padding: '100px 0', background: '#0A0A0A', textAlign: 'center' }}>
        <div className="wrap" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
          <span className="eyebrow red">Entry strictly by assessment</span>
          <AnimatedHeadline className="disp h2" style={{ maxWidth: '800px' }}>
            TRAIN WITH THE BEST IN ANDHERI.
          </AnimatedHeadline>
          <div style={{ display: 'flex', gap: '16px', marginTop: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link to="/book" className="btn btn-red" style={{ minHeight: '56px', padding: '0 32px' }}>
              Experience SWEAT
            </Link>
            <Link to="/assessment" className="btn btn-ghost" style={{ minHeight: '56px', padding: '0 28px' }}>
              Book an Assessment
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TeamPage;