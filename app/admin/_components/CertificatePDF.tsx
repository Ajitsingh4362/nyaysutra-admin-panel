'use client';
import { Document, Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import type { CertificateData } from './CertificateTemplate';

// IMPORTANT: Do NOT use Font.register() with external Google Fonts URLs here.
// Those URLs are version-hashed and Google periodically changes/expires them
// without notice, which previously caused hard 404 failures during
// certificate generation (this is the second time this exact class of bug
// has occurred). Instead, we rely entirely on @react-pdf/renderer's 14
// built-in, zero-network-dependency PDF base fonts (Times-Roman / Helvetica
// and their Bold/Italic/BoldItalic variants). These are embedded in the
// PDF spec itself and can never fail to load.
//   - 'Times-Roman' family (with weight 700 → bold) gives the certificate
//     its elegant serif, institutional look in place of Playfair Display.
//   - 'Helvetica' gives the clean sans-serif body text in place of DM Sans.

const GOLD = '#9C7A2E';
const GOLD_LIGHT = '#C9A84C';
const INK = '#221A0F';
const MUTED = '#5A4E3C';
const MUTED2 = '#8A7A5E';
const BG = '#FCFAF4';

const styles = StyleSheet.create({
  page: {
    backgroundColor: BG,
    fontFamily: 'Helvetica',
    padding: 0,
    position: 'relative',
  },
  outerBorder: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    bottom: 20,
    borderWidth: 2.5,
    borderColor: GOLD,
  },
  innerBorder: {
    position: 'absolute',
    top: 28,
    left: 28,
    right: 28,
    bottom: 28,
    borderWidth: 1,
    borderColor: GOLD_LIGHT,
  },
  watermark: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 320,
    height: 220,
    marginLeft: -160,
    marginTop: -110,
    opacity: 0.05,
  },
  content: {
    paddingTop: 50,
    paddingHorizontal: 70,
    paddingBottom: 40,
    alignItems: 'center',
    height: '100%',
  },
  logo: { width: 70, height: 70, objectFit: 'contain', marginBottom: 4 },
  orgName: {
    fontFamily: 'Times-Bold',
    fontSize: 11,
    letterSpacing: 3,
    color: GOLD,
    textTransform: 'uppercase',
    marginTop: 2,
  },
  tagline: { fontSize: 8, color: MUTED, letterSpacing: 1, marginTop: 2 },
  divider: { width: 100, height: 1.5, backgroundColor: GOLD_LIGHT, marginVertical: 14 },
  certType: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 10,
    letterSpacing: 3,
    color: GOLD,
    textTransform: 'uppercase',
  },
  mainTitle: {
    fontFamily: 'Times-Bold',
    fontSize: 32,
    color: INK,
    marginTop: 6,
  },
  certifyText: { fontSize: 12, color: MUTED, marginTop: 22, letterSpacing: 0.5 },
  studentName: {
    fontFamily: 'Times-Bold',
    fontSize: 27,
    color: '#7A5E20',
    marginTop: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: GOLD_LIGHT,
    minWidth: 320,
    textAlign: 'center',
  },
  fatherName: { fontSize: 9, color: MUTED, marginTop: 4 },
  bodyText: {
    fontSize: 12,
    color: '#3A2F1E',
    lineHeight: 1.7,
    marginTop: 18,
    textAlign: 'center',
    maxWidth: 560,
  },
  bold: { fontFamily: 'Helvetica-Bold', color: '#7A5E20' },
  grade: { fontFamily: 'Helvetica-Bold', fontSize: 11, color: '#7A5E20', marginTop: 10, letterSpacing: 0.5 },
  remarks: { fontSize: 9, color: MUTED, marginTop: 6, letterSpacing: 0.3, textAlign: 'center', maxWidth: 480 },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: '100%',
    marginTop: 'auto',
    paddingTop: 16,
  },
  footerBlock: { alignItems: 'center', minWidth: 140 },
  footerValue: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 11,
    color: INK,
    borderTopWidth: 1,
    borderTopColor: GOLD,
    paddingTop: 6,
    textAlign: 'center',
  },
  footerLabel: { fontSize: 7, color: MUTED2, letterSpacing: 1, marginTop: 2, textTransform: 'uppercase' },
  seal: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: GOLD,
    borderStyle: 'solid',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sealInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 0.75,
    borderColor: GOLD,
    borderStyle: 'solid',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sealText: { fontSize: 6, color: GOLD, textAlign: 'center' },
  signature: {
    fontFamily: 'Times-Bold',
    fontSize: 18,
    color: '#1A1208',
  },
  certNumber: { fontSize: 7, color: MUTED2, letterSpacing: 0.5, marginTop: 12 },
});

function formatDate(d: string) {
  if (!d) return '';
  try {
    return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  } catch { return d; }
}

export default function CertificatePDF({ data }: { data: CertificateData }) {
  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <Image src="/logo-transparent.png" style={styles.watermark} />
        <View style={styles.outerBorder} fixed />
        <View style={styles.innerBorder} fixed />

        <View style={styles.content}>
          <Image src="/logo-transparent.png" style={styles.logo} />
          <Text style={styles.orgName}>NyayaSutra — Legal Intelligence</Text>
          <Text style={styles.tagline}>Strategic Litigation · Legal Research · Drafting · Legal Education</Text>

          <View style={styles.divider} />

          <Text style={styles.certType}>{data.courseType || 'Certificate of Completion'}</Text>
          <Text style={styles.mainTitle}>Certificate of Achievement</Text>

          <Text style={styles.certifyText}>This is to certify that</Text>
          <Text style={styles.studentName}>{data.studentName || 'Student Name'}</Text>
          {!!data.fatherName && <Text style={styles.fatherName}>S/o, D/o — {data.fatherName}</Text>}

          <Text style={styles.bodyText}>
            has successfully completed the{' '}
            <Text style={styles.bold}>{data.courseName || 'Course Name'}</Text>
            {data.duration ? <> conducted over a duration of <Text style={styles.bold}>{data.duration}</Text></> : null}
            {data.startDate && data.endDate ? (
              <> from <Text style={styles.bold}>{formatDate(data.startDate)}</Text> to <Text style={styles.bold}>{formatDate(data.endDate)}</Text></>
            ) : null}
            , demonstrating dedication, professionalism, and a strong commitment to legal learning.
          </Text>

          {!!data.grade && <Text style={styles.grade}>Grade / Result: {data.grade}</Text>}
          {!!data.remarks && <Text style={styles.remarks}>&ldquo;{data.remarks}&rdquo;</Text>}

          <View style={styles.footerRow}>
            <View style={styles.footerBlock}>
              <Text style={styles.footerValue}>{formatDate(data.issueDate) || formatDate(new Date().toISOString())}</Text>
              <Text style={styles.footerLabel}>Date of Issue</Text>
            </View>

            <View style={{ alignItems: 'center' }}>
              <View style={styles.seal}>
                <View style={styles.sealInner}>
                  <Text style={styles.sealText}>NYAYASUTRA{'\n'}OFFICIAL SEAL</Text>
                </View>
              </View>
            </View>

            <View style={styles.footerBlock}>
              <Text style={styles.signature}>{data.signatoryName || 'Adv. A.K. Tripathi'}</Text>
              <Text style={[styles.footerValue, { marginTop: 4 }]}>Authorized Signatory</Text>
              <Text style={styles.footerLabel}>{data.signatoryDesignation || 'Founder, NyayaSutra — Legal Intelligence'}</Text>
            </View>
          </View>

          <Text style={styles.certNumber}>
            Certificate No: {data.certificateNumber || 'NS-CERT-XXXX-0000'}   |   Verify at nyayasutra.com/verify
          </Text>
        </View>
      </Page>
    </Document>
  );
}
