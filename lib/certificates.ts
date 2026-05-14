import { readFileSync } from 'fs';
import { join } from 'path';
import type { Certificate } from './types';

function loadCertificates(): Certificate[] {
  try {
    // No 'src' folder — data is at project root level
    const filePath = join(process.cwd(), 'data', 'certificates.json');
    const raw = readFileSync(filePath, 'utf-8');
    return JSON.parse(raw) as Certificate[];
  } catch {
    return [];
  }
}

export function getCertificate(id: string): Certificate | null {
  const db = loadCertificates();
  return db.find((c) => c.id === id) ?? null;
}

export function getAllCertificates(): Certificate[] {
  return loadCertificates();
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
  return 'valid';   // default to valid if status field is missing
}