'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Clock, BookOpen, Award, RefreshCw, ArrowRight, IndianRupee, GraduationCap, Search,
} from 'lucide-react';

interface Course {
  _id: string; title: string; slug?: string; shortSummary: string;
  level: string; duration: string; modules: any[]; isFree: boolean; fee: number;
  hasCertificate: boolean; featured: boolean; coverImage: string;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState('All');

  useEffect(() => {
    fetch('/api/courses')
      .then(r => r.json())
      .then(d => setCourses(Array.isArray(d) ? d : []))
      .catch(() => setCourses([]))
      .finally(() => setLoading(false));
  }, []);

  const levels = ['All', ...Array.from(new Set(courses.map(c => c.level).filter(Boolean)))];
  const filtered = courses.filter(c =>
    (levelFilter === 'All' || c.level === levelFilter) &&
    (!search || c.title.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <main className="overflow-x-hidden">
      <section className="relative py-16 px-4 bg-[#0C1018] text-center overflow-hidden">
        <div className="container mx-auto relative z-10">
          <p className="tag mx-auto">Learn at Your Own Pace</p>
          <h1 className="section-title mt-3">All Courses</h1>
          <p className="muted mt-4 max-w-2xl mx-auto">
            Structured legal courses — video lectures, written notes and downloadable resources, created by Adv. A.K. Tripathi.
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <Link href="/students/dashboard" className="btn-outline text-xs py-2 px-4"><GraduationCap size={13}/> My Courses</Link>
            <Link href="/students/login" className="text-xs text-[var(--gold)] font-semibold">Student Login</Link>
          </div>
        </div>
      </section>

      <section className="section !pt-10">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-8">
            <div className="relative w-full sm:max-w-xs">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted2)]"/>
              <input value={search} onChange={e => setSearch(e.target.value)} className="input pl-9 text-sm" placeholder="Search courses..."/>
            </div>
            <div className="flex flex-wrap gap-2">
              {levels.map(l => (
                <button
                  key={l}
                  onClick={() => setLevelFilter(l)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-colors
                    ${levelFilter === l
                      ? 'bg-[var(--gold)] text-black border-[var(--gold)] font-semibold'
                      : 'border-[rgba(201,168,76,0.25)] text-[var(--muted2)] hover:text-[var(--gold)]'}`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="text-center py-20"><RefreshCw size={24} className="animate-spin inline text-[var(--muted2)]"/></div>
          ) : filtered.length === 0 ? (
            <div className="card text-center py-16">
              <GraduationCap size={32} className="mx-auto text-[var(--muted2)] mb-3 opacity-40"/>
              <p className="muted">{courses.length === 0 ? 'Courses jald add honge. Please check back soon.' : 'Koi matching course nahi mila.'}</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map(c => (
                <Link key={c._id} href={`/students/${c.slug || c._id}`} className="card card-link flex flex-col">
                  {c.coverImage && (
                    <div className="aspect-[16/9] rounded-xl overflow-hidden mb-4 -mt-1">
                      <img src={c.coverImage} alt={c.title} className="w-full h-full object-cover"/>
                    </div>
                  )}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-[var(--gold)] uppercase tracking-widest bg-[rgba(201,168,76,0.1)] px-2 py-0.5 rounded-full">{c.level}</span>
                    {c.featured && <Award size={14} className="text-[var(--gold)]"/>}
                  </div>
                  <h3 className="font-display text-xl font-semibold">{c.title}</h3>
                  <p className="text-[var(--muted2)] text-sm mt-2 leading-relaxed flex-1">{c.shortSummary}</p>
                  <div className="flex items-center gap-4 mt-4 text-xs text-[var(--muted2)] flex-wrap">
                    {c.duration && <span className="flex items-center gap-1"><Clock size={12}/>{c.duration}</span>}
                    <span className="flex items-center gap-1"><BookOpen size={12}/>{c.modules?.length || 0} modules</span>
                    {c.hasCertificate && <span className="flex items-center gap-1"><Award size={12}/>Certificate</span>}
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-[rgba(201,168,76,0.1)]">
                    <span className="font-display text-lg font-bold text-[var(--gold)]">
                      {c.isFree ? 'Free' : <span className="flex items-center"><IndianRupee size={14}/>{c.fee}</span>}
                    </span>
                    <span className="text-[var(--gold)] text-xs font-semibold inline-flex items-center gap-1">
                      Enroll Now <ArrowRight size={11}/>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
