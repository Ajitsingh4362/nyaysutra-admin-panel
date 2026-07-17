'use client';
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft, RefreshCw, CheckCircle2, Circle, FileText, Video, Mic,
  Lock, PlayCircle, Award, StickyNote, Download, ChevronLeft, ChevronRight, Maximize,
} from 'lucide-react';

type Tab = 'video' | 'notes' | 'resources';

function getVideoEmbed(url: string): { type: 'youtube' | 'iframe' | 'direct'; embedUrl: string } | null {
  if (!url) return null;
  const ytMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (ytMatch) {
    return { type: 'youtube', embedUrl: `https://www.youtube.com/embed/${ytMatch[1]}` };
  }
  if (url.includes('player.cloudinary.com/embed')) {
    return { type: 'iframe', embedUrl: url };
  }
  return { type: 'direct', embedUrl: url };
}

export default function CoursePlayer() {
  const params = useParams();
  const [course, setCourse] = useState<any>(null);
  const [student, setStudent] = useState<any>(null);
  const [videoError, setVideoError] = useState(false);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const [notLoggedIn, setNotLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeModule, setActiveModule] = useState(0);
  const [activeTab, setActiveTab] = useState<Tab>('video');
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

  // TEMP: login no longer required to view course content, for now.
  // if (notLoggedIn) {
  //   return (
  //     <main className="section overflow-x-hidden">
  //       <div className="container mx-auto px-4 text-center">
  //         <Lock size={28} className="mx-auto text-[var(--muted2)] mb-4"/>
  //         <h1 className="section-title">Please Login</h1>
  //         <p className="muted mt-3">Login to access this course.</p>
  //         <Link href="/students/login" className="btn-gold mt-6">Login</Link>
  //       </div>
  //     </main>
  //   );
  // }

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

  // TEMP: content unlocked for any logged-in student for now, even without a matched enrollment record.
  const effectiveEnrollment = enrollment || { progress: { completedModules: [] } };

  const completedModules: number[] = effectiveEnrollment.progress?.completedModules || [];
  const modules = course.modules || [];
  const currentModule = modules[activeModule];
  const isCompleted = completedModules.includes(activeModule);
  const allCompleted = modules.length > 0 && completedModules.length >= modules.length;

  const notesParagraphs: string[] = (currentModule?.content || '')
    .split(/\n\s*\n/)
    .map((p: string) => p.trim())
    .filter(Boolean);

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

  function goToModule(idx: number) {
    setActiveModule(idx);
    setVideoError(false);
    setActiveTab(currentModuleHasVideo(idx) ? 'video' : currentModuleHasNotes(idx) ? 'notes' : 'resources');
  }
  function currentModuleHasVideo(idx: number) { return !!modules[idx]?.videoUrl; }
  function currentModuleHasNotes(idx: number) { return !!modules[idx]?.content; }

  const tabs: { key: Tab; label: string; icon: any; show: boolean }[] = [
    { key: 'video', label: 'Video', icon: Video, show: !!currentModule?.videoUrl },
    { key: 'notes', label: 'Notes', icon: StickyNote, show: !!currentModule?.content },
    { key: 'resources', label: 'Resources', icon: FileText, show: !!(currentModule?.pdfUrl || currentModule?.audioUrl) },
  ];
  const visibleTabs = tabs.filter(t => t.show);

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
              <Award size={16}/> Course complete! Contact us to receive your certificate.
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
                <div className="flex items-center justify-between mb-1">
                  <h2 className="font-display text-xl font-semibold">
                    {activeModule + 1}. {currentModule.title}
                  </h2>
                </div>
                {currentModule.description && (
                  <p className="muted text-sm mb-5">{currentModule.description}</p>
                )}

                {/* Tabs */}
                {visibleTabs.length > 0 && (
                  <div className="flex items-center gap-1 mb-5 border-b border-[rgba(201,168,76,0.1)]">
                    {visibleTabs.map(t => (
                      <button
                        key={t.key}
                        onClick={() => setActiveTab(t.key)}
                        className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px
                          ${activeTab === t.key ? 'border-[var(--gold)] text-[var(--gold)]' : 'border-transparent text-[var(--muted2)] hover:text-[var(--ivory)]'}`}
                      >
                        <t.icon size={14}/> {t.label}
                      </button>
                    ))}
                  </div>
                )}

                {/* Tab content */}
                {activeTab === 'video' && currentModule.videoUrl && (() => {
                  const embed = getVideoEmbed(currentModule.videoUrl);
                  if (!embed) return null;

                  const handleFullscreen = async () => {
                    const el = videoWrapRef.current;
                    if (!el) return;
                    try {
                      if (el.requestFullscreen) await el.requestFullscreen();
                      // @ts-ignore vendor-prefixed fallback for older mobile browsers
                      else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
                      // Try to force landscape on phones once fullscreen is active (Android Chrome only; iOS ignores this safely).
                      // @ts-ignore
                      if (screen.orientation && screen.orientation.lock) {
                        // @ts-ignore
                        await screen.orientation.lock('landscape').catch(() => {});
                      }
                    } catch {
                      // Fullscreen not supported/blocked — controls still have a native fullscreen icon as fallback.
                    }
                  };

                  if (embed.type === 'youtube' || embed.type === 'iframe') {
                    return (
                      <div ref={videoWrapRef} className="relative aspect-video rounded-xl overflow-hidden bg-black mb-2 group">
                        <iframe
                          src={embed.embedUrl}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                          allowFullScreen
                        />
                        <button
                          onClick={handleFullscreen}
                          className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/70 hover:bg-black/90 text-white text-xs px-3 py-2 rounded-lg backdrop-blur-sm transition-colors"
                        >
                          <Maximize size={13}/> Fullscreen
                        </button>
                      </div>
                    );
                  }
                  return (
                    <div className="mb-2">
                      <div ref={videoWrapRef} className="relative aspect-video rounded-xl overflow-hidden bg-black group">
                        {!videoError ? (
                          <>
                            <video
                              key={embed.embedUrl}
                              src={embed.embedUrl}
                              controls
                              playsInline
                              className="w-full h-full"
                              onError={() => setVideoError(true)}
                            />
                            <button
                              onClick={handleFullscreen}
                              className="absolute bottom-14 right-3 flex items-center gap-1.5 bg-black/70 hover:bg-black/90 text-white text-xs px-3 py-2 rounded-lg backdrop-blur-sm transition-colors"
                            >
                              <Maximize size={13}/> Fullscreen
                            </button>
                          </>
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-center px-6">
                            <Video size={24} className="text-[var(--muted2)]"/>
                            <p className="text-sm text-[var(--muted2)]">
                              This video couldn't load. The link may not be a direct video file (.mp4).
                            </p>
                            <a href={embed.embedUrl} target="_blank" className="btn-outline text-xs py-1.5 px-3">
                              Open video link directly
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })()}

                {activeTab === 'notes' && (
                  <div className="prose-notes max-w-none">
                    {notesParagraphs.length > 0 ? (
                      notesParagraphs.map((p, i) => (
                        <p key={i} className="text-sm text-[var(--muted)] leading-relaxed mb-4 whitespace-pre-line">{p}</p>
                      ))
                    ) : (
                      <p className="text-sm text-[var(--muted2)]">No notes have been added for this lesson yet.</p>
                    )}
                  </div>
                )}

                {activeTab === 'resources' && (
                  <div className="flex flex-wrap gap-2">
                    {currentModule.pdfUrl && (
                      <a href={currentModule.pdfUrl} target="_blank" className="btn-outline text-sm">
                        <Download size={13}/> Download PDF Notes
                      </a>
                    )}
                    {currentModule.audioUrl && (
                      <a href={currentModule.audioUrl} target="_blank" className="btn-outline text-sm">
                        <Mic size={13}/> Audio Notes
                      </a>
                    )}
                    {!currentModule.pdfUrl && !currentModule.audioUrl && (
                      <p className="text-sm text-[var(--muted2)]">No resources available yet.</p>
                    )}
                  </div>
                )}

                {visibleTabs.length === 0 && (
                  <p className="text-sm text-[var(--muted2)]">Content for this module is coming soon.</p>
                )}

                <div className="flex items-center justify-between gap-3 pt-5 mt-5 border-t border-[rgba(201,168,76,0.1)] flex-wrap">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => activeModule > 0 && goToModule(activeModule - 1)}
                      disabled={activeModule === 0}
                      className="btn-outline text-xs py-2 px-3 disabled:opacity-30"
                    >
                      <ChevronLeft size={13}/> Prev
                    </button>
                    <button
                      onClick={() => activeModule < modules.length - 1 && goToModule(activeModule + 1)}
                      disabled={activeModule === modules.length - 1}
                      className="btn-outline text-xs py-2 px-3 disabled:opacity-30"
                    >
                      Next <ChevronRight size={13}/>
                    </button>
                  </div>
                  <button
                    onClick={markComplete}
                    disabled={marking || isCompleted}
                    className={isCompleted ? 'btn-outline text-sm opacity-70' : 'btn-gold text-sm'}
                  >
                    {isCompleted ? <><CheckCircle2 size={14}/> Completed</> : <><Circle size={14}/> {marking ? 'Saving...' : 'Mark as Complete'}</>}
                  </button>
                </div>
              </div>
            ) : (
              <div className="card text-center py-14">
                <p className="muted">No modules have been added to this course yet.</p>
              </div>
            )}
          </div>

          {/* Module list sidebar */}
          <aside>
            <div className="card sticky top-24">
              <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-[var(--muted2)] mb-4">
                Course Content ({completedModules.length}/{modules.length})
              </h3>
              <div className="space-y-1.5 max-h-[65vh] overflow-y-auto">
                {modules.map((mod: any, idx: number) => {
                  const done = completedModules.includes(idx);
                  const active = idx === activeModule;
                  return (
                    <button
                      key={idx}
                      onClick={() => goToModule(idx)}
                      className={`w-full flex items-center gap-2.5 text-left p-2.5 rounded-xl text-sm transition-colors
                        ${active ? 'bg-[rgba(201,168,76,0.12)] text-[var(--gold)]' : 'text-[var(--muted)] hover:bg-[rgba(201,168,76,0.06)]'}`}
                    >
                      {done ? <CheckCircle2 size={15} className="text-green-400 shrink-0"/> : <PlayCircle size={15} className="shrink-0"/>}
                      <span className="truncate flex-1">{idx + 1}. {mod.title}</span>
                      <span className="flex items-center gap-1 shrink-0 text-[var(--muted2)]">
                        {mod.videoUrl && <Video size={11}/>}
                        {mod.content && <StickyNote size={11}/>}
                        {mod.pdfUrl && <FileText size={11}/>}
                      </span>
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
