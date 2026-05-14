import Link from 'next/link';
import {
  BadgeCheck, XCircle, Calendar, User, Award,
  ArrowLeft, ShieldCheck, Briefcase, UserCheck, FileText
} from 'lucide-react';

// ============================================================
// ★ YOUR CERTIFICATES — ADD / EDIT HERE
//
// HOW TO ADD A NEW PERSON:
//   1. Copy one certificate block
//   2. Paste it below the last one, change the ID + details
//   3. git add . && git commit -m "add cert" && git push
//
// URL pattern:  yoursite.com/verify/OS-EXP-2026-003
// ============================================================
const CERTIFICATES: Record<string, {
  recipientName:   string;
  credentialTitle: string;
  credentialType:  string;   // Employment Type
  department:      string;   // Department
  joiningDate:     string;   // e.g. "15 March 2024"
  releaseDate:     string;   // e.g. "20 May 2027"
  organization:    string;   // Organization name
  employeeId:      string;   // Employee ID
  authorizedBy:    string;   // Authorizer name
  authorizerRole:  string;   // Authorizer role/title
  certifiedOn:     string;   // Certificate issue date e.g. "21 May 2026"
  description:     string;
  responsibilities: string[];
  skills:          string[];
}> = {

  // ── Certificate 1 ──────────────────────────────────────
  "OS-EXP-2026-003": {
    recipientName:   "Golam Shareare Reham",
    credentialTitle: "Web Developer",
    credentialType:  "Full-Time Employment",
    department:      "Web developer",
    joiningDate:     "15 March 2024",
    releaseDate:     "20 May 2027",
    organization:    "OceaniaSoft Ltd.",
    employeeId:      "OS-77291",
    authorizedBy:    "Rabbani Rafi",
    authorizerRole:  "Chief Executive Officer",
    certifiedOn:     "21 May 2026",
    description:     "Reham was a core member of the Development team, contributing to several high-impact projects. His key responsibilities included leading technical initiatives and delivering quality software solutions.",
    responsibilities: [
      "Leading the migration of legacy architecture to Next.js 15.",
      "Optimizing database queries which reduced latency by 40%.",
      "Mentoring junior developers and conducting weekly code reviews.",
      "Collaborating with UI/UX designers to implement accessible components.",
    ],
    skills: ["React", "Node.js", "Architecture", "Cloud Migration"],
  },

  // ── ADD MORE CERTIFICATES BELOW ────────────────────────
  // "OS-EXP-2026-004": {
  //   recipientName:   "Jane Smith",
  //   credentialTitle: "UI/UX Designer",
  //   credentialType:  "Full-Time Employment",
  //   department:      "Design",
  //   joiningDate:     "01 January 2025",
  //   releaseDate:     "01 January 2028",
  //   organization:    "OceaniaSoft Ltd.",
  //   employeeId:      "OS-77292",
  //   authorizedBy:    "Rabbani Rafi",
  //   authorizerRole:  "Chief Executive Officer",
  //   certifiedOn:     "01 January 2025",
  //   description:     "Jane was a key designer...",
  //   responsibilities: ["Designed wireframes", "Led user research"],
  //   skills: ["Figma", "User Research"],
  // },

};
// ============================================================


// ★ Next.js 15: params is a Promise — must be awaited
export default async function VerifyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cert = CERTIFICATES[id];

  // ── NOT FOUND ─────────────────────────────────────────────
  if (!cert) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="w-full max-w-lg bg-[#111827] border border-red-500/20 rounded-2xl p-10 text-center">
          <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20
                          flex items-center justify-center mx-auto mb-5">
            <XCircle size={32} className="text-red-400" strokeWidth={1.5} />
          </div>
          <h2 className="font-serif text-2xl font-bold text-white mb-2">Record Not Found</h2>
          <p className="text-[#8b95a9] text-sm mb-2">No employment record found for ID:</p>
          <p className="font-mono text-sm text-red-400 bg-red-500/10 border border-red-500/20
                        inline-block px-4 py-2 rounded-lg mb-6">
            {id}
          </p>
          <p className="text-xs text-[#8b95a9] mb-8 max-w-sm mx-auto">
            Please check the ID and try again, or contact the HR department to confirm the record details.
          </p>
          <Link href="https://oceaniasoft.com"
            className="inline-flex items-center gap-2 bg-[#f5a623] text-[#0a0e1a]
                       font-semibold text-sm px-6 py-3 rounded-xl hover:bg-[#ffc043] transition-all">
            <ArrowLeft size={14} />
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  // ── CERTIFICATE FOUND ─────────────────────────────────────
  return (
    <div className="min-h-screen pt-24 pb-20 px-6">

      {/* Subtle amber glow behind the card */}
      <div className="fixed top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none
                      bg-[radial-gradient(ellipse,rgba(245,166,35,0.05)_0%,transparent_70%)]" />

      <div className="relative max-w-2xl mx-auto">

        {/* Back link */}
        <Link href="https://www.oceaniasoft.com/"
          className="inline-flex items-center gap-1.5 text-xs text-[#8b95a9]
                     hover:text-[#f5a623] transition-colors mb-8 group">
          <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
          Back to home
        </Link>

        {/* ── Verified status banner ───────────────────────── */}
        <div className="flex items-center gap-3 px-5 py-3.5 rounded-xl
                        bg-emerald-500/10 border border-emerald-500/30 mb-6">
          <BadgeCheck size={16} className="text-emerald-400" strokeWidth={2.5} />
          <p className="text-sm font-medium text-emerald-400">
            This credential has been verified and is currently active.
          </p>
        </div>

        {/* ── Main credential card ─────────────────────────── */}
        <div className="bg-[#111827] border border-white/8 rounded-2xl overflow-hidden
                        shadow-[0_8px_40px_rgba(0,0,0,0.4)]">

          {/* Emerald top accent bar */}
          <div className="h-1.5 bg-gradient-to-r from-emerald-500/50 via-emerald-400/30 to-transparent" />

          {/* ── Card header: logo + VERIFIED badge ──────────── */}
          <div className="px-8 pt-8 pb-6 border-b border-white/8
                          flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* Shield icon — replace with <img src="/logo.png" className="h-10" /> if needed */}
              <div className="w-14 h-14 rounded-xl bg-[#f5a62326] border border-[#f5a623]/20
                              flex items-center justify-center flex-shrink-0">
                <ShieldCheck size={26} className="text-[#f5a623]" strokeWidth={1.75} />
              </div>
              <div>
                {/* ★ LOGO: swap span with <img src="/logo.png" className="h-7 mb-1" /> */}
                <p className="font-serif text-xl font-bold text-white leading-none mb-1">
                  Oceaniasoft<span className="text-[#f5a623]">.</span>
                </p>
                <p className="text-xs text-[#8b95a9]">Official Credential</p>
              </div>
            </div>

            {/* VERIFIED badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                            bg-emerald-500/15 border border-emerald-500/40">
              <BadgeCheck size={15} className="text-emerald-400" strokeWidth={2.5} />
              <span className="text-xs font-bold tracking-widest uppercase text-emerald-400">
                VERIFIED
              </span>
            </div>
          </div>

          {/* ── Card body ────────────────────────────────────── */}
          <div className="px-8 py-8">

            {/* Recipient name + title */}
            <div className="mb-8">
              <p className="text-xs font-semibold text-[#f5a623] uppercase tracking-widest mb-2">
                Awarded to
              </p>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-white leading-tight mb-3">
                {cert.recipientName}
              </h1>
              <p className="text-lg text-[#8b95a9]">
                {cert.credentialTitle}
              </p>
            </div>

            {/* Description + Responsibilities block */}
            <div className="text-sm text-[#8b95a9] leading-relaxed mb-8 p-6
                            rounded-xl bg-[#0a0e1a] border border-white/8">
              <p className={cert.responsibilities.length > 0 ? "mb-4" : ""}>
                {cert.description}
              </p>

              {cert.responsibilities.length > 0 && (
                <ul className="space-y-2.5">
                  {cert.responsibilities.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      {/* Amber bullet dot */}
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#f5a623] flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* ── Details grid — 8 fields in 2 columns ────────── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              <DetailRow
                icon={<Briefcase size={15} />}
                label="Employment Type"
                value={cert.credentialType}
              />
              <DetailRow
                icon={<User size={15} />}
                label="Role"
                value={cert.department}
              />
              <DetailRow
                icon={<Calendar size={15} />}
                label="Joining Date"
                value={cert.joiningDate}
              />
              <DetailRow
                icon={<Calendar size={15} />}
                label="Release Date"
                value={cert.releaseDate}
              />
              <DetailRow
                icon={<Award size={15} />}
                label="Organization"
                value={cert.organization}
              />
              <DetailRow
                icon={<ShieldCheck size={15} />}
                label="Employee ID"
                value={cert.employeeId}
              />
              <DetailRow
                icon={<UserCheck size={15} />}
                label="Authorized By"
                value={`${cert.authorizedBy}, ${cert.authorizerRole}`}
              />
              <DetailRow
                icon={<FileText size={15} />}
                label="Certificate Issue Date"
                value={cert.certifiedOn}
              />
            </div>

            {/* Skills */}
            {cert.skills.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-[#f5a623] uppercase tracking-widest mb-3">
                  Skills &amp; Competencies
                </p>
                <div className="flex flex-wrap gap-2">
                  {cert.skills.map((s) => (
                    <span key={s}
                      className="text-xs font-medium text-[#8b95a9] bg-[#0a0e1a]
                                 border border-white/8 px-3 py-1.5 rounded-full
                                 hover:border-[#f5a623]/40 hover:text-[#e8ecf4] transition-colors">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

        {/* ── Authenticity footer note ─────────────────────── */}
        <div className="flex items-start gap-3 p-5 rounded-xl bg-[#f5a62312]
                        border border-[#f5a623]/20 mt-5">
          <ShieldCheck size={16} className="text-[#f5a623] flex-shrink-0 mt-0.5" strokeWidth={1.75} />
          <p className="text-xs text-[#8b95a9] leading-relaxed">
            This record was issued and is maintained by OceaniaSoft Ltd. Certificate ID{' '}
            <span className="font-mono text-[#f5a623] text-[11px]">{id}</span> is unique
            and tamper-evident. For enquiries contact{' '}
            <a href="mailto:hello@oceaniasoft.com"
              className="text-[#f5a623] hover:underline transition-colors">
              hello@oceaniasoft.com
            </a>
          </p>
        </div>

      </div>
    </div>
  );
}

// ── Detail row helper ──────────────────────────────────────────────
function DetailRow({
  icon, label, value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 p-4 rounded-xl bg-[#0a0e1a] border border-white/8
                    hover:border-[#f5a623]/20 transition-colors group">
      <span className="text-[#f5a623] mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-[10px] text-[#8b95a9] uppercase tracking-widest mb-1 font-medium">
          {label}
        </p>
        <p className="text-sm font-medium text-[#e8ecf4] leading-snug break-words">
          {value}
        </p>
      </div>
    </div>
  );
}