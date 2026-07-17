'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  ShieldCheck, Search, RefreshCw, CheckCircle2, XCircle, Award,
  Calendar, User, BookOpen, GraduationCap, MessageCircle
} from 'lucide-react';

interface VerifiedCertificate {
  certificateNumber: string;
  studentName: string;
  courseName: string;
  courseType: string;
  duration: string;
  startDate: string;
  endDate: string;
  grade: string;
  issueDate: string;
  signatoryName: string;
  signatoryDesignation: string;
  status: string;
}

function formatDate(d: string) {
  if (!d) return '';
  try {
    return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  } catch { return d; }
}

function VerifyContent() {
  const searchParams = useSearchParams();
  const [certNumber, setCertNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [result, setResult] = useState<VerifiedCertificate | null>(null);
  const [error, setError] = useState('');

  const runVerify = async (number: string) => {
    if (!number.trim()) { setError('Please enter a certificate number.'); return; }
    setLoading(true);
    setSearched(true);
    setError('');
    setResult(null);
    try {
      const res = await fetch(`/api/certificates?number=${encodeURIComponent(number.trim())}`);
      if (!res.ok) throw new Error('lookup-failed');
      const data = await res.json();
      setResult(data || null);
    } catch {
      setError('Could not verify right now. Please try again shortly.');
    }
    setLoading(false);
  };

  // Allow deep-linking: /verify?number=NS-CERT-2026-0001
  useEffect(() => {
    const fromQuery = searchParams.get('number');
    if (fromQuery) {
      setCertNumber(fromQuery);
      runVerify(fromQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative py-20 px-4 overflow-hidden bg-[#0C1018]">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(201,168,76,0.07),transparent_60%)] pointer-events-none"/>
        <div className="container mx-auto relative z-10 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[rgba(201,168,76,0.12)] flex items-center justify-center mx-auto mb-5">
            <ShieldCheck size={28} className="text-[var(--gold)]"/>
          </div>
          <p className="tag">Authenticity Check</p>
          <h1 className="section-title mt-3">Certificate Verification</h1>
          <p className="muted text-lg mt-5 max-w-2xl mx-auto">
            Verify the authenticity of any certificate, internship, or course completion document issued by NyayaSutra — Legal Intelligence.
          </p>
        </div>
      </section>

      {/* Search */}
      <section className="section">
        <div className="container px-4 mx-auto !max-w-xl">
          <div className="card">
            <label className="block text-[10px] text-[var(--gold)] mb-2 font-bold uppercase tracking-wider">Certificate Number</label>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted2)]"/>
                <input
                  value={certNumber}
                  onChange={e => setCertNumber(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && runVerify(certNumber)}
                  className="input pl-10 font-mono"
                  placeholder="e.g. NS-CERT-2026-0001"
                />
              </div>
              <button onClick={() => runVerify(certNumber)} disabled={loading} className="btn-gold justify-center px-6">
                {loading ? <RefreshCw size={14} className="animate-spin"/> : <Search size={14}/>}
                {loading ? 'Checking...' : 'Verify'}
              </button>
            </div>
            <p className="text-[10px] text-[var(--muted2)] mt-2">Certificate number is printed at the bottom of every NyayaSutra certificate.</p>
            {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
          </div>

          {/* Results */}
          {searched && !loading && (
            <div className="mt-6">
              {result ? (
                <div className="card border-green-500/30 bg-green-500/5">
                  <div className="flex items-center gap-3 mb-5 pb-5 border-b border-green-500/20">
                    <div className="w-12 h-12 rounded-full bg-green-500/15 flex items-center justify-center shrink-0">
                      <CheckCircle2 size={24} className="text-green-400"/>
                    </div>
                    <div>
                      <h2 className="font-display text-xl font-bold text-green-400">Certificate Verified</h2>
                      <p className="text-xs text-[var(--muted2)]">This is a genuine certificate issued by NyayaSutra.</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <User size={14} className="text-[var(--gold)] mt-0.5 shrink-0"/>
                      <div>
                        <p className="text-[10px] text-[var(--muted2)] uppercase tracking-wider">Student Name</p>
                        <p className="font-semibold">{result.studentName}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <BookOpen size={14} className="text-[var(--gold)] mt-0.5 shrink-0"/>
                      <div>
                        <p className="text-[10px] text-[var(--muted2)] uppercase tracking-wider">Course / Program</p>
                        <p className="font-semibold">{result.courseName}</p>
                        <p className="text-xs text-[var(--muted2)] mt-0.5">{result.courseType}{result.duration ? ` · ${result.duration}` : ''}</p>
                      </div>
                    </div>
                    {(result.startDate || result.endDate) && (
                      <div className="flex items-start gap-3">
                        <Calendar size={14} className="text-[var(--gold)] mt-0.5 shrink-0"/>
                        <div>
                          <p className="text-[10px] text-[var(--muted2)] uppercase tracking-wider">Duration Period</p>
                          <p className="text-sm">{formatDate(result.startDate)} {result.endDate ? `— ${formatDate(result.endDate)}` : ''}</p>
                        </div>
                      </div>
                    )}
                    <div className="flex items-start gap-3">
                      <GraduationCap size={14} className="text-[var(--gold)] mt-0.5 shrink-0"/>
                      <div>
                        <p className="text-[10px] text-[var(--muted2)] uppercase tracking-wider">Grade / Result</p>
                        <p className="text-sm">{result.grade}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Award size={14} className="text-[var(--gold)] mt-0.5 shrink-0"/>
                      <div>
                        <p className="text-[10px] text-[var(--muted2)] uppercase tracking-wider">Issued On</p>
                        <p className="text-sm">{formatDate(result.issueDate)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-green-500/20">
                    <p className="text-[10px] text-[var(--muted2)]">
                      Certificate No: <span className="font-mono text-[var(--gold)]">{result.certificateNumber}</span>
                    </p>
                    <p className="text-[10px] text-[var(--muted2)] mt-1">
                      Signed by {result.signatoryName} — {result.signatoryDesignation}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="card border-red-500/30 bg-red-500/5 text-center py-10">
                  <XCircle size={36} className="text-red-400 mx-auto mb-3"/>
                  <h2 className="font-display text-lg font-bold text-red-400">Certificate Not Found</h2>
                  <p className="text-xs text-[var(--muted2)] mt-2 max-w-sm mx-auto">
                    We could not find an active certificate matching this number. Please check the number and try again, or contact us if you believe this is an error.
                  </p>
                  <a href="https://wa.me/919971950371" target="_blank" className="btn-outline text-xs mt-5">
                    <MessageCircle size={12}/> Contact NyayaSutra
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Info */}
      <section className="section-sm bg-[#0C1018] px-4">
        <div className="container mx-auto !max-w-xl text-center">
          <p className="muted text-sm">
            All certificates issued by NyayaSutra — Legal Intelligence carry a unique certificate number. If you have questions about a certificate, please{' '}
            <Link href="/contact" className="text-[var(--gold)] hover:underline">contact us</Link>.
          </p>
        </div>
      </section>
    </main>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={
      <main className="section text-center">
        <RefreshCw size={24} className="animate-spin inline text-[var(--muted2)]"/>
      </main>
    }>
      <VerifyContent/>
    </Suspense>
  );
}
