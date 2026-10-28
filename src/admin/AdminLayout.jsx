import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  Film,
  Dumbbell,
  Video,
  Flame,
  Users,
  CreditCard,
  Inbox,
  Image,
  LogOut,
  ExternalLink,
  ShieldCheck,
  Eye
} from 'lucide-react';
import '../styles/admin.css';
import SweatLogo from '../components/common/SweatLogo';
import LivePreviewModal from './components/LivePreviewModal';

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [previewOpen, setPreviewOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin-studio/login');
  };

  const navItems = [
    { to: '/admin-studio/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/admin-studio/leads', label: 'Booking Leads', icon: Inbox },
    { to: '/admin-studio/heroes', label: 'Hero Banners', icon: Film },
    { to: '/admin-studio/programs', label: 'Programs', icon: Dumbbell },
    { to: '/admin-studio/celebrities', label: 'Celebrity Reels', icon: Video },
    { to: '/admin-studio/transformations', label: 'Transformations', icon: Flame },
    { to: '/admin-studio/team', label: 'Coaches & Team', icon: Users },
    { to: '/admin-studio/memberships', label: 'Memberships', icon: CreditCard },
    { to: '/admin-studio/media', label: 'Media Library', icon: Image },
  ];

  return (
    <div className="cms-wrapper" style={{
      display: 'flex',
      flexDirection: 'row',
      minHeight: '100vh',
      width: '100%',
      background: '#FAFAFA',
      color: '#111827',
      position: 'relative'
    }}>
      {/* SIDEBAR NAVIGATION DOCK (WHITE & RED LUXURY) */}
      <aside className="cms-sidebar" style={{
        width: '280px',
        minWidth: '280px',
        maxWidth: '280px',
        height: '100vh',
        position: 'sticky',
        top: 0,
        background: '#FFFFFF',
        borderRight: '1px solid #E5E7EB',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        zIndex: 50,
        flexShrink: 0
      }}>
        {/* Brand Area */}
        <div>
          <div style={{
            padding: '24px 20px',
            borderBottom: '1px solid #E5E7EB',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            background: '#FFFFFF'
          }}>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <SweatLogo height={28} showHq={false} dark={true} />
              <span style={{
                background: '#E10600',
                color: '#FFFFFF',
                fontFamily: 'Manrope, sans-serif',
                fontSize: '10px',
                fontWeight: 800,
                padding: '2px 8px',
                borderRadius: '999px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase'
              }}>
                STUDIO
              </span>
            </Link>
            <div style={{
              fontSize: '11px',
              color: '#6B7280',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontWeight: 600
            }}>
              Management & Leads
            </div>
          </div>

          {/* Navigation Links */}
          <nav style={{ padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) => `cms-nav-item ${isActive ? 'active' : ''}`}
                  style={({ isActive }) => ({
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    color: isActive ? '#E10600' : '#4B5563',
                    background: isActive ? 'rgba(225, 6, 0, 0.08)' : 'transparent',
                    borderLeft: isActive ? '3px solid #E10600' : '3px solid transparent',
                    fontSize: '14px',
                    fontWeight: isActive ? 700 : 600,
                    textDecoration: 'none',
                    transition: 'all 0.15s ease'
                  })}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer with Admin Badge and Logout */}
        <div style={{
          padding: '16px 16px 20px',
          borderTop: '1px solid #E5E7EB',
          background: '#F9FAFB',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          {/* User Profile Badge (Horizontally Aligned Card) */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            padding: '10px 14px',
            borderRadius: '8px',
            background: '#FFFFFF',
            border: '1px solid #E5E7EB',
            boxSizing: 'border-box',
            boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
          }}>
            {/* Left: Shield Avatar */}
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: 'rgba(225, 6, 0, 0.1)',
              border: '1px solid rgba(225, 6, 0, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <ShieldCheck size={18} color="#E10600" />
            </div>

            {/* Center: Name & Role */}
            <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <div style={{
                fontSize: '13px',
                fontWeight: 700,
                color: '#111827',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                lineHeight: 1.2
              }}>
                {user?.username || 'Admin'}
              </div>
              <div style={{
                fontSize: '10px',
                color: '#6B7280',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontWeight: 600
              }}>
                Super Admin
              </div>
            </div>

            {/* Right: Logout Action */}
            <button
              onClick={handleLogout}
              title="Sign Out"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '6px',
                background: 'transparent',
                border: '1px solid transparent',
                color: '#6B7280',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0,
                flexShrink: 0,
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#E10600';
                e.currentTarget.style.background = 'rgba(225, 6, 0, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(225, 6, 0, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#6B7280';
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = 'transparent';
              }}
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="cms-main" style={{
        flex: '1 1 0%',
        minWidth: 0,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        background: '#FAFAFA'
      }}>
        {/* Topbar */}
        <header style={{
          height: '68px',
          minHeight: '68px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 40px',
          borderBottom: '1px solid #E5E7EB',
          background: '#FFFFFF',
          position: 'sticky',
          top: 0,
          zIndex: 40
        }}>
          <div style={{
            fontSize: '13px',
            fontWeight: 800,
            color: '#111827',
            letterSpacing: '0.12em',
            textTransform: 'uppercase'
          }}>
            SWEAT Content Management Studio
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              type="button"
              onClick={() => setPreviewOpen(true)}
              title="Open Live Website Simulator with Desktop, Tablet & Mobile previews"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '9px 20px',
                borderRadius: '6px',
                background: '#FFFFFF',
                border: '1.5px solid #E10600',
                color: '#E10600',
                fontSize: '13px',
                fontWeight: 800,
                cursor: 'pointer',
                letterSpacing: '0.04em',
                transition: 'all 0.18s ease',
                boxShadow: '0 2px 8px rgba(225, 6, 0, 0.12)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#FEF2F2';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#FFFFFF';
                e.currentTarget.style.transform = 'none';
              }}
            >
              <Eye size={17} color="#000000" strokeWidth={2.5} style={{ stroke: '#000000' }} />
              <span style={{ color: '#0F172A', fontWeight: 800 }}>Live Preview</span>
            </button>
          </div>
        </header>

        {/* Content Outlet */}
        <div style={{
          flex: 1,
          padding: '36px 40px 80px',
          width: '100%',
          boxSizing: 'border-box'
        }}>
          <Outlet />
        </div>
      </main>

      {/* Interactive Device Simulator Modal matching user reference */}
      <LivePreviewModal
        isOpen={previewOpen}
        onClose={() => setPreviewOpen(false)}
        defaultPath="/"
      />
    </div>
  );
}
