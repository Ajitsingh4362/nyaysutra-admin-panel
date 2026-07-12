'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft, RefreshCw, CheckCircle2, Circle, FileText, Video, Mic,
  Lock, PlayCircle, Award,
} from 'lucide-react';

export default function CoursePlayer() {
  const params = useParams();
  const [course, setCourse] = useState<any>(null);
  const [student, setStudent] = useState<any>(null);
  const [notLoggedIn, setNotLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeModule, setActiveModule] = useState(0);
  const [marking, setMarking] = useState(false);

  useEffect(() => {
    async function load() {
      const courseRes = await fetch('/api/courses');
      const courseList = await courseRes.json();
      const found = (Array.isArray(courseList) ? courseList : []).find(
        (c: any) => c.slug === params.slug || c._id === params.slug
      );
      setCourse(found || null);

      const meRes = await fetch('/api/student/me');
      if (meRes.status === 401) {
        setNotLoggedIn(true);
      } else {
        const meData = await meRes.json();
        setStudent(meData.student);
      }
      setLoading(false);
    }
    load();
  }, [params.slug]);

  if (loading) return <main className="section text-center"><RefreshCw size={24} className="animate-spin inline text-[var(--muted2)]"/></main>;

  if (notLoggedIn) {
    return (
      <main className="section overflow-x-hidden">
        <div className="container mx-auto px-4 text-center">
          <Lock size={28} className="mx-auto text-[var(--muted2)] mb-4"/>
          <h1 className="section-title">Please Login</h1>
          <p className="muted mt-3">Ye course access karne ke liye login karo.</p>
          <Link href="/students/login" className="btn-gold mt-6">Login</Link>
        </div>
      </main>
    );
  }

  if (!course) {
    return (
      <main className="section overflow-x-hidden">
        <div className="container mx-auto px-4 text-center">
          <h1 className="section-title">Course Not Found</h1>
          <Link href="/students" className="btn-gold mt-6">Back to Students</Link>
        </div>
      </main>
    );
  }

  const enrollment = student?.enrollments?.find((e: any) => {
    const cid = typeof e.course === 'object' ? e.course._id : e.course;
    return cid === course._id;
  });

  if (!enrollment) {
    return (
      <main className="section overflow-x-hidden">
        <div className="container mx-auto px-4 text-center">
          <Lock size={28} className="mx-auto text-[var(--muted2)] mb-4"/>
          <h1 className="section-title">Not Enrolled</h1>
          <p className="muted mt-3">Is course ka content dekhne ke liye pehle enroll karo.</p>
          <Link href={`/students/${course.slug || course._id}`} className="btn-gold mt-6">Go to Course Page</Link>
        </div>
      </main>
    );
  }

  const completedModules: number[] = enrollment.progress?.completedModules || [];
  const modules = course.modules || [];
  const currentModule = modules[activeModule];
  const isCompleted = completedModules.includes(activeModule);
  const allCompleted = modules.length > 0 && completedModules.length >= modules.length;

  async function markComplete() {
    setMarking(true);
    try {
      const res = await fetch('/api/enroll/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId: course._id, moduleIndex: activeModule }),
      });
      const data = await res.json();
      if (res.ok) {
        setStudent((prev: any) => ({
          ...prev,
          enrollments: prev.enrollments.map((e: any) => {
            const cid = typeof e.course === 'object' ? e.course._id : e.course;
            if (cid !== course._id) return e;
            return { ...e, progress: { ...e.progress, completedModules: data.completedModules } };
          }),
        }));
      }
    } finally {
      setMarking(false);
    }
  }

  return (
    <main className="overflow-x-hidden">
      <section className="py-6 px-4 bg-[#0C1018] border-b border-[rgba(201,168,76,0.1)]">
        <div className="container mx-auto">
          <Link href="/students/dashboard" className="inline-flex items-center gap-2 text-sm text-[var(--muted2)] hover:text-[var(--gold)] transition-colors">
            <ArrowLeft size={14}/> My Learning
          </Link>
          <h1 className="font-display text-2xl font-bold mt-2">{course.title}</h1>
          {allCompleted && course.hasCertificate && (
            <div className="flex items-center gap-2 mt-3 text-sm text-green-400">
              <Award size={16}/> Course complete! Certificate ke liye contact karo.
            </div>
          )}
        </div>
      </section>

      <section className="section !pt-8">
        <div className="container px-4 mx-auto grid lg:grid-cols-[1fr_320px] gap-8">
          {/* Content area */}
          <div>
            {currentModule ? (
              <div className="card">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display text-xl font-semibold">
                    {activeModule + 1}. {currentModule.title}
                  </h2>
                </div>
                {currentModule.description && (
                  <p className="muted mb-5">{currentModule.description}</p>
                )}

                {currentModule.videoUrl && (
                  <div className="mb-4 aspect-video rounded-xl overflow-hidden bg-black">
                    <video src={currentModule.videoUrl} controls className="w-full h-full"/>
                  </div>
                )}

                <div className="flex flex-wrap gap-2 mb-5">
                  {currentModule.pdfUrl && (
                    <a href={currentModule.pdfUrl} target="_blank" className="btn-outline text-sm">
                      <FileText size={14}/> Open PDF Notes
                    </a>
                  )}
                  {currentModule.audioUrl && (
                    <a href={currentModule.audioUrl} target="_blank" className="btn-outline text-sm">
                      <Mic size={14}/> Audio Notes
                    </a>
                  )}
                </div>

                {!currentModule.pdfUrl && !currentModule.videoUrl && !currentModule.audioUrl && (
                  <p className="text-sm text-[var(--muted2)]">Resources coming soon for this module.</p>
                )}

                <div className="flex items-center gap-3 pt-4 border-t border-[rgba(201,168,76,0.1)]">
                  <button
                    onClick={markComplete}
                    disabled={marking || isCompleted}
                    className={isCompleted ? 'btn-outline text-sm opacity-70' : 'btn-gold text-sm'}
                  >
                    {isCompleted ? <><CheckCircle2 size={14}/> Completed</> : <><Circle size={14}/> {marking ? 'Saving...' : 'Mark as Complete'}</>}
                  </button>
                  {activeModule < modules.length - 1 && (
                    <button onClick={() => setActiveModule(activeModule + 1)} className="btn-outline text-sm">
                      Next Module
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="card text-center py-14">
                <p className="muted">Is course me abhi koi module add nahi hua hai.</p>
              </div>
            )}
          </div>

          {/* Module list sidebar */}
          <aside>
            <div className="card sticky top-24">
              <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-[var(--muted2)] mb-4">
                Course Content ({completedModules.length}/{modules.length})
              </h3>
              <div className="space-y-1.5 max-h-[60vh] overflow-y-auto">
                {modules.map((mod: any, idx: number) => {
                  const done = completedModules.includes(idx);
                  const active = idx === activeModule;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveModule(idx)}
                      className={`w-full flex items-center gap-2.5 text-left p-2.5 rounded-xl text-sm transition-colors
                        ${active ? 'bg-[rgba(201,168,76,0.12)] text-[var(--gold)]' : 'text-[var(--muted)] hover:bg-[rgba(201,168,76,0.06)]'}`}
                    >
                      {done ? <CheckCircle2 size={15} className="text-green-400 shrink-0"/> : <PlayCircle size={15} className="shrink-0"/>}
                      <span className="truncate">{idx + 1}. {mod.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
