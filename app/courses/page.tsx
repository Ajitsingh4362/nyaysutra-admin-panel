import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { mapCourse } from '@/lib/mappers';
import CoursesClient, { Course } from './CoursesClient';

export const revalidate = 0;

async function getPublishedCourses(): Promise<Course[]> {
  try {
    const sb = supabaseAdmin();
    const { data, error } = await sb
      .from('courses')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return (data || []).map(mapCourse);
  } catch {
    return [];
  }
}

export default async function CoursesPage() {
  const courses = await getPublishedCourses();
  return <CoursesClient courses={courses} />;
}
