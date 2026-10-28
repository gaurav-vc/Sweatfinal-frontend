import React, { useState, useEffect } from 'react';
import { Video, Plus, Trash2, Edit3, Save, Upload, CheckCircle2, Maximize2 } from 'lucide-react';
import apiClient from '../api/apiClient';
import { ENDPOINTS } from '../api/endpoints';
import mediaApi from '../api/mediaApi';

export default function AdminCelebrities() {
  const [celebrities, setCelebrities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [uploading, setUploading] = useState(false);
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
      setSuccessMsg('Celebrity reel saved successfully!');
      setEditingItem(null);
      loadCelebrities();
    } catch (err) {
      alert('Error saving celebrity: ' + (err.response?.data?.detail || err.message));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this celebrity reel?')) return;
    try {
      await apiClient.delete(`${ENDPOINTS.CMS.CELEBRITIES}${id}/`);
      setCelebrities(celebrities.filter(c => c.id !== id));
      if (editingItem?.id === id) setEditingItem(null);
    } catch (err) {
      alert('Error deleting celebrity reel: ' + err.message);
    }
  };

  const handleVideoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const res = await mediaApi.uploadFile(file, `celebrity_${file.name}`);
      const fileUrl = res.file_url || res.file;
      setEditingItem(prev => ({
        ...prev,
        video_reel_url: fileUrl,
        video_url: fileUrl
      }));
      setSuccessMsg('Video reel uploaded successfully!');
    } catch (err) {
      alert('Failed to upload video reel.');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveVideo = () => {
    if (!window.confirm('Remove this video reel from this celebrity card?')) return;
    setEditingItem(prev => ({
      ...prev,
      video_reel_url: '',
      video_url: '',
      video_file: null
    }));
    setDetectedDim('');
    setSuccessMsg('Video reel removed.');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 className="disp" style={{ fontSize: '44px', margin: 0, color: '#0F172A' }}>
            CELEBRITY REELS & TESTIMONIALS
          </h1>
          <p style={{ margin: '4px 0 0', color: '#64748B', fontSize: '14px' }}>
            9:16 vertical video stories and quote cards appearing on the public Home page
          </p>
        </div>
        <button
          onClick={handleNew}
          className="btn btn-red"
          style={{ minHeight: '44px', fontSize: '13px', borderRadius: '6px' }}
        >
          <Plus size={16} color="#000000" strokeWidth={2.5} style={{ stroke: '#000000' }} />
          <span>Add Celebrity Reel</span>
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
              {editingItem.id ? 'EDIT CELEBRITY REEL' : 'NEW CELEBRITY REEL'}
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
              placeholder="e.g. 'SWEAT gave me the conditioning I needed for 14-hour shoot days...'"
            />
          </div>

          {/* MEDIA UPLOAD SECTION */}
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
                  Vertical Video Reel (9:16)
                </h4>
                <p style={{ margin: '2px 0 0', color: '#64748B', fontSize: '13px' }}>
                  Upload full portrait video testimonials & training reels from Bollywood stars
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
                <span>Recommended: <strong>1080 × 1920 px</strong> (9:16 Vertical Reel · MP4/WebM)</span>
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
              <span><strong>Ideal Video Length:</strong> 30 to 60 seconds · Max File Size: &lt; 35 MB</span>
              <span className="pill" style={{ background: '#FFFFFF', border: '1px solid #CBD5E1', color: '#0F172A', fontWeight: 600 }}>
                Aspect Ratio: 9:16 Vertical
              </span>
            </div>

            <div className="grid2">
              <div className="field">
                <label>Video Stream URL</label>
                <input
                  type="text"
                  value={editingItem.video_reel_url || editingItem.video_url || ''}
                  onChange={e => setEditingItem({ ...editingItem, video_reel_url: e.target.value, video_url: e.target.value })}
                  placeholder="https://... /reel.mp4"
                />
              </div>
              <div className="field">
                <label>Direct Upload Video Reel</label>
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
                    <span>{uploading ? 'Uploading Video...' : 'Choose Video File (MP4/WebM)'}</span>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoUpload}
                      style={{ display: 'none' }}
                    />
                  </label>
                  {(editingItem.video_reel_url || editingItem.video_url) && (
                    <button
                      type="button"
                      onClick={handleRemoveVideo}
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

            {(editingItem.video_reel_url || editingItem.video_url) && (
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
                  <span style={{ fontSize: '11px', fontWeight: 800, color: '#0F172A', textTransform: 'uppercase' }}>
                    Vertical Reel Preview:
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {detectedDim && (
                      <span className="pill" style={{ background: '#E0F2FE', color: '#0369A1', border: '1px solid #BAE6FD', fontSize: '11px', fontWeight: 700 }}>
                        Detected: {detectedDim}
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={handleRemoveVideo}
                      className="btn"
                      style={{
                        background: '#FEF2F2',
                        border: '1px solid #FCA5A5',
                        color: '#DC2626',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: 700,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <Trash2 size={12} />
                      <span>Remove Video</span>
                    </button>
                  </div>
                </div>
                <video
                  src={editingItem.video_reel_url || editingItem.video_url}
                  controls
                  onLoadedMetadata={e => setDetectedDim(`${e.target.videoWidth} × ${e.target.videoHeight} px`)}
                  style={{ width: '100%', maxWidth: '180px', height: '280px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                />
              </div>
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            <button type="button" onClick={() => setEditingItem(null)} className="btn btn-ghost" style={{ borderRadius: '6px' }}>
              Cancel
            </button>
            <button type="submit" disabled={saving || uploading} className="btn btn-red" style={{ minWidth: '180px', borderRadius: '6px' }}>
              <Save size={16} />
              <span>{saving ? 'Saving...' : 'Save Celebrity Reel'}</span>
            </button>
          </div>
        </form>
      )}

      {/* LIST OF REELS (WHITE & RED CARDS) */}
      {loading ? (
        <div style={{ padding: '60px', textAlign: 'center', color: '#64748B' }}>Loading reels...</div>
      ) : celebrities.length === 0 ? (
        <div className="tile" style={{ textAlign: 'center', padding: '60px', color: '#94A3B8' }}>
          No celebrity reels added yet. Click "+ Add Celebrity Reel" to create your first dynamic reel!
        </div>
      ) : (
        <div className="grid4">
          {celebrities.map((item) => (
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
              <div className="shot" style={{ height: '320px', borderRadius: '8px', overflow: 'hidden', background: '#F8FAFC' }}>
                {item.video_reel_url || item.video_url ? (
                  <video
                    src={item.video_reel_url || item.video_url}
                    controls
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <div style={{ padding: '20px', textAlign: 'center' }}>
                    <b style={{ color: '#0F172A', fontSize: '16px' }}>{item.star_name || item.name}</b>
                    <div style={{ color: '#64748B', fontSize: '12px', marginTop: '4px' }}>{item.duration_label}</div>
                  </div>
                )}
              </div>

              <div>
                <h4 style={{ margin: 0, fontSize: '18px', color: '#0F172A', fontWeight: 800 }}>
                  {item.star_name || item.name}
                </h4>
                <div style={{ fontSize: '12px', color: '#E10600', marginTop: '2px', fontWeight: 700 }}>
                  {item.duration_label || '9:16 Vertical Reel'}
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
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#0F172A',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '13px',
                    fontWeight: 600
                  }}
                >
                  <Edit3 size={14} color="#E10600" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#DC2626',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '13px',
                    fontWeight: 600
                  }}
                >
                  <Trash2 size={14} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
