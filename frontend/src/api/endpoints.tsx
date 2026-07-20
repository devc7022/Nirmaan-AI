export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/public/auth/login',
    REGISTER: '/api/public/auth/register',
    REFRESH: '/api/public/auth/refresh',
    ME: '/api/private/auth/me', // Note: Placeholder, not implemented in backend.
  },
  WORKERS: {
    BASE: '/api/private/workers',
    BY_ID: (id: string) => `/api/private/workers/${id}`,
  },
  SITES: {
    BASE: '/api/private/construction-sites',
    BY_ID: (id: string) => `/api/private/construction-sites/${id}`,
  },
  ATTENDANCE: {
    BASE: '/api/private/attendance',
    BY_ID: (id: string) => `/api/private/attendance/${id}`,
    AI: '/api/private/attendance/ai',
  },
  DASHBOARD: '/api/private/dashboard',
};
