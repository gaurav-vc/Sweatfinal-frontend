import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LogIn, ChevronDown, Dumbbell, Sparkles, Flame, User, HeartPulse, Apple, Globe, Crown, Layers, Calendar, MapPin, ShoppingBag, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SweatLogo from './SweatLogo';
import { trackEvent } from '../../services/pixelService';

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [programsDropdownOpen, setProgramsDropdownOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const location = useLocation();

  const programsTimeoutRef = useRef(null);
  const servicesTimeoutRef = useRef(null);

  // Close dropdowns and mobile drawer when route changes
  useEffect(() => {
    setMobileOpen(false);
    setProgramsDropdownOpen(false);
    setServicesDropdownOpen(false);
  }, [location.pathname]);

  const programItems = [
    { label: 'Bootcamp', path: '/bootcamp', tag: 'Olympic & MetCon', icon: Dumbbell },
    { label: 'Reformer Pilates', path: '/pilates', tag: 'Athletic & Rehab', icon: Sparkles },
    { label: 'Glutes & Abs', path: '/glutes', tag: 'Shape & Core Power', icon: Flame },
    { label: '1-on-1 Coaching', path: '/coaching', tag: 'Bespoke Personal', icon: User },
    { label: 'All 7 Programs', path: '/programs', tag: 'Full Curriculum', icon: Layers },
  ];

  const serviceItems = [
    { label: 'Sports Nutrition', path: '/nutrition', tag: 'Macros & Metabolic', icon: Apple },
    { label: 'Recovery Suite', path: '/recovery', tag: 'Cold Plunge & Physio', icon: HeartPulse },
    { label: 'Online Coaching', path: '/online', tag: 'Global Remote System', icon: Globe },
    { label: 'SWEAT Elite', path: '/elite', tag: 'All-Inclusive VIP', icon: Crown },
  ];

  const studioLinks = [
    { label: 'Membership', path: '/membership' },
    { label: 'Coaches', path: '/team' },
    { label: 'The App', path: '/app' },
    { label: 'Shop', path: '/shop' },
    { label: 'Visit', path: '/visit' },
  ];

  const isProgramsActive = ['/programs', '/bootcamp', '/pilates', '/glutes', '/coaching'].some(p => location.pathname === p || location.pathname.startsWith(p));
  const isServicesActive = ['/nutrition', '/recovery', '/online', '/elite'].some(p => location.pathname === p || location.pathname.startsWith(p));

  const handleProgramsEnter = () => {
    clearTimeout(programsTimeoutRef.current);
    setProgramsDropdownOpen(true);
  };
  const handleProgramsLeave = () => {
    programsTimeoutRef.current = setTimeout(() => setProgramsDropdownOpen(false), 180);
  };

  const handleServicesEnter = () => {
    clearTimeout(servicesTimeoutRef.current);
    setServicesDropdownOpen(true);
  };
  const handleServicesLeave = () => {
    servicesTimeoutRef.current = setTimeout(() => setServicesDropdownOpen(false), 180);
  };

  return (
    <header className="nav" style={{ position: 'sticky', top: 0, zIndex: 100, backdropFilter: 'blur(16px)', background: 'rgba(10, 10, 10, 0.92)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
      <div className="wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', height: '76px' }}>
        
        {/* Brand Logo */}
        <Link to="/" aria-label="SWEAT home" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <SweatLogo height={34} showHq={false} />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="links hide-sm" aria-label="Primary" style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          
          {/* Programs Dropdown */}
          <div
            style={{ position: 'relative' }}
            onMouseEnter={handleProgramsEnter}
            onMouseLeave={handleProgramsLeave}
          >
            <button
              type="button"
              onClick={() => setProgramsDropdownOpen(prev => !prev)}
              className={`lnk ${isProgramsActive ? 'on' : ''}`}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '8px 0',
                color: isProgramsActive ? '#FFFFFF' : '#D4D4D4',
                fontSize: '14px',
                fontWeight: 700,
                letterSpacing: '0.04em'
              }}
            >
              <span>Disciplines</span>
              <ChevronDown
                size={14}
                style={{
                  transform: programsDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease',
                  color: isProgramsActive ? '#E10600' : '#888'
                }}
              />
            </button>

            <AnimatePresence>
              {programsDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: '-16px',
                    width: '310px',
                    background: '#121212',
                    border: '1px solid rgba(255, 255, 255, 0.14)',
                    borderRadius: '10px',
                    padding: '8px',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.75)',
                    zIndex: 200,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px'
                  }}
                >
                  <div style={{ padding: '8px 12px 4px', fontSize: '11px', fontWeight: 800, color: '#E10600', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Training Programs
                  </div>
                  {programItems.map((item) => {
                    const IconComp = item.icon;
                    const isItemActive = location.pathname === item.path || (item.path !== '/programs' && location.pathname.startsWith(item.path));
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '10px 12px',
                          borderRadius: '6px',
                          textDecoration: 'none',
                          background: isItemActive ? 'rgba(225, 6, 0, 0.12)' : 'transparent',
                          transition: 'background 0.15s ease'
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = isItemActive ? 'rgba(225, 6, 0, 0.18)' : 'rgba(255, 255, 255, 0.06)'}
                        onMouseLeave={e => e.currentTarget.style.background = isItemActive ? 'rgba(225, 6, 0, 0.12)' : 'transparent'}
                      >
                        <div style={{ width: '32px', height: '32px', borderRadius: '6px', background: 'rgba(255, 255, 255, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: isItemActive ? '#E10600' : '#FFF' }}>
                          <IconComp size={16} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ fontSize: '13px', fontWeight: 700, color: '#FFFFFF' }}>{item.label}</span>
                          <span style={{ fontSize: '11px', color: '#999' }}>{item.tag}</span>
                        </div>
                      </Link>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Services Dropdown */}
          <div
            style={{ position: 'relative' }}
            onMouseEnter={handleServicesEnter}
            onMouseLeave={handleServicesLeave}
          >
            <button
              type="button"
              onClick={() => setServicesDropdownOpen(prev => !prev)}
              className={`lnk ${isServicesActive ? 'on' : ''}`}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '8px 0',
                color: isServicesActive ? '#FFFFFF' : '#D4D4D4',
                fontSize: '14px',
                fontWeight: 700,
                letterSpacing: '0.04em'
              }}
            >
              <span>Services</span>
              <ChevronDown
                size={14}
                style={{
                  transform: servicesDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease',
                  color: isServicesActive ? '#E10600' : '#888'
                }}
              />
            </button>

            <AnimatePresence>
              {servicesDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: '-16px',
                    width: '300px',
                    background: '#121212',
                    border: '1px solid rgba(255, 255, 255, 0.14)',
                    borderRadius: '10px',
                    padding: '8px',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.75)',
                    zIndex: 200,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px'
                  }}
                >
                  <div style={{ padding: '8px 12px 4px', fontSize: '11px', fontWeight: 800, color: '#E10600', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Specialized Offerings
                  </div>
                  {serviceItems.map((item) => {
                    const IconComp = item.icon;
                    const isItemActive = location.pathname === item.path;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '10px 12px',
                          borderRadius: '6px',
                          textDecoration: 'none',
                          background: isItemActive ? 'rgba(225, 6, 0, 0.12)' : 'transparent',
                          transition: 'background 0.15s ease'
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = isItemActive ? 'rgba(225, 6, 0, 0.18)' : 'rgba(255, 255, 255, 0.06)'}
                        onMouseLeave={e => e.currentTarget.style.background = isItemActive ? 'rgba(225, 6, 0, 0.12)' : 'transparent'}
                      >
                        <div style={{ width: '32px', height: '32px', borderRadius: '6px', background: 'rgba(255, 255, 255, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: isItemActive ? '#E10600' : '#FFF' }}>
                          <IconComp size={16} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ fontSize: '13px', fontWeight: 700, color: '#FFFFFF' }}>{item.label}</span>
                          <span style={{ fontSize: '11px', color: '#999' }}>{item.tag}</span>
                        </div>
                      </Link>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Standard Navigation Links */}
          {studioLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`lnk ${isActive ? 'on' : ''}`}
                style={{ fontSize: '14px', fontWeight: 700 }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA Action Buttons + Admin Studio Login Symbol */}
        <div className="hide-sm" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Link
            to="/assessment"
            onClick={() => trackEvent('Schedule', { location: 'navbar_desktop', button: 'Assessment' })}
            className="btn btn-ghost"
            style={{ minHeight: '46px', padding: '0 18px', fontSize: '12px' }}
          >
            Assessment
          </Link>
          <Link
            to="/book"
            onClick={() => trackEvent('InitiateCheckout', { location: 'navbar_desktop', button: 'Experience SWEAT' })}
            className="btn btn-red"
            style={{ minHeight: '46px', padding: '0 20px', fontSize: '12px' }}
          >
            Experience SWEAT
          </Link>

          {/* CMS Admin Login Symbol */}
          <Link
            to="/admin-studio/login"
            title="CMS Studio Admin"
            aria-label="CMS Studio Admin"
            style={{
              minHeight: '46px',
              width: '46px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '6px',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              background: 'rgba(255, 255, 255, 0.05)',
              color: '#FFFFFF',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
              marginLeft: '4px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#E10600';
              e.currentTarget.style.background = 'rgba(225, 6, 0, 0.15)';
              e.currentTarget.style.color = '#FF3B30';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.color = '#FFFFFF';
            }}
          >
            <LogIn size={18} />
          </Link>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
          style={{
            display: 'none',
            background: 'transparent',
            border: 'none',
            color: '#FFFFFF',
            cursor: 'pointer',
            padding: '8px',
          }}
          className="mobile-toggle"
        >
          {mobileOpen ? <X size={28} color="#FF3B30" /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Animated Slide-in Drawer with all 17 Pages */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              background: '#0D0D0D',
              borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
              padding: '24px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              maxHeight: '85vh',
              overflowY: 'auto'
            }}
          >
            {/* Disciplines Section */}
            <div>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#E10600', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Training Disciplines
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '10px' }}>
                {programItems.map(p => (
                  <Link
                    key={p.path}
                    to={p.path}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      padding: '10px 12px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '6px',
                      color: '#FFF',
                      textDecoration: 'none',
                      fontSize: '13px',
                      fontWeight: 700
                    }}
                  >
                    {p.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Services Section */}
            <div>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#E10600', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Specialized Services
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '10px' }}>
                {serviceItems.map(s => (
                  <Link
                    key={s.path}
                    to={s.path}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      padding: '10px 12px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '6px',
                      color: '#FFF',
                      textDecoration: 'none',
                      fontSize: '13px',
                      fontWeight: 700
                    }}
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Studio Info Section */}
            <div>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#888', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Studio &amp; Community
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
                {studioLinks.map(l => (
                  <Link
                    key={l.path}
                    to={l.path}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      color: '#CCC',
                      textDecoration: 'none',
                      fontSize: '14px',
                      fontWeight: 600
                    }}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile CTAs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '8px', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '16px' }}>
              <Link
                to="/assessment"
                onClick={() => {
                  trackEvent('Schedule', { location: 'navbar_mobile', button: 'Fitness Assessment' });
                  setMobileOpen(false);
                }}
                className="btn btn-ghost"
                style={{ minHeight: '48px', fontSize: '13px', width: '100%' }}
              >
                Fitness Assessment
              </Link>
              <Link
                to="/book"
                onClick={() => {
                  trackEvent('InitiateCheckout', { location: 'navbar_mobile', button: 'Experience SWEAT' });
                  setMobileOpen(false);
                }}
                className="btn btn-red"
                style={{ minHeight: '48px', fontSize: '13px', width: '100%' }}
              >
                Experience SWEAT
              </Link>
              <Link
                to="/admin-studio/login"
                onClick={() => setMobileOpen(false)}
                style={{ textAlign: 'center', color: '#666', fontSize: '12px', padding: '8px 0', textDecoration: 'none' }}
              >
                CMS Studio Login →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;