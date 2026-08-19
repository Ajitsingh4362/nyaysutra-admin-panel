'use client';

interface GalleryPhoto {
  _id: string;
  url: string;
  alt: string;
}

export default function HomeGalleryMarquee({ photos }: { photos: GalleryPhoto[] }) {
  // Duplicate the list so the scroll loop is seamless
  const track = [...photos, ...photos];

  return (
    <div className="home-gallery-marquee">
      <div className="home-gallery-track">
        {track.map((p, i) => (
          <div key={`${p._id}-${i}`} className="home-gallery-item">
            <img src={p.url} alt={p.alt} loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  );
}
