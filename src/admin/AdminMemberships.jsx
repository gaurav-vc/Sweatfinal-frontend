import React, { useState, useEffect } from 'react';
import { CreditCard, Plus, Trash2, Edit3, Save, CheckCircle2, Check } from 'lucide-react';
import apiClient from '../api/apiClient';
import { ENDPOINTS } from '../api/endpoints';

export default function AdminMemberships() {
  const [tiers, setTiers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    loadTiers();
  }, []);

  async function loadTiers() {
    setLoading(true);
    try {
      const res = await apiClient.get(ENDPOINTS.CMS.MEMBERSHIPS);
      const list = Array.isArray(res.data) ? res.data : res.data.results || [];
      setTiers(list);
    } catch (err) {
      console.error('Failed to load memberships:', err);
    } finally {
      setLoading(false);
    }
  }

  const handleNew = () => {
    setEditingItem({
      tier_name: '',
      name: '',
      slug: '',
      category: 'UNLIMITED',
      price_display: '₹18,000 / month',
      price: '₹18,000',
      duration: '1 Month',
      billing_period: 'Monthly',
      badge: 'MOST POPULAR',
      features_list: [
        'Unlimited Bootcamp & Reformer Pilates',
        'Access to Recovery Suite (Cold Plunge & Sauna)',
        'SWEAT App Full Access & Workout Logging',
        '15-Day Biometric Body Composition Assessment'
      ],
      features_text: 'Unlimited Bootcamp & Reformer Pilates\nAccess to Recovery Suite (Cold Plunge & Sauna)\nSWEAT App Full Access & Workout Logging\n15-Day Biometric Body Composition Assessment',
      is_highlighted: false,
      order: tiers.length + 1,
      is_active: true
    });
    setSuccessMsg('');
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!editingItem) return;
    setSaving(true);
    setSuccessMsg('');
    try {
      const features = editingItem.features_text
        ? editingItem.features_text.split('\n').filter(Boolean)
        : editingItem.features_list || [];

      const payload = {
        ...editingItem,
        tier_name: editingItem.tier_name || editingItem.name,
        name: editingItem.tier_name || editingItem.name,
        price_display: editingItem.price_display || editingItem.price,
        price: editingItem.price_display || editingItem.price,
        features_list: features,
        slug: editingItem.slug || (editingItem.tier_name || editingItem.name || '').toLowerCase().replace(/\s+/g, '-')
      };

      if (editingItem.id) {
        await apiClient.put(`${ENDPOINTS.CMS.MEMBERSHIPS}${editingItem.id}/`, payload);
      } else {
        await apiClient.post(ENDPOINTS.CMS.MEMBERSHIPS, payload);
      }
      setSuccessMsg('Membership tier saved successfully!');
      setEditingItem(null);
      loadTiers();
    } catch (err) {
      alert('Error saving tier: ' + (err.response?.data?.detail || err.message));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this membership tier?')) return;
    try {
      await apiClient.delete(`${ENDPOINTS.CMS.MEMBERSHIPS}${id}/`);
      setTiers(tiers.filter(t => t.id !== id));
      if (editingItem?.id === id) setEditingItem(null);
    } catch (err) {
      alert('Error deleting tier: ' + err.message);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 className="disp" style={{ fontSize: '44px', margin: 0, color: '#0F172A' }}>MEMBERSHIP TIERS & PACKS</h1>
          <p style={{ margin: '4px 0 0', color: '#64748B', fontSize: '14px' }}>
            Set real-time pricing, duration packs and included benefits shown on the public site
          </p>
        </div>
        <button
          onClick={handleNew}
          className="btn btn-red"
          style={{ minHeight: '44px', fontSize: '13px', borderRadius: '6px' }}
        >
          <Plus size={16} color="#000000" strokeWidth={2.5} style={{ stroke: '#000000' }} />
          <span>Add Membership Tier</span>
        </button>
      </div>

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

      {/* EDIT / CREATE FORM TILE (WHITE & RED) */}
      {editingItem && (
        <form onSubmit={handleSave} className="tile" style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          border: '1.5px solid #E10600',
          background: '#FFFFFF',
          borderRadius: '12px',
          padding: '32px',
          boxShadow: '0 4px 20px rgba(225, 6, 0, 0.08)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 className="disp" style={{ fontSize: '28px', margin: 0, color: '#E10600' }}>
              {editingItem.id ? 'EDIT MEMBERSHIP TIER' : 'NEW MEMBERSHIP TIER'}
            </h3>
            <button
              type="button"
              onClick={() => setEditingItem(null)}
              style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', fontWeight: 600 }}
            >
              Cancel
            </button>
          </div>

          <div className="grid3">
            <div className="field">
              <label>Tier Name</label>
              <input
                type="text"
                required
                value={editingItem.tier_name || editingItem.name || ''}
                onChange={e => setEditingItem({ ...editingItem, tier_name: e.target.value, name: e.target.value })}
                placeholder="e.g. ALL-ACCESS UNLIMITED"
              />
            </div>
            <div className="field">
              <label>Price Display</label>
              <input
                type="text"
                required
                value={editingItem.price_display || editingItem.price || ''}
                onChange={e => setEditingItem({ ...editingItem, price_display: e.target.value, price: e.target.value })}
                placeholder="e.g. ₹18,000 / month"
              />
            </div>
            <div className="field">
              <label>Badge / Highlight Tag</label>
              <input
                type="text"
                value={editingItem.badge || ''}
                onChange={e => setEditingItem({ ...editingItem, badge: e.target.value })}
                placeholder="e.g. MOST POPULAR"
              />
            </div>
          </div>

          <div className="field">
            <label>Features & Inclusions (One per line)</label>
            <textarea
              rows="5"
              value={editingItem.features_text || (Array.isArray(editingItem.features_list) ? editingItem.features_list.join('\n') : '')}
              onChange={e => setEditingItem({ ...editingItem, features_text: e.target.value })}
              placeholder="Unlimited Bootcamp & Pilates&#10;Access to Recovery suite&#10;SWEAT app access included"
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            <button type="button" onClick={() => setEditingItem(null)} className="btn btn-ghost" style={{ borderRadius: '6px' }}>
              Cancel
            </button>
            <button type="submit" disabled={saving} className="btn btn-red" style={{ minWidth: '180px', borderRadius: '6px' }}>
              <Save size={16} />
              <span>{saving ? 'Saving...' : 'Save Membership Tier'}</span>
            </button>
          </div>
        </form>
      )}

      {/* MEMBERSHIP TIERS GRID (WHITE & RED) */}
      {loading ? (
        <div style={{ padding: '60px', textAlign: 'center', color: '#64748B' }}>Loading membership tiers...</div>
      ) : tiers.length === 0 ? (
        <div className="tile" style={{ textAlign: 'center', padding: '60px', color: '#94A3B8' }}>
          No membership tiers configured yet. Click "+ Add Membership Tier" to create one!
        </div>
      ) : (
        <div className="grid3">
          {tiers.map(t => {
            const name = t.tier_name || t.name;
            const price = t.price_display || t.price;
            const features = Array.isArray(t.features_list) ? t.features_list : Array.isArray(t.features) ? t.features : [];

            return (
              <div
                key={t.id}
                className="tile"
                style={{
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '12px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h4 style={{ margin: 0, fontSize: '22px', color: '#0F172A', fontWeight: 800 }}>
                    {name}
                  </h4>
                  {t.badge && (
                    <span className="pill" style={{ background: '#FEE2E2', color: '#DC2626', border: '1px solid #FECACA' }}>
                      {t.badge}
                    </span>
                  )}
                </div>

                <div className="disp" style={{ fontSize: '48px', color: '#E10600', margin: '4px 0' }}>
                  {price}
                </div>

                <ul style={{ margin: '8px 0', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {features.map((f, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', color: '#334155' }}>
                      <Check size={14} color="#E10600" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 'auto',
                  borderTop: '1px solid #F1F5F9',
                  paddingTop: '14px'
                }}>
                  <button
                    onClick={() => {
                      setEditingItem({
                        ...t,
                        features_text: features.join('\n')
                      });
                    }}
                    style={{ background: 'none', border: 'none', color: '#0F172A', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600, fontSize: '13px' }}
                  >
                    <Edit3 size={14} color="#E10600" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(t.id)}
                    style={{ background: 'none', border: 'none', color: '#DC2626', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600, fontSize: '13px' }}
                  >
                    <Trash2 size={14} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
