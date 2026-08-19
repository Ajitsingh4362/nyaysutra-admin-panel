import { connectDB } from '@/lib/mongodb';
import TeamMember from '@/lib/models/TeamMember';
import TeamClient, { TeamMember as TeamMemberType } from './TeamClient';

export const revalidate = 0;

async function getPublishedTeam(): Promise<TeamMemberType[]> {
  try {
    await connectDB();
    const members = await TeamMember.find({ status: 'published' }).sort({ order: 1, createdAt: -1 }).lean();
    return members.map((m: any) => ({
      _id: String(m._id),
      name: m.name,
      designation: m.designation || 'Advocate',
      specialization: m.specialization || '',
      bio: m.bio || '',
      qualification: m.qualification || '',
      experience: m.experience || '',
      photo: m.photo || '',
      email: m.email || '',
      phone: m.phone || '',
      linkedin: m.linkedin || '',
      barCouncilId: m.barCouncilId || '',
      featured: !!m.featured,
    }));
  } catch {
    return [];
  }
}

export default async function TeamPage() {
  const members = await getPublishedTeam();
  return <TeamClient members={members} />;
}
