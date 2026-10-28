import React, { useState, useEffect } from 'react';
import { Dumbbell, Plus, Trash2, Edit3, Save, CheckCircle2, Upload, Film, Image as ImageIcon, Maximize2 } from 'lucide-react';
import apiClient from '../api/apiClient';
import { ENDPOINTS } from '../api/endpoints';
import mediaApi from '../api/mediaApi';

export default function AdminPrograms() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [imageDim, setImageDim] = useState('');
  const [videoDim, setVideoDim] = useState('');

  useEffect(() => {
    loadPrograms();
  }, []);

  async function loadPrograms() {
    setLoading(true);
    try {
      const res = await apiClient.get(ENDPOINTS.CMS.PROGRAMS);
      const list = Array.isArray(res.data) ? res.data : res.data.results || [];
      setPrograms(list);
    } catch (err) {
      console.error('Failed to load programs:', err);
    } finally {
      setLoading(false);
    }
  }

  const handleNew = () => {
    setEditingItem({
      slug: '',
      number: String(programs.length + 1).padStart(2, '0'),
      name: '',
      tagline: '',
      description: '',
      class_ratio: '2 coaches on the floor · capped at 16',
      duration: '55 Mins',
      hero_image: '',
      featured_video: '',
      order: programs.length + 1,
      is_active: true
    });
    setImageDim('');
    setVideoDim('');
    setSuccessMsg('');
  };

  const handleRemoveMedia = (field) => {
    if (!window.confirm(`Remove this ${field === 'hero_image' ? 'photo' : 'video'} from the program?`)) return;
    setEditingItem(prev => ({
      ...prev,
      [field]: ''
    }));
    if (field === 'hero_image') setImageDim('');
    if (field === 'featured_video') setVideoDim('');
    setSuccessMsg(`${field === 'hero_image' ? 'Photo' : 'Video'} removed.`);
  };

  const handleMediaUpload = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const res = await mediaApi.uploadFile(file, `program_${file.name}`);
      setEditingItem(prev => ({
        ...prev,
        [field]: res.file_url || res.file
      }));
      setSuccessMsg('Media uploaded and attached to program!');
    } catch (err) {
      alert('Failed to upload program media.');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!editingItem) return;
    setSaving(true);
    setSuccessMsg('');
    try {
      const payload = {
        ...editingItem,
        title: editingItem.name || editingItem.title,
        subtitle: editingItem.tagline || editingItem.subtitle,
      };
      if (editingItem.id) {
        await apiClient.put(`${ENDPOINTS.CMS.PROGRAMS}${editingItem.id}/`, payload);
      } else {
        await apiClient.post(ENDPOINTS.CMS.PROGRAMS, payload);
      }
      setSuccessMsg('Program saved successfully!');
      setEditingItem(null);
      loadPrograms();
    } catch (err) {
      alert('Error saving program: ' + (err.response?.data?.detail || err.message));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this training program?')) return;
    try {
      await apiClient.delete(`${ENDPOINTS.CMS.PROGRAMS}${id}/`);
      setPrograms(programs.filter(p => p.id !== id));
      if (editingItem?.id === id) setEditingItem(null);
    } catch (err) {
      alert('Error deleting program: ' + err.message);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 className="disp" style={{ fontSize: '44px', margin: 0, color: '#0F172A' }}>TRAINING PROGRAMS</h1>
          <p style={{ margin: '4px 0 0', color: '#64748B', fontSize: '14px' }}>
            Manage the interactive 7-program accordions, schedules, hero media and video loops
          </p>
        </div>
        <button
          onClick={handleNew}
          className="btn btn-red"
          style={{ minHeight: '44px', fontSize: '13px', borderRadius: '6px' }}
        >
          <Plus size={16} color="#000000" strokeWidth={2.5} style={{ stroke: '#000000' }} />
          <span>Add Program</span>
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

      {/* EDIT / CREATE FORM MODAL TILE (WHITE & RED) */}
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
              {editingItem.id ? `EDIT PROGRAM: ${editingItem.name || editingItem.title}` : 'NEW PROGRAM'}
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
              <label>Program Name</label>
              <input
                type="text"
                required
                value={editingItem.name || editingItem.title || ''}
                onChange={e => setEditingItem({ ...editingItem, name: e.target.value, title: e.target.value })}
                placeholder="e.g. BOOTCAMP"
              />
            </div>
            <div className="field">
              <label>Slug Identifier</label>
              <input
                type="text"
                required
                value={editingItem.slug || ''}
                onChange={e => setEditingItem({ ...editingItem, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                placeholder="e.g. bootcamp"
              />
            </div>
            <div className="field">
              <label>Number / Index</label>
              <input
                type="text"
                value={editingItem.number || '01'}
                onChange={e => setEditingItem({ ...editingItem, number: e.target.value })}
                placeholder="e.g. 01"
              />
            </div>
          </div>

          <div className="grid2">
            <div className="field">
              <label>Tagline / Hook</label>
              <input
                type="text"
                value={editingItem.tagline || editingItem.subtitle || ''}
                onChange={e => setEditingItem({ ...editingItem, tagline: e.target.value, subtitle: e.target.value })}
                placeholder="e.g. High intensity functional conditioning"
              />
            </div>
            <div className="field">
              <label>Duration & Class Ratio</label>
              <input
                type="text"
                value={editingItem.class_ratio || ''}
                onChange={e => setEditingItem({ ...editingItem, class_ratio: e.target.value })}
                placeholder="e.g. 2 coaches on the floor · capped at 16"
              />
            </div>
          </div>

          <div className="field">
            <label>Description</label>
            <textarea
              rows="3"
              value={editingItem.description || ''}
              onChange={e => setEditingItem({ ...editingItem, description: e.target.value })}
              placeholder="e.g. Rig, barbells, rower, ski-erg, AirBike and curved runners..."
            />
          </div>

          {/* DYNAMIC MEDIA UPLOAD SECTION (WHITE & RED) */}
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
                  Program Media (Photo & Video Loop)
                </h4>
                <p style={{ margin: '2px 0 0', color: '#64748B', fontSize: '13px' }}>
                  Upload hero photography and looping background video for this training program accordion
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
                <span>Photo: <strong>1200 × 800 px</strong> (3:2) · Video: <strong>1920 × 1080 px</strong> (16:9)</span>
              </div>
            </div>

            <div className="grid2">
              {/* HERO PHOTO FIELD */}
              <div className="field">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label>Hero Photo URL</label>
                  <span style={{ fontSize: '11px', color: '#64748B' }}>1200×800 px · JPG/WebP (&lt;3MB)</span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    value={editingItem.hero_image || ''}
                    onChange={e => setEditingItem({ ...editingItem, hero_image: e.target.value })}
                    placeholder="https://... /photo.jpg"
                    style={{ flex: 1 }}
                  />
                  <label className="btn btn-ghost" style={{ cursor: 'pointer', padding: '0 14px', minHeight: '46px', borderRadius: '6px' }}>
                    <Upload size={14} color="#E10600" />
                    <span style={{ fontSize: '12px' }}>{uploading ? '...' : 'Upload'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={e => handleMediaUpload(e, 'hero_image')}
                      style={{ display: 'none' }}
                    />
                  </label>
                  {editingItem.hero_image && (
                    <button
                      type="button"
                      onClick={() => handleRemoveMedia('hero_image')}
                      className="btn"
                      title="Remove hero photo"
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

                {editingItem.hero_image && (
                  <div style={{
                    marginTop: '8px',
                    padding: '10px',
                    background: '#F8FAFC',
                    borderRadius: '8px',
                    border: '1px solid #E2E8F0',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '11px', fontWeight: 800, color: '#0F172A', textTransform: 'uppercase' }}>Photo Preview:</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {imageDim && (
                          <span className="pill" style={{ background: '#E0F2FE', color: '#0369A1', border: '1px solid #BAE6FD', fontSize: '10px', fontWeight: 700 }}>
                            {imageDim}
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => handleRemoveMedia('hero_image')}
                          style={{ background: 'none', border: 'none', color: '#DC2626', cursor: 'pointer', fontSize: '11px', fontWeight: 700 }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <img
                      src={editingItem.hero_image}
                      alt="Program hero"
                      onLoad={e => setImageDim(`${e.target.naturalWidth} × ${e.target.naturalHeight} px`)}
                      style={{ height: '140px', width: '100%', objectFit: 'cover', borderRadius: '6px', border: '1px solid #CBD5E1' }}
                    />
                  </div>
                )}
              </div>

              {/* FEATURED VIDEO FIELD */}
              <div className="field">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label>Featured Video Loop URL</label>
                  <span style={{ fontSize: '11px', color: '#64748B' }}>1920×1080 px · MP4/WebM (&lt;25MB)</span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    value={editingItem.featured_video || ''}
                    onChange={e => setEditingItem({ ...editingItem, featured_video: e.target.value })}
                    placeholder="https://... /loop.mp4"
                    style={{ flex: 1 }}
                  />
                  <label className="btn btn-ghost" style={{ cursor: 'pointer', padding: '0 14px', minHeight: '46px', borderRadius: '6px' }}>
                    <Upload size={14} color="#E10600" />
                    <span style={{ fontSize: '12px' }}>{uploading ? '...' : 'Upload'}</span>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={e => handleMediaUpload(e, 'featured_video')}
                      style={{ display: 'none' }}
                    />
                  </label>
                  {editingItem.featured_video && (
                    <button
                      type="button"
                      onClick={() => handleRemoveMedia('featured_video')}
                      className="btn"
                      title="Remove featured video"
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

                {editingItem.featured_video && (
                  <div style={{
                    marginTop: '8px',
                    padding: '10px',
                    background: '#F8FAFC',
                    borderRadius: '8px',
                    border: '1px solid #E2E8F0',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '11px', fontWeight: 800, color: '#0F172A', textTransform: 'uppercase' }}>Video Loop Preview:</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {videoDim && (
                          <span className="pill" style={{ background: '#E0F2FE', color: '#0369A1', border: '1px solid #BAE6FD', fontSize: '10px', fontWeight: 700 }}>
                            {videoDim}
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => handleRemoveMedia('featured_video')}
                          style={{ background: 'none', border: 'none', color: '#DC2626', cursor: 'pointer', fontSize: '11px', fontWeight: 700 }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <video
                      src={editingItem.featured_video}
                      controls
                      onLoadedMetadata={e => setVideoDim(`${e.target.videoWidth} × ${e.target.videoHeight} px`)}
                      style={{ height: '140px', width: '100%', objectFit: 'cover', borderRadius: '6px', border: '1px solid #CBD5E1' }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '8px' }}>
            <button type="button" onClick={() => setEditingItem(null)} className="btn btn-ghost" style={{ borderRadius: '6px' }}>
              Cancel
            </button>
            <button type="submit" disabled={saving || uploading} className="btn btn-red" style={{ minWidth: '160px', borderRadius: '6px' }}>
              <Save size={16} />
              <span>{saving ? 'Saving...' : 'Save Program'}</span>
            </button>
          </div>
        </form>
      )}

      {/* PROGRAMS LIST TABLE (WHITE & RED) */}
      <div className="tile" style={{ padding: 0, overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '60px', textAlign: 'center', color: '#64748B' }}>Loading programs...</div>
        ) : programs.length === 0 ? (
          <div style={{ padding: '60px', textAlign: 'center', color: '#94A3B8' }}>
            No programs created yet. Click "+ Add Program" to add your first program!
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="cms-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Program Name</th>
                  <th>Slug</th>
                  <th>Ratio & Duration</th>
                  <th>Media Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {programs.map(prog => (
                  <tr key={prog.id}>
                    <td style={{ fontWeight: 800, color: '#E10600' }}>{prog.number || '01'}</td>
                    <td style={{ fontWeight: 700, color: '#0F172A' }}>{prog.name || prog.title}</td>
                    <td><code style={{ background: '#F1F5F9', padding: '2px 6px', borderRadius: '4px', color: '#475569' }}>{prog.slug}</code></td>
                    <td style={{ color: '#475569' }}>{prog.class_ratio || prog.schedule || 'Flexible'}</td>
                    <td>
                      {prog.hero_image || prog.featured_video ? (
                        <span className="pill" style={{ background: '#DCFCE7', color: '#15803D', border: '1px solid #86EFAC' }}>
                          Media Ready
                        </span>
                      ) : (
                        <span className="pill" style={{ background: '#F1F5F9', color: '#64748B', border: '1px solid #E2E8F0' }}>
                          No Media
                        </span>
                      )}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '12px' }}>
                        <button
                          onClick={() => { setEditingItem(prog); setImageDim(''); setVideoDim(''); }}
                          style={{ background: 'none', border: 'none', color: '#0F172A', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}
                        >
                          <Edit3 size={14} color="#E10600" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(prog.id)}
                          style={{ background: 'none', border: 'none', color: '#DC2626', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}
                        >
                          <Trash2 size={14} />
                          <span>Delete</span>
                        </button>
                      </div>
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
