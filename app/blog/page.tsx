'use client';
import Link from 'next/link';
import { ChevronRight, Search } from 'lucide-react';
import { useState } from 'react';

const cats = ['All','Constitutional Law','Daily Legal Intelligence','Criminal Law','Civil Law','Family & Matrimonial','Supreme Court Updates','Student Corner','RTI & Human Rights','Consumer Protection','Corporate Law','International Law'];

const posts = [
  { id:'1', slug:'fundamental-rights-india',     title:'Understanding Your Fundamental Rights Under the Indian Constitution',    category:'Constitutional Law',      excerpt:'A comprehensive guide for citizens to understand their rights under Articles 12–35 of the Constitution of India before taking any legal action.', readTime:'5 min read', publishedAt:'2026-05-20', tags:['fundamental rights','article 21','constitution'], featured:true },
  { id:'2', slug:'sc-weekly-digest',             title:'Supreme Court Weekly Digest — Landmark Judgments Explained',             category:'Supreme Court Updates',   excerpt:'Key Supreme Court judgments of the week explained in simple language for citizens, students and legal professionals.',                             readTime:'7 min read', publishedAt:'2026-06-01', tags:['supreme court','judgment','weekly'], featured:true },
  { id:'3', slug:'bail-fir-criminal',            title:'Bail Rights, FIR Procedure and Criminal Law: What Every Citizen Must Know',category:'Criminal Law',           excerpt:'Essential knowledge about FIR filing, bail procedures, rights of the accused under BNSS 2023.',                                                    readTime:'6 min read', publishedAt:'2026-05-28', tags:['bail','FIR','BNSS 2023'], featured:false },
  { id:'4', slug:'property-disputes-guide',      title:'Property Disputes in India: A Complete Step-by-Step Legal Guide',        category:'Civil Law',               excerpt:'Everything you need to know about property disputes, title suits, possession cases and how to protect your property rights legally.',              readTime:'8 min read', publishedAt:'2026-05-15', tags:['property','civil','title suit'], featured:false },
  { id:'5', slug:'rti-act-guide',                title:'RTI Act — Your Right to Information Explained Simply',                   category:'RTI & Human Rights',      excerpt:'How to file an RTI application, what information you can seek, and how to appeal if rejected.',                                                       readTime:'5 min read', publishedAt:'2026-05-10', tags:['RTI','right to information','government'], featured:false },
  { id:'6', slug:'consumer-rights-complaint',    title:'Consumer Rights in India: How to File a Complaint',                     category:'Consumer Protection',     excerpt:'Complete guide to filing consumer complaints before District, State and National Consumer Commissions.',                                              readTime:'6 min read', publishedAt:'2026-05-05', tags:['consumer','NCDRC','complaint'], featured:false },
  { id:'7', slug:'upsc-law-optional',            title:'UPSC Law Optional — Strategy from a Mains Qualified Candidate',         category:'Student Corner',          excerpt:'Strategy, books, and approach for Law Optional in UPSC Civil Services from Adv. A.K. Tripathi — UPSC Mains qualified.',                            readTime:'9 min read', publishedAt:'2026-04-20', tags:['UPSC','law optional','strategy'], featured:false },
  { id:'8', slug:'bnss-2023-changes',            title:'BNSS 2023 vs CrPC — Key Changes Every Lawyer Must Know',                category:'Criminal Law',            excerpt:'A detailed comparison of BNSS 2023 and CrPC — key procedural changes, new sections, and what they mean for practitioners.',                        readTime:'7 min read', publishedAt:'2026-04-10', tags:['BNSS 2023','CrPC','criminal law'], featured:false },
  { id:'9', slug:'article-21-right-to-life',    title:'Article 21 — The Most Powerful Fundamental Right in India',              category:'Constitutional Law',      excerpt:'How courts have expanded Article 21 to include right to health, privacy, livelihood, education, and dignity.',                                      readTime:'6 min read', publishedAt:'2026-03-25', tags:['article 21','fundamental rights','privacy'], featured:false },
];

export default function Blog() {
  const [activeCat, setActiveCat] = useState('All');
  const [searchQ, setSearchQ] = useState('');

  const filtered = posts.filter(p => {
    const matchCat = activeCat === 'All' || p.category === activeCat;
    const matchSearch = !searchQ || p.title.toLowerCase().includes(searchQ.toLowerCase()) || p.excerpt.toLowerCase().includes(searchQ.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = filtered.filter(p => p.featured);
  const regular = filtered.filter(p => !p.featured);

  return (
    <main className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative py-20 px-4 overflow-hidden bg-[#0C1018]">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(201,168,76,0.07),transparent_60%)] pointer-events-none"/>
        <div className="container mx-auto relative z-10">
          <p className="tag">Legal Intelligence & Articles</p>
          <h1 className="section-title mt-3">Blog & Legal<br/>Intelligence</h1>
          <p className="muted text-lg mt-5 max-w-3xl">Legal awareness articles, Supreme Court updates, judgment analysis, constitutional law, RTI guidance, and practical legal guides — written by Adv. A.K. Tripathi.</p>
        </div>
      </section>

      {/* Filter + Search */}
      <div className="border-b border-[rgba(201,168,76,0.1)] bg-[#07090F] sticky top-16 z-30">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="relative flex-1 max-w-xs">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted2)]"/>
              <input value={searchQ} onChange={e => setSearchQ(e.target.value)} className="input py-2 pl-8 text-xs" placeholder="Search articles..."/>
            </div>
            <div className="flex gap-1 overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto">
              {cats.map(c => (
                <button key={c} onClick={() => setActiveCat(c)}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold whitespace-nowrap transition-all ${activeCat===c ? 'bg-[rgba(201,168,76,0.15)] text-[var(--gold)]' : 'text-[var(--muted2)] hover:text-[var(--ivory)]'}`}>{c}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Featured */}
      {featured.length > 0 && (
        <section className="section">
          <div className="container px-4 mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <p className="tag">Featured</p>
              <div className="flex-1 h-px bg-[rgba(201,168,76,0.15)]"/>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {featured.map(post => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="card-link group">
                  <div className="aspect-[16/7] rounded-xl bg-gradient-to-br from-[rgba(201,168,76,0.08)] to-[#101520] mb-4 flex items-center justify-center">
                    <span className="text-4xl opacity-20">⚖️</span>
                  </div>
                  <span className="text-[10px] font-bold text-[var(--gold)] uppercase tracking-widest bg-[rgba(201,168,76,0.1)] px-3 py-1 rounded-full">{post.category}</span>
                  <h2 className="font-display text-xl font-semibold leading-snug mt-3 group-hover:text-[var(--gold)] transition-colors">{post.title}</h2>
                  <p className="text-[var(--muted2)] text-sm mt-2 leading-relaxed line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-[rgba(201,168,76,0.1)]">
                    <span className="text-xs text-[var(--muted2)]">{post.readTime} · {new Date(post.publishedAt).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})}</span>
                    <span className="text-[var(--gold)] text-xs font-semibold inline-flex items-center gap-1">Read <ChevronRight size={11}/></span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All posts */}
      <section className={featured.length > 0 ? "section bg-[#0C1018]" : "section"}>
        <div className="container px-4 mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-16"><p className="muted">No articles found.</p></div>
          ) : (
            <>
              <div className="flex items-center gap-3 mb-6">
                <p className="tag">All Articles ({filtered.length})</p>
                <div className="flex-1 h-px bg-[rgba(201,168,76,0.15)]"/>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {(regular.length > 0 ? regular : filtered).map(post => (
                  <Link key={post.id} href={`/blog/${post.slug}`} className="card-link group">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-bold text-[var(--gold)] uppercase tracking-widest bg-[rgba(201,168,76,0.1)] px-2 py-0.5 rounded-full">{post.category}</span>
                      <span className="text-[10px] text-[var(--muted2)]">{post.readTime}</span>
                    </div>
                    <h3 className="font-display text-lg font-semibold leading-snug group-hover:text-[var(--gold)] transition-colors line-clamp-2">{post.title}</h3>
                    <p className="text-[var(--muted2)] text-xs mt-2 leading-relaxed line-clamp-3">{post.excerpt}</p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {post.tags.slice(0,3).map(t => (
                        <span key={t} className="text-[10px] px-2 py-0.5 rounded-full border border-[rgba(201,168,76,0.15)] text-[var(--muted2)]">#{t}</span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-[rgba(201,168,76,0.1)]">
                      <span className="text-[10px] text-[var(--muted2)]">{new Date(post.publishedAt).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})}</span>
                      <span className="text-[var(--gold)] text-xs font-semibold inline-flex items-center gap-1">Read <ChevronRight size={11}/></span>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Topics */}
      <section className="section-sm px-4">
        <div className="container mx-auto">
          <div className="card">
            <h2 className="font-display text-2xl font-semibold text-[var(--gold)] mb-4">Topics We Cover</h2>
            <div className="flex flex-wrap gap-2">
              {['Constitutional Law','International Relations','Arbitration','Criminal Law Analysis','Supreme Court Judgments','Legal Current Affairs','Consumer Rights','Property Law','Family Law','Cyber Law','Labour Law','RTI','Student Guidance','BNSS 2023','BNS','BSA','UPSC Law','Corporate Law','Human Rights','PIL'].map(c => (
                <button key={c} onClick={() => { setActiveCat(cats.includes(c) ? c : 'All'); window.scrollTo({ top: 0, behavior:'smooth' }); }}
                  className="px-3 py-1.5 rounded-full border border-[rgba(201,168,76,0.2)] text-xs text-[var(--muted2)] hover:border-[rgba(201,168,76,0.5)] hover:text-[var(--gold)] transition-all">{c}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
