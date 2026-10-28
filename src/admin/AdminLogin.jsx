import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, User, AlertCircle, ArrowLeft } from 'lucide-react';
import SweatLogo from '../components/common/SweatLogo';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(username, password);
      navigate('/admin-studio/dashboard');
    } catch (err) {
      setError(err.response?.data?.detail || 'Invalid username or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#FAFAFA',
      backgroundImage: 'radial-gradient(circle at 50% 25%, rgba(225, 6, 0, 0.08) 0%, transparent 65%)',
      padding: '24px',
      position: 'relative'
    }}>
      {/* Top Red Accent Line */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: '#E10600' }} />

      <div style={{
        width: '100%',
        maxWidth: '440px',
        background: '#FFFFFF',
        border: '1px solid #EAEAEA',
        borderRadius: '12px',
        padding: '48px 40px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.07)',
        position: 'relative'
      }}>
        {/* Header with Large Logo & Red Headline (No HQ) */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div style={{ marginBottom: '18px', display: 'flex', justifyContent: 'center' }}>
            <SweatLogo height={52} showHq={false} dark={true} />
          </div>
          <div style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: '26px',
            letterSpacing: '0.12em',
            color: '#E10600',
            lineHeight: 1.1
          }}>
            STUDIO CONTROL CENTER
          </div>
          <p style={{ margin: '8px 0 0', fontSize: '13px', color: '#6B7280', letterSpacing: '0.02em', fontWeight: 500 }}>
            Sign in to manage dynamic site content & leads
          </p>
        </div>

        {error && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '12px 16px',
            background: '#FEF2F2',
            border: '1px solid #F87171',
            borderRadius: '6px',
            color: '#B91C1C',
            fontSize: '13px',
            marginBottom: '24px'
          }}>
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="field">
            <label style={{ fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#374151', fontWeight: 700 }}>
              Username or Email
            </label>
            <div style={{ position: 'relative' }}>
              <User size={18} style={{ position: 'absolute', left: '16px', top: '16px', color: '#E10600' }} />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Admin"
                style={{
                  width: '100%',
                  height: '52px',
                  paddingLeft: '48px',
                  paddingRight: '16px',
                  background: '#F9FAFB',
                  border: '1px solid #D1D5DB',
                  borderRadius: '6px',
                  color: '#111827',
                  fontFamily: 'Manrope, sans-serif',
                  fontSize: '14px',
                  transition: 'border 0.2s ease, outline 0.2s ease'
                }}
                onFocus={(e) => { e.target.style.borderColor = '#E10600'; e.target.style.outline = '2px solid #E10600'; }}
                onBlur={(e) => { e.target.style.borderColor = '#D1D5DB'; e.target.style.outline = 'none'; }}
              />
            </div>
          </div>

          <div className="field">
            <label style={{ fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#374151', fontWeight: 700 }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '16px', top: '16px', color: '#E10600' }} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  height: '52px',
                  paddingLeft: '48px',
                  paddingRight: '16px',
                  background: '#F9FAFB',
                  border: '1px solid #D1D5DB',
                  borderRadius: '6px',
                  color: '#111827',
                  fontFamily: 'Manrope, sans-serif',
                  fontSize: '14px',
                  transition: 'border 0.2s ease, outline 0.2s ease'
                }}
                onFocus={(e) => { e.target.style.borderColor = '#E10600'; e.target.style.outline = '2px solid #E10600'; }}
                onBlur={(e) => { e.target.style.borderColor = '#D1D5DB'; e.target.style.outline = 'none'; }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-red"
            style={{
              width: '100%',
              marginTop: '12px',
              minHeight: '52px',
              borderRadius: '6px',
              fontSize: '14px',
              letterSpacing: '0.08em',
              boxShadow: '0 4px 14px rgba(225, 6, 0, 0.25)'
            }}
          >
            {loading ? 'Authenticating...' : 'Sign In to Studio'}
          </button>
        </form>

        <div style={{ marginTop: '28px', textAlign: 'center' }}>
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: '#E10600',
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: 700
            }}
          >
            <ArrowLeft size={14} />
            <span>Back to Public Website</span>
          </Link>
        </div>

        <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '12px', color: '#9CA3AF' }}>
          SWEAT Core Enterprise Security · JWT Protected
        </div>
      </div>
    </div>
  );
}
