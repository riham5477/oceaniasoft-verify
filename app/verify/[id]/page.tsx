import Link from 'next/link';
import { BadgeCheck, XCircle, Calendar, User, Award, ArrowLeft, ShieldCheck, Briefcase, Hash } from 'lucide-react';

// ============================================================
// ★ YOUR CERTIFICATES — ADD / EDIT HERE
//
// HOW TO ADD A NEW PERSON:
//   1. Copy one certificate block
//   2. Paste it below the last one
//   3. Change the ID and all the details
//   4. Save, then: git add . && git commit -m "add cert" && git push
//
// The ID must match the URL:
//   "OS-EXP-2026-003"  →  yoursite.com/verify/OS-EXP-2026-003
// ============================================================
const CERTIFICATES: Record<string, {
  recipientName: string;
  credentialTitle: string;
  credentialType: string;
  issueDate: string;
  expiryDate: string;
  issuerName: string;
  authorizedBy: string;
  authorizerRole: string;
  description: string;
  responsibilities: string[];
  skills: string[];
}> = {

  // ── Certificate 1 ──────────────────────────────────────
  "OS-EXP-2026-003": {
    recipientName:   "Golam Shareare Reham",
    credentialTitle: "Web Developer",
    credentialType:  "Full-Time Employment",
    issueDate:       "15 March 2024",
    expiryDate:      "20 May 2027",
    issuerName:      "OceaniaSoft Ltd.",
    authorizedBy:    "Rabbani Rafi",
    authorizerRole:  "Chief Executive Officer",
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
  //   ...
  // },

};
// ============================================================


// ★ Next.js 15: params must be a Promise — this is the fix
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
          <Link href="/"
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
      <div className="max-w-2xl mx-auto">

        {/* Back link */}
        <Link href="/"
          className="inline-flex items-center gap-1.5 text-xs text-[#8b95a9]
                     hover:text-[#f5a623] transition-colors mb-8 group">
          <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
          Back to home
        </Link>

        {/* Verified banner */}
        <div className="flex items-center gap-3 px-5 py-3.5 rounded-xl
                        bg-emerald-500/10 border border-emerald-500/30 mb-6">
          <BadgeCheck size={16} className="text-emerald-400" strokeWidth={2.5} />
          <p className="text-sm font-medium text-emerald-400">
            This credential has been verified and is currently active.
          </p>
        </div>

        {/* Main card */}
        <div className="bg-[#111827] border border-white/8 rounded-2xl overflow-hidden
                        shadow-[0_4px_24px_rgba(0,0,0,0.3)]">

          {/* Green top accent bar */}
          <div className="h-1.5 bg-gradient-to-r from-emerald-500/40 via-emerald-500/20 to-transparent" />

          {/* Card header */}
          <div className="px-8 pt-8 pb-6 border-b border-white/8
                          flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-[#f5a62326] border border-[#f5a623]/20
                              flex items-center justify-center flex-shrink-0">
                <ShieldCheck size={26} className="text-[#f5a623]" strokeWidth={1.75} />
              </div>
              <div>
                {/* ★ LOGO: replace span with <img src="/logo.png" className="h-7 mb-1" /> */}
                <span className="font-serif text-lg font-bold text-white">
                  Oceaniasoft<span className="text-[#f5a623]">.</span>
                </span>
                <p className="text-xs text-[#8b95a9]">Official Employment Record</p>
              </div>
            </div>
            <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full
                            bg-emerald-500/15 border border-emerald-500/40
                            text-xs font-bold tracking-widest uppercase text-emerald-400">
              <BadgeCheck size={14} strokeWidth={2.5} />
              VERIFIED
            </div>
          </div>

          {/* Card body */}
          <div className="px-8 py-8">

            {/* Recipient name */}
            <div className="mb-8">
              <p className="text-xs font-semibold text-[#f5a623] uppercase tracking-widest mb-1">
                This certifies that
              </p>
              <h1 className="font-serif text-4xl font-bold text-white mb-2 leading-tight">
                {cert.recipientName}
              </h1>
              <p className="text-lg text-[#8b95a9]">
                {cert.credentialTitle} — {cert.credentialType}
              </p>
            </div>

            {/* Description */}
            <p className="text-sm text-[#8b95a9] leading-relaxed mb-6 p-4 rounded-xl
                          bg-[#0a0e1a] border border-white/8">
              {cert.description}
            </p>

            {/* Responsibilities */}
            {cert.responsibilities.length > 0 && (
              <div className="mb-6 p-4 rounded-xl bg-[#0a0e1a] border border-white/8">
                <p className="text-xs font-semibold text-[#f5a623] uppercase tracking-widest mb-3">
                  Key Responsibilities
                </p>
                <ul className="space-y-2">
                  {cert.responsibilities.map((r, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#8b95a9]">
                      <span className="text-[#f5a623] mt-1 flex-shrink-0">›</span>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Details grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              <Detail icon={<Calendar size={15} />}  label="Issue Date"      value={cert.issueDate} />
              <Detail icon={<Calendar size={15} />}  label="Valid Until"     value={cert.expiryDate} />
              <Detail icon={<Briefcase size={15} />} label="Issued By"       value={cert.issuerName} />
              <Detail icon={<User size={15} />}      label="Authorized By"   value={cert.authorizedBy} />
              <Detail icon={<Award size={15} />}     label="Authorizer Role" value={cert.authorizerRole} />
              <Detail icon={<Hash size={15} />}      label="Certificate ID"  value={id} mono />
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
                                 border border-white/8 px-3 py-1.5 rounded-full">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Authenticity note */}
        <div className="flex items-start gap-3 p-4 rounded-xl bg-[#f5a62315]
                        border border-[#f5a623]/20 mt-5">
          <ShieldCheck size={16} className="text-[#f5a623] flex-shrink-0 mt-0.5" strokeWidth={1.75} />
          <p className="text-xs text-[#8b95a9] leading-relaxed">
            This record was issued and is maintained by OceaniaSoft Ltd. Certificate ID{' '}
            <span className="font-mono text-[#f5a623]">{id}</span> is unique.
            For enquiries contact{' '}
            <a href="mailto:hello@oceaniasoft.com" className="text-[#f5a623] hover:underline">
              hello@oceaniasoft.com
            </a>
          </p>
        </div>

      </div>
    </div>
  );
}

// ── Detail row helper ──────────────────────────────────────────────
function Detail({ icon, label, value, mono = false }: {
  icon: React.ReactNode;
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#0a0e1a] border border-white/8">
      <span className="text-[#f5a623] mt-0.5 flex-shrink-0">{icon}</span>
      <div>
        <p className="text-xs text-[#8b95a9] uppercase tracking-wide mb-0.5">{label}</p>
        <p className={`text-sm font-medium text-white ${mono ? 'font-mono text-[#f5a623]' : ''}`}>
          {value}
        </p>
      </div>
    </div>
  );
}