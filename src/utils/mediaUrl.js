// Utility to safely resolve media URLs whether stored as full URL, relative /media/, or raw DB path
export const resolveMediaUrl = (urlOrPath) => {
  if (!urlOrPath) return '';
  const str = String(urlOrPath).trim();
  if (str.startsWith('http://') || str.startsWith('https://') || str.startsWith('data:')) {
    return str;
  }

  const baseOrigin = import.meta.env.PROD
    ? 'https://sweatfit.vibesandbox.live'
    : 'http://localhost:8000';

  if (str.startsWith('/media/')) {
    return `${baseOrigin}${str}`;
  }
  if (str.startsWith('media/')) {
    return `${baseOrigin}/${str}`;
  }
  // Raw path like 'uploads/2026/10/...' or 'heroes/videos/...'
  return `${baseOrigin}/media/${str.replace(/^\/+/, '')}`;
};

export default resolveMediaUrl;
