import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import contentApi from '../api/contentApi';
import SlotBookingWidget from '../components/public/SlotBookingWidget';
import MarqueeBanner from '../components/common/MarqueeBanner';
import AnimatedHeadline from '../components/common/AnimatedHeadline';
import { resolveMediaUrl } from '../utils/mediaUrl';

export const PilatesPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [data, setData] = useState(null);

  useEffect(() => {
    contentApi.getPageContent('pilates')
      .then(res => setData(res))
      .catch(err => console.error('Error fetching pilates data:', err));
  }, []);

  const levels = [
    {
      num: '01',
      name: 'Rehab',
      forLabel: 'For: seniors, injury return, a gentle start',
      duration: '50',
      kcal: '250–350',
      intensity: '20%',
      desc: 'Choose this if you want to start slowly and safely. Very low intensity, built to restore mobility, stability and confidence.',
      builds: ['Mobility of joints', 'Stability and balance', 'Basic conditioning', 'Body awareness and confidence'],
      inRoom: ['Reformer', 'Pilates apparatus', 'Light resistance straps'],
      leavesWith: 'Joint mobility, strength and the confidence to progress.'
    },
    {
      num: '02',
      name: 'Stretch',
      forLabel: 'For: tight bodies, desk workers, starting out',
      duration: '50',
      kcal: '300–400',
      intensity: '40%',
      desc: 'Focuses on lengthening contracted muscle chains, decompressing the thoracic spine, and opening tight hip flexors.',
      builds: ['Spinal decompression', 'Hamstring and hip flexibility', 'Diaphragmatic breathing', 'Postural alignment'],
      inRoom: ['Reformer carriage', 'Extension springs', 'Foam blocks and straps'],
      leavesWith: 'Effortless upright posture, reduced back stiffness, and deep relaxation.'
    },
    {
      num: '03',
      name: 'Total',
      forLabel: 'For: full-body tone & core endurance',
      duration: '50',
      kcal: '400–500',
      intensity: '60%',
      desc: 'A continuous flow on the reformer targeting deep stabilizer muscles, glute tone, and sustained abdominal resistance.',
      builds: ['Core endurance', 'Scapular stability', 'Long, lean muscle tone', 'Balance and coordination'],
      inRoom: ['Reformer jumpboards', 'Pilates balls', 'Medium-to-heavy spring tension'],
      leavesWith: 'Firm abdominal tone, full-body balance, and athletic agility.'
    },
    {
      num: '04',
      name: 'Athletic',
      forLabel: 'For: explosive strength & athletic conditioning',
      duration: '50',
      kcal: '500–600',
      intensity: '80%',
      desc: 'High-energy reformer work integrated with dumbbells, TRX suspension systems, and ViPR cylinders for true athletic conditioning.',
      builds: ['Metabolic stamina', 'Explosive core power', 'Dynamic stability', 'Functional athleticism'],
      inRoom: ['Reformers with TRX', 'Dumbbells and kettlebells', 'High-speed jumpboards'],
      leavesWith: 'Unstoppable core power, shredded definition, and peak athletic movement.'
    }
  ];

  const currentLevel = levels[activeTab];
  const hero = data?.hero || {};
  const videoSrc = resolveMediaUrl(hero.video_url || hero.video_file);
  const imageSrc = resolveMediaUrl(hero.background_image || hero.fallback_image);

  return (
    <div className="sw">
      
      {/* HERO */}
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
              alt="SWEAT Pilates Hero"
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
            />
          ) : (
            <div className="shot" style={{ width: '100%', height: '100%', border: 0 }}>
              <b>FILM · Hero · reformer, mid-stretch</b>
              <span>Overhead on reformer, black studio · 4:5 · looping, muted, behind the title</span>
            </div>
          )}
        </div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(10, 10, 10, 0.92) 0%, rgba(10, 10, 10, 0.6) 55%, rgba(10, 10, 10, 0.25) 100%)' }} />
        <div style={{ position: 'absolute', inset: 'auto 0 0', height: '240px', background: 'linear-gradient(rgba(10, 10, 10, 0), rgba(10, 10, 10, 0.95))' }} />

        <div className="wrap" style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <span className="eyebrow red">{hero.eyebrow || "SWEAT Pilates"}</span>
            <span className="pill" style={{ background: '#E10600' }}>Two ways in</span>
          </div>

          <AnimatedHeadline className="disp h1">
            {hero.headline || "PILATES."}
          </AnimatedHeadline>

          <p style={{ margin: 0, fontSize: '24px', lineHeight: 1.45, color: '#F2F2F2', maxWidth: '680px', fontWeight: 600 }}>
            {hero.subheading || hero.subheadline || "Start the fitness journey you keep postponing. Move without fear, stand taller and feel at home in your body again."}
          </p>
          <p style={{ margin: 0, fontSize: '18px', lineHeight: 1.6, color: '#C4C4C4', maxWidth: '620px' }}>
            Olympic lifting, gymnastics and conditioning, coached by two to three trainers on the floor and led by the man who built bodies you have admired on screen.
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a href={hero.cta_primary_link || "#book"} className="btn btn-red" style={{ minHeight: '64px', padding: '0 34px' }}>
              {hero.cta_primary_text || "Experience SWEAT"}
            </a>
            <a href={hero.cta_secondary_link || "#book"} className="btn btn-ghost" style={{ minHeight: '64px', padding: '0 30px' }}>
              {hero.cta_secondary_text || "Book a fitness assessment"}
            </a>
          </div>

          <div className="hero-stats-grid">
            <div>
              <div className="num" style={{ fontSize: '60px' }}>4</div>
              <div className="eyebrow" style={{ color: '#D4D4D4' }}>Levels, Rehab to Athletic</div>
            </div>
            <div>
              <div className="num" style={{ fontSize: '60px' }}>8</div>
              <div className="eyebrow" style={{ color: '#D4D4D4' }}>Reformers a class</div>
            </div>
            <div>
              <div className="num" style={{ fontSize: '60px' }}>2+</div>
              <div className="eyebrow" style={{ color: '#D4D4D4' }}>Coaches on the floor</div>
            </div>
            <div>
              <div className="num" style={{ fontSize: '60px' }}>50</div>
              <div className="eyebrow" style={{ color: '#D4D4D4' }}>Minutes, all focus</div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <MarqueeBanner text="STRONGER CORE ✕ BETTER POSTURE ✕ FEEL GOOD AGAIN ✕ PILATES ✕ " />

      {/* WHY PEOPLE WALK IN (4 TILES) */}
      <section style={{ padding: '112px 0', background: '#0A0A0A', minHeight: '620px' }}>
        <div className="wrap">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
            <span className="eyebrow red">The real reason</span>
            <AnimatedHeadline className="disp h2" style={{ fontSize: '120px' }}>
              WHY PEOPLE<br />WALK IN.
            </AnimatedHeadline>
          </div>

          <div className="grid4" style={{ marginTop: '64px' }}>
            {[
              { num: '01', title: 'I want to feel good in my body again.', desc: 'Less stiffness, less aching, more ease. Pilates gives you back the control you did not realise you had lost.' },
              { num: '02', title: 'My back, my posture, my desk life.', desc: 'Hours of sitting leave their mark. Targeted core and mobility work helps you stand, sit and move differently.' },
              { num: '03', title: 'I am new and a little nervous.', desc: 'Good. We start where you are. Rehab and Stretch exist so nobody walks into a room that is too much, too soon.' },
              { num: '04', title: 'I want results, not just stretching.', desc: 'Athletic Pilates uses weights, TRX and Viper on the reformer, so you build real strength and real fitness.' }
            ].map((r, i) => (
              <div key={i} className="tile" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '14px', minHeight: '260px' }}>
                <span className="num red" style={{ fontSize: '44px' }}>{r.num}</span>
                <h3 style={{ margin: 0, fontSize: '24px', lineHeight: 1.2 }}>{r.title}</h3>
                <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.6, color: '#A3A3A3' }}>{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WALK IN WITH THIS / WALK OUT WITH THAT (WHITE CONTRAST) */}
      <section className="white" style={{ padding: '112px 0', background: '#FFFFFF', minHeight: '760px' }}>
        <div className="wrap">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
            <span className="eyebrow red">The transformation</span>
            <AnimatedHeadline className="disp h2" style={{ fontSize: '112px' }}>
              WALK IN WITH THIS.<br /><span className="red">WALK OUT WITH THAT.</span>
            </AnimatedHeadline>
          </div>

          <div style={{ marginTop: '56px', borderBottom: '1px solid rgba(0, 0, 0, 0.16)' }}>
            <div className="walk-in-out-header">
              <span className="eyebrow" style={{ color: '#6A6A6A' }}>What you walk in with</span>
              <span></span>
              <span className="eyebrow red">What you walk out with</span>
            </div>

            {[
              { in: "Your back aches by evening and you've stopped noticing posture.", out: "A stronger core and spine, standing taller with less pain, session after session." },
              { in: "You've never done Pilates and feel unsure where to start.", out: "A level chosen for your body, from Rehab to Athletic, never a class that's too much too soon." },
              { in: "You stretch at home and nothing really changes.", out: "Controlled strength on the reformer that lengthens, tones and lasts." },
              { in: "You're recovering from an injury and afraid to move.", out: "Guided, low-impact work that rebuilds confidence in your body." },
              { in: "You want a lean, long, strong look and don't know the route.", out: "A coached path in rooms of eight with two coaches on every floor." },
            ].map((row, idx) => (
              <div key={idx} className="walk-in-out-row">
                <div className="in-text">{row.in}</div>
                <div className="arrow disp red">→</div>
                <div className="out-text">{row.out}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOUR LEVELS INTERACTIVE SELECTOR */}
      <section id="levels" style={{ padding: '112px 0', minHeight: '900px', background: '#0A0A0A' }}>
        <div className="wrap">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
            <span className="eyebrow red">The right room</span>
            <AnimatedHeadline className="disp h2">
              FOUR LEVELS.<br />ONE LADDER.
            </AnimatedHeadline>
            <p style={{ margin: 0, fontSize: '18px', lineHeight: 1.6, color: '#A3A3A3', maxWidth: '640px' }}>
              Nobody is thrown in at the wrong level. Your assessment and your coach place you, and you climb as you build strength.
            </p>
          </div>

          <div className="tab-interactive-grid">
            {/* Tab Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {levels.map((lvl, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveTab(idx)}
                  style={{
                    textAlign: 'left',
                    background: 'transparent',
                    border: 'none',
                    borderTop: '1px solid rgba(255, 255, 255, 0.18)',
                    padding: '22px 0',
                    cursor: 'pointer',
                    display: 'flex',
                    gap: '18px',
                    alignItems: 'baseline',
                    color: activeTab === idx ? '#FF3B30' : '#FFFFFF',
                    transition: 'color 0.2s ease',
                  }}
                >
                  <span className="num red" style={{ fontSize: '30px' }}>{lvl.num}</span>
                  <span className="disp" style={{ fontSize: 'clamp(32px, 5vw, 60px)' }}>{lvl.name}</span>
                </button>
              ))}
            </div>

            {/* Tab Details Box */}
            <div className="tile" style={{ padding: '36px', display: 'flex', flexDirection: 'column', gap: '28px', background: '#111111' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '24px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                <div>
                  <span className="eyebrow red">{currentLevel.forLabel}</span>
                  <h3 className="disp" style={{ fontSize: 'clamp(38px, 7vw, 84px)', marginTop: '10px' }}>{currentLevel.name}</h3>
                </div>
                <div style={{ display: 'flex', gap: '28px' }}>
                  <div>
                    <div className="num" style={{ fontSize: '56px' }}>{currentLevel.duration}</div>
                    <div className="eyebrow mut">Minutes</div>
                  </div>
                  <div>
                    <div className="num" style={{ fontSize: '56px' }}>{currentLevel.kcal}</div>
                    <div className="eyebrow mut">Kcal burn</div>
                  </div>
                </div>
              </div>

              <p style={{ margin: 0, fontSize: '19px', lineHeight: 1.6, color: '#E5E5E5' }}>
                {currentLevel.desc}
              </p>

              <div>
                <div className="eyebrow mut" style={{ marginBottom: '10px' }}>Intensity</div>
                <div className="bar" style={{ height: '10px' }}>
                  <i style={{ width: currentLevel.intensity }} />
                </div>
              </div>

              <div className="grid2">
                <div>
                  <div className="eyebrow mut" style={{ marginBottom: '12px' }}>What it builds</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {currentLevel.builds.map((b, i) => (
                      <div key={i} style={{ display: 'flex', gap: '10px', fontSize: '15px' }}>
                        <span className="red">—</span>
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="eyebrow mut" style={{ marginBottom: '12px' }}>In the room</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {currentLevel.inRoom.map((f, i) => (
                      <div key={i} style={{ display: 'flex', gap: '10px', fontSize: '15px' }}>
                        <span className="red">—</span>
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.14)', paddingTop: '22px', display: 'flex', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
                <div>
                  <div className="eyebrow mut">What you leave with</div>
                  <div style={{ fontSize: '17px', fontWeight: 700, marginTop: '6px', maxWidth: '520px' }}>
                    {currentLevel.leavesWith}
                  </div>
                </div>
                <a href="#book" className="btn btn-red">Experience SWEAT</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ATHLETIC PILATES SECTION (WHITE CONTRAST) */}
      <section className="white" style={{ padding: '112px 0', background: '#FFFFFF', minHeight: '800px' }}>
        <div className="wrap">
          <div className="split">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
                <span className="eyebrow red">Not your usual Pilates</span>
                <AnimatedHeadline className="disp h2" style={{ fontSize: '112px' }}>
                  ATHLETIC PILATES.
                </AnimatedHeadline>
                <p style={{ margin: 0, fontSize: '18px', lineHeight: 1.6, color: '#4A4A4A', maxWidth: '640px' }}>
                  Reformer resistance, then weights, TRX and Viper. It is a whole-fitness system, not an isolated stretch.
                </p>
              </div>

              <div className="grid2" style={{ gap: '16px' }}>
                <div className="tile" style={{ padding: '22px' }}>
                  <div className="num" style={{ fontSize: '52px', color: '#E10600' }}>8</div>
                  <div className="eyebrow" style={{ color: '#4A4A4A' }}>Reformers per class</div>
                </div>
                <div className="tile" style={{ padding: '22px' }}>
                  <div className="num" style={{ fontSize: '52px', color: '#E10600' }}>50</div>
                  <div className="eyebrow" style={{ color: '#4A4A4A' }}>Minutes of work</div>
                </div>
                <div className="tile" style={{ padding: '22px' }}>
                  <div className="num" style={{ fontSize: '52px', color: '#E10600' }}>2+</div>
                  <div className="eyebrow" style={{ color: '#4A4A4A' }}>Trainers on the floor</div>
                </div>
                <div className="tile" style={{ padding: '22px' }}>
                  <div className="num" style={{ fontSize: '52px', color: '#E10600' }}>4</div>
                  <div className="eyebrow" style={{ color: '#4A4A4A' }}>Levels, Rehab to Athletic</div>
                </div>
              </div>
            </div>

            <div className="shot shot-lt" style={{ height: '640px' }}>
              <b>Reformer room · wide</b>
              <span>Eight reformers, low light, red signage</span>
            </div>
          </div>
        </div>
      </section>

      {/* BOOKING SECTION */}
      <section id="book" style={{ padding: '104px 0 120px', background: '#0A0A0A', borderTop: '1px solid rgba(255, 255, 255, 0.12)' }}>
        <div className="wrap">
          <div className="grid2" style={{ gap: '24px', alignItems: 'stretch' }}>
            <SlotBookingWidget
              leadType="pilates"
              theme="red"
              title="EXPERIENCE PILATES."
              eyebrow="Feel the reformer"
              description="Book a spot on our 8-reformer studio and feel the difference of posture-guided athletic Pilates."
              buttonText="Book your reformer session"
            />
            <SlotBookingWidget
              leadType="assessment"
              theme="dark"
              title="FITNESS ASSESSMENT."
              eyebrow="Know your starting point"
              description="Get your spine, posture, and core strength diagnosed by our master trainers."
              buttonText="Book your assessment"
            />
          </div>
        </div>
      </section>

    </div>
  );
};

export default PilatesPage;
