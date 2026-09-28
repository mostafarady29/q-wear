import { NextRequest, NextResponse } from 'next/server';
import { getDbProducts } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search') || '';
    const sort = searchParams.get('sort') || 'featured';
    const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined;
    const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined;
    const minGsm = searchParams.get('minGsm') ? Number(searchParams.get('minGsm')) : undefined;

    const products = await getDbProducts({
      category,
      search,
      sort,
      minPrice,
      maxPrice,
      minGsm,
    });

    return NextResponse.json({
      success: true,
      total: products.length,
      products,
    });
  } catch (error) {
    console.error('Failed to query products from database:', error);
    return NextResponse.json(
      { success: false, message: 'Could not fetch clothing items' },
      { status: 500 }
    );
  }
}
