import { api } from '../../services/api';
import { Badge, ErrorBox, Spinner, fmtDate, useLoad } from './ui';

export default function Overview({ goTo }) {
  const { data, loading, error, reload } = useLoad(async () => {
    const [stats, inquiries] = await Promise.all([api.stats(), api.inquiries.list()]);
    return { stats, recent: inquiries.slice(0, 5) };
  }, []);
  if (loading) return <Spinner />;
  if (error) return <ErrorBox message={error} onRetry={reload} />;
  const { stats, recent } = data;
  const cards = [
    { label: 'Projects', value: stats.projects, tab: 'projects' },
    { label: 'New inquiries', value: stats.newInquiries, tab: 'inquiries', accent: true },
    { label: 'Total inquiries', value: stats.totalInquiries, tab: 'inquiries' },
    { label: 'Testimonials', value: stats.testimonials, tab: 'testimonials' },
  ];
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {cards.map((c) => (
          <button key={c.label} type="button" onClick={() => goTo(c.tab)} className={`rounded-2xl border p-6 text-left transition hover:-translate-y-0.5 ${c.accent ? 'border-accent/40 bg-accent/10' : 'border-white/10 bg-panel hover:border-white/25'}`}>
            <p className="text-xs text-white/50">{c.label}</p><p className="mt-3 font-display text-5xl font-extrabold tabular-nums">{c.value}</p>
          </button>
        ))}
      </div>
      <section>
        <div className="mb-4 flex items-center justify-between"><h2 className="font-display text-xl font-bold">Recent inquiries</h2><button type="button" onClick={() => goTo('inquiries')} className="text-sm text-accent-soft hover:underline">View all</button></div>
        {recent.length === 0 ? <p className="rounded-2xl border border-dashed border-white/15 p-8 text-center text-sm text-white/50">No inquiries yet. Submissions from the contact form will appear here.</p> : (
          <ul className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-panel">
            {recent.map((i) => (
              <li key={i._id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
                <div className="min-w-0"><p className="truncate font-medium">{i.name} <span className="text-white/40">· {i.email}</span></p><p className="truncate text-sm text-white/50">{i.message}</p></div>
                <div className="flex items-center gap-4"><span className="text-xs text-white/40">{fmtDate(i.createdAt)}</span><Badge status={i.status} /></div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
