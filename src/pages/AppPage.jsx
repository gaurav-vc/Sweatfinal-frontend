import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Smartphone, Check, ChevronDown, ChevronUp } from 'lucide-react';
import contentApi from '../api/contentApi';
import MarqueeBanner from '../components/common/MarqueeBanner';

export default function AppPage() {
  const [data, setData] = useState({
    hero: null,
    faqs: []
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Book');
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    async function loadAppData() {
      try {
        setLoading(true);
        const res = await contentApi.getPageContent('app');
        setData({
          hero: res.hero || null,
          faqs: res.faqs || []
        });
      } catch (err) {
        console.error('Failed to load app data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadAppData();
  }, []);

  const appFeatures = [
    {
      id: 'Book',
      title: 'Book',
      desc: 'Classes, slots and coaches in three taps.',
      screen: {
        eyebrow: 'Book',
        headline: 'PICK YOUR SLOT',
        items: [
          { title: 'Bootcamp · DTP', sub: '7:00 AM · Coach Farhan' },
          { title: 'Pilates · Stretch', sub: '8:00 AM · Coach Maya' },
          { title: 'Recovery · Contrast', sub: '6:30 PM · Private' },
          { title: 'Open Box · 30 min', sub: 'Any time' }
        ]
      }
    },
    {
      id: 'Train',
      title: 'Train',
      desc: "Your plan, your program, today's session.",
      screen: {
        eyebrow: 'Today',
        headline: 'UPPER BODY STRENGTH',
        items: [
          { title: 'Warmup · Band Work', sub: '10 Mins · Mobility' },
          { title: 'Barbell Bench Press', sub: '4 Sets × 6 Reps (RPE 8)' },
          { title: 'DB Incline Rows', sub: '3 Sets × 10 Reps' },
          { title: 'Cool Down · Breathwork', sub: '5 Mins · Reset' }
        ]
      }
    },
    {
      id: 'Track',
      title: 'Track',
      desc: 'Assessments every 15 days. Watch the numbers move.',
      screen: {
        eyebrow: 'Progress',
        headline: '15-DAY CHECK',
        items: [
          { title: 'Strength Index', sub: '+18% Peak force' },
          { title: 'Aerobic Endurance', sub: '+14% VO2 max pace' },
          { title: 'Thoracic Mobility', sub: '+12° shoulder flexion' },
          { title: 'Next Assessment', sub: 'Sunday, 10:00 AM' }
        ]
      }
    },
    {
      id: 'Eat',
      title: 'Eat',
      desc: 'Nutrition plan and meal logging with your nutritionist.',
      screen: {
        eyebrow: 'Nutrition',
        headline: 'TARGET: 2,400 KCAL',
        items: [
          { title: 'Protein', sub: '180g / 180g (Target hit)' },
          { title: 'Carbohydrates', sub: '250g / 260g' },
          { title: 'Fats', sub: '65g / 70g' },
          { title: 'Water Intake', sub: '3.4L / 4.0L' }
        ]
      }
    },
    {
      id: 'Shop',
      title: 'Shop',
      desc: 'Gear, supplements and apparel, without leaving the app.',
      screen: {
        eyebrow: 'App Store',
        headline: 'SWEAT GEAR',
        items: [
          { title: 'SWEAT Black Heavy Tee', sub: '₹2,400 · Size L' },
          { title: 'Whey Isolate Vanilla', sub: '₹4,200 · 2kg tub' },
          { title: 'Grip Lifting Straps', sub: '₹1,200 · Red edition' },
          { title: 'Delivery to Club Locker', sub: 'Ready in 2 hrs' }
        ]
      }
    }
  ];

  const currentFeature = appFeatures.find(f => f.id === activeTab) || appFeatures[0];

  return (
    <div className="sw">
      {/* HERO SECTION */}
      <section className="hero-section" style={{
        padding: '104px 0 88px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
      }}>
        <div className="wrap split">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <span className="eyebrow red">{data.hero?.eyebrow || 'The SWEAT app'}</span>
            <h1 className="disp h1">
              BOOK.<br />
              TRAIN.<br />
              <span className="out">TRACK.</span>
            </h1>
            <p style={{ margin: 0, fontSize: '21px', lineHeight: 1.55, color: '#d4d4d4', maxWidth: '520px' }}>
              {data.hero?.subheadline || 'Your plan, your classes, your progress and your nutrition, in one place. Your journey does not stop when you leave the club.'}
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a href="#download" className="btn btn-red" style={{ minHeight: '64px' }}>
                App Store
              </a>
              <a href="#download" className="btn btn-ghost" style={{ minHeight: '64px' }}>
                Google Play
              </a>
            </div>
          </div>

          {/* TWO PHONE PREVIEWS */}
          <div className="phones-preview-grid">
            {/* Phone 1: Progress */}
            <div style={{ marginTop: '36px' }}>
              <div className="phone">
                <div className="scr">
                  <span className="eyebrow red">Progress</span>
                  <div className="disp" style={{ fontSize: '44px' }}>15-DAY CHECK</div>
                  <div className="bar"><i style={{ width: '70%' }}></i></div>
                  <div style={{ border: '1px solid rgba(255, 255, 255, 0.18)', borderRadius: '8px', padding: '14px', display: 'flex', justifyContent: 'space-between' }}>
                    <span className="mut" style={{ fontSize: '13px' }}>Strength</span>
                    <b style={{ color: '#E10600' }}>+18%</b>
                  </div>
                  <div style={{ border: '1px solid rgba(255, 255, 255, 0.18)', borderRadius: '8px', padding: '14px', display: 'flex', justifyContent: 'space-between' }}>
                    <span className="mut" style={{ fontSize: '13px' }}>Endurance</span>
                    <b style={{ color: '#E10600' }}>+14%</b>
                  </div>
                  <div style={{ border: '1px solid rgba(255, 255, 255, 0.18)', borderRadius: '8px', padding: '14px', display: 'flex', justifyContent: 'space-between' }}>
                    <span className="mut" style={{ fontSize: '13px' }}>Mobility</span>
                    <b style={{ color: '#E10600' }}>+12%</b>
                  </div>
                </div>
              </div>
            </div>

            {/* Phone 2: Interactive Slots */}
            <div>
              <div className="phone">
                <div className="scr">
                  <span className="eyebrow red">Book</span>
                  <div className="disp" style={{ fontSize: '42px' }}>PICK YOUR SLOT</div>
                  {[
                    { prog: 'Bootcamp · DTP', info: '7:00 AM · Coach Farhan' },
                    { prog: 'Pilates · Stretch', info: '8:00 AM · Coach Maya' },
                    { prog: 'Recovery · Contrast', info: '6:30 PM · Private' },
                    { prog: 'Open Box · 30 min', info: 'Any time' }
                  ].map((s, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '10px',
                        border: '1px solid rgba(255, 255, 255, 0.18)',
                        borderRadius: '8px',
                        padding: '14px'
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '14px' }}>{s.prog}</div>
                        <div style={{ fontSize: '12px', color: '#A3A3A3' }}>{s.info}</div>
                      </div>
                      <span className="pill" style={{ background: '#E10600' }}>Book</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <MarqueeBanner text="BOOK ✕ TRAIN ✕ TRACK ✕ EAT ✕ SHOP ✕ " />

      {/* FIVE THINGS ONE APP INTERACTIVE TABBER */}
      <section style={{ padding: '112px 0', background: '#0A0A0A', minHeight: '1000px' }}>
        <div className="wrap">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
            <span className="eyebrow red">What's inside</span>
            <h2 className="disp h2">
              FIVE THINGS.<br />ONE APP.
            </h2>
          </div>

          <div className="tab-interactive-grid" style={{ alignItems: 'start' }}>
            {/* Feature Tabs */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {appFeatures.map(f => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setActiveTab(f.id)}
                  style={{
                    textAlign: 'left',
                    background: 'transparent',
                    borderWidth: '1px 0 0',
                    borderStyle: 'solid',
                    borderColor: 'rgba(255, 255, 255, 0.18)',
                    padding: '22px 0',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    color: activeTab === f.id ? '#FF3B30' : '#FFFFFF',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <span className="disp" style={{ fontSize: '60px' }}>{f.title}</span>
                  <span style={{ fontSize: '15px', color: activeTab === f.id ? '#FFFFFF' : '#A3A3A3', lineHeight: 1.5 }}>
                    {f.desc}
                  </span>
                </button>
              ))}
            </div>

            {/* Interactive Phone Screen reflecting selected Tab */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentFeature.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25 }}
                  className="phone"
                >
                  <div className="scr">
                    <span className="eyebrow red">{currentFeature.screen.eyebrow}</span>
                    <div className="disp" style={{ fontSize: '38px', lineHeight: 1 }}>
                      {currentFeature.screen.headline}
                    </div>
                    {currentFeature.screen.items.map((it, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          gap: '10px',
                          border: '1px solid rgba(255, 255, 255, 0.18)',
                          borderRadius: '8px',
                          padding: '14px'
                        }}
                      >
                        <div>
                          <div style={{ fontWeight: 800, fontSize: '14px' }}>{it.title}</div>
                          <div style={{ fontSize: '12px', color: '#A3A3A3' }}>{it.sub}</div>
                        </div>
                        <span className="pill" style={{ background: '#E10600' }}>Active</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* THREE TAPS BOOKING SECTION */}
      <section className="white" style={{ padding: '112px 0', background: '#FFFFFF', minHeight: '900px' }}>
        <div className="wrap">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
            <span className="eyebrow red">Three taps</span>
            <h2 className="disp h2" style={{ fontSize: 'clamp(56px, 10vw, 112px)' }}>
              BOOK A SLOT.
            </h2>
          </div>

          <div className="grid3" style={{ marginTop: '56px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div className="shot shot-lt" style={{ height: '420px' }}>
                <b>Choose Class</b>
                <span>Bootcamp, Pilates, Glutes & Abs</span>
              </div>
              <span className="num" style={{ fontSize: '56px', color: '#E10600' }}>01</span>
              <h3 style={{ margin: 0, fontSize: '22px' }}>Choose a class</h3>
              <p style={{ margin: 0, color: '#4A4A4A', lineHeight: 1.55 }}>
                Bootcamp, Pilates, Glutes & Abs, Recovery or 1:1.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div className="shot shot-lt" style={{ height: '420px' }}>
                <b>Pick Slot</b>
                <span>Real-time availability indicator</span>
              </div>
              <span className="num" style={{ fontSize: '56px', color: '#E10600' }}>02</span>
              <h3 style={{ margin: 0, fontSize: '22px' }}>Pick a slot</h3>
              <p style={{ margin: 0, color: '#4A4A4A', lineHeight: 1.55 }}>
                See the day and the coach. Tap the time.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div className="shot shot-lt" style={{ height: '420px' }}>
                <b>Confirmed</b>
                <span>Synced with WhatsApp & Calendar</span>
              </div>
              <span className="num" style={{ fontSize: '56px', color: '#E10600' }}>03</span>
              <h3 style={{ margin: 0, fontSize: '22px' }}>Done</h3>
              <p style={{ margin: 0, color: '#4A4A4A', lineHeight: 1.55 }}>
                Reminders arrive. Reschedule in a tap.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* APP VS WEB COMPARISON TABLE */}
      <section style={{ padding: '112px 0', minHeight: '620px' }}>
        <div className="wrap">
          <div className="split">
            <div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
                <span className="eyebrow red">App vs web</span>
                <h2 className="disp h2" style={{ fontSize: 'clamp(56px, 10vw, 112px)' }}>
                  WHY BOOK IN<br />THE APP?
                </h2>
              </div>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table className="price">
                <thead>
                  <tr>
                    <th></th>
                    <th>Website</th>
                    <th>App</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Book a class</td>
                    <td>Yes</td>
                    <td style={{ color: '#FF3B30', fontWeight: 800 }}>Yes, faster</td>
                  </tr>
                  <tr>
                    <td>Reminders</td>
                    <td>WhatsApp</td>
                    <td style={{ color: '#FF3B30', fontWeight: 800 }}>Push + WhatsApp</td>
                  </tr>
                  <tr>
                    <td>Training plan</td>
                    <td>No</td>
                    <td style={{ color: '#FF3B30', fontWeight: 800 }}>Yes</td>
                  </tr>
                  <tr>
                    <td>Progress tracking</td>
                    <td>No</td>
                    <td style={{ color: '#FF3B30', fontWeight: 800 }}>Yes</td>
                  </tr>
                  <tr>
                    <td>Nutrition tracking</td>
                    <td>No</td>
                    <td style={{ color: '#FF3B30', fontWeight: 800 }}>Yes</td>
                  </tr>
                  <tr>
                    <td>Home & travel workouts</td>
                    <td>No</td>
                    <td style={{ color: '#FF3B30', fontWeight: 800 }}>Yes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* RED DOWNLOAD BANNER */}
      <section id="download" style={{ background: '#E10600', padding: '100px 0' }}>
        <div className="wrap split">
          <div>
            <span className="eyebrow" style={{ color: '#ffe5e3' }}>
              1 month included with your membership
            </span>
            <h2 className="disp h2" style={{ fontSize: 'clamp(64px, 12vw, 150px)', marginTop: '16px' }}>
              GET THE APP.
            </h2>
            <p style={{ fontSize: '19px', lineHeight: 1.55, maxWidth: '480px' }}>
              Home workouts, travel workouts and extra training content, from day one.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a href="#" className="btn btn-black">App Store</a>
              <a href="#" className="btn btn-black">Google Play</a>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="shot" style={{ width: '240px', height: '240px', backgroundColor: '#0A0A0A' }}>
              <b>SCAN QR</b>
              <span>Deep link to SWEAT App</span>
            </div>
          </div>
        </div>
      </section>

      {/* DYNAMIC FAQ ACCORDION */}
      <section style={{ padding: '112px 0', background: '#0A0A0A', minHeight: '600px' }}>
        <div className="wrap">
          <div className="split" style={{ alignItems: 'start' }}>
            <div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
                <span className="eyebrow red">Questions</span>
                <h2 className="disp h2" style={{ fontSize: 'clamp(56px, 10vw, 112px)' }}>
                  ASK<br />AWAY.
                </h2>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {data.faqs.map((faq, idx) => (
                <div key={idx} style={{ borderTop: '1px solid rgba(255, 255, 255, 0.14)' }}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="faq-btn"
                  >
                    <span>{faq.question}</span>
                    <span className="disp red" style={{ fontSize: '34px' }}>
                      {openFaq === idx ? '–' : '+'}
                    </span>
                  </button>
                  {openFaq === idx && (
                    <div className="faq-ans">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STICKY BOTTOM BAR */}
      <div className="stick">
        <div className="wrap" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          minHeight: '64px',
          flexWrap: 'wrap',
          paddingTop: '8px',
          paddingBottom: '8px'
        }}>
          <span className="disp" style={{ fontSize: '24px', color: '#FFFFFF', paddingTop: '3px' }}>
            Two ways in · pick your slot
          </span>
          <span style={{ display: 'flex', gap: '10px' }}>
            <Link to="/book" className="btn btn-black" style={{ minHeight: '44px', padding: '0 18px', fontSize: '12px' }}>
              Experience SWEAT
            </Link>
            <Link to="/assessment" className="btn btn-white" style={{ minHeight: '44px', padding: '0 18px', fontSize: '12px' }}>
              Fitness assessment
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
