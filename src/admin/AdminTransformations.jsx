import React, { useState, useEffect } from 'react';
import { Flame, Plus, Trash2, Edit3, Save, Upload, CheckCircle2, Image as ImageIcon, Maximize2 } from 'lucide-react';
import apiClient from '../api/apiClient';
import { ENDPOINTS } from '../api/endpoints';
import mediaApi from '../api/mediaApi';

export default function AdminTransformations() {
  const [transformations, setTransformations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploadingBefore, setUploadingBefore] = useState(false);
  const [uploadingAfter, setUploadingAfter] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [beforeDim, setBeforeDim] = useState('');
  const [afterDim, setAfterDim] = useState('');

  useEffect(() => {
    loadTransformations();
  }, []);

  async function loadTransformations() {
    setLoading(true);
    try {
      const res = await apiClient.get(ENDPOINTS.CMS.TRANSFORMATIONS);
      const list = Array.isArray(res.data) ? res.data : res.data.results || [];
      setTransformations(list);
    } catch (err) {
      console.error('Failed to load transformations:', err);
    } finally {
      setLoading(false);
    }
  }

  const handleNew = () => {
    setEditingItem({
      member_name: '',
      client_name: '',
      program_tag: 'BOOTCAMP + NUTRITION',
      weeks_duration: 12,
      timeline_weeks: 12,
      metric_label: '-8.4 kg fat · +3.2 kg muscle',
      metric_value: '-8.4 kg fat',
      before_photo: '',
      before_image_url: '',
      after_photo: '',
      after_image_url: '',
      display_order: transformations.length + 1,
      is_active: true
    });
    setBeforeDim('');
    setAfterDim('');
    setSuccessMsg('');
  };

  const handleRemovePhoto = (field) => {
    if (!window.confirm(`Remove ${field === 'before' ? 'Before' : 'After'} photo?`)) return;
    setEditingItem(prev => ({
      ...prev,
      [field === 'before' ? 'before_photo' : 'after_photo']: '',
      [field === 'before' ? 'before_image_url' : 'after_image_url']: '',
      [field === 'before' ? 'before_image' : 'after_image']: null,
    }));
    if (field === 'before') setBeforeDim('');
    else setAfterDim('');
    setSuccessMsg(`${field === 'before' ? 'Before' : 'After'} photo removed.`);
  };

  const handleImageUpload = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;
    if (field === 'before') setUploadingBefore(true);
    else setUploadingAfter(true);

    try {
      const res = await mediaApi.uploadFile(file, `transform_${field}_${file.name}`);
      const fileUrl = res.file_url || res.file;
      setEditingItem(prev => ({
        ...prev,
        [field === 'before' ? 'before_photo' : 'after_photo']: fileUrl,
        [field === 'before' ? 'before_image_url' : 'after_image_url']: fileUrl
      }));
      setSuccessMsg(`${field === 'before' ? 'Before' : 'After'} photo uploaded successfully!`);
    } catch (err) {
      alert(`Failed to upload ${field} photo.`);
    } finally {
      if (field === 'before') setUploadingBefore(false);
      else setUploadingAfter(false);
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
        member_name: editingItem.member_name || editingItem.client_name,
        client_name: editingItem.member_name || editingItem.client_name,
        timeline_weeks: editingItem.weeks_duration || editingItem.timeline_weeks || 12,
        weeks_duration: editingItem.weeks_duration || editingItem.timeline_weeks || 12,
        before_image_url: editingItem.before_photo || editingItem.before_image_url,
        after_image_url: editingItem.after_photo || editingItem.after_image_url,
      };

      if (editingItem.id) {
        await apiClient.put(`${ENDPOINTS.CMS.TRANSFORMATIONS}${editingItem.id}/`, payload);
      } else {
        await apiClient.post(ENDPOINTS.CMS.TRANSFORMATIONS, payload);
      }
      setSuccessMsg('Transformation saved successfully!');
      setEditingItem(null);
      loadTransformations();
    } catch (err) {
      alert('Error saving transformation: ' + (err.response?.data?.detail || err.message));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this transformation card?')) return;
    try {
      await apiClient.delete(`${ENDPOINTS.CMS.TRANSFORMATIONS}${id}/`);
      setTransformations(transformations.filter(t => t.id !== id));
      if (editingItem?.id === id) setEditingItem(null);
    } catch (err) {
      alert('Error deleting transformation: ' + err.message);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 className="disp" style={{ fontSize: '44px', margin: 0, color: '#0F172A' }}>MEMBER TRANSFORMATIONS</h1>
          <p style={{ margin: '4px 0 0', color: '#64748B', fontSize: '14px' }}>
            Verified before/after evidence cards showcasing real body composition changes
          </p>
        </div>
        <button
          onClick={handleNew}
          className="btn btn-red"
          style={{ minHeight: '44px', fontSize: '13px', borderRadius: '6px' }}
        >
          <Plus size={16} color="#000000" strokeWidth={2.5} style={{ stroke: '#000000' }} />
          <span>Add Transformation</span>
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
              {editingItem.id ? 'EDIT TRANSFORMATION' : 'NEW TRANSFORMATION'}
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
              <label>Client Name / Pseudonym</label>
              <input
                type="text"
                required
                value={editingItem.member_name || editingItem.client_name || ''}
                onChange={e => setEditingItem({ ...editingItem, member_name: e.target.value, client_name: e.target.value })}
                placeholder="e.g. Rohan V."
              />
            </div>
            <div className="field">
              <label>Metric Summary</label>
              <input
                type="text"
                value={editingItem.metric_label || ''}
                onChange={e => setEditingItem({ ...editingItem, metric_label: e.target.value })}
                placeholder="e.g. -8.4 kg fat · +3.2 kg muscle"
              />
            </div>
            <div className="field">
              <label>Timeline (Weeks)</label>
              <input
                type="number"
                value={editingItem.weeks_duration || editingItem.timeline_weeks || 12}
                onChange={e => setEditingItem({ ...editingItem, weeks_duration: parseInt(e.target.value) || 12, timeline_weeks: parseInt(e.target.value) || 12 })}
                placeholder="12"
              />
            </div>
          </div>

          {/* BEFORE & AFTER PHOTO UPLOADS */}
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
                  Before & After Comparison Photos
                </h4>
                <p style={{ margin: '2px 0 0', color: '#64748B', fontSize: '13px' }}>
                  Upload verified client photos for the interactive side-by-side split screen slider
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
                <span>Recommended: <strong>800 × 1000 px</strong> (4:5 Portrait) · Matching Dimensions</span>
              </div>
            </div>

            <div style={{
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '8px',
              padding: '10px 14px',
              fontSize: '12px',
              color: '#475569'
            }}>
              <strong>Tip for Slider Precision:</strong> Ensure both Before and After photos share the <strong>exact same aspect ratio &amp; dimensions</strong> (e.g. 800×1000 px or 600×800 px) so the interactive slider aligns perfectly.
            </div>

            <div className="grid2">
              {/* Before Photo */}
              <div className="field">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label>Before Photo URL / Upload</label>
                  <span style={{ fontSize: '11px', color: '#64748B' }}>Rec: 800×1000 (4:5)</span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    value={editingItem.before_photo || editingItem.before_image_url || ''}
                    onChange={e => setEditingItem({ ...editingItem, before_photo: e.target.value, before_image_url: e.target.value })}
                    placeholder="https://... /before.jpg"
                    style={{ flex: 1 }}
                  />
                  <label className="btn btn-ghost" style={{ cursor: 'pointer', padding: '0 14px', minHeight: '46px', borderRadius: '6px' }}>
                    <Upload size={14} color="#E10600" />
                    <span style={{ fontSize: '12px' }}>{uploadingBefore ? '...' : 'Upload'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={e => handleImageUpload(e, 'before')}
                      style={{ display: 'none' }}
                    />
                  </label>
                  {(editingItem.before_photo || editingItem.before_image_url) && (
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto('before')}
                      className="btn"
                      title="Remove Before photo"
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

                {(editingItem.before_photo || editingItem.before_image_url) && (
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
                      <span style={{ fontSize: '11px', fontWeight: 800, color: '#0F172A', textTransform: 'uppercase' }}>
                        Before Photo:
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {beforeDim && (
                          <span className="pill" style={{ background: '#E0F2FE', color: '#0369A1', border: '1px solid #BAE6FD', fontSize: '10px', fontWeight: 700 }}>
                            {beforeDim}
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => handleRemovePhoto('before')}
                          style={{ background: 'none', border: 'none', color: '#DC2626', cursor: 'pointer', fontSize: '11px', fontWeight: 700 }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <img
                      src={editingItem.before_photo || editingItem.before_image_url}
                      alt="Before preview"
                      onLoad={e => setBeforeDim(`${e.target.naturalWidth} × ${e.target.naturalHeight} px`)}
                      style={{ height: '160px', width: 'auto', maxWidth: '100%', objectFit: 'contain', borderRadius: '6px', border: '1px solid #CBD5E1', background: '#FFFFFF' }}
                    />
                  </div>
                )}
              </div>

              {/* After Photo */}
              <div className="field">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label>After Photo URL / Upload</label>
                  <span style={{ fontSize: '11px', color: '#64748B' }}>Rec: 800×1000 (4:5)</span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    value={editingItem.after_photo || editingItem.after_image_url || ''}
                    onChange={e => setEditingItem({ ...editingItem, after_photo: e.target.value, after_image_url: e.target.value })}
                    placeholder="https://... /after.jpg"
                    style={{ flex: 1 }}
                  />
                  <label className="btn btn-ghost" style={{ cursor: 'pointer', padding: '0 14px', minHeight: '46px', borderRadius: '6px' }}>
                    <Upload size={14} color="#E10600" />
                    <span style={{ fontSize: '12px' }}>{uploadingAfter ? '...' : 'Upload'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload(e, 'after')}
                      style={{ display: 'none' }}
                    />
                  </label>
                  {(editingItem.after_photo || editingItem.after_image_url) && (
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto('after')}
                      className="btn"
                      title="Remove After photo"
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

                {(editingItem.after_photo || editingItem.after_image_url) && (
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
                      <span style={{ fontSize: '11px', fontWeight: 800, color: '#0F172A', textTransform: 'uppercase' }}>
                        After Photo:
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {afterDim && (
                          <span className="pill" style={{ background: '#E0F2FE', color: '#0369A1', border: '1px solid #BAE6FD', fontSize: '10px', fontWeight: 700 }}>
                            {afterDim}
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => handleRemovePhoto('after')}
                          style={{ background: 'none', border: 'none', color: '#DC2626', cursor: 'pointer', fontSize: '11px', fontWeight: 700 }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <img
                      src={editingItem.after_photo || editingItem.after_image_url}
                      alt="After preview"
                      onLoad={e => setAfterDim(`${e.target.naturalWidth} × ${e.target.naturalHeight} px`)}
                      style={{ height: '160px', width: 'auto', maxWidth: '100%', objectFit: 'contain', borderRadius: '6px', border: '1px solid #CBD5E1', background: '#FFFFFF' }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            <button type="button" onClick={() => setEditingItem(null)} className="btn btn-ghost" style={{ borderRadius: '6px' }}>
              Cancel
            </button>
            <button type="submit" disabled={saving || uploadingBefore || uploadingAfter} className="btn btn-red" style={{ minWidth: '180px', borderRadius: '6px' }}>
              <Save size={16} />
              <span>{saving ? 'Saving...' : 'Save Transformation'}</span>
            </button>
          </div>
        </form>
      )}

      {/* LIST OF TRANSFORMATIONS (WHITE & RED) */}
      {loading ? (
        <div style={{ padding: '60px', textAlign: 'center', color: '#64748B' }}>Loading transformations...</div>
      ) : transformations.length === 0 ? (
        <div className="tile" style={{ textAlign: 'center', padding: '60px', color: '#94A3B8' }}>
          No transformations added yet. Click "+ Add Transformation" to list your first client result!
        </div>
      ) : (
        <div className="grid3">
          {transformations.map(card => {
            const beforeImg = card.before_photo || card.before_image_url || card.before_image;
            const afterImg = card.after_photo || card.after_image_url || card.after_image;
            const name = card.member_name || card.client_name || 'Member Transformation';
            const weeks = card.weeks_duration || card.timeline_weeks || 12;

            return (
              <div
                key={card.id}
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="pill" style={{ background: '#FEE2E2', color: '#DC2626', border: '1px solid #FECACA' }}>
                    {weeks} WEEKS
                  </span>
                  <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>{name}</span>
                </div>

                {/* Split Before / After Images */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', height: '220px' }}>
                  <div style={{ position: 'relative', borderRadius: '6px', overflow: 'hidden', background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                    {beforeImg ? (
                      <img src={beforeImg} alt="Before" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94A3B8', fontSize: '11px', fontWeight: 700 }}>
                        BEFORE
                      </div>
                    )}
                    <span style={{ position: 'absolute', bottom: '6px', left: '6px', background: 'rgba(0,0,0,0.6)', color: '#FFF', fontSize: '10px', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>
                      BEFORE
                    </span>
                  </div>
                  <div style={{ position: 'relative', borderRadius: '6px', overflow: 'hidden', background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                    {afterImg ? (
                      <img src={afterImg} alt="After" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94A3B8', fontSize: '11px', fontWeight: 700 }}>
                        AFTER
                      </div>
                    )}
                    <span style={{ position: 'absolute', bottom: '6px', left: '6px', background: '#E10600', color: '#FFF', fontSize: '10px', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>
                      AFTER
                    </span>
                  </div>
                </div>

                <div style={{ padding: '12px', background: '#F8FAFC', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
                  <div style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>
                    Verified Result
                  </div>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#E10600', marginTop: '2px' }}>
                    {card.metric_label || card.metric_value}
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', borderTop: '1px solid #F1F5F9', paddingTop: '12px' }}>
                  <button
                    onClick={() => { setEditingItem(card); setBeforeDim(''); setAfterDim(''); }}
                    style={{ background: 'none', border: 'none', color: '#0F172A', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600, fontSize: '13px' }}
                  >
                    <Edit3 size={14} color="#E10600" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(card.id)}
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
