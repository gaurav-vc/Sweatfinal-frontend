import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import contentApi from '../api/contentApi';
import SlotBookingWidget from '../components/public/SlotBookingWidget';
import MarqueeBanner from '../components/common/MarqueeBanner';
import AnimatedHeadline from '../components/common/AnimatedHeadline';
import { resolveMediaUrl } from '../utils/mediaUrl';

export const BootcampPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [data, setData] = useState(null);

  useEffect(() => {
    contentApi.getPageContent('bootcamp')
      .then(res => setData(res))
      .catch(err => console.error('Error fetching bootcamp data:', err));
  }, []);

  const classes = [
    {
      num: '01',
      name: 'Foundation',
      forLabel: 'For: new, returning, or rebuilding',
      duration: '50',
      kcal: '300–400',
      intensity: '40%',
      desc: 'Choose this if you want to move well before you move heavy. You learn where force comes from and how to hold a strong spine, so everything that follows is safer.',
      builds: ['Fundamental movement patterns', 'Hip- and shoulder-driven movement', 'Lifting mechanics and bracing', 'Mobility, flexibility, core'],
      onFloor: ['Bodyweight', 'Dumbbells and kettlebells', 'Barbell technique work'],
      leavesWith: 'Technique, confidence and a base for everything harder.'
    },
    {
      num: '02',
      name: 'DTP',
      forLabel: 'For: serious body recomposition & fat loss',
      duration: '120',
      kcal: '700–900',
      intensity: '90%',
      desc: 'Our signature heavy metabolic conditioning session. High caloric expenditure combined with progressive resistance to torch fat while preserving lean tissue.',
      builds: ['Lactate threshold', 'Maximum caloric burn', 'Mental grit', 'Metabolic conditioning'],
      onFloor: ['Barbells & Olympic rigs', 'AirBikes & Rowers', 'Sled pushes & Sandbags'],
      leavesWith: 'Depleted glycogen, accelerated fat oxidation, and elevated EPOC.'
    },
    {
      num: '03',
      name: 'Athletic',
      forLabel: 'For: explosive strength & functional agility',
      duration: '60',
      kcal: '500–600',
      intensity: '75%',
      desc: 'Trained across all three anatomical planes. Olympic lift variations combined with rotational core power and plyometric speed work.',
      builds: ['Rotational power', 'Unilateral stability', 'Sprint speed', 'Gymnastic body control'],
      onFloor: ['TRX & Rings', 'Kettlebell snatches', 'Curved runners & SkiErgs'],
      leavesWith: 'Fluid athletic coordination that transfers directly to real life.'
    },
    {
      num: '04',
      name: 'Glutes & Abs',
      forLabel: 'For: targeted posterior chain & core sculpting',
      duration: '50',
      kcal: '400–500',
      intensity: '65%',
      desc: 'Dedicated biomechanical focus on glute activation, hip thrust volume, and multi-angle abdominal bracing.',
      builds: ['Glute hypertrophy', 'Transverse abdominis strength', 'Pelvic stability', 'Lower back armor'],
      onFloor: ['Hip thrust benches', 'Heavy resistance bands', 'Cable pull-throughs'],
      leavesWith: 'Targeted muscular pump, corrected posture, and tight waist definition.'
    }
  ];

  const currentClass = classes[activeTab];
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
              alt="SWEAT Bootcamp Hero"
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
            />
          ) : (
            <div className="shot" style={{ width: '100%', height: '100%', border: 0 }}>
              <b>FILM · Hero · member mid-lift</b>
              <span>Barbell overhead, chalk dust, rig behind · 4:5 · looping, muted, behind the title</span>
            </div>
          )}
        </div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(10, 10, 10, 0.92) 0%, rgba(10, 10, 10, 0.6) 55%, rgba(10, 10, 10, 0.25) 100%)' }} />
        <div style={{ position: 'absolute', inset: 'auto 0 0', height: '240px', background: 'linear-gradient(rgba(10, 10, 10, 0), rgba(10, 10, 10, 0.95))' }} />

        <div className="wrap" style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <span className="eyebrow red">{hero.eyebrow || "SWEAT Bootcamp"}</span>
            <span className="pill" style={{ background: '#E10600' }}>Two ways in</span>
          </div>

          <AnimatedHeadline className="disp h1" style={{ fontSize: '250px', lineHeight: 0.84 }}>
            {hero.headline || "BOOTCAMP."}
          </AnimatedHeadline>

          <p style={{ margin: 0, fontSize: '24px', lineHeight: 1.45, color: '#F2F2F2', maxWidth: '680px', fontWeight: 600 }}>
            {hero.subheading || hero.subheadline || "Walk in tired of starting over. Walk out stronger, leaner and certain you are finally getting somewhere."}
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

          <div className="grid4" style={{ marginTop: '28px', borderTop: '1px solid rgba(255, 255, 255, 0.2)', paddingTop: '28px' }}>
            <div>
              <div className="num" style={{ fontSize: '60px' }}>4</div>
              <div className="eyebrow" style={{ color: '#D4D4D4' }}>Classes, one for every goal</div>
            </div>
            <div>
              <div className="num" style={{ fontSize: '60px' }}>10</div>
              <div className="eyebrow" style={{ color: '#D4D4D4' }}>Aspects of fitness trained</div>
            </div>
            <div>
              <div className="num" style={{ fontSize: '60px' }}>2–3</div>
              <div className="eyebrow" style={{ color: '#D4D4D4' }}>Coaches on the floor</div>
            </div>
            <div>
              <div className="num" style={{ fontSize: '60px' }}>15</div>
              <div className="eyebrow" style={{ color: '#D4D4D4' }}>Days between reassessments</div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <MarqueeBanner text="STRONGER ✕ LEANER ✕ SURE OF YOURSELF ✕ BOOTCAMP ✕ " />

      {/* WHY PEOPLE WALK IN (8 TILES) */}
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
              { num: '01', title: 'I want to lose 8 to 15 kg and keep it off.', desc: 'DTP is a 120-minute strength and conditioning session that burns 700 to 900 kcal. Your waist and weight are measured every 15 days, so you see it working.' },
              { num: '02', title: 'I have never touched a barbell.', desc: 'Foundation teaches the hinge, squat, press and brace first, with coaches at your elbow. Nobody is thrown under a bar they are not ready for.' },
              { num: '03', title: 'I train, but I have plateaued.', desc: 'Athletic work across all three planes, with rowers, AirBikes, SkiErgs and TRX, plus a plan that progresses so the numbers keep moving.' },
              { num: '04', title: 'I want visible shape: glutes, core, a leaner waist.', desc: 'Glutes & Abs is a circuit built from many glute angles and every core muscle, with a coach correcting your form.' },
              { num: '05', title: 'I sit ten hours a day and my body shows it.', desc: 'Hip and shoulder mobility, posture and bracing in every class, so your back, neck and hips feel the difference by week four.' },
              { num: '06', title: 'I have a wedding, a shoot or a big date coming.', desc: 'Tell us the date. Your assessment turns it into a 8 to 12 week plan, reassessed every 15 days to check you are on track.' },
              { num: '07', title: 'I quit when I train alone.', desc: 'A room of people with goals and two to three coaches who notice when you slip, so showing up becomes the habit.' },
              { num: '08', title: 'I want to be trained like an athlete.', desc: 'The same Olympic lifting, gymnastics and conditioning principles Praveen Nair used with Bollywood\'s best, scaled to your level.' }
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
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 5fr) 70px minmax(0, 6fr)', gap: '24px', paddingBottom: '14px' }}>
              <span className="eyebrow" style={{ color: '#6A6A6A' }}>What you walk in with</span>
              <span></span>
              <span className="eyebrow red">What you walk out with</span>
            </div>

            {[
              { in: "You've started and stopped four times. No plan, no one checking.", out: "A coached plan where every session builds on the last, with your numbers logged and reviewed every 15 days." },
              { in: "You're lifting from YouTube and hoping your form is right.", out: "A barbell technique you trust, a braced spine and the confidence to load it heavier, safely." },
              { in: "The scale moves, the mirror doesn't, and you don't know why.", out: "A measured waist, strength and conditioning baseline, so you see fat loss and shape change in numbers." },
              { in: "You're tired by 4 pm and dread the stairs.", out: "Real stamina. Your first class leaves you spent, by month one you recover faster and sleep deeper." },
              { in: "You train alone and quit when it gets hard.", out: "A room of people with goals, and two to three coaches who notice when you slip." },
              { in: "You feel like a beginner in every gym.", out: "A place you belong, coached by the man who trained Bollywood's best." },
            ].map((row, idx) => (
              <div key={idx} style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 5fr) 70px minmax(0, 6fr)', gap: '24px', alignItems: 'center', padding: '30px 0', borderTop: '1px solid rgba(0, 0, 0, 0.16)' }}>
                <div style={{ fontSize: '22px', lineHeight: 1.35, color: '#6A6A6A', fontWeight: 600 }}>{row.in}</div>
                <div className="disp red" style={{ fontSize: '52px', textAlign: 'center' }}>→</div>
                <div style={{ fontSize: '26px', lineHeight: 1.3, fontWeight: 800 }}>{row.out}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOUR CLASSES INTERACTIVE SELECTOR */}
      <section id="levels" style={{ padding: '112px 0', minHeight: '1180px', background: '#0A0A0A' }}>
        <div className="wrap">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
            <span className="eyebrow red">The right room</span>
            <AnimatedHeadline className="disp h2" style={{ fontSize: '112px' }}>
              FOUR CLASSES.<br />ONE IS YOURS.
            </AnimatedHeadline>
            <p style={{ margin: 0, fontSize: '18px', lineHeight: 1.6, color: '#A3A3A3', maxWidth: '640px' }}>
              We do not drop everyone into the hardest class. Your assessment places you where you will make real progress, and you earn your way up.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 4fr) minmax(0, 8fr)', gap: '48px', marginTop: '64px', alignItems: 'start' }}>
            {/* Tab Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {classes.map((cls, idx) => (
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
                  <span className="num red" style={{ fontSize: '30px' }}>{cls.num}</span>
                  <span className="disp" style={{ fontSize: '60px' }}>{cls.name}</span>
                </button>
              ))}
            </div>

            {/* Tab Details Box */}
            <div className="tile" style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '28px', background: '#111111' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '24px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                <div>
                  <span className="eyebrow red">{currentClass.forLabel}</span>
                  <h3 className="disp" style={{ fontSize: '92px', marginTop: '10px' }}>{currentClass.name}</h3>
                </div>
                <div style={{ display: 'flex', gap: '28px' }}>
                  <div>
                    <div className="num" style={{ fontSize: '56px' }}>{currentClass.duration}</div>
                    <div className="eyebrow mut">Minutes</div>
                  </div>
                  <div>
                    <div className="num" style={{ fontSize: '56px' }}>{currentClass.kcal}</div>
                    <div className="eyebrow mut">Kcal burn</div>
                  </div>
                </div>
              </div>

              <p style={{ margin: 0, fontSize: '19px', lineHeight: 1.6, color: '#E5E5E5' }}>
                {currentClass.desc}
              </p>

              <div>
                <div className="eyebrow mut" style={{ marginBottom: '10px' }}>Intensity</div>
                <div className="bar" style={{ height: '10px' }}>
                  <i style={{ width: currentClass.intensity }} />
                </div>
              </div>

              <div className="grid2">
                <div>
                  <div className="eyebrow mut" style={{ marginBottom: '12px' }}>What it builds</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {currentClass.builds.map((b, i) => (
                      <div key={i} style={{ display: 'flex', gap: '10px', fontSize: '15px' }}>
                        <span className="red">—</span>
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="eyebrow mut" style={{ marginBottom: '12px' }}>On the floor</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {currentClass.onFloor.map((f, i) => (
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
                    {currentClass.leavesWith}
                  </div>
                </div>
                <a href="#book" className="btn btn-red">Experience SWEAT</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10 ASPECTS (WHITE CONTRAST) */}
      <section className="white" style={{ padding: '112px 0', background: '#FFFFFF', minHeight: '900px' }}>
        <div className="wrap">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
            <span className="eyebrow red">The method</span>
            <AnimatedHeadline className="disp h2" style={{ fontSize: '112px' }}>
              TEN ASPECTS.<br />ONE FLOOR.
            </AnimatedHeadline>
            <p style={{ margin: 0, fontSize: '18px', lineHeight: 1.6, color: '#4A4A4A', maxWidth: '640px' }}>
              Fitness is not one number. SWEAT Bootcamp trains all ten, so you feel capable, not just tired.
            </p>
          </div>

          <div className="grid5" style={{ marginTop: '64px' }}>
            {[
              { num: '01', title: 'Cardiovascular endurance', desc: 'Sustain effort efficiently over time.' },
              { num: '02', title: 'Muscular strength', desc: 'Produce force.' },
              { num: '03', title: 'Muscular endurance', desc: 'Repeat or hold effort without fading.' },
              { num: '04', title: 'Flexibility', desc: 'Move through a full, useful range.' },
              { num: '05', title: 'Power', desc: 'Express force quickly.' },
              { num: '06', title: 'Speed', desc: 'Move fast.' },
              { num: '07', title: 'Coordination', desc: 'Control different body parts together.' },
              { num: '08', title: 'Agility', desc: 'Change direction cleanly.' },
              { num: '09', title: 'Balance', desc: 'Stay in control and stable.' },
              { num: '10', title: 'Accuracy', desc: 'Move with precision and purpose.' },
            ].map((asp, i) => (
              <div key={i} className="tile" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px', minHeight: '180px' }}>
                <span className="num" style={{ fontSize: '44px', color: '#E10600' }}>{asp.num}</span>
                <h3 style={{ margin: 0, fontSize: '17px', lineHeight: 1.25 }}>{asp.title}</h3>
                <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.5, color: '#4A4A4A' }}>{asp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COACHING MODEL */}
      <section style={{ padding: '112px 0', background: '#0A0A0A', minHeight: '760px' }}>
        <div className="wrap">
          <div className="split">
            <div className="shot" style={{ height: '540px' }}>
              <b>Coaches on the floor · action shot</b>
              <span>Teaching Trainer commanding · Assistant Trainer correcting</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
                <span className="eyebrow red">Coaching model</span>
                <AnimatedHeadline className="disp h2" style={{ fontSize: '112px' }}>
                  ONE VOICE.<br />ONE EYE ON YOU.
                </AnimatedHeadline>
              </div>
              <div>
                <div style={{ padding: '24px 0', borderTop: '1px solid rgba(255, 255, 255, 0.18)' }}>
                  <h3 style={{ margin: '0 0 8px', fontSize: '20px' }}>Teaching Trainer</h3>
                  <p style={{ margin: 0, color: '#A3A3A3', lineHeight: 1.6 }}>Runs the room: instructions, demonstrations, timing and cues. The class has a command, not a crowd.</p>
                </div>
                <div style={{ padding: '24px 0', borderTop: '1px solid rgba(255, 255, 255, 0.18)', borderBottom: '1px solid rgba(255, 255, 255, 0.18)' }}>
                  <h3 style={{ margin: '0 0 8px', fontSize: '20px' }}>Assistant Trainer</h3>
                  <p style={{ margin: 0, color: '#A3A3A3', lineHeight: 1.6 }}>Walks the floor all session, watches each member and corrects movement before it becomes a habit.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOOKING SECTION */}
      <section id="book" style={{ padding: '104px 0 120px', background: '#0A0A0A', borderTop: '1px solid rgba(255, 255, 255, 0.12)' }}>
        <div className="wrap">
          <div className="grid2" style={{ gap: '24px', alignItems: 'stretch' }}>
            <SlotBookingWidget
              leadType="bootcamp"
              theme="red"
              title="EXPERIENCE BOOTCAMP."
              eyebrow="Feel the floor"
              description="Step onto the rig, lift under expert supervision, and experience the energy of a SWEAT bootcamp."
              buttonText="Book your bootcamp trial"
            />
            <SlotBookingWidget
              leadType="assessment"
              theme="dark"
              title="FITNESS ASSESSMENT."
              eyebrow="Know your starting point"
              description="Get your baseline measured across strength, cardio, and mobility before hitting the floor."
              buttonText="Book your assessment"
            />
          </div>
        </div>
      </section>

    </div>
  );
};

export default BootcampPage;
