import { NextRequest, NextResponse } from 'next/server';
import { getUserDbOrders } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email query parameter is required' },
        { status: 400 }
      );
    }

    const orders = await getUserDbOrders(email);

    return NextResponse.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to retrieve orders' },
      { status: 500 }
    );
  }
}
