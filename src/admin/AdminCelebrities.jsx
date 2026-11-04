import React, { useState, useEffect } from 'react';
import { Video, Plus, Trash2, Edit3, Save, Upload, CheckCircle2, Maximize2, Image as ImageIcon, Film } from 'lucide-react';
import apiClient from '../api/apiClient';
import { ENDPOINTS } from '../api/endpoints';
import mediaApi from '../api/mediaApi';
import { resolveMediaUrl, isVideoMedia } from '../utils/mediaUrl';

export default function AdminCelebrities() {
  const [celebrities, setCelebrities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadingCardId, setUploadingCardId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [detectedDim, setDetectedDim] = useState('');

  useEffect(() => {
    loadCelebrities();
  }, []);

  async function loadCelebrities() {
    setLoading(true);
    try {
      const res = await apiClient.get(ENDPOINTS.CMS.CELEBRITIES);
      const list = Array.isArray(res.data) ? res.data : res.data.results || [];
      setCelebrities(list);
    } catch (err) {
      console.error('Failed to load celebrities:', err);
    } finally {
      setLoading(false);
    }
  }

  const handleNew = () => {
    setEditingItem({
      star_name: '',
      name: '',
      quote: '',
      video_url: '',
      video_reel_url: '',
      thumbnail: '',
      aspect_ratio: '9:16',
      duration_label: '30 to 60s · vertical',
      display_order: celebrities.length + 1,
      is_active: true
    });
    setDetectedDim('');
    setSuccessMsg('');
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!editingItem) return;
    setSaving(true);
    setSuccessMsg('');
    try {
      const payload = {
        ...editingItem,
        star_name: editingItem.star_name || editingItem.name,
        name: editingItem.star_name || editingItem.name,
        video_url: editingItem.video_url || editingItem.video_reel_url,
      };
      if (editingItem.id) {
        await apiClient.put(`${ENDPOINTS.CMS.CELEBRITIES}${editingItem.id}/`, payload);
      } else {
        await apiClient.post(ENDPOINTS.CMS.CELEBRITIES, payload);
      }
      setSuccessMsg('Celebrity card saved successfully!');
      setEditingItem(null);
      loadCelebrities();
    } catch (err) {
      alert('Error saving celebrity: ' + (err.response?.data?.detail || err.message));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this celebrity card?')) return;
    try {
      await apiClient.delete(`${ENDPOINTS.CMS.CELEBRITIES}${id}/`);
      setCelebrities(celebrities.filter(c => c.id !== id));
      if (editingItem?.id === id) setEditingItem(null);
    } catch (err) {
      alert('Error deleting celebrity: ' + err.message);
    }
  };

  // Upload either photo or video inside the edit form
  const handleMediaUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setSuccessMsg('');
    try {
      const res = await mediaApi.uploadFile(file, `celebrity_${file.name}`);
      const fileUrl = res.file_url || res.file;
      const isVideo = (file.type && file.type.startsWith('video/')) || isVideoMedia(fileUrl);
      setEditingItem(prev => ({
        ...prev,
        video_reel_url: fileUrl,
        video_url: fileUrl,
        thumbnail: !isVideo ? fileUrl : (prev.thumbnail || fileUrl),
      }));
      setSuccessMsg(`${isVideo ? 'Video reel' : 'Photo'} uploaded successfully!`);
    } catch (err) {
      alert('Failed to upload media: ' + (err.response?.data?.detail || err.message));
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  // Direct 1-click upload directly on any card in the list
  const handleDirectCardUpload = async (e, item) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingCardId(item.id);
    setSuccessMsg('');
    try {
      const res = await mediaApi.uploadFile(file, `celebrity_${file.name}`);
      const fileUrl = res.file_url || res.file;
      const isVideo = (file.type && file.type.startsWith('video/')) || isVideoMedia(fileUrl);
      const payload = {
        ...item,
        star_name: item.star_name || item.name,
        name: item.star_name || item.name,
        video_url: fileUrl,
        video_reel_url: fileUrl,
        thumbnail: !isVideo ? fileUrl : (item.thumbnail || fileUrl),
      };
      await apiClient.put(`${ENDPOINTS.CMS.CELEBRITIES}${item.id}/`, payload);
      setCelebrities(prev => prev.map(c => c.id === item.id ? { ...c, ...payload } : c));
      setSuccessMsg(`"${file.name}" uploaded and saved for ${item.star_name || item.name} in real time!`);
    } catch (err) {
      alert('Failed to upload media: ' + (err.response?.data?.detail || err.message));
    } finally {
      setUploadingCardId(null);
      e.target.value = '';
    }
  };

  // Direct 1-click remove directly on any card in the list
  const handleDirectCardRemove = async (item) => {
    if (!window.confirm(`Remove media from ${item.star_name || item.name}?`)) return;
    try {
      const payload = {
        ...item,
        star_name: item.star_name || item.name,
        name: item.star_name || item.name,
        video_url: '',
        video_reel_url: '',
        thumbnail: '',
        video_file: null
      };
      await apiClient.put(`${ENDPOINTS.CMS.CELEBRITIES}${item.id}/`, payload);
      setCelebrities(prev => prev.map(c => c.id === item.id ? { ...c, ...payload } : c));
      setSuccessMsg(`Media removed from ${item.star_name || item.name}.`);
    } catch (err) {
      alert('Failed to remove media: ' + (err.response?.data?.detail || err.message));
    }
  };

  const handleRemoveMedia = () => {
    if (!window.confirm('Remove media from this celebrity card?')) return;
    setEditingItem(prev => ({
      ...prev,
      video_reel_url: '',
      video_url: '',
      thumbnail: '',
      video_file: null
    }));
    setDetectedDim('');
    setSuccessMsg('Media removed.');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 className="disp" style={{ fontSize: '44px', margin: 0, color: '#0F172A' }}>
            CELEBRITY REELS &amp; TESTIMONIALS
          </h1>
          <p style={{ margin: '4px 0 0', color: '#64748B', fontSize: '14px' }}>
            9:16 vertical video stories and quote cards appearing on the public Home page (supports both Photos and Videos)
          </p>
        </div>
        <button
          onClick={handleNew}
          className="btn btn-red"
          style={{ minHeight: '44px', fontSize: '13px', borderRadius: '6px' }}
        >
          <Plus size={16} color="#000000" strokeWidth={2.5} style={{ stroke: '#000000' }} />
          <span>Add Celebrity Card</span>
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
              {editingItem.id ? 'EDIT CELEBRITY CARD' : 'NEW CELEBRITY CARD'}
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
              <label>Celebrity / Star Name</label>
              <input
                type="text"
                required
                value={editingItem.star_name || editingItem.name || ''}
                onChange={e => setEditingItem({ ...editingItem, star_name: e.target.value, name: e.target.value })}
                placeholder="e.g. Shraddha Kapoor"
              />
            </div>
            <div className="field">
              <label>Tagline / Duration Label</label>
              <input
                type="text"
                value={editingItem.duration_label || '30 to 60s · vertical'}
                onChange={e => setEditingItem({ ...editingItem, duration_label: e.target.value })}
                placeholder="e.g. 30 to 60s · vertical"
              />
            </div>
          </div>

          <div className="field">
            <label>Quote / Testimonial</label>
            <textarea
              rows="3"
              value={editingItem.quote || ''}
              onChange={e => setEditingItem({ ...editingItem, quote: e.target.value })}
              placeholder="e.g. SWEAT gave me the conditioning and athletic strength I needed for demanding multi-week shoot schedules..."
            />
          </div>

          {/* DYNAMIC MEDIA UPLOAD SECTION: ACCEPTS PHOTO OR VIDEO */}
          <div style={{
            borderTop: '1px solid #E2E8F0',
            paddingTop: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <h4 style={{ margin: 0, fontSize: '15px', color: '#0F172A', fontWeight: 800 }}>
                  Media Asset (Photo or Video Reel)
                </h4>
                <p style={{ margin: '2px 0 0', color: '#64748B', fontSize: '13px' }}>
                  Upload either a portrait photo or full 9:16 vertical video reel of the celebrity
                </p>
              </div>

              {/* RECOMMENDED DIMENSIONS BADGE */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#FEF2F2',
                border: '1px solid #FECACA',
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: 700,
                color: '#991B1B'
              }}>
                <Maximize2 size={14} color="#E10600" />
                <span>Recommended: <strong>1080 × 1920 px</strong> (9:16 Portrait / Vertical)</span>
              </div>
            </div>

            <div style={{
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '8px',
              padding: '10px 14px',
              fontSize: '12px',
              color: '#475569',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '8px'
            }}>
              <span><strong>Supported Formats:</strong> Photos (JPG, PNG, WebP) or Videos (MP4, WebM, MOV)</span>
              <span className="pill" style={{ background: '#FFFFFF', border: '1px solid #CBD5E1', color: '#0F172A', fontWeight: 600 }}>
                Aspect Ratio: 9:16 Vertical
              </span>
            </div>

            <div className="grid2">
              <div className="field">
                <label>Media Direct URL (Photo or Video)</label>
                <input
                  type="text"
                  value={editingItem.video_reel_url || editingItem.video_url || editingItem.thumbnail || ''}
                  onChange={e => setEditingItem({ ...editingItem, video_reel_url: e.target.value, video_url: e.target.value })}
                  placeholder="https://... /photo.jpg or /reel.mp4"
                />
              </div>
              <div className="field">
                <label>Upload Photo or Video File</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <label className="btn btn-ghost" style={{
                    cursor: 'pointer',
                    minHeight: '48px',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    flex: 1
                  }}>
                    <Upload size={16} color="#E10600" />
                    <span>{uploading ? 'Uploading Media...' : 'Choose Photo or Video to Upload'}</span>
                    <input
                      type="file"
                      accept="image/*,video/*"
                      onChange={handleMediaUpload}
                      style={{ display: 'none' }}
                    />
                  </label>
                  {(editingItem.video_reel_url || editingItem.video_url || editingItem.thumbnail) && (
                    <button
                      type="button"
                      onClick={handleRemoveMedia}
                      className="btn"
                      style={{
                        background: '#FEF2F2',
                        border: '1px solid #FCA5A5',
                        color: '#DC2626',
                        minHeight: '48px',
                        padding: '0 14px',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '12px',
                        fontWeight: 700
                      }}
                    >
                      <Trash2 size={14} />
                      <span>Remove</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* LIVE PREVIEW (AUTOMATICALLY RENDERS VIDEO OR PHOTO) */}
            {(editingItem.video_reel_url || editingItem.video_url || editingItem.thumbnail) && (
              <div style={{
                marginTop: '8px',
                padding: '14px',
                background: '#F8FAFC',
                borderRadius: '8px',
                border: '1px solid #E2E8F0',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {isVideoMedia(editingItem.video_reel_url || editingItem.video_url) ? (
                      <Film size={14} color="#E10600" />
                    ) : (
                      <ImageIcon size={14} color="#E10600" />
                    )}
                    <span style={{ fontSize: '11px', fontWeight: 800, color: '#0F172A', textTransform: 'uppercase' }}>
                      {isVideoMedia(editingItem.video_reel_url || editingItem.video_url) ? 'Video Reel Preview:' : 'Photo Preview:'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveMedia}
                    style={{ background: 'none', border: 'none', color: '#DC2626', cursor: 'pointer', fontSize: '11px', fontWeight: 700 }}
                  >
                    Remove
                  </button>
                </div>

                <div style={{
                  maxWidth: '220px',
                  height: '340px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  background: '#000000',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}>
                  {isVideoMedia(editingItem.video_reel_url || editingItem.video_url) ? (
                    <video
                      src={resolveMediaUrl(editingItem.video_reel_url || editingItem.video_url)}
                      controls
                      autoPlay
                      muted
                      loop
                      playsInline
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <img
                      src={resolveMediaUrl(editingItem.video_reel_url || editingItem.video_url || editingItem.thumbnail)}
                      alt="Celebrity preview"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  )}
                </div>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            <button type="button" onClick={() => setEditingItem(null)} className="btn btn-ghost" style={{ borderRadius: '6px' }}>
              Cancel
            </button>
            <button type="submit" disabled={saving || uploading} className="btn btn-red" style={{ minWidth: '180px', borderRadius: '6px' }}>
              <Save size={16} />
              <span>{saving ? 'Saving...' : 'Save Celebrity Card'}</span>
            </button>
          </div>
        </form>
      )}

      {/* LIST OF CARDS (WHITE & RED CARDS WITH INSTANT UPLOAD OPTION) */}
      {loading ? (
        <div style={{ padding: '60px', textAlign: 'center', color: '#64748B' }}>Loading celebrity cards...</div>
      ) : celebrities.length === 0 ? (
        <div className="tile" style={{ textAlign: 'center', padding: '60px', color: '#94A3B8' }}>
          No celebrity cards added yet. Click "+ Add Celebrity Card" to create your first card!
        </div>
      ) : (
        <div className="grid4">
          {celebrities.map((item) => {
            const mediaUrl = item.video_reel_url || item.video_url || item.thumbnail || item.video_file;
            const isVideo = isVideoMedia(mediaUrl);

            return (
              <div
                key={item.id}
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
                {/* Media Container with camera reticle styling */}
                <div
                  className="shot"
                  style={{
                    height: '320px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    background: '#F8FAFC',
                    position: 'relative'
                  }}
                >
                  {mediaUrl ? (
                    isVideo ? (
                      <video
                        src={resolveMediaUrl(mediaUrl)}
                        controls
                        muted
                        loop
                        playsInline
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <img
                        src={resolveMediaUrl(mediaUrl)}
                        alt={item.star_name || item.name}
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
                      <b style={{ color: '#0F172A', fontSize: '16px' }}>{item.star_name || item.name}</b>
                      <div style={{ color: '#64748B', fontSize: '12px', marginTop: '4px' }}>
                        {item.duration_label || '30 to 60s · vertical'}
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
                        <span>{uploadingCardId === item.id ? 'Uploading...' : 'Upload Photo / Video'}</span>
                        <input
                          type="file"
                          accept="image/*,video/*"
                          onChange={e => handleDirectCardUpload(e, item)}
                          style={{ display: 'none' }}
                        />
                      </label>
                    </div>
                  )}

                  {/* If media exists, provide quick replace and remove buttons directly on card */}
                  {mediaUrl && (
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
                        title="Change Photo or Video"
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
                        <span>{uploadingCardId === item.id ? '...' : 'Replace'}</span>
                        <input
                          type="file"
                          accept="image/*,video/*"
                          onChange={e => handleDirectCardUpload(e, item)}
                          style={{ display: 'none' }}
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() => handleDirectCardRemove(item)}
                        title="Remove media from this card"
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
                    {item.star_name || item.name}
                  </h4>
                  <div style={{ fontSize: '12px', color: '#E10600', marginTop: '2px', fontWeight: 700 }}>
                    {item.duration_label || '30 to 60s · vertical'}
                  </div>
                  <p style={{
                    margin: '8px 0 0',
                    fontSize: '13px',
                    color: '#475569',
                    lineHeight: 1.5,
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    "{item.quote}"
                  </p>
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
                    onClick={() => { setEditingItem(item); setDetectedDim(''); }}
                    style={{ background: 'none', border: 'none', color: '#0F172A', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600, fontSize: '13px' }}
                  >
                    <Edit3 size={14} color="#E10600" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
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
