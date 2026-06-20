'use client';
import { forwardRef } from 'react';
import Image from 'next/image';
import { Scale } from 'lucide-react';

export interface CertificateData {
  certificateNumber: string;
  studentName: string;
  fatherName: string;
  courseName: string;
  courseType: string;
  duration: string;
  startDate: string;
  endDate: string;
  grade: string;
  issueDate: string;
  remarks: string;
  signatoryName: string;
  signatoryDesignation: string;
}

function formatDate(d: string) {
  if (!d) return '';
  try {
    return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  } catch { return d; }
}

/**
 * High-resolution certificate template — designed for export at 1754x1240px (A4 landscape @150dpi)
 * Renders at a fixed pixel size for consistent PDF/PNG export quality.
 */
const CertificateTemplate = forwardRef<HTMLDivElement, { data: CertificateData }>(({ data }, ref) => {
  return (
    <div
      ref={ref}
      id="certificate-render-target"
      style={{
        width: '1754px',
        height: '1240px',
        position: 'relative',
        background: 'linear-gradient(135deg, #FCFAF4 0%, #F7F1E2 50%, #FCFAF4 100%)',
        fontFamily: "'Cormorant Garamond', 'DM Sans', serif",
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      {/* Watermark logo - large, faint, centered */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0.06,
          pointerEvents: 'none',
        }}
      >
        <img src="/logo-transparent.png" alt="" style={{ width: 680, height: 'auto', filter: 'grayscale(1)' }} />
      </div>

      {/* Outer decorative border */}
      <div
        style={{
          position: 'absolute',
          inset: '28px',
          border: '3px solid #9C7A2E',
          borderRadius: '4px',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: '40px',
          border: '1px solid #C9A84C',
          borderRadius: '2px',
        }}
      />

      {/* Corner ornaments */}
      {[
        { top: '50px', left: '50px', rotate: '0deg' },
        { top: '50px', right: '50px', rotate: '90deg' },
        { bottom: '50px', right: '50px', rotate: '180deg' },
        { bottom: '50px', left: '50px', rotate: '270deg' },
      ].map((pos, i) => (
        <svg
          key={i}
          width="60"
          height="60"
          viewBox="0 0 60 60"
          style={{ position: 'absolute', ...pos, transform: `rotate(${(pos as any).rotate})` }}
        >
          <path d="M2 2 L2 30 M2 2 L30 2" stroke="#9C7A2E" strokeWidth="3" fill="none" />
          <circle cx="2" cy="2" r="5" fill="#C9A84C" />
        </svg>
      ))}

      {/* Content container */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          height: '100%',
          padding: '90px 130px 70px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          color: '#221A0F',
        }}
      >
        {/* Header: Logo + Org name */}
        <img src="/logo-transparent.png" alt="NyayaSutra" style={{ height: 90, width: 'auto', objectFit: 'contain', marginBottom: 6 }} />
        <p
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: 14,
            letterSpacing: '0.35em',
            color: '#9C7A2E',
            fontWeight: 700,
            margin: '4px 0 0',
            textTransform: 'uppercase',
          }}
        >
          NyayaSutra — Legal Intelligence
        </p>
        <p style={{ fontSize: 13, color: '#5A4E3C', letterSpacing: '0.15em', marginTop: 2 }}>
          Strategic Litigation · Legal Research · Drafting · Legal Education
        </p>

        {/* Gold divider */}
        <div style={{ width: 140, height: 2, background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)', margin: '22px 0' }} />

        {/* Certificate Title */}
        <p style={{ fontSize: 16, letterSpacing: '0.4em', color: '#9C7A2E', fontWeight: 700, textTransform: 'uppercase', margin: 0 }}>
          {data.courseType || 'Certificate of Completion'}
        </p>
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 56,
            fontWeight: 700,
            margin: '8px 0 0',
            color: '#221A0F',
            letterSpacing: '0.02em',
          }}
        >
          Certificate of Achievement
        </h1>

        {/* "This is to certify that" */}
        <p style={{ fontSize: 18, color: '#5A4E3C', marginTop: 36, fontStyle: 'italic' }}>This is to certify that</p>

        {/* Student Name */}
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 46,
            fontWeight: 700,
            color: '#7A5E20',
            margin: '8px 0',
            borderBottom: '1.5px solid #C9A84C',
            paddingBottom: 10,
            minWidth: 480,
          }}
        >
          {data.studentName || 'Student Name'}
        </h2>
        {data.fatherName && (
          <p style={{ fontSize: 15, color: '#5A4E3C', marginTop: 2 }}>S/o, D/o — {data.fatherName}</p>
        )}

        {/* Body text */}
        <p style={{ fontSize: 18, color: '#3A2F1E', lineHeight: 1.8, marginTop: 26, maxWidth: 980 }}>
          has successfully completed the{' '}
          <strong style={{ color: '#7A5E20' }}>{data.courseName || 'Course Name'}</strong>
          {data.duration ? <> conducted over a duration of <strong>{data.duration}</strong></> : null}
          {data.startDate && data.endDate ? (
            <>
              {' '}from <strong>{formatDate(data.startDate)}</strong> to <strong>{formatDate(data.endDate)}</strong>
            </>
          ) : null}
          , demonstrating dedication, professionalism, and a strong commitment to legal learning.
        </p>

        {data.grade && (
          <p style={{ fontSize: 16, color: '#7A5E20', fontWeight: 700, marginTop: 14, letterSpacing: '0.05em' }}>
            Grade / Result: {data.grade}
          </p>
        )}

        {data.remarks && (
          <p style={{ fontSize: 14, color: '#5A4E3C', marginTop: 8, fontStyle: 'italic', maxWidth: 800 }}>
            “{data.remarks}”
          </p>
        )}

        {/* Spacer pushes footer down */}
        <div style={{ flex: 1 }} />

        {/* Footer: Signature | Seal | Date+CertNo */}
        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginTop: 40,
            paddingTop: 20,
          }}
        >
          {/* Left: Issue Date */}
          <div style={{ textAlign: 'center', minWidth: 200 }}>
            <p style={{ fontSize: 16, fontWeight: 600, color: '#221A0F', borderTop: '1.5px solid #9C7A2E', paddingTop: 8 }}>
              {formatDate(data.issueDate) || formatDate(new Date().toISOString())}
            </p>
            <p style={{ fontSize: 11, color: '#8A7A5E', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: 2 }}>
              Date of Issue
            </p>
          </div>

          {/* Center: Seal */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', top: -10 }}>
            <div
              style={{
                width: 110,
                height: 110,
                borderRadius: '50%',
                border: '3px double #9C7A2E',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'radial-gradient(circle, rgba(201,168,76,0.08), transparent 70%)',
                position: 'relative',
              }}
            >
              <svg width="48" height="48" viewBox="0 0 48 48">
                <path d="M24 6 L36 12 L36 24 C36 32 30 38 24 42 C18 38 12 32 12 24 L12 12 Z" fill="none" stroke="#9C7A2E" strokeWidth="2" />
                <path d="M16 22 L21 27 L32 16" fill="none" stroke="#9C7A2E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <svg width="130" height="130" style={{ position: 'absolute', top: -10, left: -10 }} viewBox="0 0 130 130">
                <defs>
                  <path id="circlePath" d="M 65,65 m -50,0 a 50,50 0 1,1 100,0 a 50,50 0 1,1 -100,0" />
                </defs>
                <text fontSize="9" fill="#9C7A2E" letterSpacing="2" fontFamily="DM Sans">
                  <textPath href="#circlePath" startOffset="2%">
                    • NYAYASUTRA LEGAL INTELLIGENCE • OFFICIAL SEAL •
                  </textPath>
                </text>
              </svg>
            </div>
          </div>

          {/* Right: Signature */}
          <div style={{ textAlign: 'center', minWidth: 220 }}>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', cursive, serif",
                fontSize: 30,
                fontStyle: 'italic',
                color: '#1A1208',
                margin: 0,
                fontWeight: 600,
              }}
            >
              {data.signatoryName || 'Adv. A.K. Tripathi'}
            </p>
            <p style={{ fontSize: 16, fontWeight: 600, color: '#221A0F', borderTop: '1.5px solid #9C7A2E', paddingTop: 8, marginTop: 4 }}>
              Authorized Signatory
            </p>
            <p style={{ fontSize: 11, color: '#8A7A5E', letterSpacing: '0.08em', marginTop: 2 }}>
              {data.signatoryDesignation || 'Founder, NyayaSutra — Legal Intelligence'}
            </p>
          </div>
        </div>

        {/* Certificate number footer */}
        <p style={{ fontSize: 11, color: '#8A7A5E', letterSpacing: '0.1em', marginTop: 18 }}>
          Certificate No: <strong style={{ color: '#5A4E3C' }}>{data.certificateNumber || 'NS-CERT-XXXX-0000'}</strong>
          &nbsp;&nbsp;|&nbsp;&nbsp; Verify at nyayasutra.com/verify
        </p>
      </div>
    </div>
  );
});

CertificateTemplate.displayName = 'CertificateTemplate';
export default CertificateTemplate;
