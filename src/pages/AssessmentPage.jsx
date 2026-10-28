import React, { useState, useEffect } from 'react';
import contentApi from '../api/contentApi';
import SlotBookingWidget from '../components/public/SlotBookingWidget';
import TransformationSlider from '../components/public/TransformationSlider';
import MarqueeBanner from '../components/common/MarqueeBanner';
import AnimatedHeadline from '../components/common/AnimatedHeadline';
import { resolveMediaUrl } from '../utils/mediaUrl';

export const AssessmentPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [data, setData] = useState(null);

  useEffect(() => {
    contentApi.getPageContent('assessment')
      .then(res => setData(res))
      .catch(err => console.error('Error fetching assessment data:', err));
  }, []);

  const lenses = [
    {
      num: '01',
      name: 'Cardio',
      eyebrow: 'Your engine',
      title: 'Cardiovascular',
      desc: 'How well your heart and lungs support sustained effort, the base of every goal.',
      depth: '60%',
      measures: ['Cardiovascular condition', 'Recovery rate', 'Effort tolerance', 'VO2 kinetic estimation'],
      informs: ['Class intensity placement', 'Conditioning program', 'Metabolic rest intervals'],
      leavesWith: 'The right intensity from day one.'
    },
    {
      num: '02',
      name: 'Strength',
      eyebrow: 'Your capability',
      title: 'Muscular Strength',
      desc: 'Tested across the hinge, squat, pull and brace under zero-risk biomechanical screening.',
      depth: '75%',
      measures: ['Upper and lower kinetic force', 'Core bracing integrity', 'Structural symmetry'],
      informs: ['Barbell loading progression', 'Accessory lifting roadmap', 'Repetition ranges'],
      leavesWith: 'Clarity on your true strength baseline.'
    },
    {
      num: '03',
      name: 'Mobility',
      eyebrow: 'Your freedom',
      title: 'Functional Mobility',
      desc: 'Joint range of motion in ankles, hips, thoracic spine and shoulders to identify pain triggers.',
      depth: '85%',
      measures: ['Thoracic rotation', 'Hip flexion and capsule depth', 'Ankle dorsiflexion'],
      informs: ['Pilates level placement', 'Pre-hab stretching priorities', 'Movement modifications'],
      leavesWith: 'Freedom of movement without pain.'
    },
    {
      num: '04',
      name: 'Goals',
      eyebrow: 'Your destination',
      title: 'Roadmap & Targets',
      desc: 'Every goal is anchored in real metrics: body composition, schedule realities, and target deadlines.',
      depth: '100%',
      measures: ['Target fat loss / muscle gain', 'Reassessment milestone dates', 'Nutrition baseline'],
      informs: ['Weekly class frequency', 'Bootcamp vs Pilates ratio', 'Trainer floor assignments'],
      leavesWith: 'A concrete written roadmap with zero guesswork.'
    }
  ];

  const currentLens = lenses[activeTab];
  const transformations = data?.transformations || [];
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
              alt="SWEAT Assessment Hero"
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
            />
          ) : (
            <div className="shot" style={{ width: '100%', height: '100%', border: 0 }}>
              <b>FILM · Hero · assessment in progress</b>
              <span>Coach with tablet, member on mobility test, 4:5 · looping, muted, behind the title</span>
            </div>
          )}
        </div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(10, 10, 10, 0.92) 0%, rgba(10, 10, 10, 0.6) 55%, rgba(10, 10, 10, 0.25) 100%)' }} />
        <div style={{ position: 'absolute', inset: 'auto 0 0', height: '240px', background: 'linear-gradient(rgba(10, 10, 10, 0), rgba(10, 10, 10, 0.95))' }} />

        <div className="wrap" style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <span className="eyebrow red">{hero.eyebrow || "The SWEAT Assessment"}</span>
            <span className="pill" style={{ background: '#E10600' }}>Two ways in</span>
          </div>

          <AnimatedHeadline className="disp h1">
            {hero.headline || "ASSESSMENT."}
          </AnimatedHeadline>

          <p style={{ margin: 0, fontSize: '24px', lineHeight: 1.45, color: '#F2F2F2', maxWidth: '680px', fontWeight: 600 }}>
            {hero.subheading || hero.subheadline || "Stop guessing. In one sitting, know exactly where you are, where you are going and the fastest route there."}
          </p>
          <p style={{ margin: 0, fontSize: '18px', lineHeight: 1.6, color: '#C4C4C4', maxWidth: '620px' }}>
            Every journey at SWEAT begins here. It is the reason our members get results, and the reason we place people instead of just signing them up.
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
              <div className="num" style={{ fontSize: '60px' }}>1</div>
              <div className="eyebrow" style={{ color: '#D4D4D4' }}>Sitting. A full picture.</div>
            </div>
            <div>
              <div className="num" style={{ fontSize: '60px' }}>10</div>
              <div className="eyebrow" style={{ color: '#D4D4D4' }}>Aspects of fitness in view</div>
            </div>
            <div>
              <div className="num" style={{ fontSize: '60px' }}>15</div>
              <div className="eyebrow" style={{ color: '#D4D4D4' }}>Days to your first reassessment</div>
            </div>
            <div>
              <div className="num" style={{ fontSize: '60px' }}>1</div>
              <div className="eyebrow" style={{ color: '#D4D4D4' }}>Clear roadmap</div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <MarqueeBanner text="KNOW YOUR NUMBERS ✕ KNOW YOUR PLAN ✕ ASSESSMENT ✕ " />

      {/* WHY PEOPLE WALK IN */}
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
              { num: '01', title: 'I have no idea where to start.', desc: 'The assessment tells you, in plain words, which program and which level is yours.' },
              { num: '02', title: 'I have tried before and quit.', desc: 'We find out why, then plan around it, so this time the plan fits your life.' },
              { num: '03', title: 'I want proof I am progressing.', desc: 'Your baseline today is the benchmark for every reassessment after.' },
              { num: '04', title: 'I do not want to get hurt.', desc: 'Mobility, limits and training history are all checked before you lift anything.' },
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
              { in: "You don't know your real starting point.", out: "A clear picture of how you move, where you're strong and what's holding you back." },
              { in: "You're unsure which program fits you.", out: "One recommendation: the class, the level and the plan that suits you." },
              { in: "You've guessed at goals before.", out: "A target with numbers you can measure at day 15, day 30 and beyond." },
              { in: "You want to walk in with confidence.", out: "A coach-led plan, a place in the right room and a first week you can picture." },
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

      {/* FOUR LENSES INTERACTIVE TAB */}
      <section id="levels" style={{ padding: '112px 0', minHeight: '900px', background: '#0A0A0A' }}>
        <div className="wrap">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
            <span className="eyebrow red">What we look at</span>
            <AnimatedHeadline className="disp h2">
              FOUR LENSES.<br />ONE PLAN.
            </AnimatedHeadline>
            <p style={{ margin: 0, fontSize: '18px', lineHeight: 1.6, color: '#A3A3A3', maxWidth: '640px' }}>
              The assessment brings four things together so the plan is built on facts, not hunches.
            </p>
          </div>

          <div className="tab-interactive-grid">
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {lenses.map((lens, idx) => (
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
                  <span className="num red" style={{ fontSize: '30px' }}>{lens.num}</span>
                  <span className="disp" style={{ fontSize: 'clamp(32px, 5vw, 60px)' }}>{lens.name}</span>
                </button>
              ))}
            </div>

            <div className="tile" style={{ padding: '36px', display: 'flex', flexDirection: 'column', gap: '28px', background: '#111111' }}>
              <div>
                <span className="eyebrow red">{currentLens.eyebrow}</span>
                <h3 className="disp" style={{ fontSize: 'clamp(38px, 7vw, 84px)', marginTop: '10px' }}>{currentLens.title}</h3>
              </div>

              <p style={{ margin: 0, fontSize: '19px', lineHeight: 1.6, color: '#E5E5E5' }}>
                {currentLens.desc}
              </p>

              <div>
                <div className="eyebrow mut" style={{ marginBottom: '10px' }}>Depth</div>
                <div className="bar" style={{ height: '10px' }}>
                  <i style={{ width: currentLens.depth }} />
                </div>
              </div>

              <div className="grid2">
                <div>
                  <div className="eyebrow mut" style={{ marginBottom: '12px' }}>What we measure</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {currentLens.measures.map((m, i) => (
                      <div key={i} style={{ display: 'flex', gap: '10px', fontSize: '15px' }}>
                        <span className="red">—</span>
                        <span>{m}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="eyebrow mut" style={{ marginBottom: '12px' }}>What it informs</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {currentLens.informs.map((inf, i) => (
                      <div key={i} style={{ display: 'flex', gap: '10px', fontSize: '15px' }}>
                        <span className="red">—</span>
                        <span>{inf}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.14)', paddingTop: '22px', display: 'flex', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
                <div>
                  <div className="eyebrow mut">What you leave with</div>
                  <div style={{ fontSize: '17px', fontWeight: 700, marginTop: '6px', maxWidth: '520px' }}>
                    {currentLens.leavesWith}
                  </div>
                </div>
                <a href="#book" className="btn btn-red">Experience SWEAT</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRANSFORMATIONS */}
      <section style={{ padding: '112px 0', background: '#0A0A0A', minHeight: '900px' }}>
        <div className="wrap">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
            <span className="eyebrow red">Transformations · The Assessment</span>
            <AnimatedHeadline className="disp h2" style={{ fontSize: '120px' }}>
              REAL PEOPLE.<br />REAL <span className="out">CHANGE.</span>
            </AnimatedHeadline>
            <p style={{ margin: 0, fontSize: '18px', lineHeight: 1.6, color: '#A3A3A3', maxWidth: '640px' }}>
              Same pose, same light. Every result is logged, measured and reassessed every 15 days.
            </p>
          </div>

          <TransformationSlider transformations={transformations} />
        </div>
      </section>

      {/* BOOKING SECTION */}
      <section id="book" style={{ padding: '104px 0 120px', background: '#0A0A0A', borderTop: '1px solid rgba(255, 255, 255, 0.12)' }}>
        <div className="wrap">
          <div className="grid2" style={{ gap: '24px', alignItems: 'stretch' }}>
            <SlotBookingWidget
              leadType="assessment"
              theme="red"
              title="BOOK ASSESSMENT."
              eyebrow="Know your starting point"
              description="Cardio, strength, mobility and goals, measured and turned into a roadmap and the class or level that fits you."
              buttonText="Confirm Assessment Slot"
            />
            <SlotBookingWidget
              leadType="experience"
              theme="dark"
              title="EXPERIENCE SWEAT."
              eyebrow="See it, feel it"
              description="Walk in, see the floor, meet the coaches and team, and feel a session before deciding."
              buttonText="Book your visit"
            />
          </div>
        </div>
      </section>

    </div>
  );
};

export default AssessmentPage;
