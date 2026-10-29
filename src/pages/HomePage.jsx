import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import contentApi from '../api/contentApi';
import PanAccordion from '../components/public/PanAccordion';
import CelebrityReelGrid from '../components/public/CelebrityReelGrid';
import TransformationSlider from '../components/public/TransformationSlider';
import SlotBookingWidget from '../components/public/SlotBookingWidget';
import MarqueeBanner from '../components/common/MarqueeBanner';
import AnimatedHeadline from '../components/common/AnimatedHeadline';
import { resolveMediaUrl } from '../utils/mediaUrl';
import { trackEvent } from '../services/pixelService';

export const HomePage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await contentApi.getPageContent('home');
        setData(res);
      } catch (err) {
        console.error('Failed to load live home data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const hero = data?.hero || {};
  const heroVideo = resolveMediaUrl(hero.video_url || hero.video_file);
  const heroImage = resolveMediaUrl(hero.background_image || hero.fallback_image);
  const programs = data?.programs || [];
  const celebrities = data?.celebrities || [];
  const transformations = data?.transformations || [];
  const faqs = data?.faqs || [];

  return (
    <div className="sw">
      
      {/* 1. HERO SECTION */}
      <section style={{ position: 'relative', minHeight: '980px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', borderBottom: '1px solid rgba(255, 255, 255, 0.12)', overflow: 'hidden' }}>
        
        {/* Background Hero Media */}
        <div style={{ position: 'absolute', inset: 0 }}>
          {heroVideo ? (
            <video
              src={heroVideo}
              autoPlay
              loop
              muted
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
            />
          ) : heroImage ? (
            <img
              src={heroImage}
              alt="SWEAT HQ Hero"
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
            />
          ) : (
            <div className="shot" style={{ width: '100%', height: '100%', border: 0, opacity: 0.9 }}>
              <b>HERO FILM · full-bleed, looping, muted</b>
              <span>Praveen coaching a star on the floor · slow-motion barbell, flash of camera, chalk · graded black, red only on signage</span>
            </div>
          )}
        </div>

        {/* Ambient Gradient Overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(rgba(10, 10, 10, 0.55) 0%, rgba(10, 10, 10, 0) 30%, rgba(10, 10, 10, 0.94) 100%)' }} />

        {/* Hero Content Container */}
        <div className="wrap" style={{ position: 'relative', paddingTop: '120px', paddingBottom: '64px', display: 'flex', flexDirection: 'column', gap: '36px' }}>
          
          {/* Eyebrow with pulsating red dot */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#E10600', boxShadow: '0 0 0 6px rgba(225, 6, 0, 0.22)' }} />
            <span className="eyebrow red">
              {hero.eyebrow || "SWEAT HQ · Andheri · Entry by assessment"}
            </span>
          </div>

          {/* Master Headline */}
          <AnimatedHeadline className="disp h1">
            WHERE THE<br />
            STARS TRAIN.<br />
            <span className="out">NOW IT'S YOU.</span>
          </AnimatedHeadline>

          {/* Badges */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <span className="pill" style={{ background: '#E10600', fontSize: '13px', padding: '8px 16px' }}>
              They trained the stars
            </span>
            <span className="pill" style={{ background: 'rgba(255, 255, 255, 0.16)', fontSize: '13px', padding: '8px 16px' }}>
              Entry by assessment
            </span>
            <span className="pill" style={{ background: 'rgba(255, 255, 255, 0.16)', fontSize: '13px', padding: '8px 16px' }}>
              Slots open now
            </span>
          </div>

          {/* Bottom Bar: Subhead & CTAs */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '32px', flexWrap: 'wrap' }}>
            <p style={{ margin: 0, maxWidth: '600px', fontSize: '22px', lineHeight: 1.5, color: '#F2F2F2' }}>
              {hero.subheading || "The coaches and team behind Bollywood's best-known bodies are now coaching Andheri. Stronger, leaner and surer of yourself, with the same system the stars trust."}
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link
                to="/book"
                onClick={() => trackEvent('InitiateCheckout', { location: 'home_hero', button: hero.cta_primary_text || "Experience SWEAT" })}
                className="btn btn-red"
                style={{ minHeight: '64px', padding: '0 36px' }}
              >
                {hero.cta_primary_text || "Experience SWEAT"}
              </Link>
              <Link
                to="/assessment"
                onClick={() => trackEvent('Schedule', { location: 'home_hero', button: hero.cta_secondary_text || "Book a fitness assessment" })}
                className="btn btn-ghost"
                style={{ minHeight: '64px', padding: '0 32px' }}
              >
                {hero.cta_secondary_text || "Book a fitness assessment"}
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 2. STATS BAR */}
      <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.12)' }}>
        <div className="wrap hero-stats-grid" style={{ paddingTop: '36px', paddingBottom: '36px' }}>
          <div>
            <div className="num" style={{ fontSize: '72px' }}>5</div>
            <div className="eyebrow mut">Of Bollywood's names coached by the SWEAT team</div>
          </div>
          <div>
            <div className="num" style={{ fontSize: '72px' }}>4+4</div>
            <div className="eyebrow mut">Bootcamp classes and Pilates levels</div>
          </div>
          <div>
            <div className="num" style={{ fontSize: '72px' }}>2–3</div>
            <div className="eyebrow mut">Coaches on every floor</div>
          </div>
          <div>
            <div className="num" style={{ fontSize: '72px' }}>
              15 <span className="red">DAYS</span>
            </div>
            <div className="eyebrow mut">Between reassessments</div>
          </div>
        </div>
      </div>

      {/* 3. INFINITE MARQUEE */}
      <MarqueeBanner />

      {/* 4. PHILOSOPHY SECTION (INVERTED WHITE CONTRAST) */}
      <section className="white" style={{ padding: '120px 0', background: '#FFFFFF', minHeight: '720px' }}>
        <div className="wrap">
          <div className="split" style={{ alignItems: 'start' }}>
            
            <AnimatedHeadline className="disp h2">
              THIS IS NOT<br />
              A GYM.<br />
              <span className="out-dk">IT'S WHERE<br />YOU BECOME.</span>
            </AnimatedHeadline>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '36px', paddingTop: '12px' }}>
              <p style={{ margin: 0, fontSize: '22px', lineHeight: 1.55, color: '#2A2A2A' }}>
                Most places hand you a timetable and wish you luck. SWEAT starts with you: what you want, what has stopped you, and what your body can do today. Then we build the path and walk it with you.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', gap: '20px', padding: '22px 0', borderTop: '1px solid rgba(0, 0, 0, 0.14)' }}>
                  <span className="num" style={{ fontSize: '40px', color: '#E10600' }}>01</span>
                  <div>
                    <h3 style={{ margin: '0 0 6px', fontSize: '20px' }}>We start with the outcome.</h3>
                    <p style={{ margin: 0, color: '#4A4A4A', lineHeight: 1.55 }}>Fat loss, strength, posture, confidence. Tell us what you want, and every decision follows from it.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '20px', padding: '22px 0', borderTop: '1px solid rgba(0, 0, 0, 0.14)' }}>
                  <span className="num" style={{ fontSize: '40px', color: '#E10600' }}>02</span>
                  <div>
                    <h3 style={{ margin: '0 0 6px', fontSize: '20px' }}>We place you. We do not just sign you up.</h3>
                    <p style={{ margin: 0, color: '#4A4A4A', lineHeight: 1.55 }}>Four Bootcamp classes and four Pilates levels, each for a different person and a different goal.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '20px', padding: '22px 0', borderTop: '1px solid rgba(0, 0, 0, 0.14)', borderBottom: '1px solid rgba(0, 0, 0, 0.14)' }}>
                  <span className="num" style={{ fontSize: '40px', color: '#E10600' }}>03</span>
                  <div>
                    <h3 style={{ margin: '0 0 6px', fontSize: '20px' }}>Two coaches. Every class.</h3>
                    <p style={{ margin: 0, color: '#4A4A4A', lineHeight: 1.55 }}>One leads the room. One corrects you. Nobody trains unseen.</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 5. SEVEN WAYS IN (PROGRAMS ACCORDION) */}
      <section id="programs" style={{ padding: '120px 0', background: '#0A0A0A', minHeight: '1000px' }}>
        <div className="wrap">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
            <span className="eyebrow red">Seven ways in</span>
            <AnimatedHeadline className="disp h2">
              PICK THE<br />OUTCOME.
            </AnimatedHeadline>
            <p style={{ margin: 0, fontSize: '18px', lineHeight: 1.6, color: '#A3A3A3', maxWidth: '640px' }}>
              Every program starts with an assessment, and every one is matched to your level and your goal.
            </p>
          </div>

          <PanAccordion programs={programs} />
        </div>
      </section>

      {/* 6. CELEBRITY REELS & TESTIMONIALS */}
      <section style={{ background: '#0A0A0A', padding: '112px 0', borderTop: '1px solid rgba(255, 255, 255, 0.12)', overflow: 'hidden' }}>
        <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: '56px' }}>
          
          <div className="split" style={{ alignItems: 'end' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <span className="eyebrow red">The stars · in their own words</span>
              <AnimatedHeadline className="disp h2" style={{ fontSize: '132px' }}>
                THEY COACHED<br />THEM. NOW<br />THEY COACH <span className="out">YOU.</span>
              </AnimatedHeadline>
            </div>
            <p style={{ margin: 0, fontSize: '20px', lineHeight: 1.6, color: '#C4C4C4', maxWidth: '520px' }}>
              The coaches and team at SWEAT have trained some of Bollywood's best-known names. The same eye, the same standard and the same system now coach every member at SWEAT HQ.
            </p>
          </div>

          <CelebrityReelGrid celebrities={celebrities} />

          <p style={{ margin: 0, fontSize: '13px', color: '#8A8A8A' }}>
            Videos, names and likenesses to be used only as cleared by SWEAT and each person.
          </p>
        </div>
      </section>

      {/* 7. REASONS TILES GRID */}
      <section style={{ padding: '112px 0', background: '#0A0A0A', minHeight: '850px' }}>
        <div className="wrap">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
            <span className="eyebrow red">Start with your reason</span>
            <AnimatedHeadline className="disp h2" style={{ fontSize: '120px' }}>
              WHAT DO<br />YOU WANT?
            </AnimatedHeadline>
            <p style={{ margin: 0, fontSize: '18px', lineHeight: 1.6, color: '#A3A3A3', maxWidth: '640px' }}>
              There is no wrong answer. Pick the one closest to yours and we will show you the way.
            </p>
          </div>

          <div className="grid3" style={{ marginTop: '64px' }}>
            {[
              { num: '01', title: 'I want to lose weight.', desc: 'A plan with real measurements, strength work that changes composition and nutrition that fits your life.', link: '/programs/bootcamp' },
              { num: '02', title: 'I want to start my fitness journey.', desc: 'Begin in Pilates Stretch or Bootcamp Foundation, with coaches who meet you where you are.', link: '/programs/pilates' },
              { num: '03', title: 'I want to get strong.', desc: 'Olympic lifting and strength coaching, built on technique, progressed by earned capability.', link: '/programs/bootcamp' },
              { num: '04', title: 'I want to move without pain.', desc: 'Rehab and Stretch Pilates for posture, backs and a gentle, confident return.', link: '/programs/pilates' },
              { num: '05', title: 'I want to look and feel like a star.', desc: 'The coaching, the standard and the system used on some of Bollywood\'s best-known names.', link: '/elite' },
              { num: '06', title: 'I want it all handled.', desc: 'Sweat Elite plans the whole week: training, recovery and nutrition under one membership.', link: '/elite' },
            ].map((reason, idx) => (
              <Link key={idx} to={reason.link} className="tile" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '14px', minHeight: '240px', color: '#FFFFFF' }}>
                <span className="num red" style={{ fontSize: '44px' }}>{reason.num}</span>
                <h3 style={{ margin: 0, fontSize: '26px', lineHeight: 1.2 }}>{reason.title}</h3>
                <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.6, color: '#A3A3A3' }}>{reason.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 8. PLACEMENT SYSTEM (WHITE CONTRAST) */}
      <section className="white" style={{ padding: '112px 0', background: '#FFFFFF', minHeight: '700px' }}>
        <div className="wrap">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
            <span className="eyebrow red">How we choose</span>
            <AnimatedHeadline className="disp h2" style={{ fontSize: '120px' }}>
              WE DON'T TAKE<br />EVERYONE.<br />
              <span className="out-dk">WE PLACE YOU.</span>
            </AnimatedHeadline>
            <p style={{ margin: 0, fontSize: '18px', lineHeight: 1.6, color: '#4A4A4A', maxWidth: '640px' }}>
              SWEAT is not a gym you sign up for and drift away from. It is a place you are matched to, so the work you do actually gets you somewhere.
            </p>
          </div>

          <div className="grid3" style={{ gap: 0, marginTop: '64px' }}>
            <div style={{ padding: '36px 30px', borderLeft: '1px solid rgba(0, 0, 0, 0.16)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <span className="num red" style={{ fontSize: '64px' }}>01</span>
              <h3 style={{ margin: 0, fontSize: '26px', lineHeight: 1.2 }}>Assessed first.</h3>
              <p style={{ margin: 0, fontSize: '16px', lineHeight: 1.6, color: '#4A4A4A' }}>Before we offer you a place, we assess how you move, what you want and what is in the way.</p>
            </div>
            <div style={{ padding: '36px 30px', borderLeft: '1px solid rgba(0, 0, 0, 0.16)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <span className="num red" style={{ fontSize: '64px' }}>02</span>
              <h3 style={{ margin: 0, fontSize: '26px', lineHeight: 1.2 }}>Placed, not just signed up.</h3>
              <p style={{ margin: 0, fontSize: '16px', lineHeight: 1.6, color: '#4A4A4A' }}>Four Bootcamp classes. Four Pilates levels. Every body gets the room that is right for its goal.</p>
            </div>
            <div style={{ padding: '36px 30px', borderLeft: '1px solid rgba(0, 0, 0, 0.16)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <span className="num red" style={{ fontSize: '64px' }}>03</span>
              <h3 style={{ margin: 0, fontSize: '26px', lineHeight: 1.2 }}>Small rooms, capped classes.</h3>
              <p style={{ margin: 0, fontSize: '16px', lineHeight: 1.6, color: '#4A4A4A' }}>Two to three coaches on the floor. Eight reformers in the room. We would rather turn people away than crowd the floor.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. 6-STEP JOURNEY */}
      <section style={{ padding: '112px 0', background: '#0A0A0A', minHeight: '600px' }}>
        <div className="wrap">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
            <span className="eyebrow red">The SWEAT journey</span>
            <AnimatedHeadline className="disp h2" style={{ fontSize: '112px' }}>
              ASSESS. PLAN.<br />TRAIN. TRACK.
            </AnimatedHeadline>
            <p style={{ margin: 0, fontSize: '18px', lineHeight: 1.6, color: '#A3A3A3', maxWidth: '640px' }}>
              Six steps. You never wonder what to do next.
            </p>
          </div>

          <div className="grid5" style={{ gridTemplateColumns: 'repeat(6, minmax(0, 1fr))', gap: 0, marginTop: '64px' }}>
            {[
              { num: '01', title: 'Experience SWEAT', desc: 'Walk in, see the floor, meet the coaches, feel a session.' },
              { num: '02', title: 'Fitness assessment', desc: 'Cardio, endurance, mobility, goals. We find your starting point.' },
              { num: '03', title: 'Your roadmap', desc: 'The right program, the right level, written down.' },
              { num: '04', title: 'Nutrition consult', desc: 'What to eat and why, with a SWEAT nutritionist.' },
              { num: '05', title: 'Train and track', desc: 'Every session logged in the app.' },
              { num: '06', title: 'Reassess every 15 days', desc: 'Numbers move. The plan moves with them.' },
            ].map((st, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: '28px 24px', borderLeft: '1px solid rgba(255, 255, 255, 0.18)' }}>
                <span className="num red" style={{ fontSize: '56px' }}>{st.num}</span>
                <h3 style={{ margin: 0, fontSize: '19px', lineHeight: 1.25 }}>{st.title}</h3>
                <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.55, color: '#A3A3A3' }}>{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. TRANSFORMATIONS */}
      <section style={{ padding: '112px 0', background: '#0A0A0A', minHeight: '900px' }}>
        <div className="wrap">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
            <span className="eyebrow red">Transformations</span>
            <AnimatedHeadline className="disp h2" style={{ fontSize: '120px' }}>
              THE FLOOR<br />DOESN'T <span className="out">LIE.</span>
            </AnimatedHeadline>
            <p style={{ margin: 0, fontSize: '18px', lineHeight: 1.6, color: '#A3A3A3', maxWidth: '640px' }}>
              Same pose, same light. Every result is logged, measured and reassessed every 15 days.
            </p>
          </div>

          <TransformationSlider transformations={transformations} />
        </div>
      </section>

      {/* 11. FAQ ACCORDION */}
      {faqs && faqs.length > 0 && (
        <section style={{ padding: '112px 0', background: '#0A0A0A', borderTop: '1px solid rgba(255, 255, 255, 0.12)' }}>
          <div className="wrap" style={{ maxWidth: '960px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left', marginBottom: '48px' }}>
              <span className="eyebrow red">Questions</span>
              <AnimatedHeadline className="disp h2" style={{ fontSize: '96px' }}>
                CLEAR ANSWERS.
              </AnimatedHeadline>
            </div>

            <div>
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div key={index}>
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="faq-btn"
                      aria-expanded={isOpen}
                    >
                      <span>{faq.question}</span>
                      <span style={{ fontSize: '24px', color: '#E10600' }}>{isOpen ? '−' : '+'}</span>
                    </button>
                    {isOpen && (
                      <div className="faq-ans">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 12. MEMBERSHIP BOOKING WIDGET SECTION */}
      <section id="book" style={{ padding: '104px 0 120px', background: '#0A0A0A', borderTop: '1px solid rgba(255, 255, 255, 0.12)' }}>
        <div className="wrap">
          <div className="grid2" style={{ gap: '24px', alignItems: 'stretch' }}>
            <SlotBookingWidget
              leadType="experience"
              theme="red"
              title="EXPERIENCE SWEAT."
              eyebrow="See it, feel it"
              description="Walk in, see the floor, meet the coaches and team, and feel a session. No pressure, no pitch."
              buttonText="Book your visit"
            />
            <SlotBookingWidget
              leadType="assessment"
              theme="dark"
              title="FITNESS ASSESSMENT."
              eyebrow="Know your starting point"
              description="Cardio, strength, mobility and goals, measured and turned into a roadmap and the class or level that fits you."
              buttonText="Book your assessment"
            />
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
