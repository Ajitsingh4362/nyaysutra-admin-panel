'use client';
import { useState, useEffect } from 'react';
import {
  TrendingUp, Users, Eye, MousePointer, Globe, Smartphone,
  Monitor, Clock, ArrowUp, ArrowDown, ExternalLink, RefreshCw,
  BarChart2, Activity, Zap, Search
} from 'lucide-react';

// ── Page popularity data (static — updated from Vercel Dashboard)
const topPages = [
  { path: '/', label: 'Home', views: '—' },
  { path: '/practice-areas', label: 'Practice Areas', views: '—' },
  { path: '/contact', label: 'Contact', views: '—' },
  { path: '/blog', label: 'Blog', views: '—' },
  { path: '/about', label: 'About', views: '—' },
  { path: '/courts', label: 'Courts', views: '—' },
  { path: '/students', label: 'Students', views: '—' },
  { path: '/gallery', label: 'Gallery', views: '—' },
];

const practiceAreaPages = [
  { path: '/practice-areas/supreme-court', label: 'Supreme Court', views: '—' },
  { path: '/practice-areas/criminal-law', label: 'Criminal Law', views: '—' },
  { path: '/practice-areas/civil-law', label: 'Civil Law', views: '—' },
  { path: '/practice-areas/family-matrimonial', label: 'Family & Matrimonial', views: '—' },
  { path: '/practice-areas/constitutional-law', label: 'Constitutional Law', views: '—' },
  { path: '/practice-areas/high-court', label: 'High Courts', views: '—' },
  { path: '/practice-areas/corporate-commercial', label: 'Corporate Law', views: '—' },
  { path: '/practice-areas/rti-human-rights', label: 'RTI & Human Rights', views: '—' },
];

function StatCard({
  icon: Icon, label, value, sub, color = 'text-[var(--gold)]', trend
}: {
  icon: any; label: string; value: string; sub?: string;
  color?: string; trend?: 'up' | 'down' | null;
}) {
  return (
    <div className="stat-card">
      <div className="flex items-start justify-between">
        <Icon size={18} className={color} />
        {trend && (
          <span className={`text-[10px] font-bold flex items-center gap-0.5 ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
            {trend === 'up' ? <ArrowUp size={10} /> : <ArrowDown size={10} />}
            Live
          </span>
        )}
      </div>
      <p className="font-display text-2xl font-bold mt-3">{value}</p>
      <p className="text-xs text-[var(--muted2)] mt-0.5">{label}</p>
      {sub && <p className="text-[10px] text-[var(--muted2)] mt-1 opacity-70">{sub}</p>}
    </div>
  );
}

export default function AnalyticsDashboard() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'pages' | 'inquiries' | 'seo'>('overview');

  useEffect(() => {
    Promise.all([
      fetch('/api/inquiries').then(r => r.ok ? r.json() : []).catch(() => []),
      fetch('/api/blogs?admin=1').then(r => r.ok ? r.json() : []).catch(() => []),
    ]).then(([inq, bl]) => {
      setInquiries(Array.isArray(inq) ? inq : []);
      setBlogs(Array.isArray(bl) ? bl : []);
      setLoading(false);
    });
  }, []);

  // Derived stats from MongoDB
  const totalInq = inquiries.length;
  const newInq = inquiries.filter(i => i.status === 'new').length;
  const repliedInq = inquiries.filter(i => i.status === 'replied').length;
  const thisWeekInq = inquiries.filter(i => {
    const d = new Date(i.createdAt);
    const now = new Date();
    return (now.getTime() - d.getTime()) < 7 * 24 * 60 * 60 * 1000;
  }).length;

  const publishedBlogs = blogs.filter(b => b.status === 'published').length;
  const draftBlogs = blogs.filter(b => b.status === 'draft').length;
  const featuredBlogs = blogs.filter(b => b.featured).length;

  // Service breakdown from inquiries
  const serviceMap: Record<string, number> = {};
  inquiries.forEach(i => {
    const s = i.service || 'General';
    serviceMap[s] = (serviceMap[s] || 0) + 1;
  });
  const topServices = Object.entries(serviceMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  // Contact method breakdown
  const contactMap: Record<string, number> = {};
  inquiries.forEach(i => {
    const c = i.contactMethod || 'WhatsApp';
    contactMap[c] = (contactMap[c] || 0) + 1;
  });

  // Monthly inquiry trend (last 6 months)
  const months: Record<string, number> = {};
  inquiries.forEach(i => {
    const d = new Date(i.createdAt);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    months[key] = (months[key] || 0) + 1;
  });
  const monthlyData = Object.entries(months).sort().slice(-6);
  const maxMonthly = Math.max(...monthlyData.map(m => m[1]), 1);

  const tabs = [
    { id: 'overview', label: '📊 Overview' },
    { id: 'pages', label: '📄 Pages' },
    { id: 'inquiries', label: '📥 Inquiries' },
    { id: 'seo', label: '🔍 SEO' },
  ];

  return (
    <div className="space-y-5">
      {/* Vercel Analytics Link */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="font-semibold text-sm text-[var(--ivory)]">Analytics Dashboard</h2>
          <p className="text-[10px] text-[var(--muted2)] mt-0.5">
            Real-time traffic data available on Vercel Dashboard · Inquiry/content data from MongoDB
          </p>
        </div>
        <div className="flex gap-2">
          <a
            href="https://vercel.com/dashboard"
            target="_blank"
            className="btn-outline text-xs py-2 px-3 flex items-center gap-1.5"
          >
            <ExternalLink size={11} /> Vercel Dashboard
          </a>
          <button
            onClick={() => window.location.reload()}
            className="btn-outline text-xs py-2 px-3"
          >
            <RefreshCw size={11} />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-0 border-b border-[rgba(201,168,76,0.1)] overflow-x-auto">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`px-4 py-2.5 text-xs font-semibold whitespace-nowrap transition-all border-b-2 -mb-px
              ${activeTab === t.id
                ? 'border-[var(--gold)] text-[var(--gold)]'
                : 'border-transparent text-[var(--muted2)] hover:text-[var(--ivory)]'}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── OVERVIEW TAB ── */}
      {activeTab === 'overview' && (
        <div className="space-y-5">
          {/* Vercel Traffic Notice */}
          <div className="p-4 rounded-xl border border-[rgba(201,168,76,0.2)] bg-[rgba(201,168,76,0.04)]">
            <div className="flex items-start gap-3">
              <Activity size={16} className="text-[var(--gold)] shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold">Live Traffic Data — Vercel Analytics Active ✓</p>
                <p className="text-xs text-[var(--muted2)] mt-1 leading-relaxed">
                  Vercel Analytics is now tracking page views, unique visitors, top pages, and referrers automatically.
                  View detailed real-time traffic on your{' '}
                  <a href="https://vercel.com/dashboard" target="_blank" className="text-[var(--gold)] hover:underline">
                    Vercel Dashboard → Analytics tab
                  </a>.
                </p>
              </div>
            </div>
          </div>

          {/* Traffic stats — from Vercel (labels with links) */}
          <div>
            <p className="text-[10px] text-[var(--muted2)] uppercase tracking-wider font-bold mb-3">
              Website Traffic — View on Vercel Dashboard
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <a href="https://vercel.com/dashboard" target="_blank" className="stat-card hover:border-[rgba(201,168,76,0.4)] transition-colors cursor-pointer">
                <Eye size={16} className="text-blue-400" />
                <p className="font-display text-2xl font-bold mt-3">—</p>
                <p className="text-xs text-[var(--muted2)] mt-0.5">Page Views</p>
                <p className="text-[10px] text-blue-400 mt-1">View on Vercel →</p>
              </a>
              <a href="https://vercel.com/dashboard" target="_blank" className="stat-card hover:border-[rgba(201,168,76,0.4)] transition-colors cursor-pointer">
                <Users size={16} className="text-green-400" />
                <p className="font-display text-2xl font-bold mt-3">—</p>
                <p className="text-xs text-[var(--muted2)] mt-0.5">Unique Visitors</p>
                <p className="text-[10px] text-green-400 mt-1">View on Vercel →</p>
              </a>
              <a href="https://vercel.com/dashboard" target="_blank" className="stat-card hover:border-[rgba(201,168,76,0.4)] transition-colors cursor-pointer">
                <Clock size={16} className="text-purple-400" />
                <p className="font-display text-2xl font-bold mt-3">—</p>
                <p className="text-xs text-[var(--muted2)] mt-0.5">Avg. Session</p>
                <p className="text-[10px] text-purple-400 mt-1">View on Vercel →</p>
              </a>
              <a href="https://vercel.com/dashboard" target="_blank" className="stat-card hover:border-[rgba(201,168,76,0.4)] transition-colors cursor-pointer">
                <Zap size={16} className="text-yellow-400" />
                <p className="font-display text-2xl font-bold mt-3">—</p>
                <p className="text-xs text-[var(--muted2)] mt-0.5">Performance Score</p>
                <p className="text-[10px] text-yellow-400 mt-1">View on Vercel →</p>
              </a>
            </div>
          </div>

          {/* MongoDB stats — real data */}
          <div>
            <p className="text-[10px] text-[var(--muted2)] uppercase tracking-wider font-bold mb-3">
              Content & Inquiries — Live from Database
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <StatCard icon={BarChart2} label="Total Inquiries" value={loading ? '...' : String(totalInq)} color="text-[var(--gold)]" />
              <StatCard icon={Activity} label="New Inquiries" value={loading ? '...' : String(newInq)} color="text-red-400" trend={newInq > 0 ? 'up' : null} />
              <StatCard icon={TrendingUp} label="This Week" value={loading ? '...' : String(thisWeekInq)} color="text-green-400" />
              <StatCard icon={MousePointer} label="Replied" value={loading ? '...' : String(repliedInq)} color="text-blue-400" />
              <StatCard icon={Eye} label="Published Blogs" value={loading ? '...' : String(publishedBlogs)} color="text-purple-400" />
              <StatCard icon={Globe} label="Draft Blogs" value={loading ? '...' : String(draftBlogs)} color="text-[var(--muted2)]" />
            </div>
          </div>

          {/* Monthly Inquiry Bar Chart */}
          {monthlyData.length > 0 && (
            <div className="card">
              <h3 className="font-semibold text-sm mb-5 flex items-center gap-2">
                <TrendingUp size={14} className="text-[var(--gold)]" /> Monthly Inquiries Trend
              </h3>
              <div className="flex items-end gap-2 h-32">
                {monthlyData.map(([month, count]) => {
                  const pct = (count / maxMonthly) * 100;
                  const [yr, mo] = month.split('-');
                  const label = new Date(parseInt(yr), parseInt(mo) - 1).toLocaleString('en-IN', { month: 'short' });
                  return (
                    <div key={month} className="flex-1 flex flex-col items-center gap-1">
                      <span className="text-[10px] text-[var(--gold)] font-bold">{count}</span>
                      <div className="w-full rounded-t-md bg-[rgba(201,168,76,0.15)] relative overflow-hidden" style={{ height: '80px' }}>
                        <div
                          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[var(--gold)] to-[rgba(201,168,76,0.5)] rounded-t-md transition-all duration-700"
                          style={{ height: `${pct}%` }}
                        />
                      </div>
                      <span className="text-[9px] text-[var(--muted2)]">{label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Top Services */}
          {topServices.length > 0 && (
            <div className="card">
              <h3 className="font-semibold text-sm mb-4 flex items-center gap-2">
                <BarChart2 size={14} className="text-[var(--gold)]" /> Most Requested Services
              </h3>
              <div className="space-y-3">
                {topServices.map(([service, count]) => {
                  const pct = Math.round((count / totalInq) * 100);
                  return (
                    <div key={service}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium truncate flex-1 mr-2">{service}</span>
                        <span className="text-xs text-[var(--gold)] font-bold shrink-0">{count} ({pct}%)</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-[rgba(201,168,76,0.1)] overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[var(--gold)] to-[rgba(201,168,76,0.5)] transition-all duration-700"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Contact Method Pie */}
          {Object.keys(contactMap).length > 0 && (
            <div className="card">
              <h3 className="font-semibold text-sm mb-4 flex items-center gap-2">
                <Smartphone size={14} className="text-[var(--gold)]" /> Preferred Contact Method
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {Object.entries(contactMap).map(([method, count]) => {
                  const pct = Math.round((count / totalInq) * 100);
                  return (
                    <div key={method} className="text-center p-3 rounded-xl bg-[rgba(201,168,76,0.04)] border border-[rgba(201,168,76,0.1)]">
                      <p className="font-display text-xl font-bold text-[var(--gold)]">{pct}%</p>
                      <p className="text-xs text-[var(--muted2)] mt-1">{method}</p>
                      <p className="text-[10px] text-[var(--muted2)]">{count} requests</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {loading && (
            <div className="text-center py-8">
              <RefreshCw size={20} className="animate-spin inline text-[var(--muted2)]" />
              <p className="text-xs text-[var(--muted2)] mt-2">Loading analytics data...</p>
            </div>
          )}

          {!loading && totalInq === 0 && publishedBlogs === 0 && (
            <div className="card text-center py-10">
              <BarChart2 size={36} className="text-[var(--muted2)] mx-auto mb-3 opacity-30" />
              <p className="text-sm text-[var(--muted2)]">Analytics will populate once visitors start submitting inquiries and content is published.</p>
            </div>
          )}
        </div>
      )}

      {/* ── PAGES TAB ── */}
      {activeTab === 'pages' && (
        <div className="space-y-5">
          <div className="p-4 rounded-xl border border-[rgba(59,130,246,0.2)] bg-[rgba(59,130,246,0.04)]">
            <p className="text-sm font-semibold text-blue-400 mb-1">📊 Page-level traffic data</p>
            <p className="text-xs text-[var(--muted2)] leading-relaxed">
              Exact page views are available on your{' '}
              <a href="https://vercel.com/dashboard" target="_blank" className="text-blue-400 hover:underline">
                Vercel Dashboard → Analytics → Pages
              </a>.
              Below is the site structure for reference — focus your content on pages getting most traffic.
            </p>
          </div>

          <div className="card">
            <h3 className="font-semibold text-sm mb-4">Main Pages</h3>
            <div className="space-y-2">
              {topPages.map(page => (
                <div key={page.path} className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[rgba(201,168,76,0.04)] transition-colors">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <Globe size={12} className="text-[var(--gold)] shrink-0" />
                    <span className="text-sm font-medium truncate">{page.label}</span>
                    <span className="text-[10px] text-[var(--muted2)] font-mono hidden sm:inline">{page.path}</span>
                  </div>
                  <a href={page.path} target="_blank" className="text-[var(--muted2)] hover:text-[var(--gold)] transition-colors ml-2">
                    <ExternalLink size={12} />
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 className="font-semibold text-sm mb-4">Practice Area Pages</h3>
            <div className="space-y-2">
              {practiceAreaPages.map(page => (
                <div key={page.path} className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[rgba(201,168,76,0.04)] transition-colors">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <Globe size={12} className="text-[var(--gold)] shrink-0" />
                    <span className="text-sm font-medium truncate">{page.label}</span>
                  </div>
                  <a href={page.path} target="_blank" className="text-[var(--muted2)] hover:text-[var(--gold)] transition-colors">
                    <ExternalLink size={12} />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Blog pages */}
          {blogs.length > 0 && (
            <div className="card">
              <h3 className="font-semibold text-sm mb-4">Blog Posts ({publishedBlogs} published)</h3>
              <div className="space-y-2">
                {blogs.filter(b => b.status === 'published').map((blog: any) => (
                  <div key={blog._id} className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[rgba(201,168,76,0.04)] transition-colors">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{blog.title}</p>
                      <p className="text-[10px] text-[var(--muted2)]">{blog.category} · {blog.readTime}</p>
                    </div>
                    <a href={`/blog/${blog.slug}`} target="_blank" className="text-[var(--muted2)] hover:text-[var(--gold)] transition-colors ml-2">
                      <ExternalLink size={12} />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── INQUIRIES TAB ── */}
      {activeTab === 'inquiries' && (
        <div className="space-y-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatCard icon={Activity} label="Total" value={loading ? '...' : String(totalInq)} />
            <StatCard icon={TrendingUp} label="New" value={loading ? '...' : String(newInq)} color="text-red-400" />
            <StatCard icon={MousePointer} label="This Week" value={loading ? '...' : String(thisWeekInq)} color="text-green-400" />
            <StatCard icon={Eye} label="Replied" value={loading ? '...' : String(repliedInq)} color="text-blue-400" />
          </div>

          {/* Full inquiry list */}
          <div className="card p-0 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="admin-table" style={{ minWidth: 520 }}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Service</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan={5} className="text-center py-8"><RefreshCw size={16} className="animate-spin inline text-[var(--muted2)]" /></td></tr>
                  ) : inquiries.length === 0 ? (
                    <tr><td colSpan={5} className="text-center py-8 text-[var(--muted2)] text-sm">No inquiries yet</td></tr>
                  ) : inquiries.slice(0, 20).map((inq: any) => (
                    <tr key={inq._id}>
                      <td className="font-medium text-sm">{inq.name}</td>
                      <td>
                        <a href={`tel:${inq.phone}`} className="text-[var(--gold)] text-xs hover:underline">{inq.phone}</a>
                      </td>
                      <td><span className="text-xs text-[var(--muted2)]">{inq.service}</span></td>
                      <td><span className={`badge badge-${inq.status}`}>{inq.status}</span></td>
                      <td>
                        <span className="text-xs text-[var(--muted2)]">
                          {new Date(inq.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ── SEO TAB ── */}
      {activeTab === 'seo' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-[rgba(34,197,94,0.2)] bg-[rgba(34,197,94,0.04)]">
            <p className="text-sm font-semibold text-green-400 mb-1">✓ Vercel Speed Insights Active</p>
            <p className="text-xs text-[var(--muted2)] leading-relaxed">
              Core Web Vitals (LCP, FID, CLS, FCP, TTFB) are being tracked automatically.
              View scores on{' '}
              <a href="https://vercel.com/dashboard" target="_blank" className="text-green-400 hover:underline">
                Vercel Dashboard → Speed Insights
              </a>.
            </p>
          </div>

          <div className="card">
            <h3 className="font-semibold text-sm flex items-center gap-2 mb-4">
              <Search size={14} className="text-[var(--gold)]" /> SEO Checklist
            </h3>
            <div className="space-y-2">
              {[
                ['Sitemap.xml generated', true, '/sitemap.xml'],
                ['Robots.txt configured', true, '/robots.txt'],
                ['Meta title & description', true, null],
                ['Open Graph tags', true, null],
                ['Canonical URLs', true, null],
                ['Mobile responsive', true, null],
                ['Vercel Speed Insights', true, null],
                ['Vercel Analytics tracking', true, null],
                ['Google Search Console', false, 'https://search.google.com/search-console'],
                ['Schema markup (LocalBusiness)', false, null],
              ].map(([item, done, link]) => (
                <div key={item as string} className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[rgba(201,168,76,0.03)]">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${done ? 'bg-green-500/20' : 'bg-[rgba(255,255,255,0.05)]'}`}>
                      {done
                        ? <span className="text-green-400 text-[10px]">✓</span>
                        : <span className="w-1.5 h-1.5 rounded-full bg-[rgba(255,255,255,0.2)] block" />}
                    </div>
                    <span className={`text-xs ${done ? 'text-[var(--ivory)]' : 'text-[var(--muted2)]'}`}>{item as string}</span>
                  </div>
                  {link && (
                    <a href={link as string} target="_blank" className="text-[var(--gold)] text-[10px] hover:underline flex items-center gap-0.5">
                      View <ExternalLink size={9} />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 className="font-semibold text-sm mb-3">Blog SEO Status</h3>
            <div className="space-y-2">
              {loading ? (
                <p className="text-xs text-[var(--muted2)]">Loading...</p>
              ) : blogs.length === 0 ? (
                <p className="text-xs text-[var(--muted2)]">No blogs yet — create your first blog post to see SEO status.</p>
              ) : blogs.slice(0, 8).map((blog: any) => {
                const hasSeoTitle = !!blog.seo?.metaTitle;
                const hasSeoDesc = !!blog.seo?.metaDescription;
                const score = [hasSeoTitle, hasSeoDesc, !!blog.coverImage, blog.tags?.length > 0].filter(Boolean).length;
                return (
                  <div key={blog._id} className="flex items-center justify-between p-2.5 rounded-xl bg-[rgba(255,255,255,0.02)]">
                    <span className="text-xs font-medium truncate flex-1 mr-3">{blog.title}</span>
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="flex gap-1">
                        {[hasSeoTitle, hasSeoDesc, !!blog.coverImage, blog.tags?.length > 0].map((ok, i) => (
                          <div key={i} className={`w-2 h-2 rounded-full ${ok ? 'bg-green-400' : 'bg-red-400/50'}`} title={['SEO Title', 'SEO Desc', 'Cover Image', 'Tags'][i]} />
                        ))}
                      </div>
                      <span className={`text-[10px] font-bold ${score === 4 ? 'text-green-400' : score >= 2 ? 'text-yellow-400' : 'text-red-400'}`}>
                        {score}/4
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            {blogs.length > 0 && (
              <p className="text-[10px] text-[var(--muted2)] mt-3">
                ● = SEO Title &nbsp; ● = SEO Description &nbsp; ● = Cover Image &nbsp; ● = Tags
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
