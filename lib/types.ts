export type CertificateStatus = 'valid' | 'expired' | 'revoked';

export interface Certificate {
  id: string;
  recipientName: string;
  credentialTitle: string;
  issueDate: string;
  expiryDate: string;
  issuerName: string;
  issuerTitle: string;
  credentialType: string;
  grade: string;
  description: string;
  skills: string[];
  status?: CertificateStatus;       // optional - we'll compute it

  // Your custom fields
  responsibilities?: string[];
  authorizedBy?: string;
  authorizerRole?: string;
  certifiedOn?: string;
}