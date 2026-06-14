'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { GraduationCap, Clock, BookOpen, Award, CheckCircle, RefreshCw, ArrowRight, IndianRupee } from 'lucide-react';

interface Course {
  _id: string; title: string; slug?: string; shortSummary: string;
  level: string; duration: string; modules: any[]; isFree: boolean; fee: number;
  hasCertificate: boolean; featured: boolean; coverImage: string;
}

export default function CoursesSection() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/courses')
      .then(r => r.json())
      .then(d => setCourses(Array.isArray(d) ? d : []))
      .catch(() => setCourses([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="section">
        <div className="container px-4 mx-auto text-center py-10">
          <RefreshCw size={22} className="animate-spin inline text-[var(--muted2)]"/>
        </div>
      </section>
    );
  }

  if (courses.length === 0) return null;

  return (
    <section className="section bg-[#0C1018]">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <p className="tag">Self-Paced Learning</p>
          <h2 className="section-title mt-3">Courses & Resources</h2>
          <p className="muted mt-4 max-w-2xl mx-auto">Structured courses with modules, reading material, video lectures and audio notes — created by Adv. A.K. Tripathi.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {courses.map(c => (
            <div key={c._id} className="card flex flex-col">
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
              <div className="flex items-center gap-4 mt-4 text-xs text-[var(--muted2)]">
                {c.duration && <span className="flex items-center gap-1"><Clock size={12}/>{c.duration}</span>}
                <span className="flex items-center gap-1"><BookOpen size={12}/>{c.modules?.length || 0} modules</span>
                {c.hasCertificate && <span className="flex items-center gap-1"><Award size={12}/>Certificate</span>}
              </div>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-[rgba(201,168,76,0.1)]">
                <span className="font-display text-lg font-bold text-[var(--gold)]">
                  {c.isFree ? 'Free' : <span className="flex items-center"><IndianRupee size={14}/>{c.fee}</span>}
                </span>
                <Link href={`/students/${c.slug || c._id}`} className="text-[var(--gold)] text-xs font-semibold inline-flex items-center gap-1">
                  View Course <ArrowRight size={11}/>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
