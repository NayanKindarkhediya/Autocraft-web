import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Loader2, X } from 'lucide-react';

const ToastCtx = createContext(() => {});
export const useToast = () => useContext(ToastCtx);

export function ToastProvider({ children }) {
  const [t, setT] = useState(null);
  const show = useCallback((msg, type = 'ok') => setT({ msg, type, id: Date.now() }), []);
  useEffect(() => { if (!t) return undefined; const id = setTimeout(() => setT(null), 3200); return () => clearTimeout(id); }, [t]);
  return (
    <ToastCtx.Provider value={show}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[200] flex justify-center px-4" role="status" aria-live="polite">
        <AnimatePresence>
          {t && (
            <motion.div key={t.id} initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}
              className={`flex items-center gap-2 rounded-full border px-5 py-3 text-sm shadow-2xl backdrop-blur ${t.type === 'error' ? 'border-red-500/40 bg-red-950/80 text-red-200' : 'border-emerald-500/30 bg-emerald-950/80 text-emerald-200'}`}>
              {t.type === 'error' ? <AlertCircle size={16} /> : <CheckCircle2 size={16} />}{t.msg}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ToastCtx.Provider>
  );
}

export const btn = {
  primary: 'inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-soft disabled:opacity-50',
  ghost: 'inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 px-4 py-2.5 text-sm transition hover:bg-white/5 disabled:opacity-50',
  danger: 'inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-500 disabled:opacity-50',
  icon: 'inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 transition hover:bg-white/10 disabled:opacity-50',
};

const inputCls = 'w-full rounded-lg border border-white/10 bg-ink px-3.5 py-2.5 text-sm text-bone outline-none transition focus:border-accent';
export function Field({ label, hint, children }) {
  return <label className="block"><span className="mb-1.5 block text-xs font-medium text-white/60">{label}</span>{children}{hint && <span className="mt-1 block text-[11px] text-white/35">{hint}</span>}</label>;
}
export const Input = ({ label, hint, ...p }) => <Field label={label} hint={hint}><input {...p} className={inputCls} /></Field>;
export const Textarea = ({ label, hint, rows = 3, ...p }) => <Field label={label} hint={hint}><textarea rows={rows} {...p} className={`${inputCls} resize-y`} /></Field>;
export const Select = ({ label, children, ...p }) => <Field label={label}><select {...p} className={inputCls}>{children}</select></Field>;

export function Modal({ title, onClose, children, wide }) {
  useEffect(() => {
    const k = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', k);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', k); document.body.style.overflow = ''; };
  }, [onClose]);
  return (
    <motion.div className="fixed inset-0 z-[150] flex items-start justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm sm:items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <motion.div role="dialog" aria-modal="true" aria-label={title} initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={`my-6 w-full rounded-2xl border border-white/10 bg-panel shadow-2xl ${wide ? 'max-w-3xl' : 'max-w-lg'}`}>
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4"><h3 className="font-display text-lg font-bold">{title}</h3><button type="button" aria-label="Close" onClick={onClose} className={btn.icon}><X size={16} /></button></div>
        <div className="p-6">{children}</div>
      </motion.div>
    </motion.div>
  );
}

export function ConfirmModal({ message, confirmLabel = 'Delete', busy, onConfirm, onCancel }) {
  return (
    <Modal title="Are you sure?" onClose={onCancel}>
      <p className="text-sm text-white/70">{message}</p>
      <div className="mt-6 flex justify-end gap-3"><button type="button" className={btn.ghost} onClick={onCancel}>Cancel</button><button type="button" className={btn.danger} disabled={busy} onClick={onConfirm}>{busy && <Loader2 size={14} className="animate-spin" />}{confirmLabel}</button></div>
    </Modal>
  );
}

export const Spinner = () => <div className="flex justify-center py-20 text-white/40"><Loader2 className="animate-spin" /></div>;
export const ErrorBox = ({ message, onRetry }) => (
  <div className="rounded-xl border border-red-500/30 bg-red-950/30 p-6 text-sm text-red-200"><p>{message}</p>{onRetry && <button type="button" onClick={onRetry} className={`${btn.ghost} mt-4`}>Try again</button>}</div>
);
export const Empty = ({ title, hint, children }) => (
  <div className="rounded-2xl border border-dashed border-white/15 px-6 py-14 text-center"><p className="font-display text-lg font-bold">{title}</p>{hint && <p className="mx-auto mt-2 max-w-md text-sm text-white/50">{hint}</p>}<div className="mt-5 flex justify-center gap-3">{children}</div></div>
);

const badgeColors = { New: 'bg-accent/20 text-accent-soft', Contacted: 'bg-amber-500/15 text-amber-300', 'In Progress': 'bg-violet-500/15 text-violet-300', Completed: 'bg-emerald-500/15 text-emerald-300', Closed: 'bg-white/10 text-white/50' };
export const Badge = ({ status }) => <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${badgeColors[status] || badgeColors.Closed}`}>{status}</span>;
export const STATUSES = ['New', 'Contacted', 'In Progress', 'Completed', 'Closed'];
export const fmtDate = (d) => new Date(d).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });

// Small hook for async list loading with retry.
export function useLoad(fn, deps = []) {
  const [state, setState] = useState({ data: null, loading: true, error: '' });
  const load = useCallback(() => {
    setState((s) => ({ ...s, loading: true, error: '' }));
    return fn().then((data) => setState({ data, loading: false, error: '' })).catch((e) => setState({ data: null, loading: false, error: e.message }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  useEffect(() => { load(); }, [load]);
  return { ...state, reload: load, setData: (data) => setState((s) => ({ ...s, data })) };
}
