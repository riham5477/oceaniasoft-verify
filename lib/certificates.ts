import fs from 'fs';
import path from 'path';
import type { Certificate } from './types';

// This section reads the file manually so Vercel can find it
const getDb = () => {
  const filePath = path.join(process.cwd(), 'data', 'certificates.json');
  const fileData = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileData) as Certificate[];
};

/**
 * Look up a certificate by its unique ID.
 * Returns the certificate if found, or null otherwise.
 */
export function getCertificate(id: string): Certificate | null {
  const db = getDb(); // Refresh the data from the file
  return db.find((c) => c.id === id) ?? null;
}

/**
 * Return all certificates (used in the admin panel).
 */
export function getAllCertificates(): Certificate[] {
  return getDb();
}

/**
 * Format an ISO date string into a human-readable format.
 * e.g. "2024-03-15" → "15 March 2024"
 */
export function formatDate(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

/**
 * Determine the computed status, considering real-time expiry.
 * Even if stored as "valid", return "expired" if the date has passed.
 */
export function getComputedStatus(cert: Certificate): 'valid' | 'expired' | 'revoked' {
  if (cert.status === 'revoked') return 'revoked';
  const today = new Date();
  const expiry = new Date(cert.expiryDate);
  if (expiry < today) return 'expired';
  return 'valid';
}
