import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { projects as localProjects } from '../data/projects';

// Local data renders instantly; if the API has projects they replace it. Cached per page load.
let cache = null;
let inflight = null;

const load = () => {
  if (cache) return Promise.resolve(cache);
  if (!inflight) {
    inflight = api.projects.listPublic().then((d) => { cache = Array.isArray(d) && d.length ? d : localProjects; return cache; })
      .catch(() => { cache = localProjects; return cache; }).finally(() => { inflight = null; });
  }
  return inflight;
};

export const resetProjectsCache = () => { cache = null; };

export function useProjects() {
  const [projects, setProjects] = useState(cache || localProjects);
  const [loading, setLoading] = useState(!cache);
  useEffect(() => {
    let live = true;
    load().then((d) => { if (live) { setProjects(d); setLoading(false); } });
    return () => { live = false; };
  }, []);
  return { projects, loading };
}
