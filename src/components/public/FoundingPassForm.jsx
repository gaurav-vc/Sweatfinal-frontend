import React, { useState } from 'react';
import bookingsApi from '../../api/bookingsApi';

/**
 * FoundingPassForm - Luxury High-Converting Lead Capture Form
 * Wired directly to central SWEAT CRM Webhook:
 * https://api.sweatfitwellness.com/api/v1/webhooks/leads/sweat/
 */
export const FoundingPassForm = ({
  leadType = 'experience',
  leadSource = 'SWEAT_WEBSITE',
  theme = 'red', // 'red' or 'dark'
  title = "CLAIM YOUR EXCLUSIVE FOUNDING PASS",
  eyebrow = "LIMITED FOUNDING MEMBER ACCESS",
  subheadline = "First 50 signups unlock lifetime founding privileges, VIP trial access, and bespoke coaching onboarding.",
  buttonText = "RESERVE FOUNDING PRIVILEGES →",
  branchName = "Andheri West",
  defaultProgram = "",
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedGoal, setSelectedGoal] = useState('Fat Loss & Mobility');
  const [selectedBranch, setSelectedBranch] = useState(branchName || 'Andheri West');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const goals = [
    "Fat Loss & Mobility",
    "Strength & Conditioning",
    "Athletic Performance",
    "Postural Rehabilitation",
  ];

  const isRed = theme === 'red';

  // Lead source is standardized to SWEAT_WEBSITE (not landing pages)
  const getLeadSource = () => {
    return leadSource || 'SWEAT_WEBSITE';
  };

  const getInterestedIn = () => {
    if (defaultProgram) return defaultProgram;
    const t = String(leadType || '').toLowerCase();
    if (t.includes('bootcamp')) return 'Bootcamp';
    if (t.includes('pilates')) return 'Pilates';
    if (t.includes('elite')) return 'Elite 1-on-1';
    if (t.includes('glutes')) return 'Glutes & Abs';
    if (t.includes('assessment')) return 'Fitness Assessment';
    return 'SWEAT Experience';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) {
      setFeedback({ type: 'error', text: 'Please provide your full name and phone number.' });
      return;
    }

    // Split name safely
    const nameParts = fullName.trim().split(/\s+/);
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    // Standardize phone format (+91 if 10-digit Indian number)
    let cleanPhone = phone.replace(/[\s-]/g, '');
    if (/^\d{10}$/.test(cleanPhone)) {
      cleanPhone = '+91' + cleanPhone;
    }

    // Phone validation
    if (!/^\+?[1-9]\d{7,14}$/.test(cleanPhone)) {
      setFeedback({ type: 'error', text: 'Please enter a valid phone number with country code (e.g. +91 98765 43210).' });
      return;
    }

    const interestedIn = getInterestedIn();
    const leadSource = getLeadSource();

    // 1. Build Payload adhering strictly to CRM Webhook Schema
    const payload = {
      first_name: firstName,
      last_name: lastName || undefined,
      phone: cleanPhone,
      email: email.trim() || undefined,
      branch_name: selectedBranch,
      lead_source: leadSource,
      interested_in: interestedIn,
      fitness_goal: selectedGoal,
      country: "India"
    };

    setLoading(true);
    setFeedback(null);

    let crmSuccess = false;

    try {
      // 2. Post directly to SWEAT Central Public CRM Webhook
      const crmResponse = await fetch('https://api.sweatfitwellness.com/api/v1/webhooks/leads/sweat/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (crmResponse.ok) {
        crmSuccess = true;
      }
    } catch (crmErr) {
      console.warn('CRM Webhook endpoint warning:', crmErr);
    }

    // 3. Fail-safe mirror save into local database so lead is also recorded in CMS Studio
    try {
      await bookingsApi.submitBooking({
        full_name: fullName.trim(),
        whatsapp_number: cleanPhone,
        lead_type: leadType,
        preferred_program: interestedIn,
        notes: `Goal: ${selectedGoal} · Branch: ${selectedBranch} · Email: ${email.trim() || 'N/A'}`
      });
      crmSuccess = true;
    } catch (localErr) {
      // Local backup attempt
    }

    setLoading(false);

    if (crmSuccess) {
      setFeedback({
        type: 'success',
        text: 'Founding pass reserved! Our concierge will WhatsApp you shortly with your exclusive pass details.'
      });
      setFullName('');
      setPhone('');
      setEmail('');
    } else {
      setFeedback({
        type: 'error',
        text: 'Submission failed. Please check your phone number and retry, or contact our front desk.'
      });
    }
  };

  return (
    <div
      className="slot-booking-card"
      style={{
        background: isRed ? '#E10600' : '#111111',
        border: isRed ? 'none' : '1px solid rgba(255, 255, 255, 0.16)',
        color: '#FFFFFF',
        borderRadius: '12px',
        padding: '36px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        boxShadow: isRed ? '0 10px 40px rgba(225, 6, 0, 0.25)' : '0 10px 40px rgba(0, 0, 0, 0.45)',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span
            className="eyebrow"
            style={{
              color: isRed ? '#FFE5E3' : '#E10600',
              fontWeight: 800,
              letterSpacing: '0.12em',
              background: isRed ? 'rgba(0,0,0,0.2)' : 'rgba(225, 6, 0, 0.12)',
              padding: '4px 10px',
              borderRadius: '4px',
              display: 'inline-block'
            }}
          >
            {eyebrow}
          </span>
          <span
            className="pill"
            style={{
              background: '#0A0A0A',
              color: '#FFFFFF',
              fontSize: '10px',
              fontWeight: 800,
              letterSpacing: '0.1em'
            }}
          >
            50 PASSES ONLY
          </span>
        </div>

        <h3 className="disp" style={{ fontSize: 'clamp(32px, 5vw, 54px)', lineHeight: 0.95, margin: '6px 0 0' }}>
          {title}
        </h3>

        <p style={{ margin: '4px 0 0', fontSize: '15px', lineHeight: 1.55, color: isRed ? '#FDE8E8' : '#D1D5DB' }}>
          {subheadline}
        </p>
      </div>

      {/* Privileges Inclusions */}
      <div style={{
        background: isRed ? 'rgba(0, 0, 0, 0.18)' : 'rgba(255, 255, 255, 0.04)',
        border: isRed ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '8px',
        padding: '12px 16px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '8px',
        fontSize: '12px',
        fontWeight: 600
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span>👑</span>
          <span>Lifetime Founding Rates</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span>⚡</span>
          <span>1-on-1 Biomechanical Screen</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span>🎯</span>
          <span>Priority Floor Access</span>
        </div>
      </div>

      {/* High-Converting Form */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        
        {/* Full Name */}
        <div className="field">
          <label style={{ color: '#FFFFFF', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
            Full Name *
          </label>
          <input
            type="text"
            placeholder="e.g. Aarav Sharma"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            style={{
              background: isRed ? '#FFFFFF' : '#1A1A1A',
              color: isRed ? '#0A0A0A' : '#FFFFFF',
              border: isRed ? 'none' : '1px solid rgba(255, 255, 255, 0.2)',
              minHeight: '48px',
              borderRadius: '6px',
              padding: '0 14px',
              fontSize: '14px',
            }}
          />
        </div>

        {/* Phone & Email Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
          <div className="field">
            <label style={{ color: '#FFFFFF', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
              Phone Number *
            </label>
            <input
              type="tel"
              placeholder="+91 98765 43210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              style={{
                background: isRed ? '#FFFFFF' : '#1A1A1A',
                color: isRed ? '#0A0A0A' : '#FFFFFF',
                border: isRed ? 'none' : '1px solid rgba(255, 255, 255, 0.2)',
                minHeight: '48px',
                borderRadius: '6px',
                padding: '0 14px',
                fontSize: '14px',
              }}
            />
          </div>

          <div className="field">
            <label style={{ color: '#FFFFFF', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
              Email Address (Optional)
            </label>
            <input
              type="email"
              placeholder="aarav@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                background: isRed ? '#FFFFFF' : '#1A1A1A',
                color: isRed ? '#0A0A0A' : '#FFFFFF',
                border: isRed ? 'none' : '1px solid rgba(255, 255, 255, 0.2)',
                minHeight: '48px',
                borderRadius: '6px',
                padding: '0 14px',
                fontSize: '14px',
              }}
            />
          </div>
        </div>

        {/* Primary Objective Pills */}
        <div>
          <label style={{ color: '#FFFFFF', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, display: 'block', marginBottom: '8px' }}>
            Primary Objective
          </label>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {goals.map((goal) => {
              const active = selectedGoal === goal;
              return (
                <button
                  key={goal}
                  type="button"
                  onClick={() => setSelectedGoal(goal)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    background: active
                      ? (isRed ? '#0A0A0A' : '#E10600')
                      : (isRed ? 'rgba(0, 0, 0, 0.25)' : 'rgba(255, 255, 255, 0.08)'),
                    color: '#FFFFFF',
                    border: active
                      ? (isRed ? '1px solid #0A0A0A' : '1px solid #E10600')
                      : '1px solid rgba(255, 255, 255, 0.2)',
                  }}
                >
                  {goal}
                </button>
              );
            })}
          </div>
        </div>

        {/* Studio / Branch */}
        <div className="field">
          <label style={{ color: '#FFFFFF', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
            Studio
          </label>
          <input
            type="text"
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            style={{
              background: isRed ? 'rgba(255, 255, 255, 0.95)' : '#1A1A1A',
              color: isRed ? '#0A0A0A' : '#FFFFFF',
              border: isRed ? 'none' : '1px solid rgba(255, 255, 255, 0.2)',
              minHeight: '44px',
              borderRadius: '6px',
              padding: '0 14px',
              fontSize: '13px',
              fontWeight: 600,
            }}
          />
        </div>

        {/* Feedback message */}
        {feedback && (
          <div
            style={{
              padding: '14px 16px',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: 600,
              background: feedback.type === 'success' ? '#DCFCE7' : '#FEE2E2',
              color: feedback.type === 'success' ? '#15803D' : '#991B1B',
              border: `1px solid ${feedback.type === 'success' ? '#86EFAC' : '#FCA5A5'}`,
            }}
          >
            {feedback.text}
          </div>
        )}

        {/* CTA Button */}
        <button
          type="submit"
          disabled={loading}
          className={`btn ${isRed ? 'btn-black' : 'btn-red'}`}
          style={{
            minHeight: '58px',
            fontSize: '15px',
            width: '100%',
            fontWeight: 800,
            letterSpacing: '0.08em',
            borderRadius: '6px',
            cursor: loading ? 'not-allowed' : 'pointer',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
            marginTop: '4px'
          }}
        >
          {loading ? 'Submitting to Concierge...' : buttonText}
        </button>

        {/* Guarantee Sub-label */}
        <div style={{ textAlign: 'center', fontSize: '11px', color: isRed ? '#FFE5E3' : '#9CA3AF', fontWeight: 600 }}>
          🔒 Zero Spam. Instant WhatsApp Concierge Confirmation.
        </div>
      </form>
    </div>
  );
};

export default FoundingPassForm;

