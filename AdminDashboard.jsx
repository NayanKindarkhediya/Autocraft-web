import { useEffect } from 'react';
import { Link, Navigate, useSearchParams } from 'react-router-dom';
import { ExternalLink, FolderKanban, Inbox, LayoutDashboard, LogOut, MessageSquareQuote } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ToastProvider, Spinner } from '../../components/admin/ui';
import Logo from '../../components/Logo';
import Overview from '../../components/admin/Overview';
import ProjectsManager from '../../components/admin/ProjectsManager';
import InquiriesManager from '../../components/admin/InquiriesManager';
import TestimonialsManager from '../../components/admin/TestimonialsManager';

const tabs = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard, View: Overview },
  { id: 'projects', label: 'Projects', icon: FolderKanban, View: ProjectsManager },
  { id: 'inquiries', label: 'Inquiries', icon: Inbox, View: InquiriesManager },
  { id: 'testimonials', label: 'Testimonials', icon: MessageSquareQuote, View: TestimonialsManager },
];

export default function AdminDashboard() {
  const { user, loading, isAdmin, logout } = useAuth();
  const [params, setParams] = useSearchParams();
  useEffect(() => {
    document.title = 'Dashboard — AutoCraft Web';
    const m = document.createElement('meta'); m.name = 'robots'; m.content = 'noindex,nofollow'; document.head.appendChild(m);
    return () => m.remove();
  }, []);

  if (loading) return <div className="min-h-screen bg-ink"><Spinner /></div>;
  if (!user || !isAdmin) return <Navigate to="/admin/login" replace />;

  const active = tabs.find((t) => t.id === params.get('tab')) || tabs[0];
  const go = (id) => setParams({ tab: id });

  return (
    <ToastProvider>
      <div className="min-h-screen bg-ink text-bone lg:flex">
        <aside className="border-b border-white/10 bg-coal lg:sticky lg:top-0 lg:h-screen lg:w-64 lg:shrink-0 lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between px-5 py-4 lg:flex-col lg:items-start lg:gap-8 lg:py-7">
            <Logo className="h-5 w-auto" />
            <button type="button" onClick={logout} className="flex items-center gap-2 text-xs text-white/50 hover:text-white lg:hidden"><LogOut size={14} /> Sign out</button>
          </div>
          <nav aria-label="Admin" className="scroll-hide flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-col lg:px-4">
            {tabs.map((t) => (
              <button key={t.id} type="button" onClick={() => go(t.id)} aria-current={t.id === active.id ? 'page' : undefined}
                className={`flex shrink-0 items-center gap-3 rounded-lg px-4 py-2.5 text-sm transition ${t.id === active.id ? 'bg-accent/15 text-accent-soft' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}>
                <t.icon size={17} />{t.label}
              </button>
            ))}
          </nav>
          <div className="hidden px-4 lg:absolute lg:bottom-6 lg:block lg:w-64">
            <p className="truncate px-4 text-xs text-white/40">{user.name}</p>
            <p className="mb-3 truncate px-4 text-[11px] text-white/30">{user.email}</p>
            <Link to="/" className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm text-white/60 hover:bg-white/5 hover:text-white"><ExternalLink size={15} /> View website</Link>
            <button type="button" onClick={logout} className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-white/60 hover:bg-white/5 hover:text-white"><LogOut size={15} /> Sign out</button>
          </div>
        </aside>
        <main className="min-w-0 flex-1 px-5 py-8 md:px-10 lg:py-12">
          <h1 className="mb-8 font-display text-3xl font-extrabold tracking-tight md:text-4xl">{active.label}</h1>
          <active.View goTo={go} />
        </main>
      </div>
    </ToastProvider>
  );
}
