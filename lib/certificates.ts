import type { Certificate } from './types';

// Direct require - most reliable method on Vercel
// No file system reading needed
const db: Certificate[] = require('../data/certificates.json');

export function getCertificate(id: string): Certificate | null {
  return db.find((c) => c.id === id) ?? null;
}

export function getAllCertificates(): Certificate[] {
  return db;
}

export function formatDate(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

export function getComputedStatus(
  cert: Certificate
): 'valid' | 'expired' | 'revoked' {
  if (cert.status === 'revoked') return 'revoked';
  const expiry = new Date(cert.expiryDate);
  if (expiry < new Date()) return 'expired';
  return 'valid';
}