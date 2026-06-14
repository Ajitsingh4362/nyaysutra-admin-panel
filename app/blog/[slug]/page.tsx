import Link from 'next/link';
import { ArrowLeft, Clock, User, ChevronRight, MessageCircle } from 'lucide-react';

const posts: Record<string, any> = {
  'fundamental-rights-india': {
    title: 'Understanding Your Fundamental Rights Under the Indian Constitution',
    category: 'Constitutional Law',
    author: 'Adv. A.K. Tripathi',
    publishedAt: '2026-05-20',
    readTime: '5 min read',
    tags: ['constitutional law','fundamental rights','article 21','legal awareness'],
    content: `
      <h2>Introduction</h2>
      <p>The Constitution of India, in Part III (Articles 12 to 35), guarantees six fundamental rights to every citizen. These rights are justiciable — meaning you can approach the courts if they are violated. Understanding these rights is the first step in protecting yourself legally.</p>

      <h2>The Six Fundamental Rights</h2>

      <h3>1. Right to Equality (Articles 14–18)</h3>
      <p>The State cannot deny any person equality before law. It prohibits discrimination on grounds of religion, race, caste, sex or place of birth. The landmark doctrine of "reasonable classification" allows the State to distinguish between groups only when there is a rational basis.</p>

      <h3>2. Right to Freedom (Articles 19–22)</h3>
      <p>Article 19 guarantees six freedoms: speech and expression, peaceful assembly, association, movement, residence, and profession. Article 21 — the most litigated fundamental right — guarantees the right to life and personal liberty. The Supreme Court has expanded this to include the right to health, education, privacy, livelihood, and dignity.</p>

      <h3>3. Right against Exploitation (Articles 23–24)</h3>
      <p>This right prohibits human trafficking, forced labour (begar), and employment of children in hazardous industries.</p>

      <h3>4. Right to Freedom of Religion (Articles 25–28)</h3>
      <p>Every citizen has the right to freely profess, practice and propagate religion, subject to public order, morality and health.</p>

      <h3>5. Cultural and Educational Rights (Articles 29–30)</h3>
      <p>Minorities have the right to conserve their culture and language, and to establish and administer educational institutions.</p>

      <h3>6. Right to Constitutional Remedies (Article 32)</h3>
      <p>Dr. B.R. Ambedkar called Article 32 the <em>"heart and soul of the Constitution."</em> It gives every citizen the right to directly approach the Supreme Court if their fundamental rights are violated. High Courts can also be approached under Article 226.</p>

      <h2>How to Enforce Your Rights</h2>
      <p>If your fundamental rights are violated, you can:</p>
      <ul>
        <li>File a Writ Petition under Article 32 before the Supreme Court</li>
        <li>File a Writ Petition under Article 226 before the High Court</li>
        <li>Approach the National Human Rights Commission (NHRC)</li>
        <li>File a police complaint for criminal violations</li>
      </ul>

      <h2>Key Supreme Court Landmarks</h2>
      <p>Several landmark Supreme Court judgments have expanded the scope of fundamental rights — Maneka Gandhi v. Union of India expanded Article 21, Kesavananda Bharati established the Basic Structure doctrine, and Justice K.S. Puttaswamy v. Union of India (2017) recognized the Right to Privacy as a fundamental right.</p>

      <h2>Conclusion</h2>
      <p>Every citizen of India has powerful constitutional protections. If you believe your fundamental rights have been violated, it is important to seek legal advice promptly. At NyayaSutra, we help citizens understand and enforce their constitutional rights.</p>
    `,
  },
  'sc-weekly-digest': {
    title: 'Supreme Court Weekly Digest — Landmark Judgments Explained',
    category: 'Supreme Court Updates',
    author: 'Adv. A.K. Tripathi',
    publishedAt: '2026-06-01',
    readTime: '7 min read',
    tags: ['supreme court','judgment','weekly digest'],
    content: `
      <h2>This Week at the Supreme Court</h2>
      <p>The Supreme Court of India delivered several important judgments this week. Here is a simplified digest for citizens, law students and legal professionals.</p>
      <h2>Key Highlights</h2>
      <p>The Supreme Court's Constitution Bench continued hearing arguments in several constitutional matters. The Court also passed significant orders on bail, environmental law, and service matters.</p>
      <h2>What This Means for Citizens</h2>
      <p>These judgments have far-reaching implications for ordinary citizens. Understanding Supreme Court decisions in plain language is part of NyayaSutra's legal intelligence mission.</p>
      <h2>Stay Updated</h2>
      <p>Follow NyayaSutra on our social media platforms for weekly Supreme Court digests, case analysis, and legal intelligence updates.</p>
    `,
  },
  'bail-fir-criminal': {
    title: 'Bail Rights, FIR Procedure and Criminal Law: What Every Citizen Must Know',
    category: 'Criminal Law',
    author: 'Adv. A.K. Tripathi',
    publishedAt: '2026-05-28',
    readTime: '6 min read',
    tags: ['bail','FIR','BNSS 2023','criminal law'],
    content: `
      <h2>Introduction to Criminal Procedure under BNSS 2023</h2>
      <p>The Bharatiya Nagarik Suraksha Sanhita (BNSS) 2023 replaced the Criminal Procedure Code (CrPC) and brought significant changes to criminal procedure in India. Understanding your rights under this new code is essential.</p>
      <h2>What is an FIR?</h2>
      <p>A First Information Report (FIR) is the first step in the criminal justice process. It is filed with the police when a cognizable offence is committed. Under BNSS 2023, you have the right to file an FIR at any police station regardless of jurisdiction (Zero FIR).</p>
      <h2>Types of Bail</h2>
      <p>There are three main types of bail in Indian criminal law:</p>
      <ul>
        <li><strong>Regular Bail:</strong> After arrest, filed before Magistrate or Sessions Court</li>
        <li><strong>Anticipatory Bail:</strong> Before arrest, under Section 482 BNSS (earlier Section 438 CrPC)</li>
        <li><strong>Interim Bail:</strong> Temporary bail for a short period</li>
      </ul>
      <h2>Rights of the Accused</h2>
      <p>Every person accused of a crime has the right to legal representation, right to remain silent, right to be informed of charges, right to a fair trial, and the right to bail in bailable offences.</p>
      <h2>When to Call a Lawyer</h2>
      <p>If you or someone you know has been arrested or is facing criminal charges, contact a criminal law advocate immediately. Early legal intervention significantly improves the outcome of criminal matters.</p>
    `,
  },
  'rti-act-guide': {
    title: 'RTI Act — Your Right to Information Explained Simply',
    category: 'RTI & Human Rights',
    author: 'Adv. A.K. Tripathi',
    publishedAt: '2026-05-10',
    readTime: '5 min read',
    tags: ['RTI','right to information','government'],
    content: `
      <h2>What is the Right to Information Act?</h2>
      <p>The Right to Information (RTI) Act, 2005 is one of the most powerful tools available to Indian citizens. It gives every citizen the right to seek information from any government authority — central, state, or local.</p>
      <h2>How to File an RTI Application</h2>
      <p>Filing an RTI application is simple. You need to:</p>
      <ul>
        <li>Identify the Public Information Officer (PIO) of the relevant department</li>
        <li>Write a clear application describing the information sought</li>
        <li>Pay the prescribed fee (₹10 for central government)</li>
        <li>Submit by post, in person, or online (for central ministries)</li>
      </ul>
      <h2>What Information Can You Seek?</h2>
      <p>You can seek any information held by a public authority — documents, records, files, emails, inspection reports, contracts, and more. However, certain exemptions apply under Section 8 of the RTI Act.</p>
      <h2>What if Your RTI is Rejected?</h2>
      <p>If your RTI is rejected or information is not provided within 30 days, you can file a First Appeal before the First Appellate Authority, and then a Second Appeal before the Central or State Information Commission.</p>
      <h2>RTI as a Legal Tool</h2>
      <p>RTI can be used as a powerful tool in litigation — to gather government documents, records, and information that can support your legal case.</p>
    `,
  },
  'upsc-law-optional': {
    title: 'UPSC Law Optional — Strategy from a Mains Qualified Candidate',
    category: 'Student Corner',
    author: 'Adv. A.K. Tripathi',
    publishedAt: '2026-04-20',
    readTime: '9 min read',
    tags: ['UPSC','law optional','strategy','civil services'],
    content: `
      <h2>Why Law Optional?</h2>
      <p>Law Optional in UPSC Civil Services is one of the most scoring and intellectually rewarding optional subjects. As a practicing advocate and UPSC Mains qualified candidate, Adv. A.K. Tripathi shares his strategy and approach.</p>
      <h2>Syllabus Overview</h2>
      <p>UPSC Law Optional covers Paper I (Constitutional & Administrative Law, International Law, Law of Treaties) and Paper II (Law of Crimes, Law of Torts, Law of Contracts, Contemporary Legal Developments).</p>
      <h2>Key Strategy Points</h2>
      <ul>
        <li>Master the Indian Constitution — every article matters</li>
        <li>Focus on landmark Supreme Court judgments for each topic</li>
        <li>Practice answer writing with legal precision and structure</li>
        <li>Connect legal topics to current affairs and governance</li>
        <li>Read both bare acts and standard reference books</li>
      </ul>
      <h2>Recommended Books</h2>
      <p>M.P. Jain for Constitutional Law, S.N. Misra for Criminal Law, Avtar Singh for Contract Law, Malcolm Shaw for International Law, and Supreme Court judgments for all topics.</p>
      <h2>The UPSC-Litigation Advantage</h2>
      <p>The analytical depth required for UPSC Law Optional directly enhances your litigation skills. Both require constitutional understanding, logical reasoning, and structured argumentation — skills that define a great lawyer.</p>
    `,
  },
};

const related = [
  { title:'Practice Areas', href:'/practice-areas' },
  { title:'Students Section', href:'/students' },
  { title:'Courts & Jurisdiction', href:'/courts' },
  { title:'Contact Us', href:'/contact' },
];

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = posts[params.slug];

  if (!post) return (
    <main className="section overflow-x-hidden">
      <div className="container mx-auto px-4 text-center">
        <h1 className="section-title">Article Not Found</h1>
        <p className="muted mt-3">This article may have been moved or the URL is incorrect.</p>
        <Link href="/blog" className="btn-gold mt-6">Back to Blog</Link>
      </div>
    </main>
  );

  return (
    <main className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative py-14 px-4 bg-[#0C1018] overflow-hidden">
        <div className="container mx-auto relative z-10">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-[var(--muted2)] hover:text-[var(--gold)] mb-6 transition-colors">
            <ArrowLeft size={14}/> All Articles
          </Link>
          <span className="text-[10px] font-bold text-[var(--gold)] uppercase tracking-widest bg-[rgba(201,168,76,0.1)] px-3 py-1 rounded-full">{post.category}</span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold mt-4 leading-tight max-w-4xl">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-4 mt-5">
            <span className="flex items-center gap-1.5 text-sm text-[var(--muted2)]"><User size={13}/> {post.author}</span>
            <span className="flex items-center gap-1.5 text-sm text-[var(--muted2)]"><Clock size={13}/> {post.readTime}</span>
            <span className="text-sm text-[var(--muted2)]">{new Date(post.publishedAt).toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'})}</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section">
        <div className="container px-4 mx-auto grid lg:grid-cols-[1fr_300px] gap-10">
          <article>
            <div
              className="prose-legal"
              style={{ color:'var(--muted)', lineHeight:'1.9', fontSize:'1.0625rem' }}
              dangerouslySetInnerHTML={{ __html: post.content
                .replace(/<h2>/g, '<h2 style="font-family:Cormorant Garamond,serif;font-size:1.75rem;font-weight:700;color:#F5F0E8;margin:2rem 0 1rem;padding-bottom:0.5rem;border-bottom:1px solid rgba(201,168,76,0.15)">')
                .replace(/<h3>/g, '<h3 style="font-family:Cormorant Garamond,serif;font-size:1.3rem;font-weight:700;color:#C9A84C;margin:1.5rem 0 0.75rem">')
                .replace(/<ul>/g, '<ul style="list-style:disc;padding-left:1.5rem;margin:0.75rem 0;color:var(--muted)">')
                .replace(/<blockquote>/g, '<blockquote style="border-left:3px solid #C9A84C;padding-left:1rem;margin:1.5rem 0;font-style:italic;color:#C5BBAB">')
                .replace(/<strong>/g, '<strong style="color:#F5F0E8;font-weight:700">')
                .replace(/<em>/g, '<em style="color:#C9A84C;font-style:italic">')
              }}
            />

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-10 pt-6 border-t border-[rgba(201,168,76,0.12)]">
              {post.tags?.map((t: string) => (
                <span key={t} className="text-xs px-3 py-1.5 rounded-full border border-[rgba(201,168,76,0.2)] text-[var(--muted2)]">#{t}</span>
              ))}
            </div>

            {/* Share */}
            <div className="mt-6 p-5 card">
              <p className="font-semibold text-sm mb-3">Found this helpful?</p>
              <p className="text-xs text-[var(--muted2)] mb-4">Share this article with someone who needs it. Or contact us for a consultation.</p>
              <div className="flex flex-wrap gap-3">
                <a href="https://wa.me/919971950371" target="_blank" className="btn-gold text-sm py-2 px-4"><MessageCircle size={13}/> WhatsApp Consult</a>
                <Link href="/contact" className="btn-outline text-sm py-2 px-4">Book Appointment</Link>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-5">
            <div className="card sticky top-24">
              <h3 className="font-display text-lg font-semibold text-[var(--gold)] mb-4">Need Legal Help?</h3>
              <p className="muted text-sm leading-relaxed">Have questions about this topic? Consult directly with Adv. A.K. Tripathi.</p>
              <a href="https://wa.me/919971950371" target="_blank" className="btn-gold mt-4 w-full justify-center text-sm"><MessageCircle size={13}/> WhatsApp Now</a>
              <Link href="/contact" className="btn-outline mt-3 w-full justify-center text-sm">Book Consultation</Link>
              <div className="mt-5 pt-4 border-t border-[rgba(201,168,76,0.1)]">
                <p className="text-xs font-semibold text-[var(--gold)] mb-3">Quick Links</p>
                <div className="space-y-2">
                  {related.map(r => (
                    <Link key={r.href} href={r.href} className="flex items-center gap-2 text-xs text-[var(--muted2)] hover:text-[var(--gold)] transition-colors">
                      <ChevronRight size={10} className="text-[var(--gold)] shrink-0"/>{r.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="card bg-gradient-to-br from-[rgba(201,168,76,0.07)] to-transparent">
              <h3 className="font-display text-lg font-semibold mb-2">Legal Intelligence</h3>
              <p className="muted text-xs mb-3">Get weekly legal updates, Supreme Court digests and legal awareness articles.</p>
              <Link href="/contact" className="btn-outline text-xs py-2 px-4">Subscribe Free</Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
