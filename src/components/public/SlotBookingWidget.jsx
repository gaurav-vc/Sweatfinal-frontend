import React, { useState } from 'react';
import bookingsApi from '../../api/bookingsApi';
import { trackEvent } from '../../services/pixelService';

export const SlotBookingWidget = ({
  leadType = 'experience',
  theme = 'red', // 'red' or 'dark'
  title = "EXPERIENCE SWEAT.",
  eyebrow = "See it, feel it",
  description = "Walk in, see the floor, meet the coaches and team, and feel a session. No pressure, no pitch.",
  buttonText = "Book your visit"
}) => {
  const [selectedDay, setSelectedDay] = useState('Today');
  const [selectedTime, setSelectedTime] = useState('7:00 AM');
  const [fullName, setFullName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const days = ['Today', 'Tomorrow', 'Sat', 'Sun', 'Mon'];
  const times = ['6:00 AM', '7:00 AM', '9:00 AM', '12:00 PM', '6:00 PM', '7:30 PM'];

  const isRed = theme === 'red';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullName || !whatsapp) {
      setFeedback({ type: 'error', text: 'Please provide your name and WhatsApp number.' });
      return;
    }

    setLoading(true);
    setFeedback(null);

    try {
      await bookingsApi.submitBooking({
        full_name: fullName,
        whatsapp_number: whatsapp,
        lead_type: leadType,
        selected_day: selectedDay,
        selected_time: selectedTime,
      });

      // Isolated Meta Pixel Event: Fires real-time 'Lead' & 'Schedule' events
      try {
        trackEvent('Lead', {
          lead_type: leadType,
          selected_day: selectedDay,
          selected_time: selectedTime,
          page_path: typeof window !== 'undefined' ? window.location.pathname : '',
          button_text: buttonText,
          currency: 'INR',
          value: 0
        });
      } catch (pxErr) {
        // Zero interference with booking confirmation
      }

      setFeedback({
        type: 'success',
        text: `Slot requested for ${selectedDay} at ${selectedTime}! Our team will WhatsApp you confirmation.`
      });
      setFullName('');
      setWhatsapp('');
    } catch (err) {
      setFeedback({
        type: 'error',
        text: 'Unable to submit right now. Please call or WhatsApp us directly.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="slot-booking-card"
      style={{
        background: isRed ? '#E10600' : '#111111',
        border: isRed ? 'none' : '1px solid rgba(255, 255, 255, 0.16)',
        color: '#FFFFFF',
      }}
    >
      <span className="eyebrow" style={{ color: isRed ? '#FFE5E3' : '#FF3B30' }}>
        {eyebrow}
      </span>
      <h3 className="disp" style={{ fontSize: 'clamp(34px, 8vw, 80px)', lineHeight: 0.95 }}>
        {title}
      </h3>
      <p style={{ margin: 0, fontSize: '17px', lineHeight: 1.55, color: '#F2F2F2' }}>
        {description}
      </p>

      {/* Feature Bullet Inclusions */}
      <div>
        <div style={{ padding: '12px 0', borderTop: '1px solid rgba(255, 255, 255, 0.28)', fontSize: '15px', fontWeight: 600 }}>
          Tour the studio & meet coaches
        </div>
        <div style={{ padding: '12px 0', borderTop: '1px solid rgba(255, 255, 255, 0.28)', fontSize: '15px', fontWeight: 600 }}>
          Assessed on the floor
        </div>
        <div style={{ padding: '12px 0', borderTop: '1px solid rgba(255, 255, 255, 0.28)', fontSize: '15px', fontWeight: 600 }}>
          Roadmap confirmed on WhatsApp
        </div>
      </div>

      {/* Booking Form */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        
        {/* Day Chips */}
        <div>
          <span className="eyebrow" style={{ color: '#F2F2F2' }}>Pick a day</span>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '10px' }}>
            {days.map((day) => (
              <button
                key={day}
                type="button"
                onClick={() => setSelectedDay(day)}
                className={`chip ${selectedDay === day ? 'active' : ''}`}
                style={{
                  minHeight: '44px',
                  padding: '0 16px',
                  fontSize: '13px',
                  background: selectedDay === day ? '#0A0A0A' : 'transparent',
                  borderColor: selectedDay === day ? '#0A0A0A' : 'rgba(255, 255, 255, 0.28)',
                  color: '#FFFFFF',
                }}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Time Slots */}
        <div>
          <span className="eyebrow" style={{ color: '#F2F2F2' }}>Pick a time</span>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '10px' }}>
            {times.map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => setSelectedTime(slot)}
                className={`slot ${selectedTime === slot ? 'active' : ''}`}
                style={{
                  minHeight: '44px',
                  padding: '0 14px',
                  fontSize: '13px',
                  background: selectedTime === slot ? '#0A0A0A' : 'rgba(20, 20, 20, 0.7)',
                  borderColor: selectedTime === slot ? '#FFFFFF' : 'rgba(255, 255, 255, 0.2)',
                  color: '#FFFFFF',
                }}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        {/* Full Name */}
        <div className="field">
          <label style={{ color: '#F2F2F2' }}>Full name</label>
          <input
            type="text"
            placeholder="Your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>

        {/* WhatsApp */}
        <div className="field">
          <label style={{ color: '#F2F2F2' }}>WhatsApp Number</label>
          <input
            type="tel"
            placeholder="+91 98765 43210"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            required
          />
        </div>

        {feedback && (
          <div
            style={{
              padding: '12px 16px',
              borderRadius: '4px',
              fontSize: '14px',
              background: feedback.type === 'success' ? 'rgba(52, 199, 89, 0.2)' : 'rgba(255, 59, 48, 0.2)',
              border: `1px solid ${feedback.type === 'success' ? '#34C759' : '#FF3B30'}`,
              color: '#FFFFFF',
            }}
          >
            {feedback.text}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`btn ${isRed ? 'btn-black' : 'btn-red'}`}
          style={{ minHeight: '60px', fontSize: '15px', width: '100%', marginTop: '6px' }}
        >
          {loading ? 'Submitting...' : buttonText}
        </button>
      </form>
    </div>
  );
};

export default SlotBookingWidget;
