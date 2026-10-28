import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import contentApi from '../api/contentApi';
import SlotBookingWidget from '../components/public/SlotBookingWidget';
import TransformationSlider from '../components/public/TransformationSlider';
import MarqueeBanner from '../components/common/MarqueeBanner';
import AnimatedHeadline from '../components/common/AnimatedHeadline';

export const MembershipPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    contentApi.getPageContent('membership')
      .then(res => setData(res))
      .catch(err => console.error('Error fetching membership data:', err));
  }, []);

  const memberships = data?.memberships || [];
  const transformations = data?.transformations || [];

  return (
    <div className="sw">
      
      {/* HERO & DUAL BOOKING CARDS */}
      <section style={{ padding: '104px 0 96px', minHeight: '1200px' }}>
        <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: '56px' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <span className="eyebrow red">Membership</span>
            <AnimatedHeadline className="disp h1" style={{ fontSize: '220px', lineHeight: 0.84 }}>
              TWO WAYS<br /><span className="out">IN.</span>
            </AnimatedHeadline>
            <p style={{ margin: 0, fontSize: '21px', lineHeight: 1.55, color: '#C4C4C4', maxWidth: '660px' }}>
              Feel the studio first, or find your starting point first. Either way you choose the slot, we confirm on WhatsApp, and your membership is matched to what you want from it.
            </p>
          </div>

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

          <p style={{ margin: 0, fontSize: '16px', color: '#A3A3A3' }}>
            Want everything planned for you?{' '}
            <Link to="/elite" style={{ color: '#FF3B30', fontWeight: 800 }}>
              Join Elite membership →
            </Link>
          </p>

        </div>
      </section>

      {/* MARQUEE */}
      <MarqueeBanner text="EXPERIENCE ✕ ASSESSMENT ✕ OUTCOMES ✕ " />

      {/* 4 STEPS (WHITE CONTRAST) */}
      <section className="white" style={{ padding: '112px 0', background: '#FFFFFF', minHeight: '560px' }}>
        <div className="wrap">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
            <span className="eyebrow red">What happens next</span>
            <AnimatedHeadline className="disp h2" style={{ fontSize: '120px' }}>
              FOUR STEPS.<br />NO SURPRISES.
            </AnimatedHeadline>
            <p style={{ margin: 0, fontSize: '18px', lineHeight: 1.6, color: '#4A4A4A', maxWidth: '640px' }}>
              Your plan, your level and your investment are shared in person, matched to what you want.
            </p>
          </div>

          <div className="grid4" style={{ gap: 0, marginTop: '64px' }}>
            {[
              { num: '01', title: 'Pick your slot', desc: 'Experience the studio or book your assessment.' },
              { num: '02', title: 'Visit SWEAT HQ', desc: 'Meet the coaches and team and feel a session.' },
              { num: '03', title: 'Your roadmap', desc: 'The right program, the right level, written down.' },
              { num: '04', title: 'Your place', desc: 'Confirm your membership and book in the app.' },
            ].map((step, idx) => (
              <div key={idx} style={{ padding: '32px 28px', borderLeft: '1px solid rgba(0, 0, 0, 0.18)', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <span className="num" style={{ fontSize: '56px', color: '#E10600' }}>{step.num}</span>
                <h3 style={{ margin: 0, fontSize: '20px' }}>{step.title}</h3>
                <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.6, color: '#4A4A4A' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MEMBERSHIP TIERS PRICING TABLE */}
      {memberships && memberships.length > 0 && (
        <section style={{ padding: '112px 0', background: '#0A0A0A', borderTop: '1px solid rgba(255, 255, 255, 0.12)' }}>
          <div className="wrap">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left', marginBottom: '56px' }}>
              <span className="eyebrow red">Investment</span>
              <AnimatedHeadline className="disp h2" style={{ fontSize: '112px' }}>
                MEMBERSHIP TIERS.
              </AnimatedHeadline>
            </div>

            <div className="grid3" style={{ gap: '24px' }}>
              {memberships.map((tier, idx) => (
                <div
                  key={tier.id || idx}
                  className="tile"
                  style={{
                    padding: '36px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    border: tier.is_highlighted ? '2px solid #E10600' : '1px solid rgba(255, 255, 255, 0.14)',
                    background: tier.is_highlighted ? '#141414' : '#111111',
                  }}
                >
                  <span className="eyebrow red">{tier.billing_period || 'Monthly Plan'}</span>
                  <h3 className="disp" style={{ fontSize: '48px', margin: 0 }}>{tier.tier_name}</h3>
                  <div className="num" style={{ fontSize: '42px', color: '#FF3B30' }}>
                    {tier.price_display}
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px', flex: 1 }}>
                    {Array.isArray(tier.features_list) && tier.features_list.map((feat, i) => (
                      <div key={i} style={{ display: 'flex', gap: '10px', fontSize: '14px', color: '#D4D4D4' }}>
                        <span style={{ color: '#E10600', fontWeight: 800 }}>✓</span>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  <Link to="/book" className={`btn ${tier.is_highlighted ? 'btn-red' : 'btn-ghost'}`} style={{ width: '100%', marginTop: '16px' }}>
                    Select Plan
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TRANSFORMATIONS */}
      <section style={{ padding: '112px 0', background: '#0A0A0A', minHeight: '900px' }}>
        <div className="wrap">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
            <span className="eyebrow red">Transformations</span>
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

    </div>
  );
};

export default MembershipPage;
