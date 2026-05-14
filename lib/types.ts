// ─── Certificate Types ────────────────────────────────────────────────────────

export type CertificateStatus = 'valid' | 'expired' | 'revoked';

export interface Certificate {
  id: string;
  status: 'valid' | 'expired' | 'revoked';
  recipientName: string;
  credentialTitle: string;
  description: string;
  // Add these new lines:
  responsibilities?: string[]; 
  authorizedBy?: string;
  authorizerRole?: string;
  certifiedOn?: string;
  // ... keep your existing fields below
  credentialType: string;
  grade: string;
  issueDate: string;
  expiryDate: string;
  issuerName: string;
  issuerTitle: string;
  skills: string[];
}

// ─── API Response ─────────────────────────────────────────────────────────────

export interface VerifyResponse {
  found: boolean;
  certificate: Certificate | null;
}
