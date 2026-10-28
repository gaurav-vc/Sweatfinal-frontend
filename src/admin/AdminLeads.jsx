import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Inbox,
  Search,
  MessageCircle,
  Phone,
  Mail,
  Calendar,
  Save,
  CheckCircle2,
  Filter
} from 'lucide-react';
import bookingsApi from '../api/bookingsApi';

export default function AdminLeads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [selectedLead, setSelectedLead] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const [searchParams] = useSearchParams();
  const highlightId = searchParams.get('id');

  useEffect(() => {
    loadLeads();
  }, []);

  async function loadLeads() {
    setLoading(true);
    try {
      const data = await bookingsApi.getLeads();
      const list = Array.isArray(data) ? data : data.results || [];
      setLeads(list);
      if (highlightId) {
        const found = list.find(l => String(l.id) === String(highlightId));
        if (found) setSelectedLead(found);
      } else if (list.length > 0 && !selectedLead) {
        setSelectedLead(list[0]);
      }
    } catch (err) {
      console.error('Failed to load leads:', err);
    } finally {
      setLoading(false);
    }
  }

  const handleUpdateLead = async (e) => {
    e.preventDefault();
    if (!selectedLead) return;
    setUpdating(true);
    setSuccessMsg('');
    try {
      await bookingsApi.updateLeadStatus(
        selectedLead.id,
        selectedLead.status,
        selectedLead.admin_notes
      );
      setLeads(leads.map(l => l.id === selectedLead.id ? { ...l, ...selectedLead } : l));
      setSuccessMsg('Lead record updated successfully!');
    } catch (err) {
      alert('Error updating lead: ' + err.message);
    } finally {
      setUpdating(false);
    }
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch =
      (lead.full_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.phone || '').includes(searchTerm) ||
      (lead.email || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'ALL' || lead.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <div>
        <h1 className="disp" style={{ fontSize: '44px', margin: 0, color: '#0F172A' }}>
          BOOKING LEADS & INQUIRIES
        </h1>
        <p style={{ margin: '4px 0 0', color: '#64748B', fontSize: '14px' }}>
          Real-time visitor requests with direct WhatsApp communication and pipeline tracking
        </p>
      </div>

      {/* FILTER BAR (WHITE & RED) */}
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: '1 1 300px' }}>
          <Search size={18} style={{ position: 'absolute', left: '16px', top: '16px', color: '#94A3B8' }} />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search leads by name, phone or email..."
            style={{
              width: '100%',
              height: '50px',
              paddingLeft: '48px',
              paddingRight: '16px',
              background: '#FFFFFF',
              border: '1.5px solid #CBD5E1',
              borderRadius: '8px',
              color: '#0F172A',
              fontSize: '14px'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {['ALL', 'NEW', 'CONTACTED', 'CONVERTED', 'ARCHIVED'].map(st => {
            const isSelected = filterStatus === st;
            return (
              <button
                key={st}
                type="button"
                onClick={() => setFilterStatus(st)}
                className="chip"
                style={{
                  minHeight: '44px',
                  padding: '0 18px',
                  fontSize: '12px',
                  fontWeight: 700,
                  borderRadius: '999px',
                  cursor: 'pointer',
                  background: isSelected ? '#E10600' : '#FFFFFF',
                  borderColor: isSelected ? '#E10600' : '#CBD5E1',
                  color: isSelected ? '#FFFFFF' : '#334155',
                  boxShadow: isSelected ? '0 2px 8px rgba(225, 6, 0, 0.25)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                {st}
              </button>
            );
          })}
        </div>
      </div>

      {/* SPLIT INBOX VIEW (WHITE & RED) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 5fr) minmax(0, 4fr)', gap: '24px', alignItems: 'start' }}>
        {/* LEADS LIST */}
        <div className="tile" style={{
          padding: 0,
          overflow: 'hidden',
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
        }}>
          {loading ? (
            <div style={{ padding: '60px', textAlign: 'center', color: '#64748B' }}>Loading leads...</div>
          ) : filteredLeads.length === 0 ? (
            <div style={{ padding: '60px', textAlign: 'center', color: '#94A3B8' }}>
              No leads match your filter criteria.
            </div>
          ) : (
            <div style={{ maxHeight: '700px', overflowY: 'auto' }}>
              {filteredLeads.map((lead) => {
                const isSelected = selectedLead?.id === lead.id;
                return (
                  <div
                    key={lead.id}
                    onClick={() => setSelectedLead(lead)}
                    style={{
                      padding: '20px 24px',
                      borderBottom: '1px solid #F1F5F9',
                      background: isSelected ? 'rgba(225, 6, 0, 0.05)' : '#FFFFFF',
                      borderLeft: isSelected ? '4px solid #E10600' : '4px solid transparent',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <div style={{ fontWeight: 800, fontSize: '16px', color: '#0F172A' }}>
                        {lead.full_name}
                      </div>
                      <span
                        className="pill"
                        style={{
                          background: lead.status === 'NEW' ? '#FEE2E2' : '#F1F5F9',
                          color: lead.status === 'NEW' ? '#DC2626' : '#475569',
                          border: lead.status === 'NEW' ? '1px solid #FECACA' : '1px solid #E2E8F0',
                          padding: '3px 10px',
                          borderRadius: '999px',
                          fontSize: '11px',
                          fontWeight: 700
                        }}
                      >
                        {lead.status}
                      </span>
                    </div>

                    <div style={{ display: 'flex', gap: '16px', marginTop: '8px', fontSize: '13px', color: '#64748B' }}>
                      <span style={{ fontWeight: 600 }}>{lead.phone}</span>
                      <span>·</span>
                      <span style={{ color: '#E10600', fontWeight: 700 }}>{lead.lead_type}</span>
                    </div>

                    <div style={{ marginTop: '8px', fontSize: '12px', color: '#94A3B8' }}>
                      Preferred: {lead.preferred_day || 'Any day'} · {lead.preferred_time || 'Any time'}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* SELECTED LEAD DETAIL & ACTION WORKFLOW */}
        {selectedLead ? (
          <div className="tile" style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            padding: '28px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{
                  color: '#E10600',
                  fontSize: '11px',
                  fontWeight: 800,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase'
                }}>
                  {selectedLead.lead_type}
                </span>
                <h3 className="disp" style={{ fontSize: '34px', margin: '4px 0 0', color: '#0F172A' }}>
                  {selectedLead.full_name}
                </h3>
              </div>
              <a
                href={`https://wa.me/${selectedLead.phone?.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(selectedLead.full_name)}%2C%20this%20is%20SWEAT%20HQ.%20Regarding%20your%20${encodeURIComponent(selectedLead.lead_type)}%20request%3A`}
                target="_blank"
                rel="noreferrer"
                className="btn"
                style={{
                  minHeight: '42px',
                  padding: '0 16px',
                  fontSize: '12px',
                  fontWeight: 700,
                  backgroundColor: '#16A34A',
                  color: '#FFFFFF',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  textDecoration: 'none'
                }}
              >
                <MessageCircle size={16} />
                <span>Chat WhatsApp</span>
              </a>
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              fontSize: '14px',
              borderTop: '1px solid #E2E8F0',
              paddingTop: '16px'
            }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Phone size={15} color="#E10600" />
                <a href={`tel:${selectedLead.phone}`} style={{ color: '#0F172A', fontWeight: 600 }}>
                  {selectedLead.phone}
                </a>
              </div>
              {selectedLead.email && (
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <Mail size={15} color="#E10600" />
                  <a href={`mailto:${selectedLead.email}`} style={{ color: '#0F172A', fontWeight: 600 }}>
                    {selectedLead.email}
                  </a>
                </div>
              )}
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', color: '#475569' }}>
                <Calendar size={15} color="#E10600" />
                <span>{selectedLead.preferred_day || 'No day specified'} at {selectedLead.preferred_time || 'Flexible'}</span>
              </div>
            </div>

            {selectedLead.notes && (
              <div style={{
                background: '#F8FAFC',
                padding: '16px',
                borderRadius: '8px',
                border: '1px solid #E2E8F0'
              }}>
                <div style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>
                  Visitor Note:
                </div>
                <div style={{ marginTop: '6px', fontSize: '14px', color: '#1E293B', lineHeight: 1.5 }}>
                  {selectedLead.notes}
                </div>
              </div>
            )}

            {successMsg && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 16px',
                background: '#DCFCE7',
                border: '1px solid #86EFAC',
                borderRadius: '6px',
                color: '#15803D',
                fontSize: '13px',
                fontWeight: 600
              }}>
                <CheckCircle2 size={16} />
                <span>{successMsg}</span>
              </div>
            )}

            <form onSubmit={handleUpdateLead} style={{ display: 'flex', flexDirection: 'column', gap: '16px', borderTop: '1px solid #E2E8F0', paddingTop: '16px' }}>
              <div className="field">
                <label style={{ color: '#475569', fontWeight: 700, fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  Lead Status
                </label>
                <select
                  value={selectedLead.status}
                  onChange={e => setSelectedLead({ ...selectedLead, status: e.target.value })}
                  style={{
                    height: '46px',
                    padding: '0 14px',
                    borderRadius: '6px',
                    border: '1.5px solid #CBD5E1',
                    background: '#FFFFFF',
                    color: '#0F172A',
                    fontSize: '14px',
                    fontWeight: 600
                  }}
                >
                  <option value="NEW">NEW (Uncontacted)</option>
                  <option value="CONTACTED">CONTACTED (Engaged)</option>
                  <option value="CONVERTED">CONVERTED (Enrolled)</option>
                  <option value="ARCHIVED">ARCHIVED (Closed)</option>
                </select>
              </div>

              <div className="field">
                <label style={{ color: '#475569', fontWeight: 700, fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  Staff Admin Notes
                </label>
                <textarea
                  rows="3"
                  value={selectedLead.admin_notes || ''}
                  onChange={e => setSelectedLead({ ...selectedLead, admin_notes: e.target.value })}
                  placeholder="e.g. Sent WhatsApp brochure, booked for Saturday 9 AM."
                  style={{
                    padding: '12px 14px',
                    borderRadius: '6px',
                    border: '1.5px solid #CBD5E1',
                    background: '#FFFFFF',
                    color: '#0F172A',
                    fontSize: '14px',
                    lineHeight: 1.5
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={updating}
                className="btn btn-red"
                style={{ minHeight: '48px', borderRadius: '6px' }}
              >
                <Save size={16} />
                <span>{updating ? 'Updating...' : 'Update Lead'}</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="tile" style={{
            padding: '60px',
            textAlign: 'center',
            color: '#64748B',
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '12px'
          }}>
            Select a lead from the list to view details and contact
          </div>
        )}
      </div>
    </div>
  );
}
