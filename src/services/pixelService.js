// ==========================================================================
// SWEAT HQ — Isolated & Fault-Tolerant Meta Pixel Analytics Engine
// 100% Fail-Safe: AdBlocker resilient, non-blocking, dynamically configurable
// ==========================================================================

const STORAGE_KEY = 'sweat_meta_pixel_config';
export const DEFAULT_PIXEL_ID = '1373876318156695';

// Read dynamic configuration from localStorage or default
export function getPixelConfig() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        pixelId: parsed.pixelId || DEFAULT_PIXEL_ID,
        enabled: parsed.enabled !== false,
        debugMode: parsed.debugMode !== false,
        showMonitor: parsed.showMonitor !== false,
      };
    }
  } catch (e) {
    // Fail silently
  }

  return {
    pixelId: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_META_PIXEL_ID) || DEFAULT_PIXEL_ID,
    enabled: true,
    debugMode: true,
    showMonitor: true,
  };
}

// Update configuration dynamically in real time without code reload
export function updatePixelConfig(partial) {
  try {
    const current = getPixelConfig();
    const updated = { ...current, ...partial };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    // If Pixel ID changed and fbq exists, re-init with the new ID
    if (partial.pixelId && partial.pixelId !== current.pixelId && typeof window !== 'undefined' && window.fbq) {
      window.fbq('init', partial.pixelId);
    }

    notifySubscribers({ type: 'CONFIG_UPDATED', config: updated });
    return updated;
  } catch (err) {
    console.warn('[PixelConfig Update Warning]', err);
    return getPixelConfig();
  }
}

// In-memory event buffer for real-time frontend monitoring HUD
const MAX_EVENTS = 30;
let eventHistory = [];
const subscribers = new Set();

function pushEventRecord(record) {
  eventHistory = [record, ...eventHistory].slice(0, MAX_EVENTS);
  notifySubscribers({ type: 'EVENT_FIRED', record, history: eventHistory });
  
  // Also log to browser developer console if debugMode is enabled
  const config = getPixelConfig();
  if (config.debugMode && typeof console !== 'undefined') {
    const statusIcon = record.status === 'sent' ? '✅' : '⚠️';
    console.log(
      `%c[Meta Pixel ${statusIcon}] ${record.eventName}`,
      'background: #1877F2; color: #fff; font-weight: bold; padding: 2px 6px; border-radius: 4px;',
      record.payload || {}
    );
  }
}

function notifySubscribers(data) {
  subscribers.forEach(cb => {
    try {
      cb(data);
    } catch (e) {
      // Guard against subscriber errors
    }
  });
}

export function subscribeToPixelEvents(callback) {
  subscribers.add(callback);
  return () => subscribers.delete(callback);
}

export function getEventHistory() {
  return [...eventHistory];
}

export function clearEventHistory() {
  eventHistory = [];
  notifySubscribers({ type: 'HISTORY_CLEARED', history: [] });
}

/**
 * Safe Meta Standard Event Tracker
 * Zero crash guarantee: will never throw, break UI, or delay workflows
 */
export function trackEvent(eventName, payload = {}) {
  if (typeof window === 'undefined') return;

  const config = getPixelConfig();
  if (!config.enabled) return;

  const record = {
    id: 'px_' + Math.random().toString(36).substring(2, 9),
    timestamp: new Date().toLocaleTimeString(),
    eventName,
    type: 'standard',
    pixelId: config.pixelId,
    payload: { ...payload },
    status: 'pending',
  };

  try {
    if (typeof window.fbq === 'function') {
      window.fbq('track', eventName, payload);
      record.status = 'sent';
    } else {
      record.status = 'fbq_not_loaded (e.g. ad-blocker)';
    }
  } catch (err) {
    record.status = 'error: ' + (err?.message || 'unknown');
    console.warn('[Meta Pixel Safe Guard]', err);
  }

  pushEventRecord(record);
}

/**
 * Safe Meta Custom Event Tracker
 */
export function trackCustomEvent(eventName, payload = {}) {
  if (typeof window === 'undefined') return;

  const config = getPixelConfig();
  if (!config.enabled) return;

  const record = {
    id: 'px_' + Math.random().toString(36).substring(2, 9),
    timestamp: new Date().toLocaleTimeString(),
    eventName,
    type: 'custom',
    pixelId: config.pixelId,
    payload: { ...payload },
    status: 'pending',
  };

  try {
    if (typeof window.fbq === 'function') {
      window.fbq('trackCustom', eventName, payload);
      record.status = 'sent';
    } else {
      record.status = 'fbq_not_loaded (e.g. ad-blocker)';
    }
  } catch (err) {
    record.status = 'error: ' + (err?.message || 'unknown');
    console.warn('[Meta Pixel Safe Guard]', err);
  }

  pushEventRecord(record);
}

/**
 * Track route change PageView
 */
export function trackPageView(pagePath) {
  trackEvent('PageView', {
    page_path: pagePath,
    page_title: typeof document !== 'undefined' ? document.title : '',
    referrer: typeof document !== 'undefined' ? document.referrer : '',
  });
}

