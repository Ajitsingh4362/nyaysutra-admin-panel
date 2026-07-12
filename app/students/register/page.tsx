'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { UserPlus, Loader2 } from 'lucide-react';

export default function StudentRegister() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/student/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Registration failed');
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
      <div className="container px-4 mx-auto max-w-md">
        <div className="card">
          <p className="tag">Create Account</p>
          <h1 className="font-display text-2xl font-bold mt-2 mb-6">Join NyayaSutra</h1>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-[var(--muted2)] mb-1.5 block">Full Name</label>
              <input required className="input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}/>
            </div>
            <div>
              <label className="text-xs text-[var(--muted2)] mb-1.5 block">Email</label>
              <input type="email" required className="input" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}/>
            </div>
            <div>
              <label className="text-xs text-[var(--muted2)] mb-1.5 block">Phone (optional)</label>
              <input className="input" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}/>
            </div>
            <div>
              <label className="text-xs text-[var(--muted2)] mb-1.5 block">Password</label>
              <input type="password" required minLength={6} className="input" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}/>
            </div>
            <button type="submit" disabled={loading} className="btn-gold w-full justify-center">
              {loading ? <Loader2 size={15} className="animate-spin"/> : <UserPlus size={15}/>}
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-sm text-[var(--muted2)] mt-6 text-center">
            Already have an account? <Link href="/students/login" className="text-[var(--gold)] font-semibold">Login</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
