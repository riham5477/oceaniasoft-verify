import fs from 'fs';
import path from 'path';
import type { Certificate } from './types';

const getDb = (): Certificate[] => {
  try {
    // We use join with process.cwd() as it's the most stable for Next.js 15
    const filePath = path.join(process.cwd(), 'data', 'certificates.json');
    
    if (!fs.existsSync(filePath)) {
      console.error("File not found at:", filePath);
      return [];
    }

    const fileData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileData) as Certificate[];
  } catch (error) {
    console.error("Database read error:", error);
    return [];
  }
};

export function getCertificate(id: string): Certificate | null {
  const db = getDb();
  if (!db.length) return null;

  return db.find((c) => 
    c.id.trim().toLowerCase() === id.trim().toLowerCase()
  ) ?? null;
}

export function getAllCertificates(): Certificate[] {
  return getDb();
}

/**
 * Format an ISO date string into a human-readable format.
 */
export function formatDate(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

export function getComputedStatus(cert: Certificate): 'valid' | 'expired' | 'revoked' {
  if (cert.status === 'revoked') return 'revoked';
  const today = new Date();
  const expiry = new Date(cert.expiryDate);
  if (expiry < today) return 'expired';
  return 'valid';
}