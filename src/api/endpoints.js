// ==========================================================================
// SWEAT HQ — Master Production API Endpoints Dictionary
// Maps every single public page and CMS Studio admin module to its endpoint
// ==========================================================================

export const ENDPOINTS = {
  // Authentication & CMS Studio Core
  AUTH: {
    LOGIN: '/auth/token/',
    REFRESH: '/auth/token/refresh/',
    CURRENT_USER: '/auth/me/',
  },

  // Public Individual Pages (100% Real-Time & Dynamic)
  PUBLIC: {
    PAGE_CONTENT: (pageSlug) => `/public/content/${pageSlug}/`,
    HOME: '/public/content/home/',
    PROGRAMS: '/public/content/programs/',
    BOOTCAMP: '/public/content/bootcamp/',
    PILATES: '/public/content/pilates/',
    GLUTES: '/public/content/glutes/',
    COACHING: '/public/content/coaching/',
    ASSESSMENT: '/public/content/assessment/',
    NUTRITION: '/public/content/nutrition/',
    RECOVERY: '/public/content/recovery/',
    ONLINE: '/public/content/online/',
    ELITE: '/public/content/elite/',
    MEMBERSHIP: '/public/content/membership/',
    TEAM: '/public/content/team/',
    SHOP: '/public/content/shop/',
    VISIT: '/public/content/visit/',
    BOOK: '/public/content/book/',
    APP: '/public/content/app/',
    
    // Booking Submissions (Direct to Django DB)
    SUBMIT_BOOKING: '/bookings/',
  },

  // CMS Studio Management Endpoints (CRUD)
  CMS: {
    HEROES: '/cms/heroes/',
    PROGRAMS: '/cms/programs/',
    CELEBRITIES: '/cms/celebrities/',
    TRANSFORMATIONS: '/cms/transformations/',
    COACHES: '/cms/coaches/',
    MEMBERSHIPS: '/cms/memberships/',
    LEADS: '/bookings/cms/leads/',
    MEDIA: '/cms/media/',
    MEDIA_UPLOAD_DIRECT: '/cms/media/upload/',
  },
};
