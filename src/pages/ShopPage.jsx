import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag, Check } from 'lucide-react';
import contentApi from '../api/contentApi';
import MarqueeBanner from '../components/common/MarqueeBanner';

export default function ShopPage() {
  const [data, setData] = useState({
    hero: null,
    products: []
  });
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    async function loadShopContent() {
      try {
        setLoading(true);
        const res = await contentApi.getPageContent('shop');
        setData({
          hero: res.hero || null,
          products: res.products || []
        });
      } catch (err) {
        console.error('Failed to fetch real-time shop data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadShopContent();
  }, []);

  const categories = ['ALL', 'SUPPLEMENTS', 'GEAR', 'APPAREL', 'LIFESTYLE'];

  const filteredProducts = activeCategory === 'ALL'
    ? data.products
    : data.products.filter(p => p.category?.toUpperCase() === activeCategory);

  return (
    <div className="sw">
      {/* HERO SECTION */}
      <section className="hero-section" style={{
        position: 'relative',
        overflow: 'hidden',
        padding: '120px 0 88px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end'
      }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          {data.hero?.video_url ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              src={data.hero.video_url}
            />
          ) : (
            <div className="shot" style={{ width: '100%', height: '100%', border: 0 }}>
              <b>SWEAT HQ OFFICIAL SHOP</b>
              <span>High-performance apparel, training gear & nutrition</span>
            </div>
          )}
        </div>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, rgba(10, 10, 10, 0.94) 0%, rgba(10, 10, 10, 0.65) 55%, rgba(10, 10, 10, 0.3) 100%)'
        }} />
        <div style={{
          position: 'absolute',
          inset: 'auto 0 0',
          height: '240px',
          background: 'linear-gradient(rgba(10, 10, 10, 0), rgba(10, 10, 10, 0.98))'
        }} />

        <div className="wrap" style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="eyebrow red"
          >
            {data.hero?.eyebrow || 'The SWEAT Shop'}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="disp h1"
          >
            {data.hero?.headline ? (
              <span dangerouslySetInnerHTML={{ __html: data.hero.headline.replace('\n', '<br/>') }} />
            ) : (
              <>WEAR THE<br />WORK.</>
            )}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{ margin: 0, fontSize: '21px', lineHeight: 1.55, color: '#e5e5e5', maxWidth: '560px' }}
          >
            {data.hero?.subheadline || 'Supplements, gear and apparel that support your training, recovery and identity.'}
          </motion.p>
        </div>
      </section>

      {/* MARQUEE */}
      <MarqueeBanner text="SUPPLEMENTS ✕ GEAR ✕ APPAREL ✕ LIFESTYLE ✕ " />

      {/* PRODUCT CATALOG GRID */}
      <section style={{ padding: '88px 0', minHeight: '800px' }}>
        <div className="wrap">
          {/* CATEGORY FILTER CHIPS */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className="chip"
                style={{
                  minHeight: '52px',
                  padding: '0 24px',
                  background: activeCategory === cat ? '#E10600' : 'transparent',
                  borderColor: activeCategory === cat ? '#E10600' : 'rgba(255, 255, 255, 0.28)',
                  color: '#FFFFFF'
                }}
              >
                {cat}
              </button>
            ))}

            {cartCount > 0 && (
              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px', color: '#FF3B30' }}>
                <ShoppingBag size={20} />
                <span style={{ fontWeight: 800 }}>{cartCount} item(s) selected</span>
              </div>
            )}
          </div>

          {/* DYNAMIC PRODUCTS */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '100px 0', color: '#A3A3A3' }}>
              <div className="disp" style={{ fontSize: '36px' }}>Loading Real-time Catalog...</div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="tile" style={{ marginTop: '48px', textAlign: 'center', padding: '64px 20px' }}>
              <h3 className="disp" style={{ fontSize: '48px', color: '#FF3B30' }}>No Products Listed In This Category</h3>
              <p style={{ color: '#A3A3A3', marginTop: '12px' }}>
                Update products dynamically via CMS Studio to display live items here.
              </p>
              <Link to="/admin-studio/shop" className="btn btn-ghost" style={{ marginTop: '24px' }}>
                Open CMS Catalog Manager
              </Link>
            </div>
          ) : (
            <div className="grid4" style={{ marginTop: '40px', rowGap: '48px' }}>
              {filteredProducts.map((product) => {
                const prodTitle = product.name || product.title || 'SWEAT Essential';
                const displayPrice = product.price ? (product.price.toString().startsWith('₹') ? product.price : `₹${product.price}`) : '₹2,400';
                return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
                  >
                    <div className="shot" style={{ height: '380px' }}>
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={prodTitle}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      ) : (
                        <>
                          <b style={{ fontSize: '16px' }}>{prodTitle}</b>
                          <span>{product.category || 'Gear'} · Official SWEAT</span>
                        </>
                      )}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '12px' }}>
                      <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 700 }}>{prodTitle}</h3>
                      <b style={{ color: '#E10600', fontSize: '18px' }}>{displayPrice}</b>
                    </div>
                    <p style={{ margin: 0, fontSize: '13px', color: '#A3A3A3', lineHeight: 1.4 }}>
                      {product.description}
                    </p>
                    <button
                      onClick={() => setCartCount(c => c + 1)}
                      className="btn btn-ghost"
                      style={{ minHeight: '46px', fontSize: '12px', marginTop: 'auto' }}
                    >
                      Add to cart
                    </button>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CONNECT TO APP WHITE SECTION */}
      <section className="white" style={{ padding: '104px 0', background: '#FFFFFF', minHeight: '480px' }}>
        <div className="wrap">
          <div className="split">
            <div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
                <span className="eyebrow red">In the app too</span>
                <h2 className="disp h2" style={{ fontSize: 'clamp(56px, 10vw, 112px)' }}>
                  SHOP FROM YOUR PLAN.
                </h2>
                <p style={{ margin: 0, fontSize: '18px', lineHeight: 1.6, color: '#4A4A4A', maxWidth: '640px' }}>
                  Products connect to your program, so you find what you need while you follow your journey.
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
              <Link to="/app" className="btn btn-black">Open in app</Link>
              <Link to="/visit" className="btn btn-ghost" style={{ color: '#0A0A0A', borderColor: 'rgba(0, 0, 0, 0.3)' }}>
                Visit the store
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* STICKY BOTTOM BAR */}
      <div className="stick">
        <div className="wrap" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          minHeight: '64px',
          flexWrap: 'wrap',
          paddingTop: '8px',
          paddingBottom: '8px'
        }}>
          <span className="disp" style={{ fontSize: '24px', color: '#FFFFFF', paddingTop: '3px' }}>
            Two ways in · pick your slot
          </span>
          <span style={{ display: 'flex', gap: '10px' }}>
            <Link to="/book" className="btn btn-black" style={{ minHeight: '44px', padding: '0 18px', fontSize: '12px' }}>
              Experience SWEAT
            </Link>
            <Link to="/assessment" className="btn btn-white" style={{ minHeight: '44px', padding: '0 18px', fontSize: '12px' }}>
              Fitness assessment
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
