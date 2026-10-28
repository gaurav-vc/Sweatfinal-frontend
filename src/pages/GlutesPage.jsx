import React, { useEffect, useState } from 'react';
import contentApi from '../api/contentApi';
import SlotBookingWidget from '../components/public/SlotBookingWidget';
import TransformationSlider from '../components/public/TransformationSlider';
import MarqueeBanner from '../components/common/MarqueeBanner';
import AnimatedHeadline from '../components/common/AnimatedHeadline';
import { resolveMediaUrl } from '../utils/mediaUrl';

export const GlutesPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    contentApi.getPageContent('glutes')
      .then(res => setData(res))
      .catch(err => console.error('Error fetching glutes data:', err));
  }, []);

  const transformations = data?.transformations || [];
  const hero = data?.hero || {};
  const videoSrc = resolveMediaUrl(hero.video_url || hero.video_file);
  const imageSrc = resolveMediaUrl(hero.background_image || hero.fallback_image);

  return (
    <div className="sw">
      {/* HERO */}
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
              alt="SWEAT Glutes Hero"
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
            />
          ) : (
            <div className="shot" style={{ width: '100%', height: '100%', border: 0 }}>
              <b>FILM · Hero · Hip thrusts on the rig</b>
              <span>Heavy barbell hip thrusts, core bracing, 4:5 · looping, muted, behind the title</span>
            </div>
          )}
        </div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(10, 10, 10, 0.92) 0%, rgba(10, 10, 10, 0.6) 55%, rgba(10, 10, 10, 0.25) 100%)' }} />
        <div style={{ position: 'absolute', inset: 'auto 0 0', height: '240px', background: 'linear-gradient(rgba(10, 10, 10, 0), rgba(10, 10, 10, 0.95))' }} />

        <div className="wrap" style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <span className="eyebrow red">{hero.eyebrow || "SWEAT Glutes & Abs"}</span>
            <span className="pill" style={{ background: '#E10600' }}>Shape & Power</span>
          </div>

          <AnimatedHeadline className="disp h1" style={{ fontSize: '230px', lineHeight: 0.84 }}>
            {hero.headline || "GLUTES & ABS."}
          </AnimatedHeadline>

          <p style={{ margin: 0, fontSize: '24px', lineHeight: 1.45, color: '#F2F2F2', maxWidth: '680px', fontWeight: 600 }}>
            {hero.subheading || hero.subheadline || "Build the shape strength gives you. High-tension posterior chain work combined with deep abdominal bracing."}
          </p>
          <p style={{ margin: 0, fontSize: '18px', lineHeight: 1.6, color: '#C4C4C4', maxWidth: '620px' }}>
            A biomechanically proven circuit targeting gluteus maximus, medius, and minimus from multiple force vectors, paired with core stabilization under continuous tension.
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a href="#book" className="btn btn-red" style={{ minHeight: '64px', padding: '0 34px' }}>
              Experience SWEAT
            </a>
            <a href="#book" className="btn btn-ghost" style={{ minHeight: '64px', padding: '0 30px' }}>
              Book a fitness assessment
            </a>
          </div>

          <div className="grid4" style={{ marginTop: '28px', borderTop: '1px solid rgba(255, 255, 255, 0.2)', paddingTop: '28px' }}>
            <div>
              <div className="num" style={{ fontSize: '60px' }}>50</div>
              <div className="eyebrow" style={{ color: '#D4D4D4' }}>Minutes high tension</div>
            </div>
            <div>
              <div className="num" style={{ fontSize: '60px' }}>3</div>
              <div className="eyebrow" style={{ color: '#D4D4D4' }}>Planes of glute activation</div>
            </div>
            <div>
              <div className="num" style={{ fontSize: '60px' }}>2</div>
              <div className="eyebrow" style={{ color: '#D4D4D4' }}>Coaches on every circuit</div>
            </div>
            <div>
              <div className="num" style={{ fontSize: '60px' }}>15</div>
              <div className="eyebrow" style={{ color: '#D4D4D4' }}>Days to measured progress</div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <MarqueeBanner text="SHAPE ✕ STRENGTH ✕ GLUTES & ABS ✕ WHERE THE STARS TRAIN ✕ " />

      {/* THE CIRCUIT PILLARS (WHITE CONTRAST) */}
      <section className="white" style={{ padding: '112px 0', background: '#FFFFFF', minHeight: '640px' }}>
        <div className="wrap">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
            <span className="eyebrow red">The Circuit System</span>
            <AnimatedHeadline className="disp h2" style={{ fontSize: '112px' }}>
              THREE VECTORS.<br /><span className="red">ZERO FLUFF.</span>
            </AnimatedHeadline>
            <p style={{ margin: 0, fontSize: '18px', lineHeight: 1.6, color: '#4A4A4A', maxWidth: '640px' }}>
              Glutes cannot be built from one angle. We load horizontal hip thrusts, vertical squats and hinges, and lateral abductions for complete shape.
            </p>
          </div>

          <div className="grid3" style={{ gap: '24px', marginTop: '64px' }}>
            <div className="tile" style={{ padding: '36px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <span className="num red" style={{ fontSize: '48px' }}>01</span>
              <h3 style={{ margin: 0, fontSize: '24px' }}>Horizontal Thrusting</h3>
              <p style={{ margin: 0, color: '#4A4A4A', lineHeight: 1.6 }}>Barbell hip thrusts and kas glute bridges for maximum peak tension at full hip extension.</p>
            </div>
            <div className="tile" style={{ padding: '36px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <span className="num red" style={{ fontSize: '48px' }}>02</span>
              <h3 style={{ margin: 0, fontSize: '24px' }}>Lengthened Loading</h3>
              <p style={{ margin: 0, color: '#4A4A4A', lineHeight: 1.6 }}>Romanian deadlifts, Bulgarian split squats, and deficit lunges to stimulate muscle fibers in the deep stretch.</p>
            </div>
            <div className="tile" style={{ padding: '36px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <span className="num red" style={{ fontSize: '48px' }}>03</span>
              <h3 style={{ margin: 0, fontSize: '24px' }}>Deep Abdominal Bracing</h3>
              <p style={{ margin: 0, color: '#4A4A4A', lineHeight: 1.6 }}>Hanging leg raises, hollow holds, and anti-rotational cable chops for a cinched, functional core.</p>
            </div>
          </div>
        </div>
      </section>

      {/* TRANSFORMATIONS */}
      <section style={{ padding: '112px 0', background: '#0A0A0A', minHeight: '900px' }}>
        <div className="wrap">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
            <span className="eyebrow red">Transformations</span>
            <AnimatedHeadline className="disp h2" style={{ fontSize: '120px' }}>
              REAL RESULTS.<br /><span className="out">REAL PROGRESS.</span>
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
              leadType="glutes"
              theme="red"
              title="EXPERIENCE GLUTES & ABS."
              eyebrow="Feel the circuit"
              description="Step onto the floor, feel the biomechanical burn, and learn how real shape is built."
              buttonText="Book Glutes & Abs Slot"
            />
            <SlotBookingWidget
              leadType="assessment"
              theme="dark"
              title="FITNESS ASSESSMENT."
              eyebrow="Know your starting point"
              description="Measure your hip mobility, core bracing, and body composition before training."
              buttonText="Book Assessment"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default GlutesPage;
