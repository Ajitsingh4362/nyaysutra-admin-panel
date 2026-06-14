import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Panel | NyayaSutra',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // Completely isolated — no Navbar, no Footer, no WhatsApp float
  return <>{children}</>;
}
