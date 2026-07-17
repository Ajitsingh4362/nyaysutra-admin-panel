'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LogIn, Loader2 } from 'lucide-react';

export default function StudentLogin() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/student/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');
      router.push('/students/dashboard');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="section min-h-[70vh] flex items-center">
      <div className="container px-4 mx-auto">
      <div className="max-w-md mx-auto">
        <div className="card">
          <p className="tag">Student Login</p>
          <h1 className="font-display text-2xl font-bold mt-2 mb-6">Welcome Back</h1>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-[var(--muted2)] mb-1.5 block">Email</label>
              <input
                type="email" required className="input"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div>
              <label className="text-xs text-[var(--muted2)] mb-1.5 block">Password</label>
              <input
                type="password" required className="input"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
              />
            </div>
            <button type="submit" disabled={loading} className="btn-gold w-full justify-center">
              {loading ? <Loader2 size={15} className="animate-spin"/> : <LogIn size={15}/>}
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p className="text-sm text-[var(--muted2)] mt-6 text-center">
            New here? <Link href="/students/register" className="text-[var(--gold)] font-semibold">Create an account</Link>
          </p>
        </div>
      </div>
      </div>
    </main>
  );
}
