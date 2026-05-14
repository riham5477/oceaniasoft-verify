import { NextResponse } from 'next/server';
import { getCertificate } from '@/lib/certificates';
import type { VerifyResponse } from '@/lib/types';

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const certificate = getCertificate(params.id);

  const payload: VerifyResponse = {
    found:       certificate !== null,
    certificate: certificate,
  };

  return NextResponse.json(payload, {
    status: certificate ? 200 : 404,
  });
}
