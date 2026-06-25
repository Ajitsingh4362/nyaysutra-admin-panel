'use client';
import { useState, useEffect } from 'react';
import { RefreshCw, TrendingUp, BarChart2, PieChart, Users, FileText, Inbox } from 'lucide-react';

interface Inquiry {
  _id: string; name: string; service: string; status: string;
  contactMethod: string; createdAt: string;
}
interface Blog {
  _id: string; title: string; category: string; status: string;
  publishedAt: string; views?: number;
}

// ── SVG Bar Chart ────────────────────────────────────────────────
function BarChart({ data, color = '#C9A84C', label = '' }: {
  data: { label: string; value: number }[];
  color?: string;
  label?: string;
}) {
  const max = Math.max(...data.map(d => d.value), 1);
  const W = 480; const H = 160; const BAR_W = Math.floor((W - 40) / data.length) - 6;

  return (
    <div style={{ width: '100%', overflowX: 'auto' }}>
      <svg viewBox={`0 0 ${W} ${H + 40}`} style={{ width: '100%', minWidth: 260 }}>
        {/* Y grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((p, i) => (
          <g key={i}>
            <line
              x1={30} y1={H - H * p} x2={W - 10} y2={H - H * p}
              stroke="rgba(201,168,76,0.1)" strokeWidth={1}
            />
            <text x={24} y={H - H * p + 4} textAnchor="end" fontSize={9} fill="rgba(197,187,171,0.5)">
              {Math.round(max * p)}
            </text>
          </g>
        ))}

        {/* Bars */}
        {data.map((d, i) => {
          const barH = max > 0 ? (d.value / max) * H : 0;
          const x = 35 + i * (BAR_W + 6);
          const y = H - barH;
          return (
            <g key={i}>
              <rect
                x={x} y={y} width={BAR_W} height={barH}
                rx={3}
                fill={`url(#barGrad${i})`}
                style={{ transition: 'height 0.5s ease' }}
              />
              <defs>
                <linearGradient id={`barGrad${i}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity="0.9"/>
                  <stop offset="100%" stopColor={color} stopOpacity="0.3"/>
                </linearGradient>
              </defs>
              {/* Value label on top */}
              {d.value > 0 && (
                <text x={x + BAR_W / 2} y={y - 4} textAnchor="middle" fontSize={10} fill={color} fontWeight="bold">
                  {d.value}
                </text>
              )}
              {/* X label */}
              <text x={x + BAR_W / 2} y={H + 15} textAnchor="middle" fontSize={9} fill="rgba(197,187,171,0.6)">
                {d.label}
              </text>
            </g>
          );
        })}

        {/* Axis line */}
        <line x1={30} y1={0} x2={30} y2={H} stroke="rgba(201,168,76,0.2)" strokeWidth={1}/>
        <line x1={30} y1={H} x2={W - 10} y2={H} stroke="rgba(201,168,76,0.2)" strokeWidth={1}/>
      </svg>
      {label && <p style={{ textAlign: 'center', fontSize: 10, color: 'rgba(197,187,171,0.5)', marginTop: 2 }}>{label}</p>}
    </div>
  );
}

// ── SVG Donut Chart ──────────────────────────────────────────────
function DonutChart({ data }: { data: { label: string; value: number; color: string }[] }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  if (total === 0) return <p style={{ textAlign: 'center', fontSize: 12, color: 'rgba(197,187,171,0.5)', padding: '20px 0' }}>No data yet</p>;

  const R = 60; const CX = 80; const CY = 75;
  let startAngle = -90;
  const slices = data.map(d => {
    const angle = (d.value / total) * 360;
    const start = startAngle;
    startAngle += angle;
    return { ...d, startAngle: start, angle };
  });

  const polarToCartesian = (cx: number, cy: number, r: number, deg: number) => {
    const rad = (deg * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  };

  const describeArc = (cx: number, cy: number, r: number, start: number, end: number) => {
    const s = polarToCartesian(cx, cy, r, start);
    const e = polarToCartesian(cx, cy, r, end);
    const largeArc = end - start > 180 ? 1 : 0;
    return `M ${cx} ${cy} L ${s.x} ${s.y} A ${r} ${r} 0 ${largeArc} 1 ${e.x} ${e.y} Z`;
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
      <svg viewBox="0 0 160 150" style={{ width: 160, minWidth: 160 }}>
        {slices.map((s, i) => (
          <path key={i} d={describeArc(CX, CY, R, s.startAngle, s.startAngle + s.angle - 0.5)} fill={s.color} opacity={0.85}/>
        ))}
        {/* Center hole */}
        <circle cx={CX} cy={CY} r={R * 0.55} fill="#0C1018"/>
        <text x={CX} y={CY - 6} textAnchor="middle" fontSize={18} fill="#C9A84C" fontWeight="bold">{total}</text>
        <text x={CX} y={CY + 10} textAnchor="middle" fontSize={8} fill="rgba(197,187,171,0.6)">TOTAL</text>
      </svg>
      <div style={{ flex: 1, minWidth: 0 }}>
        {slices.map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <div style={{ width: 10, height: 10, borderRadius: 2, backgroundColor: s.color, flexShrink: 0 }}/>
            <span style={{ fontSize: 11, color: 'rgba(245,240,232,0.75)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.label}</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#C9A84C', flexShrink: 0 }}>{s.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Mini Sparkline ───────────────────────────────────────────────
function Sparkline({ data, color = '#C9A84C' }: { data: number[]; color?: string }) {
  if (data.length < 2) return null;
  const max = Math.max(...data, 1);
  const W = 120; const H = 36;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * W;
    const y = H - (v / max) * H;
    return `${x},${y}`;
  }).join(' ');
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: 80, height: 24 }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx={(data.length - 1) / (data.length - 1) * W} cy={H - (data[data.length-1] / max) * H} r={3} fill={color}/>
    </svg>
  );
}

// ── Main Dashboard Charts ────────────────────────────────────────
export default function DashboardCharts() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-10">
        <RefreshCw size={20} className="animate-spin text-[var(--muted2)]"/>
        <span className="text-xs text-[var(--muted2)] ml-2">Loading charts...</span>
      </div>
    );
  }

  // ── Derived data ─────────────────────────────────────────────
  const now = new Date();

  // Monthly inquiry trend — last 6 months
  const monthlyInq: { label: string; value: number }[] = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const label = d.toLocaleString('en-IN', { month: 'short' });
    const value = inquiries.filter(inq => {
      const c = new Date(inq.createdAt);
      return c.getFullYear() === d.getFullYear() && c.getMonth() === d.getMonth();
    }).length;
    monthlyInq.push({ label, value });
  }
  const sparkData = monthlyInq.map(m => m.value);
  const thisMonth = monthlyInq[5].value;
  const lastMonth = monthlyInq[4].value;
  const trend = lastMonth > 0 ? Math.round(((thisMonth - lastMonth) / lastMonth) * 100) : 0;

  // Weekly inquiry trend — last 7 days
  const weeklyInq = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(now);
    d.setDate(now.getDate() - (6 - i));
    const label = d.toLocaleString('en-IN', { weekday: 'short' });
    const value = inquiries.filter(inq => {
      const c = new Date(inq.createdAt);
      return c.toDateString() === d.toDateString();
    }).length;
    return { label, value };
  });

  // Service breakdown for donut
  const DONUT_COLORS = ['#C9A84C','#9C7A2E','#E8C96A','#7A5E20','#F5E6B8','#5A4E3C'];
  const serviceMap: Record<string, number> = {};
  inquiries.forEach(i => { const s = i.service || 'General'; serviceMap[s] = (serviceMap[s] || 0) + 1; });
  const serviceData = Object.entries(serviceMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([label, value], i) => ({ label, value, color: DONUT_COLORS[i] }));

  // Status breakdown
  const statusMap: Record<string, number> = {};
  inquiries.forEach(i => { statusMap[i.status] = (statusMap[i.status] || 0) + 1; });
  const STATUS_COLORS: Record<string, string> = { new: '#ef4444', read: '#3b82f6', replied: '#10b981', closed: '#6b7280' };
  const statusData = ['new','read','replied','closed']
    .map(s => ({ label: s.charAt(0).toUpperCase() + s.slice(1), value: statusMap[s] || 0, color: STATUS_COLORS[s] }))
    .filter(s => s.value > 0);

  // Contact method breakdown
  const methodMap: Record<string, number> = {};
  inquiries.forEach(i => { const m = i.contactMethod || 'WhatsApp'; methodMap[m] = (methodMap[m] || 0) + 1; });
  const methodData = Object.entries(methodMap).sort((a,b) => b[1]-a[1]).map(([label, value], i) => ({ label, value, color: DONUT_COLORS[i] }));

  // Blog category breakdown
  const catMap: Record<string, number> = {};
  blogs.filter(b => b.status === 'published').forEach(b => { const c = b.category || 'General'; catMap[c] = (catMap[c] || 0) + 1; });
  const blogCatData = Object.entries(catMap)
    .sort((a,b) => b[1]-a[1])
    .slice(0, 7)
    .map(([label, value]) => ({ label: label.length > 14 ? label.slice(0, 12) + '…' : label, value }));

  const totalInq = inquiries.length;
  const newInq = inquiries.filter(i => i.status === 'new').length;
  const publishedBlogs = blogs.filter(b => b.status === 'published').length;
  const thisWeekInq = inquiries.filter(i => (now.getTime() - new Date(i.createdAt).getTime()) < 7*24*60*60*1000).length;

  return (
    <div className="space-y-5">
      {/* Summary stat cards with sparklines */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Total Inquiries', value: totalInq, icon: Inbox, color: '#C9A84C', spark: sparkData },
          { label: 'New / Unread', value: newInq, icon: TrendingUp, color: '#ef4444', spark: sparkData.map((v,i) => i===5?newInq:0) },
          { label: 'This Week', value: thisWeekInq, icon: BarChart2, color: '#10b981', spark: weeklyInq.map(w=>w.value) },
          { label: 'Blogs Published', value: publishedBlogs, icon: FileText, color: '#3b82f6', spark: [] },
        ].map(({ label, value, icon: Icon, color, spark }) => (
          <div key={label} className="stat-card">
            <div className="flex items-start justify-between">
              <Icon size={16} style={{ color }}/>
              {spark.length > 1 && <Sparkline data={spark} color={color}/>}
            </div>
            <p className="font-display text-2xl font-bold mt-2" style={{ color }}>{value}</p>
            <p className="text-[10px] text-[var(--muted2)] mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Row 1: Monthly trend + Weekly trend */}
      <div className="grid lg:grid-cols-2 gap-5">
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-sm flex items-center gap-2">
                <TrendingUp size={14} className="text-[var(--gold)]"/> Monthly Inquiries
              </h3>
              {totalInq > 0 && (
                <p className={`text-[10px] mt-0.5 ${trend >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {trend >= 0 ? '▲' : '▼'} {Math.abs(trend)}% vs last month
                </p>
              )}
            </div>
            <span className="text-[10px] text-[var(--muted2)]">Last 6 months</span>
          </div>
          {totalInq === 0 ? (
            <p className="text-center text-xs text-[var(--muted2)] py-8">No inquiries yet — charts will appear automatically as inquiries come in.</p>
          ) : (
            <BarChart data={monthlyInq} color="#C9A84C"/>
          )}
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-sm flex items-center gap-2">
              <BarChart2 size={14} className="text-[var(--gold)]"/> Daily Inquiries
            </h3>
            <span className="text-[10px] text-[var(--muted2)]">Last 7 days</span>
          </div>
          {totalInq === 0 ? (
            <p className="text-center text-xs text-[var(--muted2)] py-8">No inquiries yet.</p>
          ) : (
            <BarChart data={weeklyInq} color="#9C7A2E"/>
          )}
        </div>
      </div>

      {/* Row 2: Service donut + Status donut */}
      <div className="grid lg:grid-cols-2 gap-5">
        <div className="card">
          <h3 className="font-semibold text-sm flex items-center gap-2 mb-4">
            <PieChart size={14} className="text-[var(--gold)]"/> Inquiries by Service
          </h3>
          {serviceData.length === 0 ? (
            <p className="text-center text-xs text-[var(--muted2)] py-8">No data yet.</p>
          ) : (
            <DonutChart data={serviceData}/>
          )}
        </div>

        <div className="card">
          <h3 className="font-semibold text-sm flex items-center gap-2 mb-4">
            <PieChart size={14} className="text-[var(--gold)]"/> Inquiry Status
          </h3>
          {statusData.length === 0 ? (
            <p className="text-center text-xs text-[var(--muted2)] py-8">No data yet.</p>
          ) : (
            <DonutChart data={statusData}/>
          )}
        </div>
      </div>

      {/* Row 3: Contact method + Blog categories */}
      <div className="grid lg:grid-cols-2 gap-5">
        <div className="card">
          <h3 className="font-semibold text-sm flex items-center gap-2 mb-4">
            <Users size={14} className="text-[var(--gold)]"/> Preferred Contact Method
          </h3>
          {methodData.length === 0 ? (
            <p className="text-center text-xs text-[var(--muted2)] py-8">No data yet.</p>
          ) : (
            <DonutChart data={methodData}/>
          )}
        </div>

        <div className="card">
          <h3 className="font-semibold text-sm flex items-center gap-2 mb-4">
            <FileText size={14} className="text-[var(--gold)]"/> Blogs by Category
          </h3>
          {blogCatData.length === 0 ? (
            <p className="text-center text-xs text-[var(--muted2)] py-8">No published blogs yet.</p>
          ) : (
            <BarChart data={blogCatData} color="#3b82f6"/>
          )}
        </div>
      </div>
    </div>
  );
}
