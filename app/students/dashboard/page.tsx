'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { RefreshCw, BookOpen, Award, LogOut, PlayCircle, CheckCircle2 } from 'lucide-react';

export default function StudentDashboard() {
  const router = useRouter();
  const [student, setStudent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notLoggedIn, setNotLoggedIn] = useState(false);

  useEffect(() => {
    fetch('/api/student/me')
      .then(async r => {
        if (r.status === 401) { setNotLoggedIn(true); return null; }
        return r.json();
      })
      .then(d => { if (d) setStudent(d.student); })
      .finally(() => setLoading(false));
  }, []);

  async function handleLogout() {
    await fetch('/api/student/logout', { method: 'POST' });
    router.push('/students/login');
    router.refresh();
  }

  if (loading) {
    return <main className="section text-center"><RefreshCw size={24} className="animate-spin inline text-[var(--muted2)]"/></main>;
  }

  if (notLoggedIn) {
    return (
      <main className="section overflow-x-hidden">
        <div className="container mx-auto px-4 text-center">
          <h1 className="section-title">Please Login</h1>
          <p className="muted mt-3">Apna dashboard dekhne ke liye login karo.</p>
          <Link href="/students/login" className="btn-gold mt-6">Login</Link>
        </div>
      </main>
    );
  }

  const enrollments = student?.enrollments || [];

  return (
    <main className="section overflow-x-hidden">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
          <div>
            <p className="tag">My Learning</p>
            <h1 className="section-title mt-2">Welcome, {student?.name}</h1>
          </div>
          <button onClick={handleLogout} className="btn-outline text-sm"><LogOut size={14}/> Logout</button>
        </div>

        {enrollments.length === 0 ? (
          <div className="card text-center py-14">
            <BookOpen size={32} className="mx-auto text-[var(--muted2)] mb-4"/>
            <h3 className="font-display text-xl font-semibold">Abhi koi course enroll nahi kiya</h3>
            <p className="muted mt-2">Courses browse karo aur seekhna shuru karo.</p>
            <Link href="/students#courses" className="btn-gold mt-6">Browse Courses</Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {enrollments.map((en: any) => {
              const course = en.course;
              if (!course) return null;
              const totalModules = course.modules?.length || 0;
              const completed = en.progress?.completedModules?.length || 0;
              const pct = totalModules ? Math.round((completed / totalModules) * 100) : 0;
              return (
                <div key={course._id} className="card flex flex-col">
                  {course.coverImage && (
                    <div className="aspect-[16/9] rounded-xl overflow-hidden mb-4 -mt-1">
                      <img src={course.coverImage} alt={course.title} className="w-full h-full object-cover"/>
                    </div>
                  )}
                  <h3 className="font-display text-lg font-semibold">{course.title}</h3>
                  <div className="flex items-center gap-3 mt-2 text-xs text-[var(--muted2)]">
                    <span className="flex items-center gap-1"><BookOpen size={12}/>{totalModules} modules</span>
                    {course.hasCertificate && <span className="flex items-center gap-1"><Award size={12}/>Certificate</span>}
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center justify-between text-xs text-[var(--muted2)] mb-1.5">
                      <span>Progress</span>
                      <span>{pct}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-[rgba(201,168,76,0.1)] overflow-hidden">
                      <div className="h-full bg-[var(--gold)] rounded-full transition-all" style={{ width: `${pct}%` }}/>
                    </div>
                  </div>

                  {pct === 100 && (
                    <div className="flex items-center gap-1.5 text-xs text-green-400 mt-3">
                      <CheckCircle2 size={13}/> Completed
                    </div>
                  )}

                  <Link href={`/students/learn/${course.slug || course._id}`} className="btn-gold w-full justify-center mt-4 text-sm">
                    <PlayCircle size={14}/> {completed > 0 ? 'Continue Learning' : 'Start Learning'}
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
