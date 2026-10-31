import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  getPixelConfig,
  updatePixelConfig,
  getEventHistory,
  subscribeToPixelEvents,
  clearEventHistory,
  trackEvent
} from '../../services/pixelService';
import { Activity, Settings, CheckCircle2, AlertTriangle, ChevronDown, ChevronUp, X, Play, Trash2, Eye } from 'lucide-react';

export const PixelMonitor = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // Admin visibility guard: Visible ONLY if admin is authenticated or ?pixel_debug=true
  const isTokenPresent = typeof window !== 'undefined' && Boolean(localStorage.getItem('sweat_admin_token'));
  const hasDebugParam = typeof window !== 'undefined' && new URLSearchParams(location.search).get('pixel_debug') === 'true';
  const isAdmin = isAuthenticated || isTokenPresent || hasDebugParam;

  const [config, setConfig] = useState(getPixelConfig);
  const [events, setEvents] = useState(getEventHistory);
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('events'); // 'events' | 'config'
  const [tempPixelId, setTempPixelId] = useState(config.pixelId);
  const [lastFiredId, setLastFiredId] = useState(null);

  useEffect(() => {
    if (!isAdmin) return;
    const unsubscribe = subscribeToPixelEvents((data) => {
      if (data.type === 'EVENT_FIRED') {
        setEvents([...data.history]);
        setLastFiredId(data.record.id);
        // Clear highlight after 1.5s
        setTimeout(() => setLastFiredId(null), 1500);
      } else if (data.type === 'CONFIG_UPDATED') {
        setConfig(data.config);
        setTempPixelId(data.config.pixelId);
      } else if (data.type === 'HISTORY_CLEARED') {
        setEvents([]);
      }
    });

    return unsubscribe;
  }, []);

  const handleSaveConfig = (e) => {
    e.preventDefault();
    const updated = updatePixelConfig({ pixelId: tempPixelId.trim() });
    setConfig(updated);
  };

  const handleToggleEnabled = () => {
    const updated = updatePixelConfig({ enabled: !config.enabled });
    setConfig(updated);
  };

  const handleSendTestLead = () => {
    trackEvent('Lead', {
      source: 'RealTime_PixelMonitor_Test',
      lead_type: 'vip_experience',
      selected_day: 'Today',
      selected_time: '7:00 PM',
      value: 0,
      currency: 'INR'
    });
  };

  const getEventBadgeColor = (name) => {
    switch (name) {
      case 'Lead':
        return '#10B981'; // Green
      case 'InitiateCheckout':
        return '#3B82F6'; // Blue
      case 'Schedule':
        return '#F59E0B'; // Amber
      case 'Contact':
        return '#06B6D4'; // Cyan
      case 'PageView':
        return '#8B5CF6'; // Purple
      default:
        return '#E10600'; // SWEAT Red
    }
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <aside
      aria-label="Meta Pixel Real-Time Monitor"
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 99999,
        fontFamily: 'Manrope, -apple-system, sans-serif'
      }}
    >
      {/* 1. Closed State: Sleek Floating Diagnostic Pill */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(15, 15, 15, 0.94)',
            color: '#FFFFFF',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            padding: '8px 14px',
            borderRadius: '100px',
            cursor: 'pointer',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.65)',
            backdropFilter: 'blur(12px)',
            transition: 'all 0.2s ease',
            fontSize: '12px',
            fontWeight: 700
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#1877F2';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.18)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
          title="Click to inspect real-time Meta Pixel events"
        >
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: config.enabled ? '#10B981' : '#EF4444',
              boxShadow: config.enabled ? '0 0 8px #10B981' : 'none'
            }}
          />
          <span style={{ color: '#1877F2', fontWeight: 800 }}>Meta Pixel</span>
          <span style={{ color: '#A3A3A3', fontSize: '11px' }}>
            {events.length > 0 ? `${events[0].eventName} (${events.length})` : 'Live'}
          </span>
        </button>
      )}

      {/* 2. Expanded State: Real-Time Diagnostic Dashboard */}
      {isOpen && (
        <div
          style={{
            width: '380px',
            maxWidth: 'calc(100vw - 32px)',
            maxHeight: '520px',
            background: '#111111',
            border: '1px solid rgba(255, 255, 255, 0.16)',
            borderRadius: '14px',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.85)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            backdropFilter: 'blur(20px)'
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '12px 16px',
              background: '#181818',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Activity size={16} color="#1877F2" />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#FFF' }}>
                  Meta Pixel Real-Time HUD
                </span>
                <span style={{ fontSize: '10px', color: '#888' }}>
                  ID: {config.pixelId}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <button
                type="button"
                onClick={() => setActiveTab(activeTab === 'events' ? 'config' : 'events')}
                style={{
                  background: activeTab === 'config' ? 'rgba(24, 119, 242, 0.2)' : 'transparent',
                  border: 'none',
                  color: activeTab === 'config' ? '#1877F2' : '#AAA',
                  cursor: 'pointer',
                  padding: '4px 6px',
                  borderRadius: '4px'
                }}
                title="Pixel Configuration"
              >
                <Settings size={15} />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#888',
                  cursor: 'pointer',
                  padding: '4px'
                }}
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div
            style={{
              display: 'flex',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              background: '#141414'
            }}
          >
            <button
              type="button"
              onClick={() => setActiveTab('events')}
              style={{
                flex: 1,
                padding: '8px',
                background: 'transparent',
                border: 'none',
                borderBottom: activeTab === 'events' ? '2px solid #1877F2' : '2px solid transparent',
                color: activeTab === 'events' ? '#FFF' : '#777',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Live Feed ({events.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('config')}
              style={{
                flex: 1,
                padding: '8px',
                background: 'transparent',
                border: 'none',
                borderBottom: activeTab === 'config' ? '2px solid #1877F2' : '2px solid transparent',
                color: activeTab === 'config' ? '#FFF' : '#777',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Dynamic Config
            </button>
          </div>

          {/* Tab Content: Events Feed */}
          {activeTab === 'events' && (
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                maxHeight: '340px'
              }}
            >
              {events.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '30px 10px', color: '#666', fontSize: '12px' }}>
                  <Eye size={24} style={{ margin: '0 auto 8px', opacity: 0.5 }} />
                  Waiting for button clicks or page navigation...
                  <div style={{ marginTop: '12px' }}>
                    <button
                      type="button"
                      onClick={handleSendTestLead}
                      style={{
                        background: '#E10600',
                        color: '#FFF',
                        border: 'none',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        cursor: 'pointer',
                        fontWeight: 700
                      }}
                    >
                      Trigger Test Lead Event
                    </button>
                  </div>
                </div>
              ) : (
                events.map((ev) => {
                  const isNew = ev.id === lastFiredId;
                  const badgeColor = getEventBadgeColor(ev.eventName);
                  return (
                    <div
                      key={ev.id}
                      style={{
                        background: isNew ? 'rgba(24, 119, 242, 0.15)' : '#181818',
                        border: `1px solid ${isNew ? '#1877F2' : 'rgba(255, 255, 255, 0.08)'}`,
                        borderRadius: '8px',
                        padding: '10px',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span
                          style={{
                            background: badgeColor,
                            color: '#FFF',
                            fontSize: '10px',
                            fontWeight: 800,
                            padding: '2px 6px',
                            borderRadius: '4px',
                            letterSpacing: '0.04em'
                          }}
                        >
                          {ev.eventName}
                        </span>
                        <span style={{ fontSize: '10px', color: '#777' }}>
                          {ev.timestamp}
                        </span>
                      </div>

                      {/* Payload preview */}
                      <pre
                        style={{
                          margin: 0,
                          fontSize: '11px',
                          color: '#CCC',
                          background: 'rgba(0, 0, 0, 0.4)',
                          padding: '6px 8px',
                          borderRadius: '4px',
                          overflowX: 'auto',
                          fontFamily: 'Consolas, monospace',
                          whiteSpace: 'pre-wrap',
                          wordBreak: 'break-word'
                        }}
                      >
                        {JSON.stringify(ev.payload, null, 2)}
                      </pre>
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* Tab Content: Config Settings */}
          {activeTab === 'config' && (
            <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <form onSubmit={handleSaveConfig} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '11px', fontWeight: 700, color: '#BBB' }}>
                  Dynamic Meta Pixel ID:
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    value={tempPixelId}
                    onChange={(e) => setTempPixelId(e.target.value)}
                    placeholder="e.g. 1131319899356928"
                    style={{
                      flex: 1,
                      background: '#1A1A1A',
                      border: '1px solid rgba(255, 255, 255, 0.16)',
                      borderRadius: '6px',
                      color: '#FFF',
                      padding: '6px 10px',
                      fontSize: '12px'
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      background: '#1877F2',
                      color: '#FFF',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '6px 12px',
                      fontSize: '11px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Save
                  </button>
                </div>
                <span style={{ fontSize: '10px', color: '#666' }}>
                  Saved in localStorage. Automatically reinitializes fbq in real-time.
                </span>
              </form>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', background: '#181818', borderRadius: '6px' }}>
                <span style={{ fontSize: '12px', color: '#DDD', fontWeight: 600 }}>Tracking Active</span>
                <button
                  type="button"
                  onClick={handleToggleEnabled}
                  style={{
                    background: config.enabled ? '#10B981' : '#4B5563',
                    border: 'none',
                    color: '#FFF',
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '4px 10px',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  {config.enabled ? 'ENABLED' : 'PAUSED'}
                </button>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  onClick={handleSendTestLead}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    background: '#222',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#FFF',
                    padding: '8px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  <Play size={12} /> Test Lead Event
                </button>
                <button
                  type="button"
                  onClick={clearEventHistory}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    background: '#222',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#EF4444',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    cursor: 'pointer'
                  }}
                  title="Clear Event History"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          )}

          {/* Footer Status Bar */}
          <div
            style={{
              padding: '8px 14px',
              background: '#0D0D0D',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '10px',
              color: '#888'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={12} color="#10B981" />
              <span>Isolated Fail-Safe Engine</span>
            </div>
            <span>SWEAT HQ Real-Time</span>
          </div>
        </div>
      )}
    </aside>
  );
};

export default PixelMonitor;

