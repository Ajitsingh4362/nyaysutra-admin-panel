export function mapCourse(row: any) {
  if (!row) return null;
  return {
    _id: row.id,
    id: row.id,
    title: row.title,
    slug: row.slug,
    shortSummary: row.short_summary,
    fullDescription: row.full_description,
    level: row.level,
    duration: row.duration,
    language: row.language,
    instructor: row.instructor,
    coverImage: row.cover_image,
    coverImagePublicId: row.cover_image_public_id,
    fee: row.fee,
    isFree: row.is_free,
    modules: row.modules || [],
    learningOutcomes: row.learning_outcomes || [],
    prerequisites: row.prerequisites || [],
    hasCertificate: row.has_certificate,
    status: row.status,
    featured: row.featured,
    seo: row.seo || {},
    relatedCourses: row.related_courses || [],
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function courseToRow(body: any) {
  const row: Record<string, any> = {};
  if (body.title !== undefined) row.title = body.title;
  if (body.slug !== undefined) row.slug = body.slug;
  if (body.shortSummary !== undefined) row.short_summary = body.shortSummary;
  if (body.fullDescription !== undefined) row.full_description = body.fullDescription;
  if (body.level !== undefined) row.level = body.level;
  if (body.duration !== undefined) row.duration = body.duration;
  if (body.language !== undefined) row.language = body.language;
  if (body.instructor !== undefined) row.instructor = body.instructor;
  if (body.coverImage !== undefined) row.cover_image = body.coverImage;
  if (body.coverImagePublicId !== undefined) row.cover_image_public_id = body.coverImagePublicId;
  if (body.fee !== undefined) row.fee = body.fee;
  if (body.isFree !== undefined) row.is_free = body.isFree;
  if (body.modules !== undefined) row.modules = body.modules;
  if (body.learningOutcomes !== undefined) row.learning_outcomes = body.learningOutcomes;
  if (body.prerequisites !== undefined) row.prerequisites = body.prerequisites;
  if (body.hasCertificate !== undefined) row.has_certificate = body.hasCertificate;
  if (body.status !== undefined) row.status = body.status;
  if (body.featured !== undefined) row.featured = body.featured;
  if (body.seo !== undefined) row.seo = body.seo;
  if (body.relatedCourses !== undefined) row.related_courses = body.relatedCourses;
  row.updated_at = new Date().toISOString();
  return row;
}

export function mapStudent(row: any, enrollments: any[] = []) {
  if (!row) return null;
  return {
    _id: row.id,
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    createdAt: row.created_at,
    enrollments: enrollments.map(mapEnrollment),
  };
}

export function mapEnrollment(row: any) {
  return {
    course: row.course ? mapCourse(row.course) : row.course_id,
    enrolledAt: row.enrolled_at,
    amountPaid: row.amount_paid,
    paymentStatus: row.payment_status,
    paymentId: row.payment_id,
    progress: {
      completedModules: row.completed_modules || [],
      lastAccessedAt: row.last_accessed_at,
    },
  };
}
