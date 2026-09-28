import { NextResponse } from 'next/server';
import { DROP_COLLECTIONS } from '@/data/collections';

export async function GET() {
  return NextResponse.json({
    success: true,
    collections: DROP_COLLECTIONS,
  });
}
