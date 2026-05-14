import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  BadgeCheck, XCircle, AlertTriangle, Calendar, User, Award,
  Briefcase, ChevronRight, ArrowLeft, ShieldCheck, Star,
} from 'lucide-react';
import { getCertificate, formatDate, getComputedStatus } from '@/lib/certificates';
import type { Certificate } from '@/lib/types';

import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';

/* ... existing imports ... */
import { UserCheck, FileText } from 'lucide-react'; // Add these for the new boxes

/* ── Static Metadata (dynamic) ──────────────────────────────────── */
export async function generateMetadata(
  { params }: { params: { id: string } }
): Promise<Metadata> {
  const cert = getCertificate(params.id);
  if (!cert) return { title: 'Certificate Not Found' };
  return {
    title:       `${cert.recipientName} — ${cert.credentialTitle}`,
    description: `Verify the experience record of ${cert.recipientName} at Oceaniasoft.`,
  };
}

/* ── Page ────────────────────────────────────────────────────────── */
export default function VerifyPage({ params }: { params: { id: string } }) {
  const cert = getCertificate(params.id);
  const status = cert ? getComputedStatus(cert) : null;

  return (
    <div className="relative min-h-screen pt-28 pb-20">

      {/* Dot-grid background */}
      <div className="absolute inset-0 bg-dot-grid pointer-events-none opacity-50" />

      {/* Ambient glow */}
      {status === 'valid' && (
        <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px]
                        bg-[radial-gradient(ellipse,rgba(245,166,35,0.08)_0%,transparent_70%)]
                        pointer-events-none" />
      )}

      <div className="relative max-w-3xl mx-auto px-6">

        {/* Back link */}
        <Link href="https://oceaniasoft.com"
          className="inline-flex items-center gap-1.5 text-xs text-ink-muted hover:text-amber
                     transition-colors mb-8 group">
          <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
          Back to home
        </Link>

        {/* ── Not Found State ─────────────────────────────── */}
        {!cert && <NotFoundCard id={params.id} />}

        {/* ── Certificate Found ───────────────────────────── */}
        {cert && status && (
          <>
            {/* Status banner */}
            <StatusBanner status={status} />

            {/* Official credential card */}
            <CredentialCard cert={cert} status={status} />

            {/* Skills section */}
            <SkillsSection skills={cert.skills} />

            {/* Footer verification note */}
            <VerificationNote id={cert.id} />
          </>
        )}

      </div>
    </div>
  );
}

/* ── Status Banner ───────────────────────────────────────────────── */
function StatusBanner({ status }: { status: 'valid' | 'expired' | 'revoked' }) {
  const config = {
    valid: {
      bg:   'bg-emerald-500/10 border-emerald-500/30',
      text: 'text-emerald-400',
      icon: <BadgeCheck size={16} strokeWidth={2.5} className="text-emerald-400" />,
      msg:  'This employment record has been verified and is currently active.',
    },
    expired: {
      bg:   'bg-amber-500/10 border-amber/30',
      text: 'text-amber',
      icon: <AlertTriangle size={16} strokeWidth={2.5} className="text-amber" />,
      msg:  'This record was valid but has now expired or the tenure has ended.',
    },
    revoked: {
      bg:   'bg-red-500/10 border-red-500/30',
      text: 'text-red-400',
      icon: <XCircle size={16} strokeWidth={2.5} className="text-red-400" />,
      msg:  'This record has been revoked and is no longer valid.',
    },
  }[status];

  return (
    <div className={`flex items-center gap-3 px-5 py-3.5 rounded-card border ${config.bg} mb-6`}>
      {config.icon}
      <p className={`text-sm font-medium ${config.text}`}>{config.msg}</p>
    </div>
  );
}

/* ── Credential Card ─────────────────────────────────────────────── */
function CredentialCard({
  cert, status,
}: {
  cert: Certificate;
  status: 'valid' | 'expired' | 'revoked';
}) {
  const statusConfig = {
    valid: {
      badgeBg:   'bg-emerald-500/15 border-emerald-500/40',
      badgeText: 'text-emerald-400',
      badgeIcon: <BadgeCheck size={14} strokeWidth={2.5} />,
      badgeLabel:'VERIFIED',
      headerLine:'from-emerald-500/20 via-transparent',
    },
    expired: {
      badgeBg:   'bg-amber-500/15 border-amber/40',
      badgeText: 'text-amber',
      badgeIcon: <AlertTriangle size={14} strokeWidth={2.5} />,
      badgeLabel:'EXPIRED',
      headerLine:'from-amber/20 via-transparent',
    },
    revoked: {
      badgeBg:   'bg-red-500/15 border-red-500/40',
      badgeText: 'text-red-400',
      badgeIcon: <XCircle size={14} strokeWidth={2.5} />,
      badgeLabel:'REVOKED',
      headerLine:'from-red-500/20 via-transparent',
    },
  }[status];

  return (
    <div className="bg-navy-surface border border-navy-border rounded-card-lg overflow-hidden
                    shadow-card animate-fade-up mb-6">

      {/* Card header bar */}
      <div className={`h-1.5 bg-gradient-to-r ${statusConfig.headerLine} to-transparent`} />

      {/* Header row */}
      <div className="px-8 pt-8 pb-6 border-b border-navy-border
                      flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-card bg-amber-dim border border-amber/20
                          flex items-center justify-center flex-shrink-0">
            <ShieldCheck size={26} className="text-amber" strokeWidth={1.75} />
          </div>
          <div>
            <span className="font-display text-lg font-bold text-white">
              Oceaniasoft<span className="text-amber">.</span>
            </span>
            <p className="text-xs text-ink-muted">Experience Verification</p>
          </div>
        </div>

        {/* Status badge */}
        <div className={`
          inline-flex items-center gap-1.5 px-4 py-2 rounded-full border text-xs font-bold
          tracking-widest uppercase ${statusConfig.badgeBg} ${statusConfig.badgeText}
        `}>
          {statusConfig.badgeIcon}
          {statusConfig.badgeLabel}
        </div>
      </div>

      {/* Credential body */}
      <div className="px-8 py-8">

        {/* Recipient name + title */}
        <div className="mb-8">
          <p className="text-xs font-semibold text-amber uppercase tracking-widest mb-1">
            Certified Professional
          </p>
          <h1 className="font-display text-4xl font-bold text-white mb-2 leading-tight">
            {cert.recipientName}
          </h1>
          <p className="text-lg text-ink-muted">
            {cert.credentialTitle}
          </p>
        </div>

        {/* Description + Responsibilities Block */}
        {cert.description && (
          <div className="text-sm text-ink-muted leading-relaxed mb-8 p-6 rounded-card bg-navy border border-navy-border">
            <p className={cert.responsibilities ? "mb-4" : ""}>
              {cert.description}
            </p>
            
            {cert.responsibilities && cert.responsibilities.length > 0 && (
              <ul className="space-y-2 list-none">
                {cert.responsibilities.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-amber mt-1.5 w-1 h-1 rounded-full bg-amber flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Updated Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <DetailRow icon={<Briefcase size={15} />} label="Employment Type" value={cert.credentialType} />
          <DetailRow icon={<User size={15} />}      label="Role"      value={cert.grade} />
          <DetailRow icon={<Calendar size={15} />}  label="Joining Date"    value={formatDate(cert.issueDate)} />
          <DetailRow icon={<Calendar size={15} />}  label="Release Date"    value={formatDate(cert.expiryDate)} />
          <DetailRow icon={<Award size={15} />}     label="Organization"    value={cert.issuerName} />
          <DetailRow icon={<ShieldCheck size={15} />} label="Employee ID"     value={cert.issuerTitle} />
          
          {/* NEW BOXES */}
          <DetailRow 
            icon={<UserCheck size={15} />} 
            label="Authorized By" 
            value={`${cert.authorizedBy}, ${cert.authorizerRole}`} 
          />
          <DetailRow 
            icon={<FileText size={15} />} 
            label="Certificate Issue Date" 
            value={formatDate(cert.certifiedOn || "")} 
          />
        </div>
        {/* Certificate ID */}
        <div className="mt-6 flex items-center justify-between p-4 rounded-card
                        bg-navy border border-navy-border">
          <div>
            <p className="text-xs text-ink-muted uppercase tracking-widest mb-0.5">Verification ID</p>
            <p className="font-mono text-sm text-amber font-medium">{cert.id}</p>
          </div>
          <ChevronRight size={16} className="text-ink-muted" />
        </div>
      </div>
    </div>
  );
}

/* ── Detail Row ──────────────────────────────────────────────────── */
function DetailRow({
  icon, label, value,
}: {
  icon: React.ReactNode; label: string; value: string;
}) {
  return (
    <div className="flex items-start gap-3 p-4 rounded-card bg-navy border border-navy-border">
      <span className="text-amber mt-0.5 flex-shrink-0">{icon}</span>
      <div>
        <p className="text-xs text-ink-muted uppercase tracking-wide mb-0.5">{label}</p>
        <p className="text-sm font-medium text-ink">{value}</p>
      </div>
    </div>
  );
}

/* ── Skills Section ──────────────────────────────────────────────── */
function SkillsSection({ skills }: { skills: string[] }) {
  if (!skills || !skills.length) return null;
  return (
    <div className="bg-navy-surface border border-navy-border rounded-card-lg px-8 py-6 mb-6
                    animate-fade-up" style={{ animationDelay: '0.1s' }}>
      <p className="text-xs font-semibold text-amber uppercase tracking-widest mb-4">
        Core Competencies
      </p>
      <div className="flex flex-wrap gap-2">
        {skills.map((s) => (
          <span key={s}
            className="text-xs font-medium text-ink-muted bg-navy border border-navy-border
                       px-3 py-1.5 rounded-full hover:border-amber hover:text-amber
                       transition-colors cursor-default">
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Verification Note ───────────────────────────────────────────── */
function VerificationNote({ id }: { id: string }) {
  return (
    <div className="flex items-start gap-3 p-5 rounded-card bg-amber-dim border border-amber/20
                    animate-fade-up" style={{ animationDelay: '0.2s' }}>
      <ShieldCheck size={18} className="text-amber flex-shrink-0 mt-0.5" strokeWidth={1.75} />
      <div>
        <p className="text-xs font-semibold text-amber mb-1">Authenticity Notice</p>
        <p className="text-xs text-ink-muted leading-relaxed">
          This digital record is maintained by Oceaniasoft Ltd. The verification ID{' '}
          <span className="font-mono text-amber">{id}</span> is unique and tamper-evident.
          For enquiries, contact{' '}
          <a href="mailto:hello@oceaniasoft.com"
            className="text-amber hover:underline">hello@oceaniasoft.com</a>.
        </p>
      </div>
    </div>
  );
}

/* ── Not Found Card ──────────────────────────────────────────────── */
function NotFoundCard({ id }: { id: string }) {
  return (
    <div className="bg-navy-surface border border-red-500/20 rounded-card-lg p-10 text-center
                    animate-fade-up">
      <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center
                      justify-center mx-auto mb-5">
        <XCircle size={32} className="text-red-400" strokeWidth={1.5} />
      </div>
      <h2 className="font-display text-2xl font-bold text-white mb-2">
        Record Not Found
      </h2>
      <p className="text-ink-muted text-sm mb-2">
        No employment record found for ID:
      </p>
      <p className="font-mono text-sm text-red-400 bg-red-500/10 border border-red-500/20
                    inline-block px-4 py-2 rounded-card mb-6">
        {id}
      </p>
      <p className="text-xs text-ink-muted mb-8 max-w-sm mx-auto">
        Please check the ID and try again, or contact the HR department to confirm the
        record details.
      </p>
      <Link href="https://oceaniasoft.com"
        className="inline-flex items-center gap-2 bg-amber text-navy font-semibold text-sm
                   px-6 py-3 rounded-card hover:bg-amber-light transition-all duration-200
                   hover:-translate-y-0.5 hover:shadow-amber">
        <ArrowLeft size={14} />
        Return Home
      </Link>
    </div>
  );
}