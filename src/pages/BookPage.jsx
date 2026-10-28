import React, { useState } from 'react';
import bookingsApi from '../api/bookingsApi';
import AnimatedHeadline from '../components/common/AnimatedHeadline';

export const BookPage = () => {
  const [startType, setStartType] = useState('Experience SWEAT');
  const [goal, setGoal] = useState('Lose weight');
  const [day, setDay] = useState('Today');
  const [time, setTime] = useState('7:00 AM');
  const [fullName, setFullName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);

  const goals = ['Lose weight', 'Get strong', 'Start my journey', 'Move without pain', 'Look and feel my best'];
  const days = ['Today', 'Tomorrow', 'Sat', 'Sun', 'Mon'];
  const times = ['6:00 AM', '7:00 AM', '9:00 AM', '12:00 PM', '6:00 PM', '7:30 PM'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullName || !whatsapp) {
      setStatusMsg({ type: 'error', text: 'Please enter your name and WhatsApp number.' });
      return;
    }

    setLoading(true);
    setStatusMsg(null);

    try {
      await bookingsApi.submitBooking({
        full_name: fullName,
        whatsapp_number: whatsapp,
        lead_type: startType === 'Experience SWEAT' ? 'experience' : 'assessment',
        selected_day: day,
        selected_time: time,
        preferred_program: goal,
        notes: email ? `Email: ${email}` : '',
      });

      setStatusMsg({
        type: 'success',
        text: `Booking requested for ${startType} on ${day} at ${time}. We will message you on WhatsApp shortly!`
      });
      setFullName('');
      setWhatsapp('');
      setEmail('');
    } catch (err) {
      setStatusMsg({
        type: 'error',
        text: 'Failed to record booking. Please try again or WhatsApp us directly.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sw">
      <section style={{ padding: '104px 0 112px', minHeight: '1200px' }}>
        <div className="wrap split" style={{ alignItems: 'start' }}>
          
          {/* LEFT COLUMN: GUIDELINES & STEPS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <span className="eyebrow red">Book your slot</span>
            
            <AnimatedHeadline className="disp h1" style={{ fontSize: '200px', lineHeight: 0.84 }}>
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

            <div className="shot" style={{ height: '360px', marginTop: '24px' }}>
              <b>Studio walk-through still</b>
              <span>The floor at golden hour</span>
            </div>
          </div>

          {/* RIGHT COLUMN: BOOKING INTERACTIVE FORM */}
          <div className="tile" style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '28px', background: '#111111' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              
              {/* How to start */}
              <div>
                <span className="eyebrow mut">How do you want to start?</span>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '12px' }}>
                  {['Experience SWEAT', 'Fitness assessment'].map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setStartType(st)}
                      className="chip"
                      style={{
                        minHeight: '56px',
                        padding: '0 24px',
                        fontSize: '15px',
                        background: startType === st ? '#E10600' : 'transparent',
                        borderColor: startType === st ? '#E10600' : 'rgba(255, 255, 255, 0.28)',
                        color: '#FFFFFF',
                      }}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Your Goal */}
              <div>
                <span className="eyebrow mut">Your goal</span>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '12px' }}>
                  {goals.map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGoal(g)}
                      className="chip"
                      style={{
                        background: goal === g ? '#E10600' : 'transparent',
                        borderColor: goal === g ? '#E10600' : 'rgba(255, 255, 255, 0.28)',
                        color: '#FFFFFF',
                      }}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pick a day */}
              <div>
                <span className="eyebrow mut">Pick a day</span>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '12px' }}>
                  {days.map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setDay(d)}
                      className="chip"
                      style={{
                        background: day === d ? '#E10600' : 'transparent',
                        borderColor: day === d ? '#E10600' : 'rgba(255, 255, 255, 0.28)',
                        color: '#FFFFFF',
                      }}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pick a time */}
              <div>
                <span className="eyebrow mut">Pick a time</span>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '12px' }}>
                  {times.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTime(t)}
                      className="slot"
                      style={{
                        background: time === t ? '#E10600' : '#141414',
                        borderColor: time === t ? '#E10600' : 'rgba(255, 255, 255, 0.2)',
                        color: '#FFFFFF',
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Full Name */}
              <div className="field">
                <label htmlFor="fullName">Full name</label>
                <input
                  id="fullName"
                  type="text"
                  placeholder="Your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>

              {/* WhatsApp & Email Grid */}
              <div className="grid2" style={{ gap: '16px' }}>
                <div className="field">
                  <label htmlFor="whatsapp">WhatsApp</label>
                  <input
                    id="whatsapp"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    required
                  />
                </div>
                <div className="field">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {statusMsg && (
                <div
                  style={{
                    padding: '14px 18px',
                    borderRadius: '4px',
                    fontSize: '14px',
                    background: statusMsg.type === 'success' ? 'rgba(52, 199, 89, 0.2)' : 'rgba(255, 59, 48, 0.2)',
                    border: `1px solid ${statusMsg.type === 'success' ? '#34C759' : '#FF3B30'}`,
                    color: '#FFFFFF',
                  }}
                >
                  {statusMsg.text}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn btn-red"
                style={{ minHeight: '64px', fontSize: '16px', width: '100%' }}
              >
                {loading ? 'Submitting...' : 'Book my slot'}
              </button>

              <p style={{ margin: 0, fontSize: '12px', color: '#8A8A8A', textAlign: 'center' }}>
                We confirm your slot on WhatsApp within the hour.
              </p>
            </form>
          </div>

        </div>
      </section>
    </div>
  );
};

export default BookPage;
