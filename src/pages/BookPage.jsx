import React, { useState } from 'react';
import AnimatedHeadline from '../components/common/AnimatedHeadline';
import FoundingPassForm from '../components/public/FoundingPassForm';
import AdaptiveMedia from '../components/common/AdaptiveMedia';

export const BookPage = () => {
  return (
    <div className="sw">
      <section className="hero-section" style={{ padding: '104px 0 112px' }}>
        <div className="wrap split" style={{ alignItems: 'start' }}>
          
          {/* LEFT COLUMN: GUIDELINES & STEPS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <span className="eyebrow red">Book your slot</span>
            
            <AnimatedHeadline className="disp h1">
              SEE IT.<br />
              <span className="out">FEEL IT.</span><br />
              DECIDE.
            </AnimatedHeadline>

            <p style={{ margin: 0, fontSize: '21px', lineHeight: 1.55, color: '#C4C4C4', maxWidth: '520px' }}>
              Two ways in. Experience the studio, or get your fitness assessment done. Pick the slot that suits you and we will confirm on WhatsApp.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginTop: '8px' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <span className="stepnum">1</span>
                <span style={{ fontSize: '17px', fontWeight: 600 }}>Choose how you want to start</span>
              </div>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <span className="stepnum">2</span>
                <span style={{ fontSize: '17px', fontWeight: 600 }}>Pick a day and a time</span>
              </div>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <span className="stepnum">3</span>
                <span style={{ fontSize: '17px', fontWeight: 600 }}>Visit SWEAT HQ, Andheri</span>
              </div>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <span className="stepnum">4</span>
                <span style={{ fontSize: '17px', fontWeight: 600 }}>Meet the coaches and team</span>
              </div>
            </div>

            <div className="shot" style={{ height: '360px', marginTop: '24px', padding: 0, overflow: 'hidden', position: 'relative' }}>
              <AdaptiveMedia
                src="/media/uploads/2026/11/Remo_Dsouza.mp4"
                alt="Studio walk-through"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                fallback={
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '24px' }}>
                    <b>Studio walk-through still</b>
                    <span>The floor at golden hour</span>
                  </div>
                }
              />
            </div>
          </div>

          {/* RIGHT COLUMN: HIGH-CONVERTING FOUNDING PASS FORM */}
          <div>
            <FoundingPassForm
              theme="red"
              leadType="experience"
              title="CLAIM YOUR EXCLUSIVE FOUNDING PASS"
              eyebrow="LIMITED FOUNDING MEMBER ACCESS"
              subheadline="First 50 signups unlock lifetime founding privileges, VIP trial access, and bespoke coaching onboarding."
              buttonText="RESERVE FOUNDING PRIVILEGES →"
            />
          </div>

        </div>
      </section>
    </div>
  );
};

export default BookPage;
