'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Image as ImageIcon, Video, FileText, Play, ArrowRight, Camera, MessageCircle, RefreshCw, X, ChevronLeft, ChevronRight } from 'lucide-react';

const albums = ['All','Supreme Court Visits','High Court Visits','District Court Practice','Office Photographs','Internship Programs','Moot Court Sessions','Seminars & Conferences','Legal Events','Professional Meetings','Legal Awareness Programs','General'];

interface GalleryItem {
  _id: string; title: string; album: string; caption: string; description: string;
  images: { url: string; altText: string }[]; videoUrl: string; featured: boolean; date: string;
}

export default function Gallery() {
  const [activeAlbum, setActiveAlbum] = useState('All');
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState<{ item: GalleryItem; idx: number } | null>(null);

  useEffect(() => {
    fetch('/api/gallery')
      .then(r => r.json())
      .then(d => setItems(Array.isArray(d) ? d : []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = activeAlbum === 'All' ? items : items.filter(i => i.album === activeAlbum);

  const openLightbox = (item: GalleryItem, idx: number) => setLightbox({ item, idx });
  const closeLightbox = () => setLightbox(null);
  const navLightbox = (dir: 1 | -1) => {
    if (!lightbox) return;
    const total = lightbox.item.images.length;
    const next = (lightbox.idx + dir + total) % total;
    setLightbox({ ...lightbox, idx: next });
  };

  return (
    <main className="overflow-x-hidden">
      <section className="relative py-20 px-4 overflow-hidden bg-[#0C1018]">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(201,168,76,0.07),transparent_60%)] pointer-events-none"/>
        <div className="container mx-auto relative z-10">
          <p className="tag">Professional Journey</p>
          <h1 className="section-title mt-3">Gallery & Media</h1>
          <p className="muted text-lg mt-5 max-w-3xl">A glimpse into legal practice, court visits, professional meetings, legal conferences, academic sessions, internships, seminars, legal awareness programs, and professional legal engagements.</p>
        </div>
      </section>

      {/* Album Filter */}
      <div className="border-b border-[rgba(201,168,76,0.1)] bg-[#07090F] sticky top-16 z-30">
        <div className="container mx-auto px-4">
          <div className="flex gap-1 py-3 overflow-x-auto">
            {albums.map(a => (
              <button key={a} onClick={() => setActiveAlbum(a)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeAlbum === a ? 'bg-[rgba(201,168,76,0.15)] text-[var(--gold)]' : 'text-[var(--muted2)] hover:text-[var(--ivory)]'
                }`}>{a}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="section">
        <div className="container px-4 mx-auto">
          {loading ? (
            <div className="text-center py-20"><RefreshCw size={24} className="animate-spin inline text-[var(--muted2)]"/></div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16">
              <Camera size={40} className="text-[var(--muted2)] mx-auto mb-4 opacity-30"/>
              <p className="muted">No photos in this album yet. New images are added regularly via the admin panel.</p>
            </div>
          ) : (
            <div className="gallery-grid">
              {filtered.map(item => (
                <div key={item._id} className="card-link overflow-hidden group p-0">
                  <button onClick={() => openLightbox(item, 0)} className="block w-full text-left">
                    <div className="aspect-[4/3] relative overflow-hidden bg-[#101520]">
                      {item.images?.[0]?.url ? (
                        <img src={item.images[0].url} alt={item.images[0].altText || item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center"><Camera size={36} className="text-[rgba(201,168,76,0.2)]"/></div>
                      )}
                      {item.images?.length > 1 && (
                        <span className="absolute bottom-2 right-2 text-[10px] px-2 py-0.5 rounded-full bg-black/60 text-white">+{item.images.length - 1} photos</span>
                      )}
                    </div>
                    <div className="p-4">
                      <p className="text-[10px] font-bold text-[var(--gold)] uppercase tracking-widest bg-[rgba(201,168,76,0.08)] px-2 py-0.5 rounded-full inline-block mb-2">{item.album}</p>
                      <h3 className="font-semibold text-sm">{item.title}</h3>
                      {item.caption && <p className="text-[var(--muted2)] text-xs mt-1 leading-snug">{item.caption}</p>}
                    </div>
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Media Highlights */}
          <div className="mt-16">
            <div className="flex items-center gap-4 mb-8">
              <p className="tag">Media Highlights</p>
              <div className="flex-1 h-px bg-[rgba(201,168,76,0.15)]"/>
            </div>
            <div className="grid sm:grid-cols-3 gap-5">
              <div className="card flex flex-col items-center text-center py-8">
                <div className="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center mb-4">
                  <Play size={24} className="text-red-500"/>
                </div>
                <h3 className="font-display text-lg font-semibold">Intro Video</h3>
                <p className="text-[var(--muted2)] text-sm mt-2">Founder introduction and NyayaSutra overview video</p>
                <button className="btn-outline mt-4 text-sm"><Play size={12}/> Coming Soon</button>
              </div>
              <div className="card flex flex-col items-center text-center py-8">
                <div className="w-14 h-14 rounded-2xl bg-[rgba(201,168,76,0.1)] flex items-center justify-center mb-4">
                  <Video size={24} className="text-[var(--gold)]"/>
                </div>
                <h3 className="font-display text-lg font-semibold">Legal Awareness Videos</h3>
                <p className="text-[var(--muted2)] text-sm mt-2">Court journey clips, legal awareness & case discussions</p>
                <button className="btn-outline mt-4 text-sm"><Play size={12}/> Coming Soon</button>
              </div>
              <div className="card flex flex-col items-center text-center py-8">
                <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-4">
                  <FileText size={24} className="text-purple-400"/>
                </div>
                <h3 className="font-display text-lg font-semibold">Audio Notes</h3>
                <p className="text-[var(--muted2)] text-sm mt-2">Legal awareness podcasts, voice notes & audio lectures</p>
                <button className="btn-outline mt-4 text-sm">Coming Soon</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-sm bg-[#0C1018] px-4">
        <div className="container mx-auto text-center">
          <h2 className="font-display text-2xl font-bold">Want to add photos?</h2>
          <p className="muted text-sm mt-2">Upload gallery images from the Admin Panel.</p>
          <div className="flex justify-center gap-3 mt-5">
            <Link href="/admin" className="btn-outline text-sm">Admin Panel</Link>
            <a href="https://wa.me/919971950371" target="_blank" className="btn-gold text-sm"><MessageCircle size={13}/> Contact Us</a>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-[300] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4" onClick={closeLightbox}>
          <button onClick={closeLightbox} className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"><X size={18}/></button>
          {lightbox.item.images.length > 1 && (
            <>
              <button onClick={(e) => { e.stopPropagation(); navLightbox(-1); }} className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"><ChevronLeft size={20}/></button>
              <button onClick={(e) => { e.stopPropagation(); navLightbox(1); }} className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"><ChevronRight size={20}/></button>
            </>
          )}
          <div className="max-w-4xl max-h-[85vh] w-full" onClick={e => e.stopPropagation()}>
            <img src={lightbox.item.images[lightbox.idx]?.url} alt={lightbox.item.title} className="w-full h-full object-contain max-h-[75vh] rounded-xl"/>
            <div className="text-center mt-4">
              <p className="text-white font-semibold">{lightbox.item.title}</p>
              {lightbox.item.caption && <p className="text-[var(--muted2)] text-sm mt-1">{lightbox.item.caption}</p>}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
