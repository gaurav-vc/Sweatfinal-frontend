import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Phone, Send, CheckCircle2 } from 'lucide-react';
import contentApi from '../api/contentApi';
import bookingsApi from '../api/bookingsApi';

export default function VisitPage() {
  const [data, setData] = useState({
    hero: null,
    programs: []
  });
  const [loading, setLoading] = useState(true);

  // Contact / Question form
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    async function loadVisitData() {
      try {
        setLoading(true);
        const res = await contentApi.getPageContent('visit');
        setData({
          hero: res.hero || null,
          programs: res.programs || []
        });
      } catch (err) {
        console.error('Failed to load visit data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadVisitData();
  }, []);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');
    try {
      await bookingsApi.submitLead({
        full_name: formData.fullName,
        phone: formData.phone,
        lead_type: 'EXPERIENCE',
        notes: `Question from Visit Page: ${formData.message}`
      });
      setSubmitted(true);
    } catch (err) {
      setSubmitError('Unable to send your inquiry. Please try again or message via WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="sw">
      {/* HERO SECTION */}
      <section style={{
        position: 'relative',
        overflow: 'hidden',
        padding: '120px 0 88px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
        minHeight: '820px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end'
      }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          {data.hero?.video_url ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              src={data.hero.video_url}
            />
          ) : (
            <div className="shot" style={{ width: '100%', height: '100%', border: 0 }}>
              <b>FILM · Hero · exterior at dusk</b>
              <span>Entrance, red signage, glass, one figure · 4:5 · looping, muted, behind the title</span>
            </div>
          )}
        </div>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, rgba(10, 10, 10, 0.92) 0%, rgba(10, 10, 10, 0.6) 55%, rgba(10, 10, 10, 0.25) 100%)'
        }} />
        <div style={{
          position: 'absolute',
          inset: 'auto 0 0',
          height: '240px',
          background: 'linear-gradient(rgba(10, 10, 10, 0), rgba(10, 10, 10, 0.95))'
        }} />

        <div className="wrap" style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="eyebrow red"
          >
            {data.hero?.eyebrow || 'Visit'}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="disp h1"
            style={{ fontSize: 'clamp(80px, 16vw, 230px)', lineHeight: 0.84 }}
          >
            {data.hero?.headline || 'COME IN.'}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{ margin: 0, fontSize: '21px', lineHeight: 1.55, color: '#e5e5e5', maxWidth: '560px' }}
          >
            {data.hero?.subheadline || "Andheri's new home for training, Pilates, Recovery and everything in between."}
          </motion.p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link to="/book" className="btn btn-red" style={{ minHeight: '64px', padding: '0 34px' }}>
              Experience SWEAT
            </Link>
            <Link to="/assessment" className="btn btn-ghost" style={{ minHeight: '64px', padding: '0 30px' }}>
              Fitness assessment
            </Link>
          </div>
        </div>
      </section>

      {/* LOCATION & HOURS SECTION */}
      <section style={{ padding: '104px 0', minHeight: '750px' }}>
        <div className="wrap">
          <div className="split" style={{ alignItems: 'start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
                <span className="eyebrow red">SWEAT HQ · Andheri</span>
                <h2 className="disp h2" style={{ fontSize: 'clamp(56px, 10vw, 112px)' }}>
                  FIND US.
                </h2>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '24px 0', borderTop: '1px solid rgba(255, 255, 255, 0.18)' }}>
                  <div className="eyebrow mut">Address</div>
                  <div style={{ fontSize: '20px', fontWeight: 700, marginTop: '8px' }}>
                    Plot 48, Link Road, Next to Lotus Grandeur, Andheri West, Mumbai 400053
                  </div>
                </div>
                <div style={{ padding: '24px 0', borderTop: '1px solid rgba(255, 255, 255, 0.18)' }}>
                  <div className="eyebrow mut">Hours</div>
                  <div style={{ fontSize: '20px', fontWeight: 700, marginTop: '8px' }}>
                    MON–SAT: 6:00 AM – 10:00 PM · SUN: 7:00 AM – 8:00 PM
                  </div>
                </div>
                <div style={{ padding: '24px 0', borderTop: '1px solid rgba(255, 255, 255, 0.18)', borderBottom: '1px solid rgba(255, 255, 255, 0.18)' }}>
                  <div className="eyebrow mut">Reach us</div>
                  <div style={{ fontSize: '20px', fontWeight: 700, marginTop: '8px' }}>
                    +91 98200 98200 · hello@sweathq.com
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-red"
                >
                  Get directions
                </a>
                <a
                  href="https://wa.me/919820098200?text=Hi%20SWEAT%20HQ%2C%20I%20would%20like%20to%20visit."
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-ghost"
                >
                  WhatsApp us
                </a>
              </div>
            </div>

            <div className="shot" style={{ height: '640px' }}>
              <iframe
                title="SWEAT HQ Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.5884976766487!2d72.82765637599026!3d19.12570894982637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b620b784e1b5%3A0x600b52668e1a17fa!2sAndheri%20West%2C%20Mumbai!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                allowFullScreen=""
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FOUR SPACES WHITE SECTION */}
      <section className="white" style={{ padding: '112px 0', background: '#FFFFFF', minHeight: '800px' }}>
        <div className="wrap">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
            <span className="eyebrow red">Inside</span>
            <h2 className="disp h2" style={{ fontSize: 'clamp(56px, 10vw, 112px)' }}>
              FOUR SPACES.<br />ONE ADDRESS.
            </h2>
          </div>

          <div className="grid4" style={{ marginTop: '56px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="shot shot-lt" style={{ height: '360px' }}>
                <b>Bootcamp floor</b>
              </div>
              <h3 className="disp" style={{ fontSize: '44px' }}>Bootcamp floor</h3>
              <p style={{ margin: 0, color: '#4A4A4A', lineHeight: 1.55 }}>
                Rig, barbells, rower, AirBike, SkiErg, curved runners.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="shot shot-lt" style={{ height: '360px' }}>
                <b>Pilates studio</b>
              </div>
              <h3 className="disp" style={{ fontSize: '44px' }}>Pilates studio</h3>
              <p style={{ margin: 0, color: '#4A4A4A', lineHeight: 1.55 }}>
                Eight reformers, TRX and Viper.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="shot shot-lt" style={{ height: '360px' }}>
                <b>Recovery suite</b>
              </div>
              <h3 className="disp" style={{ fontSize: '44px' }}>Recovery suite</h3>
              <p style={{ margin: 0, color: '#4A4A4A', lineHeight: 1.55 }}>
                Cold plunge and infrared sauna.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="shot shot-lt" style={{ height: '360px' }}>
                <b>Open Box</b>
              </div>
              <h3 className="disp" style={{ fontSize: '44px' }}>Open Box</h3>
              <p style={{ margin: 0, color: '#4A4A4A', lineHeight: 1.55 }}>
                Train independently for 15 to 50 minutes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT TO EXPECT SECTION */}
      <section style={{ padding: '104px 0', minHeight: '520px' }}>
        <div className="wrap">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
            <span className="eyebrow red">Your first visit</span>
            <h2 className="disp h2" style={{ fontSize: 'clamp(56px, 10vw, 112px)' }}>
              WHAT TO EXPECT.
            </h2>
          </div>

          <div className="grid4" style={{ marginTop: '56px', gap: 0 }}>
            {[
              { num: '01', title: 'Arrive 10 minutes early', desc: 'Check in and meet your coach.' },
              { num: '02', title: 'Orientation', desc: 'A short walk-through of the equipment.' },
              { num: '03', title: 'Train', desc: 'Your session, coached.' },
              { num: '04', title: 'Debrief', desc: 'Assessment, roadmap and next steps.' }
            ].map((step, idx) => (
              <div
                key={idx}
                style={{
                  padding: '32px 28px',
                  borderLeft: '1px solid rgba(255, 255, 255, 0.18)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px'
                }}
              >
                <span className="num" style={{ fontSize: '56px', color: '#FF3B30' }}>{step.num}</span>
                <h3 style={{ margin: 0, fontSize: '20px' }}>{step.title}</h3>
                <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.6, color: '#A3A3A3' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REAL-TIME CONTACT FORM SECTION */}
      <section className="white" style={{ padding: '112px 0', background: '#FFFFFF', minHeight: '760px' }}>
        <div className="wrap">
          <div className="split" style={{ alignItems: 'start' }}>
            <div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
                <span className="eyebrow red">Say hello</span>
                <h2 className="disp h2" style={{ fontSize: 'clamp(56px, 10vw, 112px)' }}>
                  QUESTIONS?
                </h2>
                <p style={{ margin: 0, fontSize: '18px', lineHeight: 1.6, color: '#4A4A4A', maxWidth: '640px' }}>
                  Ask us anything about programs, plans or your first visit.
                </p>
              </div>
              <p style={{ margin: '32px 0 0', color: '#4A4A4A' }}>
                Also at Goregaon and Malad.
              </p>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="tile"
                style={{ padding: '36px', background: '#F5F5F5', borderColor: 'rgba(0,0,0,0.1)' }}
              >
                <CheckCircle2 size={48} color="#E10600" />
                <h3 className="disp" style={{ fontSize: '64px', marginTop: '16px', color: '#0A0A0A' }}>
                  THANK YOU.
                </h3>
                <p style={{ color: '#4A4A4A', lineHeight: 1.6 }}>
                  We will message you on WhatsApp shortly.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setFormData({ fullName: '', phone: '', message: '' }); }}
                  className="btn btn-ghost"
                  style={{ marginTop: '20px', color: '#0A0A0A', borderColor: 'rgba(0,0,0,0.2)' }}
                >
                  Send another inquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {submitError && (
                  <div style={{ padding: '12px', background: '#FEE2E2', color: '#B91C1C', borderRadius: '4px', fontSize: '14px' }}>
                    {submitError}
                  </div>
                )}
                <div className="field">
                  <label htmlFor="name" style={{ color: '#4A4A4A' }}>Name</label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    style={{ background: '#F5F5F5', color: '#0A0A0A', borderColor: 'rgba(0, 0, 0, 0.2)' }}
                  />
                </div>
                <div className="field">
                  <label htmlFor="phone" style={{ color: '#4A4A4A' }}>WhatsApp number</label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    placeholder="+91"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{ background: '#F5F5F5', color: '#0A0A0A', borderColor: 'rgba(0, 0, 0, 0.2)' }}
                  />
                </div>
                <div className="field">
                  <label htmlFor="msg" style={{ color: '#4A4A4A' }}>Message</label>
                  <textarea
                    id="msg"
                    rows="4"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{ background: '#F5F5F5', color: '#0A0A0A', borderColor: 'rgba(0, 0, 0, 0.2)' }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-red"
                  style={{ opacity: submitting ? 0.7 : 1 }}
                >
                  {submitting ? 'Sending...' : 'Send message'}
                </button>
              </form>
            )}
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
