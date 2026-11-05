const BASE = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/$/, '');
const TOKEN_KEY = 'acw_token';

export const tokenStore = {
  get: () => { try { return localStorage.getItem(TOKEN_KEY); } catch { return null; } },
  set: (t) => { try { localStorage.setItem(TOKEN_KEY, t); } catch { /* storage unavailable */ } },
  clear: () => { try { localStorage.removeItem(TOKEN_KEY); } catch { /* storage unavailable */ } },
};

export class ApiError extends Error {
  constructor(message, status, details) { super(message); this.status = status; this.details = details; }
}

async function request(path, { method = 'GET', body, auth = false, signal } = {}) {
  const headers = { Accept: 'application/json' };
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  if (auth) { const t = tokenStore.get(); if (t) headers.Authorization = `Bearer ${t}`; }

  let res;
  try {
    res = await fetch(`${BASE}${path}`, { method, headers, signal, body: body !== undefined ? JSON.stringify(body) : undefined });
  } catch (err) {
    if (err.name === 'AbortError') throw err;
    throw new ApiError('Cannot reach the server. Please check your connection and try again.', 0);
  }
  let json = null;
  try { json = await res.json(); } catch { /* empty body */ }
  if (!res.ok) {
    if (res.status === 401 && auth) window.dispatchEvent(new Event('acw:unauthorized'));
    throw new ApiError(json?.message || `Request failed (${res.status})`, res.status, json?.details);
  }
  return json;
}

const crud = (base) => ({
  list: (params = '', signal) => request(`${base}${params}`, { signal, auth: true }).then((r) => r.data),
  create: (data) => request(base, { method: 'POST', body: data, auth: true }).then((r) => r.data),
  update: (id, data) => request(`${base}/${id}`, { method: 'PUT', body: data, auth: true }).then((r) => r.data),
  remove: (id) => request(`${base}/${id}`, { method: 'DELETE', auth: true }),
});

export const api = {
  auth: {
    login: (email, password) => request('/auth/login', { method: 'POST', body: { email, password } }),
    me: () => request('/auth/me', { auth: true }),
  },
  projects: {
    ...crud('/projects'),
    listPublic: (signal) => request('/projects', { signal }).then((r) => r.data),
    bySlug: (slug, signal) => request(`/projects/${encodeURIComponent(slug)}`, { signal }).then((r) => r.data),
  },
  testimonials: { ...crud('/testimonials'), listPublic: (signal) => request('/testimonials', { signal }).then((r) => r.data) },
  inquiries: {
    ...crud('/inquiries'),
    submit: (data) => request('/inquiries', { method: 'POST', body: data }),
  },
  stats: () => request('/stats', { auth: true }).then((r) => r.data),
};
