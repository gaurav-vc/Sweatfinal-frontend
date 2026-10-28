import React, { useState, useEffect } from 'react';
import { Film, Save, Upload, CheckCircle2, ExternalLink, Play, Trash2, Maximize2 } from 'lucide-react';
import apiClient from '../api/apiClient';
import { ENDPOINTS } from '../api/endpoints';
import mediaApi from '../api/mediaApi';

export default function AdminHeroes() {
  const pages = [
    { slug: 'home', name: 'Home' },
    { slug: 'bootcamp', name: 'Bootcamp' },
    { slug: 'pilates', name: 'Pilates' },
    { slug: 'membership', name: 'Membership' },
    { slug: 'assessment', name: 'Assessment' },
    { slug: 'book', name: 'Book & Slots' },
    { slug: 'glutes', name: 'Glutes & Abs' },
    { slug: 'coaching', name: 'Coaching' },
    { slug: 'programs', name: 'Programs' },
    { slug: 'nutrition', name: 'Nutrition' },
    { slug: 'recovery', name: 'Recovery' },
    { slug: 'online', name: 'Online' },
    { slug: 'elite', name: 'Sweat Elite' },
    { slug: 'team', name: 'Team' },
    { slug: 'shop', name: 'Shop' },
    { slug: 'visit', name: 'Visit' },
    { slug: 'app', name: 'The App' },
  ];

  const [selectedPage, setSelectedPage] = useState('home');
  const [heroData, setHeroData] = useState({
    eyebrow: 'SWEAT HQ · Andheri · Entry by assessment',
    headline: "WHERE THE STARS TRAIN. NOW IT'S YOU.",
    subheadline: "The coaches and team behind Bollywood's best-known bodies are now coaching Andheri.",
    cta_primary_text: 'Experience SWEAT',
    cta_primary_link: '/book',
    cta_secondary_text: 'Fitness assessment',
    cta_secondary_link: '/assessment',
    video_url: '',
    background_image: ''
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [detectedDim, setDetectedDim] = useState('');

  const currentPageObj = pages.find(p => p.slug === selectedPage) || pages[0];
  const currentPageName = currentPageObj.name;

  useEffect(() => {
    async function loadHero() {
      setLoading(true);
      setSuccessMsg('');
      try {
        const res = await apiClient.get(ENDPOINTS.CMS.HEROES);
        const items = res.data.results || res.data;
        if (Array.isArray(items) && items.length > 0) {
          const hero = items.find(h => h.page_identifier === selectedPage || h.page_slug === selectedPage);
          if (hero) {
            setHeroData({
              id: hero.id,
              eyebrow: hero.eyebrow || `SWEAT HQ · ${currentPageName.toUpperCase()}`,
              headline: hero.headline || `TRANSFORM AT ${currentPageName.toUpperCase()}`,
              subheadline: hero.subheading || hero.subheadline || `The coaches and team behind Bollywood's best-known bodies are now coaching Andheri.`,
              cta_primary_text: hero.cta_primary_text || 'Experience SWEAT',
              cta_primary_link: hero.cta_primary_link || '/book',
              cta_secondary_text: hero.cta_secondary_text || 'Fitness assessment',
              cta_secondary_link: hero.cta_secondary_link || '/assessment',
              video_url: hero.video_url || hero.video_file || '',
              background_image: hero.fallback_image || hero.background_image || ''
            });
            return;
          }
        }
        // Sensible defaults when no record exists yet so fields are never empty
        setHeroData({
          eyebrow: `SWEAT HQ · ${currentPageName.toUpperCase()}`,
          headline: `TRANSFORM AT ${currentPageName.toUpperCase()}`,
          subheadline: `Experience world-class coaching, precision strength and metabolic conditioning at SWEAT HQ Andheri.`,
          cta_primary_text: 'Experience SWEAT',
          cta_primary_link: '/book',
          cta_secondary_text: 'Fitness assessment',
          cta_secondary_link: '/assessment',
          video_url: '',
          background_image: ''
        });
      } catch (err) {
        console.error('Failed to load hero for page:', err);
      } finally {
        setLoading(false);
      }
    }
    loadHero();
  }, [selectedPage]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg('');
    try {
      const payload = {
        ...heroData,
        page_identifier: selectedPage,
        page_slug: selectedPage,
        subheading: heroData.subheadline || heroData.subheading || `Experience world-class coaching, precision strength and metabolic conditioning at SWEAT HQ Andheri.`,
        eyebrow: heroData.eyebrow || `SWEAT HQ · ${currentPageName.toUpperCase()}`,
        headline: heroData.headline || `TRANSFORM AT ${currentPageName.toUpperCase()}`,
        cta_primary_text: heroData.cta_primary_text || 'Experience SWEAT',
        cta_primary_link: heroData.cta_primary_link || '/book',
        cta_secondary_text: heroData.cta_secondary_text || 'Fitness assessment',
        cta_secondary_link: heroData.cta_secondary_link || '/assessment',
        video_url: heroData.video_url || '',
        video_file: heroData.video_url || heroData.video_file || '',
        background_image: heroData.background_image || '',
        fallback_image: heroData.background_image || heroData.fallback_image || '',
      };
      if (heroData.id) {
        await apiClient.put(`${ENDPOINTS.CMS.HEROES}${heroData.id}/`, payload);
      } else {
        const res = await apiClient.post(ENDPOINTS.CMS.HEROES, payload);
        setHeroData(prev => ({ ...prev, id: res.data.id }));
      }
      setSuccessMsg(`Hero banner for ${currentPageName.toUpperCase()} saved & published successfully!`);
    } catch (err) {
      const errorData = err.response?.data;
      const details = errorData ? JSON.stringify(errorData, null, 2) : err.message;
      alert('Error saving hero banner:\n' + details);
    } finally {
      setSaving(false);
    }
  };

  const handleMediaUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setUploadedFileName(file.name);
    setSuccessMsg('');

    try {
      const res = await mediaApi.uploadFile(file, `${selectedPage}_hero_${file.name}`);
      const uploadedUrl = res.file_url || res.file;
      const isVideo = (file.type && file.type.startsWith('video/')) || /\.(mp4|mov|webm|ogg|m4v|avi|mkv)$/i.test(file.name);

      const updatedHeroData = {
        ...heroData,
        video_url: isVideo ? uploadedUrl : heroData.video_url,
        video_file: isVideo ? uploadedUrl : (heroData.video_file || heroData.video_url),
        background_image: !isVideo ? uploadedUrl : heroData.background_image,
        fallback_image: !isVideo ? uploadedUrl : (heroData.fallback_image || heroData.background_image)
      };
      setHeroData(updatedHeroData);

      // Auto-save directly to backend database so it goes live instantly in real time!
      const payload = {
        ...updatedHeroData,
        page_identifier: selectedPage,
        page_slug: selectedPage,
        subheading: updatedHeroData.subheadline || updatedHeroData.subheading || `Experience world-class coaching, precision strength and metabolic conditioning at SWEAT HQ Andheri.`,
        eyebrow: updatedHeroData.eyebrow || `SWEAT HQ · ${currentPageName.toUpperCase()}`,
        headline: updatedHeroData.headline || `TRANSFORM AT ${currentPageName.toUpperCase()}`,
        cta_primary_text: updatedHeroData.cta_primary_text || 'Experience SWEAT',
        cta_primary_link: updatedHeroData.cta_primary_link || '/book',
        cta_secondary_text: updatedHeroData.cta_secondary_text || 'Fitness assessment',
        cta_secondary_link: updatedHeroData.cta_secondary_link || '/assessment',
        video_url: isVideo ? uploadedUrl : (updatedHeroData.video_url || ''),
        video_file: isVideo ? uploadedUrl : (updatedHeroData.video_file || ''),
        background_image: !isVideo ? uploadedUrl : (updatedHeroData.background_image || ''),
        fallback_image: !isVideo ? uploadedUrl : (updatedHeroData.fallback_image || ''),
      };

      if (updatedHeroData.id) {
        await apiClient.put(`${ENDPOINTS.CMS.HEROES}${updatedHeroData.id}/`, payload);
      } else {
        const createRes = await apiClient.post(ENDPOINTS.CMS.HEROES, payload);
        setHeroData(prev => ({ ...prev, id: createRes.data.id }));
      }

      setSuccessMsg(`"${file.name}" uploaded AND published live to the ${currentPageName.toUpperCase()} website in real time!`);
    } catch (err) {
      console.error('Failed to upload media:', err);
      const errorData = err.response?.data;
      const details = errorData ? JSON.stringify(errorData, null, 2) : (err.response?.data?.error || err.message);
      alert(`Failed to upload media file:\n${details}`);
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleRemoveMedia = async () => {
    if (!window.confirm(`Are you sure you want to remove the hero background photo/video for the ${currentPageName.toUpperCase()} page?`)) {
      return;
    }
    setSaving(true);
    setSuccessMsg('');
    const updatedHeroData = {
      ...heroData,
      video_url: '',
      video_file: '',
      background_image: '',
      fallback_image: '',
    };
    setHeroData(updatedHeroData);
    setUploadedFileName('');
    setDetectedDim('');

    try {
      if (heroData.id) {
        await apiClient.put(`${ENDPOINTS.CMS.HEROES}${heroData.id}/`, {
          ...updatedHeroData,
          page_identifier: selectedPage,
          page_slug: selectedPage,
          video_url: '',
          video_file: null,
          background_image: '',
          fallback_image: null,
        });
      }
      setSuccessMsg(`Hero photo/video removed live for the ${currentPageName.toUpperCase()} page!`);
    } catch (err) {
      console.error('Failed to remove media:', err);
      alert('Failed to remove media: ' + (err.response?.data?.detail || err.message));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <div>
        <h1 className="disp" style={{ fontSize: '44px', margin: 0, color: '#0F172A' }}>
          HERO BANNERS
        </h1>
        <p style={{ margin: '4px 0 0', color: '#64748B', fontSize: '14px' }}>
          Select any of the 17 pages below to edit its headline typography, call to actions and background video loop
        </p>
      </div>

      {/* PAGE SELECTOR TABS (WHITE & RED) */}
      <div style={{
        display: 'flex',
        gap: '8px',
        flexWrap: 'wrap',
        background: '#FFFFFF',
        padding: '16px',
        borderRadius: '12px',
        border: '1px solid #E2E8F0',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
      }}>
        {pages.map(p => {
          const isSelected = selectedPage === p.slug;
          return (
            <button
              key={p.slug}
              type="button"
              onClick={() => setSelectedPage(p.slug)}
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
              {p.name}
            </button>
          );
        })}
      </div>

      {/* PROMINENT PAGE INDICATOR BANNER: KNOW EXACTLY WHICH SECTION YOU ARE EDITING */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        background: '#FEF2F2',
        border: '1.5px solid #FCA5A5',
        borderRadius: '10px',
        padding: '16px 20px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <span style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: '#E10600',
            boxShadow: '0 0 10px #E10600',
            flexShrink: 0
          }} />
          <div>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#991B1B', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
              CURRENTLY CONFIGURING HERO BANNER FOR:
            </div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', marginTop: '2px' }}>
              {currentPageName} Page Banner (Route: <code style={{ color: '#E10600', background: '#FFFFFF', padding: '2px 8px', borderRadius: '4px', fontSize: '14px' }}>/{selectedPage === 'home' ? '' : selectedPage}</code>)
            </div>
          </div>
        </div>

        <a
          href={`/${selectedPage === 'home' ? '' : selectedPage}`}
          target="_blank"
          rel="noreferrer"
          style={{
            fontSize: '12px',
            fontWeight: 800,
            color: '#E10600',
            background: '#FFFFFF',
            border: '1.5px solid #E10600',
            borderRadius: '6px',
            padding: '8px 16px',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 1px 3px rgba(225,6,0,0.1)'
          }}
        >
          <span>View Live Page</span>
          <ExternalLink size={13} color="#000000" strokeWidth={2.2} />
        </a>
      </div>

      {successMsg && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '14px 20px',
          background: '#DCFCE7',
          border: '1px solid #86EFAC',
          borderRadius: '8px',
          color: '#15803D',
          fontSize: '13px',
          fontWeight: 600
        }}>
          <CheckCircle2 size={18} color="#000000" strokeWidth={2.2} />
          <span>{successMsg}</span>
        </div>
      )}

      {loading ? (
        <div style={{ padding: '60px', textAlign: 'center', color: '#64748B' }}>Loading banner data...</div>
      ) : (
        <form onSubmit={handleSave} className="tile" style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '12px',
          padding: '32px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
        }}>
          <div className="grid2">
            <div className="field">
              <label>Eyebrow Label</label>
              <input
                type="text"
                value={heroData.eyebrow}
                onChange={e => setHeroData({ ...heroData, eyebrow: e.target.value })}
                placeholder={`e.g. SWEAT HQ · ${currentPageName.toUpperCase()}`}
              />
            </div>
            <div className="field">
              <label>Headline (Supports line breaks)</label>
              <input
                type="text"
                value={heroData.headline}
                onChange={e => setHeroData({ ...heroData, headline: e.target.value })}
                placeholder={`e.g. TRANSFORM AT ${currentPageName.toUpperCase()}`}
              />
            </div>
          </div>

          <div className="field">
            <label>Subheadline Description</label>
            <textarea
              rows="3"
              value={heroData.subheadline}
              onChange={e => setHeroData({ ...heroData, subheadline: e.target.value })}
              placeholder="e.g. In 45 minutes, understand your movement, strength and cardiovascular baselines..."
            />
          </div>

          <div className="grid2">
            <div className="field">
              <label>Primary Button Text</label>
              <input
                type="text"
                value={heroData.cta_primary_text}
                onChange={e => setHeroData({ ...heroData, cta_primary_text: e.target.value })}
                placeholder="e.g. Experience SWEAT"
              />
            </div>
            <div className="field">
              <label>Primary Button Link</label>
              <input
                type="text"
                value={heroData.cta_primary_link}
                onChange={e => setHeroData({ ...heroData, cta_primary_link: e.target.value })}
                placeholder="e.g. /book"
              />
            </div>
          </div>

          <div className="grid2">
            <div className="field">
              <label>Secondary Button Text</label>
              <input
                type="text"
                value={heroData.cta_secondary_text}
                onChange={e => setHeroData({ ...heroData, cta_secondary_text: e.target.value })}
                placeholder="e.g. Fitness assessment"
              />
            </div>
            <div className="field">
              <label>Secondary Button Link</label>
              <input
                type="text"
                value={heroData.cta_secondary_link}
                onChange={e => setHeroData({ ...heroData, cta_secondary_link: e.target.value })}
                placeholder="e.g. /assessment"
              />
            </div>
          </div>

          {/* MEDIA UPLOAD SECTION WITH LIVE PREVIEW */}
          <div style={{
            borderTop: '1px solid #E2E8F0',
            paddingTop: '24px',
            marginTop: '8px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '14px' }}>
              <div>
                <h4 style={{ margin: 0, fontSize: '15px', color: '#0F172A', fontWeight: 800 }}>
                  Banner Background Media & Video Loop
                </h4>
                <p style={{ margin: '4px 0 0', color: '#64748B', fontSize: '13px' }}>
                  Upload a high-impact background video loop or photography for the hero section
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
                <span>Recommended: <strong>1920 × 1080 px</strong> (16:9 Landscape · Full HD)</span>
              </div>
            </div>

            {/* DIMENSIONS & FORMAT GUIDE HELPER */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '10px',
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '8px',
              padding: '12px 16px',
              marginBottom: '16px'
            }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Video Loop Specs:</span>
                <div style={{ fontSize: '12px', color: '#334155', marginTop: '2px' }}>
                  1920×1080 px (16:9) · MP4 or WebM · &lt; 25 MB · Muted autoplay loop
                </div>
              </div>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Fallback Photo Specs:</span>
                <div style={{ fontSize: '12px', color: '#334155', marginTop: '2px' }}>
                  1920×1080 px (16:9) · JPG, WebP or PNG · &lt; 3 MB · High-res photography
                </div>
              </div>
            </div>

            <div className="grid2">
              <div className="field">
                <label>Direct Video Stream URL</label>
                <input
                  type="text"
                  value={heroData.video_url}
                  onChange={e => setHeroData({ ...heroData, video_url: e.target.value })}
                  placeholder="https://... /video.mp4"
                />
              </div>
              <div className="field">
                <label>Upload Video / Photo File</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <label className="btn btn-ghost" style={{
                    cursor: 'pointer',
                    minHeight: '50px',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    flex: 1
                  }}>
                    <Upload size={16} color="#000000" strokeWidth={2.5} style={{ stroke: '#000000' }} />
                    <span>{uploading ? `Uploading "${uploadedFileName}"...` : 'Choose Video or Photo to Upload'}</span>
                    <input
                      type="file"
                      accept="video/*,image/*"
                      onChange={handleMediaUpload}
                      style={{ display: 'none' }}
                    />
                  </label>
                  {(heroData.video_url || heroData.background_image) && (
                    <button
                      type="button"
                      onClick={handleRemoveMedia}
                      disabled={saving || uploading}
                      title="Remove current hero media"
                      className="btn"
                      style={{
                        background: '#FEF2F2',
                        border: '1px solid #FCA5A5',
                        color: '#DC2626',
                        minHeight: '50px',
                        padding: '0 16px',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontWeight: 700,
                        fontSize: '12px'
                      }}
                    >
                      <Trash2 size={16} />
                      <span>Remove</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* LIVE ATTACHED MEDIA PREVIEW */}
            {(heroData.video_url || heroData.background_image) && (
              <div style={{ marginTop: '16px', padding: '16px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '12px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 800, color: '#0F172A', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Play size={14} color="#000000" strokeWidth={2.2} />
                    <span>Live Attached Media Preview for {currentPageName} Page</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {detectedDim && (
                      <span className="pill" style={{ background: '#E0F2FE', color: '#0369A1', border: '1px solid #BAE6FD', fontSize: '11px', fontWeight: 700 }}>
                        Detected: {detectedDim}
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={handleRemoveMedia}
                      disabled={saving || uploading}
                      className="btn"
                      style={{
                        background: '#FEF2F2',
                        border: '1px solid #FCA5A5',
                        color: '#DC2626',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: 700,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <Trash2 size={13} />
                      <span>Remove Media</span>
                    </button>
                  </div>
                </div>

                {heroData.video_url ? (
                  <div>
                    <video
                      src={heroData.video_url}
                      controls
                      autoPlay
                      muted
                      loop
                      onLoadedMetadata={e => setDetectedDim(`${e.target.videoWidth} × ${e.target.videoHeight} px`)}
                      style={{ width: '100%', maxWidth: '440px', height: '220px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                    />
                    <div style={{ fontSize: '12px', color: '#64748B', marginTop: '6px' }}>
                      Video URL: <code style={{ color: '#0F172A', background: '#FFFFFF', padding: '2px 6px', borderRadius: '4px' }}>{heroData.video_url}</code>
                    </div>
                  </div>
                ) : (
                  <div>
                    <img
                      src={heroData.background_image}
                      alt="Hero background"
                      onLoad={e => setDetectedDim(`${e.target.naturalWidth} × ${e.target.naturalHeight} px`)}
                      style={{ width: '100%', maxWidth: '440px', height: '220px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                    />
                    <div style={{ fontSize: '12px', color: '#64748B', marginTop: '6px' }}>
                      Image URL: <code style={{ color: '#0F172A', background: '#FFFFFF', padding: '2px 6px', borderRadius: '4px' }}>{heroData.background_image}</code>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
            <button
              type="submit"
              disabled={saving || uploading}
              className="btn btn-red"
              style={{ minWidth: '180px', borderRadius: '6px', height: '50px' }}
            >
              <Save size={16} color="#000000" strokeWidth={2.5} style={{ stroke: '#000000' }} />
              <span>{saving ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
