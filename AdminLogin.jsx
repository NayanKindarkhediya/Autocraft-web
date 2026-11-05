import { useEffect, useState } from 'react';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2, Lock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Logo from '../../components/Logo';

export default function AdminLogin() {
  const { user, loading, login, isAdmin } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  useEffect(() => { document.title = 'Admin sign in — AutoCraft Web'; }, []);

  if (!loading && user && isAdmin) return <Navigate to="/admin/dashboard" replace />;

  const submit = async (e) => {
    e.preventDefault();
    setError(''); setBusy(true);
    try {
      const u = await login(email.trim(), password);
      if (u.role !== 'admin') throw new Error('This account does not have admin access.');
      nav('/admin/dashboard', { replace: true });
    } catch (err) { setError(err.message); } finally { setBusy(false); }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink px-5">
      <div className="absolute inset-0 grid-bg opacity-40 [mask-image:radial-gradient(circle_at_center,#000,transparent_70%)]" aria-hidden="true" />
      <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-accent/20 blur-[120px]" aria-hidden="true" />
      <motion.form onSubmit={submit} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="glass relative w-full max-w-md rounded-3xl p-8 sm:p-10">
        <Logo variant="badge" className="mx-auto mb-6 h-16 w-16 rounded-full" />
        <h1 className="text-center font-display text-3xl font-extrabold tracking-tight">Admin sign in</h1>
        <p className="mt-2 text-center text-sm text-white/50">Manage projects, inquiries and testimonials.</p>
        <div className="mt-8 space-y-5">
          <label className="block"><span className="mb-1.5 block text-xs text-white/60">Email</span><input type="email" required autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-lg border border-white/10 bg-ink px-4 py-3 outline-none focus:border-accent" /></label>
          <label className="block"><span className="mb-1.5 block text-xs text-white/60">Password</span><input type="password" required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-lg border border-white/10 bg-ink px-4 py-3 outline-none focus:border-accent" /></label>
        </div>
        {error && <p role="alert" className="mt-4 rounded-lg border border-red-500/30 bg-red-950/40 px-4 py-3 text-sm text-red-200">{error}</p>}
        <button type="submit" disabled={busy} className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-accent py-3.5 font-semibold transition hover:bg-accent-soft disabled:opacity-60">
          {busy ? <Loader2 size={18} className="animate-spin" /> : <Lock size={16} />}{busy ? 'Signing in…' : 'Sign in'}
        </button>
        <Link to="/" className="mt-6 block text-center text-xs text-white/40 hover:text-white/70">← Back to website</Link>
      </motion.form>
    </main>
  );
}
