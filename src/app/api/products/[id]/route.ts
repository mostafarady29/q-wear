import { NextRequest, NextResponse } from 'next/server';
import { getDbProductById } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { product, related } = await getDbProductById(id);

    if (!product) {
      return NextResponse.json(
        { success: false, message: 'Garment not found in Q store' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      product,
      related,
    });
  } catch (error) {
    console.error('Failed to get product:', error);
    return NextResponse.json(
      { success: false, message: 'Server error retrieving product' },
      { status: 500 }
    );
  }
}
