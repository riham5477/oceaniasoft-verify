import { NextResponse } from 'next/server';
import { getCertificate } from '@/lib/certificates';

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const certificate = getCertificate(params.id);

  return NextResponse.json(
    {
      found: certificate !== null,
      certificate: certificate,
    },
    {
      status: certificate ? 200 : 404,
    }
  );
}