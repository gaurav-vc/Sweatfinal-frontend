import React, { useState, useEffect } from 'react';
import { Users, Plus, Trash2, Edit3, Save, Upload, CheckCircle2, Maximize2, Image as ImageIcon, Film } from 'lucide-react';
import apiClient from '../api/apiClient';
import { ENDPOINTS } from '../api/endpoints';
import mediaApi from '../api/mediaApi';
import { resolveMediaUrl, isVideoMedia } from '../utils/mediaUrl';

export default function AdminTeam() {
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadingCardId, setUploadingCardId] = useState(null);
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

  const handleMediaUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setSuccessMsg('');
    try {
      const res = await mediaApi.uploadFile(file, `coach_${file.name}`);
      const fileUrl = res.file_url || res.file;
      const isVideo = (file.type && file.type.startsWith('video/')) || isVideoMedia(fileUrl);
      setEditingItem(prev => ({
        ...prev,
        photo: fileUrl,
        photo_url: fileUrl
      }));
      setSuccessMsg(`Coach ${isVideo ? 'video' : 'photo'} uploaded successfully!`);
    } catch (err) {
      alert('Failed to upload coach media: ' + (err.response?.data?.detail || err.message));
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  // Direct 1-click upload directly on any coach card in the list
  const handleDirectCardUpload = async (e, coach) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingCardId(coach.id);
    setSuccessMsg('');
    try {
      const res = await mediaApi.uploadFile(file, `coach_${file.name}`);
      const fileUrl = res.file_url || res.file;
      const isVideo = (file.type && file.type.startsWith('video/')) || isVideoMedia(fileUrl);
      const payload = {
        ...coach,
        name: coach.name,
        role_title: coach.role_title || coach.title,
        title: coach.role_title || coach.title,
        photo: fileUrl,
        photo_url: fileUrl,
      };
      await apiClient.put(`${ENDPOINTS.CMS.COACHES}${coach.id}/`, payload);
      setCoaches(prev => prev.map(c => c.id === coach.id ? { ...c, ...payload } : c));
      setSuccessMsg(`"${file.name}" uploaded and saved for Coach ${coach.name} in real time!`);
    } catch (err) {
      alert('Failed to upload media: ' + (err.response?.data?.detail || err.message));
    } finally {
      setUploadingCardId(null);
      e.target.value = '';
    }
  };

  // Direct 1-click remove directly on any coach card in the list
  const handleDirectCardRemove = async (coach) => {
    if (!window.confirm(`Remove media for Coach ${coach.name}?`)) return;
    try {
      const payload = {
        ...coach,
        name: coach.name,
        role_title: coach.role_title || coach.title,
        title: coach.role_title || coach.title,
        photo: '',
        photo_url: '',
      };
      await apiClient.put(`${ENDPOINTS.CMS.COACHES}${coach.id}/`, payload);
      setCoaches(prev => prev.map(c => c.id === coach.id ? { ...c, ...payload } : c));
      setSuccessMsg(`Media removed for Coach ${coach.name}.`);
    } catch (err) {
      alert('Failed to remove media: ' + (err.response?.data?.detail || err.message));
    }
  };

  const handleRemovePhoto = () => {
    if (!window.confirm('Remove coach profile media?')) return;
    setEditingItem(prev => ({
      ...prev,
      photo: '',
      photo_url: ''
    }));
    setDetectedDim('');
    setSuccessMsg('Coach media removed.');
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
      alert('Error saving coach: ' + (err.response?.data?.detail || err.message));
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
      alert('Error deleting coach: ' + err.message);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 className="disp" style={{ fontSize: '44px', margin: 0, color: '#0F172A' }}>COACHES &amp; LEADERSHIP TEAM</h1>
          <p style={{ margin: '4px 0 0', color: '#64748B', fontSize: '14px' }}>
            The elite coaching staff and master trainers behind SWEAT HQ (supports Photos and Videos)
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

          <div className="grid2">
            <div className="field">
              <label>Coach Full Name</label>
              <input
                type="text"
                required
                value={editingItem.name || ''}
                onChange={e => setEditingItem({ ...editingItem, name: e.target.value })}
                placeholder="e.g. Praveen Nair"
              />
            </div>
            <div className="field">
              <label>Display Order Priority</label>
              <input
                type="number"
                value={editingItem.display_order || 1}
                onChange={e => setEditingItem({ ...editingItem, display_order: parseInt(e.target.value) || 1 })}
                placeholder="e.g. 1"
              />
            </div>
          </div>

          <div className="grid2">
            <div className="field">
              <label>Role / Title</label>
              <input
                type="text"
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
                <label>Media URL / Upload (Photo or Video)</label>
                <span style={{ fontSize: '11px', color: '#64748B' }}>
                  Rec: 800×1000 px (4:5)
                </span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  value={editingItem.photo || editingItem.photo_url || ''}
                  onChange={e => setEditingItem({ ...editingItem, photo: e.target.value, photo_url: e.target.value })}
                  placeholder="https://... /coach.jpg or .mp4"
                  style={{ flex: 1 }}
                />
                <label className="btn btn-ghost" style={{ cursor: 'pointer', padding: '0 14px', minHeight: '46px', borderRadius: '6px' }}>
                  <Upload size={14} color="#E10600" />
                  <span style={{ fontSize: '12px' }}>{uploading ? '...' : 'Upload'}</span>
                  <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleMediaUpload}
                    style={{ display: 'none' }}
                  />
                </label>
                {(editingItem.photo || editingItem.photo_url) && (
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="btn"
                    title="Remove coach media"
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
              gap: '6px'
            }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#0F172A', textTransform: 'uppercase' }}>
                {isVideoMedia(editingItem.photo || editingItem.photo_url) ? 'Video Preview:' : 'Photo Preview:'}
              </span>
              <div style={{ height: '240px', borderRadius: '6px', overflow: 'hidden', background: '#000' }}>
                {isVideoMedia(editingItem.photo || editingItem.photo_url) ? (
                  <video
                    src={resolveMediaUrl(editingItem.photo || editingItem.photo_url)}
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <img
                    src={resolveMediaUrl(editingItem.photo || editingItem.photo_url)}
                    alt="Coach preview"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                )}
              </div>
            </div>
          )}

          <div className="field">
            <label>Biography &amp; Coaching Philosophy</label>
            <textarea
              rows="4"
              value={editingItem.bio || ''}
              onChange={e => setEditingItem({ ...editingItem, bio: e.target.value })}
              placeholder="Detailed background, star transformations coached, and coaching style..."
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            <button type="button" onClick={() => setEditingItem(null)} className="btn btn-ghost" style={{ borderRadius: '6px' }}>
              Cancel
            </button>
            <button type="submit" disabled={saving || uploading} className="btn btn-red" style={{ minWidth: '180px', borderRadius: '6px' }}>
              <Save size={16} />
              <span>{saving ? 'Saving...' : 'Save Coach Profile'}</span>
            </button>
          </div>
        </form>
      )}

      {/* LIST OF COACHES (WHITE & RED CARDS WITH INSTANT UPLOAD OPTION) */}
      {loading ? (
        <div style={{ padding: '60px', textAlign: 'center', color: '#64748B' }}>Loading coaches...</div>
      ) : coaches.length === 0 ? (
        <div className="tile" style={{ textAlign: 'center', padding: '60px', color: '#94A3B8' }}>
          No coaches listed yet. Click "+ Add Coach Profile" to list your first trainer!
        </div>
      ) : (
        <div className="grid4">
          {coaches.map(coach => {
            const photoSrc = coach.photo || coach.photo_url;
            const isVideo = isVideoMedia(photoSrc);

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
                <div
                  className="shot"
                  style={{
                    height: '300px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    background: '#F8FAFC',
                    position: 'relative'
                  }}
                >
                  {photoSrc ? (
                    isVideo ? (
                      <video
                        src={resolveMediaUrl(photoSrc)}
                        autoPlay
                        loop
                        muted
                        playsInline
                        controls
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <img
                        src={resolveMediaUrl(photoSrc)}
                        alt={coach.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    )
                  ) : (
                    <div style={{
                      padding: '20px',
                      textAlign: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100%'
                    }}>
                      <b style={{ color: '#0F172A', fontSize: '18px' }}>{coach.name}</b>
                      <div style={{ color: '#64748B', fontSize: '12px', marginTop: '4px' }}>
                        {coach.role_title || coach.title}
                      </div>

                      {/* Direct 1-Click Upload Photo or Video button on card */}
                      <label
                        className="btn btn-red"
                        style={{
                          cursor: 'pointer',
                          padding: '8px 16px',
                          borderRadius: '8px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontSize: '12px',
                          fontWeight: 700,
                          marginTop: '16px',
                          minHeight: '38px',
                          boxShadow: '0 2px 8px rgba(225, 6, 0, 0.25)'
                        }}
                      >
                        <Upload size={14} color="#000000" strokeWidth={2.5} style={{ stroke: '#000000' }} />
                        <span>{uploadingCardId === coach.id ? 'Uploading...' : 'Upload Photo / Video'}</span>
                        <input
                          type="file"
                          accept="image/*,video/*"
                          onChange={e => handleDirectCardUpload(e, coach)}
                          style={{ display: 'none' }}
                        />
                      </label>
                    </div>
                  )}

                  {/* If media exists, provide quick replace and remove buttons directly on card */}
                  {photoSrc && (
                    <div style={{
                      position: 'absolute',
                      top: '8px',
                      right: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      zIndex: 2
                    }}>
                      <label
                        title="Replace Photo or Video"
                        style={{
                          background: 'rgba(0,0,0,0.7)',
                          color: '#FFF',
                          borderRadius: '6px',
                          padding: '6px 10px',
                          fontSize: '11px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          backdropFilter: 'blur(4px)'
                        }}
                      >
                        <Upload size={12} color="#FFF" />
                        <span>{uploadingCardId === coach.id ? '...' : 'Replace'}</span>
                        <input
                          type="file"
                          accept="image/*,video/*"
                          onChange={e => handleDirectCardUpload(e, coach)}
                          style={{ display: 'none' }}
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() => handleDirectCardRemove(coach)}
                        title="Remove media for this coach"
                        style={{
                          background: 'rgba(220, 38, 38, 0.85)',
                          color: '#FFF',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '6px 10px',
                          fontSize: '11px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          backdropFilter: 'blur(4px)'
                        }}
                      >
                        <Trash2 size={12} color="#FFF" />
                        <span>Remove</span>
                      </button>
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
