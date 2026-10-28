import React, { useState, useEffect } from 'react';
import { Users, Plus, Trash2, Edit3, Save, Upload, CheckCircle2, Maximize2 } from 'lucide-react';
import apiClient from '../api/apiClient';
import { ENDPOINTS } from '../api/endpoints';
import mediaApi from '../api/mediaApi';

export default function AdminTeam() {
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [detectedDim, setDetectedDim] = useState('');

  useEffect(() => {
    loadCoaches();
  }, []);

  async function loadCoaches() {
    setLoading(true);
    try {
      const res = await apiClient.get(ENDPOINTS.CMS.COACHES);
      const list = Array.isArray(res.data) ? res.data : res.data.results || [];
      setCoaches(list);
    } catch (err) {
      console.error('Failed to load coaches:', err);
    } finally {
      setLoading(false);
    }
  }

  const handleNew = () => {
    setEditingItem({
      name: '',
      role_title: '',
      title: '',
      celebrities_trained: '',
      specialties: ['Olympic Lifting', 'Conditioning'],
      specialty: 'Olympic Lifting · Conditioning',
      bio: '',
      photo: '',
      photo_url: '',
      display_order: coaches.length + 1,
      is_active: true
    });
    setDetectedDim('');
    setSuccessMsg('');
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const res = await mediaApi.uploadFile(file, `coach_${file.name}`);
      const fileUrl = res.file_url || res.file;
      setEditingItem(prev => ({
        ...prev,
        photo: fileUrl,
        photo_url: fileUrl
      }));
      setSuccessMsg('Coach photo uploaded successfully!');
    } catch (err) {
      alert('Failed to upload coach photo.');
    } finally {
      setUploading(false);
    }
  };

  const handleRemovePhoto = () => {
    if (!window.confirm('Remove coach profile photo?')) return;
    setEditingItem(prev => ({
      ...prev,
      photo: '',
      photo_url: ''
    }));
    setDetectedDim('');
    setSuccessMsg('Coach photo removed.');
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!editingItem) return;
    setSaving(true);
    setSuccessMsg('');
    try {
      const payload = {
        ...editingItem,
        role_title: editingItem.role_title || editingItem.title,
        title: editingItem.role_title || editingItem.title,
        photo_url: editingItem.photo || editingItem.photo_url,
      };

      if (editingItem.id) {
        await apiClient.put(`${ENDPOINTS.CMS.COACHES}${editingItem.id}/`, payload);
      } else {
        await apiClient.post(ENDPOINTS.CMS.COACHES, payload);
      }
      setSuccessMsg('Coach profile saved successfully!');
      setEditingItem(null);
      loadCoaches();
    } catch (err) {
      alert('Error saving coach profile: ' + (err.response?.data?.detail || err.message));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this coach profile?')) return;
    try {
      await apiClient.delete(`${ENDPOINTS.CMS.COACHES}${id}/`);
      setCoaches(coaches.filter(c => c.id !== id));
      if (editingItem?.id === id) setEditingItem(null);
    } catch (err) {
      alert('Error deleting coach profile: ' + err.message);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 className="disp" style={{ fontSize: '44px', margin: 0, color: '#0F172A' }}>COACHES & LEADERSHIP TEAM</h1>
          <p style={{ margin: '4px 0 0', color: '#64748B', fontSize: '14px' }}>
            The elite coaching staff and master trainers behind SWEAT HQ
          </p>
        </div>
        <button
          onClick={handleNew}
          className="btn btn-red"
          style={{ minHeight: '44px', fontSize: '13px', borderRadius: '6px' }}
        >
          <Plus size={16} color="#000000" strokeWidth={2.5} style={{ stroke: '#000000' }} />
          <span>Add Coach Profile</span>
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
              {editingItem.id ? 'EDIT COACH PROFILE' : 'NEW COACH PROFILE'}
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
              <label>Coach Full Name</label>
              <input
                type="text"
                required
                value={editingItem.name || ''}
                onChange={e => setEditingItem({ ...editingItem, name: e.target.value })}
                placeholder="e.g. Shivoham"
              />
            </div>
            <div className="field">
              <label>Role / Title</label>
              <input
                type="text"
                required
                value={editingItem.role_title || editingItem.title || ''}
                onChange={e => setEditingItem({ ...editingItem, role_title: e.target.value, title: e.target.value })}
                placeholder="e.g. Founder & Head Coach"
              />
            </div>
            <div className="field">
              <label>Celebrities Trained</label>
              <input
                type="text"
                value={editingItem.celebrities_trained || ''}
                onChange={e => setEditingItem({ ...editingItem, celebrities_trained: e.target.value })}
                placeholder="e.g. Aamir Khan, Ranbir Kapoor, Jacqueline"
              />
            </div>
          </div>

          <div className="grid2">
            <div className="field">
              <label>Specialties</label>
              <input
                type="text"
                value={editingItem.specialty || ''}
                onChange={e => setEditingItem({ ...editingItem, specialty: e.target.value })}
                placeholder="e.g. Olympic Weightlifting · CrossFit · Conditioning"
              />
            </div>
            <div className="field">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label>Photo URL / Upload</label>
                <span style={{ fontSize: '11px', color: '#64748B' }}>
                  Rec: 800×1000 px (4:5) · &lt; 3MB
                </span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  value={editingItem.photo || editingItem.photo_url || ''}
                  onChange={e => setEditingItem({ ...editingItem, photo: e.target.value, photo_url: e.target.value })}
                  placeholder="https://... /coach.jpg"
                  style={{ flex: 1 }}
                />
                <label className="btn btn-ghost" style={{ cursor: 'pointer', padding: '0 14px', minHeight: '46px', borderRadius: '6px' }}>
                  <Upload size={14} color="#E10600" />
                  <span style={{ fontSize: '12px' }}>{uploading ? '...' : 'Upload'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    style={{ display: 'none' }}
                  />
                </label>
                {(editingItem.photo || editingItem.photo_url) && (
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="btn"
                    title="Remove coach photo"
                    style={{
                      background: '#FEF2F2',
                      border: '1px solid #FCA5A5',
                      color: '#DC2626',
                      padding: '0 12px',
                      borderRadius: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '12px',
                      fontWeight: 700
                    }}
                  >
                    <Trash2 size={13} />
                    <span>Remove</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {(editingItem.photo || editingItem.photo_url) && (
            <div style={{
              maxWidth: '220px',
              padding: '12px',
              background: '#F8FAFC',
              borderRadius: '8px',
              border: '1px solid #E2E8F0',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#0F172A', textTransform: 'uppercase' }}>
                  Photo Preview:
                </span>
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  style={{ background: 'none', border: 'none', color: '#DC2626', cursor: 'pointer', fontSize: '11px', fontWeight: 700 }}
                >
                  Remove
                </button>
              </div>
              <img
                src={editingItem.photo || editingItem.photo_url}
                alt="Coach preview"
                onLoad={e => setDetectedDim(`${e.target.naturalWidth} × ${e.target.naturalHeight} px`)}
                style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #CBD5E1' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px' }}>
                {detectedDim && (
                  <span className="pill" style={{ background: '#E0F2FE', color: '#0369A1', border: '1px solid #BAE6FD', fontWeight: 700 }}>
                    Detected: {detectedDim}
                  </span>
                )}
                <span style={{ color: '#64748B' }}>Rec: 800×1000</span>
              </div>
            </div>
          )}

          <div className="field">
            <label>Biography & Credentials</label>
            <textarea
              rows="3"
              value={editingItem.bio || ''}
              onChange={e => setEditingItem({ ...editingItem, bio: e.target.value })}
              placeholder="e.g. Pioneer of functional fitness in India. Over 15 years coaching Bollywood elite..."
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            <button type="button" onClick={() => setEditingItem(null)} className="btn btn-ghost" style={{ borderRadius: '6px' }}>
              Cancel
            </button>
            <button type="submit" disabled={saving || uploading} className="btn btn-red" style={{ minWidth: '180px', borderRadius: '6px' }}>
              <Save size={16} />
              <span>{saving ? 'Saving...' : 'Save Profile'}</span>
            </button>
          </div>
        </form>
      )}

      {/* COACH CARDS GRID (WHITE & RED) */}
      {loading ? (
        <div style={{ padding: '60px', textAlign: 'center', color: '#64748B' }}>Loading team members...</div>
      ) : coaches.length === 0 ? (
        <div className="tile" style={{ textAlign: 'center', padding: '60px', color: '#94A3B8' }}>
          No coaches created yet. Click "+ Add Coach Profile" to list your staff!
        </div>
      ) : (
        <div className="grid4">
          {coaches.map(coach => {
            const photoSrc = coach.photo || coach.photo_url;
            return (
              <div
                key={coach.id}
                className="tile"
                style={{
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '12px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                }}
              >
                <div className="shot" style={{ height: '300px', borderRadius: '8px', overflow: 'hidden' }}>
                  {photoSrc ? (
                    <img
                      src={photoSrc}
                      alt={coach.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <div style={{ padding: '20px', textAlign: 'center' }}>
                      <b style={{ color: '#0F172A', fontSize: '18px' }}>{coach.name}</b>
                      <div style={{ color: '#64748B', fontSize: '12px', marginTop: '4px' }}>{coach.role_title || coach.title}</div>
                    </div>
                  )}
                </div>

                <div>
                  <h4 style={{ margin: 0, fontSize: '18px', color: '#0F172A', fontWeight: 800 }}>
                    {coach.name}
                  </h4>
                  <div style={{ fontSize: '12px', color: '#E10600', marginTop: '2px', fontWeight: 700 }}>
                    {coach.role_title || coach.title}
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>
                    {coach.specialties?.join(' · ') || coach.specialty || coach.celebrities_trained}
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 'auto',
                  borderTop: '1px solid #F1F5F9',
                  paddingTop: '12px'
                }}>
                  <button
                    onClick={() => { setEditingItem(coach); setDetectedDim(''); }}
                    style={{ background: 'none', border: 'none', color: '#0F172A', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600, fontSize: '13px' }}
                  >
                    <Edit3 size={14} color="#E10600" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(coach.id)}
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
