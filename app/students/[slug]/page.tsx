'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock, BookOpen, Award, CheckCircle, RefreshCw, FileText, Video, Mic, IndianRupee, MessageCircle, ChevronDown } from 'lucide-react';

export default function CourseDetail() {
  const params = useParams();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [openModule, setOpenModule] = useState<number|null>(0);

  useEffect(() => {
    fetch('/api/courses')
      .then(r => r.json())
      .then(d => {
        const list = Array.isArray(d) ? d : [];
        const found = list.find((c:any) => c.slug === params.slug || c._id === params.slug);
        setCourse(found || null);
      })
      .finally(() => setLoading(false));
  }, [params.slug]);

  if (loading) return <main className="section text-center"><RefreshCw size={24} className="animate-spin inline text-[var(--muted2)]"/></main>;

  if (!course) return (
    <main className="section overflow-x-hidden">
      <div className="container mx-auto px-4 text-center">
        <h1 className="section-title">Course Not Found</h1>
        <Link href="/students" className="btn-gold mt-6">Back to Students</Link>
      </div>
    </main>
  );

  return (
    <main className="overflow-x-hidden">
      <section className="relative py-14 px-4 bg-[#0C1018] overflow-hidden">
        <div className="container mx-auto relative z-10">
          <Link href="/students" className="inline-flex items-center gap-2 text-sm text-[var(--muted2)] hover:text-[var(--gold)] mb-6 transition-colors"><ArrowLeft size={14}/> Students & Internship</Link>
          <span className="text-[10px] font-bold text-[var(--gold)] uppercase tracking-widest bg-[rgba(201,168,76,0.1)] px-3 py-1 rounded-full">{course.level}</span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold mt-4 leading-tight max-w-3xl">{course.title}</h1>
          <p className="muted text-lg mt-4 max-w-2xl">{course.shortSummary}</p>
          <div className="flex flex-wrap items-center gap-4 mt-5">
            {course.duration && <span className="flex items-center gap-1.5 text-sm text-[var(--muted2)]"><Clock size={13}/>{course.duration}</span>}
            <span className="flex items-center gap-1.5 text-sm text-[var(--muted2)]"><BookOpen size={13}/>{course.modules?.length||0} modules</span>
            {course.hasCertificate && <span className="flex items-center gap-1.5 text-sm text-[var(--muted2)]"><Award size={13}/>Certificate on completion</span>}
            <span className="font-display text-lg font-bold text-[var(--gold)] flex items-center">{course.isFree ? 'Free' : <><IndianRupee size={14}/>{course.fee}</>}</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container px-4 mx-auto grid lg:grid-cols-[1fr_300px] gap-10">
          <div>
            {course.fullDescription && (
              <div className="mb-10">
                <h2 className="font-display text-2xl font-bold text-[var(--gold)] mb-4">About This Course</h2>
                <p className="muted leading-relaxed">{course.fullDescription}</p>
              </div>
            )}

            {course.learningOutcomes?.length > 0 && (
              <div className="mb-10">
                <h2 className="font-display text-2xl font-bold text-[var(--gold)] mb-4">What You'll Learn</h2>
                <div className="grid sm:grid-cols-2 gap-2">
                  {course.learningOutcomes.map((o:string,i:number) => (
                    <div key={i} className="flex items-start gap-2 p-3 rounded-xl bg-[rgba(201,168,76,0.04)] border border-[rgba(201,168,76,0.08)]">
                      <CheckCircle size={13} className="text-[var(--gold)] shrink-0 mt-0.5"/>
                      <span className="text-sm text-[var(--muted)]">{o}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {course.modules?.length > 0 && (
              <div className="mb-10">
                <h2 className="font-display text-2xl font-bold text-[var(--gold)] mb-4">Course Modules</h2>
                <div className="space-y-2">
                  {course.modules.map((mod:any, idx:number) => (
                    <div key={idx} className="rounded-xl border border-[rgba(201,168,76,0.12)] bg-[rgba(201,168,76,0.03)] overflow-hidden">
                      <button onClick={() => setOpenModule(openModule===idx?null:idx)} className="w-full flex items-center justify-between p-4 text-left">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[rgba(201,168,76,0.15)] flex items-center justify-center text-[var(--gold)] font-bold text-sm shrink-0">{idx+1}</div>
                          <span className="font-semibold text-sm">{mod.title}</span>
                        </div>
                        <ChevronDown size={16} className={`text-[var(--muted2)] transition-transform shrink-0 ${openModule===idx?'rotate-180':''}`}/>
                      </button>
                      {openModule===idx && (
                        <div className="px-4 pb-4 pl-15">
                          {mod.description && <p className="text-sm text-[var(--muted2)] mb-3">{mod.description}</p>}
                          <div className="flex flex-wrap gap-2">
                            {mod.pdfUrl && <a href={mod.pdfUrl} target="_blank" className="btn-outline text-xs py-1.5 px-3"><FileText size={11}/> PDF Notes</a>}
                            {mod.videoUrl && <a href={mod.videoUrl} target="_blank" className="btn-outline text-xs py-1.5 px-3"><Video size={11}/> Video</a>}
                            {mod.audioUrl && <a href={mod.audioUrl} target="_blank" className="btn-outline text-xs py-1.5 px-3"><Mic size={11}/> Audio</a>}
                            {!mod.pdfUrl && !mod.videoUrl && !mod.audioUrl && <p className="text-xs text-[var(--muted2)]">Resources coming soon</p>}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {course.prerequisites?.length > 0 && (
              <div>
                <h2 className="font-display text-2xl font-bold text-[var(--gold)] mb-4">Prerequisites</h2>
                <div className="flex flex-wrap gap-2">
                  {course.prerequisites.map((p:string) => <span key={p} className="px-3 py-1.5 rounded-xl text-xs border border-[rgba(201,168,76,0.2)] text-[var(--muted)]">{p}</span>)}
                </div>
              </div>
            )}
          </div>

          <aside>
            <div className="card sticky top-24">
              <h3 className="font-display text-xl font-semibold mb-1">{course.isFree ? 'Free Course' : `₹${course.fee}`}</h3>
              <p className="text-[var(--muted2)] text-sm mb-5">Instructor: {course.instructor}</p>
              <div className="space-y-3">
                <a href="https://wa.me/919971950371" target="_blank" className="btn-gold w-full justify-center text-sm"><MessageCircle size={14}/> Enquire on WhatsApp</a>
                <Link href="/contact" className="btn-outline w-full justify-center text-sm">Contact for Enrollment</Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
