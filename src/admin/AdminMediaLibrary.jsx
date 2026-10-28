import React, { useState, useEffect } from 'react';
import { Image as ImageIcon, Video, Upload, Copy, Check, Trash2, CheckCircle2, Film, Maximize2 } from 'lucide-react';
import mediaApi from '../api/mediaApi';

export default function AdminMediaLibrary() {
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [copiedId, setCopiedId] = useState(null);
  const [filterType, setFilterType] = useState('ALL');
  const [successMsg, setSuccessMsg] = useState('');
  const [dims, setDims] = useState({});

  useEffect(() => {
    loadMedia();
  }, []);

  async function loadMedia() {
    setLoading(true);
    try {
      const data = await mediaApi.getAllMedia();
      const list = Array.isArray(data) ? data : data.results || [];
      setMediaList(list);
    } catch (err) {
      console.error('Failed to load media:', err);
    } finally {
      setLoading(false);
    }
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setUploadProgress(0);
    setSuccessMsg('');

    try {
      await mediaApi.uploadFile(
        file,
        file.name,
        file.type.startsWith('video/') ? 'video' : 'photo',
        (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percent);
        }
      );
      setSuccessMsg(`"${file.name}" uploaded successfully to media storage!`);
      loadMedia();
    } catch (err) {
      alert('Upload failed: ' + (err.response?.data?.detail || err.message));
    } finally {
      setUploading(false);
      setUploadProgress(0);
      e.target.value = '';
    }
  };

  const handleCopyUrl = (url, id) => {
    const fullUrl = url.startsWith('http') ? url : `${window.location.origin}${url}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this media asset from server storage?')) return;
    try {
      await mediaApi.deleteMedia(id);
      setMediaList(mediaList.filter(m => m.id !== id));
    } catch (err) {
      alert('Error deleting media: ' + err.message);
    }
  };

  const filtered = mediaList.filter(item => {
    if (filterType === 'IMAGE') return item.media_type === 'photo' || item.media_type === 'IMAGE';
    if (filterType === 'VIDEO') return item.media_type === 'video' || item.media_type === 'VIDEO';
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 className="disp" style={{ fontSize: '44px', margin: 0, color: '#0F172A' }}>MEDIA & VIDEO ASSETS</h1>
          <p style={{ margin: '4px 0 0', color: '#64748B', fontSize: '14px' }}>
            Store, preview, and generate real-time CDN links for all banner videos, reels and hero photography
          </p>
        </div>

        {/* Upload Action Button */}
        <label
          className="btn btn-red"
          style={{ minHeight: '44px', fontSize: '13px', cursor: 'pointer', borderRadius: '6px' }}
        >
          <Upload size={16} color="#000000" strokeWidth={2.5} style={{ stroke: '#000000' }} />
          <span>{uploading ? `Uploading (${uploadProgress}%)` : 'Upload New Media'}</span>
          <input
            type="file"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />
        </label>
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

      {/* UPLOAD DIMENSION SPECIFICATIONS GUIDE */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderRadius: '12px',
        padding: '16px 20px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <Maximize2 size={16} color="#E10600" />
          <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 800, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Recommended Photo &amp; Video Upload Dimensions
          </h3>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '12px'
        }}>
          <div style={{ background: '#F8FAFC', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#E10600', textTransform: 'uppercase' }}>Hero Video / Photos</div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A', marginTop: '2px' }}>1920 × 1080 px</div>
            <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>16:9 Landscape · Full HD</div>
          </div>
          <div style={{ background: '#F8FAFC', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#E10600', textTransform: 'uppercase' }}>Celebrity Reels</div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A', marginTop: '2px' }}>1080 × 1920 px</div>
            <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>9:16 Vertical Reel · 30-60s</div>
          </div>
          <div style={{ background: '#F8FAFC', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#E10600', textTransform: 'uppercase' }}>Program Media</div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A', marginTop: '2px' }}>1200 × 800 px</div>
            <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>3:2 Photo / 16:9 Video Loop</div>
          </div>
          <div style={{ background: '#F8FAFC', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#E10600', textTransform: 'uppercase' }}>Coach / Team Profiles</div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A', marginTop: '2px' }}>800 × 1000 px</div>
            <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>4:5 Portrait Headshot</div>
          </div>
          <div style={{ background: '#F8FAFC', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#E10600', textTransform: 'uppercase' }}>Transformations</div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A', marginTop: '2px' }}>800 × 1000 px</div>
            <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>4:5 Matching Aspect Ratio</div>
          </div>
        </div>
      </div>

      {/* FILTER TABS (WHITE & RED) */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {['ALL', 'IMAGE', 'VIDEO'].map((type) => {
          const isSelected = filterType === type;
          return (
            <button
              key={type}
              type="button"
              onClick={() => setFilterType(type)}
              className="chip"
              style={{
                minHeight: '40px',
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
              {type === 'ALL' ? 'All Media' : type === 'IMAGE' ? 'Photos Only' : 'Videos Only'}
            </button>
          );
        })}
      </div>

      {/* MEDIA GRID (WHITE & RED) */}
      {loading ? (
        <div style={{ padding: '60px', textAlign: 'center', color: '#64748B' }}>Loading media files...</div>
      ) : filtered.length === 0 ? (
        <div className="tile" style={{ textAlign: 'center', padding: '60px', color: '#94A3B8' }}>
          No media files found. Click "Upload New Media" to upload photos or videos!
        </div>
      ) : (
        <div className="grid4">
          {filtered.map((item) => {
            const isVideo = item.media_type === 'video' || item.media_type === 'VIDEO';
            const mediaUrl = item.file_url || item.file;

            return (
              <div
                key={item.id}
                className="tile"
                style={{
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '12px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                }}
              >
                <div style={{
                  height: '200px',
                  background: '#F8FAFC',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid #E2E8F0'
                }}>
                  {isVideo ? (
                    <video
                      src={mediaUrl}
                      controls
                      onLoadedMetadata={e => setDims(prev => ({ ...prev, [item.id]: `${e.target.videoWidth} × ${e.target.videoHeight} px` }))}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <img
                      src={mediaUrl}
                      alt={item.title || 'media'}
                      onLoad={e => setDims(prev => ({ ...prev, [item.id]: `${e.target.naturalWidth} × ${e.target.naturalHeight} px` }))}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  )}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '140px' }}>
                    {item.title || 'Asset #' + item.id}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {dims[item.id] && (
                      <span className="pill" style={{ background: '#E0F2FE', color: '#0369A1', border: '1px solid #BAE6FD', fontSize: '10px', fontWeight: 700 }}>
                        {dims[item.id]}
                      </span>
                    )}
                    <span className="pill" style={{
                      background: isVideo ? '#FEF2F2' : '#F0FDF4',
                      color: isVideo ? '#DC2626' : '#16A34A',
                      border: isVideo ? '1px solid #FECACA' : '1px solid #BBF7D0',
                      fontSize: '10px'
                    }}>
                      {isVideo ? 'VIDEO' : 'PHOTO'}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', marginTop: 'auto', borderTop: '1px solid #F1F5F9', paddingTop: '10px' }}>
                  <button
                    type="button"
                    onClick={() => handleCopyUrl(mediaUrl, item.id)}
                    className="btn btn-ghost"
                    style={{ flex: 1, minHeight: '36px', fontSize: '11px', padding: '0 8px', borderRadius: '6px' }}
                  >
                    {copiedId === item.id ? <Check size={14} color="#16A34A" /> : <Copy size={14} />}
                    <span>{copiedId === item.id ? 'Copied' : 'Copy URL'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    className="btn btn-ghost"
                    style={{ borderColor: '#FECACA', color: '#DC2626', background: '#FEF2F2', minHeight: '36px', fontSize: '11px', padding: '0 10px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}
                    title="Remove media from library"
                  >
                    <Trash2 size={13} />
                    <span>Remove</span>
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
