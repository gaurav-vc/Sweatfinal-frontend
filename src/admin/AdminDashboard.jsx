import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Inbox,
  Film,
  Dumbbell,
  Video,
  ArrowUpRight,
  Clock,
  Phone,
  MessageCircle,
  Plus
} from 'lucide-react';
import bookingsApi from '../api/bookingsApi';
import contentApi from '../api/contentApi';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalLeads: 0,
    newLeads: 0,
    activePrograms: 0,
    celebrityReels: 0
  });
  const [recentLeads, setRecentLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true);
        // Fetch leads from DRF API
        const leadsRes = await bookingsApi.getLeads();
        const leads = Array.isArray(leadsRes) ? leadsRes : leadsRes.results || [];
        setRecentLeads(leads.slice(0, 5));

        const newCount = leads.filter(l => l.status === 'NEW').length;

        // Fetch home page content to count programs and reels
        const homeRes = await contentApi.getPageContent('home');
        setStats({
          totalLeads: leads.length,
          newLeads: newCount,
          activePrograms: homeRes.programs?.length || 7,
          celebrityReels: homeRes.celebrities?.length || 0
        });
      } catch (err) {
        console.error('Failed to load dashboard metrics:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboardData();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 className="disp" style={{ fontSize: '44px', margin: 0, color: '#111827' }}>STUDIO OVERVIEW</h1>
          <p style={{ margin: '4px 0 0', color: '#6B7280', fontSize: '14px' }}>
            Real-time telemetry, inbound visitor leads and live content managers
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Link to="/admin-studio/leads" className="btn btn-red" style={{ minHeight: '44px', fontSize: '13px' }}>
            <Inbox size={16} color="#000000" strokeWidth={2.5} style={{ stroke: '#000000' }} />
            <span>Manage All Leads ({stats.newLeads} new)</span>
          </Link>
          <Link to="/admin-studio/media" className="btn btn-ghost" style={{ minHeight: '44px', fontSize: '13px' }}>
            <Plus size={16} color="#000000" strokeWidth={2.5} style={{ stroke: '#000000' }} />
            <span>Upload Media</span>
          </Link>
        </div>
      </div>

      {/* METRIC STATS TILES (WHITE & RED) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
        <div className="tile" style={{ background: '#FFFFFF', border: '1px solid #E5E7EB' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#6B7280' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Inbound Leads
            </span>
            <Inbox size={18} color="#E10600" />
          </div>
          <div className="num" style={{ fontSize: '52px', color: '#111827', marginTop: '12px' }}>
            {stats.totalLeads}
          </div>
          <div style={{ fontSize: '12px', color: '#E10600', marginTop: '4px', fontWeight: 700 }}>
            {stats.newLeads} awaiting contact
          </div>
        </div>

        <div className="tile" style={{ background: '#FFFFFF', border: '1px solid #E5E7EB' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#6B7280' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Active Programs
            </span>
            <Dumbbell size={18} color="#E10600" />
          </div>
          <div className="num" style={{ fontSize: '52px', color: '#111827', marginTop: '12px' }}>
            {stats.activePrograms}
          </div>
          <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>
            Bootcamp, Pilates, Glutes & more
          </div>
        </div>

        <div className="tile" style={{ background: '#FFFFFF', border: '1px solid #E5E7EB' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#6B7280' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Celebrity Reels
            </span>
            <Video size={18} color="#E10600" />
          </div>
          <div className="num" style={{ fontSize: '52px', color: '#111827', marginTop: '12px' }}>
            {stats.celebrityReels}
          </div>
          <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>
            9:16 vertical video reel cards
          </div>
        </div>

        <div className="tile" style={{ background: '#FFFFFF', border: '1px solid #E5E7EB' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#6B7280' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Public Pages
            </span>
            <Film size={18} color="#E10600" />
          </div>
          <div className="num" style={{ fontSize: '52px', color: '#111827', marginTop: '12px' }}>
            17
          </div>
          <div style={{ fontSize: '12px', color: '#16A34A', marginTop: '4px', fontWeight: 600 }}>
            Dynamic Connected
          </div>
        </div>
      </div>

      {/* RECENT LEADS TABLE */}
      <div className="tile" style={{ background: '#FFFFFF', border: '1px solid #E5E7EB' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h3 className="disp" style={{ fontSize: '28px', margin: 0, color: '#111827' }}>RECENT INBOUND BOOKINGS</h3>
            <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#6B7280' }}>
              Visitors who requested a session, assessment or experience
            </p>
          </div>
          <Link to="/admin-studio/leads" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: '#E10600', textDecoration: 'none', fontWeight: 700 }}>
            <span>View All</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>

        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#A3A3A3' }}>
            Loading live leads...
          </div>
        ) : recentLeads.length === 0 ? (
          <div style={{ padding: '48px', textAlign: 'center', color: '#737373' }}>
            No booking leads submitted yet. Test by submitting from any public page booking form!
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="cms-table">
              <thead>
                <tr>
                  <th>Client Name</th>
                  <th>Contact</th>
                  <th>Type</th>
                  <th>Preferred Slot</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentLeads.map((lead) => (
                  <tr key={lead.id}>
                    <td style={{ fontWeight: 700, color: '#0F172A' }}>{lead.full_name}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: '#334155' }}>{lead.phone}</span>
                        <a
                          href={`https://wa.me/${lead.phone?.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(lead.full_name)}%2C%20greetings%20from%20SWEAT%20HQ.`}
                          target="_blank"
                          rel="noreferrer"
                          style={{ color: '#22C55E' }}
                          title="Message on WhatsApp"
                        >
                          <MessageCircle size={15} />
                        </a>
                      </div>
                    </td>
                    <td>
                      <span className="pill" style={{ background: '#FEE2E2', color: '#DC2626', border: '1px solid #FECACA' }}>
                        {lead.lead_type}
                      </span>
                    </td>
                    <td>{lead.preferred_day} · {lead.preferred_time || 'Flexible'}</td>
                    <td>
                      <span
                        className="pill"
                        style={{
                          background: lead.status === 'NEW' ? 'rgba(225, 6, 0, 0.2)' : 'rgba(34, 197, 94, 0.2)',
                          color: lead.status === 'NEW' ? '#FF3B30' : '#22C55E'
                        }}
                      >
                        {lead.status}
                      </span>
                    </td>
                    <td>
                      <Link
                        to={`/admin-studio/leads?id=${lead.id}`}
                        style={{ fontSize: '12px', color: '#E10600', textDecoration: 'none', fontWeight: 700 }}
                      >
                        View & Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
